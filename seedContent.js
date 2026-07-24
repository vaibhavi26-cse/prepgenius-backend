import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import Content from "./models/Content.js";

const dsaContent = [
  // ══ NOTES ══
  {
    subject: "dsa",
    type: "note",
    module: "Module 1: Arrays & Strings",
    moduleOrder: 1,
    subtopic: "Array Basics",
    subtopicOrder: 1,
    title: "Arrays — Fundamentals",
    pages: 8,
    body: `## What is an Array?

An **array** is a linear data structure that stores a fixed-size collection of elements of the same data type in contiguous memory locations. Because elements sit next to each other in memory, the position (index) of any element can be calculated directly — this is what makes array access so fast.

### Key Properties

- **Fixed size** (in most languages) — decided at creation time.
- **Zero-indexed** — the first element is at index 0.
- **Contiguous memory** — elements are stored back-to-back.
- **Homogeneous** — all elements are typically the same data type.

### Time Complexity Cheat Sheet

| Operation | Time Complexity |
|---|---|
| Access by index | O(1) |
| Search (unsorted) | O(n) |
| Search (sorted, binary search) | O(log n) |
| Insert/Delete at end | O(1) |
| Insert/Delete at beginning or middle | O(n) |

### Why Insertion at the Beginning is O(n)

To insert a new element at index 0, every existing element must shift one position to the right to make room. In the worst case, this means moving all n elements — hence O(n) time.

### Example — Reversing an Array In-Place

The two-pointer technique reverses an array without using extra memory:

\\\`\\\`\\\`
function reverseArray(arr):
  left = 0
  right = arr.length - 1
  while left < right:
    swap(arr[left], arr[right])
    left = left + 1
    right = right - 1
  return arr
\\\`\\\`\\\`

This runs in O(n) time and O(1) extra space, since we only use two pointer variables regardless of array size.

> Example: Given [1, 2, 3, 4, 5], after reversing: [5, 4, 3, 2, 1]. Only 2 swaps were needed (positions 0↔4, 1↔3) since the middle element stays in place.

### Common Interview Traps

- Off-by-one errors when looping — always double check boundary conditions (< vs <=).
- Confusing array length with the last valid index (length - 1).
- Assuming array insertion is always O(1) — only true at the end, not at arbitrary positions.`,
  },
  {
    subject: "dsa",
    type: "note",
    module: "Module 1: Arrays & Strings",
    moduleOrder: 1,
    subtopic: "String Manipulation",
    subtopicOrder: 2,
    title: "String Manipulation Techniques",
    pages: 7,
    body: `## Strings as Character Arrays

In most languages, a **string** is essentially an array of characters, which means many array techniques (two pointers, sliding window) apply directly to string problems.

### Strings Are Often Immutable

In languages like Java, Python, and JavaScript, strings are **immutable** — once created, they cannot be changed in place. Every "modification" (like concatenation) actually creates a brand new string in memory.

> Example: \\\`s = s + "a"\\\` inside a loop that runs n times creates n new string objects, making naive string-building O(n²) in the worst case. Using a mutable buffer (like a list or StringBuilder) and joining once at the end fixes this to O(n).

### Common String Techniques

**1. Two Pointers** — useful for palindrome checks, reversing:

\\\`\\\`\\\`
function isPalindrome(s):
  left = 0
  right = s.length - 1
  while left < right:
    if s[left] != s[right]:
      return false
    left += 1
    right -= 1
  return true
\\\`\\\`\\\`

**2. Sliding Window** — useful for substring problems (e.g., "longest substring without repeating characters"). A window of characters expands and contracts as it scans through the string, tracking a condition (like uniqueness) without needing nested loops.

**3. Hash Maps for Frequency Counting** — useful for anagram checks, character counting problems. Store each character's count in a map, then compare maps between two strings.

### Common Interview Traps

- Forgetting that string comparison in some languages is case-sensitive by default.
- Not accounting for Unicode/multi-byte characters when computing "length."
- Building strings with repeated concatenation in a loop instead of using a buffer/array + join.`,
  },
  {
    subject: "dsa",
    type: "note",
    module: "Module 2: Linked Lists",
    moduleOrder: 2,
    subtopic: "Singly Linked List",
    subtopicOrder: 1,
    title: "Singly Linked List — Concepts & Operations",
    pages: 10,
    body: `## What is a Linked List?

A **linked list** is a linear data structure where elements (called **nodes**) are not stored in contiguous memory. Instead, each node holds its data plus a pointer/reference to the next node in the sequence.

### Node Structure

\\\`\\\`\\\`
Node:
  data
  next  (pointer to the next node, or null if this is the last node)
\\\`\\\`\\\`

### Linked List vs Array

| Aspect | Array | Linked List |
|---|---|---|
| Memory layout | Contiguous | Scattered (linked via pointers) |
| Access by index | O(1) | O(n) — must traverse |
| Insert/delete at known position | O(n) (shifting) | O(1) (pointer update) |
| Extra memory per element | None | Pointer storage overhead |

### Common Operations

**Traversal** — visiting every node from head to tail:

\\\`\\\`\\\`
function traverse(head):
  current = head
  while current != null:
    print(current.data)
    current = current.next
\\\`\\\`\\\`

**Insertion at head** — O(1), just repoint:

\\\`\\\`\\\`
function insertAtHead(head, value):
  newNode = Node(value)
  newNode.next = head
  return newNode  // newNode is now the head
\\\`\\\`\\\`

**Deletion of a node** — requires access to the *previous* node, since you need to repoint its \\\`next\\\` to skip over the deleted node.

> Example: To delete node B from A → B → C, you set A.next = C. Node B still technically exists in memory momentarily but is no longer reachable, and gets garbage collected.

### Common Interview Traps

- Forgetting to handle the empty list case (head = null).
- Losing the reference to the rest of the list when reassigning pointers mid-traversal (always save "next" before overwriting a pointer).
- Off-by-one errors when the list has only one node.`,
  },
  {
    subject: "dsa",
    type: "note",
    module: "Module 2: Linked Lists",
    moduleOrder: 2,
    subtopic: "Doubly Linked List",
    subtopicOrder: 2,
    title: "Doubly Linked List — Concepts & Operations",
    pages: 9,
    body: `## What is a Doubly Linked List?

A **doubly linked list** is like a singly linked list, but each node also stores a pointer to the **previous** node, not just the next one. This allows traversal in both directions.

### Node Structure

\\\`\\\`\\\`
Node:
  data
  next  (pointer to next node)
  prev  (pointer to previous node)
\\\`\\\`\\\`

### Advantages over Singly Linked List

- Can traverse backward as well as forward.
- Deleting a node is easier — you don't need a separate reference to the previous node, since each node already knows its own predecessor.

### Trade-off

- Extra memory per node (storing an additional pointer).
- Slightly more complex insertion/deletion logic (must update two pointers instead of one on each side).

### Example — Deleting a Node

\\\`\\\`\\\`
function deleteNode(node):
  if node.prev != null:
    node.prev.next = node.next
  if node.next != null:
    node.next.prev = node.prev
\\\`\\\`\\\`

> Example: In a browser's back/forward navigation history, a doubly linked list is a natural fit — "back" moves to prev, "forward" moves to next.

### Common Interview Traps

- Forgetting to update BOTH prev and next pointers during insertion/deletion (easy to update only one side).
- Not handling edge cases where the node being deleted is the head or tail (prev or next may be null).`,
  },
  {
    subject: "dsa",
    type: "note",
    module: "Module 3: Complexity Analysis",
    moduleOrder: 3,
    subtopic: "Big-O Notation",
    subtopicOrder: 1,
    title: "Time & Space Complexity (Big-O)",
    pages: 6,
    body: `## What is Big-O Notation?

**Big-O notation** describes how an algorithm's running time or memory usage grows as the input size (n) grows. It focuses on the **worst-case** growth rate, ignoring constant factors and lower-order terms.

### Common Complexity Classes (fastest to slowest)

| Notation | Name | Example |
|---|---|---|
| O(1) | Constant | Array index access |
| O(log n) | Logarithmic | Binary search |
| O(n) | Linear | Single loop through array |
| O(n log n) | Linearithmic | Merge sort, quicksort (avg) |
| O(n²) | Quadratic | Nested loops (bubble sort) |
| O(2ⁿ) | Exponential | Naive recursive Fibonacci |

### How to Estimate Complexity Quickly

- A single loop over n items → O(n).
- A loop inside a loop, both over n items → O(n²).
- Repeatedly halving the problem (like binary search) → O(log n).
- Recursion that calls itself twice per level, for n levels → O(2ⁿ) unless memoized.

> Example: A function with a single \\\`for\\\` loop from 0 to n is O(n). If it also has a nested \\\`for\\\` loop from 0 to n inside it, the total becomes O(n × n) = O(n²).

### Why This Matters in Interviews

Interviewers almost always ask "what's the time complexity of your solution?" — and often push you to optimize from O(n²) to O(n log n) or O(n). Being able to reason about this quickly is often weighted as heavily as getting the correct answer.

### Space Complexity

Space complexity works the same way, but measures **extra memory used** (not counting the input itself) as n grows. An algorithm using a few extra variables regardless of input size is O(1) space; one that creates a new array proportional to input size is O(n) space.`,
  },
  {
    subject: "dsa",
    type: "note",
    module: "Module 4: Stacks & Queues",
    moduleOrder: 4,
    subtopic: "Stack Basics",
    subtopicOrder: 1,
    title: "Stacks — LIFO Data Structure",
    pages: 5,
    body: `## What is a Stack?

A **stack** is a linear data structure that follows **LIFO** (Last In, First Out) ordering — the most recently added element is the first one removed.

### Core Operations

- **push(item)** — add an item to the top. O(1)
- **pop()** — remove and return the top item. O(1)
- **peek() / top()** — view the top item without removing it. O(1)
- **isEmpty()** — check if the stack has no elements. O(1)

### Real-World Uses

- **Undo functionality** in text editors — each action pushed onto a stack; undo pops the most recent one.
- **Browser back button** — visited pages pushed onto a stack.
- **Function call stack** — every function call is pushed; when it returns, it's popped. This is literally how recursion works under the hood.
- **Expression evaluation** — checking balanced parentheses, evaluating postfix expressions.

### Example — Balanced Parentheses Check

\\\`\\\`\\\`
function isBalanced(s):
  stack = []
  for char in s:
    if char in "([{":
      stack.push(char)
    else if char in ")]}":
      if stack.isEmpty():
        return false
      top = stack.pop()
      if !matches(top, char):
        return false
  return stack.isEmpty()
\\\`\\\`\\\`

> Example: "({[]})" is balanced. "({[}])" is NOT balanced — the closing brackets appear in the wrong order relative to how they were opened.

### Common Interview Traps

- Forgetting to check if the stack is empty before popping (causes an error).
- Confusing stack (LIFO) behavior with queue (FIFO) behavior.`,
  },
  {
    subject: "dsa",
    type: "note",
    module: "Module 4: Stacks & Queues",
    moduleOrder: 4,
    subtopic: "Queue Basics",
    subtopicOrder: 2,
    title: "Queues — FIFO Data Structure",
    pages: 5,
    body: `## What is a Queue?

A **queue** is a linear data structure that follows **FIFO** (First In, First Out) ordering — the first element added is the first one removed, just like a real-world line/queue.

### Core Operations

- **enqueue(item)** — add an item to the back. O(1)
- **dequeue()** — remove and return the item from the front. O(1)
- **front() / peek()** — view the front item without removing it. O(1)
- **isEmpty()** — check if the queue has no elements. O(1)

### Real-World Uses

- **Task scheduling** — processes handled in the order they arrive.
- **Print queue** — documents printed in the order they were sent.
- **Breadth-First Search (BFS)** in graphs/trees — uses a queue to explore nodes level by level.
- **Message queues** in distributed systems — ensuring ordered processing of events.

### Types of Queues

- **Simple Queue** — strict FIFO, as described above.
- **Circular Queue** — the last position connects back to the first, efficiently reusing freed space in a fixed-size array implementation.
- **Priority Queue** — elements are dequeued based on priority rather than arrival order (often implemented using a heap).
- **Deque (Double-Ended Queue)** — allows insertion and removal from both ends.

> Example: In a BFS traversal of a tree, you enqueue the root, then repeatedly dequeue a node, process it, and enqueue its children — this naturally visits nodes level by level.

### Common Interview Traps

- Confusing FIFO (queue) with LIFO (stack) — a very common mix-up under interview pressure.
- Implementing a queue naively with an array's \\\`shift()\\\` operation, which is O(n) — a proper queue implementation should keep enqueue/dequeue at O(1), often using a linked list or two-pointer circular buffer.`,
  },

  // ══ PDFs ══
  {
    subject: "dsa",
    type: "pdf",
    module: "Module 1: Arrays & Strings",
    moduleOrder: 1,
    subtopic: "Array Basics",
    subtopicOrder: 1,
    title: "Arrays — Fundamentals (PDF)",
    size: "4 KB",
    pages: 2,
    url: "https://res.cloudinary.com/z0rwkmhq/image/upload/v1783064366/Arrays_Fundamentalss.pdf",
  },
  {
    subject: "dsa",
    type: "pdf",
    module: "Module 2: Linked Lists",
    moduleOrder: 2,
    subtopic: "Singly Linked List",
    subtopicOrder: 1,
    title: "Linked Lists — Quick Reference (PDF)",
    size: "150 KB",
    pages: 4,
    url: "",
  },
  {
    subject: "dsa",
    type: "pdf",
    module: "Module 4: Stacks & Queues",
    moduleOrder: 4,
    subtopic: "Stack Basics",
    subtopicOrder: 1,
    title: "Stacks & Queues Cheat Sheet (PDF)",
    size: "165 KB",
    pages: 3,
    url: "",
  },

  // ══ RESOURCES ══
  {
    subject: "dsa",
    type: "resource",
    title: "GeeksforGeeks — DSA Self Paced Course",
    source: "GeeksforGeeks",
    url: "https://www.geeksforgeeks.org/data-structures/",
  },
  {
    subject: "dsa",
    type: "resource",
    title: "NeetCode — DSA Roadmap (Free)",
    source: "NeetCode.io",
    url: "https://neetcode.io/roadmap",
  },

  // ══ QUIZZES ══
  {
    subject: "dsa",
    type: "quiz",
    title: "Arrays & Strings Basics",
    time: "10 min",
    difficulty: "Easy",
    questionBank: [
      {
        questionText: "What is the time complexity of accessing an element by index in an array?",
        options: ["O(1)", "O(n)", "O(log n)", "O(n^2)"],
        correctAnswerIndex: 0,
      },
      {
        questionText: "What is the time complexity of inserting an element at the beginning of an array?",
        options: ["O(1)", "O(n)", "O(log n)", "O(1) amortized"],
        correctAnswerIndex: 1,
      },
      {
        questionText: "Which data structure would you use to reverse a string efficiently?",
        options: ["Queue", "Stack", "Array only", "Linked List only"],
        correctAnswerIndex: 1,
      },
    ],
  },
  {
    subject: "dsa",
    type: "quiz",
    title: "Linked List Deep Dive",
    time: "12 min",
    difficulty: "Medium",
    questionBank: [
      {
        questionText: "What is the time complexity of inserting a node at the head of a singly linked list?",
        options: ["O(1)", "O(n)", "O(log n)", "O(n^2)"],
        correctAnswerIndex: 0,
      },
      {
        questionText: "In a doubly linked list, each node has:",
        options: ["Only a next pointer", "Only a previous pointer", "Both next and previous pointers", "No pointers"],
        correctAnswerIndex: 2,
      },
    ],
  },
  {
    subject: "dsa",
    type: "quiz",
    title: "Stacks & Queues Quiz",
    time: "8 min",
    difficulty: "Easy",
    questionBank: [
      {
        questionText: "A stack follows which ordering principle?",
        options: ["FIFO", "LIFO", "Random", "Priority-based"],
        correctAnswerIndex: 1,
      },
      {
        questionText: "Which data structure is used in Breadth-First Search (BFS)?",
        options: ["Stack", "Queue", "Array", "Hash Map"],
        correctAnswerIndex: 1,
      },
      {
        questionText: "What does the peek() operation do on a stack?",
        options: ["Removes the top element", "Adds a new element", "Views the top element without removing it", "Empties the stack"],
        correctAnswerIndex: 2,
      },
    ],
  },

  // ══ MCQs ══
  {
    subject: "dsa",
    type: "mcq",
    title: "Time Complexity MCQs",
    time: "8 min",
    difficulty: "Easy",
    questionBank: [
      {
        questionText: "Binary search has a time complexity of:",
        options: ["O(n)", "O(log n)", "O(n log n)", "O(1)"],
        correctAnswerIndex: 1,
      },
      {
        questionText: "Which of these has the best (fastest) time complexity?",
        options: ["O(n^2)", "O(n log n)", "O(log n)", "O(n)"],
        correctAnswerIndex: 2,
      },
    ],
  },
  {
    subject: "dsa",
    type: "mcq",
    title: "Data Structures Mixed MCQs",
    time: "10 min",
    difficulty: "Medium",
    questionBank: [
      {
        questionText: "Which data structure would be least efficient for frequent insertions at the beginning?",
        options: ["Linked List", "Array", "Stack (via linked list)", "Doubly Linked List"],
        correctAnswerIndex: 1,
      },
      {
        questionText: "What is the space complexity of an in-place array reversal using two pointers?",
        options: ["O(n)", "O(log n)", "O(n^2)", "O(1)"],
        correctAnswerIndex: 3,
      },
    ],
  },

  // ══ INTERVIEW QUESTIONS ══
  {
    subject: "dsa",
    type: "interviewQuestion",
    module: "Module 1: Arrays & Strings",
    moduleOrder: 1,
    subtopic: "Array Basics",
    subtopicOrder: 1,
    question: "What is the difference between an array and a linked list?",
    answer:
      "An array stores elements in contiguous memory, allowing O(1) random access but O(n) insertion/deletion (since elements must shift). A linked list stores elements as nodes connected by pointers, giving O(1) insertion/deletion at a known position but O(n) access time (must traverse from the head).",
  },
  {
    subject: "dsa",
    type: "interviewQuestion",
    module: "Module 2: Linked Lists",
    moduleOrder: 2,
    subtopic: "Singly Linked List",
    subtopicOrder: 1,
    question: "How do you reverse a linked list?",
    answer:
      "Use three pointers: previous (starts as null), current (starts at head), and next. Iterate through the list — for each node, save current.next, point current.next to previous, then move previous and current one step forward. When current becomes null, previous is the new head. This runs in O(n) time and O(1) space.",
  },
  {
    subject: "dsa",
    type: "interviewQuestion",
    module: "Module 4: Stacks & Queues",
    moduleOrder: 4,
    subtopic: "Stack Basics",
    subtopicOrder: 1,
    question: "What is a stack, and where is it used in real applications?",
    answer:
      "A stack is a LIFO (Last In, First Out) data structure supporting push and pop operations. Real uses include: the 'undo' feature in text editors, browser back-button history, function call stacks during recursion, and expression evaluation (e.g., checking balanced parentheses).",
  },
  {
    subject: "dsa",
    type: "interviewQuestion",
    module: "Module 4: Stacks & Queues",
    moduleOrder: 4,
    subtopic: "Queue Basics",
    subtopicOrder: 2,
    question: "How would you implement a queue using two stacks?",
    answer:
      "Use two stacks: an 'inbox' stack for enqueue operations and an 'outbox' stack for dequeue operations. To enqueue, push onto the inbox stack (O(1)). To dequeue, if the outbox stack is empty, pop everything from inbox and push it onto outbox (reversing the order), then pop from outbox. This gives amortized O(1) time per operation, since each element is moved between stacks at most once.",
  },
  {
    subject: "dsa",
    type: "interviewQuestion",
    module: "Module 3: Complexity Analysis",
    moduleOrder: 3,
    subtopic: "Big-O Notation",
    subtopicOrder: 1,
    question: "What is the difference between time complexity and space complexity?",
    answer:
      "Time complexity measures how the running time of an algorithm grows as input size increases. Space complexity measures how much extra memory (beyond the input itself) the algorithm requires as input size grows. An algorithm can be fast but memory-hungry (e.g., using a hash map for O(1) lookups at the cost of O(n) extra space), or slow but memory-efficient — these are often direct trade-offs a candidate is expected to discuss.",
  },

  // ══ MOCK TEST ══
  {
    subject: "dsa",
    type: "mockTest",
    title: "DSA Full Mock Test — Beginner",
    duration: 20,
    attempts: 0,
    positiveMarks: 1,
    negativeMarks: 0.33,
    questionBank: [
      {
        questionText: "What is the time complexity of accessing an element by index in an array?",
        options: ["O(1)", "O(n)", "O(log n)", "O(n^2)"],
        correctAnswerIndex: 0,
      },
      {
        questionText: "Which data structure uses LIFO (Last In, First Out) ordering?",
        options: ["Queue", "Stack", "Array", "Linked List"],
        correctAnswerIndex: 1,
      },
      {
        questionText: "What is the worst-case time complexity of Binary Search?",
        options: ["O(1)", "O(n)", "O(log n)", "O(n log n)"],
        correctAnswerIndex: 2,
      },
      {
        questionText: "In a singly linked list, what does the last node's 'next' pointer point to?",
        options: ["The head node", "Itself", "null", "The second-to-last node"],
        correctAnswerIndex: 2,
      },
      {
        questionText: "Which sorting algorithm has the best average-case time complexity?",
        options: ["Bubble Sort O(n^2)", "Merge Sort O(n log n)", "Selection Sort O(n^2)", "Insertion Sort O(n^2)"],
        correctAnswerIndex: 1,
      },
      {
        questionText: "What data structure is typically used to implement recursion internally?",
        options: ["Queue", "Heap", "Stack", "Graph"],
        correctAnswerIndex: 2,
      },
      {
        questionText: "What is the space complexity of an in-place array reversal using two pointers?",
        options: ["O(n)", "O(log n)", "O(n^2)", "O(1)"],
        correctAnswerIndex: 3,
      },
      {
        questionText: "Which of the following is NOT a linear data structure?",
        options: ["Array", "Linked List", "Tree", "Stack"],
        correctAnswerIndex: 2,
      },
      {
        questionText: "What is the time complexity of inserting an element at the end of a dynamic array (amortized)?",
        options: ["O(1)", "O(n)", "O(log n)", "O(n^2)"],
        correctAnswerIndex: 0,
      },
      {
        questionText: "A doubly linked list allows traversal in:",
        options: ["Forward direction only", "Backward direction only", "Both directions", "Neither direction"],
        correctAnswerIndex: 2,
      },
    ],
  },
];

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB Atlas");

    await Content.deleteMany({ subject: "dsa" });
    console.log("🗑️  Cleared old DSA content");

    await Content.insertMany(dsaContent);
    console.log(`✅ Inserted ${dsaContent.length} DSA content items`);

    await mongoose.disconnect();
    console.log("👋 Done, disconnected");
    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding failed:", error.message);
    process.exit(1);
  }
};

seed();