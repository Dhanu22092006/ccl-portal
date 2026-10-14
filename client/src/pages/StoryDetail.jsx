import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { getStory } from '../api/api'
import { Loading, ErrorBox } from '../components/ui/States'
import { errMsg } from '../lib/ccl'

export default function StoryDetail() {
  const { id } = useParams()
  const [story, setStory] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    setLoading(true)
    getStory(id).then((r) => setStory(r.data.data)).catch((e) => setError(errMsg(e, 'Story not found'))).finally(() => setLoading(false))
  }, [id])
  if (loading) return <Loading />
  if (error || !story) return <section className="px-5 py-20"><ErrorBox message={error || 'Story not found.'} /></section>
  return (
    <article className="mx-auto max-w-3xl px-5 py-14 md:py-20">
      <Link to="/stories" className="inline-flex items-center gap-2 text-sm font-semibold text-ink-soft hover:text-ink"><ArrowLeft size={15} aria-hidden="true" /> All stories</Link>
      <p className="kicker mt-10">{String(story.type || 'story').replace(/[-_]/g, ' ')}</p>
      <h1 className="mt-4 text-4xl font-semibold leading-[1.08] md:text-6xl">{story.title}</h1>
      {story.subtitle && <p className="mt-6 text-xl leading-8 text-ink-soft">{story.subtitle}</p>}
      <div className="mt-12 whitespace-pre-line border-t hairline pt-10 font-heading text-lg leading-9 text-ink/90 md:text-xl md:leading-10">{story.content}</div>
    </article>
  )
}
