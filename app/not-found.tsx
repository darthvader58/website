import Link from 'next/link'

export default function NotFound() {
  return (
    <section className="fade">
      <h1 className="mb-8 text-6xl font-bold tracking-tight text-slate-100">
        404
      </h1>
      <p className="mb-4 text-xl text-slate-400">
        Page not found. The page you're looking for doesn't exist.
      </p>
      <Link
        href="/"
        className="inline-block px-6 py-3 text-sm font-medium text-purple-100 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors"
      >
        Go Home
      </Link>
    </section>
  )
}