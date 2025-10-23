export const metadata = {
    title: 'Coffee',
    description: 'Get in touch or buy me a coffee.',
  }
  
  export default function Coffee() {
    const socialLinks = [
      {
        name: 'GitHub',
        url: 'https://github.com/darthvader58',
        description: 'Check out my code and projects',
        icon: (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
          </svg>
        ),
      },
      {
        name: 'LinkedIn',
        url: 'https://linkedin.com/in/raj-shashwat',
        description: 'Connect with me professionally',
        icon: (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
        ),
      },
      {
        name: 'Behance',
        url: 'https://behance.net/shashwatraj1',
        description: 'View my design portfolio',
        icon: (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M6.938 4.503c.702 0 1.34.06 1.92.188.577.13 1.07.33 1.485.61.41.28.733.65.96 1.12.225.47.34 1.05.34 1.73 0 .74-.17 1.36-.507 1.86-.338.5-.837.9-1.502 1.22.906.26 1.576.72 2.022 1.37.448.66.665 1.45.665 2.36 0 .75-.13 1.39-.41 1.93-.28.55-.67 1-1.16 1.35-.48.348-1.05.6-1.67.767-.61.165-1.252.25-1.91.25h-5.5v-15.06h5.5zm-.254 6.08c.68 0 1.196-.133 1.552-.396.352-.26.53-.713.53-1.34 0-.392-.065-.71-.196-.96-.13-.25-.3-.45-.51-.59-.21-.14-.46-.24-.75-.3-.29-.06-.62-.09-.98-.09h-2.3v3.69h2.654zm.274 5.49c.42 0 .77-.05 1.084-.15.316-.1.583-.25.79-.43.21-.18.36-.39.46-.64.1-.25.15-.55.15-.89 0-.75-.22-1.27-.64-1.57-.43-.3-.99-.46-1.69-.46h-2.844v4.15h2.69zm9.65-8.13c1.04 0 1.898.19 2.584.576.687.39 1.24.92 1.664 1.6.42.68.72 1.47.896 2.36.177.89.265 1.86.265 2.9h-7.97c.06 1.02.38 1.76.956 2.23.58.47 1.28.71 2.1.71.68 0 1.25-.16 1.71-.48.46-.32.77-.69.93-1.1h2.94c-.47 1.41-1.2 2.45-2.2 3.12-1 .67-2.27 1-3.82 1-1.03 0-1.95-.17-2.75-.5-.81-.34-1.5-.82-2.07-1.45-.58-.63-1.03-1.39-1.34-2.28-.32-.89-.48-1.87-.48-2.94 0-1.03.16-2 .48-2.91.32-.91.77-1.69 1.35-2.33.58-.64 1.28-1.14 2.1-1.5.81-.37 1.73-.55 2.75-.55zm.01 2.13c-.75 0-1.4.21-1.94.63-.54.42-.88 1.08-.99 1.98h5.62c-.09-.93-.41-1.6-.96-2-.55-.4-1.2-.6-1.96-.6zm-9.76-8.29h7.59v1.59h-7.59v-1.59z" />
          </svg>
        ),
      },
      {
        name: 'Devpost',
        url: 'https://devpost.com/darthvader58',
        description: 'See my hackathon projects',
        icon: (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M6.002 1.61L0 12.004 6.002 22.39h11.996L24 12.004 17.998 1.61zm1.593 4.084h3.947c3.605 0 6.276 1.695 6.276 6.31 0 4.436-3.21 6.302-6.456 6.302H7.595zm2.517 2.449v7.714h1.241c2.646 0 3.862-1.55 3.862-3.861.009-2.569-1.096-3.853-3.767-3.853z" />
          </svg>
        ),
      },
    ]
  
    return (
      <section>
        <h1 className="font-semibold text-2xl mb-8 tracking-tighter">Let's Connect</h1>
        
        <div className="mb-12">
          <h2 className="font-semibold text-xl mb-4">Buy Me a Coffee</h2>
          <p className="mb-4 text-neutral-700 dark:text-neutral-300">
            If you enjoy my work or found my projects helpful, consider buying me a coffee! Your support helps me continue building cool stuff and contributing to open source.
          </p>
          <a
            href="https://www.buymeacoffee.com/shashwatraj"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold rounded-lg transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.216 6.415l-.132-.666c-.119-.598-.388-1.163-1.001-1.379-.197-.069-.42-.098-.57-.241-.152-.143-.196-.366-.231-.572-.065-.378-.125-.756-.192-1.133-.057-.325-.102-.69-.25-.987-.195-.4-.597-.634-.996-.788a5.723 5.723 0 00-.626-.194c-1-.263-2.05-.36-3.077-.416a25.834 25.834 0 00-3.7.062c-.915.083-1.88.184-2.75.5-.318.116-.646.256-.888.501-.297.302-.393.77-.177 1.146.154.267.415.456.692.58.36.162.737.284 1.123.366 1.075.238 2.189.331 3.287.37 1.218.05 2.437.01 3.65-.118.299-.033.598-.073.896-.119.352-.054.578-.513.474-.834-.124-.383-.457-.531-.834-.473-.466.074-.96.108-1.382.146-1.177.08-2.358.082-3.536.006a22.228 22.228 0 01-1.157-.107c-.086-.01-.18-.025-.258-.036-.243-.036-.484-.08-.724-.13-.111-.027-.111-.185 0-.212h.005c.277-.06.557-.108.838-.147h.002c.131-.009.263-.032.394-.048a25.076 25.076 0 013.426-.12c.674.019 1.347.067 2.017.144l.228.031c.267.04.533.088.798.145.392.085.895.113 1.07.542.055.137.08.288.111.431l.319 1.484a.237.237 0 01-.199.284h-.003c-.037.006-.075.01-.112.015a36.704 36.704 0 01-4.743.295 37.059 37.059 0 01-4.699-.304c-.14-.017-.293-.042-.417-.06-.326-.048-.649-.108-.973-.161-.393-.065-.768-.032-1.123.161-.29.16-.527.404-.675.701-.154.316-.199.66-.267 1-.069.34-.176.707-.135 1.056.087.753.613 1.365 1.37 1.502a39.69 39.69 0 0011.343.376.483.483 0 01.535.53l-.071.697-1.018 9.907c-.041.41-.047.832-.125 1.237-.122.637-.553 1.028-1.182 1.171-.577.131-1.165.2-1.756.205-.656.004-1.31-.025-1.966-.022-.699.004-1.556-.06-2.095-.58-.475-.458-.54-1.174-.605-1.793l-.731-7.013-.322-3.094c-.037-.351-.286-.695-.678-.678-.336.015-.718.3-.678.679l.228 2.185.949 9.112c.147 1.344 1.174 2.068 2.446 2.272.742.12 1.503.144 2.257.156.966.016 1.942.053 2.892-.122 1.408-.258 2.465-1.198 2.616-2.657.34-3.332.683-6.663 1.024-9.995l.215-2.087a.484.484 0 01.39-.426c.402-.078.787-.212 1.074-.518.455-.488.546-1.124.385-1.766zm-1.478.772c-.145.137-.363.201-.578.233-2.416.359-4.866.54-7.308.46-1.748-.06-3.477-.254-5.207-.498-.17-.024-.353-.055-.47-.18-.22-.236-.111-.71-.054-.995.052-.26.152-.609.463-.646.484-.057 1.046.148 1.526.22.577.088 1.156.16 1.737.212 2.48.226 5.002.19 7.472-.14.45-.06.899-.13 1.345-.21.399-.072.84-.206 1.08.206.166.281.188.657.162.974a.544.544 0 01-.169.364z" />
            </svg>
            Buy Me a Coffee
          </a>
        </div>
  
        <div className="mb-12">
          <h2 className="font-semibold text-xl mb-4">Get in Touch</h2>
          <p className="mb-6 text-neutral-700 dark:text-neutral-300">
            Feel free to reach out for collaborations, questions, or just to say hi! I'm always open to discussing new projects, creative ideas, or opportunities.
          </p>
          <a
            href="mailto:sraj58@asu.edu"
            className="inline-flex items-center text-neutral-900 dark:text-neutral-100 hover:text-neutral-600 dark:hover:text-neutral-400 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            sraj58@asu.edu
          </a>
        </div>
  
        <div>
          <h2 className="font-semibold text-xl mb-4">Find Me Online</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start p-4 border border-neutral-200 dark:border-neutral-800 rounded-lg hover:border-neutral-400 dark:hover:border-neutral-600 transition-colors group"
              >
                <div className="text-neutral-700 dark:text-neutral-300 group-hover:text-neutral-900 dark:group-hover:text-neutral-100 mr-4">
                  {link.icon}
                </div>
                <div>
                  <h3 className="font-semibold mb-1">{link.name}</h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">{link.description}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
  
        <div className="mt-12 p-4 bg-neutral-50 dark:bg-neutral-900 rounded-lg">
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            📍 Based in Tempe, Arizona • 🎓 ASU Student • 💻 Available for internships and collaborations
          </p>
        </div>
      </section>
    )
  }