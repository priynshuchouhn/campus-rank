import BlogPostForm from '@/components/ui/blog-post-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import React from 'react'

function AddBlog() {
    return (
        <div className="container mx-auto py-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Blog Management</h1>
            </div>

                <Card className="mb-8">
                    <CardHeader>
                        <CardTitle>Create New Blog Post</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <BlogPostForm/>
                    </CardContent>
                </Card>
        </div>
    );
}

export default AddBlog
