import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
    try {
        const blogPosts = await prisma.blogPost.findMany({
            where: {
                isPublished: true,
                isApproved: true,
                isDeleted: false,
            },
            orderBy: {
                publishedAt: 'desc',
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

        return NextResponse.json(blogPosts);
    } catch (error) {
        console.error('Error fetching blog posts:', error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
} 