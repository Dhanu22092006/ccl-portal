import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { statusMeta, place } from '../../lib/ccl'

export default function CCLIndexRow({ ccl, index }) {
  const st = statusMeta(ccl.status)
  return (
    <Link to={`/ccl/${ccl.slug}`} className="group grid items-baseline gap-x-8 gap-y-2 border-t hairline py-7 transition hover:bg-paper-soft md:grid-cols-[4rem_1.3fr_1fr_auto] md:px-3">
      <span className="font-heading text-sm text-ink-mute">{String(index + 1).padStart(2, '0')}</span>
      <div>
        <h3 className="text-2xl font-semibold leading-snug transition group-hover:text-sea md:text-3xl">{ccl.shortName || ccl.name}</h3>
        {ccl.tagline && <p className="mt-1.5 text-ink-soft">{ccl.tagline}</p>}
      </div>
      <div className="text-sm text-ink-soft">
        <p>{place(ccl)}</p>
        <p className="mt-1.5 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-ink-mute">
          <span className={`h-1.5 w-1.5 rounded-full ${st.dot}`} aria-hidden="true" />{st.label}
        </p>
      </div>
      <ArrowUpRight className="hidden text-ink-mute transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-clay md:block" aria-hidden="true" />
    </Link>
  )
}
