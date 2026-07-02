import { NextResponse } from 'next/server';
import { getCachedBlogPost } from '@/lib/public-cache';

export const revalidate = 3600;

export async function GET(
    request: Request,
    { params }: { params: Promise<{ slug: string }> }
) {
    try {
        const { slug } = await params;
        const blogPost = await getCachedBlogPost(slug);

        if (!blogPost) {
            return new NextResponse('Blog post not found', { status: 404 });
        }

        return NextResponse.json({ data: blogPost });
    } catch (error) {
        console.error('Error fetching blog post:', error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}
