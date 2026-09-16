import { featuredRepoNames, hiddenRepoNames, profile } from "./data";

export type Repo = {
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  pushed_at: string;
  fork: boolean;
};

/* Snapshot used when the GitHub API is unreachable or rate-limited at build time,
   so the archive section never renders empty. */
const FALLBACK: Repo[] = [
  { name: "techcaddmohalinew", description: null, html_url: "https://github.com/Dishant1-git/techcaddmohalinew", homepage: null, language: "TypeScript", stargazers_count: 0, pushed_at: "2026-09-08T00:00:00Z", fork: false },
  { name: "tecaddnew", description: null, html_url: "https://github.com/Dishant1-git/tecaddnew", homepage: "https://tecaddnew.vercel.app", language: "TypeScript", stargazers_count: 0, pushed_at: "2026-09-02T00:00:00Z", fork: false },
  { name: "techcaddludhiana", description: null, html_url: "https://github.com/Dishant1-git/techcaddludhiana", homepage: "https://techcaddphagwarafinal.vercel.app", language: "JavaScript", stargazers_count: 0, pushed_at: "2026-08-22T00:00:00Z", fork: false },
  { name: "techcaddjalndharnew", description: null, html_url: "https://github.com/Dishant1-git/techcaddjalndharnew", homepage: "https://techcaddjalndharnew.vercel.app", language: "TypeScript", stargazers_count: 0, pushed_at: "2026-08-21T00:00:00Z", fork: false },
  { name: "municipal-pro", description: null, html_url: "https://github.com/Dishant1-git/municipal-pro", homepage: null, language: "CSS", stargazers_count: 0, pushed_at: "2026-07-22T00:00:00Z", fork: false },
  { name: "amarweb", description: null, html_url: "https://github.com/Dishant1-git/amarweb", homepage: "https://amarweb-eight.vercel.app", language: "CSS", stargazers_count: 0, pushed_at: "2026-07-21T00:00:00Z", fork: false },
  { name: "trymail", description: null, html_url: "https://github.com/Dishant1-git/trymail", homepage: "https://trymail.vercel.app", language: "JavaScript", stargazers_count: 0, pushed_at: "2026-05-12T00:00:00Z", fork: false },
  { name: "ecom-Ai", description: null, html_url: "https://github.com/Dishant1-git/ecom-Ai", homepage: null, language: "JavaScript", stargazers_count: 0, pushed_at: "2026-05-06T00:00:00Z", fork: false },
  { name: "Influence", description: null, html_url: "https://github.com/Dishant1-git/Influence", homepage: null, language: "JavaScript", stargazers_count: 0, pushed_at: "2026-03-30T00:00:00Z", fork: false },
  { name: "project", description: null, html_url: "https://github.com/Dishant1-git/project", homepage: null, language: "HTML", stargazers_count: 0, pushed_at: "2026-03-06T00:00:00Z", fork: false },
  { name: "Ecom", description: null, html_url: "https://github.com/Dishant1-git/Ecom", homepage: null, language: "JavaScript", stargazers_count: 0, pushed_at: "2025-12-18T00:00:00Z", fork: false },
  { name: "admin", description: null, html_url: "https://github.com/Dishant1-git/admin", homepage: null, language: "CSS", stargazers_count: 0, pushed_at: "2025-12-16T00:00:00Z", fork: false },
  { name: "techfranchise", description: null, html_url: "https://github.com/Dishant1-git/techfranchise", homepage: "https://techfranchise.vercel.app", language: "CSS", stargazers_count: 0, pushed_at: "2025-10-29T00:00:00Z", fork: false },
  { name: "seehra", description: null, html_url: "https://github.com/Dishant1-git/seehra", homepage: null, language: "JavaScript", stargazers_count: 0, pushed_at: "2025-09-18T00:00:00Z", fork: false },
];

/* Human-readable names for repos that have no GitHub description */
const TITLES: Record<string, string> = {
  techcaddmohalinew: "TechCADD Mohali",
  tecaddnew: "TechCADD Main Site",
  techcaddludhiana: "TechCADD Ludhiana",
  techcaddjalndharnew: "TechCADD Jalandhar",
  techfranchise: "TechCADD Franchise",
  "municipal-pro": "Municipal Services Portal",
  amarweb: "Unique Glazing",
  trymail: "Online Mail System",
  "ecom-Ai": "AI Commerce Experiment",
  Influence: "Influence",
  Ecom: "E-Commerce (v1)",
  admin: "Admin Dashboard",
  seehra: "Seehra Automotive",
};

const BLURBS: Record<string, string> = {
  techcaddmohalinew: "Branch marketing site built with Next.js and TypeScript.",
  tecaddnew: "Primary institute site with course listings and enquiry flow.",
  techcaddludhiana: "Branch site with course catalog and lead capture.",
  techcaddjalndharnew: "Branch site rebuilt on the App Router.",
  techfranchise: "Franchise information and application site.",
  "municipal-pro": "Civic services portal for municipal request handling.",
  amarweb: "Marketing site for a UK window and door installation company.",
  trymail: "Online mail system with a lightweight web client for composing and sending.",
  "ecom-Ai": "Commerce experiment exploring AI-assisted product discovery.",
  Influence: "Influencer collaboration platform prototype.",
  Ecom: "First e-commerce build — the groundwork for the current platform.",
  admin: "Standalone admin dashboard UI with data tables and forms.",
  seehra: "Client website for an automotive business.",
};

export type ArchiveRepo = Repo & { title: string; blurb: string };

function decorate(repos: Repo[]): ArchiveRepo[] {
  return repos
    .filter(
      (r) =>
        !r.fork &&
        !featuredRepoNames.includes(r.name) &&
        !hiddenRepoNames.includes(r.name),
    )
    .sort((a, b) => +new Date(b.pushed_at) - +new Date(a.pushed_at))
    .map((r) => ({
      ...r,
      title:
        TITLES[r.name] ??
        r.name.replace(/[-_]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
      blurb: r.description ?? BLURBS[r.name] ?? "Personal build — source on GitHub.",
    }));
}

export async function getRepos(): Promise<ArchiveRepo[]> {
  try {
    const res = await fetch(
      `https://api.github.com/users/${profile.githubHandle}/repos?per_page=100&sort=pushed`,
      {
        headers: { Accept: "application/vnd.github+json" },
        next: { revalidate: 3600 },
      },
    );
    if (!res.ok) throw new Error(`GitHub responded ${res.status}`);
    const data = (await res.json()) as Repo[];
    if (!Array.isArray(data) || data.length === 0) throw new Error("empty payload");
    return decorate(data);
  } catch {
    return decorate(FALLBACK);
  }
}
