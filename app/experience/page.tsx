'use client';

import ScrollReveal from '../components/ScrollReveal';

export default function ExperiencePage() {
  const experiences = [
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
      title: "Applied AI and Cryptography Intern",
      company: "Scientific Analysis Group (SAG), DRDO",
      period: "July 2025",
      location: "Delhi, India",
      description: "Worked under Dr. Shantanu and Dr. Girish in the ML & Cryptography Lab on a distinguisher model using ensemble learning, involving RNN, LSTM and Encoder-based Transformer model-architecture to classify random text and encrypted text in AES in CBC mode, achieving 74% precision.",
      technologies: ["Python", "spaCy", "PyTorch", "RNN", "Transformers", "LSTMs"]
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
  ]

  return (
    <section className="fade">
      <ScrollReveal>
        <h1 className="mb-4 text-4xl font-bold tracking-tight text-slate-100 sm:text-5xl">
          Experience
        </h1>
        <p className="text-slate-400 text-lg mb-16">
          My professional journey in research, development, and robotics.
        </p>
      </ScrollReveal>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-0 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-purple-500 via-purple-700 to-transparent"></div>

        <div className="space-y-12">
          {experiences.map((exp, index) => (
            <ScrollReveal key={index} delay={index * 100}>
              <div className="relative pl-8 md:pl-20 group">
                {/* Timeline dot */}
                <div className="absolute left-0 md:left-8 top-2 w-3 h-3 -translate-x-[5px] rounded-full bg-purple-500 ring-4 ring-slate-950 group-hover:ring-purple-900/30 group-hover:scale-125 transition-all duration-300"></div>
                
                <div className="border-l-2 border-transparent hover:border-purple-700/50 pl-6 transition-all duration-300">
                  <div className="mb-3">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-2">
                      <div>
                        <h3 className="text-xl font-semibold text-slate-100 group-hover:text-purple-400 transition-colors">
                          {exp.title}
                        </h3>
                        <p className="text-purple-400 font-medium">{exp.company}</p>
                      </div>
                      <div className="text-slate-400 text-sm md:text-right">
                        <p className="font-medium">{exp.period}</p>
                        <p className="text-slate-500">{exp.location}</p>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-slate-300 leading-relaxed mb-4">
                    {exp.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech, i) => (
                      <span 
                        key={i} 
                        className="text-xs px-3 py-1 rounded-full bg-purple-950/30 text-purple-300 border border-purple-900/30 hover:border-purple-700/50 hover:bg-purple-950/50 transition-all duration-200"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
