'use client';

import { useState } from 'react'
import { Search, SlidersHorizontal } from 'lucide-react'
import ProjectCard from '../components/ProjectCard'
import ScrollReveal from '../components/ScrollReveal'

type ProjectField =
  | 'AI Agents and LLMs'
  | 'Physics'
  | 'Research'
  | 'Compilers' 
  | 'Games'
  | 'Full-Stack'
  | 'Hardware Design Synthesis'
  | 'Robotics'
  | 'Machine Learning'
  | 'Libraries and Tools'

type Project = {
  title: string
  description: string
  technologies: string[]
  field: ProjectField
  github?: string
  link?: string
  hasLivePreview?: boolean
  previewImage?: string
}

const projectFields: ProjectField[] = [
   'AI Agents and LLMs',
   'Physics',
   'Research',
   'Compilers' ,
   'Games',
   'Full-Stack',
   'Hardware Design Synthesis',
   'Robotics',
   'Machine Learning',
   'Libraries and Tools'
] 

export default function ProjectsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeField, setActiveField] = useState<ProjectField | 'All'>('All')
  const [showFieldFilters, setShowFieldFilters] = useState(false)

  const projects: Project[] = [
    // Top projects with custom previews
    {
      title: "WoofCare",
      description: "Social network connecting dog owners, shelters, and veterinarians across India. Real-time chat and location-based services.",
      technologies: ["Flutter", "Firebase", "Python", "Google Maps API"],
      field: 'Full-Stack',
      github: "https://github.com/Woofcare/WoofCare",
      previewImage: "/images/WoofCarePreview.png", 
      link: "https://woofcare-website.vercel.app"
    },
    {
      title: "Asclepius",
      description: "A privacy proxy between clinical trial staff and Cloud AI models, it strips PHI, protects billion-dollar drug IP, and preserves the fast workflow people actually want.",
      technologies: ["Pytorch", "FastAPI", "Cloud LLMs", "HIPAA Compliance", "NextJs", "Gemma 4"],
      field: 'AI Agents and LLMs',
      github: "https://github.com/shiv-arora/hackprincetons26",
      previewImage: "/images/asclepius.png"
    },
    {
      title: "Whatrobe",
      description: "AI fashion recommendation system analyzing style preferences and suggesting outfits.",
      technologies: ["Next.js", "MongoDB", "Anthropic API", "OpenCV"],
      field: 'AI Agents and LLMs',
      github: "https://github.com/darthvader58/whatrobe",
      link: "https://mywhatrobe.vercel.app",
      hasLivePreview: true
    },
    {
      title: "KnockScript",
      description: "Toy programming language based on Knock Knock jokes.",
      technologies: ["Ruby", "Compiler Design", "HTML/CSS", "Puma"],
      field: 'Compilers',
      github: "https://github.com/darthvader58/knockscript",
      link: "https://knockscript.up.railway.app",
      previewImage: "/images/knockscript.png",
      hasLivePreview: true
    },
    {
      title: "Pit Wall",
      description: "Write strategy bots that compete in physics-accurate F1 simulations.",
      technologies: ["Python", "Compiler design", "Physics Engine", "FastAPI", "Docker"],
      field: 'Physics',
      github: "https://github.com/darthvader58/phi1",
      previewImage: "/images/pitwall.png",
      link: "https://pitwall.up.railways.app",
      hasLivePreview: true
    },
    {
      title: "KaleshScript",
      description: "Toy programming language based on Delhi's street slang and memes.",
      technologies: ["Go", "Compiler Design", "Next.js"],
      field: 'Compilers',
      github: "https://github.com/darthvader58/kaleshscript",
      link: "https://kaleshscript.vercel.app",
      hasLivePreview: true
    },
    {
      title: "Twinmind-Live",
      description: "TwinMind-Live is a single-page web app that listens to your microphone, streams a rolling transcript, and surfaces three fresh, context-aware suggestions every ~30 seconds while you talk",
      technologies: ["Next", "Zustand", "Edge Runtime", "SSE Webstreams", "Groq"],
      field: 'AI Agents and LLMs',
      github: "https://github.com/darthvader58/twinmind",
      link: "https://twinmind-phi.vercel.app",
      hasLivePreview: true
    },
    {
      title: "Formath",
      description: "Mathematical solution analyzer with step-by-step explanations. Built for hackathon.",
      technologies: ["React", "Node.js", "Express", "CockroachDB", "AWS"],
      field: 'AI Agents and LLMs',
      github: "https://github.com/darthvader58/biryani",
      link: "https://formath.vercel.app",
      hasLivePreview: true
    },
    {
      title: "Metal Lab",
      description: "Advanced physics simulation platform with GPU acceleration. Interactive experiments for educational purposes.",
      technologies: ["Next.js", "Three.js", "WebGPU", "Cannon.js", "Metal Shaders", "xAI", "ElevenLabs"],
      field: 'Physics',
      github: "https://github.com/arpan404/metal_lab",
      previewImage: "https://d112y698adiu2z.cloudfront.net/photos/production/software_photos/003/956/281/datas/original.png"
    },
    {
      title: "Numericle",
      description: "Daily puzzle game. Wordle but for guessing math sequences and patterns",
      technologies: ["Typescript", "Firebase"],
      field: 'Games',
      github: "https://github.com/darthvader58/numericle",
      link: "https://numericle.space",
      previewImage: "/images/numericle.png",
      hasLivePreview: true
    },
    {
      title: "Terrader",
      description: "Terrader is a web based game in the form of a crypto-trading simulator that functions with respect to a carbon footprint, carbon score and strategic gameplay; and has other interesting side-features to increase awareness among the players on how a fruitful and trending practice has an unnoticed contribution to climate change.",
      technologies: ["React", "Python", "OpenAI GPT"],
      field: 'Games',
      github: "https://github.com/theVedanta/terrader",
      link: "https://play-terrader.vercel.app/lobby",
      hasLivePreview: true
    },
    {
      title: "BrainDevils",
      description: "Web-app with games that enhance your fine motor skills",
      technologies: ["HTML", "CSS", "JavaScript"],
      field: 'Games',
      github: "https://github.com/darthvader58/braindevils",
      link: "https://braindevils.vercel.app",
      hasLivePreview: true
    },
    {
      title: "Kavvy",
      description: "Linkedin for authors - mockup only.",
      technologies: ["spaCy", "Python", "PyTorch", "React", "TypeScript"],
      field: 'Full-Stack',
      github: "https://github.com/darthvader58/kavvy",
      link: "https://kavvy.vercel.app",
      hasLivePreview: true
    },
    {
      title: "LinkedIn Queens Puzzle",
      description: "Solution to LinkedIn Queens puzzle using backtracking and algorithmic optimization.",
      technologies: ["C/C++", "Algorithms"],
      field: 'Games',
      github: "https://github.com/darthvader58/linkedin_queens_solution",
      previewImage: "https://media.licdn.com/dms/image/v2/D4D12AQFk-R2ExSs9kA/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1733755511762?e=2147483647&v=beta&t=B8_G41xkH-b8Upz-YM7gE9fwBsf7UIv6ulCm_iG3HUA"
    },
    {
      title: "Karobar",
      description: "Chrome Extension - Job Applications Tracking tool for \"sophisticated\" applicants who want to log every submission.",
      technologies: ["Typescript", "Vue", "Chrome API", "Google Sheets API"],
      field: 'Libraries and Tools',
      github: "https://github.com/darthvader58/karobar",
      previewImage: "https://www.outsystems.com/Forge_CW/_image.aspx/Q8LvY--6WakOw9afDCuuGTrsWOMiLK5kOEJX7zRjPlI=/chrome-extension-connector-2023-01-04%2000-00-00-2025-08-13%2008-34-13"
    },
    {
      title: "Anagnor",
      description: "Landslide detection system using computer vision and satellite imagery analysis.",
      technologies: ["Python", "Pytorch", "GISTEMP 4.0 Data", "NetCDF4"],
      field: 'Machine Learning',
      github: "https://github.com/Anagnor/Anagnor",
      previewImage: "/images/Anagnor.png"
    },
    // Other projects with live previews
    {
      title: "pip --race",
      description: "F1 race strategy optimization system using machine learning. Real-time analysis with Redis caching and ONNX model deployment.",
      technologies: ["Express", "React", "Python", "Rust", "Redis", "Docker", "ONNX"],
      github: "https://github.com/darthvader58/pip--race",
      link: "https://pip-race.vercel.app",
      hasLivePreview: true,
      field: 'Libraries and Tools'
    },
    
    // Software projects without previews
    {
      title: "Tansen",
      description: "AI music transcription system converting audio to readable instrument based musical notation using deep learning models.",
      technologies: ["Flutter", "FastAPI", "PyTorch", "Huggingface", "Firebase"],
      field: 'Full-Stack',
      github: "https://github.com/darthvader58/Tansen"
    },
    {
      title: "kcavo",
      description: "Kubernetes cost analyzer and optimizer for cloud infrastructure management.",
      technologies: ["Go", "Kubernetes", "kubectl"],
      field: 'Libraries and Tools',
      github: "https://github.com/darthvader58/kcavo",
      previewImage: "/images/kcavo.png"
    },
    {
      title: "Research at CoDe Lab",
      description: "Optimizing Earth Science Observations: Developing Reinforcement Learning Techniques for Autonomously Determining Priority Observations in a Dynamic Environment",
      technologies: ["Python", "PyTorch", "GeoPandas", "TAT-C", "RL", "Celestrak", "NASA G5NR", "WMO Oscar"],
      field: 'Research',
      github: "https://github.com/darthvader58/Code-Lab_RL_PriorityObs",
      previewImage: "/images/research.png"
    },
    {
      title: "Lua Interpreter",
      description: "Lua programming language interpreter written in Go.",
      technologies: ["Go", "Compiler Design"],
      field: 'Compilers',
      github: "https://github.com/darthvader58/lua-interpreter"
    },
    {
      title: "Garud - Crop Disease Classifier",
      description: "Crop disease classification using deep learning. Achieved 89.23% accuracy on agricultural dataset.",
      technologies: ["Keras", "Tensorflow", "Python", "OpenCV"],
      field: 'Machine Learning',
      github: "https://github.com/darthvader58/garud"
    },
    {
      title: "GameOfLife",
      description: "Conway's Game of Life implementation on toroidal plane with iOS native interface.",
      technologies: ["Swift", "Metal", "SwiftUI"],
      field: 'Physics',
      github: "https://github.com/darthvader58/GameOfLife"
    },
    /*
    {
      title: "N-Body Simulator",
      description: "Gravitational physics simulation with multiple body interactions and visualization using Apple Silicon's metal shaders.",
      technologies: ["Swift", "Metal", "Physics", "Three.js"],
      github: "https://github.com/darthvader58/NBodySimulator"
    },
    {
      title: "Quant Challenge 2025",
      description: "Quantitative finance modeling and algorithmic trading strategies.",
      technologies: ["Python", "PyTorch", "Pandas", "NumPy", "Scikit-Learn"],
      github: "https://github.com/darthvader58/qc2025"
    },
    {
      title: "ML Practice",
      description: "Machine learning implementations and experiments with various algorithms.",
      technologies: ["Python", "PyTorch", "Scikit-learn", "TFLearn", "Keras"],
      github: "https://github.com/darthvader58/ML_practice"
    },
    */
    {
      title: "Peer-Faculty Interaction",
      description: "Educational platform for student-faculty communication built for ASU's CSE 360 project.",
      technologies: ["Java", "JavaFX", "SQLite"],
      field: 'Full-Stack',
      github: "https://github.com/darthvader58/Peer-Faculty-Interaction-EdTech",
      
    },

    // Hardware and embedded projects
    {
      title: "Embedded Robotics",
      description: "FRDM-KL46Z based autonomous robot projects involving PID, SPI, UART, I2C, PWM and PIT/TPM handler.",
      technologies: ["C", "Embedded Systems", "PID Control", "I2C"],
      field: 'Robotics',
      previewImage: "/images/Embedded.png"
    },
    {
      title: "Onchip Communication",
      description: "Onboard communication protocols and FPGA implementations of SPI, I2C, UART and CAN, in Verilog.",
      technologies: ["Verilog", "iVerilog", "Vivado", "NEXYS A7-100T", "Digilent Arty A7-35T"],
      field: 'Hardware Design Synthesis',
    },
    {
      title: "FPGA Implementation Mean Bean Machine",
      description: "An FPGA implementation of the famous retro game - Dr. Robotnik’s Mean Bean Machine. Programmed on NEXYS A7100T board using AMD’s Vivado, using 5 control switches, a VGA output for game screen and 7-segment display for viewing the score.",
      technologies: ["Verilog", "Vivado", "NEXYS A7-100T"],
      field: 'Hardware Design Synthesis',
    },
    {
      title: "Micromouse",
      description: "Autonomous wall maze-solving robot using Dijkstra's algorithm and PID control.",
      technologies: ["Embedded C", "MIT App Inventor", "Dijkstra", "PID"],
      field: 'Robotics',
      previewImage: "/images/micromouse.png"
    },
    {
      title: "Battlebots",
      description: "Combat robots (15-60kg) arena friendly weapons for battlebot matches.",
      technologies: ["Mechanical Design", "Electrical Systems", "Physics", "CAD"],
      field: 'Robotics',
      previewImage: "/images/battlebots.png"
    }
  ]

  const normalizedQuery = searchQuery.trim().toLowerCase()
  const filteredProjects = projects.filter((project) => {
    const matchesField = activeField === 'All' || project.field === activeField
    const searchableText = [
      project.title,
      project.description,
      project.field,
      ...project.technologies,
    ].join(' ').toLowerCase()

    return matchesField && (!normalizedQuery || searchableText.includes(normalizedQuery))
  })

  const projectSections = projectFields
    .map((field) => ({
      field,
      projects: filteredProjects.filter((project) => project.field === field),
    }))
    .filter((section) => section.projects.length > 0)

  return (
    <section className="fade">
      <ScrollReveal>
        <div className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-5xl">
            Projects
          </h1>
        </div>
        <p className="text-slate-600 dark:text-slate-400 text-lg mb-8">
          A collection of my personal projects, open-source contributions, and academic work spanning web development, machine learning, embedded systems, and robotics.
        </p>

        <div className="mb-5">
          <div className="flex flex-col gap-3 sm:flex-row">
            <label htmlFor="project-search" className="relative flex-1">
              <span className="sr-only">Search projects</span>
              <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-600 dark:text-slate-500" aria-hidden="true" />
              <input
                id="project-search"
                type="search"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search projects, technologies, or fields"
                className="w-full rounded-lg border border-slate-300 bg-white/95 py-3 pl-12 pr-4 text-sm text-slate-950 outline-none transition-colors placeholder:text-slate-500 focus:border-purple-500 dark:border-slate-700/80 dark:bg-slate-950/30 dark:text-slate-100"
              />
            </label>
            <button
              type="button"
              onClick={() => setShowFieldFilters((isOpen) => !isOpen)}
              aria-expanded={showFieldFilters}
              aria-controls="project-field-filters"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-700/80 bg-slate-950/30 px-4 py-3 text-sm font-medium text-slate-300 transition-colors hover:border-purple-500 hover:text-purple-300"
            >
              <SlidersHorizontal className="h-5 w-5" aria-hidden="true" />
              <span>{activeField === 'All' ? 'Fields' : activeField}</span>
            </button>
          </div>

          {showFieldFilters && (
            <div id="project-field-filters" className="mt-4 flex flex-wrap gap-2">
              {(['All', ...projectFields] as Array<ProjectField | 'All'>).map((field) => (
                <button
                  key={field}
                  type="button"
                  onClick={() => setActiveField(field)}
                  className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                    activeField === field
                      ? 'border-purple-500 bg-purple-600 text-white'
                      : 'border-slate-700/80 bg-slate-950/30 text-slate-400 hover:border-purple-500 hover:text-purple-300'
                  }`}
                >
                  {field}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="mb-12 flex items-center gap-3">
          <a
            href="/opensource"
            className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium rounded-md transition-all duration-200 hover:scale-105"
          >
            <svg className="w-4 h-4" viewBox="0 0 16 16" fill="currentColor">
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
            </svg>
            Open Source
          </a>
          <a
            href="https://github.com/sponsors/darthvader58"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-pink-600 hover:bg-pink-700 text-white text-sm font-medium rounded-md transition-all duration-200 hover:scale-105"
          >
            <svg className="w-4 h-4" viewBox="0 0 16 16" fill="currentColor">
              <path d="M4.25 2.5c-1.336 0-2.75 1.164-2.75 3 0 2.15 1.58 4.144 3.365 5.682A20.565 20.565 0 008 13.393a20.561 20.561 0 003.135-2.211C12.92 9.644 14.5 7.65 14.5 5.5c0-1.836-1.414-3-2.75-3-1.373 0-2.609.986-3.029 2.456a.75.75 0 01-1.442 0C6.859 3.486 5.623 2.5 4.25 2.5zM8 14.25l-.345.666-.002-.001-.006-.003-.018-.01a7.643 7.643 0 01-.31-.17 22.075 22.075 0 01-3.434-2.414C2.045 10.731 0 8.35 0 5.5 0 2.836 2.086 1 4.25 1 5.797 1 7.153 1.802 8 3.02 8.847 1.802 10.203 1 11.75 1 13.914 1 16 2.836 16 5.5c0 2.85-2.045 5.231-3.885 6.818a22.08 22.08 0 01-3.744 2.584l-.018.01-.006.003h-.002L8 14.25zm0 0l.345.666a.752.752 0 01-.69 0L8 14.25z"/>
            </svg>
            Sponsor
          </a>
        </div>
      </ScrollReveal>

      {projectSections.length > 0 ? (
        <div className="space-y-16">
          {projectSections.map((section) => (
            <ScrollReveal key={section.field}>
              <section aria-labelledby={`${section.field.toLowerCase().replace(/\s+/g, '-')}-projects`}>
                <div className="mb-6 flex items-end justify-between gap-4 border-b border-slate-800/80 pb-3">
                  <div>
                    <h2
                      id={`${section.field.toLowerCase().replace(/\s+/g, '-')}-projects`}
                      className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-100"
                    >
                      {section.field}
                    </h2>
                    <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                      {section.projects.length} {section.projects.length === 1 ? 'project' : 'projects'}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {section.projects.map((project) => (
                    <div key={project.title}>
                      <ProjectCard {...project} />
                    </div>
                  ))}
                </div>
              </section>
            </ScrollReveal>
          ))}
        </div>
      ) : (
        <div className="rounded-lg border border-slate-800 bg-slate-950/30 p-8 text-center text-slate-400">
          No projects match your search.
        </div>
      )}
    </section>
  )
}
