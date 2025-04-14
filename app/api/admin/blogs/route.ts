import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { slugify } from '@/lib/utils';

export async function GET() {
    try {
        const session = await auth();
        
        if (!session?.user) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        const blogPosts = await prisma.blogPost.findMany({
            orderBy: {
                createdAt: 'desc',
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

export async function POST(req: Request) {
    try {
            const session = await auth();
        
        if (!session?.user) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        const body = await req.json();
        const { title, description, content, featuredImage, tags, category } = body;

        const slug = slugify(title);

        const blogPost = await prisma.blogPost.create({
            data: {
                title,
                description,
                content,
                featuredImage,
                tags,
                slug,
                category,
                authorId: session.user.id,
                publishedAt: session.user.role === 'ADMIN' ? new Date() : undefined,
                isPublished: session.user.role === 'ADMIN',
                isApproved: session.user.role === 'ADMIN',
            },
        });

        return NextResponse.json(blogPost);
    } catch (error) {
        console.error('Error creating blog post:', error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}

export async function PUT(req: Request) {
    try {
        const session = await auth();
        
        if (!session?.user) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        const body = await req.json();
        const { id, title, description, content, featuredImage, category, tags } = body;

        const slug = slugify(title);

        const blogPost = await prisma.blogPost.update({
            where: { id },
            data: {
                title,
                description,
                content,
                featuredImage,
                tags,
                slug,
                category,
                publishedAt: session.user.role === 'ADMIN' ? new Date() : undefined,
                isPublished: session.user.role === 'ADMIN',
                isApproved: session.user.role === 'ADMIN',
            },
        });

        return NextResponse.json(blogPost);
    } catch (error) {
        console.error('Error updating blog post:', error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}

export async function DELETE(req: Request) {
    try {
        const session = await auth();
        
        if (!session?.user) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');

        if (!id) {
            return new NextResponse('Blog post ID is required', { status: 400 });
        }

        await prisma.blogPost.update({
            where: { id },
            data: {
                isPublished: false,
                isApproved: false,
            },
        });

        return new NextResponse(null, { status: 204 });
    } catch (error) {
        console.error('Error deleting blog post:', error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
} 