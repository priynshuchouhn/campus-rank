'use client'
import React, { useState } from 'react'
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
import {
    Users,
    Trophy,
    MapPin,
    Globe,
    Phone,
    Mail,
    Brain,
    Target,
    ChevronRight,
    ExternalLink,
} from "lucide-react";
import { Button } from '@/components/ui/button';
import { Institution } from '@prisma/client';

function InstituteDetailTab({ instituteData }: { instituteData: any }) {
    const [activeTab, setActiveTab] = useState("overview");

    return (
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
                                    {instituteData.userCount}
                                </div>
                                <p className="text-xs text-muted-foreground">
                                    Active in coding platforms
                                </p>
                            </CardContent>
                        </Card>
                        {/* <Card>
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
              </Card> */}
                        {/* <Card>
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
              </Card> */}
                        {/* <Card>
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
              </Card> */}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Top Performers</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {/* {instituteData.topPerformers.map((performer:any, index:number) => (
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
                    ))} */}
                                    No top performers to display
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Upcoming Events</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    No events to display
                                    {/* {instituteData.upcomingEvents.map((event:any, index:number) => (
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
                    ))} */}
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
                                {/* {instituteData.achievements.map((achievement:any, index:number) => (
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
                  ))} */}
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
                                    {/* {instituteData.recentContests.map((contest:any, index:number) => (
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
                    ))} */}
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
                                                href={instituteData.website ?? '#'}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="font-medium hover:underline flex items-center gap-1"
                                            >
                                                {instituteData.website ?? "Website not available"}
                                                <ExternalLink className="h-3 w-3" />
                                            </a>
                                        </div>
                                    </div>
                                    {/* <div className="flex items-center gap-3">
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
                    </div> */}
                                    {/* <div className="flex items-center gap-3">
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
                    </div> */}
                                </div>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                                            <MapPin className="h-5 w-5 text-primary" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-muted-foreground">Location</p>
                                            <p className="font-medium">{instituteData.address},{instituteData.city},{instituteData.country}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}

export default InstituteDetailTab
