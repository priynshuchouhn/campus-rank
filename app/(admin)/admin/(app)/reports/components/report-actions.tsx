"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { toast } from "react-hot-toast";

interface ReportActionsProps {
    report: {
        id: string;
        status: string;
    };
}

export function ReportActions({ report }: ReportActionsProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const updateStatus = async (status: string) => {
        try {
            setLoading(true);
            const response = await fetch(`/api/reports/${report.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ status }),
            });

            if (!response.ok) {
                throw new Error("Failed to update status");
            }

            toast.success("Status updated successfully");
            router.refresh();
        } catch (error) {
            toast.error("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem
                    onClick={() => updateStatus("IN_PROGRESS")}
                    disabled={loading || report.status === "IN_PROGRESS"}
                >
                    Mark as In Progress
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={() => updateStatus("RESOLVED")}
                    disabled={loading || report.status === "RESOLVED"}
                >
                    Mark as Resolved
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={() => updateStatus("CLOSED")}
                    disabled={loading || report.status === "CLOSED"}
                >
                    Close Report
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
} 