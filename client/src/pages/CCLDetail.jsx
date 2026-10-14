import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight, ChevronRight, ExternalLink, Mail, Phone, MapPin } from 'lucide-react'
import { getCCL, getStories } from '../api/api'
import { getSectionContent } from '../data/cclSectionContent'
import { Loading, ErrorBox, NotFound, ComingSoon } from '../components/ui/States'
import StoryCard from '../components/stories/StoryCard'
import Reveal from '../components/ui/Reveal'
import { errMsg, place, statusMeta, visibleSubs } from '../lib/ccl'

const hasHttp = (u) => typeof u === 'string' && /^https?:\/\//.test(u)

export default function CCLDetail() {
  const { slug, sectionSlug, topicSlug } = useParams()
  const [ccl, setCcl] = useState(null)
  const [stories, setStories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    setLoading(true); setError('')
    Promise.all([getCCL(slug), getStories({ ccl: slug })])
      .then(([c, s]) => { setCcl(c.data.data); setStories(s.data.data || []) })
      .catch((e) => setError(errMsg(e)))
      .finally(() => setLoading(false))
  }, [slug])

  if (loading) return <Loading />
  if (error) return <section className="px-5 py-20"><ErrorBox message={error} /></section>
  if (!ccl) return null

  const menu = (ccl.menu || []).filter((i) => i.isPublic !== false && i.slug)
  const section = menu.find((i) => i.slug === sectionSlug)
  const topic = visibleSubs(section).find((i) => i.slug === topicSlug)
  if (sectionSlug && (!section || (topicSlug && !topic))) return <NotFound />

  const content = sectionSlug ? getSectionContent(ccl.slug, sectionSlug, topicSlug) : null
  const title = topicSlug ? topic?.label : section?.label
  const name = ccl.shortName || ccl.name
  const st = statusMeta(ccl.status)
  const subs = visibleSubs(section)
  const fallback = ccl.status === 'active'
    ? 'Community-approved content for this page will be added here.'
    : 'This page is planned for this lab. Content will be added as it is developed with the community.'

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden text-white" style={{ background: ccl.theme?.primaryColor || '#1F5B6B' }}>
        {ccl.coverImage && <img src={ccl.coverImage} alt="" className="absolute inset-0 h-full w-full object-cover opacity-50" />}
        <div className="absolute inset-0 bg-black/35" aria-hidden="true" />
        <div className={`relative mx-auto max-w-7xl px-5 ${sectionSlug ? 'py-12 md:py-16' : 'py-16 md:py-28'}`}>
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-sm text-white/75">
            <Link to="/explore" className="hover:text-white">Labs</Link><ChevronRight size={14} aria-hidden="true" />
            <Link to={`/ccl/${slug}`} className="hover:text-white" aria-current={!sectionSlug ? 'page' : undefined}>{name}</Link>
            {section && <><ChevronRight size={14} aria-hidden="true" /><Link to={`/ccl/${slug}/${section.slug}`} className="hover:text-white" aria-current={!topicSlug ? 'page' : undefined}>{section.label}</Link></>}
            {topic && <><ChevronRight size={14} aria-hidden="true" /><span aria-current="page" className="text-white">{topic.label}</span></>}
          </nav>
          {!sectionSlug ? (
            <Reveal className="mt-10">
              <p className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/80"><span className={`h-1.5 w-1.5 rounded-full ${st.dot}`} aria-hidden="true" />{st.label} · {place(ccl)}</p>
              <h1 className="mt-5 max-w-4xl text-4xl font-semibold leading-[1.05] md:text-7xl">{ccl.name}</h1>
              {ccl.tagline && <p className="mt-6 max-w-2xl font-heading text-2xl italic text-white/90">{ccl.tagline}</p>}
            </Reveal>
          ) : <p className="mt-6 font-heading text-3xl font-semibold md:text-4xl">{name}</p>}
        </div>
      </section>

      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 lg:grid-cols-[260px_1fr] lg:gap-16">
        {/* Menu */}
        <aside className="lg:sticky lg:top-24 lg:h-fit lg:max-h-[calc(100vh-7rem)] lg:overflow-y-auto">
          <details className="group lg:open" open={typeof window !== 'undefined' && window.innerWidth >= 1024}>
            <summary className="flex cursor-pointer list-none items-center justify-between border-b hairline pb-3 lg:cursor-default">
              <span className="kicker">In this lab</span>
              <ChevronRight size={16} className="transition group-open:rotate-90 lg:hidden" aria-hidden="true" />
            </summary>
            <nav aria-label="Lab menu" className="mt-3">
              <Link to={`/ccl/${slug}`} aria-current={!sectionSlug ? 'page' : undefined} className={`block py-2 text-sm ${!sectionSlug ? 'font-semibold text-ink' : 'text-ink-soft hover:text-ink'}`}>Overview</Link>
              {menu.map((item) => {
                const active = item.slug === sectionSlug
                return (
                  <div key={item.slug}>
                    <Link to={`/ccl/${slug}/${item.slug}`} aria-current={active && !topicSlug ? 'page' : undefined}
                      className={`block border-l-2 py-2 pl-3 text-sm transition ${active ? 'border-clay font-semibold text-ink' : 'border-transparent text-ink-soft hover:text-ink'}`}>{item.label}</Link>
                    {active && visibleSubs(item).map((s) => (
                      <Link key={s.slug} to={`/ccl/${slug}/${item.slug}/${s.slug}`} aria-current={topicSlug === s.slug ? 'page' : undefined}
                        className={`block border-l-2 py-1.5 pl-6 text-[13px] ${topicSlug === s.slug ? 'border-clay font-semibold text-clay' : 'border-transparent text-ink-mute hover:text-ink'}`}>{s.label}</Link>
                    ))}
                  </div>
                )
              })}
            </nav>
          </details>
        </aside>

        <div className="min-w-0">
          {!sectionSlug ? (
            <Overview ccl={ccl} menu={menu} stories={stories} slug={slug} />
          ) : (
            <article>
              <Link to={topicSlug ? `/ccl/${slug}/${section.slug}` : `/ccl/${slug}`} className="inline-flex items-center gap-2 text-sm font-semibold text-ink-soft hover:text-ink"><ArrowLeft size={15} aria-hidden="true" /> {topicSlug ? section.label : 'Overview'}</Link>
              <p className="kicker mt-8">{topicSlug ? section.label : 'Section'}</p>
              <h2 className="mt-3 text-4xl font-semibold leading-tight md:text-5xl">{title}</h2>
              {content?.summary && <p className="mt-5 measure font-heading text-xl italic leading-8 text-ink-soft">{content.summary}</p>}

              {!topicSlug && subs.length > 0 && (
                <ol className="mt-10 border-b hairline">
                  {subs.map((s, i) => {
                    const t = getSectionContent(ccl.slug, sectionSlug, s.slug)
                    return (
                      <li key={s.slug}>
                        <Link to={`/ccl/${slug}/${sectionSlug}/${s.slug}`} className="group grid gap-x-6 border-t hairline py-5 transition hover:bg-paper-soft sm:grid-cols-[3rem_1fr_auto] sm:px-2">
                          <span className="font-heading text-sm text-ink-mute">{String(i + 1).padStart(2, '0')}</span>
                          <span>
                            <span className="block font-heading text-xl font-semibold group-hover:text-sea">{s.label}</span>
                            <span className="mt-1 block text-sm leading-6 text-ink-soft">{t?.summary || 'Data being documented'}</span>
                          </span>
                          <ArrowRight size={16} className="mt-1 hidden text-ink-mute transition group-hover:translate-x-1 group-hover:text-clay sm:block" aria-hidden="true" />
                        </Link>
                      </li>
                    )
                  })}
                </ol>
              )}

              {(topicSlug || subs.length === 0) && <Article content={content} fallback={fallback} />}
              <Resources ccl={ccl} slug={topicSlug || sectionSlug} stories={stories} />
            </article>
          )}
        </div>
      </div>
    </div>
  )
}

function Overview({ ccl, menu, stories, slug }) {
  return (
    <div className="space-y-20">
      <Reveal>
        <p className="kicker">About</p>
        <p className="mt-4 measure font-heading text-2xl leading-10 text-ink/90">{ccl.about?.legacy || ccl.description}</p>
        {ccl.about?.vision && (
          <dl className="mt-10 grid gap-8 border-t hairline pt-8 md:grid-cols-2">
            <div><dt className="kicker">Vision</dt><dd className="mt-3 leading-7 text-ink-soft">{ccl.about.vision}</dd></div>
            {ccl.about.mission && <div><dt className="kicker">Mission</dt><dd className="mt-3 leading-7 text-ink-soft">{ccl.about.mission}</dd></div>}
          </dl>
        )}
      </Reveal>

      {ccl.stats?.length > 0 && (
        <Reveal>
          <p className="kicker">By the numbers</p>
          <dl className="mt-6 grid grid-cols-2 gap-y-10 border-t hairline pt-8 lg:grid-cols-4">
            {ccl.stats.map((s, i) => (
              <div key={i} className="pr-4">
                <dd className="font-heading text-5xl font-semibold text-sea">{s.value}</dd>
                <dt className="mt-2 text-sm font-semibold">{s.label}</dt>
                {s.unit && <p className="text-xs text-ink-mute">{s.unit}</p>}
              </div>
            ))}
          </dl>
        </Reveal>
      )}

      <Reveal>
        <p className="kicker">Explore this lab</p>
        <ul className="mt-6 grid border-b hairline md:grid-cols-2 md:gap-x-12">
          {menu.map((item) => {
            const c = getSectionContent(ccl.slug, item.slug)
            const n = visibleSubs(item).length
            return (
              <li key={item.slug}>
                <Link to={`/ccl/${slug}/${item.slug}`} className="group flex items-start justify-between gap-4 border-t hairline py-5">
                  <span>
                    <span className="block font-heading text-xl font-semibold group-hover:text-sea">{item.label}</span>
                    <span className="mt-1 block text-sm leading-6 text-ink-soft">{c?.summary || (n ? `${n} topics` : 'Data being documented')}</span>
                  </span>
                  <ArrowRight size={16} className="mt-1.5 shrink-0 text-ink-mute transition group-hover:translate-x-1 group-hover:text-clay" aria-hidden="true" />
                </Link>
              </li>
            )
          })}
        </ul>
      </Reveal>

      {stories.length > 0 && (
        <Reveal>
          <div className="flex items-end justify-between"><p className="kicker">Stories</p><Link className="text-sm font-semibold hover:text-clay" to="/stories">All stories →</Link></div>
          <div className="mt-6 grid gap-10 sm:grid-cols-2">{stories.slice(0, 4).map((s) => <StoryCard key={s._id} story={s} />)}</div>
        </Reveal>
      )}
      {ccl.importantLinks?.length > 0 && <Links links={ccl.importantLinks} />}
    </div>
  )
}

function Article({ content, fallback }) {
  if (!content) return <ComingSoon>{fallback}</ComingSoon>
  return (
    <div className="mt-10 space-y-7">
      {content.paragraphs?.map((p, i) => <p key={i} className="measure text-[17px] leading-8 text-ink/90">{p}</p>)}
      {content.sections?.map((s) => (
        <section key={s.title} className="measure border-t hairline pt-7">
          <h3 className="text-2xl font-semibold">{s.title}</h3>
          {s.paragraphs?.map((p, i) => <p key={i} className="mt-4 text-[17px] leading-8 text-ink/90">{p}</p>)}
          {s.items && <ul className="mt-4 list-disc space-y-2 pl-5 leading-7 text-ink/90 marker:text-clay">{s.items.map((it) => <li key={it}>{it}</li>)}</ul>}
          {s.quote && <blockquote className="mt-6 border-l-2 border-clay pl-5 font-heading text-xl italic leading-8 text-ink-soft">{s.quote}</blockquote>}
        </section>
      ))}
      {content.timeline && (
        <ol className="measure border-l hairline pl-7">
          {content.timeline.map((t) => (
            <li key={t.date} className="relative pb-8 last:pb-0">
              <span className="absolute -left-[33px] top-1.5 h-2.5 w-2.5 rounded-full bg-clay ring-4 ring-paper" aria-hidden="true" />
              <p className="font-heading text-lg font-semibold">{t.date}</p>
              <p className="mt-1 leading-7 text-ink-soft">{t.detail}</p>
            </li>
          ))}
        </ol>
      )}
    </div>
  )
}

function Resources({ ccl, slug, stories }) {
  const wrap = 'mt-12 border-t hairline pt-8'
  if (slug === 'contact' && ccl.contactInfo) {
    const c = ccl.contactInfo
    return (
      <div className={wrap}><p className="kicker">Contact</p>
        <ul className="mt-5 space-y-3 text-ink-soft">
          {c.email && <li className="flex items-center gap-3"><Mail size={16} aria-hidden="true" /><a className="underline decoration-clay underline-offset-4" href={`mailto:${c.email}`}>{c.email}</a></li>}
          {c.phone && <li className="flex items-center gap-3"><Phone size={16} aria-hidden="true" /><a className="underline decoration-clay underline-offset-4" href={`tel:${c.phone}`}>{c.phone}</a></li>}
          {c.address && <li className="flex items-start gap-3"><MapPin size={16} className="mt-1" aria-hidden="true" />{c.address}</li>}
        </ul>
      </div>
    )
  }
  if (slug === 'team' && ccl.team?.length) return (
    <div className={wrap}><p className="kicker">Team</p>
      <ul className="mt-5 grid gap-x-10 gap-y-8 sm:grid-cols-2">{ccl.team.map((m, i) => (
        <li key={`${m.name}-${i}`}><h3 className="font-heading text-xl font-semibold">{m.name}</h3><p className="text-sm font-medium text-clay">{m.role}</p>{m.bio && <p className="mt-2 text-sm leading-6 text-ink-soft">{m.bio}</p>}</li>
      ))}</ul>
    </div>
  )
  if (slug === 'collaborators' && ccl.collaborators?.length) return (
    <div className={wrap}><p className="kicker">Collaborators</p>
      <ul className="mt-5 grid gap-x-10 sm:grid-cols-2">{ccl.collaborators.map((c, i) => (
        <li key={`${c.name}-${i}`} className="border-t hairline py-4"><h3 className="font-heading text-lg font-semibold">{c.name}</h3>{c.type && <p className="text-sm text-ink-mute">{c.type}</p>}</li>
      ))}</ul>
    </div>
  )
  if ((slug === 'stories' || slug === 'wastepickers') && stories.length) return (
    <div className={wrap}><div className="grid gap-10 sm:grid-cols-2">{stories.slice(0, 4).map((s) => <StoryCard key={s._id} story={s} />)}</div></div>
  )
  if ((slug === 'important-links' || slug === 'resources') && ccl.importantLinks?.length) return <div className={wrap}><Links links={ccl.importantLinks} /></div>
  return null
}

function Links({ links }) {
  return (
    <div>
      <p className="kicker">Important links</p>
      <ul className="mt-6 border-b hairline">
        {links.map((l, i) => {
          const live = hasHttp(l.url)
          const body = (
            <>
              <span>
                {l.category && <span className="block text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-mute">{l.category}</span>}
                <span className="mt-1 block font-heading text-lg font-semibold">{l.title}</span>
                {l.description && <span className="mt-1 block text-sm text-ink-soft">{l.description}</span>}
              </span>
              {live ? <ExternalLink size={16} className="mt-1 shrink-0 text-ink-mute" aria-hidden="true" /> : <span className="shrink-0 text-xs text-ink-mute">Coming soon</span>}
            </>
          )
          const cls = 'flex items-start justify-between gap-4 border-t hairline py-5'
          return <li key={i}>{live ? <a href={l.url} target="_blank" rel="noreferrer" className={`${cls} transition hover:bg-paper-soft`}>{body}</a> : <div className={cls}>{body}</div>}</li>
        })}
      </ul>
    </div>
  )
}
