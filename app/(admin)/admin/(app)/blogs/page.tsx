import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import BlogPostList from '@/components/ui/blog-post-list-admin';
import Link from 'next/link';

export default function AdminBlogsPage() {
    return (
        <div className="container mx-auto py-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Blog Management</h1>
                <Link href={'/admin/blogs/new'}>
                <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    New Blog Post
                </Button>
                </Link>
            </div>
            <BlogPostList />
        </div>
    );
} 