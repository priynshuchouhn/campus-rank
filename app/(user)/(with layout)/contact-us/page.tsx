"use client";

import { useState } from "react";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Code,
  Mail,
  MapPin,
  Phone,
  MessageSquare,
  Send,
  Github,
  Linkedin,
  Twitter,
  Clock,
  Building2,
} from "lucide-react";
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
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import toast from "react-hot-toast";

const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

const contactInfo = [
  {
    icon: Mail,
    title: "Email",
    value: "support@campusrank.org",
    link: "mailto:priynshuchouhn@gmail.com",
  },
  {
    icon: MapPin,
    title: "Visit Us",
    value: "Old Housing Board, Pali, Rajasthan - 306401",
    link: "https://maps.google.com",
  },
  {
    icon: Phone,
    title: "Call Us",
    value: "+91 733999-6617",
    link: "tel:+917339996617",
  },
  {
    icon: MessageSquare,
    title: "Live Chat",
    value: "Available 9 AM - 6 PM",
    link: "#",
  },
];

const socialLinks = [
  {
    icon: Github,
    href: "https://github.com/priynshuchouhn",
    label: "GitHub",
  },
  {
    icon: Linkedin,
    href: "https://linkedin.com/in/priynshuchouhn",
    label: "LinkedIn",
  },
  {
    icon: Twitter,
    href: "https://twitter.com/priynshuchouhn",
    label: "Twitter",
  },
];

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof contactFormSchema>>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  async function onSubmit(values: z.infer<typeof contactFormSchema>) {
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log(values);
      toast.success("Message sent successfully!");
      form.reset();
    } catch (error) {
      toast.error("Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-background flex flex-col">
      {/* Hero Section */}
      <div className="relative bg-primary/5 py-16 overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/10" />
        <div className="container mx-auto px-4 text-center relative">
          <h1 className="text-4xl font-bold mb-4">Get in Touch</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Have questions about Campus Rank? We&apos;re here to help! Reach out to our
            team and we&apos;ll get back to you as soon as possible.
          </p>
        </div>
      </div>

      {/* Contact Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-6">Send us a Message</h2>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="Your email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Subject</FormLabel>
                      <FormControl>
                        <Input placeholder="Message subject" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Your message"
                          className="min-h-[150px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  <Send className="mr-2 h-4 w-4" />
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </Form>
          </Card>

          {/* Contact Information */}
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {contactInfo.map((item, index) => (
                <a
                  key={index}
                  href={item.link}
                  className="bg-card hover:bg-accent rounded-xl p-6 border transition-colors"
                  target={item.link.startsWith("http") ? "_blank" : undefined}
                  rel={item.link.startsWith("http") ? "noopener noreferrer" : undefined}
                >
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-lg bg-primary/10">
                      <item.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.value}</p>
                    </div>
                  </div>
                </a>
              ))}
            </div>

            <Card className="p-6">
              <h3 className="font-medium mb-4">Connect With Us</h3>
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors"
                    aria-label={social.label}
                  >
                    <social.icon className="h-5 w-5 text-primary" />
                  </a>
                ))}
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-lg bg-primary/10">
                  <Building2 className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Office Hours</h3>
                  <p className="text-sm text-muted-foreground">When you can reach us</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>Monday - Friday: 9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>Saturday: 10:00 AM - 2:00 PM</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>Sunday: Closed</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>    
    </main>
  );
}