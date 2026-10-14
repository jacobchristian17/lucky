import Image from "next/image";
import ContactCard from "@/components/ContactCard";
import ScrollReveal from "@/components/ScrollReveal";
import { about, posts, profile, projects } from "@/data/content";

// The "output layer": one row per section, joined by a vertical line.
const sections = [
  { id: "about", title: "About", desc: "My background and why I chose AI Engineering" },
  { id: "portfolio", title: "Portfolio", desc: "Projects, reports, lab works, and creative outputs" },
  { id: "reflections", title: "Reflections", desc: "What I've been learning and experiencing" },
  { id: "contact", title: "Contact", desc: "Email, text, or message me on Facebook" },
];

const facts = [
  { label: "School", value: profile.school },
  { label: "Program", value: profile.program },
  { label: "Year level", value: profile.yearLevel },
  { label: "Based in", value: profile.location },
];

export default function Home() {
  return (
    <>
      <section id="top" className="hero">
        <div className="hero-text">
          <p className="greeting">Hi, my name is</p>
          <h1>{profile.name}</h1>
          <p className="program">
            {profile.yearLevel} {profile.program} Student at {profile.school}
          </p>
          <p className="intro">{profile.tagline}</p>
        </div>
        <nav className="layer" aria-label="Sections">
          {sections.map((s) => (
            <a key={s.id} href={`#${s.id}`}>
              <span className="layer-dot" />
              <span className="layer-edge" />
              <span className="layer-text">
                <span className="layer-title">{s.title}</span>
                <span className="layer-desc">{s.desc}</span>
              </span>
            </a>
          ))}
          <span className="layer-drift" aria-hidden="true" />
        </nav>
      </section>

      <section id="about" className="section">
        <div className="about-head" data-reveal>
          <div className="about-photo">
            <Image src="/profile.jpg" alt={`Photo of ${profile.name}`} width={375} height={364} />
          </div>
          <h2 className="section-title">About me</h2>
        </div>
        <dl className="facts" data-reveal>
          {facts.map((f) => (
            <div key={f.label}>
              <dt>{f.label}</dt>
              <dd>{f.value}</dd>
            </div>
          ))}
        </dl>
        <article className="entry" data-reveal>
          <h3>Background</h3>
          <p>{about.background}</p>
        </article>
        <article className="entry" data-reveal>
          <h3>Why AI Engineering</h3>
          <p>{about.whyAI}</p>
        </article>
      </section>

      <section id="portfolio" className="section">
        <h2 className="section-title" data-reveal>
          Portfolio
        </h2>
        <p className="lead" data-reveal>
          Projects, reports, lab works, and creative outputs.
        </p>
        {projects.length === 0 && (
          <p className="empty" data-reveal>
            Projects will appear here as I finish them.
          </p>
        )}
        {projects.map((p) => (
          <article key={p.title} className="entry" data-reveal>
            <p className="meta">{p.type}</p>
            <h3>{p.title}</h3>
            <p>{p.description}</p>
            {p.link && (
              <a href={p.link} target="_blank" rel="noopener noreferrer">
                View {p.title}
              </a>
            )}
          </article>
        ))}
      </section>

      <section id="reflections" className="section">
        <h2 className="section-title" data-reveal>
          Reflections
        </h2>
        <p className="lead" data-reveal>
          Short notes on what I have learned and experienced.
        </p>
        {posts.length === 0 && (
          <p className="empty" data-reveal>
            Reflections will appear here as I write them.
          </p>
        )}
        {posts.map((p) => (
          <article key={p.title} className="entry" data-reveal>
            <p className="meta">{p.date}</p>
            <h3>{p.title}</h3>
            <p>{p.body}</p>
          </article>
        ))}
      </section>

      <section id="contact" className="section">
        <h2 className="section-title" data-reveal>
          Contact
        </h2>
        <p className="lead" data-reveal>
          For questions, opportunities, or class projects, reach me any of these ways. Email is best for anything
          detailed.
        </p>
        <ContactCard
          email={profile.email}
          phone={profile.phone}
          facebook={profile.facebook}
          linkedin={profile.linkedin}
        />
      </section>

      {/* Last, so it runs after everything above has hydrated */}
      <ScrollReveal />
    </>
  );
}
