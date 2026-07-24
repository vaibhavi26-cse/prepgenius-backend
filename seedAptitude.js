import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import Content from "./models/Content.js";

const aptitudeContent = [
  // ══ NOTES — QUANTITATIVE APTITUDE ══
  {
    subject: "aptitude",
    type: "note",
    module: "Module 1: Quantitative — Arithmetic Basics",
    moduleOrder: 1,
    subtopic: "Percentages, Profit & Loss",
    subtopicOrder: 1,
    title: "Percentages, Profit and Loss",
    pages: 6,
    body: `## Percentages, Profit and Loss

### Percentages

A **percentage** expresses a number as a fraction of 100. To convert a fraction to a percentage, multiply by 100.

\\\`\\\`\\\`
Percentage = (Part / Whole) × 100
\\\`\\\`\\\`

> Example: If 45 out of 60 students passed an exam, the pass percentage = (45/60) × 100 = 75%.

### Percentage Increase/Decrease

\\\`\\\`\\\`
% Change = ((New Value − Old Value) / Old Value) × 100
\\\`\\\`\\\`

A common trap: successive percentage changes don't simply add up. A 10% increase followed by a 10% decrease does **not** return you to the original value — it results in a 1% net decrease, because the second change is applied to a different (larger) base.

### Profit and Loss

| Term | Formula |
|---|---|
| Profit | Selling Price (SP) − Cost Price (CP), when SP > CP |
| Loss | Cost Price (CP) − Selling Price (SP), when CP > SP |
| Profit % | (Profit / CP) × 100 |
| Loss % | (Loss / CP) × 100 |

> Example: If an item costs ₹500 (CP) and is sold for ₹650 (SP), Profit = 150, and Profit % = (150/500) × 100 = 30%.

### Successive Discounts

When two discounts are applied one after another (e.g., 20% then 10%), the effective single discount is **not** simply 30%:

\\\`\\\`\\\`
Effective Discount = 1 − (1 − d1)(1 − d2)
= 1 − (0.8)(0.9) = 1 − 0.72 = 0.28 = 28%
\\\`\\\`\\\`

### Common Traps

- Assuming successive percentage changes add up linearly — they compound instead.
- Forgetting that profit/loss percentage is always calculated on **Cost Price**, not Selling Price, unless a question explicitly states otherwise.`,
  },
  {
    subject: "aptitude",
    type: "note",
    module: "Module 1: Quantitative — Arithmetic Basics",
    moduleOrder: 1,
    subtopic: "Time, Speed, Distance & Work",
    subtopicOrder: 2,
    title: "Time, Speed, Distance, and Work",
    pages: 7,
    body: `## Time, Speed, Distance, and Work

### The Core Relationship

\\\`\\\`\\\`
Distance = Speed × Time
Speed = Distance / Time
Time = Distance / Speed
\\\`\\\`\\\`

### Relative Speed

When two objects move **towards** each other, their speeds add up. When moving in the **same direction**, the relative speed is the difference.

> Example: Two trains moving towards each other at 60 km/h and 40 km/h have a relative (closing) speed of 100 km/h. If moving in the same direction, the relative speed would be just 20 km/h.

### Unit Conversion

\\\`\\\`\\\`
To convert km/h to m/s: multiply by (5/18)
To convert m/s to km/h: multiply by (18/5)
\\\`\\\`\\\`

### Time and Work

If a person can complete a job in \\\`n\\\` days, their work rate is \\\`1/n\\\` of the job per day.

\\\`\\\`\\\`
A can finish a job in 10 days -> A's rate = 1/10 per day
B can finish the same job in 15 days -> B's rate = 1/15 per day
Together: (1/10 + 1/15) = 3/30 + 2/30 = 5/30 = 1/6 per day
=> Together they finish the job in 6 days
\\\`\\\`\\\`

### Pipes and Cisterns (a Time & Work variant)

A filling pipe contributes **positive** work, while a draining/leaking pipe contributes **negative** work — the same combined-rate formula applies, just with a subtraction for the leak.

> Example: If a pipe fills a tank in 6 hours but a leak alone would empty it in 12 hours, the net rate is (1/6 − 1/12) = 1/12 per hour, so the tank fills fully in 12 hours with the leak present.

### Common Traps

- Forgetting to convert units (km/h vs m/s) before combining values in a single formula.
- Adding "days to complete" directly instead of adding **work rates** (1/days) when combining two workers.`,
  },
  {
    subject: "aptitude",
    type: "note",
    module: "Module 2: Quantitative — Numbers & Algebra",
    moduleOrder: 2,
    subtopic: "Number System, HCF & LCM",
    subtopicOrder: 1,
    title: "Number System, HCF, and LCM",
    pages: 6,
    body: `## Number System, HCF, and LCM

### Types of Numbers

| Type | Description | Example |
|---|---|---|
| Natural Numbers | Positive counting numbers | 1, 2, 3, ... |
| Whole Numbers | Natural numbers + 0 | 0, 1, 2, ... |
| Integers | Whole numbers + negatives | ..., -2, -1, 0, 1, 2, ... |
| Rational Numbers | Expressible as a fraction p/q | 1/2, 0.75, 5 |
| Prime Numbers | Exactly two factors: 1 and itself | 2, 3, 5, 7, 11 |

### HCF (Highest Common Factor) and LCM (Least Common Multiple)

- **HCF** — the largest number that divides two or more numbers exactly.
- **LCM** — the smallest number that is a multiple of two or more numbers.

\\\`\\\`\\\`
For any two numbers a and b:
HCF(a, b) × LCM(a, b) = a × b
\\\`\\\`\\\`

> Example: For 12 and 18 — HCF = 6, LCM = 36. Check: 6 × 36 = 216, and 12 × 18 = 216. ✓

### Finding HCF via Prime Factorization

\\\`\\\`\\\`
12 = 2² × 3
18 = 2 × 3²
HCF = 2¹ × 3¹ = 6   (lowest power of common primes)
LCM = 2² × 3² = 36  (highest power of all primes involved)
\\\`\\\`\\\`

### Divisibility Rules

| Divisor | Rule |
|---|---|
| 2 | Last digit is even |
| 3 | Sum of digits divisible by 3 |
| 5 | Last digit is 0 or 5 |
| 9 | Sum of digits divisible by 9 |
| 11 | Difference of alternating digit sums is divisible by 11 |

### Common Traps

- Confusing HCF and LCM formulas — remember HCF takes the *lowest* power of common primes, LCM takes the *highest* power of *all* primes.
- Forgetting the HCF × LCM = product-of-numbers shortcut, which is often faster than full factorization for two-number problems.`,
  },
  {
    subject: "aptitude",
    type: "note",
    module: "Module 2: Quantitative — Numbers & Algebra",
    moduleOrder: 2,
    subtopic: "Averages, Ratio & Proportion",
    subtopicOrder: 2,
    title: "Averages, Ratio, and Proportion",
    pages: 6,
    body: `## Averages, Ratio, and Proportion

### Average (Mean)

\\\`\\\`\\\`
Average = Sum of Values / Number of Values
\\\`\\\`\\\`

> Example: The average of 10, 20, and 30 is (10+20+30)/3 = 20.

### Weighted Average

When values contribute unequally (e.g., different group sizes), a weighted average accounts for the weight of each group:

\\\`\\\`\\\`
Weighted Average = (w1×v1 + w2×v2 + ...) / (w1 + w2 + ...)
\\\`\\\`\\\`

> Example: A class of 30 students averages 70 marks, and another class of 20 students averages 80 marks. Combined average = (30×70 + 20×80) / (30+20) = (2100+1600)/50 = 74, not a simple (70+80)/2 = 75.

### Ratio

A **ratio** compares two quantities of the same kind. A ratio of 3:2 means for every 3 units of one quantity, there are 2 units of the other.

\\\`\\\`\\\`
If A:B = 3:2 and total = 50,
A = (3/5) × 50 = 30
B = (2/5) × 50 = 20
\\\`\\\`\\\`

### Proportion

A **proportion** states that two ratios are equal: \\\`a:b = c:d\\\`, which means \\\`a × d = b × c\\\` (cross-multiplication).

> Example: If 4 workers complete a task in 6 days, how many days for 8 workers (assuming constant total work)? Using inverse proportion (more workers → less time): 4 × 6 = 8 × x → x = 3 days.

### Direct vs Inverse Proportion

| Type | Relationship | Example |
|---|---|---|
| Direct Proportion | As one increases, so does the other | More items bought → higher total cost |
| Inverse Proportion | As one increases, the other decreases | More workers → less time to finish a job |

### Common Traps

- Averaging two group averages directly without weighting by group size — only valid when group sizes are equal.
- Applying direct proportion logic to a problem that is actually inversely proportional (like workers vs. time), leading to a flipped/wrong answer.`,
  },

  // ══ NOTES — LOGICAL REASONING ══
  {
    subject: "aptitude",
    type: "note",
    module: "Module 3: Logical Reasoning — Verbal",
    moduleOrder: 3,
    subtopic: "Series & Coding-Decoding",
    subtopicOrder: 1,
    title: "Number/Letter Series and Coding-Decoding",
    pages: 6,
    body: `## Number/Letter Series and Coding-Decoding

### Number Series

A **number series** question asks you to identify the pattern governing a sequence and find the missing/next term.

> Example: 2, 6, 12, 20, 30, ? — the differences between consecutive terms are 4, 6, 8, 10, following an arithmetic pattern; the next difference is 12, so the answer is 30 + 12 = 42.

Common series patterns:

- **Arithmetic** — constant difference between terms (e.g., 3, 6, 9, 12).
- **Geometric** — constant ratio between terms (e.g., 2, 4, 8, 16).
- **Difference of differences** — the differences themselves follow a pattern (as in the example above).
- **Alternating patterns** — two interleaved series within one sequence (e.g., 1, 10, 3, 8, 5, 6, ? — odd positions increase by 2, even positions decrease by 2).

### Letter Series

Similar logic applies to letters, often based on their position in the alphabet.

\\\`\\\`\\\`
A, C, E, G, ?
Positions: 1, 3, 5, 7, ? -> pattern is +2 each time -> next position = 9 -> "I"
\\\`\\\`\\\`

### Coding-Decoding

**Coding-decoding** questions encode words/letters using a rule, and ask you to apply the same rule to a new word.

> Example: If "CAT" is coded as "DBU" (each letter shifted forward by 1 in the alphabet), then "DOG" would be coded as "EPH" (D→E, O→P, G→H).

Common coding schemes:

- **Letter shifting** — each letter shifted forward/backward by a fixed number of positions.
- **Number coding** — each letter replaced by its alphabetical position (A=1, B=2, ...) and then some arithmetic is applied.
- **Substitution coding** — a direct letter-to-letter or word-to-word mapping given in the question.

### Common Traps

- Assuming a series is always arithmetic or geometric on first glance — always check the differences AND the differences-of-differences before concluding.
- In coding-decoding, forgetting to double check letters near the boundary (Z wrapping to A) if the scheme involves shifting.`,
  },
  {
    subject: "aptitude",
    type: "note",
    module: "Module 3: Logical Reasoning — Verbal",
    moduleOrder: 3,
    subtopic: "Blood Relations & Direction Sense",
    subtopicOrder: 2,
    title: "Blood Relations and Direction Sense",
    pages: 6,
    body: `## Blood Relations and Direction Sense

### Blood Relations

These questions describe family relationships through a chain of statements, and ask you to determine how two people are related.

> Example: "A is B's father. B is C's sister. C is D's son." — Working through this: B and C are siblings (B is C's sister, meaning C has a sister named B), and since C is D's son, D is C's parent. A is B's father, and since B and C are siblings, A is also C's father, making A and D... actually, since C is D's son, D must be C's parent — so A (C's father) and D are the same person, OR D refers to a different generation depending on context. These chains require carefully drawing a **family tree diagram** step-by-step rather than tracking relationships mentally.

### Common Relationship Terms

| Term | Meaning |
|---|---|
| Sibling | Brother or sister (same parents) |
| Maternal | Related through the mother's side |
| Paternal | Related through the father's side |
| In-law | Related through marriage |

### Direction Sense

These questions track movement in the four cardinal directions (North, South, East, West) and ask for the final position or direction relative to the start.

\\\`\\\`\\\`
Start facing North.
Walk 5m North.
Turn right (now facing East).
Walk 3m East.
Turn right (now facing South).
Walk 5m South.
=> You are now 3m East of the starting point.
\\\`\\\`\\\`

### Key Technique

For direction questions, always **sketch a simple coordinate grid** (treat the start as origin (0,0), North as +y, East as +x) and plot each move — this avoids errors from trying to visualize turns purely in your head.

### Common Traps

- Turning "right" or "left" relative to the wrong current facing direction — always update your facing direction after each turn before applying the next move.
- In blood relation puzzles, assuming gender from a name alone — always rely only on explicitly stated relationships (e.g., "sister," "father") rather than assumptions.`,
  },
  {
    subject: "aptitude",
    type: "note",
    module: "Module 4: Logical Reasoning — Analytical",
    moduleOrder: 4,
    subtopic: "Syllogisms & Logical Deduction",
    subtopicOrder: 1,
    title: "Syllogisms and Logical Deduction",
    pages: 7,
    body: `## Syllogisms and Logical Deduction

A **syllogism** presents two or more statements (premises) and asks whether a given conclusion logically follows.

### The Four Statement Types

| Type | Form | Example |
|---|---|---|
| Universal Affirmative | All A are B | All cats are animals |
| Universal Negative | No A are B | No cats are dogs |
| Particular Affirmative | Some A are B | Some students are athletes |
| Particular Negative | Some A are not B | Some students are not athletes |

### Using Venn Diagrams

The most reliable technique for syllogisms is drawing **Venn diagrams** for each premise and checking which conclusions are true in **every possible** diagram that satisfies the premises — not just the most "obvious" one.

> Example: "All dogs are animals. All animals are living things." — Conclusion: "All dogs are living things" — this necessarily follows, since a chain of "All A are B" and "All B are C" always implies "All A are C."

> Example (trickier): "Some students are athletes. Some athletes are scholars." — Conclusion: "Some students are scholars" — this does **NOT** necessarily follow. The two "some" groups aren't guaranteed to overlap; you can draw a valid Venn diagram where the athlete-students and athlete-scholars are completely different subsets of athletes.

### Common Deduction Traps

- Assuming "Some A are B" and "Some B are C" implies "Some A are C" — it doesn't, since the two "some" subsets may not overlap.
- Assuming a syllogism conclusion is valid just because it "sounds reasonable" in the real world — validity in these questions is purely about logical necessity given the stated premises, not real-world plausibility.
- Confusing "No A are B" with "Some A are not B" — the first is much stronger (complete exclusion) than the second (partial exclusion).

### Common Interview/Test Traps

- Rushing to a conclusion without checking if a *counter-example diagram* exists that still satisfies all premises but breaks the proposed conclusion.`,
  },
  {
    subject: "aptitude",
    type: "note",
    module: "Module 4: Logical Reasoning — Analytical",
    moduleOrder: 4,
    subtopic: "Puzzles & Seating Arrangement",
    subtopicOrder: 2,
    title: "Puzzles and Seating Arrangement",
    pages: 7,
    body: `## Puzzles and Seating Arrangement

Seating arrangement and puzzle questions give a set of clues about people/objects and ask you to determine their exact arrangement or attributes.

### Types of Seating Arrangements

- **Linear** — people seated in a single row (facing the same or different directions).
- **Circular** — people seated around a table (facing inward or outward changes left/right interpretation).
- **Rectangular/Square** — a mix of linear positions on multiple sides.

### Key Technique: Process of Elimination with a Grid

1. List all fixed/definite clues first (e.g., "P sits at one end").
2. Place those on a diagram immediately.
3. Work through conditional clues ("if X, then Y") only after all direct clues are placed.
4. Use elimination — if a clue rules out a position, cross it off rather than leaving it ambiguous.

\\\`\\\`\\\`
Clue: "A sits immediately to the right of B."
Clue: "C sits at one of the ends."
Clue: "D does not sit next to A."

Start by placing C at an end (two cases: left end or right end),
then place A-B as a fixed adjacent pair, and use the D constraint
to eliminate invalid placements in each case.
\\\`\\\`\\\`

### Circular Arrangements: Facing Direction Matters

If people are seated **facing the center** of a circular table, "left" and "right" are mirrored compared to if they were seated **facing outward** — always confirm which orientation the question specifies before determining left/right neighbors.

> Example: In a circular table with people facing the center, if A is sitting to your left, and everyone faces inward, then from A's perspective, you are actually to A's right — directions flip depending on whose perspective you're using.

### Common Traps

- Forgetting to check both possible cases when a clue has two valid placements (e.g., "at one of the ends" could mean either end) — most puzzles require testing all cases until contradictions eliminate the wrong ones.
- Mixing up left/right in circular arrangements when the facing direction (inward vs outward) isn't tracked carefully.`,
  },

  // ══ PDFs ══
  {
    subject: "aptitude",
    type: "pdf",
    module: "Module 1: Quantitative — Arithmetic Basics",
    moduleOrder: 1,
    subtopic: "Time, Speed, Distance & Work",
    subtopicOrder: 2,
    title: "Time, Speed, Distance & Work — Formula Sheet (PDF)",
    size: "190 KB",
    pages: 5,
    url: "",
  },
  {
    subject: "aptitude",
    type: "pdf",
    module: "Module 4: Logical Reasoning — Analytical",
    moduleOrder: 4,
    subtopic: "Syllogisms & Logical Deduction",
    subtopicOrder: 1,
    title: "Syllogisms — Venn Diagram Quick Reference (PDF)",
    size: "160 KB",
    pages: 4,
    url: "",
  },

  // ══ RESOURCES ══
  {
    subject: "aptitude",
    type: "resource",
    title: "IndiaBIX — Quantitative Aptitude Practice",
    source: "IndiaBIX",
    url: "https://www.indiabix.com/aptitude/questions-and-answers/",
  },
  {
    subject: "aptitude",
    type: "resource",
    title: "IndiaBIX — Logical Reasoning Practice",
    source: "IndiaBIX",
    url: "https://www.indiabix.com/logical-reasoning/questions-and-answers/",
  },

  // ══ QUIZZES ══
  {
    subject: "aptitude",
    type: "quiz",
    title: "Percentages & Profit-Loss Quiz",
    time: "8 min",
    difficulty: "Easy",
    questionBank: [
      {
        questionText: "If the price of an item increases by 20% and then decreases by 20%, the net effect is:",
        options: ["No change", "4% decrease", "4% increase", "40% decrease"],
        correctAnswerIndex: 1,
      },
      {
        questionText: "An item bought for ₹400 is sold for ₹500. What is the profit percentage?",
        options: ["20%", "25%", "30%", "15%"],
        correctAnswerIndex: 1,
      },
      {
        questionText: "Profit percentage is calculated on:",
        options: ["Selling Price", "Cost Price", "Marked Price", "Discount"],
        correctAnswerIndex: 1,
      },
    ],
  },
  {
    subject: "aptitude",
    type: "quiz",
    title: "Time, Speed, Distance & Work Quiz",
    time: "8 min",
    difficulty: "Medium",
    questionBank: [
      {
        questionText: "To convert km/h to m/s, you multiply by:",
        options: ["18/5", "5/18", "10/3", "3/10"],
        correctAnswerIndex: 1,
      },
      {
        questionText: "If A can do a job in 10 days and B in 15 days, working together they finish in:",
        options: ["5 days", "6 days", "12.5 days", "25 days"],
        correctAnswerIndex: 1,
      },
      {
        questionText: "When two objects move towards each other, relative speed is:",
        options: ["The difference of their speeds", "The sum of their speeds", "Always zero", "The average of their speeds"],
        correctAnswerIndex: 1,
      },
    ],
  },
  {
    subject: "aptitude",
    type: "quiz",
    title: "Series & Coding-Decoding Quiz",
    time: "7 min",
    difficulty: "Medium",
    questionBank: [
      {
        questionText: "2, 6, 12, 20, 30, ? — What is the next number?",
        options: ["36", "40", "42", "44"],
        correctAnswerIndex: 2,
      },
      {
        questionText: "If CAT is coded as DBU (each letter +1), how is DOG coded?",
        options: ["EPH", "CPF", "EPG", "DPH"],
        correctAnswerIndex: 0,
      },
      {
        questionText: "A, C, E, G, ? — What comes next?",
        options: ["H", "I", "J", "K"],
        correctAnswerIndex: 1,
      },
    ],
  },
  {
    subject: "aptitude",
    type: "quiz",
    title: "Syllogisms & Deduction Quiz",
    time: "8 min",
    difficulty: "Hard",
    questionBank: [
      {
        questionText: "\"All dogs are animals. All animals are living things.\" Does \"All dogs are living things\" follow?",
        options: ["Yes, it necessarily follows", "No, it does not follow", "Cannot be determined", "Only sometimes true"],
        correctAnswerIndex: 0,
      },
      {
        questionText: "\"Some students are athletes. Some athletes are scholars.\" Does \"Some students are scholars\" follow?",
        options: ["Yes, always", "No, not necessarily", "Only if all athletes are scholars", "Cannot be represented in a Venn diagram"],
        correctAnswerIndex: 1,
      },
      {
        questionText: "\"No cats are dogs\" is an example of which statement type?",
        options: ["Universal Affirmative", "Universal Negative", "Particular Affirmative", "Particular Negative"],
        correctAnswerIndex: 1,
      },
    ],
  },

  // ══ MCQs ══
  {
    subject: "aptitude",
    type: "mcq",
    module: "Module 2: Quantitative — Numbers & Algebra",
    moduleOrder: 2,
    subtopic: "Number System, HCF & LCM",
    subtopicOrder: 1,
    title: "Number System & HCF/LCM — MCQ Set",
    questionBank: [
      {
        questionText: "HCF of 12 and 18 is:",
        options: ["3", "6", "9", "36"],
        correctAnswerIndex: 1,
      },
      {
        questionText: "LCM of 12 and 18 is:",
        options: ["18", "24", "36", "216"],
        correctAnswerIndex: 2,
      },
      {
        questionText: "HCF(a,b) × LCM(a,b) equals:",
        options: ["a + b", "a − b", "a × b", "a / b"],
        correctAnswerIndex: 2,
      },
      {
        questionText: "A number is divisible by 3 if:",
        options: ["Its last digit is even", "The sum of its digits is divisible by 3", "It ends in 0 or 5", "It is a prime number"],
        correctAnswerIndex: 1,
      },
    ],
  },
  {
    subject: "aptitude",
    type: "mcq",
    module: "Module 3: Logical Reasoning — Verbal",
    moduleOrder: 3,
    subtopic: "Blood Relations & Direction Sense",
    subtopicOrder: 2,
    title: "Blood Relations & Direction Sense — MCQ Set",
    questionBank: [
      {
        questionText: "If you start facing North and turn right twice, you are now facing:",
        options: ["North", "South", "East", "West"],
        correctAnswerIndex: 1,
      },
      {
        questionText: "\"B is A's brother's daughter\" means B is A's:",
        options: ["Sister", "Niece", "Cousin", "Aunt"],
        correctAnswerIndex: 1,
      },
      {
        questionText: "The best technique for solving direction sense problems is to:",
        options: ["Visualize purely in your head", "Sketch a coordinate grid and plot each move", "Guess based on the first move only", "Ignore turns and just count distance"],
        correctAnswerIndex: 1,
      },
      {
        questionText: "\"Maternal\" relations refer to relatives on the:",
        options: ["Father's side", "Mother's side", "Spouse's side", "Sibling's side"],
        correctAnswerIndex: 1,
      },
    ],
  },

  // ══ INTERVIEW QUESTIONS ══
  {
    subject: "aptitude",
    type: "interviewQuestion",
    module: "Module 1: Quantitative — Arithmetic Basics",
    moduleOrder: 1,
    subtopic: "Percentages, Profit & Loss",
    subtopicOrder: 1,
    question: "Why doesn't a 10% increase followed by a 10% decrease bring a value back to its original amount?",
    answer:
      "Because each percentage change is applied to a different base value. A 10% increase on the original value raises it to 110% of the original. The subsequent 10% decrease is then applied to this new, larger value (110%), not the original 100% — so it removes 11% of the original (10% of 110), leaving 99% of the original value. This results in a net 1% decrease rather than returning to the starting value, which is why successive percentage changes must be compounded rather than simply added or subtracted.",
  },
  {
    subject: "aptitude",
    type: "interviewQuestion",
    module: "Module 1: Quantitative — Arithmetic Basics",
    moduleOrder: 1,
    subtopic: "Time, Speed, Distance & Work",
    subtopicOrder: 2,
    question: "If A can complete a job in 10 days and B can complete it in 15 days, how do you find how long they take working together, and why not just average the two times?",
    answer:
      "You add their individual work rates rather than averaging their times. A's rate is 1/10 of the job per day, and B's rate is 1/15 per day. Combined rate = 1/10 + 1/15 = 3/30 + 2/30 = 5/30 = 1/6 of the job per day, meaning together they finish in 6 days. Simply averaging the days (10 and 15 to get 12.5) is incorrect because work rates, not raw day-counts, combine additively — a faster worker's rate contributes proportionally more to the combined rate than a slower worker's.",
  },
  {
    subject: "aptitude",
    type: "interviewQuestion",
    module: "Module 4: Logical Reasoning — Analytical",
    moduleOrder: 4,
    subtopic: "Syllogisms & Logical Deduction",
    subtopicOrder: 1,
    question: "Why doesn't \"Some A are B\" combined with \"Some B are C\" guarantee \"Some A are C\"?",
    answer:
      "Because the two 'some' subsets of B referenced in each premise aren't guaranteed to be the same subset. The A-related portion of B and the C-related portion of B could be entirely disjoint parts of B, in which case there's no overlap between A and C at all. You can always draw a valid Venn diagram satisfying both premises where the A-B overlap and B-C overlap don't intersect, which shows the conclusion 'Some A are C' isn't logically forced — it's only a possibility, not a certainty, which is why syllogism validity must be checked against every possible diagram, not just the most intuitive one.",
  },
  {
    subject: "aptitude",
    type: "interviewQuestion",
    module: "Module 3: Logical Reasoning — Verbal",
    moduleOrder: 3,
    subtopic: "Series & Coding-Decoding",
    subtopicOrder: 1,
    question: "What is the general strategy for solving a number series problem where the pattern isn't immediately obvious?",
    answer:
      "Start by checking the simplest patterns first — a constant difference (arithmetic) or constant ratio (geometric) between consecutive terms. If neither fits, compute the differences between terms and check if that new sequence of differences itself follows a simple pattern (a 'difference of differences' approach), which reveals quadratic-style series. If that also fails, check for alternating or interleaved patterns, where odd-position and even-position terms each follow their own separate simple rule. Working systematically through these levels, rather than guessing, reliably surfaces the underlying pattern.",
  },

  // ══ MOCK TESTS ══
  {
    subject: "aptitude",
    type: "mockTest",
    title: "Quantitative Aptitude Full Mock Test — Beginner",
    duration: 25,
    attempts: 0,
    positiveMarks: 1,
    negativeMarks: 0.25,
    questionBank: [
      {
        questionText: "45 out of 60 students passed an exam. What is the pass percentage?",
        options: ["65%", "70%", "75%", "80%"],
        correctAnswerIndex: 2,
      },
      {
        questionText: "An article is bought for ₹500 and sold for ₹650. Find the profit percentage.",
        options: ["20%", "25%", "30%", "35%"],
        correctAnswerIndex: 2,
      },
      {
        questionText: "A train travels at 90 km/h. What is its speed in m/s?",
        options: ["20 m/s", "25 m/s", "30 m/s", "35 m/s"],
        correctAnswerIndex: 1,
      },
      {
        questionText: "A can do a piece of work in 10 days, B in 15 days. Working together, how many days will they take?",
        options: ["5 days", "6 days", "8 days", "12 days"],
        correctAnswerIndex: 1,
      },
      {
        questionText: "HCF of 12 and 18 is:",
        options: ["3", "6", "9", "12"],
        correctAnswerIndex: 1,
      },
      {
        questionText: "LCM of 4 and 6 is:",
        options: ["8", "10", "12", "24"],
        correctAnswerIndex: 2,
      },
      {
        questionText: "The average of 10, 20, and 30 is:",
        options: ["15", "20", "25", "30"],
        correctAnswerIndex: 1,
      },
      {
        questionText: "If A:B = 3:2 and total is 50, what is A?",
        options: ["20", "25", "30", "35"],
        correctAnswerIndex: 2,
      },
      {
        questionText: "If 4 workers finish a job in 6 days, how many days will 8 workers take (same total work)?",
        options: ["2 days", "3 days", "4 days", "12 days"],
        correctAnswerIndex: 1,
      },
      {
        questionText: "A 20% discount followed by a 10% discount gives an effective discount of:",
        options: ["30%", "28%", "25%", "32%"],
        correctAnswerIndex: 1,
      },
    ],
  },
  {
    subject: "aptitude",
    type: "mockTest",
    title: "Logical Reasoning Full Mock Test — Beginner",
    duration: 25,
    attempts: 0,
    positiveMarks: 1,
    negativeMarks: 0.25,
    questionBank: [
      {
        questionText: "2, 6, 12, 20, 30, ? — Find the next term.",
        options: ["36", "40", "42", "44"],
        correctAnswerIndex: 2,
      },
      {
        questionText: "If CAT is coded as DBU, how is DOG coded (same rule)?",
        options: ["EPH", "CNF", "EPG", "DPH"],
        correctAnswerIndex: 0,
      },
      {
        questionText: "Facing North, after two right turns, you face:",
        options: ["North", "East", "South", "West"],
        correctAnswerIndex: 2,
      },
      {
        questionText: "\"B is A's brother's daughter.\" B is A's:",
        options: ["Sister", "Niece", "Cousin", "Daughter"],
        correctAnswerIndex: 1,
      },
      {
        questionText: "\"All dogs are animals. All animals are living things.\" Which conclusion necessarily follows?",
        options: ["All living things are dogs", "All dogs are living things", "Some animals are not dogs", "No dogs are living things"],
        correctAnswerIndex: 1,
      },
      {
        questionText: "\"Some A are B. Some B are C.\" Which conclusion necessarily follows?",
        options: ["Some A are C", "All A are C", "No A are C", "None of the above necessarily follows"],
        correctAnswerIndex: 3,
      },
      {
        questionText: "In a circular seating arrangement with people facing the center, directions (left/right) are:",
        options: ["The same as if facing outward", "Mirrored compared to facing outward", "Irrelevant", "Always North-South based"],
        correctAnswerIndex: 1,
      },
      {
        questionText: "A, C, E, G, ? — What comes next in the letter series?",
        options: ["H", "I", "J", "K"],
        correctAnswerIndex: 1,
      },
      {
        questionText: "\"No cats are dogs\" is a statement of type:",
        options: ["Universal Affirmative", "Universal Negative", "Particular Affirmative", "Particular Negative"],
        correctAnswerIndex: 1,
      },
      {
        questionText: "The best approach for a seating arrangement puzzle with multiple conditional clues is to:",
        options: ["Guess the most likely arrangement first", "Place definite clues first, then work through conditional ones with elimination", "Solve conditional clues before definite ones", "Ignore clues that seem contradictory"],
        correctAnswerIndex: 1,
      },
    ],
  },
];

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB Atlas");

    await Content.deleteMany({ subject: "aptitude" });
    console.log("🗑️  Cleared old Aptitude content");

    await Content.insertMany(aptitudeContent);
    console.log(`✅ Inserted ${aptitudeContent.length} Aptitude content items`);

    await mongoose.disconnect();
    console.log("👋 Done, disconnected");
    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding failed:", error.message);
    process.exit(1);
  }
};

seed();