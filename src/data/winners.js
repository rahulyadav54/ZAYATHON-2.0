/**
 * ZAYATHON 2.0 — Official Winners & Results Configuration
 * Configurable store. When status is 'UPCOMING', the podium renders an elegant locked countdown preview.
 * When status is 'PUBLISHED', the podium renders the official champions.
 */

export const winnersConfig = {
  heading: "THE WINNERS OF ZAYATHON 2.0",
  subtitle: "CELEBRATING EXTRAORDINARY INNOVATION",
  tagline: "Celebrating the minds that turned bold ideas into extraordinary solutions.",
  
  // Status: "UPCOMING" or "PUBLISHED"
  // Default is "UPCOMING" to respect the event lifecycle requirement!
  status: "UPCOMING",
  announcementDate: "Grand Finale Demo Day",
  
  // Official Podium Data (populated by organizers when published)
  firstPlace: {
    teamId: "ZY-001",
    teamName: "NeuralNova",
    projectTitle: "SynapseGuard: Autonomous Medical Diagnostic Agent",
    track: "AI & Machine Learning",
    badge: "GRAND CHAMPION • 1ST PLACE",
    prize: "Gold Trophy + Title Honors",
    members: ["Kavya Menon (Lead)", "Devansh Rathore", "Sneha Nair", "Rohit Verma"],
    description: "Built an extraordinary autonomous agent pipeline for real-time multimodal medical imaging analysis with verifiable safety enclaves.",
    logo: "/images/teams/neuralnova.svg"
  },
  secondPlace: {
    teamId: "ZY-002",
    teamName: "AetherFlow",
    projectTitle: "OmniLedger: Real-Time Zero-Knowledge Settlement",
    track: "Cybersecurity & FinTech",
    badge: "1ST RUNNER UP • 2ND PLACE",
    prize: "Silver Medal + Honors",
    members: ["Aditya Sharma (Lead)", "Pooja Hegde", "Zaid Khan"],
    description: "Architected a lightning-fast zero-knowledge decentralized settlement layer handling 40,000+ simulated transactions per second.",
    logo: "/images/teams/aetherflow.svg"
  },
  thirdPlace: {
    teamId: "ZY-003",
    teamName: "HyperScale Labs",
    projectTitle: "KubeWeave: Visual Microservice Orchestration Canvas",
    track: "Web & App Development",
    badge: "2ND RUNNER UP • 3RD PLACE",
    prize: "Bronze Medal + Honors",
    members: ["Rhea Sen (Lead)", "Anish Gupta", "Tanvi Deshmukh"],
    description: "Engineered an astonishing WebAssembly 3D cloud infrastructure canvas that visualizes microservice latency live.",
    logo: "/images/teams/hyperscale.svg"
  },

  // Special Category Awards
  specialAwards: [
    {
      category: "Best AI Innovation",
      teamName: "BioSynth AI",
      teamId: "ZY-006",
      project: "HelixForge: Generative Protein Binder Co-Designer",
      track: "AI & Machine Learning"
    },
    {
      category: "Best Web/App Architecture",
      teamName: "HyperScale Labs",
      teamId: "ZY-003",
      project: "KubeWeave Canvas",
      track: "Web & App Development"
    },
    {
      category: "Best Open Innovation / Impact",
      teamName: "TerraPulse",
      teamId: "ZY-004",
      project: "FloraSense Wildfire Detection Mesh",
      track: "Open Innovation"
    },
    {
      category: "People's Choice Award",
      teamName: "NeuralNova",
      teamId: "ZY-001",
      project: "SynapseGuard",
      track: "AI & Machine Learning"
    }
  ]
};

