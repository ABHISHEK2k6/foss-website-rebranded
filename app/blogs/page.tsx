import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ClientBlogCard from '@/components/ClientBlogCard';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

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

async function getBlogs(): Promise<Blog[]> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || (
      process.env.NODE_ENV === 'production' 
        ? (process.env.VERCEL_URL 
          ? `https://${process.env.VERCEL_URL}` 
          : 'https://foss-website-rebranded.vercel.app')
        : 'http://localhost:3002'
    );
    
    const response = await fetch(`${baseUrl}/api/blogs`, {
      cache: 'no-store',
      next: { revalidate: 0 }
    });
    
    if (!response.ok) {
      console.error('Failed to fetch blogs:', response.status, response.statusText);
      return [];
    }
    
    const data = await response.json();
    return data.success ? data.data : [];
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return [];
  }
}

export default async function BlogsPage() {
  const blogs = await getBlogs();

  return (
    <div className="relative min-h-screen text-white">
      <Navbar />

      {/* Hero Section */}
      <div className="relative pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold p-2 bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
            FOSS Blog
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            Insights, tutorials, and stories from the open-source community
          </p>
        </div>
      </div>

      {/* Tag Filter */}
      {/* {allTags.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <div className="flex flex-wrap gap-3 justify-center">
            <button
              onClick={() => setSelectedTag('')}
              className={`px-4 py-2 rounded-full transition-all ${
                selectedTag === ''
                  ? 'bg-white text-black'
                  : 'bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm border border-white/20'
              }`}
            >
              All
            </button>
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-4 py-2 rounded-full transition-all ${
                  selectedTag === tag
                    ? 'bg-white text-black'
                    : 'bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm border border-white/20'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      )} */}

      {/* Blog Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {blogs.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400 text-xl">No blog posts available yet.</p>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {blogs.map((blog, index) => (
              <ClientBlogCard key={blog._id} blog={blog} index={index} />
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
