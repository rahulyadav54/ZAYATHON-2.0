/**
 * ZAYATHON 2.0 — Official Teams Registry
 * Configurable store for registered, selected, and finalist teams.
 */

export const teams = [
  {
    id: "ZY-001",
    name: "NeuralNova",
    logo: "/images/teams/neuralnova.svg",
    leader: "Kavya Menon",
    institution: "National Institute of Technology",
    members: [
      { name: "Kavya Menon", role: "Team Lead & ML Architect" },
      { name: "Devansh Rathore", role: "Backend & Model Optimization" },
      { name: "Sneha Nair", role: "UI/UX & Frontend Engineer" },
      { name: "Rohit Verma", role: "Data Pipelines & MLOps" }
    ],
    projectTitle: "SynapseGuard: Autonomous Medical Diagnostic Agent",
    description: "An agentic neural network architecture providing real-time differential diagnosis validation and multimodal radiology insight extraction.",
    track: "AI & Machine Learning",
    technologies: ["PyTorch", "FastAPI", "React", "WebSockets", "Transformers"],
    status: "selected", // "selected" | "finalist" | "winner" | "pending"
    githubUrl: "https://github.com/zaya-teams/synapse-guard",
    demoUrl: "https://synapseguard.demo.dev",
    image: "/images/teams/synapse-preview.svg"
  },
  {
    id: "ZY-002",
    name: "AetherFlow",
    logo: "/images/teams/aetherflow.svg",
    leader: "Aditya Sharma",
    institution: "Indian Institute of Information Technology",
    members: [
      { name: "Aditya Sharma", role: "Full-Stack Architect" },
      { name: "Pooja Hegde", role: "Distributed Systems & Go" },
      { name: "Zaid Khan", role: "Interface Engineer" }
    ],
    projectTitle: "OmniLedger: Real-Time Zero-Knowledge Settlement",
    description: "A decentralized high-throughput settlement pipeline leveraging zero-knowledge proofs for instantaneous cross-border enterprise clearance.",
    track: "Cybersecurity & FinTech",
    technologies: ["Go", "Rust", "ZK-Rollups", "React", "Tailwind CSS"],
    status: "finalist",
    githubUrl: "https://github.com/zaya-teams/omniledger",
    demoUrl: "https://omniledger.demo.dev",
    image: "/images/teams/omniledger-preview.svg"
  },
  {
    id: "ZY-003",
    name: "HyperScale Labs",
    logo: "/images/teams/hyperscale.svg",
    leader: "Rhea Sen",
    institution: "Vellore Institute of Technology",
    members: [
      { name: "Rhea Sen", role: "Lead Systems Engineer" },
      { name: "Anish Gupta", role: "WebAssembly & Performance" },
      { name: "Tanvi Deshmukh", role: "Product & Interactions" }
    ],
    projectTitle: "KubeWeave: Visual Microservice Orchestration Canvas",
    description: "A collaborative browser-native 3D topology canvas for visualizing, debugging, and live-tuning cloud distributed systems in real time.",
    track: "Web & App Development",
    technologies: ["React", "Three.js", "WebAssembly", "Docker", "GraphQL"],
    status: "finalist",
    githubUrl: "https://github.com/zaya-teams/kubeweave",
    demoUrl: "https://kubeweave.demo.dev",
    image: "/images/teams/kubeweave-preview.svg"
  },
  {
    id: "ZY-004",
    name: "TerraPulse",
    logo: "/images/teams/terrapulse.svg",
    leader: "Farhan Siddiqui",
    institution: "Delhi Technological University",
    members: [
      { name: "Farhan Siddiqui", role: "IoT & Embedded Systems" },
      { name: "Meera Krishnan", role: "Geo-Spatial Data Scientist" },
      { name: "Aarav Joshi", role: "Mobile Application Developer" },
      { name: "Simran Kaur", role: "Cloud Backend" }
    ],
    projectTitle: "FloraSense: Autonomous Wildfire Early-Detection Mesh",
    description: "Ultra-low power LoRaWAN mesh nodes running micro-ML inference to detect subterranean ignition hotspots hours before canopy combustion.",
    track: "Open Innovation",
    technologies: ["LoRaWAN", "TinyML", "Flutter", "Node.js", "Mapbox"],
    status: "selected",
    githubUrl: "https://github.com/zaya-teams/florasense",
    demoUrl: "https://florasense.demo.dev",
    image: "/images/teams/florasense-preview.svg"
  },
  {
    id: "ZY-005",
    name: "CipherZero",
    logo: "/images/teams/cipherzero.svg",
    leader: "Vikram Malhotra",
    institution: "BITS Pilani",
    members: [
      { name: "Vikram Malhotra", role: "Security Researcher" },
      { name: "Neha Chawla", role: "Cryptographic Engineer" },
      { name: "Arjun Pillai", role: "Platform Engineer" }
    ],
    projectTitle: "AegisShield: Automated Sovereign Identity Enclave",
    description: "Hardware-enclave backed decentralized identity verification system with selective credential disclosure and biometric zero-trust proofs.",
    track: "Cybersecurity & FinTech",
    technologies: ["WebAuthn", "Confidential Computing", "React", "Rust"],
    status: "selected",
    githubUrl: "https://github.com/zaya-teams/aegisshield",
    demoUrl: "https://aegisshield.demo.dev",
    image: "/images/teams/aegis-preview.svg"
  },
  {
    id: "ZY-006",
    name: "BioSynth AI",
    logo: "/images/teams/biosynth.svg",
    leader: "Dr. Sandeep Patel",
    institution: "Indian Institute of Science",
    members: [
      { name: "Dr. Sandeep Patel", role: "Computational Biologist" },
      { name: "Kunal Bansal", role: "Deep Learning Engineer" },
      { name: "Ananya Roy", role: "Full-Stack Developer" }
    ],
    projectTitle: "HelixForge: Generative Protein Binder Co-Designer",
    description: "Diffusion model accelerated de novo protein binder generation interface with real-time 3D coordinate docking simulation in browser.",
    track: "AI & Machine Learning",
    technologies: ["Python", "PyTorch", "Mol*", "Next.js", "Docker"],
    status: "finalist",
    githubUrl: "https://github.com/zaya-teams/helixforge",
    demoUrl: "https://helixforge.demo.dev",
    image: "/images/teams/helix-preview.svg"
  }
];

