'use client'

interface ContributionProps {
  name: string
  logo: string
  repo: string
  prLink?: string
  isPending?: boolean
}

function ContributionCard({ name, logo, repo, prLink, isPending }: ContributionProps) {
  const href = prLink || repo
  
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block"
    >
      <div className="border border-slate-800/50 dark:border-slate-800/50 rounded-lg p-8 hover:border-purple-700/50 transition-all duration-300 bg-white/5 dark:bg-slate-950/30 backdrop-blur-sm shadow-lg hover:shadow-xl hover:bg-white/10 dark:hover:bg-slate-950/50 h-full flex flex-col items-center justify-center gap-4">
        <div className="w-24 h-24 flex items-center justify-center">
          <img 
            src={logo} 
            alt={`${name} logo`}
            className="max-w-full max-h-full object-contain transition-transform duration-300 group-hover:scale-110"
          />
        </div>
        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 text-center group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
          {name}
        </h3>
        {isPending && (
          <span className="text-xs px-3 py-1 rounded-full bg-yellow-500/10 dark:bg-yellow-950/50 text-yellow-600 dark:text-yellow-400 border border-yellow-500/20 dark:border-yellow-900/50">
            PR Pending
          </span>
        )}
      </div>
    </a>
  )
}

export default function OpenSourcePage() {
  const contributions = [
    {
      name: "Mocha",
      logo: "https://avatars.githubusercontent.com/u/8770005?s=200&v=4",
      repo: "https://github.com/mochajs/mocha",
      prLink: undefined,
      isPending: false
    },
    {
      name: "TensorFlow",
      logo: "https://www.vectorlogo.zone/logos/tensorflow/tensorflow-icon.svg",
      repo: "https://github.com/tensorflow/tensorflow",
      prLink: undefined,
      isPending: false
    },
    {
      name: "Supermemory",
      logo: "/Supermemory_logo.png",
      repo: "https://github.com/supermemoryai/supermemory",
      prLink: undefined,
      isPending: false
    },
    {
      name: "Supabase",
      logo: "https://www.vectorlogo.zone/logos/supabase/supabase-icon.svg",
      repo: "https://github.com/supabase/supabase",
      prLink: undefined,
      isPending: false
    },
    {
      name: "Suite Numérique Meet",
      logo: "/logo-suite-numerique.png",
      repo: "https://github.com/suitenumerique/meet",
      prLink: undefined,
      isPending: false
    },
    {
      name: "SGLang",
      logo: "/sglang_logo.png",
      repo: "https://github.com/sgl-project/sglang",
      prLink: undefined,
      isPending: false
    }
  ]

  return (
    <section className="fade">
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-5xl">
          Open Source Contributions
        </h1>
      </div>
      
      <p className="text-slate-600 dark:text-slate-400 text-lg mb-8">
        Contributing to the open source community and helping build better tools for everyone.
      </p>

      <div className="mb-8 p-4 rounded-lg bg-blue-500/10 dark:bg-blue-950/30 border border-blue-500/20 dark:border-blue-900/50">
        <p className="text-sm text-blue-700 dark:text-blue-300">
          <span className="font-semibold">Note:</span> Some of these contributions have pending pull requests awaiting review and approval from the maintainers.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {contributions.map((contribution, index) => (
          <ContributionCard key={index} {...contribution} />
        ))}
      </div>
    </section>
  )
}
