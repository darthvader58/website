import ProjectCard from '../components/ProjectCard'

export default function ProjectsPage() {
  const projects = [
    // Top projects with custom previews
    {
      title: "WoofCare",
      description: "Social network connecting dog owners, shelters, and veterinarians across India. Real-time chat and location-based services.",
      technologies: ["Flutter", "Firebase", "Python", "Google Maps API"],
      github: "https://github.com/Woofcare/WoofCare",
      previewImage: "/images/WoofCarePreview.png"
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
      description: "Esoteric programming language interpreter with unique syntax and semantics.",
      technologies: ["Ruby", "Compiler Design", "HTML/CSS", "Puma"],
      github: "https://github.com/darthvader58/knockscript",
      link: "https://knockscript.up.railway.app",
      previewImage: "/images/knockscript.png",
      hasLivePreview: true
    },
    {
      title: "BrainDevils",
      description: "FMS skills assessment web application for sports training.",
      technologies: ["HTML", "CSS", "JavaScript"],
      github: "https://github.com/darthvader58/braindevils",
      link: "https://braindevils.vercel.app",
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
      title: "WoofCare Website",
      description: "Marketing and information website for WoofCare platform with modern design and animations.",
      technologies: ["Astro", "TypeScript", "Tailwind CSS"],
      github: "https://github.com/darthvader58/woofCare-website",
      link: "https://woofcare-website.vercel.app",
      hasLivePreview: true
    },
    {
      title: "Portfolio",
      description: "Portfolio website built with Next.js featuring interactive circuit background and dark mode.",
      technologies: ["Next.js", "Tailwind CSS", "PostGreSQL", "Vercel", "Resend"],
      github: "https://github.com/darthvader58/website",
      link: "https://shashwatraj.vercel.app",
      hasLivePreview: true
    },
    {
      title: "Kavvy",
      description: "AI-powered platform matching writers with publishers using NLP and semantic analysis. PyTorch-based recommendation system.",
      technologies: ["spaCy", "Python", "PyTorch", "React", "TypeScript"],
      github: "https://github.com/darthvader58/kavvy",
      link: "https://kavvy.vercel.app",
      hasLivePreview: true
    },
    {
      title: "Makeathon",
      description: "Arduino-based autonomous maze solver robot for competition.",
      technologies: ["Arduino", "C++", "Compiler Design"],
      github: "https://github.com/cabbageAdi/makeathon",
      link: "https://makeathon.vercel.app",
      hasLivePreview: true
    },
    {
      title: "LinkedIn Queens Puzzle",
      description: "Solution to LinkedIn Queens puzzle using algorithmic optimization.",
      technologies: ["C/C++", "Algorithms"],
      github: "https://github.com/darthvader58/linkedin_queens_solution",
      previewImage: "https://media.licdn.com/dms/image/v2/D4D12AQFk-R2ExSs9kA/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1733755511762?e=2147483647&v=beta&t=B8_G41xkH-b8Upz-YM7gE9fwBsf7UIv6ulCm_iG3HUA"
    },
    {
      title: "Anagnor",
      description: "Landslide detection system using computer vision and satellite imagery analysis.",
      technologies: ["Python", "Pytorch", "GISTEMP 4.0 Data", "NetCDF4"],
      github: "https://github.com/darthvader58/Anagnor",
      previewImage: "/images/Anagnor.png"
    },
    // Other projects with live previews
    {
      title: "pip --race",
      description: "F1 race strategy optimization system using machine learning. Real-time analysis with Redis caching and ONNX model deployment.",
      technologies: ["Express", "React", "Python", "Rust", "Redis", "Docker", "ONNX"],
      github: "https://github.com/darthvader58/pip--race",
      link: "https://pip-race.vercel.app",
      hasLivePreview: true
    },
    
    // Software projects without previews
    {
      title: "Tansen",
      description: "AI music transcription system converting audio to musical notation using deep learning models.",
      technologies: ["Flutter", "FastAPI", "PyTorch", "Huggingface", "Firebase"],
      github: "https://github.com/darthvader58/Tansen"
    },
    {
      title: "kcavo",
      description: "Kubernetes cost analyzer and optimizer for cloud infrastructure management.",
      technologies: ["Go", "Kubernetes", "kubectl"],
      github: "https://github.com/darthvader58/kcavo"
    },
    {
      title: "Research at CoDe Lab",
      description: "Optimizing Earth Science Observations: Developing Reinforcement Learning Techniques for Autonomously Determining Priority Observations in a Dynamic Environment",
      technologies: ["Python", "PyTorch", "GeoPandas", "TAT-C", "RL", "Celestrak", "NASA G5NR", "WMO Oscar"],
      github: "https://github.com/darthvader58/Code-Lab_RL_PriorityObs",
      previewImage: "/images/research.png"
    },
    {
      title: "Lua Interpreter",
      description: "Lua programming language interpreter written in Go.",
      technologies: ["Go", "Compiler Design"],
      github: "https://github.com/darthvader58/lua-interpreter"
    },
    {
      title: "Garud - Crop Disease Classifier",
      description: "Crop disease classification using deep learning. Achieved 89.23% accuracy on agricultural dataset.",
      technologies: ["Keras", "Tensorflow", "Python", "OpenCV"],
      github: "https://github.com/darthvader58/garud"
    },
    {
      title: "GameOfLife",
      description: "Conway's Game of Life implementation on toroidal plane with iOS native interface.",
      technologies: ["Swift", "Metal", "SwiftUI"],
      github: "https://github.com/darthvader58/GameOfLife"
    },
    {
      title: "N-Body Simulator",
      description: "Gravitational physics simulation with multiple body interactions and visualization.",
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
    {
      title: "Peer-Faculty Interaction",
      description: "Educational platform for student-faculty communication built for CSE 360 project.",
      technologies: ["Java", "JavaFX", "SQLite"],
      github: "https://github.com/darthvader58/Peer-Faculty-Interaction-EdTech",
      
    },
    {
      title: "Terrader",
      description: "Terrader is a web based game in the form of a crypto-trading simulator that functions with respect to a carbon footprint, carbon score and strategic gameplay; and has other interesting side-features to increase awareness among the players on how a fruitful and trending practice has an unnoticed contribution to climate change.",
      technologies: ["React", "Python", "OpenAI GPT"],
      github: "https://github.com/theVedanta/terrader"
    },

    // Hardware and embedded projects
    {
      title: "Embedded Robotics",
      description: "FRDM-KL46Z autonomous robot with PID control and I2C sensor integration.",
      technologies: ["C", "Embedded Systems", "PID Control", "I2C"],
      previewImage: "/images/Embedded.png"
    },
    {
      title: "FPGA Projects",
      description: "Alarm clock and audio recorder implementations on FPGA hardware.",
      technologies: ["Verilog", "SystemVerilog", "Vivado", "Quartus Prime"]
    },
    {
      title: "Coconut CubeSat",
      description: "CubeSat satellite project for NASA CSLI Launch 2024. Flight software development.",
      technologies: ["Linux", "KiCad", "CUDA", "ROS", "Gazebo"],
      previewImage: "https://www.bluecanyontech.com/wp-content/uploads/spacecraft-model-12u.png"
    },
    {
      title: "Micromouse",
      description: "Autonomous maze-solving robot using Dijkstra's algorithm and PID control.",
      technologies: ["Embedded C", "MIT App Inventor", "Dijkstra", "PID"],
      previewImage: "/images/micromouse.png"
    }
  ]

  return (
    <section className="fade">
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-5xl">
          Projects
        </h1>
        <div className="flex items-center gap-3">
          <a
            href="/opensource"
            className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium rounded-md transition-colors duration-200"
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
            className="inline-flex items-center gap-2 px-4 py-2 bg-pink-600 hover:bg-pink-700 text-white text-sm font-medium rounded-md transition-colors duration-200"
          >
            <svg className="w-4 h-4" viewBox="0 0 16 16" fill="currentColor">
              <path d="M4.25 2.5c-1.336 0-2.75 1.164-2.75 3 0 2.15 1.58 4.144 3.365 5.682A20.565 20.565 0 008 13.393a20.561 20.561 0 003.135-2.211C12.92 9.644 14.5 7.65 14.5 5.5c0-1.836-1.414-3-2.75-3-1.373 0-2.609.986-3.029 2.456a.75.75 0 01-1.442 0C6.859 3.486 5.623 2.5 4.25 2.5zM8 14.25l-.345.666-.002-.001-.006-.003-.018-.01a7.643 7.643 0 01-.31-.17 22.075 22.075 0 01-3.434-2.414C2.045 10.731 0 8.35 0 5.5 0 2.836 2.086 1 4.25 1 5.797 1 7.153 1.802 8 3.02 8.847 1.802 10.203 1 11.75 1 13.914 1 16 2.836 16 5.5c0 2.85-2.045 5.231-3.885 6.818a22.08 22.08 0 01-3.744 2.584l-.018.01-.006.003h-.002L8 14.25zm0 0l.345.666a.752.752 0 01-.69 0L8 14.25z"/>
            </svg>
            Sponsor
          </a>
        </div>
      </div>
      <p className="text-slate-600 dark:text-slate-400 text-lg mb-12">
        A collection of my personal projects, open-source contributions, and academic work spanning web development, machine learning, embedded systems, and robotics.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project, index) => (
          <ProjectCard key={index} {...project} />
        ))}
      </div>
    </section>
  )
}