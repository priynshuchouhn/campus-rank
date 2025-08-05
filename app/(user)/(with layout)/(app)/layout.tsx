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
            <aside className="hidden md:flex flex-col w-72 border-r bg-card dark:bg-background">
                <Separator />
                <ScrollArea className="flex-1 p-4">
                    <div>
                        <Sidebar user={user} />
                    </div>
                </ScrollArea>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-h-screen w-full overflow-hidden">

                {/* Main Content Area */}
                <main className="flex-1 p-4 md:p-6">
                    {children}
                </main>
            </div>
        </div>
    );
} 