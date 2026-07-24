import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import Content from "./models/Content.js";

const oopsContent = [
  // ══ NOTES ══
  {
    subject: "oops",
    type: "note",
    module: "Module 1: OOP Fundamentals",
    moduleOrder: 1,
    subtopic: "Introduction to OOP",
    subtopicOrder: 1,
    title: "What is Object-Oriented Programming?",
    pages: 4,
    body: `## What is Object-Oriented Programming?

**Object-Oriented Programming (OOP)** is a programming paradigm based on the concept of "objects" — self-contained units that bundle together data (attributes) and behavior (methods) that operate on that data.

Instead of writing a program as a sequence of instructions (like in procedural programming), OOP models real-world entities as objects. For example, a "Car" object might have attributes like color and speed, and methods like accelerate() and brake().

### Why OOP Matters

- **Code Reusability** — once a class is written, it can be reused to create many objects.
- **Modularity** — each object is a self-contained module, making large systems easier to manage.
- **Maintainability** — changes to one class rarely break unrelated parts of the program.
- **Real-world Modeling** — OOP naturally maps to how we think about real-world entities.

### The Four Pillars of OOP

| Pillar | What it means |
|---|---|
| Encapsulation | Bundling data and methods, hiding internal details |
| Abstraction | Showing only essential features, hiding complexity |
| Inheritance | A class acquiring properties/behavior from another class |
| Polymorphism | Objects taking many forms (same method, different behavior) |

> Example: A "Vehicle" super-concept can be specialized into "Car," "Bike," and "Truck" — each sharing common behavior (like move()) while also having their own unique features. This is OOP thinking in action.

We'll explore each of these pillars in detail in the upcoming modules.`,
  },
  {
    subject: "oops",
    type: "note",
    module: "Module 1: OOP Fundamentals",
    moduleOrder: 1,
    subtopic: "Classes & Objects",
    subtopicOrder: 2,
    title: "Classes and Objects",
    pages: 5,
    body: `## Classes and Objects

A **class** is a blueprint or template for creating objects. It defines what attributes (data) and methods (behavior) the objects created from it will have.

An **object** is a specific instance of a class — actual data stored in memory, created using that blueprint.

> Example: Think of a class as an architect's blueprint for a house, and objects as the actual houses built from that blueprint. You can build many houses (objects) from one blueprint (class), and each house can have different paint colors (attribute values) while still following the same structural design.

### Example

\\\`\\\`\\\`
class Car:
    attributes: brand, color, speed
    method accelerate():
        speed = speed + 10
\\\`\\\`\\\`

Creating objects:

\\\`\\\`\\\`
car1 = new Car("Toyota", "Red", 0)
car2 = new Car("Honda", "Blue", 0)
\\\`\\\`\\\`

car1 and car2 are two separate objects of the same class Car. Changing car1's color does not affect car2 — each object has its own copy of the attributes (unless explicitly shared, e.g. via static/class-level variables).

### Key Terms

- **Instance** — another word for "object" — an object is an instance of a class.
- **Instantiation** — the process of creating an object from a class.
- **this / self** — a reference within a class's methods to the specific object the method is currently operating on.

### Common Interview Traps

- Confusing "class" (the blueprint, exists once) with "object" (the instance, can exist many times).
- Forgetting that changes to one object's attributes don't affect other objects of the same class.`,
  },
  {
    subject: "oops",
    type: "note",
    module: "Module 2: Inheritance & Polymorphism",
    moduleOrder: 2,
    subtopic: "Inheritance",
    subtopicOrder: 1,
    title: "Inheritance Fundamentals",
    pages: 6,
    body: `## Inheritance Fundamentals

**Inheritance** allows a class (called a **subclass** or **child class**) to acquire the properties and methods of another class (called a **superclass** or **parent class**). This promotes code reuse — common behavior is written once in the parent class, and shared by all children.

### Example

\\\`\\\`\\\`
class Animal:
    attribute name
    method eat():
        print(name + " is eating")

class Dog extends Animal:
    method bark():
        print(name + " says Woof!")
\\\`\\\`\\\`

Here, Dog inherits the 'name' attribute and eat() method from Animal, and adds its own new method bark(). A Dog object can call both eat() (inherited) and bark() (its own).

### Types of Inheritance

- **Single Inheritance** — one child class inherits from one parent class.
- **Multilevel Inheritance** — a chain: Class C inherits from Class B, which inherits from Class A.
- **Hierarchical Inheritance** — multiple child classes inherit from the same parent class.
- **Multiple Inheritance** — a class inherits from more than one parent class directly (supported in C++/Python, but not Java — Java uses interfaces instead).

### Method Overriding

A subclass can redefine (override) a method it inherited from its parent, to provide its own specific behavior, while keeping the same method name and signature.

### The 'super' Keyword

Used within a subclass to call the parent class's version of a method or constructor — useful when you want to **extend** rather than completely replace the parent's behavior.

> Example: A Dog's makeSound() might call super.makeSound() first to log a generic "Animal made a sound" message, then add its own "Woof!" on top.

### Common Interview Traps

- Confusing "inheritance" (is-a relationship) with "composition" (has-a relationship) — these solve different problems.
- Overusing inheritance for code reuse when composition would be more flexible ("favor composition over inheritance" is a well-known design principle).`,
  },
  {
    subject: "oops",
    type: "note",
    module: "Module 2: Inheritance & Polymorphism",
    moduleOrder: 2,
    subtopic: "Polymorphism",
    subtopicOrder: 2,
    title: "Polymorphism in Practice",
    pages: 5,
    body: `## Polymorphism in Practice

**Polymorphism** means "many forms." In OOP, it refers to the ability of different objects to respond to the same method call in ways specific to their own class.

### Two Main Types

**1. Compile-time Polymorphism (Method Overloading)**

Multiple methods with the same name but different parameters exist within the same class. The correct one is chosen based on the arguments provided, decided at compile time.

\\\`\\\`\\\`
add(int a, int b)             // sum of two integers
add(int a, int b, int c)      // sum of three integers
\\\`\\\`\\\`

**2. Runtime Polymorphism (Method Overriding)**

A subclass overrides a method inherited from its parent class, and the correct version to run is determined at runtime based on the actual object type — even if the code refers to it using the parent class's type.

\\\`\\\`\\\`
class Shape:
    method area():
        return 0

class Circle extends Shape:
    method area():
        return 3.14 * radius * radius

class Square extends Shape:
    method area():
        return side * side
\\\`\\\`\\\`

If you have a list of Shape objects containing both Circle and Square instances, calling shape.area() on each one automatically calls the correct version — this is polymorphism in action.

> Example: A payment system might have processPayment() defined generically in a Payment class, but overridden differently in CreditCardPayment, UPIPayment, and NetBankingPayment subclasses — the calling code stays the same regardless of which subtype is used.

### Why It Matters

Polymorphism lets you write code that works with a general type (Shape) without needing to know the exact subtype in advance — a cornerstone of scalable software design.

### Common Interview Traps

- Confusing overloading (compile-time, same class, different parameters) with overriding (runtime, subclass, same signature).
- Assuming overloaded methods are resolved based on return type alone — they're resolved based on parameter types/count.`,
  },
  {
    subject: "oops",
    type: "note",
    module: "Module 3: Abstraction & Encapsulation",
    moduleOrder: 3,
    subtopic: "Encapsulation",
    subtopicOrder: 1,
    title: "Encapsulation Explained",
    pages: 4,
    body: `## Encapsulation Explained

**Encapsulation** is the practice of bundling data (attributes) and the methods that operate on that data into a single unit (a class), while restricting direct access to some of the object's internal details.

### Why Hide Data?

Encapsulation protects an object's internal state from being changed in unexpected or invalid ways by outside code. Instead of directly modifying a variable, external code interacts through controlled methods (often called **getters** and **setters**).

### Example

\\\`\\\`\\\`
class BankAccount:
    private balance = 0

    method deposit(amount):
        if amount > 0:
            balance = balance + amount

    method getBalance():
        return balance
\\\`\\\`\\\`

Here, 'balance' is private — no outside code can set it directly to an invalid value (like a negative number). It can only be changed through the deposit() method, which enforces the rule that amount must be positive.

### Access Modifiers

| Modifier | Access Level |
|---|---|
| Private | Accessible only within the class itself |
| Protected | Accessible within the class and its subclasses |
| Public | Accessible from anywhere |

> Example: If 'balance' were public, any part of the program could do \\\`account.balance = -500\\\`, breaking the invariant that balances shouldn't go negative. Encapsulation prevents this entirely.

### Benefits of Encapsulation

- Prevents invalid states (e.g., negative bank balance).
- Makes it easier to change internal implementation later without breaking code that uses the class.
- Improves security by controlling exactly how data can be accessed or modified.`,
  },
  {
    subject: "oops",
    type: "note",
    module: "Module 3: Abstraction & Encapsulation",
    moduleOrder: 3,
    subtopic: "Abstraction",
    subtopicOrder: 2,
    title: "Abstraction in OOP",
    pages: 5,
    body: `## Abstraction in OOP

**Abstraction** means showing only the essential features of an object while hiding the internal implementation complexity from the user.

### Real-World Analogy

> Example: When you drive a car, you interact with a simple interface — steering wheel, pedals, gear stick. You don't need to know how the engine's combustion cycle works internally. The car "abstracts away" that complexity, exposing only what's necessary to operate it.

### Abstraction vs Encapsulation

These two are often confused:

| Concept | Focus |
|---|---|
| Abstraction | **What** an object does (hiding complexity of the "how") |
| Encapsulation | **How** data is protected (hiding internal state) |

Abstraction is about design/interface simplicity. Encapsulation is about data protection and access control. They often work together, but they solve different problems.

### Achieving Abstraction

Abstraction is typically implemented using:

- **Abstract classes** — classes that cannot be instantiated directly, and may define some methods fully while leaving others abstract (to be implemented by subclasses).
- **Interfaces** — a contract defining method signatures that implementing classes must provide, without any implementation details.

\\\`\\\`\\\`
abstract class PaymentMethod:
    abstract method processPayment(amount)

class CreditCard extends PaymentMethod:
    method processPayment(amount):
        // actual credit card logic here
\\\`\\\`\\\`

Any code using a PaymentMethod only needs to call processPayment() — it doesn't need to know the specific implementation details of how a credit card, UPI, or net banking payment actually gets processed.

### Common Interview Traps

- Treating abstraction and encapsulation as identical concepts — they're related but distinct.
- Forgetting that abstract classes CAN have some fully implemented methods too, not just abstract ones.`,
  },
  {
    subject: "oops",
    type: "note",
    module: "Module 4: Advanced OOP Concepts",
    moduleOrder: 4,
    subtopic: "Constructors",
    subtopicOrder: 1,
    title: "Constructors and Object Initialization",
    pages: 4,
    body: `## Constructors and Object Initialization

A **constructor** is a special method automatically called when an object is created from a class. Its job is to initialize the object's attributes to valid starting values.

### Example

\\\`\\\`\\\`
class Car:
    constructor(brand, color):
        this.brand = brand
        this.color = color
        this.speed = 0   // default value, not passed in

car1 = new Car("Toyota", "Red")
\\\`\\\`\\\`

When \\\`new Car("Toyota", "Red")\\\` runs, the constructor automatically sets brand and color from the arguments, and initializes speed to 0.

### Default Constructor

If you don't define any constructor, most languages automatically provide a default one that takes no arguments and does minimal setup (often just allocating memory).

### Constructor Overloading

Like regular methods, constructors can be overloaded — a class can have multiple constructors with different parameter lists, giving flexibility in how objects are created.

\\\`\\\`\\\`
class Car:
    constructor():
        this.brand = "Unknown"
    constructor(brand):
        this.brand = brand
\\\`\\\`\\\`

### Destructors

Some languages (like C++) also support **destructors** — special methods called automatically when an object is about to be destroyed/deallocated, often used to release resources like file handles or network connections. Languages with automatic garbage collection (Java, Python, JavaScript) typically don't require manual destructors, since the runtime handles memory cleanup.

> Example: A DatabaseConnection class might use a destructor (or equivalent cleanup method) to ensure the connection is properly closed when the object is no longer needed, preventing resource leaks.`,
  },
  {
    subject: "oops",
    type: "note",
    module: "Module 4: Advanced OOP Concepts",
    moduleOrder: 4,
    subtopic: "Interfaces & Abstract Classes",
    subtopicOrder: 2,
    title: "Interfaces vs Abstract Classes",
    pages: 6,
    body: `## Interfaces vs Abstract Classes

Both interfaces and abstract classes are tools for achieving abstraction, but they differ in important ways.

### Abstract Class

- Can have both fully implemented methods AND abstract (unimplemented) methods.
- Can have constructors and instance variables with actual state.
- A class can inherit from only **one** abstract class (in most single-inheritance languages like Java).

### Interface

- Traditionally, all methods are abstract (just signatures, no implementation) — though modern languages like Java now allow default method implementations too.
- Cannot have constructors or typical instance state.
- A class can implement **multiple** interfaces — this is how languages without multiple inheritance (like Java) still achieve similar flexibility.

### Comparison

| Aspect | Abstract Class | Interface |
|---|---|---|
| Multiple inheritance | No (single class) | Yes (multiple interfaces) |
| Method implementation | Can mix implemented + abstract | Traditionally all abstract |
| Constructors | Yes | No |
| State (instance variables) | Yes | No (or constants only) |
| Use case | "is-a" relationship with shared code | "can-do" capability contract |

### Example

\\\`\\\`\\\`
interface Flyable:
    method fly()

interface Swimmable:
    method swim()

class Duck implements Flyable, Swimmable:
    method fly(): ...
    method swim(): ...
\\\`\\\`\\\`

A Duck can implement both Flyable and Swimmable — something not possible with single-inheritance abstract classes.

> Example: Choose an abstract class when subclasses share significant common code and a clear "is-a" hierarchy (e.g., all Shapes share some logic). Choose an interface when you need to define a capability that unrelated classes might share (e.g., both a Duck and an Airplane can be Flyable, despite having nothing else in common).

### Common Interview Traps

- Claiming interfaces "can never" have implementation — modern Java (8+) allows default methods in interfaces.
- Not being able to clearly articulate WHEN to choose one over the other — interviewers often probe this design judgment specifically.`,
  },

  // ══ PDFs ══
  {
    subject: "oops",
    type: "pdf",
    module: "Module 1: OOP Fundamentals",
    moduleOrder: 1,
    subtopic: "Introduction to OOP",
    subtopicOrder: 1,
    title: "OOP Fundamentals — Quick Reference (PDF)",
    size: "175 KB",
    pages: 4,
    url: "",
  },
  {
    subject: "oops",
    type: "pdf",
    module: "Module 2: Inheritance & Polymorphism",
    moduleOrder: 2,
    subtopic: "Inheritance",
    subtopicOrder: 1,
    title: "Inheritance & Polymorphism Cheat Sheet (PDF)",
    size: "190 KB",
    pages: 5,
    url: "",
  },
  {
    subject: "oops",
    type: "pdf",
    module: "Module 4: Advanced OOP Concepts",
    moduleOrder: 4,
    subtopic: "Interfaces & Abstract Classes",
    subtopicOrder: 2,
    title: "Interfaces vs Abstract Classes (PDF)",
    size: "140 KB",
    pages: 3,
    url: "",
  },

  // ══ RESOURCES ══
  {
    subject: "oops",
    type: "resource",
    title: "GeeksforGeeks — OOP Concepts",
    source: "GeeksforGeeks",
    url: "https://www.geeksforgeeks.org/object-oriented-programming-oops-concept-in-java/",
  },
  {
    subject: "oops",
    type: "resource",
    title: "Programiz — OOP Introduction",
    source: "Programiz",
    url: "https://www.programiz.com/java-programming/object-class",
  },

  // ══ QUIZZES ══
  {
    subject: "oops",
    type: "quiz",
    title: "OOP Fundamentals Quiz",
    time: "10 min",
    difficulty: "Easy",
    questionBank: [
      {
        questionText: "What does OOP stand for?",
        options: ["Object-Oriented Programming", "Ordered Object Process", "Open Operation Protocol", "Object Order Principle"],
        correctAnswerIndex: 0,
      },
      {
        questionText: "Which of these is NOT one of the four pillars of OOP?",
        options: ["Encapsulation", "Inheritance", "Compilation", "Polymorphism"],
        correctAnswerIndex: 2,
      },
      {
        questionText: "What is a class in OOP?",
        options: ["An instance of an object", "A blueprint for creating objects", "A type of loop", "A variable type"],
        correctAnswerIndex: 1,
      },
      {
        questionText: "What is the process of creating an object from a class called?",
        options: ["Compilation", "Inheritance", "Instantiation", "Encapsulation"],
        correctAnswerIndex: 2,
      },
    ],
  },
  {
    subject: "oops",
    type: "quiz",
    title: "Inheritance & Polymorphism Quiz",
    time: "10 min",
    difficulty: "Medium",
    questionBank: [
      {
        questionText: "What keyword is used to call a parent class's method from a subclass?",
        options: ["this", "super", "parent", "base"],
        correctAnswerIndex: 1,
      },
      {
        questionText: "Method overloading is resolved at:",
        options: ["Runtime", "Compile time", "Both equally", "Neither"],
        correctAnswerIndex: 1,
      },
      {
        questionText: "Which type of inheritance involves multiple child classes inheriting from one parent?",
        options: ["Multilevel", "Hierarchical", "Multiple", "Single"],
        correctAnswerIndex: 1,
      },
    ],
  },
  {
    subject: "oops",
    type: "quiz",
    title: "Encapsulation & Abstraction Quiz",
    time: "8 min",
    difficulty: "Medium",
    questionBank: [
      {
        questionText: "Which OOP concept focuses on hiding implementation complexity, showing only essential features?",
        options: ["Encapsulation", "Abstraction", "Inheritance", "Polymorphism"],
        correctAnswerIndex: 1,
      },
      {
        questionText: "A getter/setter pattern is most closely associated with which concept?",
        options: ["Abstraction", "Encapsulation", "Polymorphism", "Inheritance"],
        correctAnswerIndex: 1,
      },
    ],
  },

  // ══ MCQs ══
  {
    subject: "oops",
    type: "mcq",
    title: "Encapsulation & Access Modifiers",
    time: "6 min",
    difficulty: "Medium",
    questionBank: [
      {
        questionText: "Which access modifier allows access only within the same class?",
        options: ["Public", "Protected", "Private", "Static"],
        correctAnswerIndex: 2,
      },
      {
        questionText: "What is the main benefit of encapsulation?",
        options: ["Faster code execution", "Protecting internal object state from invalid changes", "Reducing file size", "Enabling multiple inheritance"],
        correctAnswerIndex: 1,
      },
    ],
  },
  {
    subject: "oops",
    type: "mcq",
    title: "Advanced OOP Concepts MCQs",
    time: "8 min",
    difficulty: "Hard",
    questionBank: [
      {
        questionText: "Can a class implement multiple interfaces in Java?",
        options: ["No, never", "Yes, always", "Only with special permission", "Only abstract classes can"],
        correctAnswerIndex: 1,
      },
      {
        questionText: "What is called automatically when an object is created?",
        options: ["Destructor", "Constructor", "Finalizer", "Initializer method (manually)"],
        correctAnswerIndex: 1,
      },
      {
        questionText: "Which of these can have constructors?",
        options: ["Interfaces only", "Abstract classes only", "Both interfaces and abstract classes", "Neither"],
        correctAnswerIndex: 1,
      },
    ],
  },

  // ══ INTERVIEW QUESTIONS ══
  {
    subject: "oops",
    type: "interviewQuestion",
    module: "Module 1: OOP Fundamentals",
    moduleOrder: 1,
    subtopic: "Introduction to OOP",
    subtopicOrder: 1,
    question: "What are the four pillars of OOP? Briefly explain each.",
    answer:
      "The four pillars are: (1) Encapsulation — bundling data and methods together while restricting direct access to internal state; (2) Abstraction — showing only essential features while hiding implementation complexity; (3) Inheritance — allowing a class to acquire properties and behavior from another class, promoting code reuse; (4) Polymorphism — allowing objects of different classes to respond to the same method call in their own specific way.",
  },
  {
    subject: "oops",
    type: "interviewQuestion",
    module: "Module 2: Inheritance & Polymorphism",
    moduleOrder: 2,
    subtopic: "Inheritance",
    subtopicOrder: 1,
    question: "What is the difference between method overloading and method overriding?",
    answer:
      "Method overloading occurs when multiple methods in the same class share a name but differ in parameters (number or type) — resolved at compile time. Method overriding occurs when a subclass redefines a method it inherited from its parent class, keeping the same signature — resolved at runtime based on the actual object type. Overloading is about having multiple versions of a method; overriding is about replacing a parent's version.",
  },
  {
    subject: "oops",
    type: "interviewQuestion",
    module: "Module 3: Abstraction & Encapsulation",
    moduleOrder: 3,
    subtopic: "Encapsulation",
    subtopicOrder: 1,
    question: "Why would you make a class attribute private instead of public?",
    answer:
      "Making an attribute private prevents external code from directly modifying it in ways that could leave the object in an invalid state. Instead, access is controlled through public methods (getters/setters) that can validate changes — for example, ensuring a bank balance never becomes negative. This also allows the internal implementation to change later without breaking code that depends on the class's public interface.",
  },
  {
    subject: "oops",
    type: "interviewQuestion",
    module: "Module 3: Abstraction & Encapsulation",
    moduleOrder: 3,
    subtopic: "Abstraction",
    subtopicOrder: 2,
    question: "What is the difference between abstraction and encapsulation?",
    answer:
      "Abstraction is about hiding implementation complexity and exposing only essential features — it's a design-level concept focused on 'what' an object does. Encapsulation is about bundling data with methods and restricting direct access to that data — it's focused on 'how' data is protected. They're related and often used together, but abstraction is about interface simplicity while encapsulation is about data protection.",
  },
  {
    subject: "oops",
    type: "interviewQuestion",
    module: "Module 4: Advanced OOP Concepts",
    moduleOrder: 4,
    subtopic: "Interfaces & Abstract Classes",
    subtopicOrder: 2,
    question: "When would you use an interface instead of an abstract class?",
    answer:
      "Use an interface when you need to define a capability or contract that unrelated classes might share, and when a class needs to implement multiple such capabilities (since most languages allow implementing multiple interfaces but inheriting from only one class). Use an abstract class when subclasses share significant common code and follow a clear 'is-a' hierarchy, and when you need constructors or shared instance state across the hierarchy.",
  },

  // ══ MOCK TEST ══
  {
    subject: "oops",
    type: "mockTest",
    title: "OOPS Full Mock Test — Beginner",
    duration: 20,
    attempts: 0,
    positiveMarks: 1,
    negativeMarks: 0.33,
    questionBank: [
      {
        questionText: "What does OOP stand for?",
        options: ["Object-Oriented Programming", "Ordered Object Process", "Open Operation Protocol", "Object Order Principle"],
        correctAnswerIndex: 0,
      },
      {
        questionText: "Which pillar of OOP focuses on hiding implementation complexity?",
        options: ["Encapsulation", "Abstraction", "Inheritance", "Polymorphism"],
        correctAnswerIndex: 1,
      },
      {
        questionText: "What is the process of creating an object from a class called?",
        options: ["Compilation", "Inheritance", "Instantiation", "Encapsulation"],
        correctAnswerIndex: 2,
      },
      {
        questionText: "Method overloading is resolved at:",
        options: ["Runtime", "Compile time", "Both equally", "Neither"],
        correctAnswerIndex: 1,
      },
      {
        questionText: "What keyword lets a subclass call its parent's method?",
        options: ["this", "super", "parent", "base"],
        correctAnswerIndex: 1,
      },
      {
        questionText: "Which access modifier restricts access to only within the same class?",
        options: ["Public", "Protected", "Private", "Static"],
        correctAnswerIndex: 2,
      },
      {
        questionText: "Can a class implement multiple interfaces?",
        options: ["No, never", "Yes", "Only abstract classes can", "Only with special permission"],
        correctAnswerIndex: 1,
      },
      {
        questionText: "What is called automatically when an object is created?",
        options: ["Destructor", "Constructor", "Finalizer", "Nothing, must call manually"],
        correctAnswerIndex: 1,
      },
      {
        questionText: "Which of the following involves multiple child classes inheriting from one parent?",
        options: ["Multilevel Inheritance", "Hierarchical Inheritance", "Multiple Inheritance", "Single Inheritance"],
        correctAnswerIndex: 1,
      },
      {
        questionText: "Interfaces, unlike abstract classes, typically cannot have:",
        options: ["Method signatures", "Constructors", "Multiple implementers", "Method names"],
        correctAnswerIndex: 1,
      },
    ],
  },
];

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB Atlas");

    await Content.deleteMany({ subject: "oops" });
    console.log("🗑️  Cleared old OOPS content");

    await Content.insertMany(oopsContent);
    console.log(`✅ Inserted ${oopsContent.length} OOPS content items`);

    await mongoose.disconnect();
    console.log("👋 Done, disconnected");
    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding failed:", error.message);
    process.exit(1);
  }
};

seed();