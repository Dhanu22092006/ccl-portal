import { useStories } from '../hooks/useStories'
import PageHeader from '../components/ui/PageHeader'
import StoryCard from '../components/stories/StoryCard'
import { Loading, ErrorBox, ComingSoon } from '../components/ui/States'
import Reveal from '../components/ui/Reveal'

export default function Stories() {
  const { data, loading, error } = useStories()
  return (
    <>
      <PageHeader kicker="Community archive" title="Stories">Voices and histories from across the labs, published as they are documented and approved.</PageHeader>
      <section className="mx-auto max-w-7xl px-5 py-14">
        {loading ? <Loading /> : error ? <ErrorBox message={error} /> : data.length === 0
          ? <ComingSoon>Stories are being collected with each community and will appear here once reviewed.</ComingSoon>
          : <div className="grid gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">{data.map((s, i) => <Reveal key={s._id} delay={(i % 3) * 0.07}><StoryCard story={s} /></Reveal>)}</div>}
      </section>
    </>
  )
}
