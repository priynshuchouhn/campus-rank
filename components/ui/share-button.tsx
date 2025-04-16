'use client';

import { Button } from "@/components/ui/button";
import { Loader2, Share2 } from "lucide-react";
import toast from "react-hot-toast";
import domtoimage from 'dom-to-image';
import { ShareableProfileCard } from "./shareable-profile-card";
import { useState } from "react";

interface ShareButtonProps {
    name: string;
    username: string;
    image?: string | null;
    totalSolved: number;
    campusRank: number;
    leetcodeRank: number;
    gfgRank: string;
    easySolved: number;
    mediumSolved: number;
    hardSolved: number;
    gfgSolved: number;
    gfgScore: number;
    badges?: Array<{
        name: string;
        stars: string;
    }>;
}

export function ShareButton({
    name,
    username,
    image,
    totalSolved,
    campusRank,
    leetcodeRank,
    gfgRank,
    easySolved,
    mediumSolved,
    hardSolved,
    gfgSolved,
    gfgScore,
    badges
}: ShareButtonProps) {
    const [isGenerating, setIsGenerating] = useState(false);

    const shareProfile = async () => {
        try {
            setIsGenerating(true);

            // Create a temporary container
            const container = document.createElement('div');
            container.style.position = 'absolute';
            container.style.left = '-9999px';
            document.body.appendChild(container);

            // Render the ShareableProfileCard
            const root = document.createElement('div');
            root.id = 'shareable-profile-root';
            container.appendChild(root);

            // Use ReactDOM.render to render the component
            const { createRoot } = await import('react-dom/client');
            const rootElement = createRoot(root);
            rootElement.render(
                <ShareableProfileCard
                    name={name}
                    username={username}
                    image={image}
                    totalSolved={totalSolved}
                    campusRank={campusRank}
                    leetcodeRank={leetcodeRank}
                    gfgRank={gfgRank}
                    easySolved={easySolved}
                    mediumSolved={mediumSolved}
                    hardSolved={hardSolved}
                    gfgSolved={gfgSolved}
                    gfgScore={gfgScore}
                    badges={badges}
                />
            );

            // Wait for the component to render
            await new Promise(resolve => setTimeout(resolve, 100));


            // Create image from the rendered component
            const dataUrl = await domtoimage.toPng(root, {
                quality: 1.0,
                bgcolor: '#ffffff',
                style: {
                    'transform': 'scale(1)',
                    'transform-origin': 'top left'
                },
                filter: (node) => {
                    // Skip the next/image wrapper div
                    return !(node instanceof HTMLElement && node.tagName === 'DIV' && node.style.position === 'relative');
                }
            });

            // Clean up
            document.body.removeChild(container);

            // Convert data URL to blob
            const response = await fetch(dataUrl);
            const blob = await response.blob();
            const file = new File([blob], `${username}-profile.png`, { type: 'image/png' });

            if (typeof window !== 'undefined' && navigator.share) {
                try {
                    await navigator.share({
                        title: `${name}'s Coding Profile`,
                        text: `Check out ${name}'s coding achievements on Campus Rank!`,
                        url: `https://campusrank.org/user/${username}`,
                        files: [file]
                    });
                    toast.success("Profile shared successfully!");
                } catch (error) {
                    console.log('Error sharing:', error);
                    if (error instanceof Error && error.name !== 'AbortError') {
                        // Fallback to copying link to clipboard
                        await navigator.clipboard.writeText(`https://campusrank.org/user/${username}`);
                        toast.success("Profile link copied to clipboard!");
                    }
                }
            } else {
                // Fallback for browsers that don't support Web Share API
                await navigator.clipboard.writeText(`https://campusrank.org/user/${username}`);
                toast.success("Profile link copied to clipboard!");
            }
        } catch (error) {
            console.error('Error generating snapshot:', error);
            toast.error("Failed to share profile");
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
            onClick={shareProfile}
            disabled={isGenerating}
        >
            {isGenerating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Share2 className="w-4 h-4" />}
            <p className="hidden md:block">
                {isGenerating ? "Generating..." : "Share Profile"}
            </p>
        </Button>
    );
} 