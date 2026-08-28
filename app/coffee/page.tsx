'use client';

import ScrollReveal from '../components/ScrollReveal';
import { Shell, SectionHeader } from '../components/Shell';

export default function CoffeePage() {
  return (
    <div className="fade">
      <SectionHeader title="Coffee" />
      <Shell className="px-6 py-8 sm:px-8">
        <ScrollReveal>
          <div className="relative mb-12">
            <h1 className="font-serif text-4xl tracking-tight text-[var(--fg)] sm:text-5xl">
              Let&apos;s Connect Over Coffee
            </h1>
            <p className="mt-3 text-lg text-[var(--muted)]">
              I&apos;d love to hear from you. Whether it&apos;s a project, opportunity, or just a chat about tech.
            </p>
            <a
              href="https://calendly.com/rajayshashwat/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 rounded-full border border-purple-500 px-5 py-2.5 text-sm font-semibold text-purple-500 transition-colors duration-200 hover:bg-purple-500 hover:text-white"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              Chat
            </a>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={150}>
          <div className="mb-12 grid gap-6">
            <div className="relative overflow-hidden rounded-xl border border-[var(--line)] bg-[var(--card)] p-8 transition-colors duration-300 hover:border-amber-500/60">
              <div className="absolute inset-x-0 top-0 h-px bg-amber-400/70" />
              <div className="relative">
                <h2 className="mb-4 flex items-center gap-2 text-2xl font-semibold text-[var(--fg)]">
                  <svg className="mr-2 h-7 w-7 text-amber-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.216 6.415l-.132-.666c-.119-.598-.388-1.163-1.001-1.379-.197-.069-.42-.098-.57-.241-.152-.143-.196-.366-.231-.572-.065-.378-.125-.756-.192-1.133-.057-.325-.102-.69-.25-.987-.195-.4-.597-.634-.996-.788a5.723 5.723 0 00-.626-.194c-1-.263-2.05-.36-3.077-.416a25.834 25.834 0 00-3.7.062c-.915.083-1.88.184-2.75.5-.318.116-.646.256-.888.501-.297.302-.393.77-.177 1.146.154.267.415.456.692.58.36.162.737.284 1.123.366 1.075.238 2.189.331 3.287.37 1.218.05 2.437.01 3.65-.118.299-.033.598-.073.896-.119.352-.054.578-.513.474-.834-.124-.383-.457-.531-.834-.473-.466.074-.96.108-1.382.146-1.177.08-2.358.082-3.536.006a22.228 22.228 0 01-1.157-.107c-.086-.01-.18-.025-.258-.036-.243-.036-.484-.08-.724-.13-.111-.027-.111-.185 0-.212h.005c.277-.06.557-.108.838-.147h.002c.131-.009.263-.032.394-.048a25.076 25.076 0 013.426-.12c.674.019 1.347.067 2.017.144l.228.031c.267.04.533.088.798.145.392.085.895.113 1.07.542.055.137.08.288.111.431l.319 1.484a.237.237 0 01-.199.284h-.003c-.037.006-.075.01-.112.015a36.704 36.704 0 01-4.743.295 37.059 37.059 0 01-4.699-.304c-.14-.017-.293-.042-.417-.06-.326-.048-.649-.108-.973-.161-.393-.065-.768-.032-1.123.161-.29.16-.527.404-.675.701-.154.316-.199.66-.267 1-.069.34-.176.707-.135 1.056.087.753.613 1.365 1.37 1.502a39.69 39.69 0 0011.343.376.483.483 0 01.535.53l-.071.697-1.018 9.907c-.041.41-.047.832-.125 1.237-.122.637-.553 1.028-1.182 1.171-.577.131-1.165.2-1.756.205-.656.004-1.31-.025-1.966-.022-.699.004-1.556-.06-2.095-.58-.475-.458-.54-1.174-.605-1.793l-.731-7.013-.322-3.094c-.037-.351-.286-.695-.678-.678-.336.015-.718.3-.678.679l.228 2.185.949 9.112c.147 1.344 1.174 2.068 2.446 2.272.742.12 1.503.144 2.257.156.966.016 1.942.053 2.892-.122 1.408-.258 2.465-1.198 2.616-2.657.34-3.332.683-6.663 1.024-9.995l.215-2.087a.484.484 0 01.39-.426c.402-.078.787-.212 1.074-.518.455-.488.546-1.124.385-1.766zm-1.478.772c-.145.137-.363.201-.578.233-2.416.359-4.866.54-7.308.46-1.748-.06-3.477-.254-5.207-.498-.17-.024-.353-.055-.47-.18-.22-.236-.111-.71-.054-.995.052-.26.152-.609.463-.646.484-.057 1.046.148 1.526.22.577.088 1.156.16 1.737.212 2.48.226 5.002.19 7.472-.14.45-.06.899-.13 1.345-.21.399-.072.84-.206 1.08.206.166.281.188.657.162.974a.544.544 0 01-.169.364z" />
                  </svg>
                  Buy Me a Coffee
                </h2>
                <p className="mb-6 max-w-4xl leading-7 text-[var(--muted)]">
                  Support my work and projects. Every coffee helps fuel late-night coding sessions and new ideas. Bonus
                  points if you get me a Hot blonde vanilla latte, with an extra two pumps of vanilla and caramel + whipped
                  cream from Starbucks.
                </p>
                <a
                  href="https://venmo.com/u/shash58"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center rounded-lg bg-amber-500 px-6 py-3 font-semibold text-white transition-colors duration-200 hover:bg-amber-600"
                >
                  Buy Me a Coffee
                </a>
              </div>
            </div>
          </div>
        </ScrollReveal>

        <div className="mb-12 grid gap-6 md:grid-cols-2">
          <ScrollReveal delay={250}>
            <div className="rounded-xl border border-[var(--line)] bg-[var(--card)] p-6 transition-colors duration-300 hover:border-[var(--soft)]">
              <h3 className="mb-4 flex items-center gap-2 text-xl font-semibold text-[var(--fg)]">
                <svg className="h-5 w-5 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                Email
              </h3>
              <a href="mailto:rajayshashwat@gmail.com" className="mb-2 flex items-center gap-2 text-[var(--muted)] transition-colors hover:text-[var(--fg)]">
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z" />
                </svg>
                rajayshashwat@gmail.com
              </a>
              <a href="mailto:shash.raj@asu.edu" className="flex items-center gap-2 text-[var(--muted)] transition-colors hover:text-[var(--fg)]">
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z" />
                </svg>
                shash.raj@asu.edu
              </a>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={350}>
            <div className="rounded-xl border border-[var(--line)] bg-[var(--card)] p-6 transition-colors duration-300 hover:border-[var(--soft)]">
              <h3 className="mb-4 flex items-center gap-2 text-xl font-semibold text-[var(--fg)]">
                <svg className="h-5 w-5 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
                  <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
                </svg>
                Socials
              </h3>
              <a href="https://github.com/darthvader58" target="_blank" rel="noopener noreferrer" className="mb-2 flex items-center gap-2 text-[var(--muted)] transition-colors hover:text-[var(--fg)]">
                <svg className="h-4 w-4" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
                </svg>
                @darthvader58
              </a>
              <a href="https://linkedin.com/in/raj-shashwat" target="_blank" rel="noopener noreferrer" className="mb-2 flex items-center gap-2 text-[var(--muted)] transition-colors hover:text-[var(--fg)]">
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                raj-shashwat
              </a>
              <a href="https://instagram.com/shash._me" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[var(--muted)] transition-colors hover:text-[var(--fg)]">
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
                @shash._me
              </a>
              <a href="https://x.com/shash_raj_" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[var(--muted)] transition-colors hover:text-[var(--fg)]">
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
                @shash_raj_
              </a>      
            </div>
          </ScrollReveal>
        </div>

        <ScrollReveal delay={450}>
          <div className="rounded-lg border border-[var(--line)] bg-[var(--card)] p-6 transition-all duration-300 hover:border-[var(--soft)]">
            <h3 className="mb-3 text-xl font-semibold text-[var(--fg)]">See Ya!</h3>
            <p className="text-[var(--muted)]">At Tempe, Arizona • Open for work opportunities and collaborations</p>
          </div>
        </ScrollReveal>
      </Shell>
    </div>
  )
}
