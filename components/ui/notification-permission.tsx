'use client';

import { useEffect, useState } from 'react';
import { requestNotificationPermission, subscribeToPushNotifications } from '@/lib/push-notifications';
import { useSession } from 'next-auth/react';
import { toast } from 'react-hot-toast';

export const dynamic = 'force-dynamic';

// Function to detect iOS device
function isIOS() {
    return (
        ['iPad', 'iPhone', 'iPod'].includes(navigator?.platform) ||
        (navigator?.userAgent.includes("Mac") && "ontouchend" in document)
    );
}

export function NotificationPermission() {
    const { data } = useSession();
    const session = data;
    const [isIOSDevice, setIsIOSDevice] = useState(false);

    useEffect(() => {
        // Check if it's an iOS device and update state
        if (typeof window !== 'undefined') {
            setIsIOSDevice(isIOS());
        }
    }, []);

    useEffect(() => {
        const requestPermission = async () => {
            // Only request if user is logged in and hasn't granted permission yet
            if (!session?.user?.id || Notification.permission !== 'default') {
                return;
            }

            try {
                const permissionGranted = await requestNotificationPermission();

                if (permissionGranted) {
                    const success = await subscribeToPushNotifications(session.user.id);
                    if (success) {
                        toast.success('Push notifications enabled successfully');
                    }
                }
            } catch (error) {
                console.error('Error requesting notification permission:', error);
            }
        };

        // Add a small delay to ensure the page is fully loaded
        const timer = setTimeout(requestPermission, 2000);

        return () => clearTimeout(timer);
    }, [session?.user?.id]);

    return null; // This component doesn't render anything
} 