import Image from 'next/image';
import Link from 'next/link';
import { Calendar, User, BookOpen, Clock } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BlogPost } from '@/lib/interfaces';
import { timeAgo } from '@/lib/utils';
interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <Card className="flex flex-col h-full overflow-hidden hover:shadow-lg transition-all duration-300 group pt-0">
      <div className="relative h-52 overflow-hidden">
        <Image
          src={post.featuredImage}
          alt={post.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent" />
        <Badge 
          variant="secondary" 
          className="absolute top-4 left-4 bg-background/80 backdrop-blur-sm"
        >
          {post.category}
        </Badge>
      </div>
      
      <CardHeader className="space-y-2">
        <h3 className="text-xl font-semibold leading-tight line-clamp-2 group-hover:text-primary transition-colors">
          {post.title}
        </h3>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <User size={14} />
            <span>{post.author.name}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock size={14} />
            <span>{timeAgo(post.publishedAt)}</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-grow">
        <p className="text-muted-foreground line-clamp-2">
          {post.description}
        </p>
      </CardContent>

      <CardFooter className="border-t pt-4">
        <div className="flex items-center justify-center w-full">
          <Link href={`/blogs/${post.id}`}>
            <Button variant="ghost" size="sm" className="group/btn">
              Read Complete Article
              <BookOpen size={14} className="ml-2 group-hover/btn:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}