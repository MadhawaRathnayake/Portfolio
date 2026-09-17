export type Section = { heading: string; body: string[] };

export type Project = {
  slug: string;
  index: string;
  title: string;
  blurb: string;
  medium: string[];
  tags: string[];
  categories: string[];
  role: string;
  team: string;
  timeline: string;
  repo?: string;
  repoNote?: string;
  featured?: boolean;
  caseStudy?: boolean;
  glance?: string[];
  sections?: Section[];
  stack?: { group: string; items: string[] }[];
};

export const projects: Project[] = [
  {
    slug: "moh-survey-platform",
    index: "01",
    title: "MOH field survey platform",
    blurb:
      "Backend for the platform that digitised field survey supervision for the Galle division of Sri Lanka's Ministry of Health, serving over 100 health officers.",
    medium: [
      "Field survey supervision in the Galle division of the Ministry of Health ran on paper. I built the backend for the platform that replaced it, serving more than 100 health officers who collect and submit survey data from the field.",
      "It is a Node.js and PostgreSQL service structured on Clean Architecture, so the business rules sit behind clear boundaries and do not leak into the transport or database layers. That mattered here more than usual: government processes change, and the cost of a rule change should be one layer, not a rewrite.",
    ],
    tags: ["Node.js", "PostgreSQL", "Clean Architecture", "REST"],
    categories: ["Backend"],
    role: "Backend engineer",
    team: "Project team",
    timeline: "2025",
    repoNote: "Private repository",
    featured: true,
    caseStudy: true,
    glance: [
      "Replaced a paper supervision process for a government health division",
      "Serves 100+ field health officers collecting survey data",
      "Clean Architecture: business rules isolated from HTTP and the database",
      "Node.js and PostgreSQL",
    ],
    sections: [
      {
        heading: "The problem",
        body: [
          "The Galle divisional office of the Ministry of Health supervised field surveys on paper. More than 100 health officers collected data in the field, and supervision meant collating forms by hand, with the delays and transcription errors that come with it.",
        ],
      },
      {
        heading: "My part",
        body: [
          "I built the backend: the data model, the API the field application talks to, and the supervision logic on top of it.",
        ],
      },
      {
        heading: "How I built it",
        body: [
          "Node.js with PostgreSQL, organised on Clean Architecture. Use cases hold the business rules, and the frameworks (HTTP handlers, the database, any third party service) sit at the edges behind interfaces.",
          "The practical effect is that a change to how a survey is validated or approved touches the use case layer and nothing else. That is worth the extra indirection on a system whose rules are set by policy rather than by us.",
        ],
      },
      {
        heading: "What I took from it",
        body: [
          "Building for people whose day changes if the software is wrong is different from building for a grade. Clean Architecture felt like overhead for the first week and paid for itself the first time a requirement moved.",
        ],
      },
    ],
    stack: [
      { group: "Backend", items: ["Node.js", "REST API"] },
      { group: "Data", items: ["PostgreSQL"] },
      { group: "Design", items: ["Clean Architecture", "Use case boundaries"] },
    ],
  },
  {
    slug: "note-app-pipeline",
    index: "02",
    title: "Note Manager, and the pipeline under it",
    blurb:
      "A Spring Boot and React note manager whose real subject is the delivery pipeline: ten Jenkins stages from build to a deployed container on AWS.",
    medium: [
      "The application is a Java 17 Spring Boot API with JWT authentication over Spring Security and MongoDB behind it, documented with Swagger and split into controller, service, repository and mapper layers, with a React front end.",
      "The more interesting half is how it gets to production. Ten Jenkins stages cover the Maven build and tests, the npm build, Docker images for both tiers pushed to Docker Hub, Terraform managing the AWS security group rules on the EC2 host, and Ansible deploying the containers.",
    ],
    tags: ["Spring Boot", "Jenkins", "Terraform", "Ansible"],
    categories: ["Backend", "DevOps"],
    role: "Sole developer",
    team: "Solo",
    timeline: "2025",
    repo: "https://github.com/MadhawaRathnayake/Note-App",
    featured: true,
    caseStudy: true,
    glance: [
      "Ten-stage Jenkins pipeline from git push to running containers",
      "Terraform owns the AWS security group rules, Ansible does the deploy",
      "Credentials injected by Jenkins, never committed",
      "Java 17, Spring Boot, MongoDB, React",
    ],
    sections: [
      {
        heading: "Why I built it",
        body: [
          "I wanted a small, well understood application so that the hard part could be the delivery pipeline rather than the domain. Notes and users are a problem I already knew how to model, which left my attention free for everything that happens after the code compiles.",
        ],
      },
      {
        heading: "The application",
        body: [
          "Java 17 and Spring Boot, layered into controller, service, repository and mapper so each layer has one job. Spring Security issues and validates JWTs. MongoDB stores notes and users. Swagger documents the API. The front end is React, built separately and served as its own container.",
        ],
      },
      {
        heading: "The pipeline",
        body: [
          "A push to GitHub fires a webhook at Jenkins, which checks out the code, runs the Maven build and the backend tests, installs and builds the front end, builds a Docker image for each tier, pushes both to Docker Hub, applies Terraform to manage the AWS security group rules on the EC2 host, runs an Ansible playbook that pulls the images and brings the containers up, and finishes with a post-deploy check.",
          "Credentials live in Jenkins rather than in the repository. Terraform owning the security group rules means network access to the host is described in version control instead of clicked into a console. Ansible does the deployment, which keeps the Jenkinsfile about orchestration rather than shell commands.",
        ],
      },
      {
        heading: "What I would do differently",
        body: [
          "The pipeline deploys to a single EC2 host, so there is no rolling deploy and a failed release means downtime. The honest next step is a health check gate before the container swap, and eventually the same workload on a small Kubernetes cluster.",
        ],
      },
    ],
    stack: [
      { group: "Backend", items: ["Java 17", "Spring Boot", "Spring Security", "JWT", "Swagger"] },
      { group: "Frontend", items: ["React"] },
      { group: "Data", items: ["MongoDB"] },
      { group: "Delivery", items: ["Jenkins", "Docker", "Docker Hub", "Terraform", "Ansible", "AWS EC2"] },
    ],
  },
  {
    slug: "zk-voting",
    index: "03",
    title: "ZK internet voting system",
    blurb:
      "An internet voting system where a vote stays private but can still be verified: zero-knowledge proofs in Noir, Solidity verifiers, and a blockchain written from scratch in Go.",
    medium: [
      "Internet voting has to satisfy two things that pull against each other: nobody should learn how you voted, and anyone should be able to check that the count is right. This system does both with zero-knowledge proofs.",
      "Voters register a cryptographic commitment, then vote from an anonymous wallet while a Noir circuit proves eligibility without revealing identity. Double voting is blocked by nullifier hashes, and proofs are verified on chain by a generated Solidity contract.",
    ],
    tags: ["Noir", "Solidity", "Go", "Next.js"],
    categories: ["Distributed systems", "Backend", "Frontend"],
    role: "Project team member",
    team: "University project team",
    timeline: "13 phases, ongoing",
    repo: "https://github.com/PiyumalKK/zk_voting",
    featured: true,
    caseStudy: true,
    glance: [
      "Private, verifiable voting using zero-knowledge proofs",
      "Noir circuit proving Merkle membership and commitment knowledge",
      "Nullifier hashes make a second vote impossible",
      "A custom Go blockchain with an embedded EVM removes gas and wallet friction",
    ],
    sections: [
      {
        heading: "The problem",
        body: [
          "An election needs privacy and verifiability simultaneously. A plain blockchain gives you verifiability and destroys privacy, since every vote is public forever. A traditional database gives you privacy and asks everyone to trust the operator.",
        ],
      },
      {
        heading: "The cryptography",
        body: [
          "A Noir circuit, proved with Barretenberg's UltraHonk over bn254, produces roughly 14KB proofs. The circuit proves knowledge of the commitment preimage, Merkle membership in the eligible voter tree, and vote integrity, without revealing the voter's position in the tree or any private value.",
          "Poseidon is the hash and LeanIMT is the on-chain Merkle tree. A generated Solidity contract verifies the proof on chain, and a nullifier hash per voter makes a second vote impossible without linking it to the first.",
        ],
      },
      {
        heading: "The chain",
        body: [
          "Beyond the Hardhat setup, the project includes a blockchain written in Go that embeds the EVM directly and executes the same Solidity bytecode in-process, with BoltDB for storage. The point was to remove gas costs and wallet setup, which are the practical reasons ordinary people bounce off a blockchain application. Switching backends is three environment variables and no source changes.",
        ],
      },
      {
        heading: "The clients",
        body: [
          "A Next.js web app using wagmi and viem, generating proofs in the browser. A React Native and Expo mobile app with biometric key storage, so the voting key sits behind the phone's secure enclave rather than in a file.",
        ],
      },
    ],
    stack: [
      { group: "Zero-knowledge", items: ["Noir", "Barretenberg UltraHonk", "Poseidon", "LeanIMT"] },
      { group: "Chain", items: ["Solidity", "Hardhat", "Go", "Embedded EVM", "BoltDB"] },
      { group: "Clients", items: ["Next.js", "wagmi", "viem", "React Native", "Expo"] },
    ],
  },
  {
    slug: "eventnet",
    index: "04",
    title: "EventNet, microservices ticketing platform",
    blurb:
      "A cloud-native event ticketing platform: five services on Azure Kubernetes Service, talking over RabbitMQ, shipped by an eleven job pipeline.",
    medium: [
      "EventNet is an event ticketing platform built as independently deployable services rather than one application: a Next.js front end, and user, event, booking and payment services on Node.js and Express. Each service owns its own Azure PostgreSQL database.",
      "Booking and payment talk over RabbitMQ rather than direct calls, so one slow or failing service does not take the others down. Everything runs on Azure Kubernetes Service behind an NGINX ingress, deployed by a GitHub Actions pipeline of eleven jobs.",
    ],
    tags: ["Kubernetes", "RabbitMQ", "Node.js", "Azure"],
    categories: ["Distributed systems", "DevOps", "Backend"],
    role: "Service and deployment work",
    team: "Team of 4",
    timeline: "2025",
    repo: "https://github.com/MadhawaRathnayake/EventNet-micro",
    caseStudy: true,
    glance: [
      "Five services behind an NGINX ingress on Azure Kubernetes Service",
      "Database per service, no shared tables",
      "RabbitMQ between booking and payment",
      "Eleven job pipeline with Trivy scanning, manifest validation and smoke tests",
    ],
    sections: [
      {
        heading: "The problem",
        body: [
          "Ticketing is the textbook case for splitting a system up. Payment is slow and external, booking is transactional, browsing events is read-heavy, and they all scale differently. We built it as separate services to see what that actually costs and what it buys.",
        ],
      },
      {
        heading: "Architecture",
        body: [
          "A Next.js front end with NextAuth, a user service with JWT and Google OAuth, and event, booking and payment services on Express, each with its own Azure Flexible PostgreSQL instance and all behind an NGINX ingress.",
          "Booking and payment exchange messages over RabbitMQ using AMQP, so a payment that is slow to settle does not block a booking request, and a payment service restart does not lose the work.",
        ],
      },
      {
        heading: "Delivery",
        body: [
          "A GitHub Actions pipeline of eleven jobs: change detection so only the services that changed are rebuilt, parallel per-service deployments, Trivy scanning of the images, Kubernetes manifest validation, health checks and smoke tests after deploy. Local development runs under Docker Compose or natively.",
        ],
      },
      {
        heading: "What I learned",
        body: [
          "The boundaries are the hard part, not the containers. Deciding what belongs to booking and what belongs to payment, and accepting that the two will be briefly out of agreement, is a different way of thinking from a single database and a transaction.",
          "The operational cost is real too. Five services means five sets of logs, five deployments and five ways to be misconfigured, which is exactly why the pipeline had to do change detection and health checks rather than just applying manifests.",
        ],
      },
    ],
    stack: [
      { group: "Services", items: ["Node.js", "Express", "Next.js", "NextAuth", "JWT", "Google OAuth"] },
      { group: "Data and messaging", items: ["Azure PostgreSQL", "RabbitMQ"] },
      { group: "Platform", items: ["Docker", "Azure Kubernetes Service", "NGINX ingress"] },
      { group: "Delivery", items: ["GitHub Actions", "Trivy"] },
    ],
  },
  {
    slug: "inksolver",
    index: "05",
    title: "Inksolver, handwritten equation solver",
    blurb:
      "Photograph a handwritten equation and get the answer: a four stage vision pipeline that reads 84 symbol classes at 95.66% accuracy, then solves what it read.",
    medium: [
      "Inksolver takes a photo of a handwritten equation and returns the solution. Preprocessing turns a phone photo into a clean binary image, segmentation finds each symbol, a CNN trained on CROHME classifies 84 symbol classes at 95.66% accuracy, and the solver resolves ambiguities before handing the expression to SymPy.",
      "The interesting engineering is the last stage. A classifier that is 95.66% accurate per symbol is wrong often enough across a full equation to matter, and its confusions are systematic: x, X and the multiplication sign look nearly identical in handwriting. Resolving those by context is what made the system usable.",
    ],
    tags: ["Python", "OpenCV", "TensorFlow", "SymPy"],
    categories: ["ML and vision"],
    role: "Project team member",
    team: "University course project",
    timeline: "2025",
    repo: "https://github.com/PiyumalKK/Inksolver",
  },
  {
    slug: "hpc-preprocessing",
    index: "06",
    title: "HPC data preprocessing desktop app",
    blurb:
      "A desktop tool that runs the same CSV preprocessing workload serially and in parallel, so you can see what parallelism actually buys on real data.",
    medium: [
      "A desktop application that profiles and preprocesses CSV data: column type detection, null and outlier identification, and numeric summaries. The computation lives in C modules, the interface is Python and Tkinter.",
      "The point is the comparison. The same analysis runs serially and under OpenMP with a configurable thread count, with an MPI path for distributing work across machines. Running the identical workload both ways is how you learn where parallelism helps and where the overhead eats the gain.",
    ],
    tags: ["C", "OpenMP", "MPI", "Python"],
    categories: ["ML and vision", "Backend"],
    role: "Sole developer",
    team: "Solo",
    timeline: "2025",
    repo: "https://github.com/MadhawaRathnayake/DataPreprocessing-HPC",
  },
  {
    slug: "service-finder",
    index: "07",
    title: "Service Finder",
    blurb:
      "A Flutter and Firebase mobile app for finding everyday service providers, building for Android, iOS and desktop from one codebase.",
    medium: [
      "Service Finder connects people to everyday service providers. It is built in Flutter and Dart with Firebase behind it, and builds for Android, iOS, Windows, macOS and Linux from a single codebase.",
    ],
    tags: ["Flutter", "Dart", "Firebase"],
    categories: ["Mobile"],
    role: "Project team member",
    team: "Team project",
    timeline: "2024",
    repo: "https://github.com/AmiruHoradagoda/service_finder_application",
  },
];

export const featured = projects.filter((p) => p.featured);

export const categories = [
  "All",
  ...Array.from(new Set(projects.flatMap((p) => p.categories))).sort(),
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export function caseStudySlugs() {
  return projects.filter((p) => p.caseStudy).map((p) => p.slug);
}
