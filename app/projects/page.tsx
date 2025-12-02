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
      title: "Metal Lab",
      description: "Advanced physics simulation platform with GPU acceleration. Interactive experiments for educational purposes.",
      technologies: ["Next.js", "Three.js", "WebGPU", "Cannon.js", "Metal Shaders", "xAI", "ElevenLabs"],
      github: "https://github.com/arpan404/metal_lab",
      previewImage: "https://d112y698adiu2z.cloudfront.net/photos/production/software_photos/003/956/281/datas/original.png"
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
      title: "KnockScript",
      description: "Esoteric programming language interpreter with unique syntax and semantics.",
      technologies: ["Ruby", "Compiler Design", "HTML/CSS", "Puma"],
      github: "https://github.com/darthvader58/knockscript",
      link: "https://knockscript.up.railway.app",
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
      title: "Makeathon",
      description: "Arduino-based autonomous maze solver robot for competition.",
      technologies: ["Arduino", "C++", "Compiler Design"],
      github: "https://github.com/cabbageAdi/makeathon",
      link: "https://makeathon.vercel.app",
      hasLivePreview: true
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
    {
      title: "BrainDevils",
      description: "FMS skills assessment web application for sports training.",
      technologies: ["HTML", "CSS", "JavaScript"],
      github: "https://github.com/darthvader58/braindevils",
      link: "https://braindevils.vercel.app",
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
      title: "Research at CoDe Lab",
      description: "Optimizing Earth Science Observations: Developing Reinforcement Learning Techniques for Autonomously Determining Priority Observations in a Dynamic Environment",
      technologies: ["Python", "PyTorch", "GeoPandas", "TAT-C", "RL", "Celestrak", "NASA G5NR", "WMO Oscar"],
      github: "https://github.com/darthvader58/Code-Lab_RL_PriorityObs",
      previewImage: "/images/research.png"
    },
    {
      title: "Whatrobe",
      description: "AI fashion recommendation system analyzing style preferences and suggesting outfits.",
      technologies: ["Next.js", "MongoDB", "Anthropic API", "OpenCV"],
      github: "https://github.com/darthvader58/whatrobe"
    },
    {
      title: "Garud",
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
      title: "kcavo",
      description: "Kubernetes cost analyzer and optimizer for cloud infrastructure management.",
      technologies: ["Go", "Kubernetes", "kubectl"],
      github: "https://github.com/darthvader58/kcavo"
    },
    {
      title: "Lua Interpreter",
      description: "Lua programming language interpreter written in Go.",
      technologies: ["Go", "Compiler Design"],
      github: "https://github.com/darthvader58/lua-interpreter"
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
      title: "Formath",
      description: "Mathematical solution analyzer with step-by-step explanations. Built for hackathon.",
      technologies: ["React", "Node.js", "Express", "CockroachDB", "AWS"],
      github: "https://github.com/darthvader58/biryani",
      link: "https://devpost.com/software/formath"
    },
    {
      title: "Peer-Faculty Interaction",
      description: "Educational platform for student-faculty communication built for CSE 360 project.",
      technologies: ["Java", "JavaFX", "SQLite"],
      github: "https://github.com/darthvader58/Peer-Faculty-Interaction-EdTech"
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
      technologies: ["C", "Embedded Systems", "PID Control", "I2C"]
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
      <h1 className="mb-8 text-4xl font-bold tracking-tight text-slate-100 sm:text-5xl">
        Projects
      </h1>
      <p className="text-slate-400 text-lg mb-12">
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