"use client";

import { useState, useEffect, use, useMemo, useRef } from "react";
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
  Loader2,
  MenuIcon,
} from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { fetchQuiz, saveQuizData, startQuizInDb } from "@/lib/actions/quiz";
import { getTimeLeft, unslugify } from "@/lib/utils";
import { useFullscreen } from "@/lib/hooks/useFullscreen";
import toast from "react-hot-toast";
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetClose, SheetFooter } from "@/components/ui/sheet";


export default function QuizPage() {
  const params = useParams();
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const { subjectName, sectionName, topicName, quizId } = params;
  const { isFullscreen, enterFullScreen, exitFullScreen } = useFullscreen();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [quizData, setQuizData] = useState<any>();
  const [isLoading, setisLoading] = useState<boolean>(false);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: string]: string }>({});
  const [responses, setResponses] = useState<any>([]);
  useEffect(() => {
    const stored = sessionStorage.getItem('response');
    try {
      if (stored) {
        setSelectedAnswers(JSON.parse(stored));
      }
    } catch (e) {
      console.error('Failed to parse stored response', e);
    } finally {
      setisLoading(false);
    }
  }, []);
  const currentQ = useMemo(() => {
    if (!quizData) return null;
    return quizData.questions[currentQuestion]
  }, [quizData, currentQuestion]);
  const progress = useMemo(() => {
    if (!quizData) return 0;
    return ((currentQuestion + 1) / quizData.questions.length) * 100
  }, [quizData, currentQuestion]);

  useEffect(() => {
    async function fetchQuizdata() {
      try {
        setisLoading(true);
        const { quiz, response } = await fetchQuiz(quizId);
        if (!quiz) return;
        setQuizData(quiz);
        const timeLeft = quiz.startedAt ? getTimeLeft(quiz.startedAt, quiz.timeAlloted) : quiz.timeAlloted;
        setTimeLeft(timeLeft);
        const isQuizStarted = quiz.status != 'CREATED' && quiz.status != 'SUBMITTED';
        setQuizStarted(isQuizStarted)
        setQuizCompleted(quiz.status == 'SUBMITTED');
        setResponses(response)
        if (timeLeft <= 0) {
          await handleSubmit();
        }
      } catch (error) {
        console.log(error);
      } finally {
        setisLoading(false)
      }
    }
    fetchQuizdata();
  }, [quizId]);

  useEffect(() => {
    if (quizStarted && !quizCompleted && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1000) {
            handleSubmit();
            return 0;
          }
          return prev - 1000;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [quizStarted, quizCompleted, timeLeft]);

  const formatTime = (milliseconds: number): string => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };


  const handleAnswerSelect = (questionId: string, option: string) => {
    const newSelectedAnswer = { ...selectedAnswers, [questionId]: option }
    setSelectedAnswers(newSelectedAnswer);
    sessionStorage.setItem('response', JSON.stringify(newSelectedAnswer))
  };

  const handleNext = () => {
    if (quizData && currentQuestion < quizData.questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const handleSubmit = async () => {
    try {
      setisLoading(true);
      const body = {
        quizId,
        quizResponse: selectedAnswers
      }
      const data = await saveQuizData(body);
      setQuizCompleted(true);
      setShowResults(true);
      sessionStorage.removeItem('response');
    } catch (error) {
      console.log(error);
    } finally {
      setisLoading(false)
    }
  };

  const calculateScore = () => {
    if (!quizData) return { correct: 0, total: 0, percentage: 0 };

    let correct = 0;
    quizData.questions.forEach((question: any) => {
      if (selectedAnswers[question.id] == question.correctOption) {
        correct++;
      }
    });
    return {
      correct,
      total: quizData.questions.length,
      percentage: Math.round((correct / quizData.questions.length) * 100),
    };
  };

  const startQuiz = async () => {
    const isQuizStarted = await startQuizInDb(quizId)
    if (isQuizStarted) {
      enterFullScreen();
      setQuizStarted(true);
      return;
    }
    toast.error('Failed to start quiz');
  };

  // const restartQuiz = () => {
  //   setCurrentQuestion(0);
  //   setSelectedAnswers({});
  //   setTimeLeft(quizData ? (quizData.timeAlloted / (60 * 1000)) : 0); // seconds
  //   setQuizStarted(false);
  //   setQuizCompleted(false);
  //   setShowResults(false);
  // };

  if (isLoading) {
    return (<div className="min-h-screen flex items-center justify-center">
      <Loader2 className="h-12 w-12 animate-spin" />
    </div>)
  }

  if (!quizData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="max-w-md mx-auto">
          <CardContent className="p-6 text-center">
            <h2 className="text-xl font-semibold mb-4">Quiz Not Found</h2>
            <p className="text-muted-foreground mb-4">
              The requested quiz could not be found.
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
                  {unslugify(subjectName)} → {unslugify(topicName)}
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
                      {formatTime(quizData.timeAlloted - timeLeft)}
                    </div>
                    <p className="text-sm text-muted-foreground">Time Taken</p>
                  </div>
                </div>

                <div className="flex gap-4 justify-center">
                  {/* <Button onClick={restartQuiz} className="gap-2">
                    <RotateCcw className="h-4 w-4" />
                    Retake Quiz
                  </Button> */}
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
                  {quizData.questions.map((question: any, index: number) => {
                    const userAnswer = selectedAnswers[question.id];
                    const isCorrect = userAnswer == question.correctOption;

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
                                question.difficulty === 'EASY' ? 'bg-green-100 text-green-800' :
                                  question.difficulty === 'MEDIUM' ? 'bg-yellow-100 text-yellow-800' :
                                    'bg-red-100 text-red-800'
                              }>
                                {question.difficulty}
                              </Badge>
                            </div>
                            <div className="space-y-2 text-sm">
                              {question.options.map((option: any, optionIndex: number) => (
                                <div
                                  key={optionIndex}
                                  className={`p-2 rounded ${option == question.correctOption
                                    ? "bg-green-100 dark:bg-green-950/20 text-green-800 dark:text-green-200"
                                    : option == userAnswer && userAnswer != question.correctOption
                                      ? "bg-red-100 dark:bg-red-950/20 text-red-800 dark:text-red-200"
                                      : "bg-gray-50 dark:bg-gray-800"
                                    }`}
                                >
                                  {option}
                                  {option == question.correctOption && " ✓"}
                                  {option == userAnswer && userAnswer != question.correctOption && " ✗"}
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

  if (!quizStarted && !quizCompleted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            <Card>
              <CardHeader className="text-center">
                <div className="mb-4">
                </div>
                <CardTitle className="text-2xl mb-2">{unslugify(topicName)}</CardTitle>
                <p className="text-sm text-muted-foreground">
                  {unslugify(subjectName)} • Ready to test your knowledge?
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-muted/50 rounded-lg text-center dark:bg-background">
                    <div className="text-2xl font-bold mb-1">{quizData.questions.length}</div>
                    <div className="text-sm text-muted-foreground">Questions</div>
                  </div>
                  <div className="p-4 bg-muted/50 rounded-lg text-center dark:bg-background">
                    <div className="text-2xl font-bold mb-1">{quizData.timeAlloted / (60 * 1000)}</div>
                    <div className="text-sm text-muted-foreground">Minutes</div>
                  </div>
                </div>

                <div className="space-y-3 text-sm">
                  <h3 className="font-semibold">Instructions:</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Each question has 4 options, select the best answer</li>
                    <li>• You have {quizData.timeAlloted / (60 * 1000)} minutes to complete the quiz</li>
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

  if (quizCompleted && quizData) {
    const correctCount = responses.filter((r: any) => r.isCorrect).length;
    return (
      <div className="min-h-screen bg-background">

        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            <Card className="border-2 border-orange-200 bg-orange-50 dark:bg-orange-950/20 dark:border-orange-800">
              <CardHeader className="text-center">
                <div className="mx-auto w-16 h-16 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle className="h-8 w-8 text-orange-600 dark:text-orange-400" />
                </div>
                <CardTitle className="text-2xl text-orange-800 dark:text-orange-200 mb-2">
                  Quiz Already Submitted
                </CardTitle>
                <p className="text-orange-700 dark:text-orange-300 mb-2">
                  You have already completed this quiz
                </p>
                <p className="text-sm text-orange-600 dark:text-orange-400">
                  {unslugify(subjectName)} → {unslugify(topicName)}
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg border">
                    <div className="text-2xl font-bold text-green-600 dark:text-green-400 mb-1">
                      {Math.floor((correctCount / quizData.questions.length) * 100)}%
                    </div>
                    <p className="text-sm text-muted-foreground">Your Score</p>
                  </div>
                  <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg border">
                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-1">
                      {correctCount}/{quizData.questions.length}
                    </div>
                    <p className="text-sm text-muted-foreground">Correct</p>
                  </div>
                  <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg border">
                    <div className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-1">
                      {formatTime(quizData.submittedAt - quizData.startedAt)}
                    </div>
                    <p className="text-sm text-muted-foreground">Time Taken</p>
                  </div>
                </div>

                <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Completed On</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {new Date(quizData.submittedAt).toLocaleString('en-IN', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                      second: '2-digit',
                      hour12: true
                    })}
                  </p>
                </div>

                <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-blue-600 dark:text-blue-400 text-sm font-bold">i</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-1">
                        Want to improve your score?
                      </h4>
                      <p className="text-sm text-blue-700 dark:text-blue-300">
                        You can retake this quiz to practice more and potentially achieve a better score.
                        Your previous attempt will be replaced with the new one.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  {/* <Button variant="outline" className="flex-1 gap-2">
                    <BookOpen className="h-4 w-4" />
                    View Detailed Results
                  </Button> */}
                  <Link href="/practice" className="flex-1">
                    <Button variant="outline" className="w-full gap-2">
                      <Home className="h-4 w-4" />
                      Back to Dashboard
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

  return (
    <div className="min-h-screen bg-background" ref={containerRef}>
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center justify-center gap-2">
              <Sheet>
                <SheetTrigger><MenuIcon className="lg:hidden" /></SheetTrigger>
                <SheetContent side="left">
                  <SheetHeader>
                    <SheetTitle><p className="text-lg">{unslugify(topicName)}</p></SheetTitle>
                    <SheetDescription>
                      <div className="grid grid-cols-1 gap-2">
                        {quizData.questions.map((_: any, index: number) => (
                          <SheetClose key={index} asChild>
                            <button
                              onClick={() => setCurrentQuestion(index)}
                              className={`w-full text-start rounded text-sm font-medium transition-colors p-3 ${index === currentQuestion
                                ? "bg-primary text-white dark:bg-accent"
                                : selectedAnswers[quizData.questions[index].id] !== undefined
                                  ? "bg-green-100 text-green-800 dark:bg-green-950/90 dark:text-green-200"
                                  : "bg-muted hover:bg-muted/80 dark:text-accent"
                                }`}
                            >
                              Question {index + 1}
                            </button>
                          </SheetClose>
                        ))}
                      </div>
                    </SheetDescription>
                  </SheetHeader>
                  <SheetFooter>
                    <Button variant="success" size="sm" onClick={handleSubmit} className="inline-flex">
                      <CircleCheck className="h-4 w-4 mr-2" />
                      Submit
                    </Button>
                  </SheetFooter>
                </SheetContent>
              </Sheet>
              <p className="text-lg lg:text-2xl hidden lg:block">{unslugify(topicName)}</p>
            </div>
            <div className="flex items-center gap-4">
              <div>
                <Button variant={'ghost'} onClick={() =>
                  isFullscreen
                    ? exitFullScreen()
                    : enterFullScreen()
                }><Fullscreen /></Button>
              </div>
              <div>
                <ThemeToggle />
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Clock className="h-4 w-4" />
                <span className={`font-mono ${timeLeft < 1000 * 15 ? 'text-red-500' : ''}`}>
                  {formatTime(timeLeft)}
                </span>
              </div>
              <Button variant="success" size="sm" onClick={handleSubmit} className="lg:inline-flex hidden">
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
                Question {currentQuestion + 1} of {quizData.questions.length}
              </span>
              <div className="flex items-center gap-2">
                <Badge className={
                  currentQ.difficulty === 'EASY' ? 'bg-green-100 text-green-800' :
                    currentQ.difficulty === 'MEDIUM' ? 'bg-yellow-100 text-yellow-800' :
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
                {currentQ.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup
                value={selectedAnswers[currentQ.id]?.toString() ?? ""}
                onValueChange={(value) => handleAnswerSelect(currentQ.id, value)}
                className="space-y-4"
              >
                {currentQ.options.map((option: any, index: number) => (
                  <div key={index} className="flex items-center space-x-3">
                    <RadioGroupItem value={option} id={`option-${option}`} />
                    <Label
                      htmlFor={`option-${option}`}
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

            <div className="hidden lg:flex gap-2 flex-wrap">
              {quizData.questions.map((_: any, index: number) => (
                <button
                  key={index}
                  onClick={() => setCurrentQuestion(index)}
                  className={`w-8 h-8 rounded text-sm font-medium transition-colors ${index === currentQuestion
                    ? "bg-primary text-white dark:bg-accent"
                    : selectedAnswers[quizData.questions[index].id] !== undefined
                      ? "bg-green-100 text-green-800 dark:bg-green-950/90 dark:text-green-200"
                      : "bg-muted hover:bg-muted/80 dark:text-accent"
                    }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>

            {currentQuestion === quizData.questions.length - 1 ? (
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