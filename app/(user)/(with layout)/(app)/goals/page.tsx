"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, Plus, Trash2 } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from '@/components/ui/skeleton';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import axios from 'axios';
import toast from 'react-hot-toast';

const goalFormSchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().optional(),
    targetCount: z.number().min(1, "Target count must be at least 1"),
    startDate: z.string().min(1, "Start date is required"),
    endDate: z.string().min(1, "End date is required"),
    type: z.enum(['IMPLEMENTATION', 'CONCEPT', 'ALGORITHM'])
});

type GoalFormData = z.infer<typeof goalFormSchema>;

interface WeeklyGoal {
    id: string;
    title: string;
    description?: string;
    targetCount: number;
    currentCount: number;
    startDate: string;
    endDate: string;
    status: 'IN_PROGRESS' | 'COMPLETED';
    type: 'IMPLEMENTATION' | 'CONCEPT' | 'ALGORITHM';
}

function LoadingSkeleton() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <Skeleton className="h-8 w-48" />
                <Skeleton className="h-6 w-32" />
            </div>

            <Card>
                <CardHeader>
                    <Skeleton className="h-6 w-32" />
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-10 w-full" />
                    </div>
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-10 w-full" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-24" />
                            <Skeleton className="h-10 w-full" />
                        </div>
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-24" />
                            <Skeleton className="h-10 w-full" />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-24" />
                            <Skeleton className="h-10 w-full" />
                        </div>
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-24" />
                            <Skeleton className="h-10 w-full" />
                        </div>
                    </div>
                    <Skeleton className="h-10 w-24 self-end" />
                </CardContent>
            </Card>

            <div className="space-y-2">
                <div className="flex items-center justify-between">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-4 w-16" />
                </div>
                <Skeleton className="h-2 w-full" />
            </div>

            <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                    <Card key={i}>
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div className="space-y-2">
                                    <Skeleton className="h-5 w-48" />
                                    <Skeleton className="h-4 w-64" />
                                    <div className="flex items-center gap-4">
                                        <Skeleton className="h-4 w-24" />
                                        <Skeleton className="h-4 w-32" />
                                        <Skeleton className="h-4 w-20" />
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Skeleton className="h-9 w-24" />
                                    <Skeleton className="h-9 w-9" />
                                </div>
                            </div>
                            <Skeleton className="h-2 w-full mt-4" />
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}

export default function GoalsPage() {
    const [goals, setGoals] = useState<WeeklyGoal[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting }
    } = useForm<GoalFormData>({
        resolver: zodResolver(goalFormSchema),
        defaultValues: {
            type: 'IMPLEMENTATION'
        }
    });

    useEffect(() => {
        fetchGoals();
    }, []);

    const fetchGoals = async () => {
        try {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/goals`);
            setGoals(data);
            setError(null);
        } catch (error) {
            setError('Failed to load goals');
            toast.error('Failed to load goals');
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const onSubmit = async (data: GoalFormData) => {
        try {
            const { data: newGoal } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/goals`, data);
            setGoals([...goals, newGoal]);
            reset();
            toast.success('Goal created successfully');
        } catch (error) {
            toast.error('Failed to create goal');
            console.error(error);
        }
    };

    const updateGoalProgress = async (id: string, currentCount: number) => {
        try {
            const goal = goals.find(g => g.id === id);
            if (!goal) return;

            const newStatus = currentCount >= goal.targetCount ? 'COMPLETED' : 'IN_PROGRESS';

            const { data } = await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/api/goals`, {
                id,
                currentCount,
                status: newStatus
            });

            setGoals(goals.map(goal =>
                goal.id === id ? data : goal
            ));
            toast.success('Progress updated');
        } catch (error) {
            toast.error('Failed to update goal');
            console.error(error);
        }
    };

    const deleteGoal = async (id: string) => {
        try {
            await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/goals?id=${id}`);
            setGoals(goals.filter(goal => goal.id !== id));
            toast.success('Goal deleted successfully');
        } catch (error) {
            toast.error('Failed to delete goal');
            console.error(error);
        }
    };

    const completedGoals = goals.filter(goal => goal.status === 'COMPLETED').length;
    const progress = goals.length > 0 ? (completedGoals / goals.length) * 100 : 0;

    if (isLoading) {
        return <LoadingSkeleton />;
    }

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-3xl font-bold">Weekly Goals</h1>
                <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                    <span className="font-medium">{completedGoals} of {goals.length} completed</span>
                </div>
            </div>

            {error && (
                <div className="mb-4 p-4 bg-destructive/10 text-destructive rounded-md">
                    {error}
                </div>
            )}

            <Card className="mb-6">
                <CardHeader>
                    <CardTitle>Add New Goal</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="title">Goal Title</Label>
                            <Input
                                id="title"
                                placeholder="Enter your goal"
                                {...register('title')}
                            />
                            {errors.title && (
                                <p className="text-sm text-destructive">{errors.title.message}</p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="description">Description (Optional)</Label>
                            <Input
                                id="description"
                                placeholder="Enter goal description"
                                {...register('description')}
                            />
                            {errors.description && (
                                <p className="text-sm text-destructive">{errors.description.message}</p>
                            )}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="targetCount">Target Count</Label>
                                <Input
                                    id="targetCount"
                                    type="number"
                                    min="1"
                                    {...register('targetCount', { valueAsNumber: true })}
                                />
                                {errors.targetCount && (
                                    <p className="text-sm text-destructive">{errors.targetCount.message}</p>
                                )}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="type">Goal Type</Label>
                                <Select
                                    {...register('type')}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select goal type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="IMPLEMENTATION">Implementation</SelectItem>
                                        <SelectItem value="CONCEPT">Concept</SelectItem>
                                        <SelectItem value="ALGORITHM">Algorithm</SelectItem>
                                    </SelectContent>
                                </Select>
                                {errors.type && (
                                    <p className="text-sm text-destructive">{errors.type.message}</p>
                                )}
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="startDate">Start Date</Label>
                                <Input
                                    id="startDate"
                                    type="date"
                                    {...register('startDate')}
                                />
                                {errors.startDate && (
                                    <p className="text-sm text-destructive">{errors.startDate.message}</p>
                                )}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="endDate">End Date</Label>
                                <Input
                                    id="endDate"
                                    type="date"
                                    {...register('endDate')}
                                />
                                {errors.endDate && (
                                    <p className="text-sm text-destructive">{errors.endDate.message}</p>
                                )}
                            </div>
                        </div>
                        <Button type="submit" className="self-end" disabled={isSubmitting}>
                            <Plus className="h-4 w-4 mr-2" />
                            {isSubmitting ? 'Adding...' : 'Add Goal'}
                        </Button>
                    </form>
                </CardContent>
            </Card>

            <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                    <h2 className="font-semibold">Weekly Progress</h2>
                    <span className="text-sm text-muted-foreground">{Math.round(progress)}%</span>
                </div>
                <Progress value={progress} className="h-2" />
            </div>

            <div className="space-y-4">
                {goals.map(goal => (
                    <Card key={goal.id}>
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div className="space-y-1">
                                    <h3 className="font-medium">{goal.title}</h3>
                                    {goal.description && (
                                        <p className="text-sm text-muted-foreground">{goal.description}</p>
                                    )}
                                    <div className="flex items-center gap-4 text-sm">
                                        <span className="text-muted-foreground">
                                            {goal.currentCount} / {goal.targetCount} completed
                                        </span>
                                        <span className="text-muted-foreground">
                                            {new Date(goal.startDate).toLocaleDateString()} - {new Date(goal.endDate).toLocaleDateString()}
                                        </span>
                                        <span className="capitalize">{goal.type.toLowerCase()}</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => updateGoalProgress(goal.id, goal.currentCount + 1)}
                                        disabled={goal.currentCount >= goal.targetCount}
                                    >
                                        Update Progress
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => deleteGoal(goal.id)}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                            <Progress
                                value={(goal.currentCount / goal.targetCount) * 100}
                                className="h-2 mt-4"
                            />
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
} 