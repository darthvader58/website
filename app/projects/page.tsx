export const metadata = {
  title: 'Projects',
  description: 'My technical projects and side work.',
}

interface Project {
  name: string
  description: string
  technologies: string[]
  github?: string
  link?: string
  period?: string
}

const projects: Project[] = [
  {
    name: 'pip --race',
    description: 'A real-time Formula 1 race strategy system combining pit stop probability prediction and optimal pit window timing to deliver a live frontend dashboard for real-time race strategy buildup with lowest possible latency.',
    technologies: ['React.js', 'Python', 'Rust', 'Redis', 'Docker', 'Express.js', 'ONNX Runtime'],
    github: 'https://github.com/darthvader58/pip_--race',
    link: 'https://pip-race.vercel.app',
    period: 'October 2025'
  },

  {
    name: 'Tansen',
    description: 'A web app where musicians instantly get lessons and notes for any music piece and any known instrument through music transcription & AI suggestions via Onsets & Frames, Demucs and Basic Pitch, trained over 20000+ MP3 & MIDI files.',
    technologies: ['Flutter', 'FastAPI', 'PyTorch', 'Huggingface', 'Tensorflow', 'Transformers'],
    github: 'https://github.com/darthvader58/tansen',
    period: 'Present',
  },
  {
    name: 'Kavvy',
    description: 'An online platform that connects writers to traditional publishers. Curated a data consisting of 626 publishing houses in the US and 17942 published authors to find trends that can best fit a budding writer match the suitable publishing house.',
    technologies: ['spaCy', 'Python', 'OpenAI Web Search', 'PyTorch', 'React Typescript'],
    link: 'https://kavvy.vercel.app',
    period: 'Present',
  },
  {
    name: 'Formath',
    description: 'A web app that analyzes step-by-step math solutions from uploaded images, identifies errors, and provides feedback. Integrates Mathpix for LaTex conversion, WolframAlpha for analysis, and Imgur API for OCR, ChatGPT for feedback.',
    technologies: ['React.js', 'Node.js', 'Express.js', 'Figma', 'CockroachDB', 'AWS'],
    link: 'https://devpost.com/software/formath',
    period: 'October 2023',
  },
  {
    name: 'Whatrobe',
    description: 'A web app that gives outfit recommendations and try-ons for your entire wardrobe using Ximilar Fashion Tagging model and Anthropic for generating trending fashion suggestions based on occasions.',
    technologies: ['Next.js', 'MongoDB', 'Anthropic', 'REST', 'OpenCV'],
    github: 'https://github.com/darthvader58/whatrobe',
    period: 'November 2023',
  },
  {
    name: 'Embedded Robotics',
    description: 'Used the FRDM-KL46Z NXP microprocessor board with C to control a robot, to move in a figure-eight pattern, follow a line, avoid obstacles, and navigate through a colored maze, after configuring GPIO registors, interrupts, encoders and utilizing components\' datasheets, PID tuning and I2C communication.',
    technologies: ['Low-level C', 'Embedded Systems', 'Microprocessor Systems'],
    period: 'Present',
  },
  {
    name: 'FPGA Alarm Clock and Audio Recorder',
    description: 'Developed a real-time alarm clock using Intel Quartus Lite and deployed the program to the Intel DE10-Lite FPGA board. Also developed an audio recorder that records and plays back up to eight seconds of audio in SystemVerilog in the Nexys A7-100 FPGA board via Xilinx Vivado.',
    technologies: ['Verilog', 'SystemVerilog', 'Modelsim', 'Vivado', 'Quartus Prime'],
    period: 'Present',
  },
  {
    name: 'Crop Disease Classifier',
    description: 'A CNN based model built using Keras and Tensorflow for crop disease detection from a UAS. The 2D-CNN model uses 4 hidden layers using ReLu activation function with the output layer using Softmax function, achieving 89.23% accuracy.',
    technologies: ['Keras', 'Tensorflow', 'Matplotlib', 'Numpy', 'OpenCV'],
    github: 'https://github.com/darthvader58/garud',
    period: 'March 2021',
  },
  {
    name: 'Coconut CubeSat',
    description: 'Part of the team developing a Cubesat for NASA CSLI Launch 2024, establishing communication network between LoRa devices for greater coverage, range and penetration without current orbital store-and-forward methods.',
    technologies: ['Linux', 'KiCad', 'CUDA', 'ROS', 'Gazebo', 'GPU'],
    period: 'June 2023',
  },
  {
    name: 'Micromouse',
    description: 'Built an autonomous wall-maze and line-maze solving robot using Teensy, TB6612FNG motor driver, Polulu QTR, HCSR04 Ultrasonic Sensors, N20 motors and Power Distribution Circuit, connected via Bluetooth to a mobile app to calibrate PID values and switch between manual-to-autonomous drive as well as line-maze to wall-maze settings.',
    technologies: ['Embedded C', 'MIT App Inventor', 'Dijkstra', 'PID tuning'],
    period: 'August 2019',
  },
]

export default function Projects() {
  return (
    <section>
      <h1 className="font-semibold text-2xl mb-8 tracking-tighter">Projects</h1>
      <div className="space-y-6">
        {projects.map((project, index) => (
          <div key={index} className="border-b border-neutral-200 dark:border-neutral-800 pb-6">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h2 className="font-semibold text-lg tracking-tight">{project.name}</h2>
                {project.period && (
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">{project.period}</p>
                )}
              </div>
              <div className="flex space-x-2">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
                  >
                    github →
                  </a>
                )}
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
                  >
                    view →
                  </a>
                )}
              </div>
            </div>
            <p className="text-neutral-700 dark:text-neutral-300 mb-3 text-sm leading-relaxed">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, i) => (
                <span
                  key={i}
                  className="text-xs px-2 py-1 bg-neutral-100 dark:bg-neutral-800 rounded text-neutral-700 dark:text-neutral-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}