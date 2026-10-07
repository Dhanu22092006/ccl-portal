import { Link } from 'react-router-dom'
import Badge from '../ui/Badge'

export default function StoryCard({ story }) {
  const typeLabels = {
    'success-story': { label: 'Success Story', color: 'success' },
    'community-story': { label: 'Community Story', color: 'info' },
    'oral-history': { label: 'Oral History', color: 'neutral' },
    'wastepicker-story': { label: 'Wastepicker Story', color: 'warning' },
    'fisherman-story': { label: 'Fisherman Story', color: 'info' },
    'youth-voice': { label: 'Youth Voice', color: 'info' },
    'general': { label: 'Story', color: 'neutral' },
  }

  const typeInfo = typeLabels[story.type] || typeLabels.general
  const date = story.publishedAt
    ? new Date(story.publishedAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })
    : ''

  return (
    <div className="bg-white rounded-2xl shadow-md card-hover overflow-hidden flex flex-col border border-gray-100">
      {/* Image placeholder */}
      <div className="h-48 bg-gradient-to-br from-ccl-ocean/20 to-ccl-forest/20 relative overflow-hidden">
        {story.media?.[0]?.url ? (
          <img src={story.media[0].url} alt={story.title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <i className="fas fa-image text-4xl text-gray-300"></i>
          </div>
        )}
        <div className="absolute top-3 left-3">
          <Badge variant={typeInfo.color}>{typeInfo.label}</Badge>
        </div>
      </div>

      <div className="p-5 flex flex-col flex-1">
        <p className="text-xs text-gray-400 mb-2 uppercase tracking-wider">
          {story.cclSlug?.replace(/-/g, ' ')} {date && `· ${date}`}
        </p>
        <h3 className="font-heading text-lg font-semibold text-gray-900 mb-2 line-clamp-2 leading-snug">
          {story.title}
        </h3>
        <p className="text-gray-600 text-sm line-clamp-3 flex-1 mb-4">
          {story.excerpt || story.content?.slice(0, 150) + '...'}
        </p>
        {story.author?.name && (
          <p className="text-xs text-gray-400 mb-3">
            <i className="fas fa-user mr-1"></i> {story.author.name}
          </p>
        )}
        <Link
          to={`/ccl/${story.cclSlug}`}
          className="text-sm font-semibold text-ccl-ocean hover:text-ccl-ocean-dark flex items-center gap-1 group mt-auto"
        >
          Read more <i className="fas fa-arrow-right text-xs transition-transform group-hover:translate-x-1"></i>
        </Link>
      </div>
    </div>
  )
}
