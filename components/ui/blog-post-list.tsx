'use client'
import { categories } from '@/lib/data'
import React, { useState, useEffect } from 'react'
import BlogCard from './blog-card'
import { Button } from './button'
import { BookOpen } from 'lucide-react'
import FilterBar from './blog-filter-bar'
import { BlogPost } from '@/lib/interfaces'
import axios from 'axios'

function BlogPostList() {
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [visiblePosts, setVisiblePosts] = useState(6);
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const { data } = await axios.get<BlogPost[]>(`${process.env.NEXT_PUBLIC_API_URL}/api/blogs`);
                setPosts(data);
            } catch (err) {
                if (axios.isAxiosError(err)) {
                    setError(err.response?.data?.message || err.message);
                } else {
                    setError('An unexpected error occurred');
                }
            } finally {
                setIsLoading(false);
            }
        };

        fetchPosts();
    }, []);

    const filteredPosts = selectedCategory === 'all'
        ? posts
        : posts.filter(post => post.category === selectedCategory);

    const handleLoadMore = () => {
        setVisiblePosts(prev => Math.min(prev + 6, filteredPosts.length));
    };

    if (isLoading) {
        return (
            <main className="max-w-7xl mx-auto px-4 py-12">
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                </div>
            </main>
        );
    }

    if (error) {
        return (
            <main className="max-w-7xl mx-auto px-4 py-12">
                <div className="text-center text-red-500">
                    <p>Error: {error}</p>
                </div>
            </main>
        );
    }

    return (
        <main className="max-w-7xl mx-auto px-4 py-12">
            <section aria-label="Blog categories">
                <FilterBar
                    categories={categories}
                    selectedCategory={selectedCategory}
                    onCategoryChange={setSelectedCategory}
                />
            </section>

            <section aria-label="Blog posts" className="mt-12">
                {filteredPosts.length === 0 ? (
                    <div className="text-center text-muted-foreground">
                        No blog posts found in this category.
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredPosts.slice(0, visiblePosts).map((post) => (
                            <BlogCard key={post.id} post={post} />
                        ))}
                    </div>
                )}
            </section>

            {visiblePosts < filteredPosts.length && (
                <section className="text-center mt-16" aria-label="Load more posts">
                    <Button
                        onClick={handleLoadMore}
                        variant="outline"
                        size="lg"
                        className="px-8"
                        aria-label="Load more blog posts"
                    >
                        Load More Posts
                        <BookOpen size={16} className="ml-2" aria-hidden="true" />
                    </Button>
                </section>
            )}
        </main>
    );
}

export default BlogPostList
