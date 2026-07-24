import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import Content from "./models/Content.js";

const dbmsContent = [
  // ── NOTES ──
  {
    subject: "dbms",
    type: "note",
    module: "Module 1: DBMS Fundamentals",
    moduleOrder: 1,
    subtopic: "Introduction to DBMS",
    subtopicOrder: 1,
    title: "What is a DBMS?",
    pages: 4,
    body: `## What is a Database Management System?

A **Database Management System (DBMS)** is software that allows users to define, create, maintain, and control access to databases. It acts as an interface between the user/application and the actual data stored on disk.

### Why not just use files?

Before DBMS became standard, applications stored data directly in flat files. This caused serious problems:

- **Data redundancy** — the same data duplicated across multiple files.
- **Data inconsistency** — updating one copy but forgetting another.
- **Difficult concurrent access** — multiple users editing the same file simultaneously causes corruption.
- **No security** — anyone with file access could see or modify everything.

A DBMS solves all of these by centralizing data management with built-in rules, security, and consistency guarantees.

### Key advantages of a DBMS

- **Data independence** — applications don't need to know exactly how data is physically stored.
- **Efficient data access** — via indexing and optimized query engines.
- **Data integrity** — enforced through constraints (e.g., a phone number field can't be text).
- **Concurrent access control** — multiple users can safely work with the same data at once.
- **Backup and recovery** — built-in mechanisms to restore data after a crash.

> Example: Instead of a college storing student records in separate Excel files for "Fees," "Attendance," and "Grades" (leading to duplicated student names and possible mismatches), a DBMS keeps one central Student table that all three systems reference.`,
  },
  {
    subject: "dbms",
    type: "note",
    module: "Module 1: DBMS Fundamentals",
    moduleOrder: 1,
    subtopic: "Types of Databases",
    subtopicOrder: 2,
    title: "Relational vs Non-Relational Databases",
    pages: 5,
    body: `## Relational vs Non-Relational Databases

### Relational Databases (SQL)

Relational databases organize data into **tables** (rows and columns), with relationships between tables defined using keys. Examples: MySQL, PostgreSQL, Oracle, SQL Server.

- Data follows a strict, predefined schema.
- Relationships are enforced using **foreign keys**.
- Best suited for structured data with clear relationships (e.g., banking systems, inventory).

### Non-Relational Databases (NoSQL)

NoSQL databases store data in flexible formats — documents, key-value pairs, graphs, or wide-columns — without requiring a fixed schema. Examples: MongoDB (documents), Redis (key-value), Neo4j (graph).

- Schema-less or flexible schema — easier to evolve over time.
- Scales horizontally more easily (across many servers).
- Best suited for unstructured or rapidly changing data (e.g., social media feeds, real-time analytics).

### Comparison

| Aspect | Relational (SQL) | Non-Relational (NoSQL) |
|---|---|---|
| Schema | Fixed, predefined | Flexible/dynamic |
| Relationships | Strong (foreign keys) | Weaker, often denormalized |
| Scaling | Vertical (bigger server) | Horizontal (more servers) |
| Best for | Structured, transactional data | Unstructured, high-volume data |

> Example: PrepGenius AI itself uses MongoDB (NoSQL) for storing flexible content types like notes, quizzes, and interview questions — since each content type has different fields, a rigid SQL schema would be harder to manage.`,
  },
  {
    subject: "dbms",
    type: "note",
    module: "Module 2: Keys & Relationships",
    moduleOrder: 2,
    subtopic: "Primary & Foreign Keys",
    subtopicOrder: 1,
    title: "Primary Keys and Foreign Keys",
    pages: 5,
    body: `## Primary Keys and Foreign Keys

### Primary Key

A **primary key** is a column (or combination of columns) that uniquely identifies each row in a table. It cannot contain NULL values, and its value must be unique across all rows.

\`\`\`sql
CREATE TABLE Students (
  student_id INT PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100)
);
\`\`\`

Here, \`student_id\` uniquely identifies each student — no two students can share the same ID.

### Foreign Key

A **foreign key** is a column in one table that references the primary key of another table, establishing a relationship between the two tables.

\`\`\`sql
CREATE TABLE Enrollments (
  enrollment_id INT PRIMARY KEY,
  student_id INT,
  course_name VARCHAR(100),
  FOREIGN KEY (student_id) REFERENCES Students(student_id)
);
\`\`\`

Here, \`Enrollments.student_id\` references \`Students.student_id\` — ensuring every enrollment record points to a real, existing student.

### Why this matters

Foreign keys enforce **referential integrity** — the database will reject an attempt to insert an enrollment for a student_id that doesn't exist in the Students table, preventing orphaned or invalid data.

> Example: If you tried to delete a student who still has enrollment records, the database can be configured to either block the deletion, or automatically delete related enrollments too (using CASCADE rules) — you choose the behavior when defining the foreign key.`,
  },
  {
    subject: "dbms",
    type: "note",
    module: "Module 3: Normalization",
    moduleOrder: 3,
    subtopic: "Normal Forms",
    subtopicOrder: 1,
    title: "Database Normalization (1NF, 2NF, 3NF)",
    pages: 7,
    body: `## Database Normalization

**Normalization** is the process of organizing data in a database to reduce redundancy and improve data integrity, by breaking large tables into smaller, related ones.

### First Normal Form (1NF)

A table is in 1NF if:
- Each column contains only atomic (indivisible) values.
- Each column contains values of a single type.
- Each row is unique.

> Example: A "Phone Numbers" column containing "9876543210, 9123456780" violates 1NF (multiple values in one field). Fixing this means splitting phone numbers into separate rows or a separate table.

### Second Normal Form (2NF)

A table is in 2NF if it's already in 1NF, and all non-key columns are fully dependent on the **entire** primary key (relevant when using composite/multi-column primary keys).

> Example: If OrderID + ProductID together form the primary key, but a column like "ProductName" only depends on ProductID (not OrderID), this violates 2NF — ProductName should move to a separate Products table.

### Third Normal Form (3NF)

A table is in 3NF if it's in 2NF, and no non-key column depends on another non-key column (no "transitive dependency").

> Example: A Students table with StudentID, City, and ZipCode — where City depends on ZipCode rather than directly on StudentID — violates 3NF. ZipCode/City should be moved to a separate location table.

### Why normalize?

- Eliminates redundant data storage.
- Prevents update anomalies (updating one copy of data but missing others).
- Makes the database easier to maintain and extend.

**Trade-off:** Highly normalized databases can require more JOIN operations to retrieve related data, which can impact query performance — this is why some systems intentionally denormalize for read-heavy workloads.`,
  },

  // ── QUIZ ──
  {
    subject: "dbms",
    type: "quiz",
    title: "DBMS Basics Quiz",
    time: "10 min",
    difficulty: "Easy",
    questionBank: [
      {
        questionText: "What does DBMS stand for?",
        options: ["Data Backup Management System", "Database Management System", "Digital Business Management Software", "Data Block Management Service"],
        correctAnswerIndex: 1,
      },
      {
        questionText: "Which of the following is a NoSQL database?",
        options: ["MySQL", "PostgreSQL", "MongoDB", "Oracle"],
        correctAnswerIndex: 2,
      },
      {
        questionText: "A primary key can contain NULL values.",
        options: ["True", "False"],
        correctAnswerIndex: 1,
      },
      {
        questionText: "What does a foreign key enforce?",
        options: ["Data encryption", "Referential integrity", "Faster queries", "Data compression"],
        correctAnswerIndex: 1,
      },
    ],
  },

  // ── MCQ ──
  {
    subject: "dbms",
    type: "mcq",
    title: "Normalization MCQs",
    time: "8 min",
    difficulty: "Medium",
    questionBank: [
      {
        questionText: "A table with a column containing multiple comma-separated values violates which normal form?",
        options: ["1NF", "2NF", "3NF", "None"],
        correctAnswerIndex: 0,
      },
      {
        questionText: "Transitive dependency is resolved in which normal form?",
        options: ["1NF", "2NF", "3NF", "0NF"],
        correctAnswerIndex: 2,
      },
    ],
  },

  // ── INTERVIEW QUESTIONS ──
  {
    subject: "dbms",
    type: "interviewQuestion",
    module: "Module 2: Keys & Relationships",
    moduleOrder: 2,
    subtopic: "Primary & Foreign Keys",
    subtopicOrder: 1,
    question: "What is the difference between a primary key and a foreign key?",
    answer:
      "A primary key uniquely identifies each row in its own table and cannot be NULL. A foreign key is a column in one table that references the primary key of another table, used to establish and enforce a relationship between the two tables. A table can have only one primary key but multiple foreign keys.",
  },
  {
    subject: "dbms",
    type: "interviewQuestion",
    module: "Module 3: Normalization",
    moduleOrder: 3,
    subtopic: "Normal Forms",
    subtopicOrder: 1,
    question: "Why would you denormalize a database, even though normalization is generally good practice?",
    answer:
      "Denormalization intentionally introduces some redundancy to reduce the number of JOIN operations needed for frequently-run queries, improving read performance. This trade-off is common in read-heavy systems like reporting dashboards or analytics platforms, where query speed matters more than storage efficiency or avoiding redundancy.",
  },
  {
    subject: "dbms",
    type: "interviewQuestion",
    module: "Module 1: DBMS Fundamentals",
    moduleOrder: 1,
    subtopic: "Types of Databases",
    subtopicOrder: 2,
    question: "When would you choose a NoSQL database over a relational database?",
    answer:
      "NoSQL is a good fit when your data doesn't have a fixed structure, changes frequently, or needs to scale horizontally across many servers (e.g., social media posts, IoT sensor data, content management with varying fields). Relational databases are better when data has clear, consistent structure and relationships that benefit from strict enforcement, like financial transactions.",
  },

  // ── RESOURCES ──
  {
    subject: "dbms",
    type: "resource",
    title: "GeeksforGeeks — DBMS Tutorial",
    source: "GeeksforGeeks",
    url: "https://www.geeksforgeeks.org/dbms/",
  },
  {
    subject: "dbms",
    type: "resource",
    title: "W3Schools — SQL Tutorial",
    source: "W3Schools",
    url: "https://www.w3schools.com/sql/",
  },
{
    subject: "dbms",
    type: "resource",
    title: "W3Schools — SQL Tutorial",
    source: "W3Schools",
    url: "https://www.w3schools.com/sql/",
  },

  // ── PDFs ──
  {
    subject: "dbms",
    type: "pdf",
    module: "Module 1: DBMS Fundamentals",
    moduleOrder: 1,
    subtopic: "Introduction to DBMS",
    subtopicOrder: 1,
    title: "DBMS Basics — Quick Reference (PDF)",
    size: "180 KB",
    pages: 6,
    url: "",
  },
  {
    subject: "dbms",
    type: "pdf",
    module: "Module 3: Normalization",
    moduleOrder: 3,
    subtopic: "Normal Forms",
    subtopicOrder: 1,
    title: "Normalization Cheat Sheet (1NF–3NF) (PDF)",
    size: "210 KB",
    pages: 5,
    url: "",
  },

  // ── SECOND QUIZ ──
  {
    subject: "dbms",
    type: "quiz",
    title: "SQL Basics Quiz",
    time: "8 min",
    difficulty: "Medium",
    questionBank: [
      {
        questionText: "Which SQL clause is used to filter rows before grouping?",
        options: ["HAVING", "WHERE", "GROUP BY", "ORDER BY"],
        correctAnswerIndex: 1,
      },
      {
        questionText: "Which SQL clause is used to filter groups after aggregation?",
        options: ["WHERE", "HAVING", "FILTER", "SELECT"],
        correctAnswerIndex: 1,
      },
      {
        questionText: "Which JOIN returns only matching rows from both tables?",
        options: ["LEFT JOIN", "RIGHT JOIN", "INNER JOIN", "FULL OUTER JOIN"],
        correctAnswerIndex: 2,
      },
    ],
  },

  // ── MOCK TEST ──
  {
    subject: "dbms",
    type: "mockTest",
    title: "DBMS Full Mock Test — Beginner",
    duration: 20,
    attempts: 0,
    positiveMarks: 1,
    negativeMarks: 0.33,
    questionBank: [
      {
        questionText: "What does DBMS stand for?",
        options: ["Data Backup Management System", "Database Management System", "Digital Business Management Software", "Data Block Management Service"],
        correctAnswerIndex: 1,
      },
      {
        questionText: "Which of the following is a NoSQL database?",
        options: ["MySQL", "PostgreSQL", "MongoDB", "Oracle"],
        correctAnswerIndex: 2,
      },
      {
        questionText: "A primary key can contain duplicate values.",
        options: ["True", "False"],
        correctAnswerIndex: 1,
      },
      {
        questionText: "What does a foreign key enforce?",
        options: ["Data encryption", "Referential integrity", "Faster queries", "Data compression"],
        correctAnswerIndex: 1,
      },
      {
        questionText: "Which normal form removes multi-valued columns?",
        options: ["1NF", "2NF", "3NF", "BCNF"],
        correctAnswerIndex: 0,
      },
      {
        questionText: "What is a transitive dependency violation associated with?",
        options: ["1NF", "2NF", "3NF", "0NF"],
        correctAnswerIndex: 2,
      },
      {
        questionText: "Which SQL command is used to remove a table entirely, including its structure?",
        options: ["DELETE", "TRUNCATE", "DROP", "REMOVE"],
        correctAnswerIndex: 2,
      },
      {
        questionText: "Which SQL clause sorts query results?",
        options: ["SORT BY", "ORDER BY", "GROUP BY", "ARRANGE BY"],
        correctAnswerIndex: 1,
      },
      {
        questionText: "What is the purpose of an index in a database?",
        options: ["To encrypt data", "To speed up data retrieval", "To back up data", "To compress storage"],
        correctAnswerIndex: 1,
      },
      {
        questionText: "Which of these is NOT a type of SQL JOIN?",
        options: ["INNER JOIN", "LEFT JOIN", "CROSS JOIN", "PARALLEL JOIN"],
        correctAnswerIndex: 3,
      },
    ],
  },
];

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB Atlas");

    await Content.deleteMany({ subject: "dbms" });
    console.log("🗑️  Cleared old DBMS content");

    await Content.insertMany(dbmsContent);
    console.log(`✅ Inserted ${dbmsContent.length} DBMS content items`);

    await mongoose.disconnect();
    console.log("👋 Done, disconnected");
    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding failed:", error.message);
    process.exit(1);
  }
};

seed();