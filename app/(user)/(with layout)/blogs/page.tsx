


import { ThreeDMarquee } from '@/components/ui/3d-marquee';
import BlogPostList from '@/components/ui/blog-post-list';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Campus Rank Blogs - Learn, Grow, and Get Ranked',
    description: 'Explore expert tips, coding strategies, student success stories, and placement preparation guides. Stay updated with the latest insights for your career growth.',
    keywords: 'coding blogs, placement preparation, student success stories, career growth, coding strategies, campus rank, tech education',
    openGraph: {
        title: 'Campus Rank Blogs - Learn, Grow, and Get Ranked',
        description: 'Explore expert tips, coding strategies, student success stories, and placement preparation guides.',
        type: 'website',
        locale: 'en_US',
        siteName: 'Campus Rank',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Campus Rank Blogs - Learn, Grow, and Get Ranked',
        description: 'Explore expert tips, coding strategies, student success stories, and placement preparation guides.',
    },
    alternates: {
        canonical: '/blogs',
    },
}; 

const images = [
    "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&auto=format&fit=crop&q=60", // coding workspace
    "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=800&auto=format&fit=crop&q=60", // code on screen
    "https://images.unsplash.com/photo-1555099962-4199c345e5dd?w=800&auto=format&fit=crop&q=60", // laptop with code
    "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=60", // coding on laptop
    "https://images.unsplash.com/photo-1522252234503-e356532cafd5?w=800&auto=format&fit=crop&q=60", // code close-up
    "https://images.unsplash.com/photo-1573495612937-f02b92648e5b?w=800&auto=format&fit=crop&q=60", // technical interview
    "https://images.unsplash.com/photo-1523800503107-5bc3ba2a6f81?w=800&auto=format&fit=crop&q=60", // whiteboard coding
    "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=60", // algorithm visualization
    "https://images.unsplash.com/photo-1581472723648-909f4851d4ae?w=800&auto=format&fit=crop&q=60", // DSA notebook
    "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&auto=format&fit=crop&q=60", // blog writing
    "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&auto=format&fit=crop&q=60", // blogging on laptop
    "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&auto=format&fit=crop&q=60", // study notes
    "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&auto=format&fit=crop&q=60", // business meeting/interview
    "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=800&auto=format&fit=crop&q=60", // laptop user
    "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&auto=format&fit=crop&q=60", // notebook with pen
    "https://images.unsplash.com/photo-1509966756634-9c23dd6e6815?w=800&auto=format&fit=crop&q=60", // data structure sketch
    "https://images.unsplash.com/photo-1580927752452-89d86da3fa0a?w=800&auto=format&fit=crop&q=60", // coding setup
    "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=60", // binary code
    "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=800&auto=format&fit=crop&q=60", // code projection
    "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800&auto=format&fit=crop&q=60", // coding close-up
    "https://images.unsplash.com/photo-1591267990532-e5bdb1b0ceb8?w=800&auto=format&fit=crop&q=60", // algorithm flowchart
    "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&auto=format&fit=crop&q=60", // interview handshake
    "https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?w=800&auto=format&fit=crop&q=60", // study with laptop
    "https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=800&auto=format&fit=crop&q=60", // code on screen
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&auto=format&fit=crop&q=60", // coding hands
    "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&auto=format&fit=crop&q=60", // laptop and coffee
    "https://images.unsplash.com/photo-1543286386-713bdd548da4?w=800&auto=format&fit=crop&q=60", // interview preparation
    "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&auto=format&fit=crop&q=60", // team coding
    "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&auto=format&fit=crop&q=60", // data visualization
    "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&auto=format&fit=crop&q=60", // coding close-up
];

export default function BlogsPage() {
    return (
        <div className="min-h-screen bg-background">
            {/* Hero Section */}
            <section className='relative h-96 py-24 px-4' aria-label="Blogs introduction">
                <h1 className="relative z-20 mx-auto max-w-4xl text-center text-2xl font-bold text-balance text-white md:text-4xl lg:text-6xl">
                    Learn, Grow, and Get Ranked!
                    <span className="relative z-20 inline-block rounded-xl bg-blue-500/40 px-4 py-1 mt-1 text-white underline decoration-sky-500 decoration-[6px] underline-offset-[16px] backdrop-blur-sm">
                        Campus Rank Blogs
                    </span>{" "}
                </h1>
                <p className="relative z-20 mx-auto max-w-2xl py-8 text-center text-sm text-neutral-200 md:text-base">
                    Explore tips, coding strategies, student success stories, and placement preparation guides.
                </p>
                <div className="absolute inset-0 z-10 h-full w-full bg-black/80 dark:bg-black/40" aria-hidden="true" />
                <ThreeDMarquee
                    className="pointer-events-none absolute inset-0 h-full w-full"
                    images={images}
                    aria-hidden="true"
                />
            </section>

            {/* Main Content */}
            <BlogPostList />
        </div>
    );
}