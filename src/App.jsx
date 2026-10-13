import { useEffect, useState } from "react";
import {
  ArrowDownRight,
  ArrowUpRight,
  BriefcaseBusiness,
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
  { id: "experience", label: "Experience", icon: BriefcaseBusiness },
  { id: "projects", label: "Projects", icon: FolderKanban },
  { id: "contact", label: "Contact", icon: Mail },
];

const experience = [
  {
    id: "american-airlines",
    organization: "Aggie Data Science Club × American Airlines",
    role: "Team Lead, Future Market Prediction",
    dates: "Sept. 2026 – Present",
    highlights: [
      "Leading a team of 4 students forecasting airline market demand up to 2 years out for American Airlines' Network Planning team.",
      "Training an XGBoost model on 300K+ flights that explains 98% of ticket price variation (R² = 0.978) on unseen flights.",
    ],
    linkUrl: "https://github.com/TAMU-Aggie-Data-Science-Club/fall2026-american-airlines",
    linkLabel: "GitHub",
  },
  {
    id: "finch",
    organization: "Finch",
    role: "Software Engineer Intern",
    dates: "June 2026 – Aug. 2026",
    highlights: [
      "Built a RAG pipeline that retrieves jobs from 93K pgvector embeddings for LLM fit scoring, and cut vector search from 8.3 s to 1.3 ms with an HNSW index.",
      "Cut failed profile builds from 38% to 5% with the team by catching cut-off LLM responses, forcing structured JSON output, and parallelizing LLM calls.",
      "Automated releases with GitHub Actions CI/CD that tests every PR and deploys to staging and production for all 5 developers.",
    ],
    linkUrl: "https://applyfinch.com/home",
    linkLabel: "View site",
  },
  {
    id: "maroon-fund",
    organization: "Maroon Fund at Texas A&M",
    role: "Quant Engineer",
    dates: "Jan. 2026 – Present",
    highlights: [
      "Rebuilt the backtesting system for a student-led fund managing $70K after catching a 104% backtest that had been tested on its own training data.",
      "Backtested a 65% return vs. 26% for holding NVDA over a year of unseen market data, after trading costs (Sharpe ratio 1.43).",
    ],
  },
];

const projects = [
  {
    id: "search-engine",
    title: "Search Engine",
    description:
      "A web search engine built from scratch that crawls, indexes, and ranks pages with field-aware BM25, returning the right page first for 90% of test searches. Runs as independently scaling services on Azure Kubernetes Service.",
    tags: ["FastAPI", "Redis", "Kubernetes", "BM25"],
    githubUrl: "https://github.com/Pri1s/search-engine",
    featured: true,
    tone: "ink",
  },
  {
    id: "fleet-os",
    title: "FleetOS",
    description:
      "A trucking fleet-management backend with 40+ FastAPI endpoints on a multi-tenant PostgreSQL schema, GPS and load-board syncing, a scheduled ETL of 2M+ federal carrier records, and a dispatch scorer that ranks trucks for each load.",
    tags: ["FastAPI", "Next.js", "PostgreSQL", "AWS"],
    githubUrl: "https://github.com/malaybiswal/fleet-os",
    featured: true,
    tone: "paper",
  },
  {
    id: "nextup",
    title: "NextUp",
    description:
      "Film analytics for high school basketball, where no public models exist. A fine-tuned YOLO11 pose model detects 22 court landmarks, tripling detection accuracy (mAP 16.6% → 51.2%).",
    tags: ["PyTorch", "YOLO11", "Computer vision"],
    githubUrl: "https://github.com/Pri1s/NextUp",
    featured: true,
    tone: "orange",
  },
  {
    id: "boxmate",
    title: "boxmate",
    description:
      "Shadowbox someone live over webcam. I built the matchmaking queue, the WebSocket pairing and signaling server, and peer-to-peer WebRTC video in the browser.",
    tags: ["TypeScript", "WebRTC", "WebSockets"],
    featured: true,
    tone: "paper",
  },
  {
    id: "job-notis",
    title: "Job Notis",
    description:
      "Checks internship repos and Greenhouse, Lever, Ashby, and SmartRecruiters boards every 15 minutes and posts new matching roles to Discord. Runs on Azure Functions and scales to zero between checks.",
    tags: ["Python", "Azure Functions", "Discord"],
    githubUrl: "https://github.com/Pri1s/job-notis",
    featured: true,
    tone: "lime",
  },
  {
    id: "hs-athletes-api",
    title: "High School Athletes API",
    description:
      "A centralized, public API that makes high-school athlete data easier to find, query, and build on.",
    tags: ["Python", "FastAPI", "Data pipeline"],
    githubUrl: "https://github.com/Pri1s/hs-athletes-api",
    featured: true,
    tone: "paper",
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
              Pri
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
              Right now I'm leading an American Airlines demand-forecasting
              project with the Aggie Data Science Club and working as a quant
              engineer at Maroon Fund. This past summer I was a software
              engineer intern at{" "}
              <a href="https://applyfinch.com/home" target="_blank" rel="noreferrer">
                Finch
                <ArrowUpRight size={12} strokeWidth={2} aria-hidden="true" />
              </a>
              , where I built the RAG pipeline that matches users to jobs. I
              also love sports, and it shows in my projects: I'm building a
              computer-vision tool for high school basketball film.
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
                aria-label="Pri Biswal on GitHub"
              >
                <Github size={18} />
              </a>
              <a
                href="https://www.linkedin.com/in/priyansubiswal/"
                target="_blank"
                rel="noreferrer"
                aria-label="Pri Biswal on LinkedIn"
              >
                <Linkedin size={18} />
              </a>
              <a href="mailto:pribiswal7@gmail.com" aria-label="Email Pri Biswal">
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

        <section className="experience section-pad content-section" id="experience">
          <div className="section-heading section-heading-row">
            <div>
              <h2>Experience.</h2>
            </div>
            <p>
              Where I’ve been shipping lately, from production AI features to forecasting and quant research.
            </p>
          </div>

          <ol className="experience-list">
            {experience.map(({ id, organization, role, dates, highlights, linkUrl, linkLabel }) => (
              <li className="experience-item" key={id}>
                <div className="experience-meta">
                  <span className="experience-dates">{dates}</span>
                  {linkUrl && (
                    <a href={linkUrl} target="_blank" rel="noreferrer">
                      {linkLabel} <ArrowUpRight size={13} aria-hidden="true" />
                    </a>
                  )}
                </div>
                <div>
                  <h3>{organization}</h3>
                  <p className="experience-role">{role}</p>
                  <ul>
                    {highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}
                  </ul>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="projects section-pad content-section" id="projects">
          <div className="section-heading section-heading-row">
            <div>
              <h2>Selected work.</h2>
            </div>
            <p>
              Recent projects across search, backend infrastructure, computer vision, and real-time apps.
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
        <p>Designed & built by Pri Biswal.</p>
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
