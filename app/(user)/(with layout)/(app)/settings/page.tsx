'use client';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { changeProfileVisiblity, getUser } from "@/lib/actions/users";
import { redirect, useRouter } from "next/navigation";
import { ArrowLeft, Bell, Calendar, Camera, HelpCircle, Loader2, Mail, MapPin, Phone, Shield, User } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useEffect, useState } from "react";
import { User as UserModel } from "@prisma/client";
import toast from "react-hot-toast";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export default function Setting() {
  const [user, setUser] = useState<UserModel | any>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("profile");


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

  async function handleVisibilityChange() {
    try {
      const data = await changeProfileVisiblity();
      if (data) {
        toast.success('Profile Visibility Changed');
        setUser((prev:any) =>  ({...prev,isPublic: !prev.isPublic}))
        router.refresh();
        return;
      }
      toast.error('Failed to change visibility');
    } catch (error) {
      toast.error('Failed to change visibility');
    }
  }

  const handlePreferenceChange = (key: string, value: boolean) => {
    setUser((prev:any) => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [key]: value
      }
    }));
  };


  if (isLoading || !user) {
    return <div className="min-h-screen flex items-center justify-center">
      <Loader2 className="w-8 h-8 animate-spin" />
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
      {/* <div className="max-w-3xl mx-auto">
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
            </div>
          </CardContent>
        </Card>
      </div> */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Notification Settings */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Bell className="h-5 w-5" />
                      Notifications
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Email Notifications</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive updates about your interviews via email
                        </p>
                      </div>
                      <Switch
                        checked={true}
                        onCheckedChange={(checked) => handlePreferenceChange('emailNotifications', checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Push Notifications</Label>
                        <p className="text-sm text-muted-foreground">
                          Get notified about practice reminders
                        </p>
                      </div>
                      <Switch
                        checked={true}
                        onCheckedChange={(checked) => handlePreferenceChange('pushNotifications', checked)}
                      />
                    </div>
                    {/* <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Weekly Reports</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive weekly progress summaries
                        </p>
                      </div>
                      <Switch
                        checked={true}
                        onCheckedChange={(checked) => handlePreferenceChange('weeklyReports', checked)}
                      />
                    </div> */}
                    {/* <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Mentor Feedback</Label>
                        <p className="text-sm text-muted-foreground">
                          Get notified when mentors review your interviews
                        </p>
                      </div>
                      <Switch
                        checked={true}
                        onCheckedChange={(checked) => handlePreferenceChange('mentorFeedback', checked)}
                      />
                    </div> */}
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Practice Reminders</Label>
                        <p className="text-sm text-muted-foreground">
                          Remind me to practice regularly
                        </p>
                      </div>
                      <Switch
                        checked={true}
                        onCheckedChange={(checked) => handlePreferenceChange('practiceReminders', checked)}
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Privacy Settings */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="h-5 w-5" />
                      Privacy & Security
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Profile Visibility</Label>
                        <p className="text-sm text-muted-foreground">
                          Control who can see your profile
                        </p>
                      </div>
                      <select
                        className="px-3 py-2 border rounded-md text-sm"
                        value={user.isPublic ? 'public' : 'private'}
                        onChange={handleVisibilityChange}>
                        <option value="private">Private</option>
                        <option value="public">Public</option>
                      </select>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Share Progress</Label>
                        <p className="text-sm text-muted-foreground">
                          Allow others to see your interview progress
                        </p>
                      </div>
                      <Switch
                        checked={user.isPublic}
                        disabled={true}/>
                    </div>
                    {/* <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Allow Mentor Contact</Label>
                        <p className="text-sm text-muted-foreground">
                          Let mentors reach out to you directly
                        </p>
                      </div>
                      <Switch
                        checked={true}
                        onCheckedChange={(checked) => handlePrivacyChange('allowMentorContact', checked)}
                      />
                    </div> */}
                    <div className="pt-4 border-t">
                      {/* <Button variant="outline" disabled={true} className="w-full mb-2">
                        Change Password
                      </Button> */}
                      <Button variant="outline" disabled={true} className="w-full">
                        Download My Data
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
        </div>
      </div>
    </main>
  );
}