
'use client';
import { useEffect, useState } from "react";
import { Card, CardContent, } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
  Loader2,
} from "lucide-react";
import { fetchSubjectsToPracticeWithTopic } from "@/lib/actions/practice";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { PredefinedSection, Subject } from "@prisma/client";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

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




export default function AptitudeDashboard() {
  const [subjectLst, setSubjectLst] = useState<(Subject & { sections: PredefinedSection[] })[]>([]);
  const [isLoading, setisLoading] = useState<boolean>(false);
  const router = useRouter();
  useEffect(() => {
    async function fetchSubjects() {
      try {
        setisLoading(true)
        const data = await fetchSubjectsToPracticeWithTopic();
        console.log(data);
        setSubjectLst(data);
      } catch (error) {
        toast.error("Something went wrong");
      } finally {
        setisLoading(false)
      }
    }
    fetchSubjects();
  }, [])

  const handleStartQuiz = (topicId: string) => {
    console.log(topicId);
    const examId = '53vfdvw45vfv45'
    router.push(`quiz/${'cmc2d37ic00024h4mc7k4gtjj'}/${'arithmetic'}/${topicId}/${examId}`);
  }
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-background -my-6">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-primary/10 to-secondary/30 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12">
        <div className="absolute inset-0 bg-grid-white/10" />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-primary dark:bg-accent/30 px-4 py-2 rounded-full text-primary-foreground dark:text-accent mb-6">
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

      <div className="lg:container mx-auto lg:px-4 lg:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Topic Selection */}
          <div className="lg:col-span-3">
            <h2 className="text-2xl font-bold mb-6 text-gray-500">Choose Practice Topic</h2>
            <div className="space-y-6 mb-3" >
              {subjectLst.map((subject) => {
                return (
                  <Card key={subject.id}>
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="text-xl font-semibold text-primary dark:text-accent">{subject.subjectName}</h3>
                          </div>
                          <div className="mt-4">
                            <Accordion
                              type="single"
                              collapsible
                              className="w-full"
                              defaultValue={subject.sections[0].id}>
                              {subject.sections.map((section: any, index) => (<AccordionItem key={section.id} value={section.id}>
                                <AccordionTrigger className="text-lg">{section.title}</AccordionTrigger>
                                <AccordionContent className="flex flex-col gap-4 text-balance">
                                  <p className="font-semibold text-muted-foreground">
                                    {section.description}
                                  </p>
                                  {section.topics.map((topic: any) =>
                                    <div key={topic.id} className="grid lg:grid-cols-5 grid-cols-2 gap-3">
                                      <div className="lg:col-span-3 col-span-2"> <span className="font-bold">{topic.title}</span> : <span className="text-xs">{topic.description}</span></div>
                                      <div><Badge variant={getBadgeVariant(topic.level)}>{topic.level}</Badge></div>
                                      <div className="text-end"><Button onClick={() => handleStartQuiz(topic.id)}>Start Quiz <Play /></Button></div>
                                    </div>
                                  )}
                                </AccordionContent>
                              </AccordionItem>))}
                            </Accordion>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

function getBadgeVariant(name: string): "default" | "secondary" | "destructive" | "outline" | "success" | "warning" | "danger" {
  switch (name) {
    case 'ADVANCED':
      return 'danger';
    case 'BEGINNER':
      return 'success';
    case 'INTERMEDIATE':
      return 'warning';
    default:
      return 'default';
  }
}