export default function MulticulturalPage() {
  return (
    <section className="fade">
      <h1 className="mb-8 text-4xl font-bold tracking-tight text-slate-100 sm:text-5xl">
        Multicultural - Barcelona EPICS
      </h1>
      <p className="text-slate-400 text-lg mb-12">
        International collaboration and cultural exchange in Barcelona, Spain.
      </p>

      <div className="prose prose-invert max-w-none">
        <div className="border border-slate-800 rounded-lg p-6 bg-slate-950/30 mb-8">
          <h2 className="text-2xl font-semibold text-purple-400 mb-4">Barcelona Experience</h2>
          <p className="text-slate-300 mb-4">
            As part of the EPICS program, I'll be traveling to Barcelona, Spain for an international collaboration experience. This opportunity allows me to work with students from different cultural backgrounds on engineering projects that address global challenges.
          </p>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-purple-400 font-medium">Dates:</span>
              <span className="text-slate-400 ml-2">March 8-16, 2025</span>
            </div>
            <div>
              <span className="text-purple-400 font-medium">Location:</span>
              <span className="text-slate-400 ml-2">Barcelona, Spain</span>
            </div>
            <div>
              <span className="text-purple-400 font-medium">Program:</span>
              <span className="text-slate-400 ml-2">EPICS International</span>
            </div>
            <div>
              <span className="text-purple-400 font-medium">Duration:</span>
              <span className="text-slate-400 ml-2">9 days</span>
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-semibold text-slate-100 mb-4">Program Objectives</h2>
        <p className="text-slate-300 leading-relaxed mb-6">
          The Barcelona EPICS experience focuses on cross-cultural collaboration, global problem-solving, and understanding how engineering solutions must adapt to different cultural and regional contexts. I'll be working alongside students from European universities on projects that address local community needs.
        </p>

        <h3 className="text-xl font-semibold text-slate-100 mb-3">Learning Goals</h3>
        <ul className="space-y-3 mb-6">
          <li className="text-slate-300">Collaborate with international teams on engineering projects</li>
          <li className="text-slate-300">Understand cultural differences in engineering practices</li>
          <li className="text-slate-300">Develop global perspective on technology and innovation</li>
          <li className="text-slate-300">Build international professional network</li>
          <li className="text-slate-300">Experience European approaches to sustainability and technology</li>
        </ul>

        <h3 className="text-xl font-semibold text-slate-100 mb-3">Cultural Immersion</h3>
        <p className="text-slate-300 leading-relaxed mb-4">
          Beyond the technical work, this experience provides an opportunity to immerse myself in Spanish culture, practice language skills, and gain firsthand understanding of how engineering education and practice differ across continents. Barcelona's rich history of innovation and architecture offers unique perspectives on design and problem-solving.
        </p>

        <h3 className="text-xl font-semibold text-slate-100 mb-3">Expected Impact</h3>
        <p className="text-slate-300 leading-relaxed">
          This multicultural experience will enhance my ability to work in diverse teams, communicate across cultural boundaries, and approach problems from multiple perspectives. These skills are essential for addressing global challenges and working in increasingly international technical fields.
        </p>
      </div>
    </section>
  )
}