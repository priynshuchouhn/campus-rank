"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, Plus, Trash2 } from "lucide-react";

interface Goal {
    id: string;
    title: string;
    completed: boolean;
    day: string;
    category: string;
}

const initialGoals: Goal[] = [
    { id: '1', title: 'Complete 2 Array problems', completed: true, day: 'Monday', category: 'Practice' },
    { id: '2', title: 'Watch Tree traversal video', completed: true, day: 'Tuesday', category: 'Learning' },
    { id: '3', title: 'Implement BFS algorithm', completed: false, day: 'Wednesday', category: 'Implementation' },
    { id: '4', title: 'Read article on Dynamic Programming', completed: false, day: 'Thursday', category: 'Learning' },
    { id: '5', title: 'Solve 1 Hard problem on Graphs', completed: false, day: 'Friday', category: 'Practice' },
];

export default function GoalsPage() {
    const [goals, setGoals] = useState<Goal[]>(initialGoals);
    const [newGoalTitle, setNewGoalTitle] = useState('');
    const [selectedDay, setSelectedDay] = useState('Monday');
    const [selectedCategory, setSelectedCategory] = useState('Practice');

    const completedGoals = goals.filter(goal => goal.completed).length;
    const progress = goals.length > 0 ? (completedGoals / goals.length) * 100 : 0;

    const handleAddGoal = () => {
        if (newGoalTitle.trim() === '') return;

        const newGoal: Goal = {
            id: Math.random().toString(36).substr(2, 9),
            title: newGoalTitle,
            completed: false,
            day: selectedDay,
            category: selectedCategory
        };

        setGoals([...goals, newGoal]);
        setNewGoalTitle('');
    };

    const toggleGoalCompletion = (id: string) => {
        setGoals(goals.map(goal =>
            goal.id === id ? { ...goal, completed: !goal.completed } : goal
        ));
    };

    const deleteGoal = (id: string) => {
        setGoals(goals.filter(goal => goal.id !== id));
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-3xl font-bold">Weekly Goals</h1>
                <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                    <span className="font-medium">{completedGoals} of {goals.length} completed</span>
                </div>
            </div>

            <Card className="mb-6">
                <CardHeader>
                    <CardTitle>Add New Goal</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="goal-title">Goal Title</Label>
                            <Input
                                id="goal-title"
                                placeholder="Enter your goal"
                                value={newGoalTitle}
                                onChange={(e) => setNewGoalTitle(e.target.value)}
                            />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="day">Day</Label>
                                <select
                                    id="day"
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    value={selectedDay}
                                    onChange={(e) => setSelectedDay(e.target.value)}
                                >
                                    <option value="Monday">Monday</option>
                                    <option value="Tuesday">Tuesday</option>
                                    <option value="Wednesday">Wednesday</option>
                                    <option value="Thursday">Thursday</option>
                                    <option value="Friday">Friday</option>
                                    <option value="Saturday">Saturday</option>
                                    <option value="Sunday">Sunday</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="category">Category</Label>
                                <select
                                    id="category"
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    value={selectedCategory}
                                    onChange={(e) => setSelectedCategory(e.target.value)}
                                >
                                    <option value="Practice">Practice</option>
                                    <option value="Learning">Learning</option>
                                    <option value="Implementation">Implementation</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                        </div>
                        <Button onClick={handleAddGoal} className="self-end">
                            <Plus className="h-4 w-4 mr-2" />
                            Add Goal
                        </Button>
                    </div>
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
                {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => {
                    const dayGoals = goals.filter(goal => goal.day === day);
                    if (dayGoals.length === 0) return null;

                    return (
                        <Card key={day}>
                            <CardHeader className="pb-3">
                                <CardTitle>{day}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-2">
                                    {dayGoals.map(goal => (
                                        <div key={goal.id} className="flex items-center justify-between p-2 rounded-md hover:bg-accent/50">
                                            <div className="flex items-center gap-3">
                                                <Checkbox
                                                    id={`goal-${goal.id}`}
                                                    checked={goal.completed}
                                                    onCheckedChange={() => toggleGoalCompletion(goal.id)}
                                                />
                                                <div>
                                                    <Label
                                                        htmlFor={`goal-${goal.id}`}
                                                        className={`font-medium ${goal.completed ? 'line-through text-muted-foreground' : ''}`}
                                                    >
                                                        {goal.title}
                                                    </Label>
                                                    <p className="text-xs text-muted-foreground">{goal.category}</p>
                                                </div>
                                            </div>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => deleteGoal(goal.id)}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>
        </div>
    );
} 