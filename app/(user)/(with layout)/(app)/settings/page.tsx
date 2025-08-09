'use client';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { changeProfileVisiblity, getUser } from "@/lib/actions/users";
import { redirect, useRouter } from "next/navigation";
import { ArrowLeft, HelpCircle, Loader2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useEffect, useState } from "react";
import { User } from "@prisma/client";
import toast from "react-hot-toast";

export default function Setting() {
  const [user, setUser] = useState<User | any>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    async function fetchUser() {
      try {
        setIsLoading(true)
        const data = await getUser();
        setUser(data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false)
      }
    }
    fetchUser();
  }, [])

  async function handleVisibilityChange(){
      try {
        const data = await changeProfileVisiblity();
        if(data){
          toast.success('Profile Visibility Changed');
          router.push('/profile')
          return;
        }
        toast.error('Failed to change visibility');
      } catch (error) {
        toast.error('Failed to change visibility');
      }
  }

  if(isLoading || !user){
    return <div className="min-h-screen flex items-center justify-center">
      <Loader2 className="w-8 h-8 animate-spin"/>
    </div>
  }

  return (
    <main>
      <div className="flex items-center gap-4 mb-8">
        <Link href="/dashboard">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h2 className="text-2xl font-bold">Settings</h2>
      </div>

      <div className="max-w-3xl mx-auto">
        <Card className="mb-8">
          <CardContent>
          <div className="grid grid-cols-1 gap-6">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-5">Profile Visibility</h3>
                <div className="flex items-center gap-2 mb-3">
                  <div className={`w-5 h-5 rounded-full ${user.isPublic ? 'bg-green-500' : 'bg-red-900'}`}></div>
                  <p className="text-sm text-muted-foreground">
                    {user.isPublic
                      ? "Your profile is visible to everyone. Anyone can view your details and progress."
                      : "Your profile is private. Only you can see your details and progress."}
                  </p>
                  <Tooltip>
                    <TooltipTrigger><HelpCircle className="h-4 w-4 text-gray-500 -m-1" /></TooltipTrigger>
                    <TooltipContent>
                      <p>Make your profile private to hide it from leaderboard</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <Button size={'sm'} onClick={handleVisibilityChange}>Make {user.isPublic ? 'Private' : 'Public'}</Button>
              </div>

              {/* <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-2">Member Since</h3>
                <span>{user.createdAt.toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}</span>
              </div> */}
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}