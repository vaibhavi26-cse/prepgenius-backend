// seedDSATracker.js
// Seeds curated DSA problems for the Placement Hub tracker.
// Run once: node seedDSATracker.js
// NOTE: like the other seed scripts, re-running this regenerates all _ids
// for type: "dsaProblem" — don't keep bookmarked IDs across reseeds.

import dotenv from "dotenv";
import mongoose from "mongoose";
import Content from "./models/Content.js";

dotenv.config();

const problems = [
  // ---- Arrays ----
  { module: "Arrays", moduleOrder: 1, title: "Two Sum", difficulty: "Easy", url: "https://leetcode.com/problems/two-sum/" },
  { module: "Arrays", moduleOrder: 1, title: "Best Time to Buy and Sell Stock", difficulty: "Easy", url: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/" },
  { module: "Arrays", moduleOrder: 1, title: "Product of Array Except Self", difficulty: "Medium", url: "https://leetcode.com/problems/product-of-array-except-self/" },
  { module: "Arrays", moduleOrder: 1, title: "Maximum Subarray (Kadane's)", difficulty: "Medium", url: "https://leetcode.com/problems/maximum-subarray/" },
  { module: "Arrays", moduleOrder: 1, title: "3Sum", difficulty: "Medium", url: "https://leetcode.com/problems/3sum/" },
  { module: "Arrays", moduleOrder: 1, title: "Trapping Rain Water", difficulty: "Hard", url: "https://leetcode.com/problems/trapping-rain-water/" },

  // ---- Strings ----
  { module: "Strings", moduleOrder: 2, title: "Valid Anagram", difficulty: "Easy", url: "https://leetcode.com/problems/valid-anagram/" },
  { module: "Strings", moduleOrder: 2, title: "Longest Substring Without Repeating Characters", difficulty: "Medium", url: "https://leetcode.com/problems/longest-substring-without-repeating-characters/" },
  { module: "Strings", moduleOrder: 2, title: "Longest Palindromic Substring", difficulty: "Medium", url: "https://leetcode.com/problems/longest-palindromic-substring/" },
  { module: "Strings", moduleOrder: 2, title: "Group Anagrams", difficulty: "Medium", url: "https://leetcode.com/problems/group-anagrams/" },
  { module: "Strings", moduleOrder: 2, title: "Minimum Window Substring", difficulty: "Hard", url: "https://leetcode.com/problems/minimum-window-substring/" },

  // ---- LinkedList ----
  { module: "LinkedList", moduleOrder: 3, title: "Reverse Linked List", difficulty: "Easy", url: "https://leetcode.com/problems/reverse-linked-list/" },
  { module: "LinkedList", moduleOrder: 3, title: "Merge Two Sorted Lists", difficulty: "Easy", url: "https://leetcode.com/problems/merge-two-sorted-lists/" },
  { module: "LinkedList", moduleOrder: 3, title: "Linked List Cycle", difficulty: "Easy", url: "https://leetcode.com/problems/linked-list-cycle/" },
  { module: "LinkedList", moduleOrder: 3, title: "Remove Nth Node From End of List", difficulty: "Medium", url: "https://leetcode.com/problems/remove-nth-node-from-end-of-list/" },
  { module: "LinkedList", moduleOrder: 3, title: "Reorder List", difficulty: "Medium", url: "https://leetcode.com/problems/reorder-list/" },
  { module: "LinkedList", moduleOrder: 3, title: "Merge k Sorted Lists", difficulty: "Hard", url: "https://leetcode.com/problems/merge-k-sorted-lists/" },

  // ---- Stack & Queue ----
  { module: "Stack & Queue", moduleOrder: 4, title: "Valid Parentheses", difficulty: "Easy", url: "https://leetcode.com/problems/valid-parentheses/" },
  { module: "Stack & Queue", moduleOrder: 4, title: "Min Stack", difficulty: "Medium", url: "https://leetcode.com/problems/min-stack/" },
  { module: "Stack & Queue", moduleOrder: 4, title: "Daily Temperatures", difficulty: "Medium", url: "https://leetcode.com/problems/daily-temperatures/" },
  { module: "Stack & Queue", moduleOrder: 4, title: "Largest Rectangle in Histogram", difficulty: "Hard", url: "https://leetcode.com/problems/largest-rectangle-in-histogram/" },

  // ---- Trees ----
  { module: "Trees", moduleOrder: 5, title: "Maximum Depth of Binary Tree", difficulty: "Easy", url: "https://leetcode.com/problems/maximum-depth-of-binary-tree/" },
  { module: "Trees", moduleOrder: 5, title: "Same Tree", difficulty: "Easy", url: "https://leetcode.com/problems/same-tree/" },
  { module: "Trees", moduleOrder: 5, title: "Binary Tree Level Order Traversal", difficulty: "Medium", url: "https://leetcode.com/problems/binary-tree-level-order-traversal/" },
  { module: "Trees", moduleOrder: 5, title: "Validate Binary Search Tree", difficulty: "Medium", url: "https://leetcode.com/problems/validate-binary-search-tree/" },
  { module: "Trees", moduleOrder: 5, title: "Lowest Common Ancestor of a BST", difficulty: "Medium", url: "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/" },
  { module: "Trees", moduleOrder: 5, title: "Binary Tree Maximum Path Sum", difficulty: "Hard", url: "https://leetcode.com/problems/binary-tree-maximum-path-sum/" },

  // ---- Graphs ----
  { module: "Graphs", moduleOrder: 6, title: "Number of Islands", difficulty: "Medium", url: "https://leetcode.com/problems/number-of-islands/" },
  { module: "Graphs", moduleOrder: 6, title: "Clone Graph", difficulty: "Medium", url: "https://leetcode.com/problems/clone-graph/" },
  { module: "Graphs", moduleOrder: 6, title: "Course Schedule", difficulty: "Medium", url: "https://leetcode.com/problems/course-schedule/" },
  { module: "Graphs", moduleOrder: 6, title: "Pacific Atlantic Water Flow", difficulty: "Medium", url: "https://leetcode.com/problems/pacific-atlantic-water-flow/" },
  { module: "Graphs", moduleOrder: 6, title: "Word Ladder", difficulty: "Hard", url: "https://leetcode.com/problems/word-ladder/" },

  // ---- Dynamic Programming ----
  { module: "Dynamic Programming", moduleOrder: 7, title: "Climbing Stairs", difficulty: "Easy", url: "https://leetcode.com/problems/climbing-stairs/" },
  { module: "Dynamic Programming", moduleOrder: 7, title: "House Robber", difficulty: "Medium", url: "https://leetcode.com/problems/house-robber/" },
  { module: "Dynamic Programming", moduleOrder: 7, title: "Coin Change", difficulty: "Medium", url: "https://leetcode.com/problems/coin-change/" },
  { module: "Dynamic Programming", moduleOrder: 7, title: "Longest Increasing Subsequence", difficulty: "Medium", url: "https://leetcode.com/problems/longest-increasing-subsequence/" },
  { module: "Dynamic Programming", moduleOrder: 7, title: "Longest Common Subsequence", difficulty: "Medium", url: "https://leetcode.com/problems/longest-common-subsequence/" },
  { module: "Dynamic Programming", moduleOrder: 7, title: "Edit Distance", difficulty: "Hard", url: "https://leetcode.com/problems/edit-distance/" },

  // ---- Binary Search ----
  { module: "Binary Search", moduleOrder: 8, title: "Binary Search", difficulty: "Easy", url: "https://leetcode.com/problems/binary-search/" },
  { module: "Binary Search", moduleOrder: 8, title: "Search in Rotated Sorted Array", difficulty: "Medium", url: "https://leetcode.com/problems/search-in-rotated-sorted-array/" },
  { module: "Binary Search", moduleOrder: 8, title: "Find Minimum in Rotated Sorted Array", difficulty: "Medium", url: "https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/" },
  { module: "Binary Search", moduleOrder: 8, title: "Median of Two Sorted Arrays", difficulty: "Hard", url: "https://leetcode.com/problems/median-of-two-sorted-arrays/" },

  // ---- Backtracking ----
  { module: "Backtracking", moduleOrder: 9, title: "Subsets", difficulty: "Medium", url: "https://leetcode.com/problems/subsets/" },
  { module: "Backtracking", moduleOrder: 9, title: "Permutations", difficulty: "Medium", url: "https://leetcode.com/problems/permutations/" },
  { module: "Backtracking", moduleOrder: 9, title: "Combination Sum", difficulty: "Medium", url: "https://leetcode.com/problems/combination-sum/" },
  { module: "Backtracking", moduleOrder: 9, title: "Word Search", difficulty: "Medium", url: "https://leetcode.com/problems/word-search/" },
  { module: "Backtracking", moduleOrder: 9, title: "N-Queens", difficulty: "Hard", url: "https://leetcode.com/problems/n-queens/" },

  // ---- Heap / Priority Queue ----
  { module: "Heap", moduleOrder: 10, title: "Kth Largest Element in an Array", difficulty: "Medium", url: "https://leetcode.com/problems/kth-largest-element-in-an-array/" },
  { module: "Heap", moduleOrder: 10, title: "Top K Frequent Elements", difficulty: "Medium", url: "https://leetcode.com/problems/top-k-frequent-elements/" },
  { module: "Heap", moduleOrder: 10, title: "Find Median from Data Stream", difficulty: "Hard", url: "https://leetcode.com/problems/find-median-from-data-stream/" },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    await Content.deleteMany({ subject: "dsa", type: "dsaProblem" });
    console.log("Cleared old dsaProblem entries");

    const docs = problems.map((p) => ({
      ...p,
      subject: "dsa",
      type: "dsaProblem",
    }));

    await Content.insertMany(docs);
    console.log(`Seeded ${docs.length} DSA tracker problems across ${new Set(problems.map(p => p.module)).size} topics`);

    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error("Seed failed:", err);
    process.exit(1);
  }
}

seed();