import { BlogPost, MenuSection } from "./interfaces";
import { Home, BookOpen, Code, User, Settings, LogOut, Notebook, Target, Info, Shield, FileText, HelpCircle, Trophy, FileStack } from 'lucide-react';


export const categories = [
    'DSA',
    'Placements',
    'LeetCode Tips',
    'Success Stories',
    'Interview Prep',
];

export const authMenuItems: MenuSection[] = [
  {
    section: "Dashboard",
    items: [
      { href: "/dashboard", icon: Home, title: "Home" },
      { href: "/leaderboard", icon: Trophy, title: "Leaderboard" },
    ]
  },
  {
    section: "Learning",
    items: [
      { href: "/roadmap", icon: BookOpen, title: "Roadmap", exact: true },
      { href: "/roadmap/topics", icon: Notebook, title: "Topics" },
      { href: "/flashcards", icon: FileStack, title: "Flashcards", badge: "New" },
      { href: "/practice", icon: Code, title: "Practice", badge: "New" },
      { href: "/goals", icon: Target, title: "Weekly Goals" },
    ]
  },
  {
    section: "Account",
    items: [
      { href: "/profile", icon: User, title: "Profile" },
      { href: "/settings", icon: Settings, title: "Settings" },
      { href: "/reports", icon: HelpCircle, title: "Reports" },
    ]
  }
];

export const guestMenuItems:MenuSection[] = [
  {
    section: "Explore",
    items: [
      { href: "/leaderboard", icon: Trophy, title: "Leaderboard" },
    ]
  },
  {
    section: "Information",
    items: [
      { href: "/about-us", icon: Info, title: "About Us" },
      { href: "/privacy-policy", icon: Shield, title: "Privacy Policy" },
      { href: "/terms-of-service", icon: FileText, title: "Terms of Service" },
    ]
  },
  {
    section: "Get Started",
    items: [
      { href: "/dashboard", icon: LogOut, title: "Login" },
    ]
  }
];

export const sampleQuestions = [
  {
    id: 1,
    title: "Two Sum",
    slug: 'two-sum',
    difficulty: "Easy" as const,
    tags: ["Array", "Hash Table"],
    description: `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.`,
    constraints: [
      "2 ≤ nums.length ≤ 10⁴",
      "-10⁹ ≤ nums[i] ≤ 10⁹", 
      "-10⁹ ≤ target ≤ 10⁹",
      "Only one valid answer exists."
    ],
    examples: [
      { input: "nums = [2,7,11,15], target = 9", output: "[0,1]", explanation: "Because nums[0] + nums[1] == 9, we return [0, 1]." },
      { input: "nums = [3,2,4], target = 6", output: "[1,2]", explanation: "Because nums[1] + nums[2] == 6, we return [1, 2]." },
      { input: "nums = [3,3], target = 6", output: "[0,1]", explanation: "" }
    ],
    hints: [
      "A really brute force way would be to search for all possible pairs of numbers but that would be too slow. Again, it's best to try out brute force solutions for just for completeness. It is from these brute force solutions that you can come up with optimizations.",
      "So, if we fix one of the numbers, say x, we have to scan the entire array to find the next number y which is value - x where value is the input parameter. Can we change our array somehow so that this search becomes faster?",
      "The second train of thought is, without changing the array, can we use additional space somehow? Like maybe a hash map to speed up the search?"
    ],
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    sampleCodes: [
      { id: 'sc1', questionId: '1', language: 'JAVASCRIPT', code: `var twoSum = function(nums, target) { };`, createdAt: new Date(), updatedAt: new Date() },
      { id: 'sc2', questionId: '1', language: 'PYTHON', code: `class Solution:\n    def twoSum(self, nums: List[int], target: int) -> List[int]:\n        `, createdAt: new Date(), updatedAt: new Date() },
      { id: 'sc3', questionId: '1', language: 'JAVA', code: `class Solution {\n    public int[] twoSum(int[] nums, int target) { }\n}`, createdAt: new Date(), updatedAt: new Date() },
      { id: 'sc4', questionId: '1', language: 'CPP', code: `class Solution {\npublic:\n    vector<int> twoSum(vector<int>& nums, int target) { }\n};`, createdAt: new Date(), updatedAt: new Date() }
    ],
    testCases: [
      { input: "nums = [2,7,11,15], target = 9", expectedOutput: "[0,1]" },
      { input: "nums = [3,2,4], target = 6", expectedOutput: "[1,2]" },
      { input: "nums = [3,3], target = 6", expectedOutput: "[0,1]" }
    ]
  },
  {
    id: 2,
    title: "Reverse Linked List",
    slug: "reverse-linked-list",
    difficulty: "Medium" as const,
    tags: ["Linked List"],
    description: `Given the head of a singly linked list, reverse the list, and return the reversed list.`,
    constraints: [
      "The number of nodes in the list is the range [0, 5000].",
      "-5000 ≤ Node.val ≤ 5000"
    ],
    examples: [
      { input: "head = [1,2,3,4,5]", output: "[5,4,3,2,1]", explanation: "Reversing the linked list gives [5,4,3,2,1]." },
      { input: "head = [1,2]", output: "[2,1]", explanation: "" }
    ],
    hints: [
      "You can iterate through the linked list and reverse the pointers one by one.",
      "Consider using a previous, current, and next pointer while traversing."
    ],
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    sampleCodes: [
      { id: 'sc5', questionId: '2', language: 'JAVASCRIPT', code: `var reverseList = function(head) { let prev = null, curr = head; while (curr) { let nextTemp = curr.next; curr.next = prev; prev = curr; curr = nextTemp; } return prev; };`, createdAt: new Date(), updatedAt: new Date() },
      { id: 'sc6', questionId: '2', language: 'PYTHON', code: `class Solution:\n    def reverseList(self, head: Optional[ListNode]) -> Optional[ListNode]:\n        prev, curr = None, head\n        while curr:\n            nxt = curr.next\n            curr.next = prev\n            prev = curr\n            curr = nxt\n        return prev`, createdAt: new Date(), updatedAt: new Date() },
      { id: 'sc7', questionId: '2', language: 'JAVA', code: `class Solution {\n    public ListNode reverseList(ListNode head) {\n        ListNode prev = null, curr = head;\n        while (curr != null) {\n            ListNode nextTemp = curr.next;\n            curr.next = prev;\n            prev = curr;\n            curr = nextTemp;\n        }\n        return prev;\n    }\n}`, createdAt: new Date(), updatedAt: new Date() },
      { id: 'sc8', questionId: '2', language: 'CPP', code: `class Solution {\npublic:\n    ListNode* reverseList(ListNode* head) {\n        ListNode* prev = nullptr;\n        ListNode* curr = head;\n        while (curr) {\n            ListNode* nextTemp = curr->next;\n            curr->next = prev;\n            prev = curr;\n            curr = nextTemp;\n        }\n        return prev;\n    }\n};`, createdAt: new Date(), updatedAt: new Date() }
    ],
    testCases: [
      { input: "head = [1,2,3,4,5]", expectedOutput: "[5,4,3,2,1]" },
      { input: "head = [1,2]", expectedOutput: "[2,1]" }
    ]
  },
  {
    id: 3,
    title: "Valid Parentheses",
    slug: 'valid-parentheses',
    difficulty: "Easy" as const,
    tags: ["Stack", "String"],
    description: `Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid. An input string is valid if: 
1. Open brackets are closed by the same type of brackets. 
2. Open brackets are closed in the correct order.`,
    constraints: [
      "1 ≤ s.length ≤ 10⁴",
      "s consists of parentheses only '()[]{}'."
    ],
    examples: [
      { input: "s = '()'", output: "true", explanation: "" },
      { input: "s = '()[]{}'", output: "true", explanation: "" },
      { input: "s = '(]'", output: "false", explanation: "" }
    ],
    hints: [
      "Use a stack to keep track of opening brackets.",
      "When encountering a closing bracket, check if it matches the last opening bracket."
    ],
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    sampleCodes: [
      { id: 'sc9', questionId: '3', language: 'JAVASCRIPT', code: `var isValid = function(s) { const stack = []; const map = {')':'(', '}':'{', ']':'['}; for (let c of s) { if (map[c]) { if (stack.pop() !== map[c]) return false; } else stack.push(c); } return stack.length === 0; };`, createdAt: new Date(), updatedAt: new Date() },
      { id: 'sc10', questionId: '3', language: 'PYTHON', code: `class Solution:\n    def isValid(self, s: str) -> bool:\n        stack = []\n        mapping = {')':'(', '}':'{', ']':'['}\n        for char in s:\n            if char in mapping:\n                top = stack.pop() if stack else '#'\n                if mapping[char] != top:\n                    return False\n            else:\n                stack.append(char)\n        return not stack`, createdAt: new Date(), updatedAt: new Date() },
      { id: 'sc11', questionId: '3', language: 'JAVA', code: `class Solution {\n    public boolean isValid(String s) {\n        Stack<Character> stack = new Stack<>();\n        Map<Character, Character> map = Map.of(')','(', '}','{', ']','[');\n        for (char c : s.toCharArray()) {\n            if (map.containsKey(c)) {\n                if (stack.isEmpty() || stack.pop() != map.get(c)) return false;\n            } else stack.push(c);\n        }\n        return stack.isEmpty();\n    }\n}`, createdAt: new Date(), updatedAt: new Date() },
      { id: 'sc12', questionId: '3', language: 'CPP', code: `class Solution {\npublic:\n    bool isValid(string s) {\n        stack<char> st;\n        unordered_map<char,char> mp = {{')','('},{'}','{'},{']','['}};\n        for (char c : s) {\n            if (mp.count(c)) {\n                if (st.empty() || st.top() != mp[c]) return false;\n                st.pop();\n            } else st.push(c);\n        }\n        return st.empty();\n    }\n};`, createdAt: new Date(), updatedAt: new Date() }
    ],
    testCases: [
      { input: "s = '()'", expectedOutput: "true" },
      { input: "s = '()[]{}'", expectedOutput: "true" },
      { input: "s = '(]'", expectedOutput: "false" }
    ]
  },
  {
    id: 4,
    title: "Merge Intervals",
    slug: 'merge-intervals',
    difficulty: "Medium" as const,
    tags: ["Array", "Sorting"],
    description: `Given an array of intervals where intervals[i] = [start_i, end_i], merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.`,
    constraints: [
      "1 ≤ intervals.length ≤ 10⁴",
      "intervals[i].length == 2",
      "0 ≤ start_i ≤ end_i ≤ 10⁴"
    ],
    examples: [
      { input: "intervals = [[1,3],[2,6],[8,10],[15,18]]", output: "[[1,6],[8,10],[15,18]]", explanation: "" },
      { input: "intervals = [[1,4],[4,5]]", output: "[[1,5]]", explanation: "" }
    ],
    hints: [
      "Sort the intervals based on the start time.",
      "Compare the current interval with the last interval in the merged list to decide if merge is needed."
    ],
    timeComplexity: "O(n log n)",
    spaceComplexity: "O(n)",
    sampleCodes: [
      { id: 'sc13', questionId: '4', language: 'JAVASCRIPT', code: `var merge = function(intervals) { if (intervals.length === 0) return []; intervals.sort((a,b) => a[0] - b[0]); const merged = [intervals[0]]; for (let i = 1; i < intervals.length; i++) { if (merged[merged.length-1][1] >= intervals[i][0]) { merged[merged.length-1][1] = Math.max(merged[merged.length-1][1], intervals[i][1]); } else merged.push(intervals[i]); } return merged; };`, createdAt: new Date(), updatedAt: new Date() },
      { id: 'sc14', questionId: '4', language: 'PYTHON', code: `class Solution:\n    def merge(self, intervals: List[List[int]]) -> List[List[int]]:\n        intervals.sort(key=lambda x: x[0])\n        merged = []\n        for interval in intervals:\n            if not merged or merged[-1][1] < interval[0]:\n                merged.append(interval)\n            else:\n                merged[-1][1] = max(merged[-1][1], interval[1])\n        return merged`, createdAt: new Date(), updatedAt: new Date() },
      { id: 'sc15', questionId: '4', language: 'JAVA', code: `class Solution {\n    public int[][] merge(int[][] intervals) {\n        Arrays.sort(intervals, (a,b) -> Integer.compare(a[0], b[0]));\n        List<int[]> merged = new ArrayList<>();\n        for (int[] interval : intervals) {\n            if (merged.isEmpty() || merged.get(merged.size()-1)[1] < interval[0])\n                merged.add(interval);\n            else\n                merged.get(merged.size()-1)[1] = Math.max(merged.get(merged.size()-1)[1], interval[1]);\n        }\n        return merged.toArray(new int[merged.size()][]);\n    }\n}`, createdAt: new Date(), updatedAt: new Date() },
      { id: 'sc16', questionId: '4', language: 'CPP', code: `class Solution {\npublic:\n    vector<vector<int>> merge(vector<vector<int>>& intervals) {\n        if (intervals.empty()) return {};\n        sort(intervals.begin(), intervals.end());\n        vector<vector<int>> merged;\n        merged.push_back(intervals[0]);\n        for (auto &interval : intervals) {\n            if (merged.back()[1] >= interval[0])\n                merged.back()[1] = max(merged.back()[1], interval[1]);\n            else\n                merged.push_back(interval);\n        }\n        return merged;\n    }\n};`, createdAt: new Date(), updatedAt: new Date() }
    ],
    testCases: [
      { input: "intervals = [[1,3],[2,6],[8,10],[15,18]]", expectedOutput: "[[1,6],[8,10],[15,18]]" },
      { input: "intervals = [[1,4],[4,5]]", expectedOutput: "[[1,5]]" }
    ]
  },
  {
    id: 5,
    title: "Climbing Stairs",
    slug: 'climbing-stairs',
    difficulty: "Easy" as const,
    tags: ["Dynamic Programming"],
    description: `You are climbing a staircase. It takes n steps to reach the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?`,
    constraints: ["1 ≤ n ≤ 45"],
    examples: [
      { input: "n = 2", output: "2", explanation: "1 step + 1 step, 2 steps" },
      { input: "n = 3", output: "3", explanation: "1+1+1, 1+2, 2+1" }
    ],
    hints: [
      "This is a classic DP problem. You can use recursion with memoization or iterative DP.",
      "Consider that the number of ways to reach step i is ways(i-1) + ways(i-2)."
    ],
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    sampleCodes: [
      { id: 'sc17', questionId: '5', language: 'JAVASCRIPT', code: `var climbStairs = function(n) { const dp = Array(n+1).fill(0); dp[0] = 1; dp[1] = 1; for (let i = 2; i <= n; i++) dp[i] = dp[i-1] + dp[i-2]; return dp[n]; };`, createdAt: new Date(), updatedAt: new Date() },
      { id: 'sc18', questionId: '5', language: 'PYTHON', code: `class Solution:\n    def climbStairs(self, n: int) -> int:\n        dp = [0]*(n+1)\n        dp[0] = dp[1] = 1\n        for i in range(2, n+1):\n            dp[i] = dp[i-1] + dp[i-2]\n        return dp[n]`, createdAt: new Date(), updatedAt: new Date() },
      { id: 'sc19', questionId: '5', language: 'JAVA', code: `class Solution {\n    public int climbStairs(int n) {\n        int[] dp = new int[n+1];\n        dp[0] = dp[1] = 1;\n        for (int i = 2; i <= n; i++) dp[i] = dp[i-1] + dp[i-2];\n        return dp[n];\n    }\n}`, createdAt: new Date(), updatedAt: new Date() },
      { id: 'sc20', questionId: '5', language: 'CPP', code: `class Solution {\npublic:\n    int climbStairs(int n) {\n        vector<int> dp(n+1);\n        dp[0] = dp[1] = 1;\n        for (int i = 2; i <= n; i++) dp[i] = dp[i-1] + dp[i-2];\n        return dp[n];\n    }\n};`, createdAt: new Date(), updatedAt: new Date() }
    ],
    testCases: [
      { input: "n = 2", expectedOutput: "2" },
      { input: "n = 3", expectedOutput: "3" }
    ]
  }
];

