"use client";

import { PromotionalEmailForm } from "@/components/admin/promotional-email-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail } from "lucide-react";

export default function EmailsPage() {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold">Email Campaigns</h1>
                <p className="text-muted-foreground mt-2">
                    Send promotional emails to your users
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Email Stats</CardTitle>
                        <Mail className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div>
                                <p className="text-2xl font-bold">2,350</p>
                                <p className="text-xs text-muted-foreground">Total Subscribers</p>
                            </div>
                            <div>
                                <p className="text-2xl font-bold">98%</p>
                                <p className="text-xs text-muted-foreground">Delivery Rate</p>
                            </div>
                            <div>
                                <p className="text-2xl font-bold">45%</p>
                                <p className="text-xs text-muted-foreground">Open Rate</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <div className="lg:col-span-2">
                    <PromotionalEmailForm />
                </div>
            </div>
        </div>
    );
} 