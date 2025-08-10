"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Code,
  Search,
  MapPin,
  Users,
  Trophy,
  GraduationCap,
  TrendingUp,
  Star,
  ChevronRight,
  Filter,
  SortAsc,
  Building2,
  Calendar,
  Award,
  Target,
} from "lucide-react";

// Mock data for institutes
const mockInstitutes = [
  {
    id: 1,
    name: "Indian Institute of Technology Bombay",
    shortName: "IIT Bombay",
    location: "Mumbai, Maharashtra",
    established: 1958,
    type: "IIT",
    ranking: 1,
    logo: "https://api.dicebear.com/7.x/initials/svg?seed=IIT%20Bombay",
    stats: {
      totalStudents: 11000,
      codingParticipants: 2500,
      averageScore: 320,
      contestsWon: 45,
      placementRate: 95,
    },
    achievements: [
      "National Coding Championship 2024 - 1st Place",
      "ACM-ICPC Asia Regional - 2nd Place",
      "Google Hash Code - Top 10",
    ],
    description: "Premier engineering and technology institution known for excellence in education and research.",
  },
  {
    id: 2,
    name: "Indian Institute of Technology Delhi",
    shortName: "IIT Delhi",
    location: "New Delhi, Delhi",
    established: 1961,
    type: "IIT",
    ranking: 2,
    logo: "https://api.dicebear.com/7.x/initials/svg?seed=IIT%20Delhi",
    stats: {
      totalStudents: 9500,
      codingParticipants: 2200,
      averageScore: 315,
      contestsWon: 38,
      placementRate: 94,
    },
    achievements: [
      "International Programming Contest - 1st Place",
      "Microsoft Imagine Cup - Finalist",
      "IEEE Programming Contest - Winner",
    ],
    description: "Leading technical university with strong focus on innovation and research.",
  },
  {
    id: 3,
    name: "Indian Institute of Technology Madras",
    shortName: "IIT Madras",
    location: "Chennai, Tamil Nadu",
    established: 1959,
    type: "IIT",
    ranking: 3,
    logo: "https://api.dicebear.com/7.x/initials/svg?seed=IIT%20Madras",
    stats: {
      totalStudents: 10200,
      codingParticipants: 2100,
      averageScore: 310,
      contestsWon: 42,
      placementRate: 93,
    },
    achievements: [
      "Smart India Hackathon - Winner",
      "TCS CodeVita - Top 5",
      "HackerEarth Challenge - 2nd Place",
    ],
    description: "Renowned for its academic excellence and cutting-edge research in technology.",
  },
  {
    id: 4,
    name: "Indian Institute of Technology Kanpur",
    shortName: "IIT Kanpur",
    location: "Kanpur, Uttar Pradesh",
    established: 1959,
    type: "IIT",
    ranking: 4,
    logo: "https://api.dicebear.com/7.x/initials/svg?seed=IIT%20Kanpur",
    stats: {
      totalStudents: 8800,
      codingParticipants: 1900,
      averageScore: 305,
      contestsWon: 35,
      placementRate: 92,
    },
    achievements: [
      "Programming Olympiad - Gold Medal",
      "Coding Ninjas Contest - Winner",
      "GeeksforGeeks Challenge - Top 3",
    ],
    description: "Historic institution known for pioneering computer science education in India.",
  },
  {
    id: 5,
    name: "Indian Institute of Technology Kharagpur",
    shortName: "IIT Kharagpur",
    location: "Kharagpur, West Bengal",
    established: 1951,
    type: "IIT",
    ranking: 5,
    logo: "https://api.dicebear.com/7.x/initials/svg?seed=IIT%20Kharagpur",
    stats: {
      totalStudents: 12000,
      codingParticipants: 2300,
      averageScore: 300,
      contestsWon: 40,
      placementRate: 91,
    },
    achievements: [
      "Inter-IIT Tech Meet - Overall Champion",
      "Flipkart Grid Challenge - Winner",
      "Amazon ML Challenge - Finalist",
    ],
    description: "First IIT established in India, maintaining excellence in technical education.",
  },
  {
    id: 6,
    name: "National Institute of Technology Trichy",
    shortName: "NIT Trichy",
    location: "Tiruchirappalli, Tamil Nadu",
    established: 1964,
    type: "NIT",
    ranking: 6,
    logo: "https://api.dicebear.com/7.x/initials/svg?seed=NIT%20Trichy",
    stats: {
      totalStudents: 9000,
      codingParticipants: 1800,
      averageScore: 285,
      contestsWon: 28,
      placementRate: 89,
    },
    achievements: [
      "National Programming Contest - 2nd Place",
      "IBM Hack Challenge - Winner",
      "Cognizant Coding Contest - Top 5",
    ],
    description: "Premier National Institute of Technology with strong industry connections.",
  },
];

const instituteTypes = ["All", "IIT", "NIT", "IIIT", "Government", "Private"];
const sortOptions = [
  { value: "ranking", label: "Ranking" },
  { value: "name", label: "Name" },
  { value: "established", label: "Year Established" },
  { value: "students", label: "Total Students" },
  { value: "participants", label: "Coding Participants" },
  { value: "score", label: "Average Score" },
];

const InstituteCard = ({ institute }: { institute: any }) => {
  return (
    <Card className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-primary">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-lg overflow-hidden bg-primary/10 flex items-center justify-center">
              <img
                src={institute.logo}
                alt={institute.shortName}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = `https://api.dicebear.com/7.x/initials/svg?seed=${institute.shortName}`;
                }}
              />
            </div>
            <div>
              <CardTitle className="text-xl mb-1">{institute.name}</CardTitle>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  <span>{institute.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>Est. {institute.established}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="text-right">
            <Badge className="mb-2">{institute.type}</Badge>
            <div className="flex items-center gap-1">
              <Trophy className="h-4 w-4 text-yellow-500" />
              <span className="text-sm font-medium">Rank #{institute.ranking}</span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-muted-foreground text-sm leading-relaxed">
          {institute.description}
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-3 bg-muted/50 rounded-lg">
            <Users className="h-5 w-5 mx-auto mb-1 text-blue-500" />
            <div className="text-lg font-bold">{institute.stats.totalStudents.toLocaleString()}</div>
            <div className="text-xs text-muted-foreground">Students</div>
          </div>
          <div className="text-center p-3 bg-muted/50 rounded-lg">
            <Code className="h-5 w-5 mx-auto mb-1 text-green-500" />
            <div className="text-lg font-bold">{institute.stats.codingParticipants.toLocaleString()}</div>
            <div className="text-xs text-muted-foreground">Coders</div>
          </div>
          <div className="text-center p-3 bg-muted/50 rounded-lg">
            <Target className="h-5 w-5 mx-auto mb-1 text-purple-500" />
            <div className="text-lg font-bold">{institute.stats.averageScore}</div>
            <div className="text-xs text-muted-foreground">Avg Score</div>
          </div>
          <div className="text-center p-3 bg-muted/50 rounded-lg">
            <Award className="h-5 w-5 mx-auto mb-1 text-yellow-500" />
            <div className="text-lg font-bold">{institute.stats.contestsWon}</div>
            <div className="text-xs text-muted-foreground">Contests Won</div>
          </div>
        </div>

        <div>
          <h4 className="font-medium mb-2 flex items-center gap-2">
            <Star className="h-4 w-4 text-yellow-500" />
            Recent Achievements
          </h4>
          <div className="space-y-1">
            {institute.achievements.slice(0, 2).map((achievement: string, index: number) => (
              <div key={index} className="text-sm text-muted-foreground flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                {achievement}
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t">
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1">
              <TrendingUp className="h-4 w-4 text-green-500" />
              <span>{institute.stats.placementRate}% Placement</span>
            </div>
          </div>
          <Link href={`/institute/${institute.id}`}>
            <Button variant="outline" size="sm" className="gap-2">
              View Details
              <ChevronRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default function InstitutePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("All");
  const [sortBy, setSortBy] = useState("ranking");

  const filteredAndSortedInstitutes = mockInstitutes
    .filter((institute) => {
      const matchesSearch = 
        institute.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        institute.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        institute.shortName.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesType = selectedType === "All" || institute.type === selectedType;
      
      return matchesSearch && matchesType;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "ranking":
          return a.ranking - b.ranking;
        case "name":
          return a.name.localeCompare(b.name);
        case "established":
          return b.established - a.established;
        case "students":
          return b.stats.totalStudents - a.stats.totalStudents;
        case "participants":
          return b.stats.codingParticipants - a.stats.codingParticipants;
        case "score":
          return b.stats.averageScore - a.stats.averageScore;
        default:
          return 0;
      }
    });

  const totalStats = mockInstitutes.reduce(
    (acc, institute) => ({
      totalInstitutes: acc.totalInstitutes + 1,
      totalStudents: acc.totalStudents + institute.stats.totalStudents,
      totalCoders: acc.totalCoders + institute.stats.codingParticipants,
      totalContests: acc.totalContests + institute.stats.contestsWon,
    }),
    { totalInstitutes: 0, totalStudents: 0, totalCoders: 0, totalContests: 0 }
  );

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}

      {/* Hero Section */}
      <div className="relative bg-primary/5 py-12">
        <div className="absolute inset-0 bg-grid-white/10" />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full text-primary mb-6">
              <Building2 className="h-4 w-4" />
              <span className="text-sm font-medium">Educational Institutions</span>
            </div>
            <h1 className="text-4xl font-bold mb-4">
              Explore Top Coding Institutes
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Discover leading educational institutions and their coding performance, 
              achievements, and student statistics across India.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Institutes</p>
                  <p className="text-2xl font-bold">{totalStats.totalInstitutes}</p>
                </div>
                <Building2 className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Students</p>
                  <p className="text-2xl font-bold">{totalStats.totalStudents.toLocaleString()}</p>
                </div>
                <Users className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active Coders</p>
                  <p className="text-2xl font-bold">{totalStats.totalCoders.toLocaleString()}</p>
                </div>
                <Code className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Contests Won</p>
                  <p className="text-2xl font-bold">{totalStats.totalContests}</p>
                </div>
                <Trophy className="h-8 w-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search institutes by name, location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-4">
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="w-[140px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {instituteTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[160px]">
                <SortAsc className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {sortOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-muted-foreground">
            Showing {filteredAndSortedInstitutes.length} of {mockInstitutes.length} institutes
          </p>
          {searchQuery && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSearchQuery("")}
            >
              Clear Search
            </Button>
          )}
        </div>

        {/* Institute Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredAndSortedInstitutes.map((institute) => (
            <InstituteCard key={institute.id} institute={institute} />
          ))}
        </div>

        {/* No Results */}
        {filteredAndSortedInstitutes.length === 0 && (
          <div className="text-center py-12">
            <Building2 className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No institutes found</h3>
            <p className="text-muted-foreground mb-6">
              Try adjusting your search criteria or filters.
            </p>
            <Button
              onClick={() => {
                setSearchQuery("");
                setSelectedType("All");
                setSortBy("ranking");
              }}
            >
              Reset Filters
            </Button>
          </div>
        )}
      </div>

    </main>
  );
}