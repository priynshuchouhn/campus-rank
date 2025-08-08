import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Calendar, Clock, User, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { RenderMarkdown } from '@/components/ui/render-markdown';
import { Share } from '@/components/ui/share';
import axios from 'axios';
import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/blogs/${slug}`);
    const post = response.data.data;

    if (!post) {
        return {
            title: 'Blog Post Not Found',
            description: 'The requested blog post could not be found.',
        };
    }

    return {
        title: post.title,
        description: post.description,
        keywords: post.tags,
        authors: {
            name: post.author.name,
        },
        openGraph: {
            title: post.title,
            description: post.description,
            url: `https://campusrank.org/blogs/${post.slug}`,
            siteName: 'Campus Rank',
            locale: 'en_US',
            type: 'article',
            publishedTime: post.publishedAt || post.createdAt,
            authors: [post.author.name],
            images: post.featuredImage ? [post.featuredImage] : [],
            tags: post.tags,
        },
        twitter: {
            card: 'summary_large_image',
            title: post.title,
            description: post.description,
            images: post.featuredImage ? [post.featuredImage] : [],
        },
    };
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/blogs/${slug}`);
    const post = response.data.data;

    if (!post) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">Blog post not found</h1>
                    <Link href="/blogs">
                        <Button>
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Blogs
                        </Button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <article className="max-w-4xl mx-auto px-4 py-8">
            {/* Header */}
            <header className="mb-8">
                <div className='flex md:flex-row flex-col md:items-center gap-2 mb-4'>
                    <Link href="/blogs">
                        <Button variant="default">
                            <ArrowLeft className="h-4 w-4" />
                            <span className='block md:hidden'>Back to Blogs</span>
                        </Button>
                    </Link>
                    <h1 className="md:text-3xl text-2xl font-bold text-gray-900 dark:text-accent">{post.title}</h1>
                </div>
                <p className="md:text-xl text-sm text-gray-600 mb-6 dark:text-gray-400">{post.description}</p>

                {/* Author and Meta Info */}
                <div className="grid grid-cols-2 md:grid-cols-3 md:gap-6 gap-2 text-gray-600 dark:text-gray-400">
                    <div className="flex items-center gap-2 col-span-2 md:col-span-1 mb-2 md:mb-0">
                        {post.author.image ? (
                            <Image
                                src={post.author.image}
                                alt={post.author.name}
                                className="md:w-10 md:h-10 w-8 h-8 rounded-full object-cover"
                                width={64}
                                height={64}
                            />
                        ) : (
                            <User className="md:w-10 md:h-10 w-8 h-8 p-2 bg-gray-200 rounded-full" />
                        )}
                        <span className="font-medium">{post.author.name}</span>
                    </div>

                    <div className="flex items-center gap-2">
                        <Calendar className="md:w-5 md:h-5 w-4 h-4" />
                        <span className='md:text-base text-sm'>{new Date(post.publishedAt || post.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        })}</span>
                    </div>

                    <div className="flex items-center gap-2">
                        <Clock className="md:w-5 md:h-5 w-4 h-4" />
                        <span className='md:text-base text-sm'>{Math.ceil(post.content.split(' ').length / 200)} min read</span>
                    </div>
                </div>
            </header>

            {/* Featured Image */}
            {post.featuredImage && (
                <div className="mb-8">
                    <Image
                        src={post.featuredImage}
                        alt={post.title}
                        width={1000}
                        height={1000}
                        className="w-full h-[400px] object-cover rounded-lg"
                    />
                </div>
            )}

            {/* Content */}
            <div className="prose prose-lg max-w-none">
                <RenderMarkdown content={post.content} />
            </div>

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
                <div className="mt-8 pt-6 border-t border-gray-200">
                    <div className="flex items-center gap-2 flex-wrap">
                        <Tag className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                        {post.tags.map((tag: string) => (
                            <span
                                key={tag}
                                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm dark:bg-gray-950 dark:text-gray-200"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            )}

            {/* Share Section */}
            <div className="mt-8 pt-6 border-t border-gray-200">
                <Share
                    url={`https://campusrank.org/blogs/${post.slug}`}
                    title={post.title}
                    description={post.description}
                    image={post.featuredImage}
                />
            </div>
        </article>
    );
}