'use client'
import { blogPosts, categories } from '@/lib/data'
import React, { useState } from 'react'
import BlogCard from './blog-card'
import { Button } from './button'
import { BookOpen } from 'lucide-react'
import FilterBar from './blog-filter-bar'

function BlogPostList() {
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [visiblePosts, setVisiblePosts] = useState(6);

    const filteredPosts = selectedCategory === 'all'
        ? blogPosts
        : blogPosts.filter(post => post.category === selectedCategory);

    const handleLoadMore = () => {
        setVisiblePosts(prev => Math.min(prev + 6, filteredPosts.length));
    };
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
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredPosts.slice(0, visiblePosts).map((post) => (
                            <BlogCard key={post.id} post={post} />
                        ))}
                    </div>
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
  )
}

export default BlogPostList
