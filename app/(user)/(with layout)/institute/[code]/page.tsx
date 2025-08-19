import { useState } from "react";
import {
  Users,
  Trophy,
  GraduationCap,
  MapPin,
  Globe,
  Code,
  Phone,
  Mail,
  FileCode,
  Brain,
  Target,
  ChevronRight,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { notFound } from "next/navigation";
import { fetchInstituteByCode } from "@/lib/actions/institute";
import Image from "next/image";
import InstituteDetailTab from "../components/institute-detail-tabs";


// Mock data for demonstration
// const instituteData = {
//   id: 1,
//   name: "Indian Institute of Technology Bombay",
//   shortName: "IIT Bombay",
//   description: "One of India's premier engineering and technology institutions, known for excellence in education and research.",
//   established: 1958,
//   location: "Mumbai, Maharashtra",
//   website: "https://www.iitb.ac.in",
//   phone: "+91 22 2572 2545",
//   email: "info@iitb.ac.in",
//   totalStudents: 11000,
//   ranking: 1,
//   stats: {
//     totalParticipants: 2500,
//     activeCoding: 1200,
//     averageSolved: 320,
//     contestsHosted: 45,
//   },
//   achievements: [
//     {
//       title: "National Coding Championship 2024",
//       position: "1st Place",
//       date: "2024",
//     },
//     {
//       title: "ACM-ICPC Asia Regional",
//       position: "2nd Place",
//       date: "2023",
//     },
//     {
//       title: "Google Hash Code",
//       position: "Top 10",
//       date: "2023",
//     },
//   ],
//   topPerformers: [
//     {
//       name: "Amit Sharma",
//       solved: 450,
//       rank: 1,
//       batch: "2024",
//     },
//     {
//       name: "Priya Patel",
//       solved: 420,
//       rank: 2,
//       batch: "2024",
//     },
//     {
//       name: "Raj Kumar",
//       solved: 380,
//       rank: 3,
//       batch: "2025",
//     },
//   ],
//   recentContests: [
//     {
//       name: "Winter Coding Sprint 2024",
//       date: "2024-02-15",
//       participants: 300,
//       avgScore: 75,
//     },
//     {
//       name: "Algorithm Challenge IV",
//       date: "2024-01-20",
//       participants: 250,
//       avgScore: 68,
//     },
//     {
//       name: "Data Structures Derby",
//       date: "2023-12-10",
//       participants: 280,
//       avgScore: 72,
//     },
//   ],
//   upcomingEvents: [
//     {
//       name: "Spring Coding Competition",
//       date: "2024-04-15",
//       type: "Contest",
//       registrationOpen: true,
//     },
//     {
//       name: "Technical Symposium",
//       date: "2024-04-20",
//       type: "Workshop",
//       registrationOpen: true,
//     },
//     {
//       name: "Mock Placement Drive",
//       date: "2024-05-01",
//       type: "Event",
//       registrationOpen: false,
//     },
//   ],
// };

export default async function InstituteProfile({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  const instituteData = await fetchInstituteByCode(code.toUpperCase());
  if (!instituteData) {
    return notFound();
  }

  return (
    <main className="min-h-screen bg-background flex flex-col">
      {/* Institute Hero */}
      <div className="relative bg-primary/5 py-12">
        <div className="absolute inset-0 bg-grid-white/10" />
        <div className="container mx-auto px-4 relative">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-2">
              <div className="w-20 h-20 rounded-full overflow-hidden bg-primary/10 flex items-center justify-center aspect-square">
                <Image
                  src={instituteData.logo || `https://api.dicebear.com/7.x/initials/svg?seed=${instituteData.code}`}
                  alt={instituteData.code!}
                  className="w-full h-full object-cover"
                  width={128}
                  height={128}
                // onError={(e) => {
                //   const target = e.target as HTMLImageElement;
                //   target.src = `https://api.dicebear.com/7.x/initials/svg?seed=${institute.shortName}`;
                // }}
                />
              </div>
              <div className=" md:col-span-10">
                <h1 className="text-3xl font-bold mb-2">{instituteData.name}</h1>
                <p className="text-muted-foreground mb-4">{instituteData.description}</p>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span>{instituteData.city}, {instituteData.country}</span>
                  </div>
                  {/* <div className="flex items-center gap-2 text-sm">
                  <GraduationCap className="h-4 w-4 text-primary" />
                  <span>Est. {instituteData.established}</span>
                </div> */}
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="h-4 w-4 text-primary" />
                    <span>{instituteData.userCount} Students</span>
                  </div>
                  {/* <div className="flex items-center gap-2 text-sm">
                  <Trophy className="h-4 w-4 text-primary" />
                  <span>Rank #{instituteData.ranking}</span>
                </div> */}
                </div>
              </div>
            </div>
            <div className="flex gap-4">
              {instituteData.website && <Button variant="outline" className="gap-2" asChild>
                <a href={instituteData.website} target="_blank" rel="noopener noreferrer">
                  <Globe className="h-4 w-4" />
                  Website
                </a>
              </Button>}
              {/* <Button className="gap-2">
                <FileCode className="h-4 w-4" />
                View Programs
              </Button> */}
            </div>
          </div>
        </div>
      </div>
      <InstituteDetailTab instituteData={instituteData} />
    </main>
  );
}