import { NextResponse } from 'next/server';
import { getCachedBlogPosts } from '@/lib/public-cache';

export const revalidate = 3600;

export async function GET() {
    try {
        const blogPosts = await getCachedBlogPosts();
        return NextResponse.json(blogPosts);
    } catch (error) {
        console.error('Error fetching blog posts:', error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}
