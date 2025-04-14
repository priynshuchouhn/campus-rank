import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
    request: Request,
    { params }: { params: Promise<{ slug: string }> }
) {
    try {
        const { slug } = await params;
        const blogPost = await prisma.blogPost.findFirst({
            where: {
                slug: slug,
                isPublished: true,
                isApproved: true,
                isDeleted: false,
            },
            include: {
                author: {
                    select: {
                        name: true,
                        image: true,
                    },
                },
            },
        });

        if (!blogPost) {
            return new NextResponse('Blog post not found', { status: 404 });
        }

        return NextResponse.json({ data: blogPost });
    } catch (error) {
        console.error('Error fetching blog post:', error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
} 