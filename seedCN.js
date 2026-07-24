import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import Content from "./models/Content.js";

const cnContent = [
  // ══ NOTES ══
  {
    subject: "cn",
    type: "note",
    module: "Module 1: Networking Fundamentals",
    moduleOrder: 1,
    subtopic: "Introduction to Computer Networks",
    subtopicOrder: 1,
    title: "Introduction to Computer Networks",
    pages: 6,
    body: `## Introduction to Computer Networks

A **computer network** is a collection of interconnected devices that can communicate and share resources with each other.

### Types of Networks by Scale

| Type | Range | Example |
|---|---|---|
| PAN (Personal Area Network) | A few meters | Bluetooth headphones |
| LAN (Local Area Network) | A building/campus | Office/college network |
| MAN (Metropolitan Area Network) | A city | Cable TV network |
| WAN (Wide Area Network) | Country/globe | The Internet |

### Network Topologies

- **Bus** — all devices share a single communication line.
- **Star** — all devices connect to a central hub/switch.
- **Ring** — each device connects to exactly two neighbors, forming a loop.
- **Mesh** — devices are interconnected with many redundant paths.

\\\`\\\`\\\`
Star Topology:
      [PC1]
        |
[PC2]--[HUB]--[PC3]
        |
      [PC4]
\\\`\\\`\\\`

> Example: Most modern office LANs use a **star topology** with a central switch, because a single cable failure only disconnects one device instead of the whole network (unlike bus or ring topologies).

### Bandwidth vs Throughput vs Latency

| Term | Meaning |
|---|---|
| Bandwidth | Maximum theoretical data rate of a link |
| Throughput | Actual data rate achieved in practice |
| Latency | Time delay for data to travel from source to destination |

### Common Interview Traps

- Treating bandwidth and throughput as the same thing — throughput is almost always lower than the theoretical bandwidth due to overhead, congestion, and errors.
- Assuming mesh topology is always best — it's the most fault-tolerant but also the most expensive to wire and maintain.`,
  },
  {
    subject: "cn",
    type: "note",
    module: "Module 1: Networking Fundamentals",
    moduleOrder: 1,
    subtopic: "OSI and TCP/IP Models",
    subtopicOrder: 2,
    title: "OSI Model and TCP/IP Model",
    pages: 8,
    body: `## OSI Model and TCP/IP Model

The **OSI (Open Systems Interconnection) Model** is a conceptual 7-layer framework describing how data moves through a network.

### The 7 OSI Layers (top to bottom)

| Layer | Name | Responsibility | Example |
|---|---|---|---|
| 7 | Application | User-facing services | HTTP, FTP, SMTP |
| 6 | Presentation | Data formatting, encryption | SSL/TLS, JPEG |
| 5 | Session | Managing sessions/connections | RPC, session tokens |
| 4 | Transport | Reliable end-to-end delivery | TCP, UDP |
| 3 | Network | Logical addressing & routing | IP, routers |
| 2 | Data Link | Node-to-node delivery, MAC addressing | Ethernet, switches |
| 1 | Physical | Raw bit transmission over medium | Cables, radio signals |

A common mnemonic: **"All People Seem To Need Data Processing"** (Application → Physical).

### TCP/IP Model (4 layers)

The TCP/IP model is the practical model the actual Internet is built on, and maps roughly onto OSI:

\\\`\\\`\\\`
OSI (7 layers)            TCP/IP (4 layers)
Application    ─┐
Presentation    ├──────►  Application
Session        ─┘
Transport      ────────►  Transport
Network        ────────►  Internet
Data Link      ─┐
Physical       ─┴──────►  Network Access
\\\`\\\`\\\`

### Data Encapsulation

As data moves down the layers on the sending side, each layer adds its own header (and sometimes trailer):

\\\`\\\`\\\`
Application Data
  -> [Transport Header | Data]              (Segment)
    -> [Network Header | Segment]            (Packet)
      -> [Data Link Header | Packet | Trailer]  (Frame)
        -> Bits on the wire
\\\`\\\`\\\`

> Example: When you send an HTTP request, the browser's data gets wrapped with a TCP header (port numbers, sequencing), then an IP header (source/destination IP), then an Ethernet header (MAC addresses), before finally becoming bits sent over the wire.

### Common Interview Traps

- Mixing up which layer does what — routers operate primarily at the Network layer, switches at the Data Link layer.
- Forgetting that the TCP/IP model is what's actually implemented in practice, while OSI is mostly used as a teaching/reference model.`,
  },
  {
    subject: "cn",
    type: "note",
    module: "Module 2: Data Link & Network Layer",
    moduleOrder: 2,
    subtopic: "Data Link Layer",
    subtopicOrder: 1,
    title: "The Data Link Layer",
    pages: 7,
    body: `## The Data Link Layer

The **Data Link Layer** is responsible for node-to-node delivery of data across a single physical link, and for detecting/correcting errors that occur at the physical layer.

### MAC Address

A **MAC (Media Access Control) address** is a unique 48-bit hardware identifier burned into a network interface card, written as 6 pairs of hexadecimal digits (e.g., \\\`00:1A:2B:3C:4D:5E\\\`). Unlike IP addresses, MAC addresses don't change when a device moves to a different network.

### Switching

A **switch** operates at the Data Link Layer and forwards frames based on MAC addresses. It builds a **MAC address table** by learning which device is connected to which port, allowing it to send frames only to the intended recipient rather than broadcasting to everyone.

\\\`\\\`\\\`
Switch MAC Table:
Port 1 -> AA:BB:CC:DD:EE:01
Port 2 -> AA:BB:CC:DD:EE:02
Port 3 -> AA:BB:CC:DD:EE:03
\\\`\\\`\\\`

> Example: When PC1 sends a frame to PC2's MAC address, the switch checks its table and forwards the frame only out of the port connected to PC2 — unlike an old-fashioned hub, which would broadcast it out of every port.

### Error Detection

- **Parity Bit** — adds one bit to make the total number of 1s even or odd; detects single-bit errors but not all multi-bit errors.
- **CRC (Cyclic Redundancy Check)** — a more robust checksum computed from the data, appended to the frame, and recomputed by the receiver to detect errors.

### Common Interview Traps

- Confusing switches (Data Link Layer, MAC-based) with routers (Network Layer, IP-based).
- Assuming a parity bit can catch any number of bit errors — it only reliably catches an odd number of flipped bits.`,
  },
  {
    subject: "cn",
    type: "note",
    module: "Module 2: Data Link & Network Layer",
    moduleOrder: 2,
    subtopic: "Network Layer & IP Addressing",
    subtopicOrder: 2,
    title: "Network Layer and IP Addressing",
    pages: 8,
    body: `## Network Layer and IP Addressing

The **Network Layer** handles logical addressing and routing of packets across multiple networks, getting data from a source host to a destination host that may be many hops away.

### IPv4 Addressing

An IPv4 address is a 32-bit number, usually written in **dotted-decimal notation** (e.g., \\\`192.168.1.1\\\`), split into a network portion and a host portion.

### IP Address Classes (Classful Addressing)

| Class | Range | Typical Use |
|---|---|---|
| A | 1.0.0.0 – 126.255.255.255 | Very large networks |
| B | 128.0.0.0 – 191.255.255.255 | Medium networks |
| C | 192.0.0.0 – 223.255.255.255 | Small networks |

### Subnetting

**Subnetting** divides a large network into smaller sub-networks using a **subnet mask**, which determines which bits represent the network portion vs. the host portion.

\\\`\\\`\\\`
IP:          192.168.1.10
Subnet Mask: 255.255.255.0   (/24)
Network:     192.168.1.0
Host range:  192.168.1.1 - 192.168.1.254
\\\`\\\`\\\`

> Example: A /24 subnet mask (255.255.255.0) allows 254 usable host addresses per subnet, since the last octet is fully available for host addressing (256 total addresses minus the network address and broadcast address).

### Routing

A **router** operates at the Network Layer, using a **routing table** to decide the next hop for a packet based on its destination IP address. Routing protocols like **OSPF** and **BGP** allow routers to dynamically learn and share paths through the network.

### Common Interview Traps

- Forgetting that the first address in a subnet is reserved for the network itself, and the last is reserved for broadcast — neither can be assigned to a host.
- Confusing classful addressing (rigid class-based ranges) with the more flexible CIDR (Classless Inter-Domain Routing) notation used today.`,
  },
  {
    subject: "cn",
    type: "note",
    module: "Module 3: Transport Layer",
    moduleOrder: 3,
    subtopic: "TCP vs UDP",
    subtopicOrder: 1,
    title: "TCP vs UDP",
    pages: 7,
    body: `## TCP vs UDP

The **Transport Layer** provides end-to-end communication between processes on different hosts, primarily via two protocols: **TCP** and **UDP**.

### TCP (Transmission Control Protocol)

TCP is **connection-oriented** and **reliable** — it guarantees ordered, error-checked delivery of a stream of data.

- Establishes a connection first via the **three-way handshake**.
- Uses sequence numbers to reorder packets and detect loss.
- Retransmits lost packets automatically.

\\\`\\\`\\\`
Three-Way Handshake:
Client -> Server: SYN
Server -> Client: SYN-ACK
Client -> Server: ACK
// Connection established, data transfer can begin
\\\`\\\`\\\`

### UDP (User Datagram Protocol)

UDP is **connectionless** and **unreliable** — it sends independent datagrams with no guarantee of delivery, ordering, or duplicate protection, but with much lower overhead than TCP.

### TCP vs UDP Comparison

| Aspect | TCP | UDP |
|---|---|---|
| Connection | Connection-oriented (handshake) | Connectionless |
| Reliability | Guaranteed delivery, retransmits lost data | No guarantee |
| Ordering | In-order delivery | No ordering guarantee |
| Speed | Slower (overhead of reliability) | Faster (minimal overhead) |
| Use Cases | Web browsing, email, file transfer | Video streaming, VoIP, online gaming |

> Example: A video call uses UDP because a dropped frame occasionally is far less disruptive than the delay TCP's retransmission and reordering would introduce — a slightly glitchy frame is better than a frozen call waiting for a lost packet to be resent.

### Common Interview Traps

- Assuming UDP is "worse" than TCP in general — it's a deliberate tradeoff; UDP is *better* for latency-sensitive real-time applications.
- Forgetting that TCP's reliability comes from acknowledgments and retransmission, which UDP has no equivalent for.`,
  },
  {
    subject: "cn",
    type: "note",
    module: "Module 3: Transport Layer",
    moduleOrder: 3,
    subtopic: "Congestion & Flow Control",
    subtopicOrder: 2,
    title: "Flow Control and Congestion Control",
    pages: 6,
    body: `## Flow Control and Congestion Control

Both mechanisms prevent a sender from overwhelming either the receiver or the network, but they solve different problems.

### Flow Control

**Flow control** prevents a fast sender from overwhelming a slow receiver. TCP implements this using a **sliding window**, where the receiver advertises how much buffer space it currently has available, and the sender limits how much unacknowledged data it sends accordingly.

\\\`\\\`\\\`
Receiver Window = 4000 bytes
Sender can send up to 4000 bytes of unacknowledged data
before it must wait for an ACK to free up window space
\\\`\\\`\\\`

### Congestion Control

**Congestion control** prevents the *network itself* (routers, links) from becoming overwhelmed, regardless of what the receiver can handle. TCP uses several algorithms:

- **Slow Start** — begins with a small congestion window and doubles it each round-trip until a threshold or packet loss occurs.
- **Congestion Avoidance** — after the threshold, grows the window more conservatively (linear increase).
- **Fast Retransmit / Fast Recovery** — reacts quickly to packet loss signals (duplicate ACKs) without waiting for a full timeout.

### Flow Control vs Congestion Control

| Aspect | Flow Control | Congestion Control |
|---|---|---|
| Protects | The receiver | The network (routers/links) |
| Mechanism | Sliding window (receiver-driven) | Congestion window (network-condition-driven) |
| Trigger | Receiver's buffer capacity | Packet loss / network delay signals |

> Example: Even if a receiver has plenty of buffer space (good flow control conditions), TCP will still slow down if packets are being dropped somewhere in the network — that's congestion control kicking in independently of the receiver's capacity.

### Common Interview Traps

- Treating flow control and congestion control as the same mechanism — they address entirely different bottlenecks (receiver vs. network).
- Forgetting that Slow Start's window growth is exponential, not linear, until the threshold is reached.`,
  },
  {
    subject: "cn",
    type: "note",
    module: "Module 4: Application Layer & Protocols",
    moduleOrder: 4,
    subtopic: "DNS, HTTP & HTTPS",
    subtopicOrder: 1,
    title: "DNS, HTTP, and HTTPS",
    pages: 7,
    body: `## DNS, HTTP, and HTTPS

### DNS (Domain Name System)

**DNS** translates human-readable domain names (like \\\`example.com\\\`) into IP addresses that computers use to route traffic.

\\\`\\\`\\\`
User types: www.example.com
  -> DNS Resolver queries Root -> TLD -> Authoritative server
  -> Returns IP: 93.184.216.34
  -> Browser connects to that IP
\\\`\\\`\\\`

DNS results are typically cached (locally and at resolvers) with a **TTL (Time To Live)** to reduce repeated lookups.

### HTTP (HyperText Transfer Protocol)

HTTP is an **application-layer, request-response protocol** used to transfer web content. Common methods:

| Method | Purpose |
|---|---|
| GET | Retrieve a resource |
| POST | Submit data to be processed |
| PUT | Replace a resource entirely |
| DELETE | Remove a resource |

HTTP is **stateless** — each request is independent, with no memory of previous requests unless state is explicitly maintained (e.g., via cookies or tokens).

### HTTPS (HTTP Secure)

**HTTPS** is HTTP layered over **TLS/SSL** encryption, providing:

- **Confidentiality** — data is encrypted in transit.
- **Integrity** — data can't be silently modified in transit.
- **Authentication** — verifies the server's identity via a digital certificate.

> Example: When you log into a banking site over HTTPS, the TLS handshake establishes an encrypted channel first, so even if someone intercepts the traffic on the network, they only see encrypted gibberish rather than your actual credentials.

### Common Interview Traps

- Assuming HTTP is stateful by default — statefulness (like login sessions) is bolted on via cookies/tokens, not built into HTTP itself.
- Forgetting that HTTPS protects data *in transit*, not necessarily data at rest on the server.`,
  },
  {
    subject: "cn",
    type: "note",
    module: "Module 4: Application Layer & Protocols",
    moduleOrder: 4,
    subtopic: "Email & File Transfer Protocols",
    subtopicOrder: 2,
    title: "Email and File Transfer Protocols",
    pages: 6,
    body: `## Email and File Transfer Protocols

### Email Protocols

| Protocol | Purpose |
|---|---|
| SMTP (Simple Mail Transfer Protocol) | Sending email from client to server, and between mail servers |
| POP3 (Post Office Protocol v3) | Downloading email to a single device, typically removing it from the server |
| IMAP (Internet Message Access Protocol) | Syncing email across multiple devices, keeping messages on the server |

> Example: If you check your email from both a phone and a laptop and expect to see the same read/unread status on both, your email client is almost certainly using **IMAP** rather than POP3, since POP3 is designed around a single device owning the mailbox.

### FTP (File Transfer Protocol)

**FTP** transfers files between a client and server using **two separate connections**:

- A **control connection** (port 21) for commands (login, navigate directories, etc.).
- A **data connection** (port 20 or negotiated dynamically) for the actual file transfer.

\\\`\\\`\\\`
Client -> Server (Control, port 21): USER, PASS, LIST, RETR
Client <-> Server (Data connection): actual file bytes transferred
\\\`\\\`\\\`

**SFTP (SSH File Transfer Protocol)** is a separate, more secure alternative that tunnels file transfer over an encrypted SSH connection rather than FTP's largely unencrypted channel.

### Common Interview Traps

- Confusing FTP (a distinct protocol using two connections) with SFTP (an entirely different protocol built on SSH) — the similar names mask very different security models.
- Assuming SMTP is used for *retrieving* email — SMTP only handles sending; POP3/IMAP handle retrieval.`,
  },

  // ══ PDFs ══
  {
    subject: "cn",
    type: "pdf",
    module: "Module 1: Networking Fundamentals",
    moduleOrder: 1,
    subtopic: "OSI and TCP/IP Models",
    subtopicOrder: 2,
    title: "OSI vs TCP/IP Model — Quick Reference (PDF)",
    size: "200 KB",
    pages: 6,
    url: "",
  },
  {
    subject: "cn",
    type: "pdf",
    module: "Module 3: Transport Layer",
    moduleOrder: 3,
    subtopic: "TCP vs UDP",
    subtopicOrder: 1,
    title: "TCP vs UDP Cheat Sheet (PDF)",
    size: "175 KB",
    pages: 4,
    url: "",
  },

  // ══ RESOURCES ══
  {
    subject: "cn",
    type: "resource",
    title: "GeeksforGeeks — Computer Networks Tutorial",
    source: "GeeksforGeeks",
    url: "https://www.geeksforgeeks.org/computer-network-tutorials/",
  },
  {
    subject: "cn",
    type: "resource",
    title: "Cloudflare Learning Center — Networking Fundamentals",
    source: "Cloudflare",
    url: "https://www.cloudflare.com/learning/",
  },

  // ══ QUIZZES ══
  {
    subject: "cn",
    type: "quiz",
    title: "OSI Model Quiz",
    time: "6 min",
    difficulty: "Easy",
    questionBank: [
      {
        questionText: "How many layers does the OSI model have?",
        options: ["4", "5", "7", "8"],
        correctAnswerIndex: 2,
      },
      {
        questionText: "Which layer is responsible for logical addressing and routing?",
        options: ["Data Link", "Network", "Transport", "Session"],
        correctAnswerIndex: 1,
      },
      {
        questionText: "Switches primarily operate at which layer?",
        options: ["Physical", "Data Link", "Network", "Transport"],
        correctAnswerIndex: 1,
      },
    ],
  },
  {
    subject: "cn",
    type: "quiz",
    title: "TCP/UDP & Transport Layer Quiz",
    time: "8 min",
    difficulty: "Medium",
    questionBank: [
      {
        questionText: "Which protocol uses a three-way handshake?",
        options: ["UDP", "TCP", "IP", "ARP"],
        correctAnswerIndex: 1,
      },
      {
        questionText: "Which is generally preferred for live video calls?",
        options: ["TCP", "UDP", "FTP", "SMTP"],
        correctAnswerIndex: 1,
      },
      {
        questionText: "Congestion control protects:",
        options: ["The receiver's buffer", "The network's links and routers", "The sender's CPU", "The DNS resolver"],
        correctAnswerIndex: 1,
      },
    ],
  },
  {
    subject: "cn",
    type: "quiz",
    title: "DNS, HTTP & Protocols Quiz",
    time: "7 min",
    difficulty: "Medium",
    questionBank: [
      {
        questionText: "What does DNS primarily do?",
        options: ["Encrypts data", "Translates domain names to IP addresses", "Compresses files", "Manages email"],
        correctAnswerIndex: 1,
      },
      {
        questionText: "Which protocol keeps email synced across multiple devices?",
        options: ["POP3", "IMAP", "SMTP", "FTP"],
        correctAnswerIndex: 1,
      },
      {
        questionText: "HTTPS adds which layer of protection to HTTP?",
        options: ["Compression", "TLS/SSL encryption", "Caching", "Load balancing"],
        correctAnswerIndex: 1,
      },
    ],
  },

  // ══ MCQs ══
  {
    subject: "cn",
    type: "mcq",
    module: "Module 2: Data Link & Network Layer",
    moduleOrder: 2,
    subtopic: "Network Layer & IP Addressing",
    subtopicOrder: 2,
    title: "IP Addressing — MCQ Set",
    questionBank: [
      {
        questionText: "How many bits does an IPv4 address have?",
        options: ["16", "32", "64", "128"],
        correctAnswerIndex: 1,
      },
      {
        questionText: "What does a subnet mask determine?",
        options: ["The MAC address", "Which bits are network vs host portion", "The port number", "The DNS server"],
        correctAnswerIndex: 1,
      },
      {
        questionText: "A /24 subnet mask allows how many usable host addresses?",
        options: ["24", "254", "256", "128"],
        correctAnswerIndex: 1,
      },
      {
        questionText: "Which device makes forwarding decisions based on IP addresses?",
        options: ["Switch", "Hub", "Router", "Repeater"],
        correctAnswerIndex: 2,
      },
    ],
  },
  {
    subject: "cn",
    type: "mcq",
    module: "Module 4: Application Layer & Protocols",
    moduleOrder: 4,
    subtopic: "DNS, HTTP & HTTPS",
    subtopicOrder: 1,
    title: "Application Layer Protocols — MCQ Set",
    questionBank: [
      {
        questionText: "Which HTTP method is used to retrieve a resource?",
        options: ["POST", "GET", "DELETE", "PUT"],
        correctAnswerIndex: 1,
      },
      {
        questionText: "HTTP is described as:",
        options: ["Stateful by default", "Stateless by default", "Always encrypted", "Connection-oriented at the application layer only"],
        correctAnswerIndex: 1,
      },
      {
        questionText: "Which protocol is used to send email between servers?",
        options: ["IMAP", "POP3", "SMTP", "FTP"],
        correctAnswerIndex: 2,
      },
      {
        questionText: "FTP uses how many connections for a typical transfer?",
        options: ["One", "Two (control and data)", "Three", "Four"],
        correctAnswerIndex: 1,
      },
    ],
  },

  // ══ INTERVIEW QUESTIONS ══
  {
    subject: "cn",
    type: "interviewQuestion",
    module: "Module 1: Networking Fundamentals",
    moduleOrder: 1,
    subtopic: "OSI and TCP/IP Models",
    subtopicOrder: 2,
    question: "What is the difference between the OSI model and the TCP/IP model?",
    answer:
      "The OSI model is a conceptual, 7-layer reference framework (Physical, Data Link, Network, Transport, Session, Presentation, Application) used mainly for teaching and understanding networking concepts in a structured way. The TCP/IP model is the practical, 4-layer model (Network Access, Internet, Transport, Application) that the actual Internet is built on. TCP/IP combines OSI's Session, Presentation, and Application layers into a single Application layer, and combines OSI's Physical and Data Link layers into a single Network Access layer. In short: OSI is a theoretical reference model, while TCP/IP is what's actually implemented in real-world networking.",
  },
  {
    subject: "cn",
    type: "interviewQuestion",
    module: "Module 3: Transport Layer",
    moduleOrder: 3,
    subtopic: "TCP vs UDP",
    subtopicOrder: 1,
    question: "Why would an application choose UDP over TCP despite UDP being 'unreliable'?",
    answer:
      "An application chooses UDP when low latency matters more than guaranteed delivery — TCP's reliability mechanisms (handshake, acknowledgments, retransmission, in-order delivery) add overhead and delay that can hurt real-time applications. For example, in video calls or online gaming, a dropped or slightly out-of-order packet causes a minor, often unnoticeable glitch, whereas TCP's insistence on retransmitting lost data and delivering everything in order could cause the whole stream to stall waiting for one lost packet. UDP trades reliability for speed and minimal overhead, which is the right tradeoff for latency-sensitive, loss-tolerant applications.",
  },
  {
    subject: "cn",
    type: "interviewQuestion",
    module: "Module 4: Application Layer & Protocols",
    moduleOrder: 4,
    subtopic: "DNS, HTTP & HTTPS",
    subtopicOrder: 1,
    question: "Walk through what happens, step by step, when you type a URL into a browser and hit enter.",
    answer:
      "First, the browser checks its cache, then queries a DNS resolver to translate the domain name into an IP address (following root, TLD, and authoritative name servers if not cached). Once the IP is known, the browser opens a TCP connection to that server via a three-way handshake, and if the site uses HTTPS, a TLS handshake follows to establish an encrypted channel and verify the server's certificate. The browser then sends an HTTP GET request for the page, the server responds with the HTML (and subsequent requests fetch CSS, JS, images, etc.), and the browser renders the page as resources arrive.",
  },
  {
    subject: "cn",
    type: "interviewQuestion",
    module: "Module 2: Data Link & Network Layer",
    moduleOrder: 2,
    subtopic: "Data Link Layer",
    subtopicOrder: 1,
    question: "What is the difference between a hub, a switch, and a router?",
    answer:
      "A hub is a simple physical-layer device that broadcasts incoming data out of every port with no intelligence about the destination, causing collisions and wasted bandwidth. A switch operates at the Data Link Layer and uses MAC addresses to forward frames only to the specific port the destination device is connected to, learned dynamically via a MAC address table. A router operates at the Network Layer, using IP addresses and a routing table to forward packets between different networks (e.g., from a home network to the Internet), making routing decisions based on the best path to the destination network.",
  },
  {
    subject: "cn",
    type: "interviewQuestion",
    module: "Module 3: Transport Layer",
    moduleOrder: 3,
    subtopic: "Congestion & Flow Control",
    subtopicOrder: 2,
    question: "What is the difference between flow control and congestion control in TCP?",
    answer:
      "Flow control prevents a fast sender from overwhelming a slow receiver, managed via a sliding window that the receiver advertises based on its own available buffer space. Congestion control prevents the sender from overwhelming the network itself (routers and links along the path), managed via mechanisms like Slow Start and Congestion Avoidance that adjust the sender's congestion window based on signals like packet loss or delay. The key distinction is *what* is being protected: flow control protects the receiver's capacity, while congestion control protects the shared network's capacity.",
  },

  // ══ MOCK TEST ══
  {
    subject: "cn",
    type: "mockTest",
    title: "Computer Networks Full Mock Test — Beginner",
    duration: 20,
    attempts: 0,
    positiveMarks: 1,
    negativeMarks: 0.33,
    questionBank: [
      {
        questionText: "How many layers are in the OSI model?",
        options: ["4", "5", "6", "7"],
        correctAnswerIndex: 3,
      },
      {
        questionText: "Which layer is responsible for MAC addressing?",
        options: ["Physical", "Data Link", "Network", "Transport"],
        correctAnswerIndex: 1,
      },
      {
        questionText: "Which protocol guarantees ordered, reliable delivery?",
        options: ["UDP", "IP", "TCP", "ARP"],
        correctAnswerIndex: 2,
      },
      {
        questionText: "What is the purpose of DNS?",
        options: ["Encrypt web traffic", "Translate domain names to IP addresses", "Assign MAC addresses", "Compress packets"],
        correctAnswerIndex: 1,
      },
      {
        questionText: "Which device forwards packets based on IP addresses?",
        options: ["Hub", "Switch", "Router", "Repeater"],
        correctAnswerIndex: 2,
      },
      {
        questionText: "A /24 subnet mask corresponds to which dotted-decimal value?",
        options: ["255.0.0.0", "255.255.0.0", "255.255.255.0", "255.255.255.255"],
        correctAnswerIndex: 2,
      },
      {
        questionText: "Which HTTP method is typically used to submit form data?",
        options: ["GET", "POST", "HEAD", "OPTIONS"],
        correctAnswerIndex: 1,
      },
      {
        questionText: "Which protocol is used to send (not receive) email?",
        options: ["POP3", "IMAP", "SMTP", "SNMP"],
        correctAnswerIndex: 2,
      },
      {
        questionText: "TCP's three-way handshake consists of:",
        options: ["SYN, SYN, ACK", "SYN, SYN-ACK, ACK", "ACK, SYN, FIN", "SYN, ACK, FIN"],
        correctAnswerIndex: 1,
      },
      {
        questionText: "Which mechanism protects the network from being overwhelmed by too much traffic?",
        options: ["Flow control", "Congestion control", "Error detection", "Subnetting"],
        correctAnswerIndex: 1,
      },
    ],
  },
];

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB Atlas");

    await Content.deleteMany({ subject: "cn" });
    console.log("🗑️  Cleared old CN content");

    await Content.insertMany(cnContent);
    console.log(`✅ Inserted ${cnContent.length} CN content items`);

    await mongoose.disconnect();
    console.log("👋 Done, disconnected");
    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding failed:", error.message);
    process.exit(1);
  }
};

seed();