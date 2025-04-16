"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "react-hot-toast";

export function PromotionalEmailForm() {
    const [subject, setSubject] = useState("");
    const [content, setContent] = useState("");
    const [targetAudience, setTargetAudience] = useState("all");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await fetch("/api/admin/send-promotional-email", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    subject,
                    content,
                    targetAudience,
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to send promotional email");
            }

            toast.success("Promotional email sent successfully!");
            setSubject("");
            setContent("");
            setTargetAudience("all");
        } catch (error) {
            toast.error("Failed to send promotional email");
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-6 p-6 bg-white rounded-lg shadow">
            <h2 className="text-2xl font-bold">Send Promotional Email</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                        id="subject"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        placeholder="Enter email subject"
                        required
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="content">Content</Label>
                    <Textarea
                        id="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Enter email content"
                        required
                        className="min-h-[200px]"
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="targetAudience">Target Audience</Label>
                    <Select value={targetAudience} onValueChange={setTargetAudience}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select target audience" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Users</SelectItem>
                            <SelectItem value="active">Active Users</SelectItem>
                            <SelectItem value="inactive">Inactive Users</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <Button type="submit" disabled={isLoading}>
                    {isLoading ? "Sending..." : "Send Email"}
                </Button>
            </form>
        </div>
    );
} 