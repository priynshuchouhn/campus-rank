'use client';

import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Calendar, Clock, User, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { RenderMarkdown } from '@/components/ui/render-markdown';
import axios from 'axios';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

export default function BlogPost() {
    const { slug } = useParams();
    const [post, setPost] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/blogs/${slug}`);
                setPost(response.data.data);
            } catch (error) {
                console.error('Error fetching blog post:', error);
                toast.error('Failed to load blog post');
            } finally {
                setIsLoading(false);
            }
        };

        if (slug) {
            fetchPost();
        }
    }, [slug]);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
        );
    }

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
                <div className='flex items-center gap-2 mb-4'>
                    <Link href="/blogs">
                        <Button variant="default">
                            <ArrowLeft className="h-4 w-4" />
                        </Button>
                    </Link>
                    <h1 className="text-4xl font-bold text-gray-900">{post.title}</h1>
                </div>
                <p className="text-xl text-gray-600 mb-6">{post.description}</p>

                {/* Author and Meta Info */}
                <div className="flex items-center gap-6 text-gray-600">
                    <div className="flex items-center gap-2">
                        {post.author.image ? (
                            <Image
                                src={post.author.image}
                                alt={post.author.name}
                                className="w-10 h-10 rounded-full object-cover"
                                width={64}
                                height={64}
                            />
                        ) : (
                            <User className="w-10 h-10 p-2 bg-gray-200 rounded-full" />
                        )}
                        <span className="font-medium">{post.author.name}</span>
                    </div>

                    <div className="flex items-center gap-2">
                        <Calendar className="w-5 h-5" />
                        <span>{new Date(post.publishedAt || post.createdAt).toLocaleDateString()}</span>
                    </div>

                    <div className="flex items-center gap-2">
                        <Clock className="w-5 h-5" />
                        <span>{Math.ceil(post.content.split(' ').length / 200)} min read</span>
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
                        <Tag className="w-5 h-5 text-gray-600" />
                        {post.tags.map((tag: string) => (
                            <span
                                key={tag}
                                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            )}
        </article>
    );
}