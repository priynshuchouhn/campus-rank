"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Code,
  Clock,
  ChevronLeft,
  ChevronRight,
  Flag,
  CheckCircle,
  XCircle,
  RotateCcw,
  Home,
  BookOpen,
  CircleCheck,
  Fullscreen,
} from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
// import { AptitudeSubject, AptitudeTopic, AptitudeQuestion, QuizSession } from "@/app/types/aptitude";

// Mock data - in real app, this would come from API
const mockAptitudeData: any[] = [
  {
    id: 'cmc2d37ic00024h4mc7k4gtjj',
    subjectName: 'Quantitative Aptitude',
    isCoreSubject: false,
    sections: [
      {
        id: 'arithmetic',
        name: 'Arithmetic',
        description: 'Basic mathematical operations and number theory',
        topics: [
          {
            id: 'cmc50bfkc00004hbadqpdw6p7',
            name: 'Percentages',
            description: 'Calculate percentages, profit & loss, discounts',
            difficulty: 'Easy',
            estimatedTime: 15,
            questions: [
              {
                id: 'q1',
                question: 'What is 25% of 80?',
                options: ['15', '20', '25', '30'],
                correctAnswer: 1,
                explanation: '25% of 80 = (25/100) × 80 = 20',
                difficulty: 'Easy'
              },
              {
                id: 'q2',
                question: 'If a shirt costs ₹800 and is sold at 20% profit, what is the selling price?',
                options: ['₹900', '₹960', '₹1000', '₹1200'],
                correctAnswer: 1,
                explanation: 'Selling price = Cost price + Profit = 800 + (20% of 800) = 800 + 160 = ₹960',
                difficulty: 'Medium'
              },
              {
                id: 'q3',
                question: 'A number decreased by 30% becomes 140. What is the original number?',
                options: ['180', '200', '220', '240'],
                correctAnswer: 1,
                explanation: 'Let original number = x. Then x - 30% of x = 140. So 0.7x = 140, x = 200',
                difficulty: 'Medium'
              }
            ]
          }
        ]
      }
    ]
  }
];

export default function QuizPage() {
  const params = useParams();
  const router = useRouter();
  const { subjectId, sectionId, topicId } = params;
  
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: string]: number }>({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [topic, setTopic] = useState<any | null>(null);
  const [subject, setSubject] = useState<any | null>(null);

  useEffect(() => {
    // Find the topic data
    const foundSubject = mockAptitudeData.find(s => s.id === subjectId);
    if (foundSubject) {
      setSubject(foundSubject);
      const foundSection = foundSubject.sections.find((sec:any) => sec.id === sectionId);
      if (foundSection) {
        const foundTopic = foundSection.topics.find((t:any) => t.id === topicId);
        if (foundTopic) {
          setTopic(foundTopic);
          setTimeLeft(foundTopic.estimatedTime * 60); // Convert minutes to seconds
        }
      }
    }
  }, [subjectId, sectionId, topicId]);

  useEffect(() => {
    if (quizStarted && !quizCompleted && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setQuizCompleted(true);
            setShowResults(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [quizStarted, quizCompleted, timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswerSelect = (questionId: string, answerIndex: number) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: answerIndex
    }));
  };

  const handleNext = () => {
    if (topic && currentQuestion < topic.questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const handleSubmit = () => {
    setQuizCompleted(true);
    setShowResults(true);
  };

  const calculateScore = () => {
    if (!topic) return { correct: 0, total: 0, percentage: 0 };
    
    let correct = 0;
    topic.questions.forEach((question:any) => {
      if (selectedAnswers[question.id] === question.correctAnswer) {
        correct++;
      }
    });
    return {
      correct,
      total: topic.questions.length,
      percentage: Math.round((correct / topic.questions.length) * 100),
    };
  };

  const startQuiz = () => {
    setQuizStarted(true);
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswers({});
    setTimeLeft(topic ? topic.estimatedTime * 60 : 0);
    setQuizStarted(false);
    setQuizCompleted(false);
    setShowResults(false);
  };

  if (!topic || !subject) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="max-w-md mx-auto">
          <CardContent className="p-6 text-center">
            <h2 className="text-xl font-semibold mb-4">Topic Not Found</h2>
            <p className="text-muted-foreground mb-4">
              The requested quiz topic could not be found.
            </p>
            <Link href="/practice">
              <Button>Back to Dashboard</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (showResults) {
    const score = calculateScore();
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <Card className="mb-8">
              <CardHeader className="text-center">
                <CardTitle className="text-3xl mb-2">Quiz Completed!</CardTitle>
                <p className="text-muted-foreground">
                  {subject.subjectName} → {topic.name}
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="text-center p-6 bg-green-50 dark:bg-green-950/20 rounded-lg">
                    <div className="text-3xl font-bold text-green-600 mb-2">
                      {score.percentage}%
                    </div>
                    <p className="text-sm text-muted-foreground">Final Score</p>
                  </div>
                  <div className="text-center p-6 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                    <div className="text-3xl font-bold text-blue-600 mb-2">
                      {score.correct}/{score.total}
                    </div>
                    <p className="text-sm text-muted-foreground">Correct Answers</p>
                  </div>
                  <div className="text-center p-6 bg-purple-50 dark:bg-purple-950/20 rounded-lg">
                    <div className="text-3xl font-bold text-purple-600 mb-2">
                      {formatTime((topic.estimatedTime * 60) - timeLeft)}
                    </div>
                    <p className="text-sm text-muted-foreground">Time Taken</p>
                  </div>
                </div>

                <div className="flex gap-4 justify-center">
                  <Button onClick={restartQuiz} className="gap-2">
                    <RotateCcw className="h-4 w-4" />
                    Retake Quiz
                  </Button>
                  <Link href="/practice">
                    <Button variant="outline" className="gap-2">
                      <Home className="h-4 w-4" />
                      Back to Dashboard
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Detailed Results */}
            <Card>
              <CardHeader>
                <CardTitle>Detailed Results</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {topic.questions.map((question:any, index:number) => {
                    const userAnswer = selectedAnswers[question.id];
                    const isCorrect = userAnswer === question.correctAnswer;
                    
                    return (
                      <div key={question.id} className="border rounded-lg p-4">
                        <div className="flex items-start gap-3 mb-3">
                          {isCorrect ? (
                            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                          ) : (
                            <XCircle className="h-5 w-5 text-red-500 mt-0.5" />
                          )}
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h4 className="font-medium">
                                Question {index + 1}: {question.question}
                              </h4>
                              <Badge className={
                                question.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                                question.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-red-100 text-red-800'
                              }>
                                {question.difficulty}
                              </Badge>
                            </div>
                            <div className="space-y-2 text-sm">
                              {question.options.map((option:any, optionIndex:number) => (
                                <div
                                  key={optionIndex}
                                  className={`p-2 rounded ${
                                    optionIndex === question.correctAnswer
                                      ? "bg-green-100 dark:bg-green-950/20 text-green-800 dark:text-green-200"
                                      : optionIndex === userAnswer && userAnswer !== question.correctAnswer
                                      ? "bg-red-100 dark:bg-red-950/20 text-red-800 dark:text-red-200"
                                      : "bg-gray-50 dark:bg-gray-800"
                                  }`}
                                >
                                  {option}
                                  {optionIndex === question.correctAnswer && " ✓"}
                                  {optionIndex === userAnswer && userAnswer !== question.correctAnswer && " ✗"}
                                </div>
                              ))}
                            </div>
                            <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-950/20 rounded text-sm">
                              <strong>Explanation:</strong> {question.explanation}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  if (!quizStarted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            <Card>
              <CardHeader className="text-center">
                <div className="mb-4">
                  <Badge className={
                    topic.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                    topic.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }>
                    {topic.difficulty}
                  </Badge>
                </div>
                <CardTitle className="text-2xl mb-2">{topic.name}</CardTitle>
                <p className="text-muted-foreground mb-2">{topic.description}</p>
                <p className="text-sm text-muted-foreground">
                  {subject.subjectName} • Ready to test your knowledge?
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-muted/50 rounded-lg text-center dark:bg-background">
                    <div className="text-2xl font-bold mb-1">{topic.questions.length}</div>
                    <div className="text-sm text-muted-foreground">Questions</div>
                  </div>
                  <div className="p-4 bg-muted/50 rounded-lg text-center dark:bg-background">
                    <div className="text-2xl font-bold mb-1">{topic.estimatedTime}</div>
                    <div className="text-sm text-muted-foreground">Minutes</div>
                  </div>
                </div>

                <div className="space-y-3 text-sm">
                  <h3 className="font-semibold">Instructions:</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Each question has 4 options, select the best answer</li>
                    <li>• You have {topic.estimatedTime} minutes to complete the quiz</li>
                    <li>• You can navigate between questions using Next/Previous buttons</li>
                    <li>• Click Submit when you&apos;re ready to finish</li>
                    <li>• Your progress will be saved automatically</li>
                  </ul>
                </div>

                <div className="flex gap-4">
                  <Button onClick={startQuiz} className="flex-1" size="lg">
                    <BookOpen className="mr-2 h-4 w-4" />
                    Start Quiz
                  </Button>
                  <Link href="/practice">
                    <Button variant="outline" size="lg">
                      <ChevronLeft className="mr-2 h-4 w-4" />
                      Back
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  const currentQ = topic.questions[currentQuestion];
  const progress = ((currentQuestion + 1) / topic.questions.length) * 100;

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div></div>
            <div className="flex items-center gap-4">
              <div>
                <Button variant={'ghost'}><Fullscreen/></Button>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Clock className="h-4 w-4" />
                <span className={`font-mono ${timeLeft < 300 ? 'text-red-500' : ''}`}>
                  {formatTime(timeLeft)}
                </span>
              </div>
              <Button variant="success" size="sm" onClick={handleSubmit}>
                <CircleCheck className="h-4 w-4 mr-2" />
                Submit
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">
                Question {currentQuestion + 1} of {topic.questions.length}
              </span>
              <div className="flex items-center gap-2">
                <Badge className={
                  currentQ.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                  currentQ.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }>
                  {currentQ.difficulty}
                </Badge>
                <span className="text-sm text-muted-foreground">
                  {Math.round(progress)}% Complete
                </span>
              </div>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Question Card */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-xl leading-relaxed">
                {currentQ.question}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup
                value={selectedAnswers[currentQ.id]?.toString()}
                onValueChange={(value) => handleAnswerSelect(currentQ.id, parseInt(value))}
                className="space-y-4"
              >
                {currentQ.options.map((option:any, index:number) => (
                  <div key={index} className="flex items-center space-x-3">
                    <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                    <Label
                      htmlFor={`option-${index}`}
                      className="flex-1 cursor-pointer p-3 rounded-lg border hover:bg-muted/50 transition-colors"
                    >
                      {option}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              className="gap-2"
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>

            <div className="flex gap-2">
              {topic.questions.map((_:any, index:number) => (
                <button
                  key={index}
                  onClick={() => setCurrentQuestion(index)}
                  className={`w-8 h-8 rounded text-sm font-medium transition-colors ${
                    index === currentQuestion
                      ? "bg-primary text-white dark:bg-accent"
                      : selectedAnswers[topic.questions[index].id] !== undefined
                      ? "bg-green-100 text-green-800 dark:bg-green-950/90 dark:text-green-200"
                      : "bg-muted hover:bg-muted/80 dark:text-accent"
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>

            {currentQuestion === topic.questions.length - 1 ? (
              <Button variant={'success'} onClick={handleSubmit} className="gap-2">
                <CircleCheck className="h-4 w-4" />
                Submit Quiz
              </Button>
            ) : (
              <Button onClick={handleNext} className="gap-2">
                Next
                <ChevronRight className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}