"use client";

import { PromotionalEmailForm } from "@/components/ui/promotional-email-form";

export default function EmailsPage() {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold">Email Campaigns</h1>
                <p className="text-muted-foreground mt-2">
                    Send promotional emails to your users
                </p>
            </div>

            <div className="">
                    <PromotionalEmailForm />
            </div>
        </div>
    );
} 