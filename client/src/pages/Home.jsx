import { Link } from 'react-router-dom'
import { ArrowRight, Users, MapPin, BookOpen } from 'lucide-react'
import { useCCLs } from '../hooks/useCCL'
import { useStories } from '../hooks/useStories'
import { Loading, ErrorBox } from '../components/ui/States'
import Reveal from '../components/ui/Reveal'
import CCLIndexRow from '../components/ccl/CCLIndexRow'
import StoryCard from '../components/stories/StoryCard'

const pillars = [
  { icon: Users, title: 'People', text: 'The families, workers and elders whose lived knowledge shapes every lab.' },
  { icon: MapPin, title: 'Places', text: 'Villages, coasts, neighbourhoods and institutions, documented where they stand.' },
  { icon: BookOpen, title: 'Stories', text: 'Voices, histories and evidence gathered with communities, not about them.' },
]

export default function Home() {
  const { data, loading, error } = useCCLs()
  const { data: stories } = useStories()

  return (
    <>
      <section className="border-b hairline">
        <div className="mx-auto max-w-7xl px-5 pb-20 pt-16 md:pb-28 md:pt-24">
          <div>
            <Reveal><p className="kicker">Community Co-Creation Labs · Maharashtra</p></Reveal>
            <Reveal delay={0.08}>
              <h1 className="mt-6 text-[clamp(3rem,9vw,7.5rem)] font-semibold leading-[0.95]">
                Communities.<br />Stories.<br /><span className="italic text-clay">Change.</span>
              </h1>
            </Reveal>
            <Reveal delay={0.18}>
              <p className="mt-8 max-w-xl text-xl leading-9 text-ink-soft">
                A shared space for local knowledge, collective action, and community-led change.
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <Link to="/explore" className="btn-primary">Explore the labs <ArrowRight size={16} aria-hidden="true" /></Link>
                <Link to="/stories" className="btn-ghost">Read stories</Link>
              </div>
            </Reveal>
          </div>

        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 md:py-28">
        <div className="grid gap-12 md:grid-cols-3 md:gap-0">
          {pillars.map(({ icon: Icon, title, text }, i) => (
            <Reveal key={title} delay={i * 0.08} className={`md:px-8 ${i ? 'md:border-l hairline' : 'md:pl-0'}`}>
              <Icon size={22} className="text-sea" aria-hidden="true" />
              <h2 className="mt-5 text-3xl font-semibold">{title}</h2>
              <p className="mt-3 max-w-xs leading-7 text-ink-soft">{text}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5">
        <Reveal className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="kicker">The network</p>
            <h2 className="mt-3 text-4xl font-semibold md:text-5xl">One portal, many labs</h2>
          </div>
          <Link to="/explore" className="inline-flex items-center gap-2 text-sm font-semibold hover:text-clay">View all labs <ArrowRight size={15} aria-hidden="true" /></Link>
        </Reveal>
        {loading ? <Loading label="Loading labs" /> : error ? <ErrorBox message={error} /> : (
          <div className="border-b hairline">{data.map((c, i) => <CCLIndexRow key={c.slug} ccl={c} index={i} />)}</div>
        )}
      </section>

      {stories.length > 0 && (
        <section className="mx-auto mt-28 max-w-7xl px-5">
          <Reveal className="mb-10 flex items-end justify-between gap-4">
            <div><p className="kicker">From the archive</p><h2 className="mt-3 text-4xl font-semibold md:text-5xl">Recent stories</h2></div>
            <Link to="/stories" className="inline-flex items-center gap-2 text-sm font-semibold hover:text-clay">All stories <ArrowRight size={15} aria-hidden="true" /></Link>
          </Reveal>
          <div className="grid gap-10 md:grid-cols-3">
            {stories.slice(0, 3).map((s, i) => <Reveal key={s._id} delay={i * 0.08}><StoryCard story={s} /></Reveal>)}
          </div>
        </section>
      )}
    </>
  )
}
