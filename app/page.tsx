'use client';

import { useState, useEffect } from 'react';
import PhotoGallery from './components/PhotoGallery';
import SpotifyNowPlaying from './components/SpotifyNowPlaying';
import ScrollReveal from './components/ScrollReveal';
import ProjectCard from './components/ProjectCard';

const SpotifyIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.299.421-1.02.599-1.559.3z"/>
  </svg>
);

export default function HomePage() {
  const [showGreeting, setShowGreeting] = useState(false);

  useEffect(() => {
    // Show greeting after a brief delay
    const showTimer = setTimeout(() => {
      setShowGreeting(true);
    }, 500);

    // Hide greeting after 2.5 seconds
    const hideTimer = setTimeout(() => {
      setShowGreeting(false);
    }, 3000);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  return (
    <div className="fade">
      {/* HOME SECTION */}
      <section id="home" className="min-h-screen pb-32">
      <h1 className="mb-2 text-4xl font-bold tracking-tight text-slate-100 sm:text-5xl">
        <img src="https://raw.githubusercontent.com/TheDudeThatCode/TheDudeThatCode/master/Assets/Hi.gif" alt="Hi" className="inline-block align-middle w-12 h-12 mr-2"/> Hey, I'm Shashwat Raj
      </h1>
      
      {/* Animated greeting */}
      <div 
        className={`mb-6 text-xl text-purple-400 font-medium transition-all duration-1500 ${
          showGreeting 
            ? 'opacity-100 translate-x-0' 
            : 'opacity-0 translate-x-8'
        }`}
      >
        How you doin' ?! 
      </div>
      
      <ScrollReveal delay={100}>
        <div className="relative mb-8 inline-block w-full group" style={{ maxWidth: '215px' }}>
          <div className="absolute left-1 top-1 w-full h-full bg-slate-700/30 rounded-sm shadow-md transition-transform duration-500 group-hover:rotate-2" style={{ transform: 'translateX(-3px)' }}></div>
          <div className="absolute left-0.5 top-0.5 w-full h-full bg-slate-600/20 rounded-sm shadow-md transition-transform duration-500 group-hover:rotate-1" style={{ transform: 'translateX(-1.5px)' }}></div>
          
          <div className="relative bg-gradient-to-br from-slate-100 to-slate-50 p-2 shadow-2xl border-l-4 border-slate-800/20 transition-transform duration-500 group-hover:rotate-3 group-hover:scale-105">
            <img 
              src="/images/Myself.png" 
              alt="Shashwat Raj" 
              className="block w-full h-auto opacity-0 animate-fadeInSlow"
              style={{ animationFillMode: 'forwards' }}
            />
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/10 to-slate-200/20 pointer-events-none"></div>
            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-r from-slate-300/50 to-transparent"></div>
          </div>
        </div>
      </ScrollReveal>
      
      <ScrollReveal delay={200}>
        <div className="prose prose-invert max-w-none">
          <p className="text-slate-300 text-lg leading-relaxed mb-6">
            I'm a junior at Arizona State University majoring in Computer Systems Engineering and Math, with a passion for building innovative solutions at the intersection of hardware and software. 
          </p>

          <p className="text-slate-400 leading-relaxed mb-6">
            I'm passionate about robotics, machine learning, and software development. Currently, I'm working as a Machine Learning Developer and Researcher at the Collective Design (CoDe) lab at ASU, where I'm developing Reinforcement Learning techniques to optimize Earth science missions for autonomous priority observations in space. </p>
          <p className="text-slate-400 leading-relaxed mb-6">I'm also the Founder & CEO of <span className="font-medium">WoofCare Solutions</span>, a mobile app connecting dog lovers and care services to improve the lives of stray dogs in India. This project is funded by EPICS (Engineering Projects In Community Service) at ASU and partners with over 60+ NGOs.</p>
        </div>
      </ScrollReveal>
      
      <ScrollReveal delay={300}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
          <div className="border border-slate-800 rounded-lg p-6 bg-slate-950/30 transition-all duration-300 hover:border-purple-700/50 hover:shadow-lg hover:shadow-purple-900/20">
            <h3 className="text-lg font-semibold text-purple-400 mb-2">Education</h3>
            <p className="text-slate-300 font-medium">Arizona State University</p>
            <p className="text-slate-400 text-sm">BSE Computer Science & Engineering</p>
            <p className="text-slate-400 text-sm">BS Mathematics</p>
            <p className="text-slate-500 text-sm">GPA: 3.78/4.0</p>
          </div>

          <div className="border border-slate-800 rounded-lg p-6 bg-slate-950/30 transition-all duration-300 hover:border-purple-700/50 hover:shadow-lg hover:shadow-purple-900/20">
            <h3 className="text-lg font-semibold text-purple-400 mb-2">Interests</h3>
            <p className="text-slate-400 text-sm">AI, Machine Learning and GPU Programming</p>
            <p className="text-slate-400 text-sm">Full-Stack Development</p>
            <p className="text-slate-400 text-sm">Embedded Systems, IoT & Robotics</p>
            <p className="text-slate-400 text-sm">Operating Systems</p>
          </div>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={100}>
        <div className="prose prose-invert max-w-none">
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
          <p></p>
          <p className="text-slate-400 leading-relaxed mb-6">When I'm not coding or researching, you can find me playing the flute, working on Battlebots, boxing, creating digital art, or hosting my podcast <a className="inline-flex items-center transition-all hover:text-purple-400" rel="noopener noreferrer" target="_blank" href="https://open.spotify.com/show/3hOrhL4KTN4vRYUcfstmyy?si=824fd957830546dc"><SpotifyIcon /><span className="ml-2">"Write It Out"</span></a></p>
          <p className="text-slate-400 leading-relaxed mb-8">I love travelling!</p>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={200}>
        <PhotoGallery />
      </ScrollReveal>

      <ScrollReveal delay={300}>
        <SpotifyNowPlaying />
      </ScrollReveal>
      </section>

      {/* EXPERIENCE SECTION */}
      <section id="experience" className="min-h-screen py-32">
        <ScrollReveal>
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-slate-100 sm:text-5xl">
            Experience
          </h1>
          <p className="text-slate-400 text-lg mb-16">
            My professional journey in research, development, and robotics.
          </p>
        </ScrollReveal>

        <div className="relative">
          <div className="absolute left-0 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-purple-500 via-purple-700 to-transparent"></div>

          <div className="space-y-12">
            {[
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
            ].map((exp, index) => (
              <ScrollReveal key={index} delay={index * 100}>
                <div className="relative pl-8 md:pl-20 group">
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

      {/* PROJECTS SECTION */}
      <section id="projects" className="min-h-screen py-32">
        <ScrollReveal>
          <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
            <h1 className="text-4xl font-bold tracking-tight text-slate-100 sm:text-5xl">
              Projects
            </h1>
            <div className="flex items-center gap-3">
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
          </div>
          <p className="text-slate-400 text-lg mb-12">
            A collection of my personal projects, open-source contributions, and academic work spanning web development, machine learning, embedded systems, and robotics.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
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
              description: "Toy programming language based on Knock Knock jokes.",
              technologies: ["Ruby", "Compiler Design", "HTML/CSS", "Puma"],
              github: "https://github.com/darthvader58/knockscript",
              link: "https://knockscript.up.railway.app",
              previewImage: "/images/knockscript.png",
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
              title: "BrainDevils",
              description: "Web-app with games that enhance your fine motor skills",
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
            }
          ].map((project, index) => (
            <ScrollReveal key={index} delay={index * 50}>
              <ProjectCard {...project} />
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* RESUME SECTION */}
      <section id="resume" className="min-h-screen py-32">
        <ScrollReveal>
          <h1 className="mb-8 text-4xl font-bold tracking-tight text-slate-100 sm:text-5xl">
            Resume
          </h1>
          <p className="text-slate-400 text-lg mb-12">
            Download my resume tailored for different roles and focus areas.
          </p>
        </ScrollReveal>

        <div className="grid gap-6">
          {[
            {
              title: "Machine Learning / AI Focus",
              description: "Highlights research experience, ML projects, and deep learning expertise.",
              filename: "Final_Resume_Shashwat_Raj_ML.pdf",
              color: "from-blue-900/40 to-purple-900/40"
            },
            {
              title: "Software Development Focus",
              description: "Emphasizes full-stack development, web applications, and software engineering skills.",
              filename: "Final_Resume_Shashwat_Raj_Dev.pdf",
              color: "from-green-900/40 to-emerald-900/40"
            },
            {
              title: "Hardware / Embedded Systems Focus",
              description: "Showcases embedded systems, robotics, and hardware projects.",
              filename: "Final_Resume_Shashwat_Raj_Hardware.pdf",
              color: "from-orange-900/40 to-red-900/40"
            }
          ].map((resume, index) => (
            <ScrollReveal key={index} delay={index * 150}>
              <div className={`border border-slate-800 rounded-lg p-8 bg-gradient-to-br ${resume.color} hover:border-purple-700/50 hover:shadow-lg hover:shadow-purple-900/20 transition-all duration-300 hover:scale-[1.02]`}>
                <h3 className="text-2xl font-semibold text-slate-100 mb-3">{resume.title}</h3>
                <p className="text-slate-300 mb-6">{resume.description}</p>
                <a
                  href={`/${resume.filename}`}
                  download
                  className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-all duration-200 hover:scale-105"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Download PDF
                </a>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={450}>
          <div className="mt-12 border border-slate-800 rounded-lg p-6 bg-slate-950/30 hover:border-purple-700/50 transition-all duration-300">
            <h3 className="text-xl font-semibold text-slate-100 mb-4">Skills Overview</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-purple-400 font-medium mb-2">Programming Languages</h4>
                <p className="text-slate-400 text-sm">Python, C, C++, Java, JavaScript, TypeScript, Swift, Rust, Go, Ruby</p>
              </div>
              <div>
                <h4 className="text-purple-400 font-medium mb-2">Frameworks & Libraries</h4>
                <p className="text-slate-400 text-sm">React, Next.js, Flutter, PyTorch, TensorFlow, FastAPI, Node.js</p>
              </div>
              <div>
                <h4 className="text-purple-400 font-medium mb-2">Tools & Platforms</h4>
                <p className="text-slate-400 text-sm">Git, Docker, Firebase, AWS, Vercel, MongoDB, PostgreSQL</p>
              </div>
              <div>
                <h4 className="text-purple-400 font-medium mb-2">Embedded Systems</h4>
                <p className="text-slate-400 text-sm">Arduino, FRDM-KL46Z, I2C, PID Control, Verilog, FPGA</p>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* COFFEE/CONTACT SECTION */}
      <section id="coffee" className="min-h-screen py-32">
        <ScrollReveal>
          <div className="relative mb-12">
            <div className="absolute -top-8 -left-8 w-40 h-40 opacity-10">
              <svg viewBox="0 0 100 100" className="text-amber-700">
                <ellipse cx="50" cy="50" rx="25" ry="35" fill="currentColor"/>
                <path d="M 30 30 Q 35 20, 40 30" stroke="currentColor" fill="none" strokeWidth="2"/>
                <path d="M 60 30 Q 65 20, 70 30" stroke="currentColor" fill="none" strokeWidth="2"/>
              </svg>
            </div>
            
            <div className="flex items-center justify-between mb-4 flex-wrap gap-4">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl bg-gradient-to-r from-amber-200 via-orange-300 to-amber-200 bg-clip-text text-transparent">
                Let's Connect Over Coffee
              </h1>
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
            <p className="text-slate-400 text-lg">
              I'd love to hear from you. Whether it's a project, opportunity, or just a chat about tech.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={150}>
          <div className="grid gap-6 mb-12">
            <div className="relative border border-amber-900/30 rounded-lg p-8 bg-gradient-to-br from-amber-950/40 via-orange-950/30 to-yellow-950/40 overflow-hidden hover:border-amber-700/50 transition-all duration-300 hover:scale-[1.02]">
              <div className="absolute top-4 right-4 w-12 h-12 opacity-20">
                <svg viewBox="0 0 100 100" className="text-amber-600 animate-pulse">
                  <rect x="35" y="20" width="30" height="50" rx="5" fill="none" stroke="currentColor" strokeWidth="2"/>
                  <path d="M 35 30 Q 50 25, 65 30" fill="none" stroke="currentColor" strokeWidth="2"/>
                  <path d="M 40 35 Q 50 32, 60 35" fill="none" stroke="currentColor" strokeWidth="2"/>
                  <ellipse cx="50" cy="75" rx="20" ry="8" fill="currentColor" opacity="0.3"/>
                </svg>
              </div>
              
              <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-yellow-900/20 blur-3xl"></div>
              <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-amber-900/20 blur-3xl"></div>
              
              <div className="relative">
                <h2 className="text-2xl font-semibold text-amber-100 mb-4 flex items-center gap-2">
                  <svg className="w-7 h-7 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.216 6.415l-.132-.666c-.119-.598-.388-1.163-1.001-1.379-.197-.069-.42-.098-.57-.241-.152-.143-.196-.366-.231-.572-.065-.378-.125-.756-.192-1.133-.057-.325-.102-.69-.25-.987-.195-.4-.597-.634-.996-.788a5.723 5.723 0 00-.626-.194c-1-.263-2.05-.36-3.077-.416a25.834 25.834 0 00-3.7.062c-.915.083-1.88.184-2.75.5-.318.116-.646.256-.888.501-.297.302-.393.77-.177 1.146.154.267.415.456.692.58.36.162.737.284 1.123.366 1.075.238 2.189.331 3.287.37 1.218.05 2.437.01 3.65-.118.299-.033.598-.073.896-.119.352-.054.578-.513.474-.834-.124-.383-.457-.531-.834-.473-.466.074-.96.108-1.382.146-1.177.08-2.358.082-3.536.006a22.228 22.228 0 01-1.157-.107c-.086-.01-.18-.025-.258-.036-.243-.036-.484-.08-.724-.13-.111-.027-.111-.185 0-.212h.005c.277-.06.557-.108.838-.147h.002c.131-.009.263-.032.394-.048a25.076 25.076 0 013.426-.12c.674.019 1.347.067 2.017.144l.228.031c.267.04.533.088.798.145.392.085.895.113 1.07.542.055.137.08.288.111.431l.319 1.484a.237.237 0 01-.199.284h-.003c-.037.006-.075.01-.112.015a36.704 36.704 0 01-4.743.295 37.059 37.059 0 01-4.699-.304c-.14-.017-.293-.042-.417-.06-.326-.048-.649-.108-.973-.161-.393-.065-.768-.032-1.123.161-.29.16-.527.404-.675.701-.154.316-.199.66-.267 1-.069.34-.176.707-.135 1.056.087.753.613 1.365 1.37 1.502a39.69 39.69 0 0011.343.376.483.483 0 01.535.53l-.071.697-1.018 9.907c-.041.41-.047.832-.125 1.237-.122.637-.553 1.028-1.182 1.171-.577.131-1.165.2-1.756.205-.656.004-1.31-.025-1.966-.022-.699.004-1.556-.06-2.095-.58-.475-.458-.54-1.174-.605-1.793l-.731-7.013-.322-3.094c-.037-.351-.286-.695-.678-.678-.336.015-.718.3-.678.679l.228 2.185.949 9.112c.147 1.344 1.174 2.068 2.446 2.272.742.12 1.503.144 2.257.156.966.016 1.942.053 2.892-.122 1.408-.258 2.465-1.198 2.616-2.657.34-3.332.683-6.663 1.024-9.995l.215-2.087a.484.484 0 01.39-.426c.402-.078.787-.212 1.074-.518.455-.488.546-1.124.385-1.766zm-1.478.772c-.145.137-.363.201-.578.233-2.416.359-4.866.54-7.308.46-1.748-.06-3.477-.254-5.207-.498-.17-.024-.353-.055-.47-.18-.22-.236-.111-.71-.054-.995.052-.26.152-.609.463-.646.484-.057 1.046.148 1.526.22.577.088 1.156.16 1.737.212 2.48.226 5.002.19 7.472-.14.45-.06.899-.13 1.345-.21.399-.072.84-.206 1.08.206.166.281.188.657.162.974a.544.544 0 01-.169.364z" />
                  </svg>
                  Buy Me a Coffee
                </h2>
                <p className="text-amber-200/80 mb-6">
                  Support my work and projects. Every coffee helps fuel late-night coding sessions and new ideas. Bonus points if you get me a Hot blonde vanilla latte, with an extra two pumps of vanilla and caramel + whipped cream from Starbucks.
                </p>
                <a
                  href="https://venmo.com/u/shash58"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-6 py-3 bg-gradient-to-r from-yellow-600 to-amber-600 hover:from-yellow-500 hover:to-amber-500 text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg shadow-amber-900/50"
                >
                  Buy Me a Coffee
                </a>
              </div>
            </div>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <ScrollReveal delay={250}>
            <div className="border border-purple-900/30 rounded-lg p-6 bg-purple-950/20 hover:border-purple-700/50 transition-all duration-300 hover:scale-[1.02]">
              <h3 className="text-xl font-semibold text-purple-300 mb-4 flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                </svg>
                Email
              </h3>
              <a href="mailto:rajayshashwat@gmail.com" className="text-slate-300 hover:text-purple-400 transition-colors flex items-center gap-2 mb-2">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"/>
                </svg>
                rajayshashwat@gmail.com
              </a>
              <a href="mailto:shash.raj@asu.edu" className="text-slate-300 hover:text-purple-400 transition-colors flex items-center gap-2">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"/>
                </svg>
                shash.raj@asu.edu
              </a>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={350}>
            <div className="border border-purple-900/30 rounded-lg p-6 bg-purple-950/20 hover:border-purple-700/50 transition-all duration-300 hover:scale-[1.02]">
              <h3 className="text-xl font-semibold text-purple-300 mb-4 flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z"/>
                  <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z"/>
                </svg>
                Social
              </h3>
              <a href="https://github.com/darthvader58" target="_blank" rel="noopener noreferrer" className="text-slate-300 hover:text-purple-400 transition-colors flex items-center gap-2 mb-2">
                <svg className="w-4 h-4" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
                </svg>
                @darthvader58
              </a>
              <a href="https://linkedin.com/in/raj-shashwat" target="_blank" rel="noopener noreferrer" className="text-slate-300 hover:text-purple-400 transition-colors flex items-center gap-2 mb-2">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                /in/raj-shashwat
              </a>
              <a href="https://instagram.com/shash._me" target="_blank" rel="noopener noreferrer" className="text-slate-300 hover:text-purple-400 transition-colors flex items-center gap-2">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                @shash._me
              </a>
            </div>
          </ScrollReveal>
        </div>

        <ScrollReveal delay={450}>
          <div className="border border-slate-800 rounded-lg p-6 bg-slate-950/30 hover:border-purple-700/50 transition-all duration-300">
            <h3 className="text-xl font-semibold text-slate-100 mb-3 flex items-center gap-2">
              See Ya!
            </h3>
            <p className="text-slate-400">
              At Tempe, Arizona • Open for work opportunities and collaborations
            </p>
          </div>
        </ScrollReveal>
      </section>
    </div>
  )
}