import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProfileForm } from "@/components/ui/profile-form";
import { getUser } from "@/lib/actions/users";
import Image from "next/image";
import { redirect } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function Profile() {
  const user = await getUser();
  if (!user) {
    redirect("/get-started");
  }

  return (
    <main>
      <div className="flex items-center gap-4 mb-8">
        <Link href="/dashboard">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h2 className="text-2xl font-bold">Edit Profile</h2>
      </div>

      <div className="max-w-3xl mx-auto">
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Account Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-6 mb-6">
              <div className="w-20 h-20 rounded-full overflow-hidden">
                <Image
                  src={user.image ?? "https://api.dicebear.com/7.x/avataaars/svg?seed=Amit%20Sharma"}
                  alt={user.name ?? ""}
                  className="w-full h-full object-cover"
                  width={80}
                  height={80}
                />
              </div>
              <div>
                <h2 className="text-xl font-semibold">{user.name}</h2>
                <p className="text-muted-foreground">{user.email}</p>
                <p className="text-muted-foreground">@{user.username}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-2">Profile Visibility</h3>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span>Public</span>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-2">Member Since</h3>
                <span>{user.createdAt.toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <ProfileForm user={user} />

        <div className="mt-8 text-center text-sm text-muted-foreground">
          <p>
            Your profile information is used to personalize your experience and to
            track your progress in coding challenges and competitions.
          </p>
        </div>
      </div>
    </main>
  );
}