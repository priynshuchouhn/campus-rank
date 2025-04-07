import React from 'react';
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import Sidebar from "@/components/ui/sidebar";
import { redirect } from 'next/navigation';
import { auth } from '@/auth';


export default async function AppLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await auth();
    const user = session?.user;
    return (
        <div className="flex min-h-screen">
            {/* Desktop Sidebar */}
            <aside className="hidden md:flex flex-col w-72 border-r bg-card">
                <Separator />
                <ScrollArea className="flex-1 p-4">
                    <div>
                        <Sidebar user={user} />
                    </div>
                </ScrollArea>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-h-screen">
                {/* Mobile Header */}
                {/* <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:px-6 md:hidden">
                    
                    <div className="flex-1 flex justify-center">
                        <Link href="/" className="flex items-center gap-2">
                            <span className="font-bold text-lg">Campus Rank</span>
                        </Link>
                    </div>
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="icon">
                            <Bell className="h-5 w-5" />
                            <span className="sr-only">Notifications</span>
                        </Button>
                        <Avatar className="h-8 w-8">
                            <AvatarImage src="/placeholder-user.jpg" alt="User" />
                            <AvatarFallback>U</AvatarFallback>
                        </Avatar>
                    </div>
                </header> */}

                {/* Main Content Area */}
                <main className="flex-1 p-4 md:p-6">
                    {children}
                </main>
            </div>
        </div>
    );
} 