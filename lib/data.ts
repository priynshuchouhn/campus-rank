import { BlogPost } from "./interfaces";

export const categories = [
    'DSA',
    'Placements',
    'LeetCode Tips',
    'Success Stories',
    'Interview Prep',
];

export const blogPosts: BlogPost[] = [
    {
        id: '1',
        title: 'Mastering Binary Trees: A Complete Guide',
        description: 'Learn everything about Binary Trees, from basic traversals to advanced algorithms. Perfect for technical interviews and competitive programming.',
        author: {
            name: 'Priya Sharma',
            image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=60'
        },
        publishedAt: '2024-03-15T10:00:00Z',
        createdAt: '2024-03-10T08:30:00Z',
        category: 'DSA',
        featuredImage: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&auto=format&fit=crop&q=60',
        tags: ['DSA', 'Binary Trees', 'Algorithms', 'Interview Prep'],
        content: `
        Binary trees are fundamental data structures that form the backbone of many complex algorithms and systems. In this comprehensive guide, we'll explore everything from basic concepts to advanced implementations.
  
        ## Understanding Binary Trees
  
        A binary tree is a hierarchical data structure where each node has at most two children, referred to as left and right child nodes. The topmost node is called the root, and nodes with no children are called leaves.
  
        ### Key Concepts:
        1. Tree Traversals
           - In-order traversal
           - Pre-order traversal
           - Post-order traversal
           - Level-order traversal
  
        2. Types of Binary Trees
           - Complete Binary Tree
           - Perfect Binary Tree
           - Full Binary Tree
           - Balanced Binary Tree
  
        ## Common Interview Questions
  
        Here are some frequently asked binary tree questions in technical interviews:
        1. Finding the height of a binary tree
        2. Checking if a binary tree is balanced
        3. Converting a binary tree to its mirror image
        4. Finding the lowest common ancestor of two nodes
  
        ## Advanced Topics
  
        Once you've mastered the basics, dive into these advanced concepts:
        - Red-Black Trees
        - AVL Trees
        - B-Trees and B+ Trees
        - Segment Trees
  
        Remember to practice these concepts regularly and implement them from scratch to build a strong understanding.
      `
    },
    {
        id: '2',
        title: 'How I Cracked Google SDE Interview',
        description: 'A detailed breakdown of my preparation strategy, interview experience, and tips for aspiring candidates.',
        author: {
            name: 'Rahul Kumar',
            image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=60'
        },
        publishedAt: '2024-03-12T14:30:00Z',
        createdAt: '2024-03-08T11:45:00Z',
        category: 'Success Stories',
        featuredImage: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?w=800&auto=format&fit=crop&q=60',
        tags: ['Success Stories', 'Google', 'Interview', 'SDE'],
        content: `
        After months of preparation and four intense interview rounds, I finally received the offer letter from Google. Here's my complete journey and the strategies that worked for me.
  
        ## Preparation Timeline
  
        I started my preparation 6 months before the interviews. Here's how I structured my study plan:
  
        ### Months 1-2: Data Structures & Algorithms
        - Completed all LeetCode top 100 liked questions
        - Focused on array and string manipulation
        - Practiced tree and graph problems extensively
  
        ### Months 3-4: System Design
        - Studied distributed systems concepts
        - Learned about scalability and performance
        - Practiced designing real-world applications
  
        ### Months 5-6: Mock Interviews
        - Conducted peer mock interviews
        - Practiced explaining solutions clearly
        - Worked on communication skills
  
        ## Interview Experience
  
        The interview process consisted of:
        1. Online Assessment
        2. Phone Screen
        3. Virtual Onsite (4 rounds)
           - 2 DSA rounds
           - 1 System Design
           - 1 Behavioral
  
        ## Key Tips
  
        1. Focus on problem-solving approach rather than memorizing solutions
        2. Practice writing clean, efficient code
        3. Learn to communicate your thoughts clearly
        4. Stay calm and composed during interviews
  
        Remember, consistency is key. Keep practicing and don't get discouraged by setbacks.
      `
    },
    {
        id: '3',
        title: 'Top LeetCode Patterns for Dynamic Programming',
        description: 'Discover the most common patterns in Dynamic Programming questions and how to solve them effectively.',
        author: {
            name: 'Amit Patel',
            image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=60'
        },
        publishedAt: '2024-03-10T09:15:00Z',
        createdAt: '2024-03-05T16:20:00Z',
        category: 'LeetCode Tips',
        featuredImage: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=800&auto=format&fit=crop&q=60',
        tags: ['LeetCode', 'Dynamic Programming', 'Algorithms', 'Patterns'],
        content: `
        Dynamic Programming (DP) is one of the most challenging topics in coding interviews. This guide breaks down the most common DP patterns to help you tackle these problems effectively.
  
        ## 1. 0/1 Knapsack Pattern
  
        Problems that follow this pattern:
        - Subset Sum
        - Equal Subset Sum Partition
        - Minimum Subset Sum Difference
  
        ## 2. Unbounded Knapsack Pattern
  
        Common problems:
        - Coin Change
        - Rod Cutting
        - Maximum Ribbon Cut
  
        ## 3. Fibonacci Pattern
  
        Problems based on Fibonacci sequence:
        - Climbing Stairs
        - House Thief
        - Minimum Jumps to Reach End
  
        ## 4. Longest Common Subsequence (LCS)
  
        Variations include:
        - Longest Common Substring
        - Minimum Deletions to Make Sequence Sorted
        - Longest Increasing Subsequence
  
        ## Practice Tips
  
        1. Start with simple problems
        2. Identify the pattern
        3. Practice similar problems
        4. Focus on optimization
  
        Remember: Understanding patterns is more important than memorizing solutions.
      `
    },
    {
        id: '4',
        title: 'Resume Building Tips for Tech Roles',
        description: 'Learn how to create a standout resume that highlights your technical skills and projects effectively.',
        author: {
            name: 'Neha Singh',
            image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&auto=format&fit=crop&q=60'
        },
        publishedAt: '2024-03-08T13:45:00Z',
        createdAt: '2024-03-03T10:30:00Z',
        category: 'Placements',
        featuredImage: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&auto=format&fit=crop&q=60',
        tags: ['Resume', 'Placements', 'Career', 'Job Search'],
        content: `
        Your resume is often the first impression you make on potential employers. Here's how to make it stand out for technical roles.
  
        ## Key Sections
  
        1. Technical Skills
           - Programming Languages
           - Frameworks & Libraries
           - Tools & Technologies
           - Soft Skills
  
        2. Projects
           - Personal Projects
           - Academic Projects
           - Open Source Contributions
  
        3. Experience
           - Internships
           - Part-time Work
           - Freelance Projects
  
        ## Formatting Tips
  
        1. Keep it concise (1-2 pages)
        2. Use bullet points
        3. Quantify achievements
        4. Highlight relevant skills
  
        ## Common Mistakes to Avoid
  
        1. Generic objectives
        2. Outdated information
        3. Poor formatting
        4. Spelling errors
  
        Remember to tailor your resume for each role you apply to!
      `
    },
    {
        id: '5',
        title: 'System Design Interview Preparation',
        description: 'A comprehensive guide to preparing for system design interviews at top tech companies.',
        author: {
            name: 'Vikram Reddy',
            image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=60'
        },
        publishedAt: '2024-03-05T11:20:00Z',
        createdAt: '2024-02-28T09:15:00Z',
        category: 'Interview Prep',
        featuredImage: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&auto=format&fit=crop&q=60',
        tags: ['System Design', 'Interview Prep', 'Architecture', 'Scalability'],
        content: `
        System design interviews test your ability to design large-scale distributed systems. Here's how to prepare effectively.
  
        ## Key Concepts
  
        1. Scalability
           - Horizontal vs Vertical Scaling
           - Load Balancing
           - Database Sharding
  
        2. Reliability
           - Fault Tolerance
           - Redundancy
           - Disaster Recovery
  
        3. Performance
           - Caching
           - CDN
           - Database Optimization
  
        ## Common Questions
  
        1. Design URL Shortener
        2. Design Twitter
        3. Design WhatsApp
        4. Design Netflix
  
        ## Interview Framework
  
        1. Requirements Clarification
        2. System Interface Definition
        3. Back-of-the-envelope Estimation
        4. Data Model Design
        5. High-level Design
        6. Detailed Design
        7. Bottlenecks & Solutions
  
        Practice these concepts regularly to build confidence!
      `
    },
    {
        id: '6',
        title: 'From Campus to Microsoft: My Journey',
        description: 'How I prepared for placements and landed my dream role at Microsoft straight out of college.',
        author: {
            name: 'Ananya Das',
            image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=60'
        },
        publishedAt: '2024-03-03T15:30:00Z',
        createdAt: '2024-02-25T14:20:00Z',
        category: 'Success Stories',
        featuredImage: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&auto=format&fit=crop&q=60',
        tags: ['Success Stories', 'Microsoft', 'Placements', 'Campus'],
        content: `
        Landing a role at Microsoft has been a dream come true. Here's my complete journey from campus preparation to final selection.
  
        ## Preparation Strategy
  
        1. Data Structures & Algorithms
           - Daily LeetCode practice
           - Implementation focus
           - Time complexity analysis
  
        2. Projects
           - Full-stack web application
           - Mobile app development
           - Open source contributions
  
        3. Interview Preparation
           - Mock interviews
           - HR questions
           - Technical concepts
  
        ## Interview Process
  
        1. Online Assessment
        2. Technical Rounds
        3. HR Interview
  
        ## Key Learnings
  
        1. Start preparation early
        2. Focus on fundamentals
        3. Practice regularly
        4. Stay motivated
  
        Remember, consistency is the key to success!
      `
    },
    {
        id: '7',
        title: 'Graph Algorithms Made Simple',
        description: 'A beginner-friendly guide to understanding and implementing common graph algorithms.',
        author: {
            name: 'Rohan Gupta',
            image: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=400&auto=format&fit=crop&q=60'
        },
        publishedAt: '2024-03-01T10:45:00Z',
        createdAt: '2024-02-22T13:10:00Z',
        category: 'DSA',
        featuredImage: 'https://images.unsplash.com/photo-1580894894513-541e068a3e2b?w=800&auto=format&fit=crop&q=60',
        tags: ['DSA', 'Graphs', 'Algorithms', 'Data Structures'],
        content: `
        Graphs are versatile data structures that can model various real-world problems. Let's understand the key concepts and algorithms.
  
        ## Basic Concepts
  
        1. Graph Representation
           - Adjacency Matrix
           - Adjacency List
           - Edge List
  
        2. Graph Types
           - Directed vs Undirected
           - Weighted vs Unweighted
           - Connected vs Disconnected
  
        ## Important Algorithms
  
        1. Traversal
           - Breadth-First Search (BFS)
           - Depth-First Search (DFS)
  
        2. Shortest Path
           - Dijkstra's Algorithm
           - Bellman-Ford Algorithm
           - Floyd-Warshall Algorithm
  
        3. Minimum Spanning Tree
           - Prim's Algorithm
           - Kruskal's Algorithm
  
        Practice these algorithms to build a strong foundation!
      `
    },
    {
        id: '8',
        title: 'Weekly LeetCode Contest Strategy',
        description: 'How to make the most of LeetCode weekly contests to improve your problem-solving skills.',
        author: {
            name: 'Sanjay Kumar',
            image: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=400&auto=format&fit=crop&q=60'
        },
        publishedAt: '2024-02-28T09:30:00Z',
        createdAt: '2024-02-20T16:45:00Z',
        category: 'LeetCode Tips',
        featuredImage: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&auto=format&fit=crop&q=60',
        tags: ['LeetCode', 'Contests', 'Competitive Programming', 'Problem Solving'],
        content: `
        LeetCode contests are great for improving your problem-solving skills under time pressure. Here's how to make the most of them.
  
        ## Contest Format
  
        - Duration: 1.5 hours
        - 4 problems of increasing difficulty
        - Points based on solving time and attempts
  
        ## Preparation Strategy
  
        1. Before Contest
           - Practice similar problems
           - Review common patterns
           - Prepare templates
  
        2. During Contest
           - Read all problems first
           - Start with easiest
           - Manage time effectively
  
        3. After Contest
           - Review solutions
           - Learn from mistakes
           - Practice unsolved problems
  
        Keep participating regularly to improve your skills!
      `
    },
];