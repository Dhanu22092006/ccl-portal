import { Link } from 'react-router-dom'

export default function StoryCard({ story, large = false }) {
  const img = story.coverImage || story.image || story.media?.find?.((m) => m.type === 'image')?.url
  return (
    <Link to={`/stories/${story._id}`} className="group block">
      <div className={`overflow-hidden bg-paper-deep ${large ? 'aspect-[4/3]' : 'aspect-[3/2]'}`}>
        {img
          ? <img src={img} alt="" loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]" />
          : <div className="flex h-full items-end p-5"><span className="font-heading text-6xl font-semibold text-ink/10" aria-hidden="true">“</span></div>}
      </div>
      <p className="kicker mt-4">{String(story.type || 'story').replace(/[-_]/g, ' ')}</p>
      <h3 className={`mt-2 font-semibold leading-snug group-hover:underline group-hover:decoration-clay group-hover:underline-offset-4 ${large ? 'text-3xl' : 'text-xl'}`}>{story.title}</h3>
      {story.excerpt && <p className="mt-2 line-clamp-3 text-sm leading-6 text-ink-soft">{story.excerpt}</p>}
    </Link>
  )
}
