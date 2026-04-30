type CallbackPageProps = {
  searchParams?: {
    code?: string | string[]
    error?: string | string[]
    state?: string | string[]
  }
}

function getSingleValue(value?: string | string[]) {
  return Array.isArray(value) ? value[0] : value
}

export default function CallbackPage({ searchParams }: CallbackPageProps) {
  const code = getSingleValue(searchParams?.code)
  const error = getSingleValue(searchParams?.error)
  const state = getSingleValue(searchParams?.state)

  return (
    <section className="fade max-w-3xl">
      <h1 className="mb-4 text-4xl font-bold tracking-tight text-slate-100 sm:text-5xl">
        Spotify Callback
      </h1>

      <p className="mb-8 text-slate-400">
        This page captures the Spotify authorization response so you can copy the code and exchange it
        for a refresh token.
      </p>

      {error ? (
        <div className="rounded-2xl border border-red-700/50 bg-red-950/30 p-6">
          <h2 className="mb-2 text-xl font-semibold text-red-300">Authorization failed</h2>
          <p className="text-red-200">{error}</p>
        </div>
      ) : code ? (
        <div className="space-y-6">
          <div className="rounded-2xl border border-green-700/50 bg-green-950/20 p-6">
            <h2 className="mb-2 text-xl font-semibold text-green-300">Authorization code received</h2>
            <p className="mb-4 text-slate-300">
              Copy this code and use it immediately in the token exchange request. Spotify auth codes
              are single-use and expire quickly.
            </p>
            <pre className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950/70 p-4 text-sm text-slate-200">
              <code>{code}</code>
            </pre>
          </div>

          {state ? (
            <div className="rounded-2xl border border-slate-800 bg-slate-950/30 p-6">
              <h2 className="mb-2 text-lg font-semibold text-slate-100">State</h2>
              <pre className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950/70 p-4 text-sm text-slate-300">
                <code>{state}</code>
              </pre>
            </div>
          ) : null}

          <div className="rounded-2xl border border-slate-800 bg-slate-950/30 p-6">
            <h2 className="mb-3 text-lg font-semibold text-slate-100">Next step</h2>
            <pre className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950/70 p-4 text-sm text-slate-300">
              <code>{`AUTH=$(printf '%s:%s' "$SPOTIFY_CLIENT_ID" "$SPOTIFY_CLIENT_SECRET" | base64)

curl -X POST https://accounts.spotify.com/api/token \\
  -H "Authorization: Basic $AUTH" \\
  -H "Content-Type: application/x-www-form-urlencoded" \\
  -d grant_type=authorization_code \\
  -d code=PASTE_THE_CODE_HERE \\
  -d redirect_uri=http://127.0.0.1:3000/callback`}</code>
            </pre>
          </div>
        </div>
      ) : (
        <div className="rounded-2xl border border-slate-800 bg-slate-950/30 p-6">
          <h2 className="mb-2 text-xl font-semibold text-slate-100">No authorization code yet</h2>
          <p className="text-slate-400">
            Use this exact redirect URI in your Spotify app settings and authorization URL:
          </p>
          <pre className="mt-4 overflow-x-auto rounded-xl border border-slate-800 bg-slate-950/70 p-4 text-sm text-slate-200">
            <code>http://127.0.0.1:3000/callback</code>
          </pre>
        </div>
      )}
    </section>
  )
}
