import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import About from "@/components/About";
import Work from "@/components/Work";
import Stack from "@/components/Stack";
import Archive from "@/components/Archive";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import CartoonFlight from "@/components/CartoonFlight";
import { getRepos } from "@/lib/github";
import { profile, caseStudies } from "@/lib/data";

export const revalidate = 3600;

export default async function Home() {
  const repos = await getRepos();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: profile.role,
    email: `mailto:${profile.email}`,
    url: profile.github,
    image: profile.avatar,
    sameAs: [profile.github],
    knowsAbout: ["React", "Node.js", "Express", "MongoDB", "Next.js", "TypeScript"],
    hasOccupation: {
      "@type": "Occupation",
      name: profile.role,
    },
    subjectOf: caseStudies.map((c) => ({
      "@type": "CreativeWork",
      name: c.title,
      description: c.summary,
      url: c.live ?? c.repo,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CartoonFlight />
      <Hero />
      <Marquee />
      <About />
      <Work />
      <Stack />
      <Archive repos={repos} />
      <Contact />
      <Footer />
    </>
  );
}
