
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Github } from "lucide-react";
import { signIn } from "@/auth";




export function AuthForm() {
    return (
        <Card className="w-full max-w-md mx-auto">
            <CardHeader>
                <CardTitle className="text-2xl text-center">
                    Welcome to Campus Rank
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
                            await signIn("github")
                        }}>
                            <Button variant="outline" className="w-full">
                                <Github className="mr-2 h-4 w-4" />
                                Github
                            </Button>
                        </form>
                        <form action={async () => {
                            "use server"
                            await signIn("google")
                        }}>
                            <Button variant="outline" className="w-full">
                                Google
                            </Button>
                        </form>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}