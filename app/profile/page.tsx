import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProfileForm } from "@/components/ui/profile-form";
import { getUser } from "@/lib/actions/users";
import Image from "next/image";
import { redirect } from "next/navigation";


export default async function Profile() {
    const user = await getUser();
    if (!user) {
        redirect("/get-started");
    }
  return (
    <main>
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">Profile</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <Card>
              <CardHeader>
                <CardTitle>User Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-24 h-24 rounded-full overflow-hidden">
                    <Image
                      src={user.image ?? "https://api.dicebear.com/7.x/avataaars/svg?seed=Amit%20Sharma"}
                      alt={user.name ?? ""}
                      className="w-full h-full object-cover"
                      width={96}
                      height={96}
                    />
                  </div>
                  <div>
                    <h2 className="text-2xl font-semibold">{user.name}</h2>
                    <p className="text-muted-foreground">{user.email}</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">Easy</p>
                    <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                      {user.easySolved}
                    </p>
                  </div>
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">Medium</p>
                    <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                      {user.mediumSolved}
                    </p>
                  </div>
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">Hard</p>
                    <p className="text-2xl font-bold text-red-600 dark:text-red-400">
                      {user.hardSolved}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <ProfileForm user={user} />
          </div>
        </div>

        {/* <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Recent Contest History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="p-4 bg-muted rounded-lg flex justify-between items-center"
                  >
                    <div>
                      <h3 className="font-semibold">
                        Weekly Contest {238 - i}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Rank: #{Math.floor(Math.random() * 1000 + 1)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">
                        {Math.floor(Math.random() * 4)}/4 solved
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(
                          Date.now() - i * 7 * 24 * 60 * 60 * 1000
                        ).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div> */}
    </main>
  );
}