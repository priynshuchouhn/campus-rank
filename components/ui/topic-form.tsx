'use client'
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Trash2, Loader2 } from "lucide-react";
import { useForm, useFieldArray, Controller, Control } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios from "axios";
import MarkdownEditor from "@/components/ui/markdown-editor";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

// Define schemas for validation
const resourceSchema = z.object({
    title: z.string().min(2, "Title must be at least 2 characters"),
    url: z.string().url("Must be a valid URL"),
    type: z.enum(["VIDEO", "ARTICLE"])
});

const subtopicSchema = z.object({
    title: z.string().min(2, "Subtopic title must be at least 2 characters"),
});

const topicSchema = z.object({
    title: z.string().min(2, "Title must be at least 2 characters"),
    description: z.string().min(10, "Description must be at least 10 characters"),
    sectionId: z.string().min(1, "Section is required"),
    resources: z.array(resourceSchema).optional().default([]),
    subtopics: z.array(subtopicSchema).optional().default([]),
    prerequisites: z.array(z.string()).optional().default([])
});

export type TopicFormValues = z.infer<typeof topicSchema>;

interface Section {
    id: string;
    name: string;
    description: string;
    topicsCount: number;
}

interface TopicFormProps {
    initialData?: TopicFormValues;
    id?:string
}

export default function TopicForm({
    initialData,
    id
}: TopicFormProps) {
    const [sections, setSections] = useState<Section[]>([]);
    const [editorData, setEditorData] = useState(initialData?.description || "");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const submitButtonText = initialData ? "Save Topic" : 'Update Topic';
    const router = useRouter();

    const form = useForm<TopicFormValues>({
        resolver: zodResolver(topicSchema),
        defaultValues: initialData || {
            title: "",
            description: "",
            sectionId: "",
            resources: [],
            subtopics: [],
            prerequisites: []
        },
    });

    const { control } = form;

    const {
        fields: resourceFields,
        append: appendResource,
        remove: removeResource
    } = useFieldArray({
        control: control as Control<TopicFormValues>,
        name: "resources" as any
    });

    const {
        fields: subtopicFields,
        append: appendSubtopic,
        remove: removeSubtopic
    } = useFieldArray({
        control: control as Control<TopicFormValues>,
        name: "subtopics" as any
    });

    const {
        fields: prerequisiteFields,
        append: appendPrerequisite,
        remove: removePrerequisite
    } = useFieldArray({
        control: control as Control<TopicFormValues>,
        name: "prerequisites" as any
    });

    // Fetch sections
    useEffect(() => {
        const fetchSections = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/sections`);
                setSections(response.data.data);
            } catch (error) {
                console.error("Error fetching sections:", error);
            }
        };

        fetchSections();
    }, []);

    const onSubmit = async (data: TopicFormValues) => {
        if(!initialData){
            handleAddTopic(data);
        }else{

        }
    };

    const handleAddTopic = async (data: TopicFormValues) => {
        try {
            setIsSubmitting(true);
            await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/topics`, data);
            toast.success("Topic created successfully");
            router.push("/admin/topics");
        } catch (error) {
            console.error("Error creating topic:", error);
            toast.error(error instanceof Error ? error.message : "Failed to create topic");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleUpdateTopic = async (data: TopicFormValues) => {
        try {
            setIsSubmitting(true);
            await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/topics/${id}`, data);
            toast.success("Topic updated successfully");
            router.push("/admin/topics");
        } catch (error) {
            console.error("Error updating topic:", error);
            toast.error(error instanceof Error ? error.message : "Failed to update topic");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Topic Information</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="title">Topic Title</Label>
                        <Input
                            id="title"
                            {...form.register("title")}
                            placeholder="Enter topic title"
                        />
                        {form.formState.errors.title && (
                            <p className="text-sm text-red-500">{form.formState.errors.title.message}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <div className="border rounded-md overflow-hidden">
                            <MarkdownEditor
                                value={editorData}
                                onChange={(data) => {
                                    setEditorData(data);
                                    form.setValue("description", data);
                                }}
                            />
                        </div>
                        {form.formState.errors.description && (
                            <p className="text-sm text-red-500">{form.formState.errors.description.message}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="section">Section</Label>
                        <Controller
                            name="sectionId"
                            control={control}
                            render={({ field }) => (
                                <Select
                                    onValueChange={field.onChange}
                                    value={field.value}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select a section" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {sections.map((section) => (
                                            <SelectItem key={section.id} value={section.id}>
                                                {section.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            )}
                        />
                        {form.formState.errors.sectionId && (
                            <p className="text-sm text-red-500">{form.formState.errors.sectionId.message}</p>
                        )}
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <Label>Resources</Label>
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => appendResource({ title: "", url: "", type: "ARTICLE" })}
                            >
                                <Plus className="h-4 w-4 mr-1" />
                                Add Resource
                            </Button>
                        </div>

                        {resourceFields.map((field, index) => (
                            <div key={field.id} className="space-y-3 p-3 border rounded-md">
                                <div className="flex justify-between items-center">
                                    <h4 className="text-sm font-medium">Resource {index + 1}</h4>
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => removeResource(index)}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor={`resources.${index}.title`}>Title</Label>
                                    <Input
                                        id={`resources.${index}.title`}
                                        {...form.register(`resources.${index}.title`)}
                                        placeholder="Resource title"
                                    />
                                    {form.formState.errors.resources?.[index]?.title && (
                                        <p className="text-sm text-red-500">{String(form.formState.errors.resources[index]?.title?.message || '')}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor={`resources.${index}.url`}>URL</Label>
                                    <Input
                                        id={`resources.${index}.url`}
                                        {...form.register(`resources.${index}.url`)}
                                        placeholder="https://example.com"
                                    />
                                    {form.formState.errors.resources?.[index]?.url && (
                                        <p className="text-sm text-red-500">{form.formState.errors.resources[index]?.url?.message}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor={`resources.${index}.type`}>Type</Label>
                                    <Controller
                                        name={`resources.${index}.type`}
                                        control={control}
                                        render={({ field }) => (
                                            <Select
                                                onValueChange={field.onChange}
                                                value={field.value}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="ARTICLE">Article</SelectItem>
                                                    <SelectItem value="VIDEO">Video</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        )}
                                    />
                                    {form.formState.errors.resources?.[index]?.type && (
                                        <p className="text-sm text-red-500">Invalid resource type</p>
                                    )}
                                </div>
                            </div>
                        ))}

                        {resourceFields.length === 0 && (
                            <p className="text-sm text-muted-foreground">No resources added yet.</p>
                        )}
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <Label>Subtopics</Label>
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => appendSubtopic({ title: "" })}
                            >
                                <Plus className="h-4 w-4 mr-1" />
                                Add Subtopic
                            </Button>
                        </div>

                        {subtopicFields.map((field, index) => (
                            <div key={field.id} className="space-y-3 p-3 border rounded-md">
                                <div className="flex justify-between items-center">
                                    <h4 className="text-sm font-medium">Subtopic {index + 1}</h4>
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => removeSubtopic(index)}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor={`subtopics.${index}.title`}>Title</Label>
                                    <Input
                                        id={`subtopics.${index}.title`}
                                        {...form.register(`subtopics.${index}.title`)}
                                        placeholder="Subtopic title"
                                    />
                                    {form.formState.errors.subtopics?.[index]?.title && (
                                        <p className="text-sm text-red-500">{String(form.formState.errors.subtopics[index]?.title?.message || '')}</p>
                                    )}
                                </div>
                            </div>
                        ))}

                        {subtopicFields.length === 0 && (
                            <p className="text-sm text-muted-foreground">No subtopics added yet.</p>
                        )}
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <Label>Prerequisites</Label>
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => appendPrerequisite("" as any)}
                            >
                                <Plus className="h-4 w-4 mr-1" />
                                Add Prerequisite
                            </Button>
                        </div>

                        {prerequisiteFields.map((field, index) => (
                            <div key={field.id} className="space-y-3 p-3 border rounded-md">
                                <div className="flex justify-between items-center">
                                    <h4 className="text-sm font-medium">Prerequisite {index + 1}</h4>
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => removePrerequisite(index)}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor={`prerequisites.${index}`}>Prerequisite Title</Label>
                                    <Input
                                        id={`prerequisites.${index}`}
                                        {...form.register(`prerequisites.${index}`)}
                                        placeholder="Enter prerequisite title"
                                    />
                                    {form.formState.errors.prerequisites?.[index] && (
                                        <p className="text-sm text-red-500">Prerequisite is required</p>
                                    )}
                                </div>
                            </div>
                        ))}

                        {prerequisiteFields.length === 0 && (
                            <p className="text-sm text-muted-foreground">No prerequisites added yet.</p>
                        )}
                    </div>

                    <div className="flex justify-end mt-6">
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Saving...
                                </>
                            ) : (
                                submitButtonText
                            )}
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
} 