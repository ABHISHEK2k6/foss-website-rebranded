import { notFound } from 'next/navigation';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BackButton from '@/components/BackButton';

export const revalidate = 60; // Revalidate every 60 seconds

interface Blog {
  _id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  author: string;
  coverImage?: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

async function getBlog(slug: string): Promise<Blog | null> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const isDev = process.env.NODE_ENV === 'development';
    const response = await fetch(`${baseUrl}/api/blogs/slug/${slug}`, {
      cache: isDev ? 'no-store' : 'force-cache',
      next: { revalidate: isDev ? 0 : 60 }
    });
    const data = await response.json();
    return data.success ? data.data : null;
  } catch (error) {
    console.error('Error fetching blog:', error);
    return null;
  }
}

// Generate static paths for all blogs
export async function generateStaticParams() {
  // During build time, skip static generation and rely on ISR
  if (process.env.NODE_ENV === 'production') {
    return [];
  }
  
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3002';
    const response = await fetch(`${baseUrl}/api/blogs`, {
      cache: 'no-store'
    });
    
    if (!response.ok) {
      console.log('Failed to fetch blogs for static generation');
      return [];
    }
    
    const data = await response.json();
    
    if (data.success && Array.isArray(data.data)) {
      return data.data.map((blog: Blog) => ({
        slug: blog.slug,
      }));
    }
    return [];
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const blog = await getBlog(slug);

  if (!blog) {
    notFound();
  }

  return (
    <div className="relative min-h-screen text-white">
      <Navbar />

      <article className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div>
            <BackButton />

            <header className="mb-8">
              <div className="flex flex-wrap gap-2 mb-4">
                {blog.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-white/20 text-white backdrop-blur-sm border border-white/20"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
                {blog.title}
              </h1>
              <div className="flex items-center text-gray-400 space-x-4">
                <span className="font-medium text-white">By {blog.author}</span>
                <span>•</span>
                <time dateTime={blog.createdAt}>
                  {new Date(blog.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </time>
              </div>
            </header>

            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10">
              <div className="prose prose-invert prose-lg max-w-none">
                <ReactMarkdown
                  components={{
                    h1: ({ ...props }) => (
                      <h1 className="text-3xl md:text-4xl font-bold mt-8 mb-4 text-white" {...props} />
                    ),
                    h2: ({ ...props }) => (
                      <h2 className="text-2xl md:text-3xl font-bold mt-6 mb-3 text-white" {...props} />
                    ),
                    h3: ({ ...props }) => (
                      <h3 className="text-xl md:text-2xl font-bold mt-4 mb-2 text-white" {...props} />
                    ),
                    p: ({ ...props }) => (
                      <p className="mb-4 leading-relaxed text-gray-300" {...props} />
                    ),
                    ul: ({ ...props }) => (
                      <ul className="list-disc list-inside mb-4 space-y-2 text-gray-300" {...props} />
                    ),
                    ol: ({ ...props }) => (
                      <ol className="list-decimal list-inside mb-4 space-y-2 text-gray-300" {...props} />
                    ),
                    code: ({ inline, ...props }: { inline?: boolean } & React.HTMLProps<HTMLElement>) =>
                      inline ? (
                        <code
                          className="bg-white/10 text-white px-2 py-0.5 rounded text-sm font-mono border border-white/20"
                          {...props}
                        />
                      ) : (
                        <code
                          className="block bg-black/50 text-gray-100 p-4 rounded-lg overflow-x-auto mb-4 font-mono text-sm border border-white/20"
                          {...props}
                        />
                      ),
                    a: ({ ...props }) => (
                      <a
                        className="text-blue-400 hover:text-blue-300 underline"
                        {...props}
                      />
                    ),
                    blockquote: ({ ...props }) => (
                      <blockquote
                        className="border-l-4 border-white/30 pl-4 italic my-4 text-gray-400"
                        {...props}
                      />
                    ),
                    img: ({ src, alt }) => (
                      src && typeof src === 'string' && (
                        <Image
                          src={src}
                          alt={alt || 'Blog image'}
                          width={800}
                          height={400}
                          className="rounded-lg my-6 border border-white/20"
                        />
                      )
                    ),
                  }}
                >
                  {blog.content}
                </ReactMarkdown>
              </div>
            </div>

            {blog.updatedAt !== blog.createdAt && (
              <p className="mt-6 text-sm text-gray-500">
                Last updated:{' '}
                {new Date(blog.updatedAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            )}
          </div>
        </div>
      </article>

      <Footer />
    </div>
  );
}
