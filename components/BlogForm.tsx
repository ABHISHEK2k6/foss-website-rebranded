'use client';

import { useState, FormEvent, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface BlogFormProps {
  blogId?: string;
}

interface BlogData {
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  author: string;
  coverImage: string;
  tags: string;
  published: boolean;
}

export default function BlogForm({ blogId }: BlogFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [uploading, setUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [formData, setFormData] = useState<BlogData>({
    title: '',
    slug: '',
    content: '',
    excerpt: '',
    author: '',
    coverImage: '',
    tags: '',
    published: false,
  });

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch(`/api/blogs/${blogId}`);
        const data = await response.json();
        if (data.success) {
          const blog = data.data;
          setFormData({
            title: blog.title,
            slug: blog.slug,
            content: blog.content,
            excerpt: blog.excerpt,
            author: blog.author,
            coverImage: blog.coverImage || '',
            tags: blog.tags.join(', '),
            published: blog.published,
          });
          if (blog.coverImage) {
            setImagePreview(blog.coverImage);
          }
        }
      } catch {
        setError('Failed to fetch blog');
      }
    };

    if (blogId) {
      fetchBlog();
    }
  }, [blogId]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      setError('Invalid file type. Please upload an image (JPEG, PNG, GIF, or WebP).');
      return;
    }

    // Validate file size (5MB max)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      setError('File too large. Maximum size is 5MB.');
      return;
    }

    setUploading(true);
    setError('');

    try {
      const uploadFormData = new FormData();
      uploadFormData.append('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: uploadFormData,
      });

      const data = await response.json();

      if (data.success) {
        setFormData((prev) => ({ ...prev, coverImage: data.url }));
        setImagePreview(data.url);
      } else {
        setError(data.error || 'Failed to upload image');
      }
    } catch {
      setError('Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  const removeImage = () => {
    setFormData((prev) => ({ ...prev, coverImage: '' }));
    setImagePreview('');
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Auto-generate slug from title
    if (name === 'title' && !blogId) {
      const slug = value
        .toLowerCase()
        .replace(/[^\w ]+/g, '')
        .replace(/ +/g, '-');
      setFormData((prev) => ({ ...prev, slug }));
    }
  };

  const handleSubmit = async (e: FormEvent, publish: boolean = false) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const tagsArray = formData.tags
        .split(',')
        .map((tag) => tag.trim())
        .filter((tag) => tag);

      const blogData = {
        ...formData,
        tags: tagsArray,
        published: publish,
      };

      const url = blogId ? `/api/blogs/${blogId}` : '/api/blogs';
      const method = blogId ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(blogData),
      });

      const data = await response.json();

      if (data.success) {
        router.push('/admin/dashboard');
        router.refresh();
      } else {
        setError(data.error);
      }
    } catch {
      setError('Failed to save blog');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 shadow-xl rounded-lg p-4 sm:p-6">
          <h1 className="text-xl sm:text-2xl font-bold mb-6 bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
            {blogId ? 'Edit Blog Post' : 'Create New Blog Post'}
          </h1>

          {error && (
            <div className="rounded-md bg-red-500/20 border border-red-500/50 p-4 mb-4">
              <p className="text-sm text-red-200">{error}</p>
            </div>
          )}

          <form onSubmit={(e) => handleSubmit(e, false)}>
            <div className="space-y-6">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-300">
                  Title *
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  required
                  className="mt-1 block w-full bg-white/5 border border-white/20 rounded-md shadow-sm py-2 px-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  value={formData.title}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label htmlFor="slug" className="block text-sm font-medium text-gray-300">
                  Slug *
                </label>
                <input
                  type="text"
                  id="slug"
                  name="slug"
                  required
                  className="mt-1 block w-full bg-white/5 border border-white/20 rounded-md shadow-sm py-2 px-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  value={formData.slug}
                  onChange={handleChange}
                />
                <p className="mt-1 text-sm text-gray-400">
                  URL-friendly version of the title
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Cover Image
                </label>
                
                {imagePreview && (
                  <div className="mb-4 relative">
                    <Image
                      src={imagePreview}
                      alt="Cover preview"
                      width={600}
                      height={256}
                      className="w-full max-h-64 object-cover rounded-md border border-white/20"
                    />
                    <button
                      type="button"
                      onClick={removeImage}
                      className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-2 hover:bg-red-700 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                )}

                <div className="space-y-2">
                  <input
                    type="file"
                    id="imageUpload"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={uploading}
                    className="block w-full text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-gradient-to-r file:from-purple-600 file:to-blue-600 file:text-white hover:file:from-purple-700 hover:file:to-blue-700 disabled:opacity-50 file:cursor-pointer cursor-pointer"
                  />
                  {uploading && (
                    <p className="text-sm text-gray-400">Uploading image...</p>
                  )}
                  <p className="text-sm text-gray-400">
                    Upload an image (JPEG, PNG, GIF, WebP - Max 5MB) or paste URL in the field above
                  </p>
                </div>
              </div>

              <div>
                <label htmlFor="excerpt" className="block text-sm font-medium text-gray-300">
                  Excerpt *
                </label>
                <textarea
                  id="excerpt"
                  name="excerpt"
                  required
                  rows={3}
                  className="mt-1 block w-full bg-white/5 border border-white/20 rounded-md shadow-sm py-2 px-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  value={formData.excerpt}
                  onChange={handleChange}
                />
                <p className="mt-1 text-sm text-gray-400">
                  Short description (max 500 characters)
                </p>
              </div>

              <div>
                <label htmlFor="content" className="block text-sm font-medium text-gray-300">
                  Content * (Markdown supported)
                </label>
                <textarea
                  id="content"
                  name="content"
                  required
                  rows={15}
                  className="mt-1 block w-full bg-white/5 border border-white/20 rounded-md shadow-sm py-2 px-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent font-mono text-sm"
                  value={formData.content}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label htmlFor="author" className="block text-sm font-medium text-gray-300">
                  Author *
                </label>
                <input
                  type="text"
                  id="author"
                  name="author"
                  required
                  className="mt-1 block w-full bg-white/5 border border-white/20 rounded-md shadow-sm py-2 px-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  value={formData.author}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label htmlFor="tags" className="block text-sm font-medium text-gray-300">
                  Tags
                </label>
                <input
                  type="text"
                  id="tags"
                  name="tags"
                  className="mt-1 block w-full bg-white/5 border border-white/20 rounded-md shadow-sm py-2 px-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  value={formData.tags}
                  onChange={handleChange}
                  placeholder="technology, programming, web development"
                />
                <p className="mt-1 text-sm text-gray-400">
                  Separate tags with commas
                </p>
              </div>

              <div className="flex flex-col sm:flex-row justify-between gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => router.back()}
                  className="px-4 py-2 border border-white/20 rounded-lg shadow-sm text-sm font-medium text-white bg-white/5 hover:bg-white/10 transition-all order-2 sm:order-1"
                >
                  Cancel
                </button>
                <div className="flex flex-col sm:flex-row gap-3 order-1 sm:order-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gray-600 hover:bg-gray-700 disabled:opacity-50 transition-all"
                  >
                    {loading ? 'Saving...' : 'Save as Draft'}
                  </button>
                  <button
                    type="button"
                    onClick={(e) => handleSubmit(e, true)}
                    disabled={loading}
                    className="px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 transition-all"
                  >
                    {loading ? 'Publishing...' : 'Publish'}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
