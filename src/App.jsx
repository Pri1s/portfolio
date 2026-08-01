import { useEffect, useState } from "react";
import {
  ArrowDownRight,
  ArrowUpRight,
  Check,
  FolderKanban,
  Github,
  Linkedin,
  Mail,
  Menu,
  UserRound,
  X,
} from "lucide-react";

const navigation = [
  { id: "about", label: "About Me", icon: UserRound },
  { id: "projects", label: "Projects", icon: FolderKanban },
  { id: "contact", label: "Contact", icon: Mail },
];

const projects = [
  {
    id: "finch",
    title: "Finch",
    description:
      "Building AI-powered hiring tools, including autofill and resume-enrichment systems that combine hand-tuned logic with LLM reasoning.",
    tags: ["AI", "LLMs", "Product engineering"],
    liveUrl: "https://applyfinch.com/home",
    featured: false,
    tone: "orange",
  },
  {
    id: "nextup",
    title: "NextUp",
    description:
      "A basketball-court keypoint pipeline for turning game footage into reliable training data for pose models.",
    tags: ["Python", "Computer vision", "YOLO"],
    githubUrl: "https://github.com/Pri1s/NextUp",
    featured: true,
    tone: "paper",
  },
  {
    id: "hs-athletes-api",
    title: "High School Athletes API",
    description:
      "A centralized, public API that makes high-school athlete data easier to find, query, and build on.",
    tags: ["Python", "FastAPI", "Data pipeline"],
    githubUrl: "https://github.com/Pri1s/hs-athletes-api",
    featured: true,
    tone: "lime",
  },
  {
    id: "fleet-os",
    title: "FleetOS",
    description:
      "An operations intelligence dashboard for trucking fleets, with a FastAPI backend, PostgreSQL data layer, and Next.js frontend.",
    tags: ["Next.js", "FastAPI", "PostgreSQL"],
    githubUrl: "https://github.com/malaybiswal/fleet-os",
    featured: true,
    tone: "ink",
  },
];

function App() {
  const [activeSection, setActiveSection] = useState("about");
  const [menuOpen, setMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const sections = navigation
      .map(({ id }) => document.getElementById(id))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]) {
          setActiveSection(visible[0].target.id);
        }
      },
      { rootMargin: "-20% 0px -55%", threshold: [0.05, 0.25, 0.6] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const copyEmail = async () => {
    await navigator.clipboard.writeText("pribiswal7@gmail.com");
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="site-shell">
      <header className="site-header">
        <nav className={`nav-pill ${menuOpen ? "is-open" : ""}`} aria-label="Main navigation">
          {navigation.map(({ id, label, icon: Icon }) => (
            <button
              className={activeSection === id ? "is-active" : ""}
              key={id}
              type="button"
              onClick={() => scrollTo(id)}
            >
              <Icon size={15} strokeWidth={1.9} aria-hidden="true" />
              <span>{label}</span>
            </button>
          ))}
        </nav>

        <button
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((current) => !current)}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </header>

      <main>
        <section className="hero section-pad" id="about">
          <div className="hero-copy">
            <p className="hero-kicker reveal reveal-delay-1">Hello there, I’m</p>
            <h1 className="reveal reveal-delay-1">
              Priyansu
              <br />
              Biswal<span className="period">.</span>
            </h1>

            <div className="role-line reveal reveal-delay-2">
              <span>Full-Stack Developer</span>
              <i aria-hidden="true" />
            </div>

            <p className="hero-description reveal reveal-delay-2">
              I'm a Computer Science student at Texas A&amp;M University
              (Engineering Honors), building software that sits at the
              intersection of backend systems and AI/ML infrastructure.
              Currently, I'm a Software Developer at{" "}
              <a href="https://applyfinch.com/home" target="_blank" rel="noreferrer">
                Finch
                <ArrowUpRight size={12} strokeWidth={2} aria-hidden="true" />
              </a>
              , where I work on systems like autofill and resume-enrichment
              pipelines that combine hand-tuned logic with LLM-powered
              reasoning. I also have a strong interest in sports, and my latest
              projects reflect that: I'm building a basketball game analysis
              platform focused on high-school basketball, along with a
              centralized API for high-school basketball athletes.
            </p>

            <div className="hero-actions reveal reveal-delay-3">
              <button className="button button-dark" type="button" onClick={() => scrollTo("contact")}>
                Let’s talk
                <ArrowUpRight size={16} aria-hidden="true" />
              </button>
              <button className="button button-light" type="button" onClick={() => scrollTo("projects")}>
                Explore work
                <ArrowDownRight size={16} aria-hidden="true" />
              </button>
            </div>

            <div className="social-row reveal reveal-delay-4">
              <span>Find me</span>
              <i />
              <a
                href="https://github.com/Pri1s"
                target="_blank"
                rel="noreferrer"
                aria-label="Priyansu on GitHub"
              >
                <Github size={18} />
              </a>
              <a
                href="https://www.linkedin.com/in/priyansu-biswal-677532279/"
                target="_blank"
                rel="noreferrer"
                aria-label="Priyansu on LinkedIn"
              >
                <Linkedin size={18} />
              </a>
              <a href="mailto:pribiswal7@gmail.com" aria-label="Email Priyansu">
                <Mail size={18} />
              </a>
            </div>
          </div>

          <aside className="resume-section reveal reveal-delay-2" aria-label="Résumé">
            <p className="resume-copy">A concise overview of my experience and selected work.</p>
            <a
              className="resume-link"
              href={`${import.meta.env.BASE_URL}priyansu-biswal-resume.pdf`}
              target="_blank"
              rel="noreferrer"
            >
              View my résumé
              <ArrowUpRight size={17} aria-hidden="true" />
            </a>
          </aside>

          <button className="scroll-cue" type="button" onClick={() => scrollTo("projects")}>
            <span>Scroll to discover</span>
            <ArrowDownRight size={15} />
          </button>
        </section>

        <section className="projects section-pad content-section" id="projects">
          <div className="section-heading section-heading-row">
            <div>
              <h2>Selected work.</h2>
            </div>
            <p>
              Recent projects across basketball intelligence, computer vision, and developer-focused data systems.
            </p>
          </div>

          <div className="project-grid">
            {projects.map(({ id, title, description, tags, githubUrl, liveUrl, tone }) => (
              <article className={`project-card project-card-${tone}`} key={id}>
                <div>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </div>
                <div className="tag-row">
                  {tags.map((tag) => <span key={tag}>{tag}</span>)}
                </div>
                {(liveUrl || githubUrl) && (
                  <div className="project-actions">
                    {liveUrl && (
                      <a href={liveUrl} target="_blank" rel="noreferrer">
                        View site <ArrowUpRight size={14} aria-hidden="true" />
                      </a>
                    )}
                    {githubUrl && (
                      <a href={githubUrl} target="_blank" rel="noreferrer">
                        GitHub <ArrowUpRight size={14} aria-hidden="true" />
                      </a>
                    )}
                  </div>
                )}
              </article>
            ))}
          </div>
        </section>

        <section className="contact section-pad content-section" id="contact">
          <div className="contact-layout">
            <div>
              <h2>Contact</h2>
              <p>
                Tell me what you’re building, what’s getting in the way, or just
                say hello.
              </p>
            </div>
            <div className="contact-actions">
              <a className="button button-dark button-wide" href="mailto:pribiswal7@gmail.com">
                Start a conversation
                <ArrowUpRight size={17} />
              </a>
              <button className="copy-email" type="button" onClick={copyEmail}>
                {copied ? <Check size={16} /> : <Mail size={16} />}
                {copied ? "Email copied" : "pribiswal7@gmail.com"}
              </button>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <p>Designed & built by Priyansu Biswal.</p>
        <div>
          <a href="https://github.com/Pri1s" target="_blank" rel="noreferrer">
            GitHub <ArrowUpRight size={13} />
          </a>
          <a href="mailto:pribiswal7@gmail.com">
            Email <ArrowUpRight size={13} />
          </a>
        </div>
      </footer>
    </div>
  );
}

export default App;
