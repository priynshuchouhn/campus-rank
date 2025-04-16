'use client'
import { Plus, ShareIcon, X } from "lucide-react"
import { useEffect, useState } from "react"
import { Button } from "./button"

export default function InstallPrompt() {
    const [isIOS, setIsIOS] = useState(false)
    const [isStandalone, setIsStandalone] = useState(false)
    const [isVisible, setIsVisible] = useState(false)
    const [deferredPrompt, setDeferredPrompt] = useState<any>(null)

    useEffect(() => {
        // Check if device is iOS
        setIsIOS(
            /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream
        )

        // Check if app is already installed
        setIsStandalone(window.matchMedia('(display-mode: standalone)').matches)

        // Listen for beforeinstallprompt event
        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault()
            setDeferredPrompt(e)
        })

        // Check when the prompt was last shown
        const checkPromptVisibility = () => {
            const lastShown = localStorage.getItem('installPromptLastShown')

            if (!lastShown) {
                // Never shown before, show it now
                setIsVisible(true)
                localStorage.setItem('installPromptLastShown', Date.now().toString())
                return
            }

            const lastShownDate = parseInt(lastShown)
            const oneWeek = 7 * 24 * 60 * 60 * 1000 // 7 days in milliseconds
            const hasWeekPassed = Date.now() - lastShownDate > oneWeek

            if (hasWeekPassed) {
                setIsVisible(true)
                localStorage.setItem('installPromptLastShown', Date.now().toString())
            }
        }

        // Only run this check if the app is not already installed
        if (!isStandalone) {
            checkPromptVisibility()
        }
    }, [isStandalone])

    const handleInstallClick = async () => {
        if (deferredPrompt) {
            deferredPrompt.prompt()
            const { outcome } = await deferredPrompt.userChoice
            if (outcome === 'accepted') {
                setDeferredPrompt(null)
            }
        }
        setIsVisible(false);
    }

    const handleDismiss = () => {
        setIsVisible(false)
        // Update last shown time when dismissed manually
        localStorage.setItem('installPromptLastShown', Date.now().toString())
    }

    if (isStandalone || !isVisible) {
        return null
    }

    return (
        <div className="fixed bottom-4 right-4 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 rounded-lg shadow-lg p-4 max-w-sm border border-indigo-100 dark:border-gray-700">
            <div className="flex flex-col gap-3">
                <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-indigo-900 dark:text-indigo-100">Install Campus Rank</h3>
                    <button
                        onClick={handleDismiss}
                        className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>
                {!isIOS && (
                    <Button
                        className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-md"
                        onClick={handleInstallClick}
                    >
                        Add to Home Screen
                    </Button>
                )}
                {isIOS && (
                    <div className="space-y-2">
                        <div className="text-sm text-indigo-700 dark:text-indigo-300">
                            <p className="font-medium mb-2">To install this app on your iOS device:</p>
                            <ol className="list-decimal list-inside space-y-1">
                                <li>Tap the share button <ShareIcon className="inline-block w-4 h-4 mx-1" /></li>
                                <li>Scroll down and tap &quot;Add to Home Screen&quot; <Plus className="inline-block w-4 h-4 mx-1" /></li>
                                <li>Tap &quot;Add&quot; in the top-right corner</li>
                            </ol>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
