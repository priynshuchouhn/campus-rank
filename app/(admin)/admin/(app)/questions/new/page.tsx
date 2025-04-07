"use client";

import { useEffect, useState, useMemo } from "react";
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
import { Trash2, Plus } from "lucide-react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Section, Topic } from "@/lib/interfaces";
import axios from "axios";

// Define the form schema with Zod
const testCaseSchema = z.object({
  input: z.string().min(1, "Input is required"),
  output: z.string().min(1, "Output is required"),
  explanation: z.string().min(1, "Explanation is required"),
});

const sampleCodeSchema = z.object({
  language: z.enum(["javascript", "python", "java", "cpp", "typescript"]),
  code: z.string().min(10, "Sample code must be at least 10 characters"),
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
  sampleCodes: z.array(sampleCodeSchema).min(1, "At least one sample code is required"),
});

type QuestionFormValues = z.infer<typeof questionSchema>;
type SampleCodeFormValues = z.infer<typeof sampleCodeSchema>;

export default function NewQuestionPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("details");
  const [selectedSection, setSelectedSection] = useState("");
  const [availableTopics, setAvailableTopics] = useState<Topic[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sections, setSections] = useState<Section[]>([]);
  const [selectedLanguage, setSelectedLanguage] = useState("javascript");

  // Code templates for different languages
  const codeTemplates = {
    javascript: `/**
 * @param {number[]} nums
 * @return {number}
 */
function solution(nums) {
    // Your code here
    
    return result;
}`,
    typescript: `function solution(nums: number[]): number {
    // Your code here
    
    return result;
}`,
    python: `def solution(nums):
    # Your code here
    
    return result`,
    java: `class Solution {
    public int solution(int[] nums) {
        // Your code here
        
        return result;
    }
}`,
    cpp: `class Solution {
public:
    int solution(vector<int>& nums) {
        // Your code here
        
        return result;
    }
};`
  };

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
      constraints: [" "],
      sampleCodes: [{ language: "javascript", code: codeTemplates.javascript }],
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

  const sampleCodesFieldArray = useFieldArray({
    control,
    name: "sampleCodes",
  });

  const testCaseFields = testCasesFieldArray.fields;
  const appendTestCase = testCasesFieldArray.append;
  const removeTestCase = testCasesFieldArray.remove;

  const constraintFields = constraintsFieldArray.fields;
  const appendConstraint = constraintsFieldArray.append;
  const removeConstraint = constraintsFieldArray.remove;

  const sampleCodeFields = sampleCodesFieldArray.fields;
  const appendSampleCode = sampleCodesFieldArray.append;
  const removeSampleCode = sampleCodesFieldArray.remove;

  // Watch section value to update topics
  const watchedSection = watch("section");

  useEffect(() => {
    if (watchedSection) {
      setSelectedSection(watchedSection);
      const section = sections.find(s => s.name === watchedSection);
      setAvailableTopics(section?.topics || []);
    }
  }, [watchedSection]);

  useEffect(() => {
    const fetchSections = async () => {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/sections`);
      setSections(response.data.data);
    };
    fetchSections();
  }, []);

  const onSubmit = async (data: QuestionFormValues) => {
    try {
      setIsSubmitting(true);

      // Create a loading toast
      const loadingToast = toast.loading("Creating question...");

      // Send the data to the API
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/questions`, data);

      // Dismiss the loading toast
      toast.dismiss(loadingToast);

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

  // Check if there are errors in each tab section
  const hasDetailsErrors = useMemo(() => {
    return !!(
      errors.title ||
      errors.section ||
      errors.topic ||
      errors.description ||
      errors.difficulty ||
      errors.timeComplexity ||
      errors.spaceComplexity
    );
  }, [errors]);

  const hasTestCasesErrors = useMemo(() => {
    return !!errors.testCases;
  }, [errors.testCases]);

  const hasConstraintsErrors = useMemo(() => {
    return !!errors.constraints;
  }, [errors.constraints]);

  const hasSampleCodeErrors = useMemo(() => {
    return !!errors.sampleCodes;
  }, [errors.sampleCodes]);

  // Check if there are any errors in the form
  const hasAnyErrors = useMemo(() => {
    return !!(hasDetailsErrors || hasTestCasesErrors || hasConstraintsErrors || hasSampleCodeErrors);
  }, [hasDetailsErrors, hasTestCasesErrors, hasConstraintsErrors, hasSampleCodeErrors]);

  // Handle form validation errors
  const handleError = () => {
    // Determine which tab has errors and switch to it
    if (hasDetailsErrors) {
      setActiveTab("details");
      toast.error("Please fix the errors in the Question Details tab");
    } else if (hasTestCasesErrors) {
      setActiveTab("testcases");
      toast.error("Please fix the errors in the Test Cases tab");
    } else if (hasConstraintsErrors) {
      setActiveTab("constraints");
      toast.error("Please fix the errors in the Constraints tab");
    } else if (hasSampleCodeErrors) {
      setActiveTab("code");
      toast.error("Please fix the errors in the Sample Code tab");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Add New Question</h1>
      </div>
      <form onSubmit={handleSubmit(onSubmit, handleError)}>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="details" className={hasDetailsErrors ? "border-red-500 border" : ""}>
              Question Details {hasDetailsErrors && <span className="ml-2 text-red-500">●</span>}
            </TabsTrigger>
            <TabsTrigger value="testcases" className={hasTestCasesErrors ? "border-red-500 border" : ""}>
              Test Cases {hasTestCasesErrors && <span className="ml-2 text-red-500">●</span>}
            </TabsTrigger>
            <TabsTrigger value="constraints" className={hasConstraintsErrors ? "border-red-500 border" : ""}>
              Constraints {hasConstraintsErrors && <span className="ml-2 text-red-500">●</span>}
            </TabsTrigger>
            <TabsTrigger value="code" className={hasSampleCodeErrors ? "border-red-500 border" : ""}>
              Sample Code {hasSampleCodeErrors && <span className="ml-2 text-red-500">●</span>}
            </TabsTrigger>
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
                              <SelectItem key={topic.id} value={topic.title}>
                                {topic.title || "No topic available"}
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
                <p className="text-sm text-muted-foreground">
                  Add test cases to validate the solution. Include at least one simple example and one edge case.
                </p>
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
                <p className="text-sm text-muted-foreground">
                  Add constraints that define the input limits for the problem (e.g., array size, value ranges).
                </p>
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
                <p className="text-sm text-muted-foreground">
                  Provide starter code templates for different programming languages. The template should include function signatures and comments.
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                {sampleCodeFields.map((field, index) => (
                  <div key={field.id} className="space-y-4 p-4 border rounded-lg">
                    <div className="flex justify-between items-center">
                      <h3 className="font-semibold">Sample Code {index + 1}</h3>
                      {sampleCodeFields.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeSampleCode(index)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor={`sampleCodes.${index}.language`}>Programming Language</Label>
                        <Controller
                          name={`sampleCodes.${index}.language`}
                          control={control}
                          render={({ field }) => (
                            <Select
                              onValueChange={(value) => {
                                field.onChange(value);
                                // Update the code template when language changes
                                setValue(`sampleCodes.${index}.code`, codeTemplates[value as keyof typeof codeTemplates]);
                              }}
                              value={field.value}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select language" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="javascript">JavaScript</SelectItem>
                                <SelectItem value="typescript">TypeScript</SelectItem>
                                <SelectItem value="python">Python</SelectItem>
                                <SelectItem value="java">Java</SelectItem>
                                <SelectItem value="cpp">C++</SelectItem>
                              </SelectContent>
                            </Select>
                          )}
                        />
                        {errors.sampleCodes?.[index]?.language && (
                          <p className="text-sm text-red-500">Language is required</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor={`sampleCodes.${index}.code`}>Code Template</Label>
                        <Textarea
                          id={`sampleCodes.${index}.code`}
                          {...register(`sampleCodes.${index}.code`)}
                          placeholder="Enter starter code template"
                          className="font-mono min-h-[300px]"
                        />
                        {errors.sampleCodes?.[index]?.code && (
                          <p className="text-sm text-red-500">{errors.sampleCodes[index]?.code?.message}</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}

                <Button
                  type="button"
                  variant="outline"
                  onClick={() => appendSampleCode({ language: "javascript", code: codeTemplates.javascript })}
                  className="w-full"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Code Template for Another Language
                </Button>
                {errors.sampleCodes && !Array.isArray(errors.sampleCodes) && (
                  <p className="text-sm text-red-500">{errors.sampleCodes.message}</p>
                )}
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
          <Button
            type="submit"
            disabled={isSubmitting}
            className={hasAnyErrors ? "bg-red-100 hover:bg-red-200" : ""}
          >
            {isSubmitting ? "Creating..." : hasAnyErrors ? "Fix Errors to Submit" : "Create Question"}
          </Button>
        </div>
      </form>
    </div>
  );
}