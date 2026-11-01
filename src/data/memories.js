/**
 * ZAYATHON 1.0 — Memories & Retrospective Archive
 * Authentic media registry for Edition 01
 */

export const featuredMedia = {
  title: "ZAYATHON 1.0 — Official Highlight Reel",
  subtitle: "RELIVE THE ENERGY",
  description: "Revisit the 36 hours of non-stop adrenaline, groundbreaking prototypes, and visionary ideas that defined the historic first edition.",
  thumbnail: "/images/zayathon-1/highlights.svg",
  type: "featured",
  // If YouTube link or MP4 is available, set url here: e.g. "https://www.youtube.com/watch?v=..."
  videoUrl: "", 
  stats: [
    { label: "Edition", value: "01" },
    { label: "Format", value: "36H Sprint" },
    { label: "Atmosphere", value: "Electric" }
  ]
};

export const memoryCategories = [
  "All Moments",
  "Inauguration",
  "Participants",
  "Team Collaboration",
  "Project Demonstrations",
  "Mentors and Judges",
  "Award Ceremony",
  "Winners and Celebrations",
  "Behind the Scenes"
];

export const memories = [
  {
    id: 1,
    title: "Opening Keynote & Lamp Lighting",
    category: "Inauguration",
    image: "/images/zayathon-1/inauguration/opening-ceremony.svg",
    alt: "ZAYATHON 1.0 opening ceremony and ceremonial ignition",
    caption: "Igniting the spark of innovation as Edition 1.0 officially begins.",
    aspect: "aspect-video",
    edition: "1.0",
    year: "2024"
  },
  {
    id: 2,
    title: "Hackers in the Zone",
    category: "Participants",
    image: "/images/zayathon-1/participants/hackers-in-action.svg",
    alt: "Developers set up their multi-monitor battlestations",
    caption: "Teams claim their workstations, calibrating tools for a 36-hour build marathon.",
    aspect: "aspect-[4/3]",
    edition: "1.0",
    year: "2024"
  },
  {
    id: 3,
    title: "Midnight Architecture Jam",
    category: "Team Collaboration",
    image: "/images/zayathon-1/teamwork/brainstorming-squads.svg",
    alt: "Squad brainstorming distributed system diagrams",
    caption: "Fierce whiteboarding and system architecture design in the dead of night.",
    aspect: "aspect-video",
    edition: "1.0",
    year: "2024"
  },
  {
    id: 4,
    title: "Relentless Code Sprint",
    category: "Team Collaboration",
    image: "/images/zayathon-1/teamwork/coding-sprint.svg",
    alt: "Full stack engineering team pushing commits to git",
    caption: "Pushing commits, tackling merge conflicts, and bringing ideas to life.",
    aspect: "aspect-[4/5]",
    edition: "1.0",
    year: "2024"
  },
  {
    id: 5,
    title: "Main Stage Project Demo",
    category: "Project Demonstrations",
    image: "/images/zayathon-1/presentations/pitching-session.svg",
    alt: "Team presenting live AI demo to the jury",
    caption: "Pitching working prototypes and AI agents directly to industry leaders.",
    aspect: "aspect-video",
    edition: "1.0",
    year: "2024"
  },
  {
    id: 6,
    title: "Mentor Check-In & Code Review",
    category: "Mentors and Judges",
    image: "/images/zayathon-1/mentors/expert-guidance.svg",
    alt: "Industry mentor auditing team architecture",
    caption: "Veteran engineers offering technical guidance and critical stress testing.",
    aspect: "aspect-[4/3]",
    edition: "1.0",
    year: "2024"
  },
  {
    id: 7,
    title: "Grand Trophy Unveiling",
    category: "Award Ceremony",
    image: "/images/zayathon-1/awards/trophy-presentation.svg",
    alt: "Edition 1.0 award ceremony and trophy distribution",
    caption: "The pinnacle moment of recognition after intense evaluation.",
    aspect: "aspect-video",
    edition: "1.0",
    year: "2024"
  },
  {
    id: 8,
    title: "Champions on the Podium",
    category: "Winners and Celebrations",
    image: "/images/zayathon-1/winners/champion-teams.svg",
    alt: "Winners celebrating on stage with winning certificates",
    caption: "Celebrating breakthrough innovation, resilience, and sheer engineering grit.",
    aspect: "aspect-video",
    edition: "1.0",
    year: "2024"
  },
  {
    id: 9,
    title: "Behind the Scenes Command Hub",
    category: "Behind the Scenes",
    image: "/images/zayathon-1/behind-the-scenes/crew-and-vibes.svg",
    alt: "ZAYA CODE HUB organizing team managing logistical and technical operations",
    caption: "The tireless ZAYA CODE HUB crew orchestrating every second of the experience.",
    aspect: "aspect-[4/3]",
    edition: "1.0",
    year: "2024"
  }
];

export const videos = [
  {
    id: 1,
    title: "ZAYATHON 1.0 Aftermovie Experience",
    description: "The official cinematic wrap-up featuring hacker interviews, keynote flashes, and podium celebrations.",
    type: "archive",
    url: "",
    thumbnail: "/images/zayathon-1/highlights.svg",
    duration: "3:45",
    category: "Highlights"
  },
  {
    id: 2,
    title: "Grand Opening Keynote Address",
    description: "Inspirational keynote kickstarting Edition 1.0 by ZAYA CODE HUB mentors.",
    type: "archive",
    url: "",
    thumbnail: "/images/zayathon-1/inauguration/opening-ceremony.svg",
    duration: "12:10",
    category: "Inauguration"
  },
  {
    id: 3,
    title: "Finalist Pitching & Live Jury Q&A",
    description: "The top 5 finalists demonstrating their working prototypes live on stage.",
    type: "archive",
    url: "",
    thumbnail: "/images/zayathon-1/presentations/pitching-session.svg",
    duration: "18:24",
    category: "Presentations"
  }
];

