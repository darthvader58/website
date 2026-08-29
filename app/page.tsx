'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { MapPin, Eye, Search, ArrowRight, ExternalLink, Github, Heart } from 'lucide-react';
import { Shell, SectionHeader } from './components/Shell';
import PhotoGallery from './components/PhotoGallery';
import SpotifyNowPlaying from './components/SpotifyNowPlaying';
import ScrollReveal from './components/ScrollReveal';
import ProjectCard from './components/ProjectCard';
import GithubActivity from './components/GithubActivity';
import DeferredMount from './components/DeferredMount';
import { usePalette } from './components/PaletteContext';
import { useViewCount } from './lib/useViewCount';
import { getPublishedBlogPosts, formatBlogDate } from './lib/blog';

const HEADLINE_TITLES = [
  'Namaste! Bonjour! Hello There!',
  'Computer Systems & Math @ ASU',
  'ML Researcher, CoDe Lab',
  'Founder, WoofCare',
  'Robotics Engineer',
];

const experiences = [
  {
    title: "Independent Researcher",
    company: "TBD",
    period: "August 2026 - Present",
    location: "Tempe, Arizona",
    description: "Designing and formally verifying an FPGA-resident hardware safety monitor for LLM/MCP-controlled systems. The monitor sits between a soft processor and physical actuators to enforce hard output ceilings, interlocks, and rate limits even if the host software or firmware is compromised. Evaluating adversarial-command rejection, formal correctness, latency, and Artix-7 resource cost on a Nexys A7-100T.",
    technologies: ["Verilog", "SystemVerilog", "FPGA", "SymbiYosys", "Vivado", "MCP", "Hardware Security", "Formal Verification"]
  },
  {
    title: "Founder and CEO",
    company: "WoofCare Solutions Pvt. Ltd.",
    period: "May 2025 - Present",
    location: "India",
    description: "Developing a mobile app using Flutter + Firebase + a Python backend, connecting dog lovers & dog care services to improve lives of stray dogs in India. Project funded by EPICS (Engineering Projects In Community Service) at ASU. Integrated Google's Admob & Apps API to facilitate seamless location-based services & crowdfunds, partnering with over 60+ local and large NGOs in Pune, India including Voice of Stray Dogs (VOSD) and Dogs Friendly Pune.",
    technologies: ["Flutter", "Firebase", "Python", "Google Maps", "Google AdMob"]
  },
  {
    title: "Machine Learning Researcher and Developer",
    company: "Collective Design Lab (CoDe) @ ASU",
    period: "May 2024 - Present",
    location: "Tempe, Arizona",
    description: "Developing Reinforcement Learning techniques to optimize Earth science missions to autonomously determine priority observations in space, under the mentorship of Dr. Paul Grogan of SCAI Faculty at ASU. Co-authoring a review paper discussing relation between OSSEs & Mission Engineering. Trained DQN and QRDQN models using Pytorch, GeoPandas, TAT-C, Seaborn on NASA's Geos5 dataset, achieving 67% precision and 87% recall resp. Receiving total $4600 through FURI and GCSP Research funding.",
    technologies: ["Python", "PyTorch", "GeoPandas", "TAT-C", "RL", "Celestrak", "NASA G5NR", "WMO Oscar"]
  },
  {
    title: "Product Development Manager",
    company: "MentorU",
    period: "July 2025 - August 2025",
    location: "Los Angeles, California",
    description: "Managed/Led a team of 5 developers developing a full-stack online platform for college admission counseling startup, to automate features like scholarship finder and personal story-building. Increased UX Research success by 150%.",
    technologies: ["Next.js", "Supabase", "LLM"]
  },
  {
    title: "Team Member",
    company: "Invincibles Robotics",
    period: "August 2022 - December 2023",
    location: "Delhi, India",
    description: "Designed and built power distribution boards, safety mechanisms, TX/RX configurations and ESC modifications for Battlebots, ranging from 15lbs to 60lbs. Led the team (sponsored by Roboverse) to 30+ international and national wins, with 100k+ collected over prize money.",
    technologies: ["Fusion 360", "CNC Machining", "Circuit Designing", "Physics"]
  },
  {
    title: "Electrical Subsystems Engineer",
    company: "Team Inferno, Delhi Technological University (DTU)",
    period: "December 2022 - February 2023",
    location: "Delhi, India",
    description: "Developed custom PCBs on Allegro for incorporating embedded systems on-board the prototype Mars Rover for University Rover Challenge (URC). Programmed perception and navigation systems using ROS, OpenGL and SLAM on Python, along with various other system simulations on Gazebo.",
    technologies: ["ROS", "Python", "Embedded Systems", "Allegro Orcad", "OpenCV"]
  },
  {
    title: "Software Developer Intern",
    company: "IIRIS Consultancy Pvt. Ltd.",
    period: "June 2022 - August 2022",
    location: "Gurugram, India",
    description: "Maintained customer/client databases for more than 100 clients using Python and PostgreSQL. Automated Meetings Scheduler and Emailing System for Marketing Leads for 20+ distinct Services.",
    technologies: ["Python", "MySQL", "Pandas"]
  }
];

const projects = [
  {
    title: "WoofCare",
    description: "Social network connecting dog owners, shelters, and veterinarians across India. Real-time chat and location-based services.",
    technologies: ["Flutter", "Firebase", "Python", "Google Maps API"],
    github: "https://github.com/Woofcare/WoofCare",
    link: "https://woofcare-website.vercel.app",
    hasLivePreview: true
  },
  {
    title: "Asclepius",
    description: "A privacy proxy between clinical trial staff and Cloud AI models, it strips PHI, protects billion-dollar drug IP, and preserves the fast workflow people actually want.",
    technologies: ["Pytorch", "FastAPI", "Cloud LLMs", "HIPAA Compliance", "NextJs", "Gemma 4"],
    github: "https://github.com/shiv-arora/hackprincetons26",
    previewImage: "/images/asclepius.png"
  },
  {
    title: "Whatrobe",
    description: "AI fashion recommendation system analyzing style preferences and suggesting outfits.",
    technologies: ["Next.js", "MongoDB", "Anthropic API", "OpenCV"],
    github: "https://github.com/darthvader58/whatrobe",
    link: "https://mywhatrobe.vercel.app",
    hasLivePreview: true
  },
  {
    title: "KnockScript",
    description: "Toy programming language based on Knock Knock jokes.",
    technologies: ["Ruby", "Compiler Design", "HTML/CSS", "Puma"],
    github: "https://github.com/darthvader58/knockscript",
    link: "https://knockscript.up.railway.app",
    previewImage: "/images/knockscript.png",
    hasLivePreview: true
  },
  {
    title: "Pit Wall",
    description: "Write strategy bots that compete in physics-accurate F1 simulations.",
    technologies: ["Python", "Compiler design", "Physics Engine", "FastAPI", "Docker"],
    github: "https://github.com/darthvader58/phi1",
    previewImage: "/images/pitwall.png",
    link: "https://pitwall.up.railways.app",
    hasLivePreview: true
  },
  {
    title: "KaleshScript",
    description: "Toy programming language based on Delhi's street slang and memes.",
    technologies: ["Go", "Compiler Design", "Next.js"],
    github: "https://github.com/darthvader58/kaleshscript",
    link: "https://kaleshscript.vercel.app",
    hasLivePreview: true
  },
  {
    title: "Numericle",
    description: "Daily puzzle game. Wordle but for guessing math sequences and patterns",
    technologies: ["Typescript", "Firebase"],
    github: "https://github.com/darthvader58/numericle",
    link: "https://numericle.space",
    previewImage: "/images/numericle.png",
    hasLivePreview: true
  },
  {
    title: "Formath",
    description: "Mathematical solution analyzer with step-by-step explanations. Built for hackathon.",
    technologies: ["React", "Node.js", "Express", "CockroachDB", "AWS"],
    github: "https://github.com/darthvader58/biryani",
    link: "https://formath.vercel.app",
    hasLivePreview: true
  },
  {
    title: "Terrader",
    description: "Terrader is a web based game in the form of a crypto-trading simulator that functions with respect to a carbon footprint, carbon score and strategic gameplay; and has other interesting side-features to increase awareness among the players on how a fruitful and trending practice has an unnoticed contribution to climate change.",
    technologies: ["React", "Python", "OpenAI GPT"],
    github: "https://github.com/theVedanta/terrader",
    link: "https://play-terrader.vercel.app/lobby",
    hasLivePreview: true
  },
  {
    title: "Metal Lab",
    description: "Advanced physics simulation platform with GPU acceleration. Interactive experiments for educational purposes.",
    technologies: ["Next.js", "Three.js", "WebGPU", "Cannon.js", "Metal Shaders", "xAI", "ElevenLabs"],
    github: "https://github.com/arpan404/metal_lab",
    previewImage: "https://d112y698adiu2z.cloudfront.net/photos/production/software_photos/003/956/281/datas/original.png"
  }
];

const SKILL_CATEGORIES = [
  {
    title: 'Languages',
    items: ['Python', 'C++', 'C', 'Java', 'JavaScript', 'TypeScript', 'Rust', 'Swift', 'Triton', 'Go', 'Ruby', 'Astro', 'LaTeX', 'Lua', 'R', 'SQL', 'Dart', 'Perl', 'CUDA', 'MATLAB', 'VHDL', 'Verilog', 'MIPS Assembly'],
  },
  {
    title: 'Frontend, Backend & Database',
    items: ['HTML', 'CSS', 'React', 'Node.js', 'Next.js', 'Flutter', 'SwiftUI', 'MongoDB', 'Django', 'Flask', 'FastAPI', 'CockroachDB', 'Firebase', 'PostgreSQL', 'Docker'],
  },
  {
    title: 'AI & Machine Learning',
    items: ['NumPy', 'Pandas', 'GeoPandas', 'Scikit-learn', 'TensorFlow', 'Keras', 'PyTorch', 'spaCy', 'OpenCV', 'OpenAI Gym'],
  },
  {
    title: 'Internet of Things',
    items: ['Arduino', 'Raspberry Pi', 'ESP WiFi'],
  },
  {
    title: 'Version Control',
    items: ['Git', 'GitHub'],
  },
  {
    title: 'Deployment',
    items: ['Kubernetes', 'Railway', 'Vercel', 'Heroku'],
  },
  {
    title: 'Circuit Designing',
    items: ['KiCad', 'LTSpice'],
  },
  {
    title: 'CAD & Simulation',
    items: ['Autodesk', 'TinkerCAD', 'Ansys'],
  },
];

function GitHubGlyph(props: { className?: string }) {
  return (
    <svg className={props.className} viewBox="0 0 16 16" fill="currentColor">
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
    </svg>
  )
}

function LinkedInGlyph(props: { className?: string }) {
  return (
    <svg className={props.className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

function TwitterGlyph(props: { className?: string }) {
  return (
    <svg className={props.className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

function InstagramGlyph(props: { className?: string }) {
  return (
    <svg className={props.className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  )
}

function MailGlyph(props: { className?: string }) {
  return (
    <svg className={props.className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z" />
    </svg>
  )
}

const CONTACT_LINKS = [
  { label: 'GitHub', href: 'https://github.com/darthvader58', Icon: GitHubGlyph },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/raj-shashwat', Icon: LinkedInGlyph },
  { label: 'Twitter', href: 'https://x.com/shash_raj_', Icon: TwitterGlyph },
  { label: 'Instagram', href: 'https://instagram.com/shash._me', Icon: InstagramGlyph },
  { label: 'Email', href: 'mailto:rajayshashwat@gmail.com', Icon: MailGlyph },
];

function Hero() {
  const [headlineIndex, setHeadlineIndex] = useState(0);
  const { setOpen } = usePalette();
  const { count, isLoading } = useViewCount();

  useEffect(() => {
    const timer = setInterval(() => {
      setHeadlineIndex((prev) => (prev + 1) % HEADLINE_TITLES.length);
    }, 3200);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <Shell className="px-2 pt-2 sm:px-3 sm:pt-3">
        <div className="relative h-36 overflow-hidden rounded-xl border border-[var(--line)] bg-[var(--card)] sm:h-44">
          <img
            src="/images/grand-canyon-banner.png"
            alt="Grand Canyon panorama"
            loading="eager"
            className="h-full w-full object-cover object-center opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)]/50 to-transparent" />
          <div className="absolute inset-0 opacity-20 [background-image:repeating-linear-gradient(0deg,rgba(255,255,255,0.05)_0,rgba(255,255,255,0.05)_1px,transparent_1px,transparent_5px)]" />
          <div className="absolute inset-0 opacity-30 [background-image:repeating-linear-gradient(90deg,rgba(0,0,0,0.12)_0,rgba(0,0,0,0.12)_1px,transparent_1px,transparent_28px)]" />
        </div>
      </Shell>

      <Shell className="px-6 py-6 sm:px-8">
        <div className="flex flex-col items-center justify-between gap-6 text-center sm:flex-row sm:items-center sm:text-left">
          <div className="flex flex-col items-center gap-5 text-center sm:flex-row sm:items-center sm:text-left">
            <div className="relative grid size-20 shrink-0 place-items-center overflow-hidden rounded-xl border border-[var(--line)] bg-[var(--chip)]">
              <img src="/images/Myself.png" alt="Shashwat Raj" className="h-full w-full object-cover" />
            </div>
            <div>
              <h1 className="text-glitch font-serif text-3xl leading-none tracking-tight text-[var(--fg)] sm:text-[38px]">
                Shashwat Raj
              </h1>
              <div className="mt-1 h-[20px] overflow-hidden">
                <p key={headlineIndex} className="animate-fade-in font-mono text-[13px] text-[var(--muted)]">
                  {HEADLINE_TITLES[headlineIndex]}
                </p>
              </div>
              <p className="mt-1 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 font-mono text-[11px] text-[var(--soft)] sm:justify-start">
                <span className="flex items-center gap-1">
                  <MapPin size={12} className="shrink-0" /> Tempe, Arizona
                </span>
                <span>·</span>
                <span className="flex items-center gap-1">
                  <Eye size={12} className="shrink-0" />
                  <span>{isLoading ? '...' : count !== null ? `${count.toLocaleString()} views` : 'views unavailable'}</span>
                </span>
              </p>
            </div>
          </div>

          <button
            onClick={() => setOpen(true)}
            className="flex items-center gap-2 rounded-lg border border-[var(--line)] bg-[var(--chip)] px-3 py-1.5 font-mono text-[11px] text-[var(--muted)] shadow-sm transition-colors hover:text-[var(--fg)]"
          >
            <Search size={14} />
            <span>⌘K</span>
          </button>
        </div>
      </Shell>
    </>
  );
}

function About() {
  const paragraphs = [
    "I'm a senior at Arizona State University double majoring in Computer Systems Engineering and Math, with a passion for building innovative solutions at the intersection of hardware and software.",
    "One thing I've always admired about Linus Torvalds is his practical kind of laziness: if a task is tedious and repetitive, build something so you never have to do it the same way again. That instinct is behind almost everything I build, I care less about a project looking impressive and more about whether it actually removes some friction for someone. I've been drawn to tinkering and building for as long as I can remember, and what keeps me at it is less raw talent and more stubbornness. I'll stay on a problem long after it stops being fun, because I'd rather push through and finish something than leave it half-built. That same restlessness shapes how much I want to build and how far I want to take it.",
    "When I'm not coding or researching, you can find me playing the flute, working on Battlebots, boxing, creating digital art, hosting my podcast \"Write It Out\", or writing on my blog. I'm big into sports too, basketball, cricket, and football, and on the PS5 I'm usually deep into FIFA, Assassin's Creed, or a co-op run of Split Fiction or Spider-Man 2. I love travelling as well!",
  ];

  const snapshot = [
    'ASU — BSE Comp. Engr. + BS Math',
    '3.78 GPA',
    'AI, Machine Learning & GPU Programming',
    'Full-Stack Development',
    'Embedded Systems, IoT & Robotics',
    'Operating Systems',
  ];

  return (
    <div id="about">
      <SectionHeader title="About" />
      <Shell className="space-y-4 px-6 py-7 sm:px-8">
        {paragraphs.map((para) => (
          <div key={para} className="flex gap-2 text-[14.5px] leading-relaxed text-[var(--muted)]">
            <span className="font-mono text-[var(--soft)]">•</span>
            <p>{para}</p>
          </div>
        ))}

        <div className="mt-6 rounded-xl border border-[var(--line)] bg-[var(--card)] p-5">
          <p className="mb-3 font-mono text-[11px] font-semibold uppercase tracking-widest text-[var(--fg)]">
            Developer Snapshot
          </p>
          <ul className="grid grid-cols-1 gap-2 font-mono text-[13px] text-[var(--muted)] sm:grid-cols-2">
            {snapshot.map((item) => (
              <li key={item} className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 flex-none rounded-full bg-purple-500" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <ScrollReveal>
          <PhotoGallery />
        </ScrollReveal>

        <ScrollReveal>
          <DeferredMount
            className="min-h-[180px]"
            fallback={
              <div className="mt-12" aria-hidden="true">
                <div className="mb-6 h-8 w-56 animate-pulse rounded bg-[var(--chip)]" />
                <div className="h-24 animate-pulse rounded-2xl border border-[var(--line)] bg-[var(--card)]" />
              </div>
            }
          >
            <SpotifyNowPlaying />
          </DeferredMount>
        </ScrollReveal>
      </Shell>
    </div>
  );
}

function Contact() {
  return (
    <div id="contact">
      <SectionHeader title="Contact" />
      <Shell className="px-6 py-7 sm:px-8">
        <p className="mb-6 text-[14px] leading-relaxed text-[var(--muted)]">
          If you&apos;ve scrolled all the way down here, you might be interested in collaborating, hiring, or just saying hi.
        </p>
        <div className="flex flex-wrap gap-2">
          {CONTACT_LINKS.map(({ label, href, Icon }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('mailto:') ? undefined : '_blank'}
              rel="noopener noreferrer"
              className="group flex items-center gap-1.5 rounded-lg border border-[var(--line)] bg-[var(--card)] px-2.5 py-1.5 text-[12px] font-medium text-[var(--muted)] transition-colors hover:border-[var(--soft)] hover:text-[var(--fg)]"
            >
              <span className="grid size-5 place-items-center rounded-md border border-[var(--line)] bg-[var(--chip)] text-[var(--muted)] transition-colors group-hover:text-[var(--fg)]">
                <Icon className="size-3" />
              </span>
              {label}
              <ExternalLink className="size-3 text-[var(--soft)] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[var(--fg)]" />
            </a>
          ))}
        </div>
      </Shell>
    </div>
  );
}

function Projects() {
  return (
    <div id="projects">
      <SectionHeader
        title="Projects"
        aside={
          <div className="flex items-center gap-4">
            <Link href="/opensource" className="flex items-center gap-1.5 font-mono text-[11px] text-[var(--muted)] transition-colors hover:text-[var(--fg)]">
              <Github size={13} />
              Open-Source
            </Link>
            <a
              href="https://github.com/sponsors/darthvader58"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 font-mono text-[11px] text-[var(--muted)] transition-colors hover:text-[var(--fg)]"
            >
              <Heart size={13} />
              Sponsor
            </a>
          </div>
        }
      />
      <Shell className="px-6 py-7 sm:px-8">
        <p className="mb-6 text-[14px] leading-relaxed text-[var(--muted)]">
          A collection of my personal projects, open-source contributions, and academic work spanning web development,
          machine learning, embedded systems, and robotics.
        </p>

        <div className="relative">
          <button
            onClick={() => document.getElementById('projects-scroll-container')?.scrollBy({ left: -800, behavior: 'smooth' })}
            className="project-carousel-nav absolute left-0 top-1/2 z-10 -translate-y-1/2 rounded-full border p-3 shadow-lg transition-all duration-200 hover:scale-110"
            aria-label="Scroll left"
          >
            <ArrowRight className="size-5 rotate-180" />
          </button>
          <button
            onClick={() => document.getElementById('projects-scroll-container')?.scrollBy({ left: 800, behavior: 'smooth' })}
            className="project-carousel-nav absolute right-0 top-1/2 z-10 -translate-y-1/2 rounded-full border p-3 shadow-lg transition-all duration-200 hover:scale-110"
            aria-label="Scroll right"
          >
            <ArrowRight className="size-5" />
          </button>

          <div id="projects-scroll-container" className="scrollbar-hide -mx-4 overflow-x-auto px-4 pb-4 snap-x snap-mandatory">
            <div className="flex gap-8" style={{ width: 'max-content' }}>
              {projects.map((project, index) => (
                <ScrollReveal key={index} delay={index * 25}>
                  <div className="h-full w-[420px] flex-shrink-0 snap-center">
                    <ProjectCard {...project} />
                  </div>
                </ScrollReveal>
              ))}

              <ScrollReveal delay={250}>
                <div className="flex h-full w-[280px] flex-shrink-0 snap-center items-center justify-center">
                  <Link href="/projects" className="block h-[260px] w-full">
                    <div className="group flex h-full flex-col items-center justify-center rounded-2xl border border-dashed border-[var(--line)] bg-[var(--card)] transition-all duration-300 hover:border-[var(--soft)]">
                      <ArrowRight className="mb-3 size-10 text-[var(--muted)] transition-transform group-hover:translate-x-1" />
                      <h3 className="mb-2 text-xl font-bold text-[var(--fg)]">See More Projects</h3>
                      <p className="text-sm text-[var(--soft)]">View all 30+ projects</p>
                    </div>
                  </Link>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/projects"
            className="group inline-flex items-center gap-2 rounded-lg bg-[var(--fg)] px-6 py-3 text-sm font-semibold text-[var(--bg)] transition-transform duration-200 hover:-translate-y-0.5"
          >
            All Projects
            <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>
      </Shell>
    </div>
  );
}

function Experience() {
  return (
    <div id="experience">
      <SectionHeader title="Experience" />
      <Shell>
        {experiences.map((exp, i) => (
          <ScrollReveal key={`${exp.company}-${i}`} delay={i * 40}>
            <div className={`px-6 py-6 transition-colors duration-200 hover:bg-[var(--hover)] sm:px-8 ${i > 0 ? 'border-t border-[var(--line)]' : ''}`}>
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="text-[15.5px] font-semibold text-[var(--fg)]">
                  {exp.title} <span className="text-[var(--soft)]">·</span> <span className="text-[var(--muted)]">{exp.company}</span>
                </h3>
                <span className="font-mono text-[11px] text-[var(--soft)]">{exp.period}</span>
              </div>
              <p className="mt-0.5 font-mono text-[11px] text-[var(--soft)]">{exp.location}</p>
              <p className="mt-2 text-[13.5px] leading-relaxed text-[var(--muted)]">{exp.description}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {exp.technologies.map((tech) => (
                  <span key={tech} className="rounded-md border border-[var(--line)] bg-[var(--chip)] px-2.5 py-1 font-mono text-[11px] text-[var(--muted)]">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </ScrollReveal>
        ))}
      </Shell>
    </div>
  );
}

function Skills() {
  return (
    <div id="skills">
      <SectionHeader title="Skills" />
      <Shell className="px-6 py-5 sm:px-8">
        <div className="grid grid-cols-1 gap-x-8 gap-y-3.5 sm:grid-cols-2">
          {SKILL_CATEGORIES.map((category) => (
            <div key={category.title}>
              <h3 className="mb-1 font-mono text-[10px] font-semibold uppercase tracking-widest text-[var(--soft)]">
                {category.title}
              </h3>
              <p className="font-mono text-[11.5px] leading-relaxed text-[var(--muted)]">
                {category.items.join('  ·  ')}
              </p>
            </div>
          ))}
        </div>
      </Shell>
    </div>
  );
}

function GithubSection() {
  return (
    <div id="github">
      <SectionHeader
        title="GitHub Activity"
        aside={
          <a
            href="https://github.com/darthvader58"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 font-mono text-[11px] text-[var(--muted)] transition-colors hover:text-[var(--fg)]"
          >
            <span>@darthvader58</span>
            <ExternalLink size={12} />
          </a>
        }
      />
      <Shell className="px-6 py-6 sm:px-8">
        <DeferredMount
          className="min-h-[320px]"
          fallback={
            <div className="space-y-4" aria-hidden="true">
              <div className="h-28 animate-pulse rounded-lg bg-[var(--chip)]" />
              <div className="h-40 animate-pulse rounded-lg bg-[var(--chip)]" />
            </div>
          }
        >
          <GithubActivity />
        </DeferredMount>
      </Shell>
    </div>
  );
}

function Writing() {
  const posts = getPublishedBlogPosts().slice(0, 6);

  if (posts.length === 0) return null;

  return (
    <div id="writing">
      <SectionHeader
        title="Writing"
        aside={
          <Link href="/blog" className="flex items-center gap-1.5 font-mono text-[11px] text-[var(--muted)] transition-colors hover:text-[var(--fg)]">
            All posts
            <ArrowRight size={12} />
          </Link>
        }
      />
      <Shell className="px-6 py-6 sm:px-8">
        <div className="scrollbar-hide -mx-4 overflow-x-auto px-4 pb-2 snap-x snap-mandatory">
          <div className="flex gap-4" style={{ width: 'max-content' }}>
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group block w-[280px] flex-shrink-0 snap-center rounded-xl border border-[var(--line)] bg-[var(--card)] p-5 transition-colors hover:border-[var(--soft)]"
              >
                <div className="mb-2 flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-[var(--soft)]">
                  <span className="text-purple-400">{post.category}</span>
                  <span>·</span>
                  <time>{formatBlogDate(post.publishedAt, 'short')}</time>
                </div>
                <h3 className="mb-2 font-serif text-lg leading-snug text-[var(--fg)] transition-colors group-hover:text-purple-400">
                  {post.title}
                </h3>
                <p className="line-clamp-3 text-[13px] leading-relaxed text-[var(--muted)]">
                  {post.excerpt}
                </p>
                <p className="mt-3 font-mono text-[10px] text-[var(--soft)]">{post.readTime}</p>
              </Link>
            ))}
          </div>
        </div>
      </Shell>
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="fade">
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Writing />
      <Skills />
      <GithubSection />
      <Contact />
    </div>
  );
}
