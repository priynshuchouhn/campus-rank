'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'react-hot-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function PushNotificationsPage() {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [url, setUrl] = useState('');
    const [targetAudience, setTargetAudience] = useState('all');
    const [isLoading, setIsLoading] = useState(false);

    const handleSendNotification = async () => {
        if (!title || !body) {
            toast.error('Please fill in all required fields');
            return;
        }

        setIsLoading(true);
        try {
            const response = await fetch('/api/push/send', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title,
                    body,
                    url,
                    targetAudience,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to send notification');
            }


            toast.success('Notification sent successfully');
            setTitle('');
            setBody('');
            setUrl('');
        } catch (error) {
            console.error('Error sending notification:', error);
            toast.error('Failed to send notification');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="mx-auto py-6">
            <Card>
                <CardHeader>
                    <CardTitle>Send Push Notification</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="title">Title</Label>
                        <Input
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Enter notification title"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="body">Message</Label>
                        <Textarea
                            id="body"
                            value={body}
                            onChange={(e) => setBody(e.target.value)}
                            placeholder="Enter notification message"
                            rows={4}
                        />
                    </div>

                    <div className="grid md:grid-cols-3 grid-cols-1 gap-4">
                        <div className="space-y-2 col-span-2">
                            <Label htmlFor="url">URL (Optional)</Label>
                            <Input
                                id="url"
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                                placeholder="Enter URL to open when notification is clicked"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="target">Target Audience</Label>
                            <Select value={targetAudience} onValueChange={setTargetAudience}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select target audience" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Users</SelectItem>
                                    <SelectItem value="active">Active Users (Last 30 days)</SelectItem>
                                    <SelectItem value="inactive">Inactive Users</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>


                    <Button
                        onClick={handleSendNotification}
                        disabled={isLoading}
                        className="w-auto"
                    >
                        {isLoading ? 'Sending...' : 'Send Notification'}
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
} 