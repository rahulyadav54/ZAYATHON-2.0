/**
 * ZAYATHON 2.0 — Prizes and Rewards
 * Configurable pool. Note: Exact prize amounts are revealed officially by ZAYA CODE HUB.
 */
export const prizePoolConfig = {
  heading: "BUILD SOMETHING AWARD-WORTHY.",
  subtitle: "RECOGNITION • REWARDS • IMPACT",
  announcementStatus: "TBA", // "TBA" or "ANNOUNCED"
  poolFallbackBadge: "EXCITING REWARDS TO BE ANNOUNCED",
  description: "Beyond bragging rights: prestigious trophies, verified digital certificates, premium developer perks, and fast-tracked mentorship opportunities await the champions.",
  prizes: [
    {
      id: 1,
      rank: "01",
      title: "First Prize — Grand Champion",
      subtitle: "The Ultimate Innovator Trophy",
      reward: "Grand Trophy + Title",
      perks: [
        "Official ZAYATHON 2.0 Gold Trophy",
        "Direct Mentorship & Pitch Access",
        "Verified Winner Certificate of Excellence",
        "Exclusive ZAYA CODE HUB Builder Kit"
      ],
      highlight: true,
      color: "from-[#35D5FF] via-[#9B70FF] to-[#743BFF]"
    },
    {
      id: 2,
      rank: "02",
      title: "Second Prize — Runner Up",
      subtitle: "Distinguished Silver Medalist",
      reward: "Runner-Up Trophy + Honors",
      perks: [
        "Official ZAYATHON 2.0 Silver Trophy",
        "Ecosystem Partner Credits & Access",
        "Verified Certificate of Distinction",
        "Curated Tech Merch Package"
      ],
      highlight: false,
      color: "from-[#9B70FF] to-[#743BFF]"
    },
    {
      id: 3,
      rank: "03",
      title: "Third Prize — Second Runner Up",
      subtitle: "Bronze Achievement Award",
      reward: "Bronze Trophy + Accolades",
      perks: [
        "Official ZAYATHON 2.0 Bronze Trophy",
        "Developer Cloud Vouchers",
        "Verified Certificate of Achievement",
        "ZAYA Community Member Access"
      ],
      highlight: false,
      color: "from-[#743BFF] to-[#35D5FF]"
    }
  ],
  specialRecognitions: [
    {
      title: "Best All-Beginner Squad",
      desc: "Celebrating first-time hackers who build extraordinary functional prototypes."
    },
    {
      title: "Best UI/UX & Design Experience",
      desc: "Honoring products with world-class user journeys, aesthetics, and accessibility."
    },
    {
      title: "Most Novel AI Architecture",
      desc: "Awarded to the squad utilizing advanced neural models or agentic pipelines."
    },
    {
      title: "Verified Credentials for All",
      desc: "Every valid submission receives an official cryptographically verifiable certificate."
    }
  ]
};

