import Link from 'next/link'

export default function GCSPPage() {
  const competencies = [
    {
      title: "Talent",
      description: "Undergraduate research in reinforcement learning for satellite observation optimization. FURI grant recipient ($4,600).",
      link: "/gcsp/talent",
      icon: "🔬"
    },
    {
      title: "Service",
      description: "WoofCare EPICS project connecting dog owners, shelters, and veterinarians across India. Partnered with 60+ NGOs.",
      link: "/gcsp/service",
      icon: "🤝"
    },
    {
      title: "Entrepreneurship",
      description: "Tansen music transcription platform developed through FSE 301. AI-powered audio to notation conversion.",
      link: "/gcsp/entrepreneurship",
      icon: "🚀"
    },
    {
      title: "Multicultural",
      description: "Barcelona EPICS international experience (March 8-16, 2025). Global collaboration and cultural exchange.",
      link: "/gcsp/multicultural",
      icon: "🌍"
    }
  ]

  return (
    <section className="fade">
      <h1 className="mb-8 text-4xl font-bold tracking-tight text-slate-100 sm:text-5xl">
        Grand Challenge Scholars Program
      </h1>
      <p className="text-slate-400 text-lg mb-12">
        Addressing global challenges through research, service, entrepreneurship, and multicultural experiences.
      </p>

      <div className="prose prose-invert max-w-none mb-12">
        <p className="text-slate-300 leading-relaxed">
          The Grand Challenge Scholars Program at Arizona State University prepares students to tackle the world's most pressing challenges through interdisciplinary education and hands-on experience. My work focuses on advancing artificial intelligence, improving access to technology, and creating sustainable solutions.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {competencies.map((comp, index) => (
          <Link key={index} href={comp.link} className="block group">
            <div className="border border-slate-800 rounded-lg p-6 hover:border-purple-700/50 transition-all duration-300 bg-slate-950/30 h-full">
              <div className="text-4xl mb-4">{comp.icon}</div>
              <h3 className="text-2xl font-semibold text-slate-100 group-hover:text-purple-400 transition-colors mb-3">
                {comp.title}
              </h3>
              <p className="text-slate-400">
                {comp.description}
              </p>
              <div className="mt-4 flex items-center text-purple-400 group-hover:text-purple-300 transition-colors">
                <span className="text-sm">Learn more</span>
                <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}