import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  User,
  Mail,
  Calendar,
  Shield,
  Code,
  Trophy,
  Target,
  Activity,
  Lock,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  School,
  BarChart3,
  FileText,
  MessageSquare,
  Bell,
  Trash2,
  Edit,
  RefreshCw,
  PenTool,
} from "lucide-react";
import Image from "next/image";
import { timeAgo } from "@/lib/utils";
import { getAdminUserDataById } from "@/lib/actions/users";

const getStatusBadge = (status: boolean, trueText: string, falseText: string) => {
    return (
      <Badge variant={status ? "default" : "secondary"}>
        {status ? (
          <CheckCircle className="w-3 h-3 mr-1" />
        ) : (
          <XCircle className="w-3 h-3 mr-1" />
        )}
        {status ? trueText : falseText}
      </Badge>
    );
  };

// Mock user data based on the Prisma model
const mockUser = {
  id: "clx123456789",
  name: "Amit Sharma",
  email: "amit.sharma@college.edu",
  image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Amit%20Sharma",
  emailVerified: new Date("2024-01-15T10:30:00Z"),
  createdAt: new Date("2024-01-10T08:00:00Z"),
  updatedAt: new Date("2024-03-15T14:20:00Z"),
  leetcodeUsername: "amit_leetcode",
  hackerrankUsername: "amit_hackerrank",
  gfgUsername: "amit_gfg",
  totalSolved: 350,
  easySolved: 150,
  mediumSolved: 120,
  hardSolved: 80,
  lastLeetcodeFetch: new Date("2024-03-15T12:00:00Z"),
  lastHackerrankFetch: new Date("2024-03-15T11:30:00Z"),
  lastGfgFetch: new Date("2024-03-15T11:45:00Z"),
  username: "amit_sharma_2021",
  role: "USER",
  password: "***encrypted***",
  isActive: true,
  isPublic: true,
  isDeleted: false,
  isLocked: false,
  lastLogin: new Date("2024-03-15T09:15:00Z"),
  institutionId: "inst_123",
  batchId: "batch_2021_cs",
  institution: {
    name: "Indian Institute of Technology, Delhi",
    code: "IITD",
  },
  batch: {
    name: "Computer Science 2021-2025",
    year: 2021,
    branch: "Computer Science and Engineering",
  },
  profileViews: 245,
  submissions: 1250,
  weeklyGoalsCompleted: 12,
  blogPosts: 3,
  reports: 0,
  pushSubscriptions: 2,
};

const activityData = [
  { date: "2024-03-15", action: "Solved 5 problems", type: "coding" },
  { date: "2024-03-14", action: "Updated profile", type: "profile" },
  { date: "2024-03-13", action: "Completed weekly goal", type: "goal" },
  { date: "2024-03-12", action: "Published blog post", type: "blog" },
  { date: "2024-03-11", action: "Joined quiz competition", type: "quiz" },
];

export default async function UserDetailPage({params}: {params:Promise<{userId:string}>}) {
  const {userId} = await params;
  const res = await getAdminUserDataById(userId);
  const userData = res.data
  if(!res.success && !userData && userData == null){
    return <>Error: {res.message}</>
  }
  if(userData){
    return (
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div className="flex items-center gap-6">
            <div className="relative">
              <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-primary/20 shadow-lg">
                <Image
                  src={userData.image || ""}
                  alt={userData.name!}
                  width={240}
                  height={240}
                  className="w-full h-full object-cover"
                />
              </div>
              {userData.isActive && (
                <div className="absolute -bottom-1 -right-1 bg-green-500 w-6 h-6 rounded-full border-4 border-background"></div>
              )}
            </div>
            <div>
              <h1 className="text-3xl font-bold mb-2">{userData.name}</h1>
              <p className="text-muted-foreground mb-3">@{userData.username}</p>
              <div className="flex gap-2 flex-wrap">
                {getStatusBadge(userData.isActive, "Active", "Inactive")}
                {getStatusBadge(userData.isPublic, "Public", "Private")}
                {getStatusBadge(!userData.isLocked, "Unlocked", "Locked")}
                <Badge variant="outline">
                  <Shield className="w-3 h-3 mr-1" />
                  {userData.role}
                </Badge>
              </div>
            </div>
          </div>
          {/* <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Edit className="w-4 h-4 mr-2" />
              Edit User
            </Button>
            <Button variant="outline" size="sm">
              <RefreshCw className="w-4 h-4 mr-2" />
              Sync Data
            </Button>
          </div> */}
        </div>
  
        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center">
                  <Trophy className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{userData.totalSolved}</p>
                  <p className="text-sm text-muted-foreground">Total Solved</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center">
                  <Eye className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{userData.profileView.length}</p>
                  <p className="text-sm text-muted-foreground">Profile Views</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-red-500/10 rounded-lg flex items-center justify-center">
                  <PenTool className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{userData.quiz.length}</p>
                  <p className="text-sm text-muted-foreground">Quizes</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-500/10 rounded-lg flex items-center justify-center">
                  <Code className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{userData.questionSubmission.length}</p>
                  <p className="text-sm text-muted-foreground">Submissions</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-500/10 rounded-lg flex items-center justify-center">
                  <Target className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{userData.weeklyGoals.length}</p>
                  <p className="text-sm text-muted-foreground">Goals Completed</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
  
        <Tabs className="space-y-6" defaultValue="overview">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="coding">Coding Stats</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>
  
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Personal Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="w-5 h-5" />
                    Personal Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm text-muted-foreground">Full Name</Label>
                      <p className="font-medium">{userData.name}</p>
                    </div>
                    <div>
                      <Label className="text-sm text-muted-foreground">Username</Label>
                      <p className="font-medium">@{userData.username}</p>
                    </div>
                    <div>
                      <Label className="text-sm text-muted-foreground">Email</Label>
                      <p className="font-medium">{userData.email}</p>
                    </div>
                    <div>
                      <Label className="text-sm text-muted-foreground">Role</Label>
                      <p className="font-medium">{userData.role}</p>
                    </div>
                    <div>
                      <Label className="text-sm text-muted-foreground">User ID</Label>
                      <p className="font-mono text-sm">{userData.id}</p>
                    </div>
                    <div>
                      <Label className="text-sm text-muted-foreground">Email Verified</Label>
                      <p className="font-medium">
                        {userData.emailVerified ? timeAgo(userData.emailVerified) : "Not verified"}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
  
              {/* Institution Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <School className="w-5 h-5" />
                    Institution Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="text-sm text-muted-foreground">Institution</Label>
                    <p className="font-medium">{userData.institution?.name}</p>
                    <p className="text-sm text-muted-foreground">Code: {userData.institution?.code}</p>
                  </div>
                  <div>
                    <Label className="text-sm text-muted-foreground">Batch</Label>
                    <p className="font-medium">{userData.batch?.name}</p>
                    <p className="text-sm text-muted-foreground">Year: {userData.batch?.batchYears}</p>
                  </div>
                  <div>
                    <Label className="text-sm text-muted-foreground">Branch</Label>
                    <p className="font-medium">{userData.batch?.program}</p>
                  </div>
                </CardContent>
              </Card>
  
              {/* Account Timestamps */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    Account Timeline
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 gap-3">
                    <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                      <div>
                        <p className="font-medium">Account Created</p>
                        <p className="text-sm text-muted-foreground">{timeAgo(userData.createdAt)}</p>
                      </div>
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                      <div>
                        <p className="font-medium">Last Updated</p>
                        <p className="text-sm text-muted-foreground">{timeAgo(userData.updatedAt)}</p>
                      </div>
                      <Clock className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                      <div>
                        <p className="font-medium">Last Login</p>
                        <p className="text-sm text-muted-foreground">
                          {userData.lastLogin ? timeAgo(userData.lastLogin) : "Never"}
                        </p>
                      </div>
                      <Activity className="w-4 h-4 text-muted-foreground" />
                    </div>
                  </div>
                </CardContent>
              </Card>
  
              {/* Platform Usernames */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Code className="w-5 h-5" />
                    Platform Accounts
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                      <div>
                        <p className="font-medium">LeetCode</p>
                        <p className="text-sm text-muted-foreground">
                          {userData.leetcodeUsername || "Not connected"}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground">Last Fetch</p>
                        <p className="text-xs">
                          {userData.lastLeetcodeFetch ? timeAgo(userData.lastLeetcodeFetch) : "Never"}
                        </p>
                      </div>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                      <div>
                        <p className="font-medium">HackerRank</p>
                        <p className="text-sm text-muted-foreground">
                          {userData.hackerrankUsername || "Not connected"}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground">Last Fetch</p>
                        <p className="text-xs">
                          {userData.lastHackerrankFetch ? timeAgo(userData.lastHackerrankFetch) : "Never"}
                        </p>
                      </div>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                      <div>
                        <p className="font-medium">GeeksforGeeks</p>
                        <p className="text-sm text-muted-foreground">
                          {userData.gfgUsername || "Not connected"}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground">Last Fetch</p>
                        <p className="text-xs">
                          {userData.lastGfgFetch ? timeAgo(userData.lastGfgFetch) : "Never"}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
  
          <TabsContent value="coding" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Problem Solving Stats */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5" />
                    Problem Solving Statistics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center p-4 bg-green-50 dark:bg-green-950/20 rounded-xl border border-green-200 dark:border-green-800">
                        <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-2">
                          <span className="text-white font-bold">{userData.easySolved}</span>
                        </div>
                        <p className="text-sm font-medium text-green-700 dark:text-green-400">Easy</p>
                        <div className="w-full bg-green-200 dark:bg-green-800 rounded-full h-2 mt-2">
                          <div className="bg-green-500 h-2 rounded-full" style={{ width: '75%' }}></div>
                        </div>
                      </div>
                      <div className="text-center p-4 bg-yellow-50 dark:bg-yellow-950/20 rounded-xl border border-yellow-200 dark:border-yellow-800">
                        <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-2">
                          <span className="text-white font-bold">{userData.mediumSolved}</span>
                        </div>
                        <p className="text-sm font-medium text-yellow-700 dark:text-yellow-400">Medium</p>
                        <div className="w-full bg-yellow-200 dark:bg-yellow-800 rounded-full h-2 mt-2">
                          <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '60%' }}></div>
                        </div>
                      </div>
                      <div className="text-center p-4 bg-red-50 dark:bg-red-950/20 rounded-xl border border-red-200 dark:border-red-800">
                        <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-2">
                          <span className="text-white font-bold">{userData.hardSolved}</span>
                        </div>
                        <p className="text-sm font-medium text-red-700 dark:text-red-400">Hard</p>
                        <div className="w-full bg-red-200 dark:bg-red-800 rounded-full h-2 mt-2">
                          <div className="bg-red-500 h-2 rounded-full" style={{ width: '40%' }}></div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">Total Problems Solved</span>
                        <span className="text-2xl font-bold text-primary">{userData.totalSolved}</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-3">
                        <div className="bg-primary h-3 rounded-full" style={{ width: '70%' }}></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
  
              {/* Additional Stats */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Trophy className="w-5 h-5" />
                    Additional Statistics
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-muted/50 rounded-lg">
                      <div className="flex items-center gap-2 mb-1">
                        <FileText className="w-4 h-4 text-blue-500" />
                        <span className="text-sm font-medium">Blog Posts</span>
                      </div>
                      <p className="text-2xl font-bold">{userData.blogPosts.length}</p>
                    </div>
                    <div className="p-3 bg-muted/50 rounded-lg">
                      <div className="flex items-center gap-2 mb-1">
                        <MessageSquare className="w-4 h-4 text-green-500" />
                        <span className="text-sm font-medium">Reports</span>
                      </div>
                      <p className="text-2xl font-bold">{userData.report.length}</p>
                    </div>
                    <div className="p-3 bg-muted/50 rounded-lg">
                      <div className="flex items-center gap-2 mb-1">
                        <Bell className="w-4 h-4 text-orange-500" />
                        <span className="text-sm font-medium">Push Subscriptions</span>
                      </div>
                      <p className="text-2xl font-bold">{userData.pushSubscription.length}</p>
                    </div>
                    <div className="p-3 bg-muted/50 rounded-lg">
                      <div className="flex items-center gap-2 mb-1">
                        <Eye className="w-4 h-4 text-purple-500" />
                        <span className="text-sm font-medium">Profile Views</span>
                      </div>
                      <p className="text-2xl font-bold">{userData.profileView.length}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
  
          <TabsContent value="activity" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-5 h-5" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activityData.map((activity, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg hover:bg-muted/70 transition-colors"
                    >
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        activity.type === 'coding' ? 'bg-green-500/10' :
                        activity.type === 'profile' ? 'bg-blue-500/10' :
                        activity.type === 'goal' ? 'bg-purple-500/10' :
                        activity.type === 'blog' ? 'bg-orange-500/10' :
                        'bg-gray-500/10'
                      }`}>
                        {activity.type === 'coding' && <Code className="w-5 h-5 text-green-600" />}
                        {activity.type === 'profile' && <User className="w-5 h-5 text-blue-600" />}
                        {activity.type === 'goal' && <Target className="w-5 h-5 text-purple-600" />}
                        {activity.type === 'blog' && <FileText className="w-5 h-5 text-orange-600" />}
                        {activity.type === 'quiz' && <Trophy className="w-5 h-5 text-gray-600" />}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{activity.action}</p>
                        <p className="text-sm text-muted-foreground">{activity.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
  
          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  User Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-0.5">
                      <Label className="text-base">Account Status</Label>
                      <p className="text-sm text-muted-foreground">
                        Enable or disable user account access
                      </p>
                    </div>
                    <Switch
                      checked={userData.isActive}
                    />
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-0.5">
                      <Label className="text-base">Public Profile</Label>
                      <p className="text-sm text-muted-foreground">
                        Allow other users to view this profile
                      </p>
                    </div>
                    <Switch
                      checked={userData.isPublic}
                    />
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-0.5">
                      <Label className="text-base">Account Lock</Label>
                      <p className="text-sm text-muted-foreground">
                        Temporarily lock user account
                      </p>
                    </div>
                    <Switch
                      checked={userData.isLocked}
                    />
                  </div>
                </div>
                <div className="pt-4 border-t">
                  <Button className="w-full">Save Settings</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
  
          <TabsContent value="security" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lock className="w-5 h-5" />
                    Security Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                      <span className="font-medium">Password Status</span>
                      <Badge variant={userData.password ? "default" : "destructive"}>
                        {userData.password ? "Set" : "Not Set"}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                      <span className="font-medium">Email Verified</span>
                      <Badge variant={userData.emailVerified ? "success" : "destructive"}>
                        {userData.emailVerified ? "Verified" : "Unverified"}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                      <span className="font-medium">Account Deleted</span>
                      <Badge variant={userData.isDeleted ? "destructive" : "success"}>
                        {userData.isDeleted ? "Deleted" : "No"}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
  
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    Admin Actions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-start">
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Reset Password
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Mail className="w-4 h-4 mr-2" />
                      Send Verification Email
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Lock className="w-4 h-4 mr-2" />
                      Lock/Unlock Account
                    </Button>
                    <Button variant="destructive" className="w-full justify-start">
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete Account
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    );
  }else{
    return <>No data found</>
  }

}