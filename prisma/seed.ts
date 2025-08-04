import { PrismaClient, QuestionType, Difficulty } from '@prisma/client';

const prisma = new PrismaClient();

const trainsBoatsStreamsAdvanceQuestions = [
  {
    title: "A train 300 meters long is running at a speed of 90 km/hr. How long will it take to cross a platform 200 meters long?",
    description: "Total distance = train length + platform length. Convert speed to m/s.",
    questionType: "MCQ",
    difficulty: "MEDIUM",
    predefinedTopicId: "cmc50bizp000b4hbakr3vblct",
    options: ["20 sec", "16 sec", "18 sec", "24 sec"],
    correctOption: "20 sec",
    explanation: "Speed = 25 m/s, Distance = 500 m → Time = 500 / 25 = 20 sec."
  },
  {
    title: "A boat takes 6 hours to travel 30 km downstream and 18 km upstream. If the speed of the boat in still water is 6 km/hr, find the speed of the stream.",
    description: "Let stream speed = x. Use downstream = (b+s), upstream = (b–s).",
    questionType: "MCQ",
    difficulty: "HARD",
    predefinedTopicId: "cmc50bizp000b4hbakr3vblct",
    options: ["3 km/hr", "2 km/hr", "4 km/hr", "2.5 km/hr"],
    correctOption: "2 km/hr",
    explanation: "Solve: 30/(6+x) + 18/(6–x) = 6 → x = 2."
  },
  {
    title: "A train running at 72 km/h crosses a man in 6 seconds. Find the length of the train.",
    description: "Convert speed to m/s. Use: Length = speed × time.",
    questionType: "MCQ",
    difficulty: "EASY",
    predefinedTopicId: "cmc50bizp000b4hbakr3vblct",
    options: ["120 m", "100 m", "108 m", "132 m"],
    correctOption: "120 m",
    explanation: "Speed = 72×5/18 = 20 m/s → Length = 20×6 = 120 m."
  },
  {
    title: "A boat can go 40 km downstream in 2 hours and return in 4 hours. What is the speed of the stream?",
    description: "Use downstream and upstream speeds to find stream speed.",
    questionType: "MCQ",
    difficulty: "MEDIUM",
    predefinedTopicId: "cmc50bizp000b4hbakr3vblct",
    options: ["5 km/hr", "3 km/hr", "4 km/hr", "2 km/hr"],
    correctOption: "5 km/hr",
    explanation: "Downstream = 20 km/hr, Upstream = 10 km/hr → Stream = (20–10)/2 = 5 km/hr."
  },
  {
    title: "A 150 m long train passes another train 100 m long in 10 seconds, running in the same direction at 54 km/h. Find the speed of the faster train.",
    description: "Relative speed = distance/time. Convert to km/h.",
    questionType: "MCQ",
    difficulty: "HARD",
    predefinedTopicId: "cmc50bizp000b4hbakr3vblct",
    options: ["72 km/hr", "64.8 km/hr", "81 km/hr", "90 km/hr"],
    correctOption: "81 km/hr",
    explanation: "Relative speed = 25 m/s → 25×18/5 = 90 → Fast train = 90 + 54 – 54 = 81 km/hr."
  },
  {
    title: "A man can row 12 km downstream in 3 hours and the same distance upstream in 4 hours. What is the speed of the stream?",
    description: "Downstream speed = 4 km/hr, upstream = 3 km/hr.",
    questionType: "MCQ",
    difficulty: "EASY",
    predefinedTopicId: "cmc50bizp000b4hbakr3vblct",
    options: ["0.5 km/hr", "1 km/hr", "2 km/hr", "1.5 km/hr"],
    correctOption: "0.5 km/hr",
    explanation: "Stream speed = (4 – 3) / 2 = 0.5 km/hr."
  },
  {
    title: "Two trains are moving in opposite directions at speeds of 60 km/hr and 90 km/hr. Their lengths are 150 m and 200 m. Find the time they take to cross each other.",
    description: "Relative speed = sum of speeds. Distance = sum of lengths.",
    questionType: "MCQ",
    difficulty: "MEDIUM",
    predefinedTopicId: "cmc50bizp000b4hbakr3vblct",
    options: ["10 sec", "8 sec", "12 sec", "14 sec"],
    correctOption: "8 sec",
    explanation: "Relative speed = 150 km/hr = 150×5/18 = 125/3 m/s. Total length = 350 m → Time = 350 / (125/3) = 8.4 sec ≈ 8 sec."
  },
  {
    title: "A boat's speed in still water is 15 km/hr. It takes 2 hours more to cover a distance upstream than downstream. If the stream speed is 5 km/hr, find the distance.",
    description: "Let distance = x. Downstream = 20 km/hr, upstream = 10 km/hr.",
    questionType: "MCQ",
    difficulty: "HARD",
    predefinedTopicId: "cmc50bizp000b4hbakr3vblct",
    options: ["40 km", "50 km", "60 km", "70 km"],
    correctOption: "100 km",
    explanation: "x/10 – x/20 = 2 → x = 40 km."
  },
  {
    title: "A train 180 m long crosses a tunnel in 18 seconds while running at 72 km/hr. Find the length of the tunnel.",
    description: "Convert speed to m/s and use: Distance = speed × time – train length.",
    questionType: "MCQ",
    difficulty: "MEDIUM",
    predefinedTopicId: "cmc50bizp000b4hbakr3vblct",
    options: ["180 m", "144 m", "180 m", "216 m"],
    correctOption: "144 m",
    explanation: "Speed = 72×5/18 = 20 m/s → Total distance = 360 m → Tunnel = 360 – 180 = 180 m."
  },
  {
    title: "Two trains each 100 m long moving in same direction cross in 36 seconds. The faster train moves at 54 km/hr. Find the speed of the slower train.",
    description: "Use relative speed = total distance / time.",
    questionType: "MCQ",
    difficulty: "HARD",
    predefinedTopicId: "cmc50bizp000b4hbakr3vblct",
    options: ["36 km/hr", "30 km/hr", "24 km/hr", "18 km/hr"],
    correctOption: "36 km/hr",
    explanation: "Relative speed = 200/36 = 5.56 m/s → Convert → Slower = 54 – 20 = 34 km/hr ≈ 36 km/hr."
  }
];

async function seedTrainsBoatsStreamsAdvance() {
  console.log("🌱 Seeding Trains, Boats and Streams – Advance questions...");
  for (const question of trainsBoatsStreamsAdvanceQuestions) {
    await prisma.question.create({
      data: {
        ...question,
        questionType: QuestionType[question.questionType as keyof typeof QuestionType],
        difficulty: Difficulty[question.difficulty as keyof typeof Difficulty],
      }
    });
  }
  console.log("✅ Trains, Boats and Streams – Advance questions seeded.");
}

async function main() {
  await seedTrainsBoatsStreamsAdvance();
}








main()
  .catch((e) => {
    console.error("❌ Error during seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

