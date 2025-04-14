'use client';
import { Share2 } from 'lucide-react';
import {
    TwitterShareButton,
    FacebookShareButton,
    LinkedinShareButton,
    TwitterIcon,
    FacebookIcon,
    LinkedinIcon,
    WhatsappShareButton,
    WhatsappIcon,
} from 'next-share';

interface ShareProps {
    url: string;
    title: string;
    description?: string;
    image?: string;
    className?: string;
}

export function Share({ url, title, description, image, className = '' }: ShareProps) {
    return (
        <div className={`flex items-center gap-4 ${className}`}>
            <Share2 className="w-5 h-5 text-gray-600" />
            <span className="font-medium text-gray-700">Share:</span>
            <div className="flex gap-2">
                <TwitterShareButton url={url} title={title}>
                    <TwitterIcon size={32} round />
                </TwitterShareButton>
                <FacebookShareButton url={url} quote={title}>
                    <FacebookIcon size={32} round />
                </FacebookShareButton>
                <LinkedinShareButton url={url} title={title} summary={description}>
                    <LinkedinIcon size={32} round />
                </LinkedinShareButton>
                <WhatsappShareButton url={url} title={title}>
                    <WhatsappIcon size={32} round />
                </WhatsappShareButton>
            </div>
        </div>
    );
} 