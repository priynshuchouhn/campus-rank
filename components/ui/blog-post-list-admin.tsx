'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Edit, Trash, Eye } from 'lucide-react';
import BlogPostForm from './blog-post-form';
import { BlogPost } from '@/lib/interfaces';

export default function AdminBlogPostList() {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const response = await fetch('/api/admin/blogs');
            if (!response.ok) {
                throw new Error('Failed to fetch blog posts');
            }
            const data = await response.json();
            setPosts(data);
        } catch (error) {
            console.error('Error fetching blog posts:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this blog post?')) {
            return;
        }

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/blogs?id=${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete blog post');
            }

            setPosts(posts.filter(post => post.id !== id));
        } catch (error) {
            console.error('Error deleting blog post:', error);
        }
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="space-y-6">
            {editingPost && (
                <Card className="mb-8">
                    <CardHeader>
                        <CardTitle>Edit Blog Post</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <BlogPostForm
                            initialData={editingPost}
                        />
                    </CardContent>
                </Card>
            )}

            <div className="grid gap-6">
                {posts.map((post) => (
                    <Card key={post.id}>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle>{post.title}</CardTitle>
                            <div className="flex gap-2">
                                <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={() => setEditingPost(post)}
                                >
                                    <Edit className="h-4 w-4" />
                                </Button>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={() => handleDelete(post.id)}
                                >
                                    <Trash className="h-4 w-4" />
                                </Button>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    asChild
                                >
                                    <a href={`/blogs/${post.slug}`} target="_blank" rel="noopener noreferrer">
                                        <Eye className="h-4 w-4" />
                                    </a>
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <p className="text-sm text-muted-foreground">{post.description}</p>
                                <div className="flex flex-wrap gap-2">
                                    <Badge variant="secondary">{post.category}</Badge>
                                    {post.tags.map((tag) => (
                                        <Badge key={tag} variant="outline">
                                            {tag}
                                        </Badge>
                                    ))}
                                </div>
                                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                    <span>Status: {post.isPublished ? 'Published' : 'Draft'}</span>
                                    <span>Created: {new Date(post.createdAt).toLocaleDateString()}</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
} 