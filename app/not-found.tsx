'use client'
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { ArrowLeft, Code, Home } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import React from 'react'

function notFound() {
  return (
    <main className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Image src="/logo.jpg" alt="Campus Rank" width={48} height={48} className="rounded-full" />
            <span>Campus Rank</span>
          </Link>
          <ThemeToggle />
        </div>
      </div>

      {/* 404 Content */}
      <div className="flex-1 flex items-center justify-center">
        <div className="max-w-md mx-auto px-4 text-center">
          <div className="relative">
            <div className="text-[12rem] font-bold text-gray-600/10 leading-none select-none dark:text-gray-400/10">
              404
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="space-y-2">
                <h1 className="text-2xl font-bold">Page Not Found</h1>
                <p className="text-muted-foreground">
                  Oops! The page you&apos;re looking for seems to have vanished into the
                  code void.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild>
              <Link href="/">
                <Home className="mr-2 h-4 w-4" />
                Back to Home
              </Link>
            </Button>
            <Button variant="outline" onClick={() => window.history.back()}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Go Back
            </Button>
          </div>

          <div className="mt-12 p-4 bg-muted/50 rounded-lg">
            <p className="text-sm text-muted-foreground">
              Need help? Contact our support team at{" "}
              <a
                href="mailto:support@campusrank.com"
                className="text-primary hover:underline"
              >
                support@campusrank.org
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="container mx-auto px-4 py-6">
        <div className="text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Campus Rank. All rights
          reserved.
        </div>
      </div>
    </main>
  )
}

export default notFound
