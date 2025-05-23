"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import toast from "react-hot-toast";
import { useState } from "react";
import { updateUser } from "@/lib/actions/users";
import { useRouter } from "next/navigation";
const profileSchema = z.object({
  leetcodeUsername: z.string().min(1, "LeetCode username is required").refine(val => !val.includes('/') && val.trim().length > 0, "Please enter only your username, not the full profile URL and ensure no whitespace is present"),
  hackerrankUsername: z.string().min(1, "Hackerrank username is required").refine(val => !val.includes('/') && val.trim().length > 0, "Please enter only your username, not the full profile URL and ensure no whitespace is present"),
  gfgUsername: z.string().min(1, "GFG username is required").refine(val => !val.includes('/') && val.trim().length > 0, "Please enter only your username, not the full profile URL and ensure no whitespace is present"),
});




export function ProfileForm({ user }: any) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      leetcodeUsername: user.leetcodeUsername || "",
      hackerrankUsername: user.hackerrankUsername || "",
      gfgUsername: user.gfgUsername || "",
    },
  });

  async function onSubmit(values: z.infer<typeof profileSchema>) {
    try {
      setIsLoading(true);
      const updatedUser = await updateUser({ ...values, id: user.id, name: user.name, email: user.email, totalSolved: user.totalSolved, easySolved: user.easySolved, mediumSolved: user.mediumSolved, hardSolved: user.hardSolved, image: user.image });
      if (updatedUser) {
        toast.success("Profile updated successfully");
      } else {
        toast.error("Failed to update profile");
      }
      form.reset();
      router.refresh();
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      toast.error("Failed to update profile");
      setIsLoading(false);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="text-sm text-yellow-600 dark:text-yellow-400 mb-4">
              Note: Once you save your usernames, they cannot be changed. Please enter them carefully.
            </div>
            <FormField
              control={form.control}
              name="leetcodeUsername"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>LeetCode Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your Leetcode username" {...field} disabled={user.isLocked} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="hackerrankUsername"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>HackerRank Username</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your Hackerrank username"
                      disabled={user.isLocked}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="gfgUsername"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>GFG Username</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your GFG username"
                      disabled={user.isLocked}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {!user.isLocked && <Button type="submit" disabled={isLoading}>{isLoading ? 'Saving...' : 'Save Changes'}</Button>}
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}