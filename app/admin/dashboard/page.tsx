'use client';

import { useEffect, useState } from 'react';
import { signOut } from 'next-auth/react';
import Link from 'next/link';

interface Blog {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  published: boolean;
  createdAt: string;
  tags: string[];
}

export default function DashboardPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await fetch('/api/blogs?showAll=true');
      const data = await response.json();
      if (data.success) {
        setBlogs(data.data);
      } else {
        setError(data.error);
      }
    } catch {
      setError('Failed to fetch blogs');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this blog?')) return;

    try {
      const response = await fetch(`/api/blogs/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setBlogs(blogs.filter((blog) => blog._id !== id));
      } else {
        alert('Failed to delete blog');
      }
    } catch {
      alert('Failed to delete blog');
    }
  };

  const togglePublish = async (blog: Blog) => {
    try {
      const response = await fetch(`/api/blogs/${blog._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...blog, published: !blog.published }),
      });

      if (response.ok) {
        fetchBlogs();
      } else {
        alert('Failed to update blog');
      }
    } catch {
      alert('Failed to update blog');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <nav className="bg-white/5 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-4 sm:h-16 gap-4 sm:gap-0">
            <div className="flex items-center">
              <h1 className="text-xl font-bold bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">Admin Dashboard</h1>
            </div>
            <div className="flex items-center gap-2 sm:gap-4 w-full sm:w-auto">
              <Link
                href="/admin/dashboard/new"
                className="flex-1 sm:flex-none bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all text-center text-sm sm:text-base"
              >
                New Blog Post
              </Link>
              <button
                onClick={() => signOut({ callbackUrl: '/admin/login' })}
                className="flex-1 sm:flex-none text-gray-300 hover:text-white border border-white/20 px-4 py-2 rounded-lg hover:bg-white/10 transition-all text-sm sm:text-base"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {error && (
          <div className="rounded-md bg-red-500/20 border border-red-500/50 p-4 mb-4 mx-4 sm:mx-0">
            <p className="text-sm text-red-200">{error}</p>
          </div>
        )}

        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 shadow-xl overflow-hidden sm:rounded-lg">
            <ul className="divide-y divide-white/10">
              {blogs.length === 0 ? (
                <li className="px-4 sm:px-6 py-8 text-center text-gray-400">
                  No blog posts yet. Create your first one!
                </li>
              ) : (
                blogs.map((blog) => (
                  <li key={blog._id} className="px-4 sm:px-6 py-4 hover:bg-white/5 transition-colors">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-base sm:text-lg font-medium text-white truncate">
                          {blog.title}
                        </h3>
                        <p className="mt-1 text-sm text-gray-400 line-clamp-2">
                          {blog.excerpt}
                        </p>
                        <div className="mt-2 flex flex-wrap items-center gap-2">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              blog.published
                                ? 'bg-green-500/20 text-green-300 border border-green-500/30'
                                : 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30'
                            }`}
                          >
                            {blog.published ? 'Published' : 'Draft'}
                          </span>
                          {blog.tags.map((tag) => (
                            <span
                              key={tag}
                              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-white/10 text-gray-300 border border-white/20"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="flex flex-wrap lg:flex-shrink-0 gap-2">
                        <Link
                          href={`/admin/dashboard/edit/${blog._id}`}
                          className="flex-1 sm:flex-none inline-flex items-center justify-center px-3 py-2 border border-white/20 shadow-sm text-sm font-medium rounded-lg text-white bg-white/5 hover:bg-white/10 transition-all"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => togglePublish(blog)}
                          className="flex-1 sm:flex-none inline-flex items-center justify-center px-3 py-2 border border-white/20 shadow-sm text-sm font-medium rounded-lg text-white bg-white/5 hover:bg-white/10 transition-all"
                        >
                          {blog.published ? 'Unpublish' : 'Publish'}
                        </button>
                        <button
                          onClick={() => handleDelete(blog._id)}
                          className="flex-1 sm:flex-none inline-flex items-center justify-center px-3 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-red-600 hover:bg-red-700 transition-all"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
