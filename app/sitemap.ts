import type { MetadataRoute } from 'next';
import dbConnect from '@/lib/mongodb';
import Blog from '@/models/Blog';

const siteUrl = 'https://foss.uck.ac.in';

const staticRoutes: MetadataRoute.Sitemap = [
  { url: siteUrl, changeFrequency: 'weekly', priority: 1 },
  { url: `${siteUrl}/team`, changeFrequency: 'weekly', priority: 0.8 },
  { url: `${siteUrl}/contact`, changeFrequency: 'monthly', priority: 0.6 },
  { url: `${siteUrl}/blogs`, changeFrequency: 'daily', priority: 0.8 },
  { url: `${siteUrl}/hackathons`, changeFrequency: 'weekly', priority: 0.8 },
  { url: `${siteUrl}/workshops`, changeFrequency: 'weekly', priority: 0.8 },
  { url: `${siteUrl}/events`, changeFrequency: 'weekly', priority: 0.8 },
  { url: `${siteUrl}/online-sessions`, changeFrequency: 'weekly', priority: 0.8 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    await dbConnect();

    const blogs = await Blog.find({ published: true })
      .select('slug updatedAt')
      .lean();

    const blogRoutes: MetadataRoute.Sitemap = blogs.map((blog) => ({
      url: `${siteUrl}/blogs/${blog.slug}`,
      lastModified: blog.updatedAt,
      changeFrequency: 'monthly',
      priority: 0.6,
    }));

    return [...staticRoutes, ...blogRoutes];
  } catch (error) {
    console.error('Error building sitemap blog routes:', error);
    return staticRoutes;
  }
}
