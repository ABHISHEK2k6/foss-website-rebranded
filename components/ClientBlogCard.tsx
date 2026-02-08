'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface Blog {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  author: string;
  coverImage?: string;
  tags: string[];
  createdAt: string;
}

interface ClientBlogCardProps {
  blog: Blog;
  index: number;
}

export default function ClientBlogCard({ blog, index }: ClientBlogCardProps) {
  return (
    <Link href={`/blogs/${blog.slug}`}>
      <motion.article
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="group bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 hover:border-white/30 hover:bg-white/10 transition-all duration-300 flex flex-col h-full"
      >
        {blog.coverImage && (
          <div className="relative w-full aspect-video overflow-hidden">
            <Image
              src={blog.coverImage}
              alt={blog.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover group-hover:scale-110 transition-transform duration-300"
              priority={index < 3}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          </div>
        )}
        <div className="p-5 flex flex-col flex-grow">
          <div className="flex flex-wrap gap-2 mb-2">
            {blog.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-white/20 text-white backdrop-blur-sm"
              >
                {tag}
              </span>
            ))}
          </div>
          <h2 className="text-xl font-bold mb-2 group-hover:text-gray-300 transition-colors line-clamp-2">
            {blog.title}
          </h2>
          <p className="text-gray-400 mb-3 line-clamp-2 text-sm flex-grow">
            {blog.excerpt}
          </p>
          <div className="flex items-center justify-between text-xs text-gray-500 pt-2 border-t border-white/10">
            <span className="text-gray-400">{blog.author}</span>
            <span className="text-gray-500">
              {new Date(blog.createdAt).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })}
            </span>
          </div>
        </div>
      </motion.article>
    </Link>
  );
}
