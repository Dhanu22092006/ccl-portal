import { useMemo, useState } from 'react'
import { Search } from 'lucide-react'
import { useCCLs } from '../hooks/useCCL'
import PageHeader from '../components/ui/PageHeader'
import CCLIndexRow from '../components/ccl/CCLIndexRow'
import { Loading, ErrorBox } from '../components/ui/States'

const filters = [['all', 'All'], ['active', 'Active'], ['coming-soon', 'Content being added'], ['placeholder', 'Draft']]

export default function Explore() {
  const { data, loading, error } = useCCLs()
  const [q, setQ] = useState('')
  const [filter, setFilter] = useState('all')
  const list = useMemo(() => data.filter((c) => {
    const text = `${c.name} ${c.shortName} ${c.location?.city} ${c.description}`.toLowerCase()
    return text.includes(q.toLowerCase()) && (filter === 'all' || c.status === filter)
  }), [data, q, filter])

  return (
    <>
      <PageHeader kicker="Directory" title="Explore the labs">
        Every lab shares one foundation, with its own menu, voices and data. Content appears here once it has been documented with the community.
      </PageHeader>
      <section className="mx-auto max-w-7xl px-5 py-12">
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div className="relative w-full md:max-w-sm">
            <label htmlFor="q" className="sr-only">Search labs</label>
            <Search size={16} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-mute" aria-hidden="true" />
            <input id="q" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by name or place" className="field pl-11" />
          </div>
          <div role="group" aria-label="Filter by status" className="flex flex-wrap gap-2">
            {filters.map(([v, l]) => (
              <button key={v} onClick={() => setFilter(v)} aria-pressed={filter === v}
                className={`border px-4 py-2 text-sm transition ${filter === v ? 'border-ink bg-ink text-paper' : 'hairline text-ink-soft hover:border-ink'}`}>{l}</button>
            ))}
          </div>
        </div>
        <div className="mt-10 border-b hairline" aria-live="polite">
          {loading ? <Loading /> : error ? <ErrorBox message={error} /> : list.map((c, i) => <CCLIndexRow key={c.slug} ccl={c} index={i} />)}
        </div>
        {!loading && !error && !list.length && <p className="py-16 text-center text-ink-mute">No labs match your search.</p>}
      </section>
    </>
  )
}
