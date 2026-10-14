// All personal details live here. Edit this file to update the site.

export const profile = {
  name: "Jhudiel Matthew Pingol",
  program: "AI Engineering",
  yearLevel: "1st Year",
  school: "Mapúa University",
  location: "Philippines",
  tagline:
    "Building a strong foundation in artificial intelligence, programming, and problem-solving, with the goal of developing practical AI solutions.",
  email: "jhudielmatthew.pingol@gmail.com",
  phone: "09562765243",
  facebook: "https://www.facebook.com/jhudielmatthew.pingol",
  linkedin: "", // add your LinkedIn URL here to show it on the Contact page
};

export const about = {
  background:
    "I'm Jhudiel Matthew Pingol, a first-year AI Engineering student at Mapúa University, starting my journey into artificial intelligence and the systems that power it.",
  whyAI:
    "I chose AI Engineering because it is a new and fast-growing field in the Philippines. I see it as an opportunity to get in early, build in-demand skills, and grow a rewarding career as AI becomes part of more industries.",
};

type Project = {
  title: string;
  type: "Project" | "Lab Work" | "Report" | "Creative Output";
  description: string;
  link: string;
};

// Newest first (the first entry shows as "Latest" on the home page). Add entries like:
// { title: "My First Model", type: "Lab Work", description: "...", link: "" },
export const projects: Project[] = [];

type Post = {
  date: string;
  title: string;
  body: string;
};

// Newest first (the first entry shows as "Latest" on the home page). Add entries like:
// { date: "2026-10-14", title: "My First Week", body: "..." },
export const posts: Post[] = [];
