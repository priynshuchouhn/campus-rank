import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  MapPin,
  Users,
  ChevronRight,
  Building2,
} from "lucide-react";
import Image from "next/image";
import { Institution } from "@prisma/client";
import { fetchInstitute } from "@/lib/actions/institute";

// Mock data for institutes
const mockInstitutes: Institution[] = [];

const instituteTypes = ["All", "IIT", "NIT", "IIIT", "Government", "Private"];
const sortOptions = [
  { value: "ranking", label: "Ranking" },
  { value: "name", label: "Name" },
  { value: "established", label: "Year Established" },
  { value: "students", label: "Total Students" },
  { value: "participants", label: "Coding Participants" },
  { value: "score", label: "Average Score" },
];

const InstituteCard = ({ institute }: { institute: Institution & { userCount: number } }) => {
  return (
    <div className="relative h-full">
     <div className="absolute left-0 top-0 h-full w-[7px] bg-gradient-to-b from-primary/80 to-secondary/80 rounded-l-3xl" />
      {/* <Card className="hover:shadow-lg transition-all duration-300 rounded-2xl bg-white"></Card> */}
      <Card className="hover:shadow-lg transition-all duration-300 h-full">
        <CardHeader className="pb-4">
          <div className="flex items-start justify-between">
            <div className="grid grid-cols-4 gap-2">
              <div className="w-16 h-16 rounded-full overflow-hidden bg-primary/10 flex items-center justify-center aspect-square">
                <Image
                  src={institute.logo || `https://api.dicebear.com/7.x/initials/svg?seed=${institute.code}`}
                  alt={institute.code}
                  className="w-full h-full object-cover"
                  width={128}
                  height={128}
                // onError={(e) => {
                //   const target = e.target as HTMLImageElement;
                //   target.src = `https://api.dicebear.com/7.x/initials/svg?seed=${institute.shortName}`;
                // }}
                />
              </div>
              <div className="col-span-3">
                <CardTitle className="mb-1">{institute.name}</CardTitle>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    <span>{institute.city},{institute.country}</span>
                  </div>
                  {/* <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>Est. {institute.established}</span>
                </div> */}
                </div>
              </div>
            </div>
            {/* <div className="text-right">
            <Badge className="mb-2">{institute.type}</Badge>
            <div className="flex items-center gap-1">
              <Trophy className="h-4 w-4 text-yellow-500" />
              <span className="text-sm font-medium">Rank #{institute.ranking}</span>
            </div>
          </div> */}
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* <p className="text-muted-foreground text-sm leading-relaxed">
          {institute.description}
        </p> */}

          <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
            <div className="text-center p-3 bg-muted/50 rounded-lg dark:bg-background">
              <Users className="h-5 w-5 mx-auto mb-1 text-blue-500 dark:text-accent" />
              <div className="text-lg font-bold">{institute.userCount}</div>
              <div className="text-xs text-muted-foreground">Students</div>
            </div>
            {/* <div className="text-center p-3 bg-muted/50 rounded-lg">
            <Code className="h-5 w-5 mx-auto mb-1 text-green-500" />
            <div className="text-lg font-bold">{institute.stats.codingParticipants.toLocaleString()}</div>
            <div className="text-xs text-muted-foreground">Coders</div>
          </div> */}
            {/* <div className="text-center p-3 bg-muted/50 rounded-lg">
            <Target className="h-5 w-5 mx-auto mb-1 text-purple-500" />
            <div className="text-lg font-bold">{institute.stats.averageScore}</div>
            <div className="text-xs text-muted-foreground">Avg Score</div>
          </div> */}
            {/* <div className="text-center p-3 bg-muted/50 rounded-lg">
            <Award className="h-5 w-5 mx-auto mb-1 text-yellow-500" />
            <div className="text-lg font-bold">{institute.stats.contestsWon}</div>
            <div className="text-xs text-muted-foreground">Contests Won</div>
          </div> */}
          </div>

          {/* <div>
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
        </div> */}

          <div className="flex items-center justify-between pt-2 border-t">
            <div className="flex items-center gap-4 text-sm">
              {/* <div className="flex items-center gap-1">
              <TrendingUp className="h-4 w-4 text-green-500" />
              <span>{institute.stats.placementRate}% Placement</span>
            </div> */}
            </div>
            <Link href={`/institute/${institute.code.toLowerCase()}`}>
              <Button variant="outline" size="sm" className="gap-2">
                View Details
                <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default async function InstitutePage() {
  // const [searchQuery, setSearchQuery] = useState("");
  // const [selectedType, setSelectedType] = useState("All");
  // const [sortBy, setSortBy] = useState("ranking");

  // const filteredAndSortedInstitutes = mockInstitutes
  //   .filter((institute) => {
  //     const matchesSearch =
  //       institute.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //       institute.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //       institute.shortName.toLowerCase().includes(searchQuery.toLowerCase());

  //     const matchesType = selectedType === "All" || institute.type === selectedType;

  //     return matchesSearch && matchesType;
  //   })
  //   .sort((a, b) => {
  //     switch (sortBy) {
  //       case "ranking":
  //         return a.ranking - b.ranking;
  //       case "name":
  //         return a.name.localeCompare(b.name);
  //       case "established":
  //         return b.established - a.established;
  //       case "students":
  //         return b.stats.totalStudents - a.stats.totalStudents;
  //       case "participants":
  //         return b.stats.codingParticipants - a.stats.codingParticipants;
  //       case "score":
  //         return b.stats.averageScore - a.stats.averageScore;
  //       default:
  //         return 0;
  //     }
  //   });

  // const totalStats = mockInstitutes.reduce(
  //   (acc, institute) => ({
  //     totalInstitutes: acc.totalInstitutes + 1,
  //     totalStudents: acc.totalStudents + institute.stats.totalStudents,
  //     totalCoders: acc.totalCoders + institute.stats.codingParticipants,
  //     totalContests: acc.totalContests + institute.stats.contestsWon,
  //   }),
  //   {totalInstitutes: 0, totalStudents: 0, totalCoders: 0, totalContests: 0 }
  // );
  const institute = await fetchInstitute();
  return (
    <main className="min-h-screen bg-background">
      {/* Header */}

      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-primary/10 to-secondary/30 py-12 dark:bg-background">
        <div className="absolute inset-0 bg-grid-white/10" />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full text-primary mb-6 dark:bg-accent/10 dark:text-white">
              <Building2 className="h-4 w-4" />
              <span className="text-sm font-medium">Educational Institutions</span>
            </div>
            <h1 className="text-4xl font-bold mb-4">
              Institutes on Our Platform
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              This page lists all institutes whose students are active on our platform. Explore their profiles, statistics, and more.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Overview */}
        {/* <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
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
        </div> */}

        {/* Filters and Search */}
        {/* <div className="flex flex-col md:flex-row gap-4 mb-8">
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
        </div> */}

        {/* Results Count */}
        {/* <div className="flex items-center justify-between mb-6">
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
        </div> */}

        {/* Institute Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {institute.map((institute) => (
            <InstituteCard key={institute.id} institute={institute} />
          ))}
        </div>

        {/* No Results */}
        {institute.length === 0 && (
          <div className="text-center py-12">
            <Building2 className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No institutes found</h3>
            <p className="text-muted-foreground mb-6">
              Check back later as new institutes are added.
            </p>
            {/* <Button
              onClick={() => {
                setSearchQuery("");
                setSelectedType("All");
                setSortBy("ranking");
              }}
            >
              Reset Filters
            </Button> */}
          </div>
        )}
      </div>

    </main>
  );
}