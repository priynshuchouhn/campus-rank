'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus } from 'lucide-react';
import BlogPostForm from '@/components/admin/blog-post-form';
import BlogPostList from '@/components/admin/blog-post-list';
import { BlogPost } from '@/lib/interfaces';

export default function AdminBlogsPage() {
    const [isCreating, setIsCreating] = useState(false);
    const [editingPost, setEditingPost] = useState<BlogPost | null>(null);

    return (
        <div className="container mx-auto py-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Blog Management</h1>
                <Button onClick={() => setIsCreating(true)}>
                    <Plus className="mr-2 h-4 w-4" />
                    New Blog Post
                </Button>
            </div>

            {isCreating && (
                <Card className="mb-8">
                    <CardHeader>
                        <CardTitle>Create New Blog Post</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <BlogPostForm
                            onCancel={() => setIsCreating(false)}
                            onSuccess={() => setIsCreating(false)}
                        />
                    </CardContent>
                </Card>
            )}

            <BlogPostList />
        </div>
    );
} 