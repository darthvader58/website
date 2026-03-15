'use client'

interface ContributionProps {
  name: string
  logo: string
  repo: string
  prLink?: string
  isPending?: boolean
}

function ContributionCard({ name, logo, repo, prLink, isPending }: ContributionProps) {
  return (
    <div className="group relative block border border-slate-800/50 rounded-lg p-8 hover:border-purple-700/50 transition-all duration-300 bg-white/5 dark:bg-slate-950/30 backdrop-blur-sm shadow-lg hover:shadow-xl hover:bg-white/10 dark:hover:bg-slate-950/50 h-full flex flex-col items-center justify-center gap-4">
      {isPending && (
        <span className="absolute top-3 right-3 text-xs px-2.5 py-1 rounded-full bg-yellow-500/10 dark:bg-yellow-950/50 text-yellow-600 dark:text-yellow-400 border border-yellow-500/20 dark:border-yellow-900/50">
          PR Pending
        </span>
      )}
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
      <div className="flex gap-3 mt-1">
        <a
          href={repo}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs px-3 py-1.5 rounded-md bg-slate-800/60 hover:bg-slate-700/60 text-slate-300 hover:text-white transition-colors flex items-center gap-1.5"
          onClick={e => e.stopPropagation()}
        >
          <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="currentColor">
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
          </svg>
          Repo
        </a>
        {prLink && (
          <a
            href={prLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs px-3 py-1.5 rounded-md bg-purple-600/20 hover:bg-purple-600/40 text-purple-400 hover:text-purple-300 border border-purple-700/30 transition-colors flex items-center gap-1.5"
            onClick={e => e.stopPropagation()}
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
            View PR
          </a>
        )}
      </div>
    </div>
  )
}

export default function OpenSourcePage() {
  const contributions = [
    {
      name: "MochaJS",
      logo: "https://avatars.githubusercontent.com/u/8770005?s=200&v=4",
      repo: "https://github.com/mochajs/mocha",
      prLink: "https://github.com/mochajs/mocha/pull/5662",
      isPending: false
    },
    {
      name: "TensorFlow",
      logo: "https://www.vectorlogo.zone/logos/tensorflow/tensorflow-icon.svg",
      repo: "https://github.com/tensorflow/tensorflow",
      prLink: "https://github.com/tensorflow/tensorflow/pull/108038",
      isPending: true
    },
    {
      name: "PixiJS",
      logo: "https://assets.streamlinehq.com/image/private/w_300,h_300,ar_1/f_auto/v1/icons/2/pixijs-pcxhaankypk9xzk3m3jnp.png/pixijs-5cvfqaao2hiu0b1zr4banc.png?_a=DATAiZAAZAA0",
      repo: "https://github.com/pixijs/pixijs",
      prLink: "https://github.com/pixijs/pixijs/pull/11924",
      isPending: false
    },
    {
      name: "Supabase",
      logo: "https://www.vectorlogo.zone/logos/supabase/supabase-icon.svg",
      repo: "https://github.com/supabase/supabase",
      prLink: "https://github.com/supabase/supabase/pull/41694",
      isPending: false
    },
    {
      name: "Suite Numérique Meet",
      logo: "/logo-suite-numerique.png",
      repo: "https://github.com/suitenumerique/meet",
      prLink: "https://github.com/suitenumerique/meet/pull/965",
      isPending: true
    },
    {
      name: "Keras",
      logo: "https://logo.svgcdn.com/devicon/keras-original-wordmark.png",
      repo: "https://github.com/keras-team/keras",
      prLink: "https://github.com/keras-team/keras/pull/22237",
      isPending: true
    }, 
    {
      name: "ElectronJS",
      logo: "https://iconlogovector.com/uploads/images/2024/04/lg-6623b70b896ab-Electron-Electronjs.webp",
      repo: "https://github.com/electron/electron",
      prLink: "https://github.com/electron/electron/pull/49778",
      isPending: false
    },
    {
      name: "Kubernetes",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Kubernetes_logo_without_workmark.svg/3840px-Kubernetes_logo_without_workmark.svg.png",
      repo: "https://github.com/kubernetes/kubernetes",
      prLink: "https://github.com/kubernetes/kubernetes/pull/136842",
      isPending: true
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
