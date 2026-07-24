import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import Content from "./models/Content.js";

const interviewPrepContent = [
  // ══ NOTES ══
  {
    subject: "interview",
    type: "note",
    module: "Module 1: HR & Behavioral Interviews",
    moduleOrder: 1,
    subtopic: "Common HR Questions",
    subtopicOrder: 1,
    title: "Common HR Interview Questions",
    pages: 6,
    body: `## Common HR Interview Questions

HR rounds evaluate fit, communication, and self-awareness rather than technical depth. Most HR questions fall into a small set of recurring categories.

### "Tell Me About Yourself"

This is almost always the opening question. A strong answer follows a simple structure:

\\\`\\\`\\\`
Present  -> What you currently do (student/role, key skills)
Past     -> Relevant background that led here (projects, internships)
Future   -> Why you're excited about this specific opportunity
\\\`\\\`\\\`

> Example: "I'm a final-year CS student focused on full-stack web development — I've built a placement-prep platform end-to-end, from the React frontend to the Node/MongoDB backend. Before that, I worked on a few smaller projects that got me comfortable with the whole stack. I'm looking to join a team where I can keep building production-quality software and keep learning from experienced engineers."

### "Why Should We Hire You?"

Focus on a specific, verifiable strength backed by evidence — not generic claims like "I'm hardworking."

> Example: Instead of "I'm a fast learner," say "When I needed to add real-time features to my project, I learned WebSockets from scratch in a few days and shipped a working live-progress-tracking feature."

### "Where Do You See Yourself in 5 Years?"

Interviewers are checking for realistic ambition and alignment with the role — not testing whether you can predict the future exactly.

### Common Traps

- Giving a rehearsed, generic answer that could apply to any candidate — always anchor answers in specific, personal examples.
- Badmouthing a previous college, team, or project when asked about a negative experience — always frame it constructively (what you learned).
- Forgetting to prepare 2–3 thoughtful questions to ask the interviewer at the end — not doing so can read as lack of genuine interest.`,
  },
  {
    subject: "interview",
    type: "note",
    module: "Module 1: HR & Behavioral Interviews",
    moduleOrder: 1,
    subtopic: "Behavioral Interview Techniques",
    subtopicOrder: 2,
    title: "The STAR Method for Behavioral Questions",
    pages: 6,
    body: `## The STAR Method for Behavioral Questions

Behavioral questions ask you to describe how you handled a real past situation — usually starting with "Tell me about a time when..." The **STAR method** structures a clear, complete answer.

### STAR Breakdown

| Letter | Meaning |
|---|---|
| **S**ituation | Set the context briefly — what was going on? |
| **T**ask | What were you specifically responsible for? |
| **A**ction | What did *you* actually do (not the team in general)? |
| **R**esult | What was the outcome — ideally with a measurable impact? |

### Worked Example

**Question:** "Tell me about a time you faced a conflict while working on a project."

\\\`\\\`\\\`
Situation: While building my placement-prep platform, a feature I was
implementing needed a database schema that a teammate had already
designed differently for another module.

Task: I needed to align our approaches without redoing either
person's work unnecessarily.

Action: I set up a quick discussion, laid out both schemas side by
side, and proposed a shared structure that satisfied both use cases
with minimal rework.

Result: We merged into one consistent schema within a day, avoided
duplicate models, and the shared approach ended up making later
features easier to build.
\\\`\\\`\\\`

### Common Behavioral Question Themes

- Handling conflict or disagreement.
- Making a mistake and how you recovered.
- Working under a tight deadline.
- Taking initiative without being asked.
- Handling failure or receiving critical feedback.

### Common Traps

- Spending too much time on "Situation" and rushing "Action" and "Result" — the action you personally took is the most important part.
- Choosing an example where the "result" was purely negative with no learning or recovery — always end on a constructive note.`,
  },
  {
    subject: "interview",
    type: "note",
    module: "Module 2: Technical Interview Preparation",
    moduleOrder: 2,
    subtopic: "Approaching Coding Interview Questions",
    subtopicOrder: 1,
    title: "How to Approach a Coding Interview Question",
    pages: 7,
    body: `## How to Approach a Coding Interview Question

Interviewers evaluate your problem-solving *process* as much as your final code — jumping straight to coding without a plan is one of the most common mistakes candidates make.

### The Recommended Flow

\\\`\\\`\\\`
1. Clarify   -> Ask questions about edge cases, input size, constraints
2. Plan      -> State your approach out loud before coding
3. Code      -> Write clean, working code, narrating as you go
4. Test      -> Walk through your code with a sample input
5. Optimize  -> Discuss time/space complexity and possible improvements
\\\`\\\`\\\`

### Clarifying Questions Matter

> Example: For "find the two numbers in an array that sum to a target," ask: Can the array contain duplicates? Is it guaranteed there's exactly one solution? Can numbers be negative? These questions often reveal edge cases the interviewer specifically wants you to consider.

### Thinking Out Loud

Interviewers can't see your reasoning if you code in silence. Narrate your thought process — mention the brute-force approach first, explain its complexity, then explain why and how you're optimizing it.

> Example: "The brute force here would be checking every pair, which is O(n²). But if I use a hash map to store numbers I've already seen, I can check for the complement in O(1) each time, bringing it down to O(n) overall."

### Handling a Stuck Moment

If you get stuck, it's better to say what you're thinking ("I know a hash map often helps with lookup problems like this, let me think about how to apply it here") than to go silent — interviewers often give hints if you show your reasoning.

### Common Traps

- Coding immediately without stating an approach — interviewers may stop you and ask you to explain first, which can throw off your rhythm.
- Not testing your code with an example at the end, missing an obvious bug that a quick walkthrough would have caught.`,
  },
  {
    subject: "interview",
    type: "note",
    module: "Module 2: Technical Interview Preparation",
    moduleOrder: 2,
    subtopic: "System Design Basics",
    subtopicOrder: 2,
    title: "System Design Interview Basics",
    pages: 7,
    body: `## System Design Interview Basics

System design interviews assess how you'd architect a large-scale system — common for more senior roles, but increasingly asked even at entry level in a lighter form.

### A General Framework

\\\`\\\`\\\`
1. Clarify requirements   -> functional + non-functional (scale, latency)
2. Estimate scale          -> users, requests/sec, data size
3. High-level design       -> draw the major components and data flow
4. Deep dive               -> pick 1-2 components and go into detail
5. Discuss trade-offs      -> bottlenecks, failure points, scaling options
\\\`\\\`\\\`

### Functional vs Non-Functional Requirements

| Type | Focus | Example |
|---|---|---|
| Functional | What the system should do | "Users can post and view content" |
| Non-Functional | How well it should do it | "Must handle 10,000 requests/sec with under 200ms latency" |

### Common Building Blocks

- **Load Balancer** — distributes incoming traffic across multiple servers.
- **Cache** — stores frequently accessed data in fast memory (e.g., Redis) to reduce database load.
- **Database Replication** — copies of a database (read replicas) to handle heavy read traffic.
- **Message Queue** — decouples services by letting them communicate asynchronously (e.g., for sending notifications).

> Example: A basic URL-shortener system design would cover: a hash function to generate short codes, a database to map short codes to original URLs, a cache for frequently accessed URLs, and a simple API layer for creating and resolving short links.

### Common Traps

- Diving into deep technical detail before clarifying requirements and scale — the "right" design depends heavily on expected load.
- Presenting only one design with no discussion of trade-offs — interviewers want to see you reason about alternatives, not just present a single "correct" answer.`,
  },
  {
    subject: "interview",
    type: "note",
    module: "Module 3: Resume & Communication",
    moduleOrder: 3,
    subtopic: "Resume Building",
    subtopicOrder: 1,
    title: "Building an Effective Technical Resume",
    pages: 6,
    body: `## Building an Effective Technical Resume

A resume's job is to get you an interview — not to describe your entire career in exhaustive detail. Clarity and relevance matter more than length.

### The XYZ Formula for Bullet Points

A strong resume bullet describes: **what you accomplished (X)**, measured by **some metric (Y)**, by doing **some action (Z)**.

\\\`\\\`\\\`
Format: "Accomplished [X] as measured by [Y], by doing [Z]"

Weak:   "Worked on backend APIs for a project."
Strong: "Reduced API response time by 40% by adding Redis caching
         to the 3 most frequently hit endpoints."
\\\`\\\`\\\`

### What to Prioritize on a Student/Fresher Resume

| Section | Priority |
|---|---|
| Projects | High — the main evidence of practical skill for students |
| Skills | High — but list only what you can actually discuss in depth |
| Education | Medium — relevant but usually brief for technical roles |
| Certifications | Low-Medium — only include ones directly relevant to the role |

### Common Formatting Guidelines

- Keep it to **one page** for early-career candidates.
- Use consistent formatting (same date format, same bullet style throughout).
- Avoid generic objective statements ("Seeking a challenging role...") — they add no information.
- List technologies you've actually used meaningfully, not every framework you've briefly touched.

> Example: Listing "React, Node.js, MongoDB, Express" for a project you actually built end-to-end is far stronger than a long, vague list of technologies you've only skimmed a tutorial on — interviewers often probe the first few skills listed.

### Common Traps

- Listing skills you can't back up in a follow-up conversation — this is one of the fastest ways to lose credibility mid-interview.
- Using passive, vague language ("Responsible for...") instead of strong action verbs ("Built," "Reduced," "Designed").`,
  },
  {
    subject: "interview",
    type: "note",
    module: "Module 3: Resume & Communication",
    moduleOrder: 3,
    subtopic: "Communication & Group Discussions",
    subtopicOrder: 2,
    title: "Communication Skills and Group Discussions",
    pages: 6,
    body: `## Communication Skills and Group Discussions

Beyond technical ability, interviewers assess how clearly you communicate — both one-on-one and in group settings like Group Discussions (GDs), common in many campus placement processes.

### Structuring a Clear Spoken Answer

A simple, reliable structure for almost any interview answer:

\\\`\\\`\\\`
1. Direct answer first (don't bury the point)
2. Brief supporting explanation or example
3. Optional: a short takeaway or connection back to the role
\\\`\\\`\\\`

> Example: Asked "What's your biggest strength?" — lead with "Breaking down complex problems into smaller, testable pieces," then give one concrete example, rather than starting with a long story and only revealing the strength at the end.

### Group Discussion Basics

A GD typically evaluates: content knowledge, clarity of expression, ability to listen, and leadership/collaboration — not just who talks the most.

| What Evaluators Look For | What to Avoid |
|---|---|
| Clear, structured points | Repeating what others already said |
| Actively building on others' points | Interrupting or talking over others |
| Bringing in relevant facts/examples | Dominating the discussion aggressively |
| Summarizing or moving the discussion forward | Staying silent the entire time |

### Active Listening

Referencing a previous speaker's point before adding your own ("Building on what X said about scalability, I'd add that...") signals both listening skill and collaborative thinking — a strong positive signal in group settings.

### Common Traps

- Assuming more talking time equals a better score — quality and relevance of contribution matter far more than quantity.
- Going in with a rigid pre-planned speech instead of genuinely engaging with what others say, which can come across as not actually listening.`,
  },
  {
    subject: "interview",
    type: "note",
    module: "Module 4: Company Research & Final Rounds",
    moduleOrder: 4,
    subtopic: "Researching Companies & Roles",
    subtopicOrder: 1,
    title: "Researching Companies Before an Interview",
    pages: 5,
    body: `## Researching Companies Before an Interview

Walking into an interview with genuine knowledge of the company signals real interest and helps you tailor your answers.

### What to Research

| Area | Why It Matters |
|---|---|
| Products/Services | Lets you speak specifically about what the company builds |
| Tech Stack | Helps you connect your skills to their actual tools |
| Recent News | Shows you're engaged with where the company is headed |
| Company Values/Culture | Helps you answer "why us" authentically |

### Using Research in Your Answers

> Example: Instead of a generic "I want to work here because it's a great company," you could say "I've been following your recent move into [specific product area] — since I've been building projects using a similar stack, I'd love to contribute to that kind of work directly."

### Preparing Questions to Ask

Good candidate questions tend to fall into a few categories:

- Team structure and day-to-day work ("What does a typical sprint look like for this team?")
- Growth and mentorship ("How do engineers on this team typically grow their skills?")
- Product direction ("What are the biggest technical challenges the team is tackling this year?")

Avoid questions that are easily answered by a quick look at the company's website — it signals a lack of preparation.

### Common Traps

- Asking only about salary/perks in the first round — save compensation-focused questions for later stages unless directly asked.
- Confusing a company with a similarly-named competitor during research — always double check you're reading about the right organization.`,
  },
  {
    subject: "interview",
    type: "note",
    module: "Module 4: Company Research & Final Rounds",
    moduleOrder: 4,
    subtopic: "Negotiation & Offer Evaluation",
    subtopicOrder: 2,
    title: "Evaluating and Negotiating an Offer",
    pages: 5,
    body: `## Evaluating and Negotiating an Offer

Once an offer arrives, evaluating and (where appropriate) negotiating it is itself a skill — especially for a first job, where the process can feel unfamiliar.

### What to Evaluate Beyond Base Salary

| Factor | Why It Matters |
|---|---|
| Learning Opportunity | Especially important early in a career — growth compounds over time |
| Team & Manager | Directly affects day-to-day experience and mentorship |
| Work Type | Whether the actual day-to-day work matches your interests |
| Location/Remote Policy | Practical impact on lifestyle and cost of living |
| Growth Path | Whether there's a clear route to more responsibility over time |

### Whether and How to Negotiate

For a first job especially, having a competing offer or clearly demonstrated market research strengthens a negotiation position. A respectful, non-confrontational approach works best:

> Example: "I'm genuinely excited about this offer. Based on my research into similar roles, I was hoping we could discuss the compensation a bit further — is there flexibility there?" This keeps the tone collaborative rather than adversarial.

### When Negotiation May Be Limited

Some organizations (especially large campus-hiring programs) have fixed, non-negotiable pay bands for entry-level roles — it's reasonable to ask politely, but be prepared for a firm "no" in these cases without it reflecting poorly on the offer itself.

### Common Traps

- Negotiating purely on the basis of personal financial need rather than market value or demonstrated skill — framing it around value tends to land better.
- Accepting or rejecting an offer under time pressure without asking for a reasonable decision deadline if you genuinely need more time to decide.`,
  },

  // ══ PDFs ══
  {
    subject: "interview",
    type: "pdf",
    module: "Module 1: HR & Behavioral Interviews",
    moduleOrder: 1,
    subtopic: "Behavioral Interview Techniques",
    subtopicOrder: 2,
    title: "STAR Method — Quick Reference (PDF)",
    size: "170 KB",
    pages: 4,
    url: "",
  },
  {
    subject: "interview",
    type: "pdf",
    module: "Module 3: Resume & Communication",
    moduleOrder: 3,
    subtopic: "Resume Building",
    subtopicOrder: 1,
    title: "Resume Bullet Point Formulas Cheat Sheet (PDF)",
    size: "150 KB",
    pages: 3,
    url: "",
  },

  // ══ RESOURCES ══
  {
    subject: "interview",
    type: "resource",
    title: "Glassdoor — Interview Questions & Reviews",
    source: "Glassdoor",
    url: "https://www.glassdoor.com/Interview/index.htm",
  },
  {
    subject: "interview",
    type: "resource",
    title: "Pramp — Free Mock Interview Practice",
    source: "Pramp",
    url: "https://www.pramp.com/",
  },

  // ══ QUIZZES ══
  {
    subject: "interview",
    type: "quiz",
    title: "HR & Behavioral Interview Quiz",
    time: "6 min",
    difficulty: "Easy",
    questionBank: [
      {
        questionText: "In the STAR method, what does the 'A' stand for?",
        options: ["Answer", "Action", "Approach", "Analysis"],
        correctAnswerIndex: 1,
      },
      {
        questionText: "A strong answer to 'Tell me about yourself' should follow which structure?",
        options: ["Future, Past, Present", "Present, Past, Future", "Only Present", "Only Past"],
        correctAnswerIndex: 1,
      },
      {
        questionText: "When discussing a past mistake, you should:",
        options: ["Avoid mentioning any mistakes at all", "Frame it constructively around what you learned", "Blame a teammate", "Downplay it as not your fault"],
        correctAnswerIndex: 1,
      },
    ],
  },
  {
    subject: "interview",
    type: "quiz",
    title: "Technical Interview Approach Quiz",
    time: "6 min",
    difficulty: "Medium",
    questionBank: [
      {
        questionText: "What should you typically do before writing any code in a coding interview?",
        options: ["Nothing, start coding immediately", "Clarify requirements and state an approach", "Ask for the answer", "Skip to optimization"],
        correctAnswerIndex: 1,
      },
      {
        questionText: "Why is 'thinking out loud' important in a coding interview?",
        options: ["It's not important", "It lets the interviewer follow your reasoning and possibly give hints", "It slows down the interview unnecessarily", "It's only needed for system design rounds"],
        correctAnswerIndex: 1,
      },
      {
        questionText: "In system design, a cache is primarily used to:",
        options: ["Permanently store all data", "Reduce database load by storing frequently accessed data in fast memory", "Replace the database entirely", "Encrypt user data"],
        correctAnswerIndex: 1,
      },
    ],
  },
  {
    subject: "interview",
    type: "quiz",
    title: "Resume & Communication Quiz",
    time: "6 min",
    difficulty: "Easy",
    questionBank: [
      {
        questionText: "The XYZ resume formula focuses on:",
        options: ["Listing every skill you've heard of", "Accomplishment, metric, and the action taken", "Company history", "Only listing job titles"],
        correctAnswerIndex: 1,
      },
      {
        questionText: "In a Group Discussion, evaluators primarily look for:",
        options: ["Who talks the most", "Clear, structured, collaborative contributions", "Loudest voice", "Longest individual speech"],
        correctAnswerIndex: 1,
      },
      {
        questionText: "A fresher's resume should typically be:",
        options: ["3+ pages", "One page", "As long as possible", "Only a list of skills"],
        correctAnswerIndex: 1,
      },
    ],
  },

  // ══ MCQs ══
  {
    subject: "interview",
    type: "mcq",
    module: "Module 2: Technical Interview Preparation",
    moduleOrder: 2,
    subtopic: "System Design Basics",
    subtopicOrder: 2,
    title: "System Design Basics — MCQ Set",
    questionBank: [
      {
        questionText: "What is the role of a load balancer?",
        options: ["Store data permanently", "Distribute incoming traffic across multiple servers", "Encrypt passwords", "Compress images"],
        correctAnswerIndex: 1,
      },
      {
        questionText: "Non-functional requirements typically describe:",
        options: ["What the system does", "How well the system performs (latency, scale, etc.)", "The company's org chart", "The programming language used"],
        correctAnswerIndex: 1,
      },
      {
        questionText: "A message queue is primarily used to:",
        options: ["Speed up CPU clock cycles", "Decouple services via asynchronous communication", "Replace databases", "Encrypt network traffic"],
        correctAnswerIndex: 1,
      },
      {
        questionText: "Database read replicas primarily help with:",
        options: ["Reducing write latency", "Handling heavy read traffic", "Encrypting stored data", "Reducing storage cost"],
        correctAnswerIndex: 1,
      },
    ],
  },
  {
    subject: "interview",
    type: "mcq",
    module: "Module 4: Company Research & Final Rounds",
    moduleOrder: 4,
    subtopic: "Negotiation & Offer Evaluation",
    subtopicOrder: 2,
    title: "Offer Evaluation & Negotiation — MCQ Set",
    questionBank: [
      {
        questionText: "Beyond base salary, which factor is especially important early in a career?",
        options: ["Office furniture", "Learning opportunity and mentorship", "Number of holidays only", "Company logo design"],
        correctAnswerIndex: 1,
      },
      {
        questionText: "A strong negotiation approach is best framed around:",
        options: ["Personal financial need only", "Demonstrated market value and skill", "Ultimatums", "Comparing salaries publicly"],
        correctAnswerIndex: 1,
      },
      {
        questionText: "Some entry-level campus offers have:",
        options: ["Always fully negotiable pay", "Fixed, non-negotiable pay bands", "No pay structure at all", "Random pay assigned per candidate"],
        correctAnswerIndex: 1,
      },
      {
        questionText: "Before an interview, researching a company's tech stack helps you:",
        options: ["Avoid the interview entirely", "Connect your skills to their actual tools", "Guess the salary", "Skip technical questions"],
        correctAnswerIndex: 1,
      },
    ],
  },

  // ══ INTERVIEW QUESTIONS ══
  {
    subject: "interview",
    type: "interviewQuestion",
    module: "Module 1: HR & Behavioral Interviews",
    moduleOrder: 1,
    subtopic: "Common HR Questions",
    subtopicOrder: 1,
    question: "How would you answer 'Why should we hire you?' effectively?",
    answer:
      "An effective answer focuses on a specific, verifiable strength backed by concrete evidence rather than generic claims. Instead of saying something vague like 'I'm hardworking' or 'I'm a fast learner,' describe a real situation where that strength was demonstrated with a measurable outcome — for example, learning a new technology quickly to ship a specific feature, or solving a concrete problem that had real impact. This grounds the answer in evidence the interviewer can actually evaluate, rather than an unverifiable self-assessment.",
  },
  {
    subject: "interview",
    type: "interviewQuestion",
    module: "Module 1: HR & Behavioral Interviews",
    moduleOrder: 1,
    subtopic: "Behavioral Interview Techniques",
    subtopicOrder: 2,
    question: "Walk through the STAR method and why it's an effective way to structure behavioral answers.",
    answer:
      "STAR stands for Situation, Task, Action, and Result. You briefly set the Situation (context), state the Task (your specific responsibility), describe the Action (what you personally did, in detail), and end with the Result (the measurable outcome). It's effective because it prevents two common failure modes: rambling without a clear point, and vague generalities without enough specific detail. By explicitly separating what happened, what your role was, and what you actually did, it forces the answer to focus on your individual contribution and its concrete impact, which is exactly what interviewers are trying to assess.",
  },
  {
    subject: "interview",
    type: "interviewQuestion",
    module: "Module 2: Technical Interview Preparation",
    moduleOrder: 2,
    subtopic: "Approaching Coding Interview Questions",
    subtopicOrder: 1,
    question: "Why is it important to ask clarifying questions before starting to code in a technical interview?",
    answer:
      "Clarifying questions surface constraints and edge cases that materially affect the correct approach — for example, whether an array can contain duplicates, whether it's sorted, or whether negative numbers are possible. Skipping this step risks building a solution that handles the wrong version of the problem, or missing edge cases the interviewer specifically wanted addressed. It also demonstrates a habit real engineering work requires: confirming requirements before committing to an implementation, rather than assuming and potentially building the wrong thing.",
  },
  {
    subject: "interview",
    type: "interviewQuestion",
    module: "Module 3: Resume & Communication",
    moduleOrder: 3,
    subtopic: "Resume Building",
    subtopicOrder: 1,
    question: "What makes a resume bullet point strong versus weak, using the XYZ formula?",
    answer:
      "A strong bullet point states what you accomplished (X), quantified by a specific metric (Y), achieved through a specific action (Z) — for example, 'Reduced API response time by 40% by adding Redis caching to the most frequently hit endpoints.' A weak bullet, like 'Worked on backend APIs,' describes an activity without conveying impact, scale, or the specific technique used. The XYZ structure forces concreteness, which both makes the resume more compelling and gives the candidate specific, defensible details to expand on if asked in an interview.",
  },
  {
    subject: "interview",
    type: "interviewQuestion",
    module: "Module 4: Company Research & Final Rounds",
    moduleOrder: 4,
    subtopic: "Researching Companies & Roles",
    subtopicOrder: 1,
    question: "Why does researching a company before an interview matter, and how should that research shape your answers?",
    answer:
      "Researching a company demonstrates genuine interest and lets you tailor your answers to be specific rather than generic — for example, connecting your own project experience to a technology or product direction the company is actually pursuing, instead of giving a 'why us' answer that could apply to any company. It also helps you prepare more informed, specific questions to ask the interviewer, which itself is often evaluated as a signal of engagement and preparation, rather than asking things easily found on the company's own website.",
  },

  // ══ MOCK TEST ══
  {
    subject: "interview",
    type: "mockTest",
    title: "Interview Prep Full Mock Test — Beginner",
    duration: 20,
    attempts: 0,
    positiveMarks: 1,
    negativeMarks: 0.33,
    questionBank: [
      {
        questionText: "What does the 'S' in STAR stand for?",
        options: ["Skill", "Situation", "Strategy", "Story"],
        correctAnswerIndex: 1,
      },
      {
        questionText: "A strong resume bullet should primarily emphasize:",
        options: ["Job title alone", "Measurable accomplishment and specific action", "Company name", "Length of employment"],
        correctAnswerIndex: 1,
      },
      {
        questionText: "In a coding interview, what should you typically do first?",
        options: ["Write code immediately", "Clarify the problem and constraints", "Ask for the solution", "Skip to complexity analysis"],
        correctAnswerIndex: 1,
      },
      {
        questionText: "What does a load balancer do in a system design context?",
        options: ["Encrypts data", "Distributes traffic across servers", "Stores logs", "Compiles code"],
        correctAnswerIndex: 1,
      },
      {
        questionText: "In a Group Discussion, which behavior is viewed positively?",
        options: ["Interrupting others frequently", "Building on what a previous speaker said", "Staying completely silent", "Repeating earlier points"],
        correctAnswerIndex: 1,
      },
      {
        questionText: "Negotiating an offer is generally more effective when framed around:",
        options: ["Personal financial need alone", "Demonstrated market value and skill", "Comparing offers publicly on social media", "Ultimatums"],
        correctAnswerIndex: 1,
      },
      {
        questionText: "Researching a company's recent news before an interview mainly helps you:",
        options: ["Guess interview questions exactly", "Show genuine engagement and tailor your answers", "Avoid technical questions", "Determine the salary"],
        correctAnswerIndex: 1,
      },
      {
        questionText: "A resume for a student/fresher should typically be:",
        options: ["As long as possible to show effort", "One page, focused on relevant projects and skills", "Only a list of certifications", "Written in third person"],
        correctAnswerIndex: 1,
      },
      {
        questionText: "What is a key purpose of thinking out loud during a coding interview?",
        options: ["To fill silence", "To let the interviewer follow your reasoning and offer hints if needed", "To slow down the pace intentionally", "It has no real purpose"],
        correctAnswerIndex: 1,
      },
      {
        questionText: "When discussing a past failure in an interview, the best approach is to:",
        options: ["Avoid the topic entirely", "Frame it around what you learned and how you improved", "Blame external factors only", "Minimize it as unimportant"],
        correctAnswerIndex: 1,
      },
    ],
  },
];

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB Atlas");

    await Content.deleteMany({ subject: "interview" });
    console.log("🗑️  Cleared old Interview Prep content");

    await Content.insertMany(interviewPrepContent);
    console.log(`✅ Inserted ${interviewPrepContent.length} Interview Prep content items`);

    await mongoose.disconnect();
    console.log("👋 Done, disconnected");
    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding failed:", error.message);
    process.exit(1);
  }
};

seed();