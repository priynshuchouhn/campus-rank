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
import { User } from "@/lib/interfaces";

const profileSchema = z.object({
  leetcodeUsername: z.string().min(1, "LeetCode username is required"),
  hackerrankUsername: z.string().min(1, "GFG username is required"),
  gfgUsername: z.string().min(1, "HackerRank username is required"),
});

interface ProfileFormProps {
  user: User;
}

export function ProfileForm({ user }: ProfileFormProps) {
  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      leetcodeUsername: user.leetcodeUsername || "",
      hackerrankUsername: user.hackerrankUsername || "",
      gfgUsername: user.gfgUsername || "",
    },
  });

  function onSubmit(values: z.infer<typeof profileSchema>) {
    console.log(values);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="leetcodeUsername"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>LeetCode Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your LeetCode username" {...field} />
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
                      placeholder="Enter your HackerRank username"
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
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Save Changes</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}