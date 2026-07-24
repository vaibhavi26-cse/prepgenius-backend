import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import Content from "./models/Content.js";

const osContent = [
  // ══ NOTES ══
  {
    subject: "os",
    type: "note",
    module: "Module 1: OS Fundamentals & Processes",
    moduleOrder: 1,
    subtopic: "Introduction to Operating Systems",
    subtopicOrder: 1,
    title: "What is an Operating System?",
    pages: 6,
    body: `## What is an Operating System?

An **Operating System (OS)** is system software that manages computer hardware and software resources, and provides common services for application programs. It acts as an intermediary between the user/applications and the hardware.

### Key Responsibilities

- **Process Management** — creating, scheduling, and terminating processes.
- **Memory Management** — allocating and freeing memory as processes need it.
- **File System Management** — organizing and controlling access to files on storage.
- **Device Management** — controlling I/O devices via drivers.
- **Security & Access Control** — protecting resources from unauthorized access.

### Types of Operating Systems

| Type | Description |
|---|---|
| Batch OS | Executes jobs in batches with no user interaction during execution |
| Time-Sharing OS | Allocates CPU time slices so multiple users feel like they have the CPU to themselves |
| Distributed OS | Manages a group of independent computers as a single system |
| Real-Time OS | Guarantees processing within strict time constraints (used in embedded systems) |

### System Calls

A **system call** is how a program requests a service from the OS kernel — for example, reading a file, creating a process, or allocating memory.

\\\`\\\`\\\`
fd = open("file.txt")   // system call: request file access
read(fd, buffer, size)  // system call: read data
close(fd)               // system call: release resource
\\\`\\\`\\\`

> Example: When you run \\\`printf\\\` in C, the underlying \\\`write()\\\` system call is what actually hands your text over to the OS to display on the terminal.

### Kernel Modes

- **User Mode** — restricted mode where applications run; cannot directly access hardware.
- **Kernel Mode** — privileged mode where the OS has full access to hardware and memory.

A **mode switch** happens whenever a system call is made, moving execution from user mode to kernel mode and back.

### Common Interview Traps

- Confusing "OS" with just the kernel — the OS includes the kernel plus system utilities, libraries, and interfaces.
- Forgetting that system calls are the *only* sanctioned way for user programs to interact with hardware.`,
  },
  {
    subject: "os",
    type: "note",
    module: "Module 1: OS Fundamentals & Processes",
    moduleOrder: 1,
    subtopic: "Process vs Thread",
    subtopicOrder: 2,
    title: "Processes and Threads",
    pages: 7,
    body: `## Processes and Threads

A **process** is a program in execution — it has its own memory space, including code, data, heap, and stack. A **thread** is the smallest unit of execution within a process, and multiple threads within the same process share that process's memory space.

### Process States

\\\`\\\`\\\`
New -> Ready -> Running -> Waiting -> Terminated
                  ^  |
                  |  v
                Ready (after time slice / I/O wait ends)
\\\`\\\`\\\`

- **New** — process is being created.
- **Ready** — waiting to be assigned to the CPU.
- **Running** — currently executing on the CPU.
- **Waiting** — blocked, usually waiting for I/O.
- **Terminated** — finished execution.

### Process Control Block (PCB)

The OS maintains a **PCB** for every process, storing its process ID, state, program counter, register values, memory limits, and open file list. This is what allows the OS to pause a process and resume it later exactly where it left off.

### Process vs Thread

| Aspect | Process | Thread |
|---|---|---|
| Memory | Separate address space | Shares address space with sibling threads |
| Creation Cost | Expensive (heavy) | Cheap (lightweight) |
| Communication | Needs IPC (pipes, sockets, shared memory) | Direct (shared variables) |
| Crash Impact | One process crashing doesn't affect others | One thread crashing can bring down the whole process |

> Example: A web browser typically runs each tab as a separate **process** (so one crashing tab doesn't crash the whole browser), while within a tab, rendering and JavaScript execution may use separate **threads** that share that tab's memory.

### Context Switching

A **context switch** is the act of saving the state of a currently running process/thread (into its PCB) and loading the state of the next one to run. This has overhead — time spent context switching is time not spent doing useful work.

### Common Interview Traps

- Saying threads have "no memory of their own" — each thread still has its own stack and registers, only the heap/data/code segments are shared.
- Underestimating context-switch overhead when comparing multi-process vs multi-threaded designs.`,
  },
  {
    subject: "os",
    type: "note",
    module: "Module 2: CPU Scheduling",
    moduleOrder: 2,
    subtopic: "CPU Scheduling Algorithms",
    subtopicOrder: 1,
    title: "CPU Scheduling Algorithms",
    pages: 8,
    body: `## CPU Scheduling Algorithms

The **CPU scheduler** decides which process in the ready queue gets the CPU next. Good scheduling maximizes CPU utilization and throughput while minimizing waiting time and response time.

### Common Algorithms

**1. First-Come, First-Served (FCFS)**

Processes are executed in the order they arrive. Simple but can cause the **convoy effect** — short processes stuck waiting behind one long process.

**2. Shortest Job First (SJF)**

Picks the process with the smallest burst time next. Optimal for minimizing average waiting time, but requires knowing burst times in advance, which is often unrealistic.

**3. Round Robin (RR)**

Each process gets a fixed **time quantum**. If it doesn't finish, it's moved to the back of the ready queue.

\\\`\\\`\\\`
Ready Queue: [P1, P2, P3]   Quantum = 4ms

P1 runs 4ms -> not done -> back of queue
P2 runs 4ms -> not done -> back of queue
P3 runs 4ms -> done -> removed
P1 runs remaining time -> ...
\\\`\\\`\\\`

A small quantum improves response time but increases context-switch overhead; a large quantum behaves closer to FCFS.

**4. Priority Scheduling**

Each process is assigned a priority; the highest-priority process runs first. Risk: **starvation** of low-priority processes, usually solved with **aging** (gradually increasing the priority of processes that have waited a long time).

### Comparison Table

| Algorithm | Preemptive? | Best For | Weakness |
|---|---|---|---|
| FCFS | No | Simplicity | Convoy effect |
| SJF | Can be either | Minimizing avg. wait time | Needs burst time prediction |
| Round Robin | Yes | Fair time-sharing systems | Overhead from frequent switching |
| Priority | Can be either | Urgent/critical tasks | Starvation without aging |

> Example: In an interactive OS like a desktop system, Round Robin (or a priority-based variant of it) is favored because it keeps the system responsive to many users/apps at once, rather than letting one long computation hog the CPU.

### Common Interview Traps

- Assuming SJF is always achievable in practice — real systems only *estimate* burst time.
- Forgetting that Round Robin's performance depends heavily on choosing a good time quantum.`,
  },
  {
    subject: "os",
    type: "note",
    module: "Module 2: CPU Scheduling",
    moduleOrder: 2,
    subtopic: "Context Switching & Multitasking",
    subtopicOrder: 2,
    title: "Context Switching and Multitasking",
    pages: 5,
    body: `## Context Switching and Multitasking

**Multitasking** gives the illusion that multiple processes are running simultaneously on a single CPU core, by rapidly switching between them.

### What Happens During a Context Switch

1. Save the current process's CPU register values, program counter, and state into its PCB.
2. Select the next process to run (via the scheduler).
3. Load that process's saved state from its PCB into the CPU registers.
4. Resume execution of the new process from where it left off.

### Cost of Context Switching

Context switching is pure overhead — no useful work is done for the user during the switch itself. Costs include:

- Saving/restoring registers and program counter.
- Flushing or reloading the CPU cache and TLB (Translation Lookaside Buffer), since the new process has different memory mappings.
- Scheduler decision-making time.

> Example: If a system context-switches too aggressively (e.g., a time quantum that's too small), the CPU can spend more time switching between processes than actually executing them — degrading overall throughput.

### Multitasking vs Multiprocessing

| Term | Meaning |
|---|---|
| Multitasking | Multiple processes share a single CPU via time-slicing |
| Multiprocessing | Multiple CPUs/cores execute processes truly in parallel |

A modern multi-core system typically uses both: true parallelism across cores, and time-sliced multitasking within each core.

### Common Interview Traps

- Treating "multitasking" and "multiprocessing" as synonyms — they describe different hardware realities.
- Ignoring cache/TLB invalidation costs when discussing why frequent context switches hurt performance.`,
  },
  {
    subject: "os",
    type: "note",
    module: "Module 3: Synchronization & Deadlocks",
    moduleOrder: 3,
    subtopic: "Process Synchronization",
    subtopicOrder: 1,
    title: "Process Synchronization",
    pages: 7,
    body: `## Process Synchronization

When multiple processes or threads access shared data concurrently, **synchronization** ensures they don't interfere with each other in ways that produce incorrect results.

### The Critical Section Problem

A **critical section** is a code segment that accesses shared resources and must not be executed by more than one process/thread at a time. A valid solution must guarantee:

- **Mutual Exclusion** — only one process in the critical section at a time.
- **Progress** — a process not in its critical section can't block others from entering theirs.
- **Bounded Waiting** — a limit on how long a process waits before entering its critical section.

### Race Condition Example

\\\`\\\`\\\`
// Shared variable: balance = 100
// Thread A                Thread B
temp = balance             temp = balance      // both read 100
temp = temp + 50           temp = temp - 30
balance = temp             balance = temp      // one update is lost!
\\\`\\\`\\\`

Without synchronization, the final balance depends on the unpredictable order of execution — this is a **race condition**.

### Semaphores

A **semaphore** is an integer variable, accessed only through atomic \\\`wait()\\\` (decrement) and \\\`signal()\\\` (increment) operations.

- **Binary Semaphore (Mutex)** — value is 0 or 1, used for mutual exclusion.
- **Counting Semaphore** — value can range over a larger set, used to control access to a resource pool (e.g., a fixed number of database connections).

\\\`\\\`\\\`
wait(mutex)      // decrement; block if already 0
  // critical section
signal(mutex)    // increment; wake a waiting process
\\\`\\\`\\\`

### Mutex vs Semaphore

| Aspect | Mutex | Semaphore |
|---|---|---|
| Ownership | Owned by the thread that locked it | No ownership concept |
| Value Range | Locked/unlocked (binary) | Can be any non-negative integer |
| Typical Use | Protecting a single critical section | Managing a pool of limited resources |

> Example: A print spooler using a counting semaphore set to 3 would allow up to 3 processes to send jobs to available printers simultaneously, blocking a 4th until one printer frees up.

### Common Interview Traps

- Confusing mutex (ownership-based locking) with a binary semaphore (no ownership) — they behave similarly but aren't identical in every implementation.
- Forgetting that improper semaphore use (e.g., missing a signal()) can itself cause a deadlock.`,
  },
  {
    subject: "os",
    type: "note",
    module: "Module 3: Synchronization & Deadlocks",
    moduleOrder: 3,
    subtopic: "Deadlocks",
    subtopicOrder: 2,
    title: "Deadlocks",
    pages: 7,
    body: `## Deadlocks

A **deadlock** is a state where a set of processes are blocked forever, each waiting for a resource held by another process in the same set.

### The Four Necessary Conditions (Coffman Conditions)

All four must hold simultaneously for a deadlock to occur:

1. **Mutual Exclusion** — at least one resource is held in a non-shareable mode.
2. **Hold and Wait** — a process holding one resource is waiting to acquire another.
3. **No Preemption** — resources can't be forcibly taken away; they must be released voluntarily.
4. **Circular Wait** — a cycle of processes exists, each waiting for a resource held by the next.

### Classic Example

\\\`\\\`\\\`
Process A holds Resource 1, waits for Resource 2
Process B holds Resource 2, waits for Resource 1
// A waits for B, B waits for A -> circular wait -> deadlock
\\\`\\\`\\\`

### Handling Deadlocks

| Strategy | Approach |
|---|---|
| Prevention | Design the system so at least one of the four conditions can never hold |
| Avoidance | Use algorithms like Banker's Algorithm to only grant requests that keep the system in a "safe state" |
| Detection & Recovery | Allow deadlocks to occur, detect them (via resource allocation graphs), then recover by killing/rolling back a process |
| Ignorance (Ostrich Algorithm) | Assume deadlocks are rare enough to not be worth handling (used by some general-purpose OSes like Windows/Linux for most resources) |

### Banker's Algorithm (Avoidance)

Before granting a resource request, the OS simulates whether granting it could still leave the system in a **safe state** (i.e., a state where all processes could eventually finish). If not, the request is denied or delayed.

> Example: If granting Process A's request for 2 more memory units would leave the system unable to satisfy any process's maximum future need, the Banker's Algorithm denies that request even though the resources are currently available.

### Common Interview Traps

- Saying deadlock prevention and avoidance are the same thing — prevention removes a condition structurally; avoidance makes runtime decisions to dodge unsafe states.
- Forgetting that removing just **one** of the four Coffman conditions is enough to prevent deadlock.`,
  },
  {
    subject: "os",
    type: "note",
    module: "Module 4: Memory Management & File Systems",
    moduleOrder: 4,
    subtopic: "Memory Management",
    subtopicOrder: 1,
    title: "Memory Management: Paging and Segmentation",
    pages: 8,
    body: `## Memory Management: Paging and Segmentation

The OS must allocate physical memory to processes efficiently while keeping them isolated from each other.

### Paging

**Paging** divides physical memory into fixed-size blocks called **frames**, and a process's logical memory into equally-sized **pages**. A **page table** maps each page to its corresponding frame.

\\\`\\\`\\\`
Logical Address = Page Number + Offset
Physical Address = Frame Number (from page table) + Offset
\\\`\\\`\\\`

Paging eliminates **external fragmentation** (since any free frame can hold any page), but can still cause **internal fragmentation** (wasted space if the last page isn't fully used).

### Segmentation

**Segmentation** divides a process's memory into variable-sized logical segments (e.g., code segment, data segment, stack segment), which more closely matches how programmers think about a program's structure. Unlike paging, segments can vary in size, which can lead to **external fragmentation**.

### Paging vs Segmentation

| Aspect | Paging | Segmentation |
|---|---|---|
| Division | Fixed-size pages | Variable-size logical segments |
| Fragmentation | Internal | External |
| Programmer Visibility | Invisible (purely a memory management technique) | Reflects logical program structure |

### Virtual Memory

**Virtual memory** lets a process use more memory than physically available by keeping only actively-used pages in RAM, and swapping the rest to disk. This is managed using **demand paging** — a page is only loaded into memory when it's actually accessed, triggering a **page fault** if it isn't already resident.

### Page Replacement Algorithms

When memory is full and a new page must be loaded, the OS picks a page to evict:

- **FIFO** — evicts the oldest loaded page.
- **LRU (Least Recently Used)** — evicts the page that hasn't been used for the longest time.
- **Optimal** — evicts the page that won't be used for the longest time in the future (theoretical best case, used as a benchmark).

> Example: A system with too few frames relative to its workload can suffer **thrashing** — spending more time swapping pages in and out than executing actual instructions, causing throughput to collapse.

### Common Interview Traps

- Mixing up internal fragmentation (paging) and external fragmentation (segmentation).
- Assuming virtual memory means "unlimited" memory — it's bounded by disk swap space and comes with a real performance cost (page faults).`,
  },
  {
    subject: "os",
    type: "note",
    module: "Module 4: Memory Management & File Systems",
    moduleOrder: 4,
    subtopic: "File Systems",
    subtopicOrder: 2,
    title: "File Systems",
    pages: 6,
    body: `## File Systems

A **file system** defines how data is named, stored, organized, and retrieved on a storage device.

### File Allocation Methods

| Method | Description | Drawback |
|---|---|---|
| Contiguous Allocation | File occupies a contiguous block of disk space | External fragmentation; hard to grow file size |
| Linked Allocation | Each block points to the next block of the file | Slow random access (must follow the chain) |
| Indexed Allocation | A dedicated index block stores pointers to all blocks of the file | Extra overhead for the index block itself |

### Directory Structure

Most modern file systems use a **hierarchical (tree) directory structure**, where directories can contain both files and subdirectories, allowing organized, nested storage.

\\\`\\\`\\\`
/
├── home/
│   └── user/
│       ├── documents/
│       └── downloads/
└── etc/
\\\`\\\`\\\`

### File Operations (via System Calls)

\\\`\\\`\\\`
create(filename)
open(filename, mode)
read(fd, buffer, size)
write(fd, buffer, size)
close(fd)
delete(filename)
\\\`\\\`\\\`

### Disk Scheduling Algorithms

Since disk I/O is relatively slow, the OS schedules pending disk requests to minimize seek time:

- **FCFS** — services requests in arrival order.
- **SSTF (Shortest Seek Time First)** — services the closest request next.
- **SCAN (Elevator Algorithm)** — the disk arm moves in one direction servicing requests, then reverses, like an elevator.

> Example: SCAN is often preferred over SSTF in practice because SSTF can cause **starvation** for requests far from the current head position, while SCAN guarantees every request is eventually serviced as the arm sweeps back and forth.

### Common Interview Traps

- Assuming SSTF always outperforms SCAN — SSTF can starve distant requests indefinitely under heavy, clustered load.
- Confusing indexed allocation's index block with the file's actual data blocks.`,
  },

  // ══ PDFs ══
  {
    subject: "os",
    type: "pdf",
    module: "Module 2: CPU Scheduling",
    moduleOrder: 2,
    subtopic: "CPU Scheduling Algorithms",
    subtopicOrder: 1,
    title: "CPU Scheduling Algorithms — Quick Reference (PDF)",
    size: "195 KB",
    pages: 6,
    url: "",
  },
  {
    subject: "os",
    type: "pdf",
    module: "Module 3: Synchronization & Deadlocks",
    moduleOrder: 3,
    subtopic: "Deadlocks",
    subtopicOrder: 2,
    title: "Deadlock Conditions & Handling Cheat Sheet (PDF)",
    size: "220 KB",
    pages: 5,
    url: "",
  },

  // ══ RESOURCES ══
  {
    subject: "os",
    type: "resource",
    title: "GeeksforGeeks — Operating Systems Tutorial",
    source: "GeeksforGeeks",
    url: "https://www.geeksforgeeks.org/operating-systems/",
  },
  {
    subject: "os",
    type: "resource",
    title: "Operating System Concepts (Silberschatz) — Reference Notes",
    source: "Silberschatz, Galvin, Gagne",
    url: "https://www.os-book.com/",
  },

  // ══ QUIZZES ══
  {
    subject: "os",
    type: "quiz",
    title: "Processes & Threads Quiz",
    time: "6 min",
    difficulty: "Easy",
    questionBank: [
      {
        questionText: "What does a PCB (Process Control Block) store?",
        options: ["Only the process ID", "Process state, PC, registers, and memory info", "Only file handles", "The process's source code"],
        correctAnswerIndex: 1,
      },
      {
        questionText: "Threads within the same process share:",
        options: ["Their own separate stacks only", "The process's memory address space", "Nothing at all", "Only the CPU registers"],
        correctAnswerIndex: 1,
      },
      {
        questionText: "Which state does a process enter when waiting for I/O?",
        options: ["Ready", "Running", "Waiting", "Terminated"],
        correctAnswerIndex: 2,
      },
    ],
  },
  {
    subject: "os",
    type: "quiz",
    title: "CPU Scheduling Quiz",
    time: "8 min",
    difficulty: "Medium",
    questionBank: [
      {
        questionText: "Which scheduling algorithm can cause the convoy effect?",
        options: ["Round Robin", "FCFS", "SJF", "Priority"],
        correctAnswerIndex: 1,
      },
      {
        questionText: "In Round Robin, a smaller time quantum generally leads to:",
        options: ["Worse response time", "Better response time but more overhead", "No change in overhead", "Guaranteed starvation"],
        correctAnswerIndex: 1,
      },
      {
        questionText: "What technique prevents starvation in Priority Scheduling?",
        options: ["Aging", "Paging", "Segmentation", "Swapping"],
        correctAnswerIndex: 0,
      },
    ],
  },
  {
    subject: "os",
    type: "quiz",
    title: "Deadlocks & Synchronization Quiz",
    time: "8 min",
    difficulty: "Medium",
    questionBank: [
      {
        questionText: "Which of the following is NOT one of the four Coffman conditions?",
        options: ["Mutual Exclusion", "Hold and Wait", "Preemption", "Circular Wait"],
        correctAnswerIndex: 2,
      },
      {
        questionText: "A binary semaphore is also commonly called a:",
        options: ["Monitor", "Mutex", "Page table", "PCB"],
        correctAnswerIndex: 1,
      },
      {
        questionText: "The Banker's Algorithm is used for deadlock:",
        options: ["Detection", "Avoidance", "Ignorance", "Compression"],
        correctAnswerIndex: 1,
      },
    ],
  },

  // ══ MCQs ══
  {
    subject: "os",
    type: "mcq",
    module: "Module 1: OS Fundamentals & Processes",
    moduleOrder: 1,
    subtopic: "Introduction to Operating Systems",
    subtopicOrder: 1,
    title: "OS Fundamentals — MCQ Set",
    questionBank: [
      {
        questionText: "What is the primary purpose of a system call?",
        options: ["To compile code", "To let a user program request a service from the kernel", "To install software", "To format the disk"],
        correctAnswerIndex: 1,
      },
      {
        questionText: "Which mode gives full access to hardware?",
        options: ["User mode", "Kernel mode", "Guest mode", "Safe mode"],
        correctAnswerIndex: 1,
      },
      {
        questionText: "A Real-Time OS is best suited for:",
        options: ["General desktop use", "Systems with strict timing guarantees", "Batch processing only", "Multi-user time sharing only"],
        correctAnswerIndex: 1,
      },
      {
        questionText: "What triggers a switch from user mode to kernel mode?",
        options: ["A variable declaration", "A system call", "A loop", "A comment"],
        correctAnswerIndex: 1,
      },
    ],
  },
  {
    subject: "os",
    type: "mcq",
    module: "Module 4: Memory Management & File Systems",
    moduleOrder: 4,
    subtopic: "Memory Management",
    subtopicOrder: 1,
    title: "Memory Management — MCQ Set",
    questionBank: [
      {
        questionText: "Paging can cause which type of fragmentation?",
        options: ["External", "Internal", "Circular", "Logical"],
        correctAnswerIndex: 1,
      },
      {
        questionText: "What is a page fault?",
        options: ["A syntax error", "An attempt to access a page not currently in memory", "A hardware crash", "A full disk"],
        correctAnswerIndex: 1,
      },
      {
        questionText: "Thrashing occurs when:",
        options: ["The CPU is idle", "The system spends more time swapping pages than executing", "All pages fit in memory", "The disk is defragmented"],
        correctAnswerIndex: 1,
      },
      {
        questionText: "Which page replacement algorithm evicts the page unused for the longest time?",
        options: ["FIFO", "LRU", "Optimal", "Random"],
        correctAnswerIndex: 1,
      },
    ],
  },

  // ══ INTERVIEW QUESTIONS ══
  {
    subject: "os",
    type: "interviewQuestion",
    module: "Module 1: OS Fundamentals & Processes",
    moduleOrder: 1,
    subtopic: "Process vs Thread",
    subtopicOrder: 2,
    question: "What is the difference between a process and a thread?",
    answer:
      "A process is an independent program in execution with its own memory address space (code, data, heap, stack). A thread is a lightweight unit of execution within a process, and threads in the same process share that process's memory space (heap, code, data) while each still keeps its own stack and register set. Because threads share memory, communication between them is cheaper than inter-process communication, but a crash in one thread can affect the whole process, whereas one process crashing doesn't affect others.",
  },
  {
    subject: "os",
    type: "interviewQuestion",
    module: "Module 2: CPU Scheduling",
    moduleOrder: 2,
    subtopic: "CPU Scheduling Algorithms",
    subtopicOrder: 1,
    question: "Explain Round Robin scheduling and how the time quantum affects performance.",
    answer:
      "Round Robin assigns each process a fixed time quantum on the CPU in a cyclic order; if a process doesn't finish within its quantum, it's preempted and moved to the back of the ready queue. A small time quantum improves response time and fairness (good for interactive systems) but increases context-switch overhead since the CPU switches processes more often. A large time quantum reduces overhead but makes the system behave more like FCFS, hurting responsiveness. Choosing a good quantum is a tradeoff between responsiveness and overhead.",
  },
  {
    subject: "os",
    type: "interviewQuestion",
    module: "Module 3: Synchronization & Deadlocks",
    moduleOrder: 3,
    subtopic: "Deadlocks",
    subtopicOrder: 2,
    question: "What are the four necessary conditions for a deadlock, and how does the Banker's Algorithm help avoid it?",
    answer:
      "The four Coffman conditions are: Mutual Exclusion (resources are non-shareable), Hold and Wait (a process holds one resource while waiting for another), No Preemption (resources can't be forcibly taken away), and Circular Wait (a cycle of processes each waiting on the next). All four must hold simultaneously for deadlock to occur. The Banker's Algorithm avoids deadlock by simulating whether granting a resource request would leave the system in a 'safe state' (one where all processes could still eventually complete); if not, it denies or delays that request, ensuring the system never enters an unsafe state that could lead to deadlock.",
  },
  {
    subject: "os",
    type: "interviewQuestion",
    module: "Module 3: Synchronization & Deadlocks",
    moduleOrder: 3,
    subtopic: "Process Synchronization",
    subtopicOrder: 1,
    question: "What is a race condition, and how does a mutex prevent it?",
    answer:
      "A race condition occurs when multiple threads/processes access and modify shared data concurrently, and the final result depends on the unpredictable timing/order of their execution, often producing incorrect results (e.g., a lost update). A mutex (mutual exclusion lock) prevents this by ensuring only one thread can enter the critical section (the code that accesses the shared data) at a time — any other thread attempting to enter must wait until the mutex is released, eliminating the possibility of two threads reading and writing the shared data simultaneously.",
  },
  {
    subject: "os",
    type: "interviewQuestion",
    module: "Module 4: Memory Management & File Systems",
    moduleOrder: 4,
    subtopic: "Memory Management",
    subtopicOrder: 1,
    question: "What is the difference between paging and segmentation?",
    answer:
      "Paging divides physical memory into fixed-size frames and a process's logical memory into equal-sized pages, mapped via a page table; since any free frame can hold any page, paging eliminates external fragmentation but can waste space within the last page (internal fragmentation). Segmentation divides a process into variable-sized logical segments (like code, data, and stack) that map more naturally to how a program is structured, but because segments vary in size, segmentation can suffer from external fragmentation as free memory becomes broken into scattered, oddly-sized gaps.",
  },

  // ══ MOCK TEST ══
  {
    subject: "os",
    type: "mockTest",
    title: "OS Full Mock Test — Beginner",
    duration: 20,
    attempts: 0,
    positiveMarks: 1,
    negativeMarks: 0.33,
    questionBank: [
      {
        questionText: "What does OS stand for?",
        options: ["Operating System", "Operational Software", "Order Sequence", "Object Storage"],
        correctAnswerIndex: 0,
      },
      {
        questionText: "Which of these is NOT one of the process states?",
        options: ["New", "Ready", "Compiled", "Terminated"],
        correctAnswerIndex: 2,
      },
      {
        questionText: "Which scheduling algorithm is non-preemptive by definition?",
        options: ["Round Robin", "FCFS", "Multilevel Feedback Queue", "Preemptive Priority"],
        correctAnswerIndex: 1,
      },
      {
        questionText: "A binary semaphore is functionally closest to a:",
        options: ["Page table", "Mutex", "PCB", "Frame"],
        correctAnswerIndex: 1,
      },
      {
        questionText: "Which of the four Coffman conditions involves a cycle of waiting processes?",
        options: ["Mutual Exclusion", "Hold and Wait", "No Preemption", "Circular Wait"],
        correctAnswerIndex: 3,
      },
      {
        questionText: "Paging primarily helps eliminate which type of fragmentation?",
        options: ["Internal", "External", "Both equally", "Neither"],
        correctAnswerIndex: 1,
      },
      {
        questionText: "What is thrashing?",
        options: ["A CPU overheating issue", "Excessive page swapping that hurts performance", "A disk formatting error", "A type of deadlock"],
        correctAnswerIndex: 1,
      },
      {
        questionText: "Which disk scheduling algorithm is known as the 'elevator algorithm'?",
        options: ["FCFS", "SSTF", "SCAN", "Priority"],
        correctAnswerIndex: 2,
      },
      {
        questionText: "What does the Banker's Algorithm help with?",
        options: ["CPU scheduling", "Deadlock avoidance", "File compression", "Thread creation"],
        correctAnswerIndex: 1,
      },
      {
        questionText: "Which allocation method uses a dedicated index block per file?",
        options: ["Contiguous Allocation", "Linked Allocation", "Indexed Allocation", "Segmented Allocation"],
        correctAnswerIndex: 2,
      },
    ],
  },
];

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB Atlas");

    await Content.deleteMany({ subject: "os" });
    console.log("🗑️  Cleared old OS content");

    await Content.insertMany(osContent);
    console.log(`✅ Inserted ${osContent.length} OS content items`);

    await mongoose.disconnect();
    console.log("👋 Done, disconnected");
    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding failed:", error.message);
    process.exit(1);
  }
};

seed();