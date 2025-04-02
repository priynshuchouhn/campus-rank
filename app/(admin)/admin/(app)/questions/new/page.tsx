"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TestCase, Question } from "@/lib/interfaces";
import { Trash2, Plus } from "lucide-react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

// Mock data for sections and topics
const sections = [
  { id: 1, name: "Arrays", topics: ["Array Manipulation", "Two Pointers", "Sliding Window"] },
  { id: 2, name: "Sorting", topics: ["Bubble Sort", "Merge Sort", "Quick Sort"] },
  { id: 3, name: "Trees", topics: ["Binary Trees", "Binary Search Trees", "AVL Trees"] },
];
const topics = [
  { id: 1, name: "Array Manipulation", description: "Array Manipulation is a technique used to manipulate arrays in programming.", section: "Arrays" },
  { id: 2, name: "Two Pointers", description: "Two Pointers is a technique used to solve problems that require finding pairs of elements in an array.", section: "Arrays" },
  { id: 3, name: "Sliding Window", description: "Sliding Window is a technique used to solve problems that require finding the maximum or minimum sum of a subarray.", section: "Arrays" },
  { id: 4, name: "Bubble Sort", description: "Bubble Sort is a simple sorting algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.", section: "Sorting" },
  { id: 5, name: "Merge Sort", description: "Merge Sort is a divide-and-conquer algorithm that divides the input array into two halves, sorts each half, and then merges the two sorted halves.", section: "Sorting" },
  { id: 6, name: "Quick Sort", description: "Quick Sort is a divide-and-conquer algorithm that picks an element as pivot and partitions the given array around the picked pivot.", section: "Sorting" },
];

// Define the form schema with Zod
const testCaseSchema = z.object({
  input: z.string().min(1, "Input is required"),
  output: z.string().min(1, "Output is required"),
  explanation: z.string().min(1, "Explanation is required"),
});

const questionSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  section: z.string().min(1, "Section is required"),
  topic: z.string().min(1, "Topic is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  difficulty: z.enum(["Easy", "Medium", "Hard"]),
  timeComplexity: z.string().min(1, "Time complexity is required"),
  spaceComplexity: z.string().min(1, "Space complexity is required"),
  testCases: z.array(testCaseSchema).min(1, "At least one test case is required"),
  constraints: z.array(z.string().min(1, "Constraint cannot be empty")).min(1, "At least one constraint is required"),
  sampleCode: z.string().min(10, "Sample code must be at least 10 characters"),
});

type QuestionFormValues = z.infer<typeof questionSchema>;

export default function NewQuestionPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("details");
  const [selectedSection, setSelectedSection] = useState("");
  const [availableTopics, setAvailableTopics] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize react-hook-form
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    watch,
    setValue
  } = useForm<QuestionFormValues>({
    resolver: zodResolver(questionSchema),
    defaultValues: {
      testCases: [{ input: "", output: "", explanation: "" }],
      constraints: [""],
      difficulty: "Medium",
    }
  });

  // Use useFieldArray for dynamic arrays
  const testCasesFieldArray = useFieldArray({
    control,
    name: "testCases",
  });

  const constraintsFieldArray = useFieldArray({
    control,
    name: "constraints" as "testCases",
  });

  const testCaseFields = testCasesFieldArray.fields;
  const appendTestCase = testCasesFieldArray.append;
  const removeTestCase = testCasesFieldArray.remove;

  const constraintFields = constraintsFieldArray.fields;
  const appendConstraint = constraintsFieldArray.append;
  const removeConstraint = constraintsFieldArray.remove;

  // Watch section value to update topics
  const watchedSection = watch("section");

  useEffect(() => {
    if (watchedSection) {
      setSelectedSection(watchedSection);
      const section = sections.find(s => s.name === watchedSection);
      setAvailableTopics(section?.topics || []);
    }
  }, [watchedSection]);

  const onSubmit = async (data: QuestionFormValues) => {
    try {
      setIsSubmitting(true);

      // Create a loading toast
      const loadingToast = toast.loading("Creating question...");

      // Send the data to the API
      const response = await fetch("/api/questions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      // Dismiss the loading toast
      toast.dismiss(loadingToast);

      if (!response.ok) {
        // If the response is not ok, show an error toast
        const errorData = await response.json();
        toast.error(errorData.message || "Failed to create question");
        return;
      }

      // If the response is ok, show a success toast
      toast.success("Question created successfully!");

      // Redirect to the questions list page
      router.push("/admin/questions");
    } catch (error) {
      console.error("Error creating question:", error);
      toast.error("An unexpected error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Add New Question</h1>
      </div>

      <Toaster position="top-right" />

      <form onSubmit={handleSubmit(onSubmit)}>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="details">Question Details</TabsTrigger>
            <TabsTrigger value="testcases">Test Cases</TabsTrigger>
            <TabsTrigger value="constraints">Constraints</TabsTrigger>
            <TabsTrigger value="code">Sample Code</TabsTrigger>
          </TabsList>

          <TabsContent value="details">
            <Card>
              <CardHeader>
                <CardTitle>Question Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    {...register("title")}
                  />
                  {errors.title && (
                    <p className="text-sm text-red-500">{errors.title.message}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2 w-full">
                    <Label htmlFor="section">Section</Label>
                    <Controller
                      name="section"
                      control={control}
                      render={({ field }) => (
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select section" />
                          </SelectTrigger>
                          <SelectContent>
                            {sections.map((section) => (
                              <SelectItem key={section.id} value={section.name}>
                                {section.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    />
                    {errors.section && (
                      <p className="text-sm text-red-500">{errors.section.message}</p>
                    )}
                  </div>

                  <div className="space-y-2 w-full">
                    <Label htmlFor="topic">Topic</Label>
                    <Controller
                      name="topic"
                      control={control}
                      render={({ field }) => (
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                          disabled={!selectedSection}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select topic" />
                          </SelectTrigger>
                          <SelectContent>
                            {availableTopics.map((topic) => (
                              <SelectItem key={topic} value={topic}>
                                {topic}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    />
                    {errors.topic && (
                      <p className="text-sm text-red-500">{errors.topic.message}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    {...register("description")}
                    className="min-h-[200px]"
                  />
                  {errors.description && (
                    <p className="text-sm text-red-500">{errors.description.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="difficulty">Difficulty</Label>
                  <Controller
                    name="difficulty"
                    control={control}
                    render={({ field }) => (
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select difficulty" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Easy">Easy</SelectItem>
                          <SelectItem value="Medium">Medium</SelectItem>
                          <SelectItem value="Hard">Hard</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.difficulty && (
                    <p className="text-sm text-red-500">{errors.difficulty.message}</p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="timeComplexity">Expected Time Complexity</Label>
                    <Input
                      id="timeComplexity"
                      {...register("timeComplexity")}
                      placeholder="e.g., O(n)"
                    />
                    {errors.timeComplexity && (
                      <p className="text-sm text-red-500">{errors.timeComplexity.message}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="spaceComplexity">Expected Space Complexity</Label>
                    <Input
                      id="spaceComplexity"
                      {...register("spaceComplexity")}
                      placeholder="e.g., O(1)"
                    />
                    {errors.spaceComplexity && (
                      <p className="text-sm text-red-500">{errors.spaceComplexity.message}</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="testcases">
            <Card>
              <CardHeader>
                <CardTitle>Test Cases</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {testCaseFields.map((field, index) => (
                  <div key={field.id} className="space-y-4 p-4 border rounded-lg">
                    <div className="flex justify-between items-center">
                      <h3 className="font-semibold">Test Case {index + 1}</h3>
                      {testCaseFields.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeTestCase(index)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Input</Label>
                        <Textarea
                          placeholder="Enter test case input"
                          {...register(`testCases.${index}.input`)}
                        />
                        {errors.testCases?.[index]?.input && (
                          <p className="text-sm text-red-500">{errors.testCases[index]?.input?.message}</p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label>Expected Output</Label>
                        <Textarea
                          placeholder="Enter expected output"
                          {...register(`testCases.${index}.output`)}
                        />
                        {errors.testCases?.[index]?.output && (
                          <p className="text-sm text-red-500">{errors.testCases[index]?.output?.message}</p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label>Explanation</Label>
                        <Textarea
                          placeholder="Explain how the output is derived from the input"
                          {...register(`testCases.${index}.explanation`)}
                        />
                        {errors.testCases?.[index]?.explanation && (
                          <p className="text-sm text-red-500">{errors.testCases[index]?.explanation?.message}</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => appendTestCase({ input: "", output: "", explanation: "" })}
                  className="w-full"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Test Case
                </Button>
                {errors.testCases && !Array.isArray(errors.testCases) && (
                  <p className="text-sm text-red-500">{errors.testCases.message}</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="constraints">
            <Card>
              <CardHeader>
                <CardTitle>Constraints</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {constraintFields.map((field, index) => (
                  <div key={field.id} className="flex gap-2">
                    <Input
                      placeholder="Enter constraint (e.g., 1 <= n <= 10^5)"
                      {...register(`constraints.${index}`)}
                    />
                    {constraintFields.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeConstraint(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                    {errors.constraints?.[index] && (
                      <p className="text-sm text-red-500">{errors.constraints[index]?.message}</p>
                    )}
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => appendConstraint("" as any)}
                  className="w-full"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Constraint
                </Button>
                {errors.constraints && !Array.isArray(errors.constraints) && (
                  <p className="text-sm text-red-500">{errors.constraints.message}</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="code">
            <Card>
              <CardHeader>
                <CardTitle>Sample Code</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Label htmlFor="sampleCode">Starter Code Template</Label>
                  <Textarea
                    id="sampleCode"
                    {...register("sampleCode")}
                    placeholder="Enter starter code template"
                    className="font-mono min-h-[400px]"
                  />
                  {errors.sampleCode && (
                    <p className="text-sm text-red-500">{errors.sampleCode.message}</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-6 flex gap-4 justify-end">
          <Button
            variant="outline"
            type="button"
            onClick={() => {
              window.history.back();
              toast.error("Form cancelled");
            }}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Creating..." : "Create Question"}
          </Button>
        </div>
      </form>
    </div>
  );
}