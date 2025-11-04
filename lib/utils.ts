import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function timeAgo(date: Date | string): string {
  const now = new Date();
  const past = new Date(date);
  const diffInSeconds = Math.floor((now.getTime() - past.getTime()) / 1000);

  const intervals = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60,
    second: 1
  };

  for (const [unit, seconds] of Object.entries(intervals)) {
    const diff = Math.floor(diffInSeconds / seconds);
    if (diff >= 1) {
      if (unit === 'day') {
        return `${diff} day${diff === 1 ? '' : 's'} ago`;
      }
      if (unit === 'week') {
        return `${diff} week${diff === 1 ? '' : 's'} ago`;
      }
      return `${diff} ${unit}${diff === 1 ? '' : 's'} ago`;
    }
  }

  return 'just now';
}

export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '');            // Trim - from end of text
}

export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function unslugify(slug: any): string {
  return slug
    .replace(/-/g, ' ')                       // Replace - with space
    .replace(/\b\w/g, (char: any) => char.toUpperCase()); // Capitalize first letter of each word
}

export function getTimeLeft(startedAt: Date, timeAllotted: number): number {
  const startTime = new Date(startedAt).getTime(); // in ms
  const currentTime = Date.now(); // in ms

  const timeLeft = (startTime + timeAllotted) - currentTime;

  return Math.max(0, Math.floor(timeLeft)); // return time left in seconds
}

type TestCase = { input: any; expectedOutput: any };


// export const codeTemplates: Record<
//   string,
//   (userCode: string, functionName: string, testCase: TestCase) => string
// > = {
//   java: (userCode, functionName, testCase) => {
//     const parseJavaInput = (input: string) => {
//       let processed = input.replace(/\w+\s*=\s*/g, '');

//       // Handle LinkedList: [1,2,3,4,5] -> createLinkedList(new int[]{1,2,3,4,5})
//       if (processed.includes('LinkedList') || functionName.toLowerCase().includes('list')) {
//         processed = processed.replace(/\[(-?\d+(?:\s*,\s*-?\d+)*)\]/g, 'createLinkedList(new int[]{$1})');
//       }
//       // Handle TreeNode: [3,9,20,null,null,15,7] -> createBinaryTree(new Integer[]{3,9,20,null,null,15,7})
//       else if (processed.includes('TreeNode') || functionName.toLowerCase().includes('tree')) {
//         processed = processed.replace(/\[([^\]]*)\]/g, (match, content) => {
//           const elements = content.split(',').map((s:any) => s.trim() === 'null' ? 'null' : s.trim());
//           return `createBinaryTree(new Integer[]{${elements.join(',')}})`;
//         });
//       }
//       // Regular arrays
//       else {
//         processed = processed
//           // Integer arrays: [1,2,3] -> new int[]{1,2,3}
//           .replace(/\[(-?\d+(?:\s*,\s*-?\d+)*)\]/g, 'new int[]{$1}')
//           // String arrays: ["abc","def"] -> new String[]{"abc","def"}
//           .replace(/\[("(?:[^"\\]|\\.)*"(?:\s*,\s*"(?:[^"\\]|\\.)*")*)\]/g, 'new String[]{$1}')
//           // Character arrays: ['a','b','c'] -> new char[]{'a','b','c'}
//           .replace(/\[('.'(?:\s*,\s*'.')*)\]/g, 'new char[]{$1}')
//           // Boolean arrays: [true,false] -> new boolean[]{true,false}
//           .replace(/\[((?:true|false)(?:\s*,\s*(?:true|false))*)\]/g, 'new boolean[]{$1}')
//           // Double arrays: [1.5,2.7] -> new double[]{1.5,2.7}
//           .replace(/\[(-?\d+\.\d+(?:\s*,\s*-?\d+\.\d+)*)\]/g, 'new double[]{$1}')
//           // 2D arrays: [[1,2],[3,4]] -> new int[][]{{1,2},{3,4}}
//           .replace(/\[\[(-?\d+(?:\s*,\s*-?\d+)*)\](?:\s*,\s*\[(-?\d+(?:\s*,\s*-?\d+)*)\])*\]/g, (match) => {
//             const arrays = match.match(/\[(-?\d+(?:\s*,\s*-?\d+)*)\]/g) || [];
//             const converted = arrays.map(arr => `{${arr.slice(1, -1)}}`);
//             return `new int[][]{${converted.join(',')}}`;
//           });
//       }

//       return processed.replace(/\s*,\s*/g, ', ').trim();
//     };

//     return `
//     import java.util.*;
// // Definition for singly-linked list
// class ListNode {
//     int val;
//     ListNode next;
//     ListNode() {}
//     ListNode(int val) { this.val = val; }
//     ListNode(int val, ListNode next) { this.val = val; this.next = next; }
// }

// // Definition for a binary tree node
// class TreeNode {
//     int val;
//     TreeNode left;
//     TreeNode right;
//     TreeNode() {}
//     TreeNode(int val) { this.val = val; }
//     TreeNode(int val, TreeNode left, TreeNode right) {
//         this.val = val;
//         this.left = left;
//         this.right = right;
//     }
// }

// ${userCode}


// public class Main {
//     // Helper method to create LinkedList from array
//     public static ListNode createLinkedList(int[] arr) {
//         if (arr == null || arr.length == 0) return null;
//         ListNode head = new ListNode(arr[0]);
//         ListNode current = head;
//         for (int i = 1; i < arr.length; i++) {
//             current.next = new ListNode(arr[i]);
//             current = current.next;
//         }
//         return head;
//     }

//     // Helper method to create Binary Tree from array (level order)
//     public static TreeNode createBinaryTree(Integer[] arr) {
//         if (arr == null || arr.length == 0 || arr[0] == null) return null;
//         TreeNode root = new TreeNode(arr[0]);
//         java.util.Queue<TreeNode> queue = new java.util.LinkedList<>();
//         queue.offer(root);
//         int i = 1;
//         while (!queue.isEmpty() && i < arr.length) {
//             TreeNode node = queue.poll();
//             if (i < arr.length && arr[i] != null) {
//                 node.left = new TreeNode(arr[i]);
//                 queue.offer(node.left);
//             }
//             i++;
//             if (i < arr.length && arr[i] != null) {
//                 node.right = new TreeNode(arr[i]);
//                 queue.offer(node.right);
//             }
//             i++;
//         }
//         return root;
//     }

//     // Helper method to print LinkedList
//     public static void printLinkedList(ListNode head) {
//         System.out.print("[");
//         while (head != null) {
//             System.out.print(head.val);
//             if (head.next != null) System.out.print(",");
//             head = head.next;
//         }
//         System.out.println("]");
//     }

//     // Helper method to print Binary Tree (level order)
//     public static void printBinaryTree(TreeNode root) {
//         if (root == null) {
//             System.out.println("[]");
//             return;
//         }
//         java.util.List<String> result = new java.util.ArrayList<>();
//         java.util.Queue<TreeNode> queue = new java.util.LinkedList<>();
//         queue.offer(root);
//         while (!queue.isEmpty()) {
//             TreeNode node = queue.poll();
//             if (node != null) {
//                 result.add(String.valueOf(node.val));
//                 queue.offer(node.left);
//                 queue.offer(node.right);
//             } else {
//                 result.add("null");
//             }
//         }
//         // Remove trailing nulls
//         while (result.size() > 0 && result.get(result.size() - 1).equals("null")) {
//             result.remove(result.size() - 1);
//         }
//         System.out.println("[" + String.join(",", result) + "]");
//     }

//     public static void main(String[] args) {
//     Solution sol = new Solution();
//     Object result = sol.${functionName}(${parseJavaInput(testCase.input)});

//         // Handle different return types (arrays first!)
//         if (result instanceof int[][]) {
//             String s = java.util.Arrays.deepToString((int[][]) result).replace(", ", ",");
//             System.out.println(s);
//         } else if (result instanceof int[]) {
//             String s = java.util.Arrays.toString((int[]) result).replace(", ", ",");
//             System.out.println(s);
//         } else if (result instanceof String[]) {
//             String s = java.util.Arrays.toString((String[]) result).replace(", ", ",");
//             System.out.println(s);
//         } else if (result instanceof ListNode) {
//             printLinkedList((ListNode) result);
//         } else if (result instanceof TreeNode) {
//             printBinaryTree((TreeNode) result);
//         } else if (result instanceof java.util.List) {
//             System.out.println(result.toString());
//         } else {
//             System.out.println(result);
//         }
//     }
// }
// `;
//   },

//   cpp: (userCode, functionName, testCase) => {
//     const parseCppInput = (input: string) => {
//       let processed = input.replace(/\w+\s*=\s*/g, '');

//       // Handle LinkedList: [1,2,3] -> createLinkedList({1,2,3})
//       if (processed.includes('ListNode') || functionName.toLowerCase().includes('list')) {
//         processed = processed.replace(/\[([^\]]*)\]/g, 'createLinkedList({$1})');
//       }
//       // Handle TreeNode: [3,9,20,null,null,15,7] -> createBinaryTree({3,9,20,INT_MIN,INT_MIN,15,7})
//       else if (processed.includes('TreeNode') || functionName.toLowerCase().includes('tree')) {
//         processed = processed.replace(/\[([^\]]*)\]/g, (match, content) => {
//           const elements = content.split(',').map((s:any) => s.trim() === 'null' ? 'INT_MIN' : s.trim());
//           return `createBinaryTree({${elements.join(',')}})`;
//         });
//       }
//       // Regular arrays
//       else {
//         processed = processed.replace(/\[([^\]]*)\]/g, '{$1}');
//       }

//       return processed.trim();
//     };

//     return `
// #include <bits/stdc++.h>
// using namespace std;

// // Definition for singly-linked list
// struct ListNode {
//     int val;
//     ListNode *next;
//     ListNode() : val(0), next(nullptr) {}
//     ListNode(int x) : val(x), next(nullptr) {}
//     ListNode(int x, ListNode *next) : val(x), next(next) {}
// };

// // Definition for a binary tree node
// struct TreeNode {
//     int val;
//     TreeNode *left;
//     TreeNode *right;
//     TreeNode() : val(0), left(nullptr), right(nullptr) {}
//     TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
//     TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}
// };

// ${userCode}

// // Helper function to create LinkedList from vector
// ListNode* createLinkedList(vector<int> arr) {
//     if (arr.empty()) return nullptr;
//     ListNode* head = new ListNode(arr[0]);
//     ListNode* current = head;
//     for (int i = 1; i < arr.size(); i++) {
//         current->next = new ListNode(arr[i]);
//         current = current->next;
//     }
//     return head;
// }

// // Helper function to create Binary Tree from vector (level order, INT_MIN represents null)
// TreeNode* createBinaryTree(vector<int> arr) {
//     if (arr.empty() || arr[0] == INT_MIN) return nullptr;
//     TreeNode* root = new TreeNode(arr[0]);
//     queue<TreeNode*> q;
//     q.push(root);
//     int i = 1;
//     while (!q.empty() && i < arr.size()) {
//         TreeNode* node = q.front();
//         q.pop();
//         if (i < arr.size() && arr[i] != INT_MIN) {
//             node->left = new TreeNode(arr[i]);
//             q.push(node->left);
//         }
//         i++;
//         if (i < arr.size() && arr[i] != INT_MIN) {
//             node->right = new TreeNode(arr[i]);
//             q.push(node->right);
//         }
//         i++;
//     }
//     return root;
// }

// // Helper function to print LinkedList
// void printLinkedList(ListNode* head) {
//     cout << "[";
//     while (head) {
//         cout << head->val;
//         if (head->next) cout << ",";
//         head = head->next;
//     }
//     cout << "]" << endl;
// }

// // Helper function to print Binary Tree (level order)
// void printBinaryTree(TreeNode* root) {
//     if (!root) {
//         cout << "[]" << endl;
//         return;
//     }
//     vector<string> result;
//     queue<TreeNode*> q;
//     q.push(root);
//     while (!q.empty()) {
//         TreeNode* node = q.front();
//         q.pop();
//         if (node) {
//             result.push_back(to_string(node->val));
//             q.push(node->left);
//             q.push(node->right);
//         } else {
//             result.push_back("null");
//         }
//     }
//     // Remove trailing nulls
//     while (!result.empty() && result.back() == "null") {
//         result.pop_back();
//     }
//     cout << "[";
//     for (int i = 0; i < result.size(); i++) {
//         cout << result[i];
//         if (i < result.size() - 1) cout << ",";
//     }
//     cout << "]" << endl;
// }

// template<typename T>
// void printResult(const T& result) {
//     cout << result << endl;
// }

// template<>
// void printResult(const vector<int>& result) {
//     cout << "[";
//     for (size_t i = 0; i < result.size(); i++) {
//         cout << result[i];
//         if (i < result.size() - 1) cout << ",";
//     }
//     cout << "]" << endl;
// }

// template<>
// void printResult(const vector<vector<int>>& result) {
//     cout << "[";
//     for (size_t i = 0; i < result.size(); i++) {
//         cout << "[";
//         for (size_t j = 0; j < result[i].size(); j++) {
//             cout << result[i][j];
//             if (j < result[i].size() - 1) cout << ",";
//         }
//         cout << "]";
//         if (i < result.size() - 1) cout << ",";
//     }
//     cout << "]" << endl;
// }

// int main() {
//     auto result = ${functionName}(${parseCppInput(testCase.input)});

//     // Handle different return types
//     if constexpr (is_same_v<decltype(result), ListNode*>) {
//         printLinkedList(result);
//     } else if constexpr (is_same_v<decltype(result), TreeNode*>) {
//         printBinaryTree(result);
//     } else {
//         printResult(result);
//     }
//     return 0;
// }
// `;
//   },

//   python: (userCode, functionName, testCase) => {
//     const parsePythonInput = (input: string) => {
//       let processed = input.replace(/\w+\s*=\s*/g, '');

//       // Handle LinkedList: [1,2,3] -> create_linked_list([1,2,3])
//       if (processed.includes('ListNode') || functionName.toLowerCase().includes('list')) {
//         processed = processed.replace(/\[([^\]]*)\]/g, 'create_linked_list([$1])');
//       }
//       // Handle TreeNode: [3,9,20,null,null,15,7] -> create_binary_tree([3,9,20,None,None,15,7])
//       else if (processed.includes('TreeNode') || functionName.toLowerCase().includes('tree')) {
//         processed = processed.replace(/\[([^\]]*)\]/g, (match, content) => {
//           const elements = content.split(',').map((s:any) => s.trim() === 'null' ? 'None' : s.trim());
//           return `create_binary_tree([${elements.join(',')}])`;
//         });
//       }

//       return processed.replace(/\s*,\s*/g, ', ').trim();
//     };

//     return `
// import json
// from typing import List, Optional, Any
// from collections import deque

// # Definition for singly-linked list
// class ListNode:
//     def __init__(self, val=0, next=None):
//         self.val = val
//         self.next = next

// # Definition for a binary tree node
// class TreeNode:
//     def __init__(self, val=0, left=None, right=None):
//         self.val = val
//         self.left = left
//         self.right = right

// ${userCode}

// def create_linked_list(arr):
//     """Create LinkedList from array"""
//     if not arr:
//         return None
//     head = ListNode(arr[0])
//     current = head
//     for i in range(1, len(arr)):
//         current.next = ListNode(arr[i])
//         current = current.next
//     return head

// def create_binary_tree(arr):
//     """Create Binary Tree from array (level order, None represents null)"""
//     if not arr or arr[0] is None:
//         return None
//     root = TreeNode(arr[0])
//     queue = deque([root])
//     i = 1
//     while queue and i < len(arr):
//         node = queue.popleft()
//         if i < len(arr) and arr[i] is not None:
//             node.left = TreeNode(arr[i])
//             queue.append(node.left)
//         i += 1
//         if i < len(arr) and arr[i] is not None:
//             node.right = TreeNode(arr[i])
//             queue.append(node.right)
//         i += 1
//     return root

// def print_linked_list(head):
//     """Print LinkedList as array"""
//     result = []
//     while head:
//         result.append(head.val)
//         head = head.next
//     return result

// def print_binary_tree(root):
//     """Print Binary Tree as array (level order)"""
//     if not root:
//         return []
//     result = []
//     queue = deque([root])
//     while queue:
//         node = queue.popleft()
//         if node:
//             result.append(node.val)
//             queue.append(node.left)
//             queue.append(node.right)
//         else:
//             result.append(None)
//     # Remove trailing None values
//     while result and result[-1] is None:
//         result.pop()
//     return result

// def format_output(result):
//     """Format output to handle different return types"""
//     if isinstance(result, ListNode):
//         return json.dumps(print_linked_list(result))
//     elif isinstance(result, TreeNode):
//         return json.dumps(print_binary_tree(result))
//     elif isinstance(result, (list, tuple)):
//         return json.dumps(result, separators=(',', ':'))
//     elif isinstance(result, bool):
//         return str(result).lower()
//     elif isinstance(result, str):
//         return json.dumps(result)
//     else:
//         return str(result)

// if __name__ == "__main__":
//     result = ${functionName}(${parsePythonInput(testCase.input)})
//     print(format_output(result))
// `;
//   },

//   javascript: (userCode, functionName, testCase) => {
//     const parseJsInput = (input: string) => {
//       let processed = input.replace(/\w+\s*=\s*/g, '');

//       // Handle LinkedList: [1,2,3] -> createLinkedList([1,2,3])
//       if (processed.includes('ListNode') || functionName.toLowerCase().includes('list')) {
//         processed = processed.replace(/\[([^\]]*)\]/g, 'createLinkedList([$1])');
//       }
//       // Handle TreeNode: [3,9,20,null,null,15,7] -> createBinaryTree([3,9,20,null,null,15,7])
//       else if (processed.includes('TreeNode') || functionName.toLowerCase().includes('tree')) {
//         // JavaScript already uses null, so no conversion needed
//         processed = processed.replace(/\[([^\]]*)\]/g, 'createBinaryTree([$1])');
//       }

//       return processed.replace(/'/g, '"').replace(/\s*,\s*/g, ', ').trim();
//     };

//     return `
// // Definition for singly-linked list
// function ListNode(val, next) {
//     this.val = (val===undefined ? 0 : val);
//     this.next = (next===undefined ? null : next);
// }

// // Definition for a binary tree node
// function TreeNode(val, left, right) {
//     this.val = (val===undefined ? 0 : val);
//     this.left = (left===undefined ? null : left);
//     this.right = (right===undefined ? null : right);
// }

// ${userCode}

// // Helper function to create LinkedList from array
// function createLinkedList(arr) {
//     if (!arr || arr.length === 0) return null;
//     let head = new ListNode(arr[0]);
//     let current = head;
//     for (let i = 1; i < arr.length; i++) {
//         current.next = new ListNode(arr[i]);
//         current = current.next;
//     }
//     return head;
// }

// // Helper function to create Binary Tree from array (level order)
// function createBinaryTree(arr) {
//     if (!arr || arr.length === 0 || arr[0] === null) return null;
//     let root = new TreeNode(arr[0]);
//     let queue = [root];
//     let i = 1;
//     while (queue.length > 0 && i < arr.length) {
//         let node = queue.shift();
//         if (i < arr.length && arr[i] !== null) {
//             node.left = new TreeNode(arr[i]);
//             queue.push(node.left);
//         }
//         i++;
//         if (i < arr.length && arr[i] !== null) {
//             node.right = new TreeNode(arr[i]);
//             queue.push(node.right);
//         }
//         i++;
//     }
//     return root;
// }

// // Helper function to print LinkedList
// function printLinkedList(head) {
//     let result = [];
//     while (head) {
//         result.push(head.val);
//         head = head.next;
//     }
//     return result;
// }

// // Helper function to print Binary Tree (level order)
// function printBinaryTree(root) {
//     if (!root) return [];
//     let result = [];
//     let queue = [root];
//     while (queue.length > 0) {
//         let node = queue.shift();
//         if (node) {
//             result.push(node.val);
//             queue.push(node.left);
//             queue.push(node.right);
//         } else {
//             result.push(null);
//         }
//     }
//     // Remove trailing nulls
//     while (result.length > 0 && result[result.length - 1] === null) {
//         result.pop();
//     }
//     return result;
// }

// function formatOutput(result) {
//     if (result instanceof ListNode) {
//         return JSON.stringify(printLinkedList(result));
//     } else if (result instanceof TreeNode) {
//         return JSON.stringify(printBinaryTree(result));
//     } else if (typeof result === 'string') {
//         return JSON.stringify(result);
//     } else if (Array.isArray(result)) {
//         return JSON.stringify(result);
//     } else {
//         return JSON.stringify(result);
//     }
// }

// try {
//     const result = ${functionName}(${parseJsInput(testCase.input)});
//     console.log(formatOutput(result));
// } catch (error) {
//     console.error("Error:", error.message);
// }
// `;
//   }
// };

export const codeTemplates: Record<
  string,
  (userCode: string, functionName: string, testCase: TestCase) => string
> = {
  java: (userCode, functionName, testCase) => {
    const parseJavaInput = (input: string) => {
      // Remove variable names like "nums = "
      let processed = input.replace(/\w+\s*=\s*/g, '');

      // Handle special data structures first
      if (processed.includes('LinkedList') || functionName.toLowerCase().includes('list')) {
        // Handle LinkedList: [1,2,3,4,5] -> createLinkedList(new int[]{1,2,3,4,5})
        processed = processed.replace(/\[(-?\d+(?:\s*,\s*-?\d+)*)\]/g, 'createLinkedList(new int[]{$1})');
      }
      else if (processed.includes('TreeNode') || functionName.toLowerCase().includes('tree')) {
        // Handle TreeNode: [3,9,20,null,null,15,7] -> createBinaryTree(new Integer[]{3,9,20,null,null,15,7})
        processed = processed.replace(/\[([^\]]*)\]/g, (match, content) => {
          const elements = content.split(',').map((s: any) => s.trim() === 'null' ? 'null' : s.trim());
          return `createBinaryTree(new Integer[]{${elements.join(',')}})`;
        });
      }
      // Handle regular arrays
      else {
        processed = processed
          // 2D int arrays: [[1,2],[3,4]] -> new int[][]{{1,2},{3,4}}
          .replace(/\[(\s*\[-?\d+(?:\s*,\s*-?\d+)*\]\s*(?:,\s*\[-?\d+(?:\s*,\s*-?\d+)*\]\s*)*)\]/g, (match) => {
            const arrays = match.match(/\[-?\d+(?:\s*,\s*-?\d+)*\]/g) || [];
            const converted = arrays.map(arr => `{${arr.slice(1, -1)}}`);
            return `new int[][]{${converted.join(',')}}`;
          })
          // 1D int arrays: [1,2,3] -> new int[]{1,2,3}
          .replace(/\[(-?\d+(?:\s*,\s*-?\d+)*)\]/g, 'new int[]{$1}')
          // 1D string arrays: ["abc","def"] -> new String[]{"abc","def"}
          .replace(/\[("(?:[^"\\]|\\.)*"(?:\s*,\s*"(?:[^"\\]|\\.)*")*)\]/g, 'new String[]{$1}')
          // 1D char arrays: ['a','b','c'] -> new char[]{'a','b','c'}
          .replace(/\[\s*'[^']?'(?:\s*,\s*'[^']?')*\s*\]/g, 'new char[]{$&}')
          // 1D boolean arrays: [true,false] -> new boolean[]{true,false}
          .replace(/\[((?:true|false)(?:\s*,\s*(?:true|false))*)\]/g, 'new boolean[]{$1}')
          // 1D double arrays: [1.5,2.7] -> new double[]{1.5,2.7}
          .replace(/\[(-?\d+\.\d+(?:\s*,\s*-?\d+\.\d+)*)\]/g, 'new double[]{$1}');
      }

      return processed.replace(/\s*,\s*/g, ', ').trim();
    };

    return `
import java.util.*;

// Definition for singly-linked list
class ListNode {
    int val;
    ListNode next;
    ListNode() {}
    ListNode(int val) { this.val = val; }
    ListNode(int val, ListNode next) { this.val = val; this.next = next; }
}

// Definition for a binary tree node
class TreeNode {
    int val;
    TreeNode left;
    TreeNode right;
    TreeNode() {}
    TreeNode(int val) { this.val = val; }
    TreeNode(int val, TreeNode left, TreeNode right) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

// User's code will be injected here
${userCode}

public class Main {
    // Helper to create LinkedList from array
    public static ListNode createLinkedList(int[] arr) {
        if (arr == null || arr.length == 0) return null;
        ListNode head = new ListNode(arr[0]);
        ListNode current = head;
        for (int i = 1; i < arr.length; i++) {
            current.next = new ListNode(arr[i]);
            current = current.next;
        }
        return head;
    }
    
    // Helper to create Binary Tree from array (level order)
    public static TreeNode createBinaryTree(Integer[] arr) {
        if (arr == null || arr.length == 0 || arr[0] == null) return null;
        TreeNode root = new TreeNode(arr[0]);
        Queue<TreeNode> queue = new LinkedList<>();
        queue.offer(root);
        int i = 1;
        while (!queue.isEmpty() && i < arr.length) {
            TreeNode node = queue.poll();
            if (i < arr.length && arr[i] != null) {
                node.left = new TreeNode(arr[i]);
                queue.offer(node.left);
            }
            i++;
            if (i < arr.length && arr[i] != null) {
                node.right = new TreeNode(arr[i]);
                queue.offer(node.right);
            }
            i++;
        }
        return root;
    }
    
    // Helper to print LinkedList
    public static void printLinkedList(ListNode head) {
        System.out.print("[");
        while (head != null) {
            System.out.print(head.val);
            if (head.next != null) System.out.print(",");
            head = head.next;
        }
        System.out.println("]");
    }
    
    // Helper to print Binary Tree (level order)
    public static void printBinaryTree(TreeNode root) {
        if (root == null) {
            System.out.println("[]");
            return;
        }
        List<String> result = new ArrayList<>();
        Queue<TreeNode> queue = new LinkedList<>();
        queue.offer(root);
        while (!queue.isEmpty()) {
            TreeNode node = queue.poll();
            if (node != null) {
                result.add(String.valueOf(node.val));
                queue.offer(node.left);
                queue.offer(node.right);
            } else {
                result.add("null");
            }
        }
        while (result.size() > 0 && result.get(result.size() - 1).equals("null")) {
            result.remove(result.size() - 1);
        }
        System.out.println("[" + String.join(",", result) + "]");
    }
    
    public static void main(String[] args) {
        Solution sol = new Solution();
        Object result = sol.${functionName}(${parseJavaInput(testCase.input)});

        // Handle different return types
        if (result instanceof int[][]) {
            System.out.println(Arrays.deepToString((int[][]) result).replace(" ", ""));
        } else if (result instanceof int[]) {
            System.out.println(Arrays.toString((int[]) result).replace(" ", ""));
        } else if (result instanceof String[]) {
            System.out.println(Arrays.toString((String[]) result).replace(" ", ""));
        } else if (result instanceof ListNode) {
            printLinkedList((ListNode) result);
        } else if (result instanceof TreeNode) {
            printBinaryTree((TreeNode) result);
        } else if (result instanceof List) {
            System.out.println(result.toString().replace(" ", ""));
        } else {
            System.out.println(result);
        }
    }
}
`;
  },

  cpp: (userCode, functionName, testCase) => {
    const parseCppInput = (input: string) => {
      // Remove variable names like "nums = "
      let processed = input.replace(/\w+\s*=\s*/g, '');

      // Handle special data structures first
      if (processed.includes('ListNode') || functionName.toLowerCase().includes('list')) {
        // Handle LinkedList: [1,2,3] -> createLinkedList({1,2,3})
        processed = processed.replace(/\[([^\]]*)\]/g, 'createLinkedList({$1})');
      }
      else if (processed.includes('TreeNode') || functionName.toLowerCase().includes('tree')) {
        // Handle TreeNode: [3,9,20,null,null,15,7] -> createBinaryTree({3,9,20,INT_MIN,INT_MIN,15,7})
        processed = processed.replace(/\[([^\]]*)\]/g, (match, content) => {
          const elements = content.split(',').map((s: any) => s.trim() === 'null' ? 'INT_MIN' : s.trim());
          return `createBinaryTree({${elements.join(',')}})`;
        });
      }
      // Handle regular arrays by converting them to initializer lists
      else {
        processed = processed.replace(/\[([^\]]*)\]/g, '{$1}');
      }

      return processed.trim();
    };

    return `
#include <iostream>
#include <vector>
#include <string>
#include <queue>
#include <limits> // For INT_MIN
#include <type_traits> // For std::decay_t and std::is_same_v
#include <iterator>    // For std::next
#include <bits/stdc++.h>

using namespace std;

// User's code will be injected here
${userCode}

// Definition for singly-linked list
struct ListNode {
    int val;
    ListNode *next;
    ListNode() : val(0), next(nullptr) {}
    ListNode(int x) : val(x), next(nullptr) {}
    ListNode(int x, ListNode *next) : val(x), next(next) {}
};

// Definition for a binary tree node
struct TreeNode {
    int val;
    TreeNode *left;
    TreeNode *right;
    TreeNode() : val(0), left(nullptr), right(nullptr) {}
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
    TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}
};

// Helper to create LinkedList from vector
ListNode* createLinkedList(const std::vector<int>& arr) {
    if (arr.empty()) return nullptr;
    ListNode* head = new ListNode(arr[0]);
    ListNode* current = head;
    for (size_t i = 1; i < arr.size(); i++) {
        current->next = new ListNode(arr[i]);
        current = current->next;
    }
    return head;
}

// Helper to create Binary Tree from vector
TreeNode* createBinaryTree(const std::vector<int>& arr) {
    if (arr.empty() || arr[0] == INT_MIN) return nullptr;
    TreeNode* root = new TreeNode(arr[0]);
    std::queue<TreeNode*> q;
    q.push(root);
    size_t i = 1;
    while (!q.empty() && i < arr.size()) {
        TreeNode* node = q.front();
        q.pop();
        if (i < arr.size() && arr[i] != INT_MIN) {
            node->left = new TreeNode(arr[i]);
            q.push(node->left);
        }
        i++;
        if (i < arr.size() && arr[i] != INT_MIN) {
            node->right = new TreeNode(arr[i]);
            q.push(node->right);
        }
        i++;
    }
    return root;
}

// Unified helper to print 1D and 2D containers
template<typename T>
void print_container(const T& container) {
    using ValueType = typename T::value_type;
    std::cout << "[";
    for (auto it = container.begin(); it != container.end(); ++it) {
        if constexpr (std::is_same_v<ValueType, std::vector<int>> || 
                      std::is_same_v<ValueType, std::vector<std::string>>) {
            const auto& inner_vec = *it;
            std::cout << "[";
            for (auto inner_it = inner_vec.begin(); inner_it != inner_vec.end(); ++inner_it) {
                std::cout << *inner_it;
                if (std::next(inner_it) != inner_vec.end()) {
                    std::cout << ",";
                }
            }
            std::cout << "]";
        } else {
            std::cout << *it;
        }
        if (std::next(it) != container.end()) {
            std::cout << ",";
        }
    }
    std::cout << "]" << std::endl;
}

// Helper to print LinkedList
// void printLinkedList(ListNode* head) {
//     std::cout << "[";
//     while (head) {
//         std::cout << head->val;
//         if (head->next) std::cout << ",";
//         head = head->next;
//     }
//     std::cout << "]" << std::endl;
// }

int main() {
    Solution sol;
    auto result = sol.${functionName}(${parseCppInput(testCase.input)});
    
    using ResultType = std::decay_t<decltype(result)>;

    // if constexpr (std::is_same_v<ResultType, ListNode*>) {
    //     printLinkedList(result);
    // } else 
    if constexpr (std::is_same_v<ResultType, std::vector<int>> || 
                         std::is_same_v<ResultType, std::vector<std::string>>) {
        print_container(result);
    } else if constexpr (std::is_same_v<ResultType, std::vector<std::vector<int>>>) {
        print_container(result);
    } else {
        std::cout << result << std::endl;
    }
    
    return 0;
}
`;
  },

  python: (userCode, functionName, testCase) => {
    const parsePythonInput = (input: string) => {
      // Remove variable names like "nums = "
      let processed = input.replace(/\w+\s*=\s*/g, '');

      // Handle special data structures first
      if (processed.includes('ListNode') || functionName.toLowerCase().includes('list')) {
        // Handle LinkedList: [1,2,3] -> create_linked_list([1,2,3])
        processed = processed.replace(/\[([^\]]*)\]/g, 'create_linked_list([$1])');
      }
      else if (processed.includes('TreeNode') || functionName.toLowerCase().includes('tree')) {
        // Handle TreeNode: [3,9,20,null,null,15,7] -> create_binary_tree([3,9,20,None,None,15,7])
        processed = processed.replace(/\[([^\]]*)\]/g, (match, content) => {
          const elements = content.split(',').map((s: any) => s.trim() === 'null' ? 'None' : s.trim());
          return `create_binary_tree([${elements.join(',')}])`;
        });
      }

      return processed.replace(/\s*,\s*/g, ', ').trim();
    };

    return `
import json
from typing import List, Optional
from collections import deque

# Definition for singly-linked list
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

# Definition for a binary tree node
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

# User's code will be injected here
${userCode}

def create_linked_list(arr: List[int]) -> Optional[ListNode]:
    if not arr: return None
    head = ListNode(arr[0])
    current = head
    for i in range(1, len(arr)):
        current.next = ListNode(arr[i])
        current = current.next
    return head

def create_binary_tree(arr: List[Optional[int]]) -> Optional[TreeNode]:
    if not arr or arr[0] is None: return None
    root = TreeNode(arr[0])
    queue = deque([root])
    i = 1
    while queue and i < len(arr):
        node = queue.popleft()
        if i < len(arr) and arr[i] is not None:
            node.left = TreeNode(arr[i])
            queue.append(node.left)
        i += 1
        if i < len(arr) and arr[i] is not None:
            node.right = TreeNode(arr[i])
            queue.append(node.right)
        i += 1
    return root

def format_output(result: any) -> str:
    # This helper serializes the output to a standardized JSON format
    if isinstance(result, ListNode):
        res_list = []
        while result:
            res_list.append(result.val)
            result = result.next
        return json.dumps(res_list)
    elif isinstance(result, TreeNode):
        if not result: return "[]"
        res_list = []
        queue = deque([result])
        while queue:
            node = queue.popleft()
            if node:
                res_list.append(node.val)
                queue.append(node.left)
                queue.append(node.right)
            else:
                res_list.append(None)
        while res_list and res_list[-1] is None:
            res_list.pop()
        return json.dumps(res_list)
    elif isinstance(result, bool):
        return str(result).lower()
    else:
        # Default to JSON dump for lists, dicts, primitives etc.
        return json.dumps(result, separators=(',', ':'))

if __name__ == "__main__":
    # FIXED: Instantiate the Solution class
    sol = Solution()
    # FIXED: Call the method on the instance
    result = sol.${functionName}(${parsePythonInput(testCase.input)})
    print(format_output(result))
`;
  },

  javascript: (userCode, functionName, testCase) => {
    const parseJsInput = (input: string) => {
      // Remove variable names like "nums = "
      let processed = input.replace(/\w+\s*=\s*/g, '');

      // Handle special data structures first
      if (processed.includes('ListNode') || functionName.toLowerCase().includes('list')) {
        // Handle LinkedList: [1,2,3] -> createLinkedList([1,2,3])
        processed = processed.replace(/\[([^\]]*)\]/g, 'createLinkedList([$1])');
      }
      else if (processed.includes('TreeNode') || functionName.toLowerCase().includes('tree')) {
        // Handle TreeNode: [3,9,20,null,null,15,7] -> createBinaryTree([3,9,20,null,null,15,7])
        processed = processed.replace(/\[([^\]]*)\]/g, 'createBinaryTree([$1])');
      }

      // JavaScript handles single-quoted strings in JSON, but double is standard
      return processed.replace(/'/g, '"').replace(/\s*,\s*/g, ', ').trim();
    };

    return `
// Definition for singly-linked list
function ListNode(val, next) {
    this.val = (val===undefined ? 0 : val);
    this.next = (next===undefined ? null : next);
}

// Definition for a binary tree node
function TreeNode(val, left, right) {
    this.val = (val===undefined ? 0 : val);
    this.left = (left===undefined ? null : left);
    this.right = (right===undefined ? null : right);
}

// User's code will be injected here
${userCode}

// Helper to create LinkedList from array
function createLinkedList(arr) {
    if (!arr || arr.length === 0) return null;
    let head = new ListNode(arr[0]);
    let current = head;
    for (let i = 1; i < arr.length; i++) {
        current.next = new ListNode(arr[i]);
        current = current.next;
    }
    return head;
}

// Helper to create Binary Tree from array (level order)
function createBinaryTree(arr) {
    if (!arr || arr.length === 0 || arr[0] === null) return null;
    let root = new TreeNode(arr[0]);
    let queue = [root];
    let i = 1;
    while (queue.length > 0 && i < arr.length) {
        let node = queue.shift();
        if (i < arr.length && arr[i] !== null) {
            node.left = new TreeNode(arr[i]);
            queue.push(node.left);
        }
        i++;
        if (i < arr.length && arr[i] !== null) {
            node.right = new TreeNode(arr[i]);
            queue.push(node.right);
        }
        i++;
    }
    return root;
}

function formatOutput(result) {
    // This helper serializes the output to a standardized JSON format
    if (result instanceof ListNode) {
        let res_arr = [];
        while (result) {
            res_arr.push(result.val);
            result = result.next;
        }
        return JSON.stringify(res_arr);
    } else if (result instanceof TreeNode) {
        if (!result) return "[]";
        let res_arr = [];
        let queue = [result];
        while (queue.length > 0) {
            let node = queue.shift();
            if (node) {
                res_arr.push(node.val);
                queue.push(node.left);
                queue.push(node.right);
            } else {
                res_arr.push(null);
            }
        }
        while (res_arr.length > 0 && res_arr[res_arr.length - 1] === null) {
            res_arr.pop();
        }
        return JSON.stringify(res_arr);
    }
    // Default to JSON.stringify for arrays, objects, primitives, etc.
    return JSON.stringify(result);
}

try {
    // FIXED: Instantiate the Solution class
    const sol = new Solution();
    // FIXED: Call the method on the instance
    const result = sol.${functionName}(${parseJsInput(testCase.input)});
    console.log(formatOutput(result));
} catch (error) {
    console.error("An error occurred:", error.message);
}
`;
  }
};

export function generateCode(
  language: string,
  userCode: string,
  functionName: string,
  testCase: TestCase
): string {
  const template = codeTemplates[language];
  if (!template) throw new Error(`Language not supported: ${language}`);
  return template(userCode, functionName, testCase);
}


export const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case "Easy":
      return "text-green-600 dark:text-green-400";
    case "Medium":
      return "text-orange-600 dark:text-orange-400";
    case "Hard":
      return "text-red-600 dark:text-red-400";
    default:
      return "text-gray-600";
  }
};






