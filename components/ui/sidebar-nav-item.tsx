import Link from "next/link";
import { Badge } from "./badge";
import { ChevronRight } from "lucide-react";
import { Button } from "./button";
import { cn } from "@/lib/utils";

interface SidebarNavItemProps {
    href: string;
    icon: React.ReactNode;
    title: string;
    isActive?: boolean;
    badge?: string;
}

export function SidebarNavItem({ href, icon, title, isActive, badge, ...props }: SidebarNavItemProps) {
    return (
        <Link href={href} passHref>
            <Button
                variant="ghost"
                className={cn(
                    "flex items-center justify-start gap-2 w-full h-10 px-4 mb-1",
                    isActive ? "bg-accent text-accent-foreground font-medium" : "hover:bg-accent/50"
                )}
                {...props}
            >
                {icon}
                <span>{title}</span>

                {badge && (
                    <Badge
                        variant="outline"
                        className="ml-auto text-xs py-0 px-1.5 h-5 bg-yellow-100/50 text-yellow-800 border-yellow-300"
                    >
                        {badge}
                    </Badge>
                )}

                {isActive && !badge && <ChevronRight className="ml-auto h-4 w-4" />}
                {isActive && badge && <ChevronRight className="ml-2 h-4 w-4" />}
            </Button>
        </Link>
    );
}