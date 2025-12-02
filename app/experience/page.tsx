export default function ExperiencePage() {
  const experiences = [
    {
      title: "Founder and CEO",
      company: "WoofCare - EPICS Project",
      period: "August 2024 - Present",
      location: "Arizona State University",
      description: "Leading development of a social network platform connecting dog owners, shelters, and veterinarians across India. Managing a team to create a comprehensive solution for pet care and adoption.",
      technologies: ["Flutter", "Firebase", "Python", "Google Maps API"]
    },
    {
      title: "Machine Learning Researcher and Developer",
      company: "CoDe Lab - Satellite Observation",
      period: "January 2025 - Present",
      location: "Arizona State University",
      description: "Working on reinforcement learning approaches for optimizing satellite observation priorities. Developing ML models using PyTorch and GeoPandas for spatial-temporal analysis.",
      technologies: ["Python", "PyTorch", "GeoPandas", "TAT-C", "RL", "Celestrak", "NASA G5NR", "WMO Oscar"]
    },
    {
      title: "Product Development Manager",
      company: "MentorU",
      period: "September 2024 - December 2024",
      location: "Remote",
      description: "Developed mentorship platform features and improved user experience. Worked on full-stack development with modern web technologies.",
      technologies: ["Next.js", "Supabase"]
    },
    {
      title: "Applied AI and Cryptography Intern",
      company: "SAG DRDO",
      period: "June 2023 - August 2023",
      location: "India",
      description: "Worked on defense research projects involving signal processing and data analysis. Collaborated with senior researchers on classified projects.",
      technologies: ["Python", "MATLAB", "Signal Processing"]
    },
    {
      title: "Team Member",
      company: "Invincibles Robotics",
      period: "January 2022 - May 2023",
      location: "India",
      description: "Designed and programmed autonomous robots for competition. Worked on embedded systems programming and sensor integration.",
      technologies: ["Fusion 360", "CNC Machining", "Circuit Designing", "Physics"]
    },
    {
      title: "Electrical Subsystems Engineer",
      company: "Team Inferno",
      period: "August 2021 - December 2022",
      location: "India",
      description: "Led a team in developing technical solutions for school events and competitions. Managed project timelines and team coordination.",
      technologies: ["ROS", "Python", "Embedded Systems", "Allegro Orcad", "OpenCV"]
    },
    {
      title: "Software Developer Intern",
      company: "IIRIS",
      period: "June 2022 - August 2022",
      location: "India",
      description: "Participated in research projects focused on computer vision and machine learning applications.",
      technologies: ["Python", "MySQL", "Pandas"]
    }
  ]

  return (
    <section className="fade">
      <h1 className="mb-8 text-4xl font-bold tracking-tight text-slate-100 sm:text-5xl">
        Experience
      </h1>
      <p className="text-slate-400 text-lg mb-12">
        My professional journey in research, development, and robotics.
      </p>

      <div className="space-y-8">
        {experiences.map((exp, index) => (
          <div key={index} className="border border-slate-800 rounded-lg p-6 hover:border-purple-700/50 transition-all duration-300 bg-slate-950/30">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
              <div>
                <h3 className="text-xl font-semibold text-slate-100">{exp.title}</h3>
                <p className="text-purple-400">{exp.company}</p>
              </div>
              <div className="text-slate-400 text-sm mt-2 md:mt-0 md:text-right">
                <p>{exp.period}</p>
                <p>{exp.location}</p>
              </div>
            </div>
            <p className="text-slate-300 mb-4">{exp.description}</p>
            <div className="flex flex-wrap gap-2">
              {exp.technologies.map((tech, i) => (
                <span key={i} className="text-xs px-3 py-1 rounded-full bg-purple-950/50 text-purple-300 border border-purple-900/50">
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