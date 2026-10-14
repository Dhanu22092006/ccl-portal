import { Link } from 'react-router-dom'
import { AlertCircle, Hourglass } from 'lucide-react'

export function Loading({ label = 'Loading' }) {
  return (
    <div role="status" aria-live="polite" className="mx-auto max-w-7xl px-5 py-24 text-center text-sm text-ink-mute">
      <span className="mx-auto mb-4 block h-6 w-6 animate-spin rounded-full border-2 border-line border-t-sea" />
      {label}…
    </div>
  )
}

export function ErrorBox({ message }) {
  return (
    <div role="alert" className="mx-auto flex max-w-3xl items-start gap-3 border border-clay/30 bg-clay/5 p-5 text-sm text-clay-dark">
      <AlertCircle size={18} className="mt-0.5 shrink-0" aria-hidden="true" />
      <span>{message}</span>
    </div>
  )
}

export function ComingSoon({ children }) {
  return (
    <div className="mt-8 flex max-w-2xl items-start gap-4 border-l-2 border-clay bg-paper-deep/60 p-6">
      <Hourglass size={18} className="mt-1 shrink-0 text-clay" aria-hidden="true" />
      <div>
        <p className="font-heading text-lg font-semibold">Data being documented</p>
        <p className="mt-1 text-sm leading-6 text-ink-soft">{children}</p>
      </div>
    </div>
  )
}

export function NotFound() {
  return (
    <section className="mx-auto max-w-xl px-5 py-28 text-center">
      <p className="kicker">404</p>
      <h1 className="mt-3 text-5xl font-semibold">This page has drifted out to sea.</h1>
      <p className="mt-4 text-ink-soft">We couldn't find what you were looking for.</p>
      <Link className="btn-primary mt-8" to="/">Return home</Link>
    </section>
  )
}
