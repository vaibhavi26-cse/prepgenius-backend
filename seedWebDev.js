import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import Content from "./models/Content.js";

const webDevContent = [
  // ══ NOTES ══
  {
    subject: "webdev",
    type: "note",
    module: "Module 1: Frontend Fundamentals",
    moduleOrder: 1,
    subtopic: "HTML & CSS Basics",
    subtopicOrder: 1,
    title: "HTML & CSS Fundamentals",
    pages: 7,
    body: `## HTML & CSS Fundamentals

**HTML (HyperText Markup Language)** structures content on a web page. **CSS (Cascading Style Sheets)** controls how that content looks.

### Semantic HTML

Semantic tags describe the meaning of content, not just its appearance, which improves accessibility and SEO.

\\\`\\\`\\\`html
<header>...</header>
<nav>...</nav>
<main>
  <article>...</article>
  <aside>...</aside>
</main>
<footer>...</footer>
\\\`\\\`\\\`

> Example: Using \\\`<button>\\\` instead of a styled \\\`<div>\\\` for a clickable element means screen readers automatically announce it as a button, and it gets keyboard focus/activation for free — a plain \\\`<div>\\\` gets none of that without extra work.

### The Box Model

Every HTML element is treated as a rectangular box made of four layers:

\\\`\\\`\\\`
[ margin
  [ border
    [ padding
      [ content ]
    ]
  ]
]
\\\`\\\`\\\`

By default, \\\`width\\\`/\\\`height\\\` only apply to the content area — setting \\\`box-sizing: border-box;\\\` makes width/height include padding and border, which is usually more intuitive.

### CSS Selectors and Specificity

| Selector | Example | Specificity |
|---|---|---|
| Element | \\\`p { }\\\` | Lowest |
| Class | \\\`.card { }\\\` | Medium |
| ID | \\\`#header { }\\\` | High |
| Inline style | \\\`style="..."\\\` | Highest |

When multiple rules target the same element, the more specific selector wins, regardless of the order they appear in the stylesheet.

### Flexbox Basics

\\\`\\\`\\\`css
.container {
  display: flex;
  justify-content: space-between; /* horizontal alignment */
  align-items: center;            /* vertical alignment */
}
\\\`\\\`\\\`

Flexbox is ideal for laying out items in a single row or column that need to align, distribute space, or reorder responsively.

### Common Traps

- Forgetting \\\`box-sizing: border-box\\\`, then being confused why an element with \\\`width: 200px\\\` and padding ends up wider than 200px on screen.
- Assuming CSS rule order alone decides which style wins — specificity (and \\\`!important\\\`) can override a later rule with lower specificity.`,
  },
  {
    subject: "webdev",
    type: "note",
    module: "Module 1: Frontend Fundamentals",
    moduleOrder: 1,
    subtopic: "JavaScript Fundamentals",
    subtopicOrder: 2,
    title: "JavaScript Fundamentals",
    pages: 8,
    body: `## JavaScript Fundamentals

**JavaScript** is the programming language that makes web pages interactive, running directly in the browser (and, via Node.js, on the server too).

### Variables: var, let, const

| Keyword | Scope | Reassignable? |
|---|---|---|
| \\\`var\\\` | Function-scoped (legacy) | Yes |
| \\\`let\\\` | Block-scoped | Yes |
| \\\`const\\\` | Block-scoped | No (binding, not necessarily the value's contents) |

> Example: \\\`const arr = [1, 2]; arr.push(3);\\\` is valid — \\\`const\\\` prevents reassigning \\\`arr\\\` to a new array, but doesn't freeze the array's contents.

### The Event Loop (Why Async Works)

JavaScript is single-threaded, but handles asynchronous operations (like network requests) via the **event loop**:

\\\`\\\`\\\`
console.log("1");
setTimeout(() => console.log("2"), 0);
console.log("3");

// Output: 1, 3, 2
// Even with a 0ms delay, setTimeout's callback goes into the
// task queue and only runs after the main synchronous code finishes.
\\\`\\\`\\\`

### Promises and async/await

A **Promise** represents a value that will be available in the future (success or failure). \\\`async/await\\\` is syntactic sugar that makes Promise-based code read like synchronous code.

\\\`\\\`\\\`javascript
async function getUser(id) {
  const response = await fetch(\\\`/api/users/\\\${id}\\\`);
  const data = await response.json();
  return data;
}
\\\`\\\`\\\`

### Closures

A **closure** is when a function "remembers" variables from the scope it was created in, even after that outer function has finished executing.

\\\`\\\`\\\`javascript
function makeCounter() {
  let count = 0;
  return () => ++count;
}
const counter = makeCounter();
counter(); // 1
counter(); // 2 — "count" persists between calls via closure
\\\`\\\`\\\`

### Common Traps

- Assuming \\\`var\\\` behaves like \\\`let\\\` — \\\`var\\\`'s function-scoping (rather than block-scoping) can cause subtle bugs inside loops and conditionals.
- Forgetting that \\\`const\\\` only prevents reassignment of the variable binding, not mutation of an object/array it points to.`,
  },
  {
    subject: "webdev",
    type: "note",
    module: "Module 2: Frontend Frameworks",
    moduleOrder: 2,
    subtopic: "React Basics",
    subtopicOrder: 1,
    title: "React Fundamentals",
    pages: 8,
    body: `## React Fundamentals

**React** is a JavaScript library for building user interfaces out of reusable **components**.

### Components and JSX

A component is a JavaScript function that returns markup written in **JSX** (a syntax extension that looks like HTML but compiles to JavaScript function calls).

\\\`\\\`\\\`jsx
function Greeting({ name }) {
  return <h1>Hello, {name}!</h1>;
}
\\\`\\\`\\\`

### Props vs State

| Concept | Meaning | Who Controls It |
|---|---|---|
| Props | Data passed **into** a component from its parent | Parent component |
| State | Data a component manages **internally** | The component itself |

\\\`\\\`\\\`jsx
function Counter() {
  const [count, setCount] = useState(0); // state, owned by Counter

  return (
    <button onClick={() => setCount(count + 1)}>
      Clicked {count} times
    </button>
  );
}
\\\`\\\`\\\`

### The Virtual DOM

React keeps an in-memory representation of the UI (the **virtual DOM**). When state changes, React compares the new virtual DOM to the previous one (a process called **diffing**) and updates only the actual, changed parts of the real DOM — rather than re-rendering the whole page.

> Example: If only a single counter's number changes on a page with 100 other elements, React updates just that one text node in the real DOM, not the entire page — this is why React UIs feel fast even with frequent updates.

### The useEffect Hook

\\\`useEffect\\\` runs side effects (data fetching, subscriptions, manual DOM changes) after a component renders.

\\\`\\\`\\\`jsx
useEffect(() => {
  fetchData();
}, [userId]); // re-runs only when userId changes
\\\`\\\`\\\`

The **dependency array** (\\\`[userId]\\\`) tells React when to re-run the effect — an empty array \\\`[]\\\` means "run once, after the first render only."

### Common Traps

- Forgetting the dependency array in \\\`useEffect\\\`, causing it to run after *every* render (potentially causing infinite loops if it also updates state).
- Mutating state directly (\\\`state.push(x)\\\`) instead of using the setter function with a new array/object — React won't detect the change and re-render.`,
  },
  {
    subject: "webdev",
    type: "note",
    module: "Module 2: Frontend Frameworks",
    moduleOrder: 2,
    subtopic: "State Management",
    subtopicOrder: 2,
    title: "State Management in React",
    pages: 7,
    body: `## State Management in React

As applications grow, managing state across many components becomes harder than managing state within a single component.

### Prop Drilling

**Prop drilling** happens when data must be passed down through several layers of components that don't actually need it themselves, just to reach a deeply nested child.

\\\`\\\`\\\`
<App user={user}>
  <Layout user={user}>
    <Sidebar user={user}>
      <ProfileCard user={user} />  // only this component actually needs "user"
    </Sidebar>
  </Layout>
</App>
\\\`\\\`\\\`

### Context API

React's **Context API** solves prop drilling by letting you provide a value at a high level in the tree and consume it directly in any deeply nested component, without passing it through every intermediate layer.

\\\`\\\`\\\`jsx
const UserContext = createContext(null);

function App() {
  return (
    <UserContext.Provider value={user}>
      <Layout />
    </UserContext.Provider>
  );
}

function ProfileCard() {
  const user = useContext(UserContext); // no prop drilling needed
  return <p>{user.name}</p>;
}
\\\`\\\`\\\`

### When to Reach for External State Libraries

Context is great for infrequently-changing, broadly-needed data (like the current logged-in user or theme). For complex, frequently-updating state shared across many components (e.g., a large e-commerce cart, real-time collaborative data), dedicated state management libraries (like Redux or Zustand) are often a better fit, since Context re-renders every consumer whenever the value changes.

### Common Traps

- Using Context for every piece of state "just in case" — overusing Context can cause unnecessary re-renders across the app.
- Confusing "prop drilling is always bad" — passing props down one or two levels is often perfectly fine; Context is a solution for *deep* drilling, not a replacement for props entirely.`,
  },
  {
    subject: "webdev",
    type: "note",
    module: "Module 3: Backend Fundamentals",
    moduleOrder: 3,
    subtopic: "Node.js & Express",
    subtopicOrder: 1,
    title: "Node.js and Express Basics",
    pages: 8,
    body: `## Node.js and Express Basics

**Node.js** lets JavaScript run outside the browser, commonly used to build server-side applications. **Express** is a minimal web framework built on top of Node.js that simplifies building APIs and servers.

### A Basic Express Server

\\\`\\\`\\\`javascript
import express from "express";
const app = express();
app.use(express.json()); // parse JSON request bodies

app.get("/api/users", (req, res) => {
  res.json({ users: [] });
});

app.listen(5000, () => console.log("Server running on port 5000"));
\\\`\\\`\\\`

### Middleware

**Middleware** functions run between receiving a request and sending a response, and can modify the request/response or end the cycle early.

\\\`\\\`\\\`javascript
function logger(req, res, next) {
  console.log(\\\`\\\${req.method} \\\${req.url}\\\`);
  next(); // pass control to the next middleware/route handler
}
app.use(logger);
\\\`\\\`\\\`

Common middleware includes authentication checks, request logging, body parsing, and error handling.

### The Non-Blocking Event Loop

Node.js handles many concurrent connections using a **single-threaded, non-blocking event loop** — I/O operations (like database queries or file reads) are handed off, allowing Node to keep serving other requests while waiting for the result, rather than blocking the whole server.

> Example: A slow database query for one user's request doesn't freeze the server for all other users — Node continues processing other incoming requests while that query completes in the background, then handles the response via a callback/Promise once ready.

### Route Parameters and Query Strings

\\\`\\\`\\\`javascript
app.get("/api/users/:id", (req, res) => {
  const userId = req.params.id;       // from URL path, e.g. /api/users/42
});

app.get("/api/search", (req, res) => {
  const query = req.query.q;          // from ?q=something in the URL
});
\\\`\\\`\\\`

### Common Traps

- Forgetting to call \\\`next()\\\` inside custom middleware — the request will hang indefinitely with no response sent.
- Writing CPU-heavy, blocking synchronous code inside a route handler — since Node is single-threaded, this blocks *all* other requests until it finishes.`,
  },
  {
    subject: "webdev",
    type: "note",
    module: "Module 3: Backend Fundamentals",
    moduleOrder: 3,
    subtopic: "REST APIs",
    subtopicOrder: 2,
    title: "Designing REST APIs",
    pages: 7,
    body: `## Designing REST APIs

**REST (Representational State Transfer)** is an architectural style for designing web APIs around resources, identified by URLs, manipulated via standard HTTP methods.

### HTTP Methods and Their Meaning

| Method | Purpose | Idempotent? |
|---|---|---|
| GET | Retrieve a resource | Yes |
| POST | Create a new resource | No |
| PUT | Replace a resource entirely | Yes |
| PATCH | Partially update a resource | No (typically) |
| DELETE | Remove a resource | Yes |

**Idempotent** means calling it multiple times has the same effect as calling it once — important for designing APIs that behave predictably under retries.

### Resource-Oriented URL Design

\\\`\\\`\\\`
GET    /api/users          -> list all users
GET    /api/users/42       -> get a specific user
POST   /api/users          -> create a new user
PUT    /api/users/42       -> replace user 42 entirely
DELETE /api/users/42       -> delete user 42
\\\`\\\`\\\`

URLs should represent **nouns** (resources), while the HTTP method represents the **action** — avoid designs like \\\`/api/getUser?id=42\\\`, which duplicates the verb in the URL itself.

### HTTP Status Codes

| Code | Meaning |
|---|---|
| 200 OK | Request succeeded |
| 201 Created | Resource successfully created |
| 400 Bad Request | Client sent invalid data |
| 401 Unauthorized | Authentication required or failed |
| 404 Not Found | Resource doesn't exist |
| 500 Internal Server Error | Something failed on the server |

> Example: A login endpoint should return **401** for wrong credentials (not 400 or 500), since the request itself was well-formed — it's specifically an authentication failure, which matters for how a frontend should handle and display the error.

### Common Traps

- Returning 200 OK for every response, even failures — this makes it much harder for clients to programmatically handle errors correctly.
- Designing URLs with verbs baked in (\\\`/api/deleteUser\\\`) instead of relying on the HTTP method to express the action.`,
  },
  {
    subject: "webdev",
    type: "note",
    module: "Module 4: Databases & Deployment",
    moduleOrder: 4,
    subtopic: "MongoDB Basics",
    subtopicOrder: 1,
    title: "MongoDB and Mongoose Basics",
    pages: 7,
    body: `## MongoDB and Mongoose Basics

**MongoDB** is a NoSQL, document-oriented database that stores data as flexible, JSON-like documents rather than rows in rigid tables.

### Documents and Collections

| SQL Term | MongoDB Equivalent |
|---|---|
| Table | Collection |
| Row | Document |
| Column | Field |

\\\`\\\`\\\`javascript
// A single MongoDB document (in a "users" collection)
{
  _id: ObjectId("64f..."),
  name: "Vaibhavi",
  branch: "CSE",
  skills: ["React", "Node.js", "MongoDB"]
}
\\\`\\\`\\\`

Unlike a SQL table, different documents in the same collection **don't need identical fields** — MongoDB's schema is flexible by default.

### Mongoose Schemas

**Mongoose** is an Object Data Modeling (ODM) library that adds structure and validation on top of MongoDB's flexible documents, commonly used with Node/Express apps.

\\\`\\\`\\\`javascript
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.model("User", userSchema);
\\\`\\\`\\\`

### Basic CRUD with Mongoose

\\\`\\\`\\\`javascript
await User.create({ name: "Vaibhavi", email: "v@example.com" }); // Create
await User.findById(id);                                          // Read
await User.findByIdAndUpdate(id, { name: "New Name" });           // Update
await User.findByIdAndDelete(id);                                 // Delete
\\\`\\\`\\\`

### Indexes

An **index** speeds up queries on a specific field (similar to an index in a book), at the cost of some extra storage and slightly slower writes. Fields frequently used in queries or marked \\\`unique: true\\\` (like email) are strong candidates for indexing.

### Common Traps

- Assuming MongoDB has no structure at all just because it's "schemaless" — in practice, using Mongoose schemas for validation is standard practice in real applications.
- Forgetting that \\\`unique: true\\\` in Mongoose creates a database-level index, not just an application-level check — it enforces uniqueness even if two requests hit the server at the exact same time.`,
  },
  {
    subject: "webdev",
    type: "note",
    module: "Module 4: Databases & Deployment",
    moduleOrder: 4,
    subtopic: "Git & Deployment",
    subtopicOrder: 2,
    title: "Git Basics and Deployment",
    pages: 6,
    body: `## Git Basics and Deployment

### Git Fundamentals

**Git** is a distributed version control system that tracks changes to code over time, letting multiple people collaborate without overwriting each other's work.

\\\`\\\`\\\`
git init                       // start tracking a project
git add .                      // stage changes
git commit -m "message"        // save a snapshot with a message
git branch feature-x           // create a new branch
git checkout feature-x         // switch to that branch
git merge feature-x            // merge it back into the current branch
git push origin main           // upload commits to a remote repository
\\\`\\\`\\\`

### Branching Workflow

Working on a separate **branch** for each feature (rather than directly on \\\`main\\\`) keeps the main branch stable and makes it easy to review changes (e.g., via a Pull Request) before merging.

\\\`\\\`\\\`
main -----o----------------o----> (stable)
           \\\\              /
feature-x   o----o----o----   (isolated work, merged when ready)
\\\`\\\`\\\`

### Merge Conflicts

A **merge conflict** happens when Git can't automatically reconcile changes made to the same lines of a file on two different branches — it requires a person to manually choose which changes to keep.

### Deploying a Full-Stack App

| Layer | Common Hosting Options |
|---|---|
| Frontend (React/Vite build) | Vercel, Netlify |
| Backend (Node/Express API) | Render, Railway, AWS/GCP |
| Database | MongoDB Atlas (managed cloud MongoDB) |

### Environment Variables

Sensitive configuration (database connection strings, API keys) is kept in **environment variables** rather than hardcoded in source code, typically loaded via a \\\`.env\\\` file locally (excluded from Git via \\\`.gitignore\\\`) and configured directly in the hosting platform's dashboard for production.

> Example: A MongoDB connection string containing a username and password should never be committed to a public GitHub repository — it belongs in an environment variable, referenced in code as \\\`process.env.MONGO_URI\\\`.

### Common Traps

- Committing a \\\`.env\\\` file (with real secrets) to a public repository — always add it to \\\`.gitignore\\\` before the first commit.
- Working directly on the \\\`main\\\` branch for every feature, making it hard to isolate, review, or roll back individual changes.`,
  },

  // ══ PDFs ══
  {
    subject: "webdev",
    type: "pdf",
    module: "Module 2: Frontend Frameworks",
    moduleOrder: 2,
    subtopic: "React Basics",
    subtopicOrder: 1,
    title: "React Hooks — Quick Reference (PDF)",
    size: "205 KB",
    pages: 6,
    url: "",
  },
  {
    subject: "webdev",
    type: "pdf",
    module: "Module 3: Backend Fundamentals",
    moduleOrder: 3,
    subtopic: "REST APIs",
    subtopicOrder: 2,
    title: "HTTP Status Codes & REST Conventions Cheat Sheet (PDF)",
    size: "180 KB",
    pages: 5,
    url: "",
  },

  // ══ RESOURCES ══
  {
    subject: "webdev",
    type: "resource",
    title: "MDN Web Docs — JavaScript Guide",
    source: "MDN",
    url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide",
  },
  {
    subject: "webdev",
    type: "resource",
    title: "React — Official Documentation",
    source: "React",
    url: "https://react.dev/",
  },

  // ══ QUIZZES ══
  {
    subject: "webdev",
    type: "quiz",
    title: "HTML & CSS Quiz",
    time: "6 min",
    difficulty: "Easy",
    questionBank: [
      {
        questionText: "Which CSS property makes width/height include padding and border?",
        options: ["display: flex", "box-sizing: border-box", "position: absolute", "overflow: hidden"],
        correctAnswerIndex: 1,
      },
      {
        questionText: "Which selector has the highest specificity?",
        options: ["Element selector", "Class selector", "ID selector", "Universal selector (*)"],
        correctAnswerIndex: 2,
      },
      {
        questionText: "Which tag is semantic for the main navigation of a page?",
        options: ["<div>", "<nav>", "<span>", "<section>"],
        correctAnswerIndex: 1,
      },
    ],
  },
  {
    subject: "webdev",
    type: "quiz",
    title: "JavaScript & React Quiz",
    time: "8 min",
    difficulty: "Medium",
    questionBank: [
      {
        questionText: "Which keyword creates a block-scoped, reassignable variable?",
        options: ["var", "let", "const", "function"],
        correctAnswerIndex: 1,
      },
      {
        questionText: "What does React's Virtual DOM primarily help optimize?",
        options: ["Network requests", "Updating only the changed parts of the real DOM", "CSS specificity", "Database queries"],
        correctAnswerIndex: 1,
      },
      {
        questionText: "An empty dependency array `[]` in useEffect means the effect runs:",
        options: ["On every render", "Only once, after the first render", "Never", "Only on unmount"],
        correctAnswerIndex: 1,
      },
    ],
  },
  {
    subject: "webdev",
    type: "quiz",
    title: "Node.js, Express & MongoDB Quiz",
    time: "8 min",
    difficulty: "Medium",
    questionBank: [
      {
        questionText: "What must a custom Express middleware call to pass control onward?",
        options: ["return()", "next()", "continue()", "resolve()"],
        correctAnswerIndex: 1,
      },
      {
        questionText: "In MongoDB terminology, what is the equivalent of a SQL 'row'?",
        options: ["Collection", "Field", "Document", "Schema"],
        correctAnswerIndex: 2,
      },
      {
        questionText: "Which HTTP method is used to completely replace a resource?",
        options: ["GET", "POST", "PUT", "PATCH"],
        correctAnswerIndex: 2,
      },
    ],
  },

  // ══ MCQs ══
  {
    subject: "webdev",
    type: "mcq",
    module: "Module 1: Frontend Fundamentals",
    moduleOrder: 1,
    subtopic: "JavaScript Fundamentals",
    subtopicOrder: 2,
    title: "JavaScript Fundamentals — MCQ Set",
    questionBank: [
      {
        questionText: "What does 'async/await' primarily simplify?",
        options: ["CSS styling", "Working with Promises", "DOM selection", "HTTP headers"],
        correctAnswerIndex: 1,
      },
      {
        questionText: "A closure allows a function to:",
        options: ["Run faster", "Remember variables from its creation scope after that scope ends", "Avoid using loops", "Access the DOM directly"],
        correctAnswerIndex: 1,
      },
      {
        questionText: "What logs first in: console.log('1'); setTimeout(() => console.log('2'), 0); console.log('3');",
        options: ["1, 2, 3", "1, 3, 2", "2, 1, 3", "3, 2, 1"],
        correctAnswerIndex: 1,
      },
      {
        questionText: "Which of these does NOT allow reassignment?",
        options: ["var", "let", "const", "None of them"],
        correctAnswerIndex: 2,
      },
    ],
  },
  {
    subject: "webdev",
    type: "mcq",
    module: "Module 4: Databases & Deployment",
    moduleOrder: 4,
    subtopic: "Git & Deployment",
    subtopicOrder: 2,
    title: "Git & Deployment — MCQ Set",
    questionBank: [
      {
        questionText: "Which command stages changes for commit?",
        options: ["git commit", "git add", "git push", "git branch"],
        correctAnswerIndex: 1,
      },
      {
        questionText: "A merge conflict occurs when:",
        options: ["Two branches never interact", "Git can't automatically reconcile changes to the same lines", "A file is deleted", "A commit message is missing"],
        correctAnswerIndex: 1,
      },
      {
        questionText: "Sensitive config like database URIs should be stored in:",
        options: ["Hardcoded source code", "Environment variables", "The README file", "Public GitHub commits"],
        correctAnswerIndex: 1,
      },
      {
        questionText: "MongoDB Atlas is best described as:",
        options: ["A frontend hosting platform", "A managed cloud MongoDB service", "A CSS framework", "A JavaScript testing library"],
        correctAnswerIndex: 1,
      },
    ],
  },

  // ══ INTERVIEW QUESTIONS ══
  {
    subject: "webdev",
    type: "interviewQuestion",
    module: "Module 1: Frontend Fundamentals",
    moduleOrder: 1,
    subtopic: "JavaScript Fundamentals",
    subtopicOrder: 2,
    question: "Explain the difference between var, let, and const.",
    answer:
      "`var` is function-scoped and can be reassigned, which historically caused subtle bugs since it ignores block boundaries (like inside `if` statements or loops). `let` is block-scoped and reassignable, meaning it only exists within the nearest enclosing curly braces. `const` is also block-scoped but cannot be reassigned after its initial declaration — though if it holds an object or array, the contents of that object/array can still be mutated, since `const` only locks the variable binding, not the underlying data structure.",
  },
  {
    subject: "webdev",
    type: "interviewQuestion",
    module: "Module 2: Frontend Frameworks",
    moduleOrder: 2,
    subtopic: "React Basics",
    subtopicOrder: 1,
    question: "What is the Virtual DOM in React, and why does it improve performance?",
    answer:
      "The Virtual DOM is an in-memory, lightweight representation of the actual DOM that React maintains. When state changes, React first updates the Virtual DOM and compares it against the previous version using a diffing algorithm, identifying exactly which parts of the UI actually changed. It then applies only those specific changes to the real DOM, rather than re-rendering the entire page. Since direct manipulation of the real DOM is comparatively slow, this selective-update approach is significantly faster than naively re-rendering everything on every state change.",
  },
  {
    subject: "webdev",
    type: "interviewQuestion",
    module: "Module 3: Backend Fundamentals",
    moduleOrder: 3,
    subtopic: "Node.js & Express",
    subtopicOrder: 1,
    question: "How does Node.js handle many concurrent requests despite being single-threaded?",
    answer:
      "Node.js uses a single-threaded event loop combined with non-blocking I/O. When a request involves a slow operation like a database query or file read, Node hands that operation off (often to the underlying system or a thread pool) and immediately moves on to process other incoming requests, rather than waiting idly. Once the slow operation completes, a callback (or resolved Promise) is queued and executed by the event loop when it's free. This lets a single Node.js process handle many concurrent connections efficiently, as long as the actual JavaScript code running on the main thread stays lightweight and doesn't block with heavy synchronous computation.",
  },
  {
    subject: "webdev",
    type: "interviewQuestion",
    module: "Module 3: Backend Fundamentals",
    moduleOrder: 3,
    subtopic: "REST APIs",
    subtopicOrder: 2,
    question: "What makes an API 'RESTful,' and why does resource-oriented URL design matter?",
    answer:
      "A RESTful API organizes functionality around resources (nouns), identified by URLs, and uses standard HTTP methods (GET, POST, PUT, PATCH, DELETE) to express the action being performed on that resource, rather than embedding the action in the URL itself. This matters because it creates a predictable, consistent convention across an entire API — once a developer understands that `/api/users/42` represents a specific user resource, they can reasonably guess that GET retrieves it, PUT replaces it, and DELETE removes it, without needing to memorize a separate, differently-named endpoint for every possible action.",
  },
  {
    subject: "webdev",
    type: "interviewQuestion",
    module: "Module 4: Databases & Deployment",
    moduleOrder: 4,
    subtopic: "MongoDB Basics",
    subtopicOrder: 1,
    question: "What is the difference between MongoDB and a traditional SQL database?",
    answer:
      "MongoDB is a NoSQL, document-oriented database that stores data as flexible, JSON-like documents grouped into collections, where different documents in the same collection don't need to share an identical structure. A traditional SQL database stores data in rigid tables with predefined columns, where every row must conform to the same schema, and relationships between tables are typically expressed through foreign keys and joins. MongoDB is often favored for applications with evolving or varied data shapes and a need for horizontal scalability, while SQL databases are often favored when strong relational integrity and complex multi-table queries are central to the application.",
  },

  // ══ MOCK TEST ══
  {
    subject: "webdev",
    type: "mockTest",
    title: "Web Development Full Mock Test — Beginner",
    duration: 20,
    attempts: 0,
    positiveMarks: 1,
    negativeMarks: 0.33,
    questionBank: [
      {
        questionText: "Which CSS property includes padding and border within an element's set width?",
        options: ["content-box", "border-box", "padding-box", "margin-box"],
        correctAnswerIndex: 1,
      },
      {
        questionText: "Which keyword is block-scoped and cannot be reassigned?",
        options: ["var", "let", "const", "function"],
        correctAnswerIndex: 2,
      },
      {
        questionText: "What does React's Virtual DOM primarily optimize?",
        options: ["Network latency", "Selective updates to the real DOM", "CSS specificity", "Database indexing"],
        correctAnswerIndex: 1,
      },
      {
        questionText: "In useEffect, an empty dependency array means it runs:",
        options: ["On every render", "Only once after the first render", "Never", "Only when unmounting"],
        correctAnswerIndex: 1,
      },
      {
        questionText: "What must Express middleware call to continue the request-response cycle?",
        options: ["return()", "next()", "resolve()", "continue()"],
        correctAnswerIndex: 1,
      },
      {
        questionText: "Which HTTP method is idempotent AND used to create a resource?",
        options: ["POST", "GET", "PUT (when replacing at a known URL)", "PATCH"],
        correctAnswerIndex: 2,
      },
      {
        questionText: "In MongoDB, a 'document' corresponds to which SQL concept?",
        options: ["Table", "Row", "Column", "Database"],
        correctAnswerIndex: 1,
      },
      {
        questionText: "Which command creates a new Git branch?",
        options: ["git branch <name>", "git commit <name>", "git clone <name>", "git merge <name>"],
        correctAnswerIndex: 0,
      },
      {
        questionText: "Sensitive credentials like database URIs should be stored in:",
        options: ["Source code comments", "Environment variables", "The README", "Public commit messages"],
        correctAnswerIndex: 1,
      },
      {
        questionText: "Which status code indicates a resource was successfully created?",
        options: ["200", "201", "400", "404"],
        correctAnswerIndex: 1,
      },
    ],
  },
];

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB Atlas");

    await Content.deleteMany({ subject: "webdev" });
    console.log("🗑️  Cleared old Web Dev content");

    await Content.insertMany(webDevContent);
    console.log(`✅ Inserted ${webDevContent.length} Web Dev content items`);

    await mongoose.disconnect();
    console.log("👋 Done, disconnected");
    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding failed:", error.message);
    process.exit(1);
  }
};

seed();
