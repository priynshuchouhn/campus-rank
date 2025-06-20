
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Github } from "lucide-react";
import { signIn } from "@/auth";
import Image from "next/image";




export function AuthForm() {
    return (
        <Card className="w-full max-w-md mx-auto">
            <CardHeader>
                <CardTitle className="flex flex-col justify-center items-center gap-4">
                <Image src="/logo.jpg" alt="Campus Rank" className='w-16 h-16 rounded-full' width={250} height={250} />
                    <p className="text-2xl font-bold">Welcome to Campus Rank</p>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-background px-2 text-muted-foreground">
                                Continue with
                            </span>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <form action={async () => {
                            "use server"
                            await signIn("github", {
                                redirectTo: "/profile",
                            })
                        }}>
                            <Button variant="outline" className="w-full">
                                <Github className="mr-2 h-4 w-4" />
                                Github
                            </Button>
                        </form>
                        <form action={async () => {
                            "use server"
                            await signIn("google", {
                                redirectTo: "/profile",
                            })
                        }}>
                            <Button variant="outline" className="w-full">
                                Google
                            </Button>
                        </form>
                    </div>
                </div>
                <div>
                    <p className="mt-6 text-xs text-center text-muted-foreground">
                        By signing in, you agree to our{" "}
                        <a href="/terms-of-service" className="underline hover:text-primary" target="_blank" rel="noopener noreferrer">
                            Terms of Service
                        </a>
                        ,{" "}
                        <a href="/privacy-policy" className="underline hover:text-primary" target="_blank" rel="noopener noreferrer">
                            Privacy Policy
                        </a>
                        , and{" "}
                        <a href="/code-of-conduct" className="underline hover:text-primary" target="_blank" rel="noopener noreferrer">
                            Community Guidelines
                        </a>
                        .
                    </p>
                </div>
            </CardContent>
        </Card>
    );
}