
import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Code,
  Brain,
  Calculator,
  MessageSquare,
  Clock,
  Trophy,
  Target,
  BookOpen,
  ChevronRight,
  Play,
  BarChart3,
} from "lucide-react";
import { fetchSubjectsToPracticeWithTopic } from "@/lib/actions/practice";

const aptitudeTopics = [
  {
    id: "quantitative",
    title: "Quantitative Aptitude",
    description: "Mathematical problems, data interpretation, and numerical reasoning",
    icon: Calculator,
    color: "bg-blue-500",
    questions: 150,
    difficulty: "Mixed",
    avgTime: "45 min",
    topics: ["Arithmetic", "Algebra", "Geometry", "Data Interpretation", "Probability"],
  },
  {
    id: "logical",
    title: "Logical Reasoning",
    description: "Pattern recognition, logical sequences, and analytical thinking",
    icon: Brain,
    color: "bg-purple-500",
    questions: 120,
    difficulty: "Mixed",
    avgTime: "40 min",
    topics: ["Patterns", "Sequences", "Analogies", "Blood Relations", "Coding-Decoding"],
  },
  {
    id: "verbal",
    title: "Verbal Ability",
    description: "English comprehension, grammar, and vocabulary skills",
    icon: MessageSquare,
    color: "bg-green-500",
    questions: 100,
    difficulty: "Mixed",
    avgTime: "35 min",
    topics: ["Reading Comprehension", "Grammar", "Vocabulary", "Sentence Correction", "Para Jumbles"],
  },
];

const recentAttempts = [
  {
    topic: "Quantitative Aptitude",
    score: 85,
    totalQuestions: 20,
    timeSpent: "25 min",
    date: "2024-03-15",
  },
  {
    topic: "Logical Reasoning",
    score: 78,
    totalQuestions: 15,
    timeSpent: "18 min",
    date: "2024-03-14",
  },
  {
    topic: "Verbal Ability",
    score: 92,
    totalQuestions: 25,
    timeSpent: "30 min",
    date: "2024-03-13",
  },
];

export default async function AptitudeDashboard() {
  const subjectLst = await fetchSubjectsToPracticeWithTopic()
  console.log(subjectLst);
  // const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

  // const overallStats = {
  //   totalAttempts: 45,
  //   averageScore: 82,
  //   totalTimeSpent: "18h 30m",
  //   bestScore: 95,
  // };

  return (
    <div className="min-h-screen bg-background -my-6">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-indigo-50 via-white to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12">
        <div className="absolute inset-0 bg-grid-white/10" />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-indigo-100 dark:bg-indigo-900/30 px-4 py-2 rounded-full text-indigo-700 dark:text-indigo-300 mb-6">
              <Target className="h-4 w-4" />
              <span className="text-sm font-medium">Placement Preparation</span>
            </div>
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
              Practice Hub
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Master data structures & algorithm, quantitative aptitude, logical reasoning, and verbal ability with our comprehensive practice modules designed for placement success.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Overview */}
        {/* <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-l-4 border-l-indigo-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Attempts</p>
                  <p className="text-2xl font-bold">{overallStats.totalAttempts}</p>
                </div>
                <BookOpen className="h-8 w-8 text-indigo-500" />
              </div>
            </CardContent>
          </Card>
          <Card className="border-l-4 border-l-green-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Average Score</p>
                  <p className="text-2xl font-bold">{overallStats.averageScore}%</p>
                </div>
                <BarChart3 className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          <Card className="border-l-4 border-l-yellow-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Time Spent</p>
                  <p className="text-2xl font-bold">{overallStats.totalTimeSpent}</p>
                </div>
                <Clock className="h-8 w-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>
          <Card className="border-l-4 border-l-purple-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Best Score</p>
                  <p className="text-2xl font-bold">{overallStats.bestScore}%</p>
                </div>
                <Trophy className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </div> */}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Topic Selection */}
          <div className="lg:col-span-3">
            <h2 className="text-2xl font-bold mb-6 text-gray-500">Choose Practice Topic</h2>
            <div className="space-y-6 mb-3" >
              {subjectLst.map((subject) => {
                // const IconComponent = topic.icon;
                return (
                  <Card
                    key={subject.id}
                    // className={`transition-all duration-200 hover:shadow-lg cursor-pointer border-2 ${
                    //   selectedTopic === topic.id
                    //     ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-950/20"
                    //     : "border-transparent hover:border-gray-200"
                    // }`}
                    // onClick={() => setSelectedTopic(topic.id)}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        {/* <div className={`p-3 rounded-lg ${topic.color} bg-opacity-10`}>
                          <IconComponent className={`h-6 w-6 text-white`} style={{ color: topic.color.replace('bg-', '').replace('-500', '') }} />
                        </div> */}
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="text-xl font-semibold">{subject.subjectName}</h3>
                            <Link href={`/aptitude/quiz/${subject.id}`}>
                              <Button size="sm" className="gap-2">
                                <Play className="h-4 w-4" />
                                Start Quiz
                              </Button>
                            </Link>
                          </div>
                          {/* <p className="text-muted-foreground mb-4">{subject.description}</p> */}
                          <div className="grid grid-cols-3 gap-4 text-sm">
                            {/* <div>
                              <span className="text-muted-foreground">Questions:</span>
                              <span className="ml-2 font-medium">{topic.questions}</span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Difficulty:</span>
                              <span className="ml-2 font-medium">{topic.difficulty}</span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Avg Time:</span>
                              <span className="ml-2 font-medium">{topic.avgTime}</span>
                            </div> */}
                          </div>
                          <div className="mt-4">
                            <p className="text-sm text-muted-foreground mb-2">Subtopics:</p>
                            <div className="flex flex-wrap gap-2">
                              {subject.sections.map((section, index) => (
                                <span
                                  key={index}
                                  className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-md text-xs"
                                >
                                  {section.title}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Recent Attempts */}
          <div>
            {/* <h2 className="text-2xl font-bold mb-6">Recent Attempts</h2>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Your Progress</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentAttempts.map((attempt, index) => (
                  <div
                    key={index}
                    className="p-4 bg-muted/50 rounded-lg space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-sm">{attempt.topic}</h4>
                      <span className="text-xs text-muted-foreground">
                        {new Date(attempt.date).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Score: {attempt.score}%</span>
                      <span>{attempt.timeSpent}</span>
                    </div>
                    <Progress value={attempt.score} className="h-2" />
                    <p className="text-xs text-muted-foreground">
                      {Math.round((attempt.score / 100) * attempt.totalQuestions)}/{attempt.totalQuestions} correct
                    </p>
                  </div>
                ))}
                <Button variant="outline" className="w-full mt-4">
                  View All Attempts
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card> */}

            {/* Quick Actions */}
            {/* <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start gap-3">
                  <Target className="h-4 w-4" />
                  Practice Weak Areas
                </Button>
                <Button variant="outline" className="w-full justify-start gap-3">
                  <Clock className="h-4 w-4" />
                  Timed Mock Test
                </Button>
                <Button variant="outline" className="w-full justify-start gap-3">
                  <BarChart3 className="h-4 w-4" />
                  Performance Analytics
                </Button>
              </CardContent>
            </Card> */}
          </div>
        </div>
      </div>
    </div>
  );
}