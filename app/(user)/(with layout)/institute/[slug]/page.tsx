"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Code,
  Users,
  Trophy,
  GraduationCap,
  MapPin,
  Globe,
  Phone,
  Mail,
  FileCode,
  Brain,
  Target,
  ChevronRight,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

// Mock data for demonstration
const instituteData = {
  id: 1,
  name: "Indian Institute of Technology Bombay",
  shortName: "IIT Bombay",
  description: "One of India's premier engineering and technology institutions, known for excellence in education and research.",
  established: 1958,
  location: "Mumbai, Maharashtra",
  website: "https://www.iitb.ac.in",
  phone: "+91 22 2572 2545",
  email: "info@iitb.ac.in",
  totalStudents: 11000,
  ranking: 1,
  stats: {
    totalParticipants: 2500,
    activeCoding: 1200,
    averageSolved: 320,
    contestsHosted: 45,
  },
  achievements: [
    {
      title: "National Coding Championship 2024",
      position: "1st Place",
      date: "2024",
    },
    {
      title: "ACM-ICPC Asia Regional",
      position: "2nd Place",
      date: "2023",
    },
    {
      title: "Google Hash Code",
      position: "Top 10",
      date: "2023",
    },
  ],
  topPerformers: [
    {
      name: "Amit Sharma",
      solved: 450,
      rank: 1,
      batch: "2024",
    },
    {
      name: "Priya Patel",
      solved: 420,
      rank: 2,
      batch: "2024",
    },
    {
      name: "Raj Kumar",
      solved: 380,
      rank: 3,
      batch: "2025",
    },
  ],
  recentContests: [
    {
      name: "Winter Coding Sprint 2024",
      date: "2024-02-15",
      participants: 300,
      avgScore: 75,
    },
    {
      name: "Algorithm Challenge IV",
      date: "2024-01-20",
      participants: 250,
      avgScore: 68,
    },
    {
      name: "Data Structures Derby",
      date: "2023-12-10",
      participants: 280,
      avgScore: 72,
    },
  ],
  upcomingEvents: [
    {
      name: "Spring Coding Competition",
      date: "2024-04-15",
      type: "Contest",
      registrationOpen: true,
    },
    {
      name: "Technical Symposium",
      date: "2024-04-20",
      type: "Workshop",
      registrationOpen: true,
    },
    {
      name: "Mock Placement Drive",
      date: "2024-05-01",
      type: "Event",
      registrationOpen: false,
    },
  ],
};

export default function InstituteProfile() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <main className="min-h-screen bg-background flex flex-col">
      {/* Institute Hero */}
      <div className="relative bg-primary/5 py-12">
        <div className="absolute inset-0 bg-grid-white/10" />
        <div className="container mx-auto px-4 relative">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-2">{instituteData.name}</h1>
              <p className="text-muted-foreground mb-4">{instituteData.description}</p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span>{instituteData.location}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <GraduationCap className="h-4 w-4 text-primary" />
                  <span>Est. {instituteData.established}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Users className="h-4 w-4 text-primary" />
                  <span>{instituteData.totalStudents.toLocaleString()} Students</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Trophy className="h-4 w-4 text-primary" />
                  <span>Rank #{instituteData.ranking}</span>
                </div>
              </div>
            </div>
            <div className="flex gap-4">
              <Button variant="outline" className="gap-2" asChild>
                <a href={instituteData.website} target="_blank" rel="noopener noreferrer">
                  <Globe className="h-4 w-4" />
                  Website
                </a>
              </Button>
              {/* <Button className="gap-2">
                <FileCode className="h-4 w-4" />
                View Programs
              </Button> */}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="w-full justify-start">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            {/* <TabsTrigger value="achievements">Achievements</TabsTrigger> */}
            {/* <TabsTrigger value="contests">Contests</TabsTrigger> */}
            <TabsTrigger value="contact">Contact</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Participants
                  </CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {instituteData.stats.totalParticipants}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Active in coding platforms
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">
                    Active Coders
                  </CardTitle>
                  <Brain className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {instituteData.stats.activeCoding}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Solved problems this month
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">
                    Avg. Problems
                  </CardTitle>
                  <Target className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {instituteData.stats.averageSolved}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Per active participant
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">
                    Contests Hosted
                  </CardTitle>
                  <Trophy className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {instituteData.stats.contestsHosted}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Since establishment
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Top Performers</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {instituteData.topPerformers.map((performer, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 bg-muted rounded-lg dark:bg-primary/5"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                            {index + 1}
                          </div>
                          <div>
                            <p className="font-medium">{performer.name}</p>
                            <p className="text-sm text-muted-foreground">
                              Batch of {performer.batch}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{performer.solved} solved</p>
                          <p className="text-sm text-muted-foreground">
                            Rank #{performer.rank}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Events</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {instituteData.upcomingEvents.map((event, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 bg-muted rounded-lg dark:bg-primary/5"
                      >
                        <div>
                          <p className="font-medium">{event.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(event.date).toLocaleDateString()}
                          </p>
                        </div>
                        <Button
                          variant={event.registrationOpen ? "default" : "outline"}
                          size="sm"
                        >
                          {event.registrationOpen ? "Register" : "Coming Soon"}
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="achievements">
            <Card>
              <CardHeader>
                <CardTitle>Recent Achievements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {instituteData.achievements.map((achievement, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-4 p-4 bg-muted rounded-lg dark:bg-primary/5"
                    >
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Trophy className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium">{achievement.title}</h3>
                        <p className="text-sm text-muted-foreground mb-2">
                          {achievement.date}
                        </p>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-sm">
                          {achievement.position}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contests">
            <Card>
              <CardHeader>
                <CardTitle>Recent Contests</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Contest Name</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead className="text-right">Participants</TableHead>
                      <TableHead className="text-right">Avg. Score</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {instituteData.recentContests.map((contest, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">
                          {contest.name}
                        </TableCell>
                        <TableCell>
                          {new Date(contest.date).toLocaleDateString()}
                        </TableCell>
                        <TableCell className="text-right">
                          {contest.participants}
                        </TableCell>
                        <TableCell className="text-right">
                          {contest.avgScore}%
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">
                            View Details
                            <ChevronRight className="ml-2 h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contact">
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Globe className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Website</p>
                        <a
                          href={instituteData.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-medium hover:underline flex items-center gap-1"
                        >
                          {instituteData.website}
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Phone className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Phone</p>
                        <a
                          href={`tel:${instituteData.phone}`}
                          className="font-medium hover:underline"
                        >
                          {instituteData.phone}
                        </a>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Mail className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Email</p>
                        <a
                          href={`mailto:${instituteData.email}`}
                          className="font-medium hover:underline"
                        >
                          {instituteData.email}
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <MapPin className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Location</p>
                        <p className="font-medium">{instituteData.location}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>    
    </main>
  );
}