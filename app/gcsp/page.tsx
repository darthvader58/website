import Link from 'next/link'

export const metadata = {
  title: 'GCSP',
  description: 'Grand Challenge Scholars Program - Joy of Living',
}

interface Competency {
  title: string
  description: string
  icon: string
  href: string
  color: string
}

const competencies: Competency[] = [
  {
    title: 'Talent',
    description: 'Research on Reinforcement Learning techniques for autonomous satellite orientation in agile space missions for Earth Observation Systems.',
    icon: '🔬',
    href: '/gcsp/talent',
    color: 'border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950',
  },
  {
    title: 'Service Learning',
    description: 'WoofCare mobile app connecting dog lovers with care services to improve the lives of stray dogs in India.',
    icon: '🐾',
    href: '/gcsp/service',
    color: 'border-green-500 hover:bg-green-50 dark:hover:bg-green-950',
  },
  {
    title: 'Entrepreneurship',
    description: 'Tansen - helping music hobbyists learn instruments and play any song with AI-powered music transcription.',
    icon: '💼',
    href: '/gcsp/entrepreneurship',
    color: 'border-purple-500 hover:bg-purple-50 dark:hover:bg-purple-950',
  },
  {
    title: 'Multicultural',
    description: 'EPICS in Action - Barcelona, exploring cultural differences through human-centered design and international collaboration.',
    icon: '🌍',
    href: '/gcsp/multicultural',
    color: 'border-orange-500 hover:bg-orange-50 dark:hover:bg-orange-950',
  },
]

export default function GCSP() {
  return (
    <section>
      <h1 className="font-semibold text-2xl mb-4 tracking-tighter">
        Grand Challenge Scholars Program
      </h1>
      <p className="mb-2 text-neutral-700 dark:text-neutral-300">
        Theme: <span className="font-semibold">Joy of Living</span>
      </p>
      <p className="mb-8 text-neutral-700 dark:text-neutral-300">
        The Grand Challenge Scholars Program (GCSP) is a prestigious initiative that prepares students to address the world's most pressing challenges through interdisciplinary learning and hands-on experiences. My work focuses on enhancing quality of life through technological innovation and community service.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {competencies.map((competency, index) => (
          <Link
            key={index}
            href={competency.href}
            className={`block p-6 border-2 ${competency.color} rounded-lg transition-all group`}
          >
            <div className="flex items-start mb-3">
              <span className="text-4xl mr-4">{competency.icon}</span>
              <div>
                <h2 className="font-semibold text-xl tracking-tight mb-2 group-hover:text-neutral-900 dark:group-hover:text-neutral-100">
                  {competency.title}
                </h2>
              </div>
            </div>
            <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
              {competency.description}
            </p>
            <div className="mt-4 flex items-center text-sm font-medium text-neutral-600 dark:text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-neutral-100">
              Learn more
              <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-12 p-6 bg-neutral-50 dark:bg-neutral-900 rounded-lg">
        <h3 className="font-semibold text-lg mb-3">About the Theme: Joy of Living</h3>
        <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
          My GCSP portfolio centers around the theme of "Joy of Living" - using technology and innovation to improve quality of life, enhance environmental monitoring, support communities, and make the world more accessible and enjoyable for everyone. Each competency demonstrates how engineering and service can contribute to human flourishing and societal well-being.
        </p>
      </div>
    </section>
  )
}