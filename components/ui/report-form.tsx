"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "react-hot-toast";

interface ReportFormProps {
    defaultType?: string;
    buttonText?: string;
    platform?: "leetcode" | "hackerrank" | "gfg";
}

export function ReportForm({ defaultType = "", buttonText = "Report an Issue", platform }: ReportFormProps) {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        type: defaultType,
        title: defaultType === "USERNAME_CHANGE" ? `${platform ? platform.charAt(0).toUpperCase() + platform.slice(1) : "Platform"} Username Change Request` : "",
        description: "",
        requestedUsername: "",
        platform: platform || "",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch("/api/reports", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error("Failed to submit report");
            }

            toast.success("Report submitted successfully");
            setOpen(false);
            router.refresh();
        } catch (error) {
            toast.error("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm">{buttonText}</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Submit a Report</DialogTitle>
                    <DialogDescription>
                        Report a bug, issue, or request a username change.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Type</label>
                        <Select
                            value={formData.type}
                            onValueChange={(value) =>
                                setFormData({ ...formData, type: value })
                            }
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="BUG">Bug Report</SelectItem>
                                <SelectItem value="ISSUE">General Issue</SelectItem>
                                <SelectItem value="USERNAME_CHANGE">Username Change Request</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    {formData.type === "USERNAME_CHANGE" && (
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Platform</label>
                            <Select
                                value={formData.platform}
                                onValueChange={(value) =>
                                    setFormData({ ...formData, platform: value })
                                }
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select platform" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="leetcode">LeetCode</SelectItem>
                                    <SelectItem value="hackerrank">HackerRank</SelectItem>
                                    <SelectItem value="gfg">GeeksforGeeks</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    )}
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Title</label>
                        <Input
                            value={formData.title}
                            onChange={(e) =>
                                setFormData({ ...formData, title: e.target.value })
                            }
                            placeholder={formData.type === "USERNAME_CHANGE" ? `${formData.platform ? formData.platform.charAt(0).toUpperCase() + formData.platform.slice(1) : "Platform"} Username Change Request` : "Brief description of the issue"}
                        />
                    </div>
                    {formData.type === "USERNAME_CHANGE" && (
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Requested Username</label>
                            <Input
                                value={formData.requestedUsername}
                                onChange={(e) =>
                                    setFormData({ ...formData, requestedUsername: e.target.value })
                                }
                                placeholder={`Enter your desired ${formData.platform || "platform"} username`}
                            />
                        </div>
                    )}
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Description</label>
                        <Textarea
                            value={formData.description}
                            onChange={(e) =>
                                setFormData({ ...formData, description: e.target.value })
                            }
                            placeholder={formData.type === "USERNAME_CHANGE" ? `Please explain why you want to change your ${formData.platform || "platform"} username` : "Detailed description of the issue"}
                            className="min-h-[100px]"
                        />
                    </div>
                    <Button type="submit" disabled={loading}>
                        {loading ? "Submitting..." : "Submit Report"}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
} 