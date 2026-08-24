import Link from 'next/link'

export default function NotFound() {
  return (
    <section className="fade px-6 py-16 text-center sm:px-8">
      <h1 className="font-serif text-6xl tracking-tight text-[var(--fg)]">
        404
      </h1>
      <p className="mb-8 mt-4 text-lg text-[var(--muted)]">
        Page not found. The page you&apos;re looking for doesn&apos;t exist.
      </p>
      <Link
        href="/"
        className="inline-block rounded-lg bg-[var(--fg)] px-6 py-3 text-sm font-medium text-[var(--bg)] transition-transform hover:-translate-y-0.5"
      >
        Go Home
      </Link>
    </section>
  )
}
