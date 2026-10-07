import { useEffect, useMemo, useState } from 'react'
import { Link, Route, Routes, useLocation, useNavigate, useParams } from 'react-router-dom'
import { getCCL, getCCLs, getStories, getStory } from './api/api'
import { AuthProvider, useAuth } from './context/AuthContext'
import { getSectionContent } from './data/cclSectionContent'

const fallbackTopics = [
  'People', 'Places', 'Stories', 'Community data', 'Surveys', 'Media', 'Important links'
]

function Shell({ children }) {
  const location = useLocation()
  const { user, logout } = useAuth()
  return (
    <div className="min-h-screen bg-stone-50 text-slate-800">
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          <Link to="/" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-900 text-sm font-black text-white">CCL</div>
            <div>
              <div className="font-bold tracking-tight">Community Co-Creation Labs</div>
              <div className="text-xs text-slate-500">People · Places · Stories</div>
            </div>
          </Link>
          <nav className="hidden items-center gap-6 md:flex">
            <NavLink to="/" current={location.pathname === '/'}>Home</NavLink>
            <NavLink to="/explore" current={location.pathname.startsWith('/explore')}>Explore CCLs</NavLink>
            <NavLink to="/stories" current={location.pathname.startsWith('/stories')}>Stories</NavLink>
            <NavLink to="/about" current={location.pathname === '/about'}>About</NavLink>
            {user ? (
              <button onClick={logout} className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white">Logout</button>
            ) : (
              <Link to="/admin/login" className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold">Admin</Link>
            )}
          </nav>
        </div>
      </header>
      <main>{children}</main>
      <footer className="mt-20 border-t border-slate-200 bg-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-12 md:grid-cols-3">
          <div>
            <div className="font-bold">CCL Portal</div>
            <p className="mt-2 text-sm leading-6 text-slate-500">A single portal for community co-creation labs, their people, places, stories and future data.</p>
          </div>
          <div>
            <div className="font-semibold">Portal</div>
            <div className="mt-3 space-y-2 text-sm text-slate-500">
              <Link className="block hover:text-slate-900" to="/explore">Explore CCLs</Link>
              <Link className="block hover:text-slate-900" to="/stories">Stories</Link>
              <Link className="block hover:text-slate-900" to="/about">About</Link>
            </div>
          </div>
          <div>
            <div className="font-semibold">Built for growth</div>
            <p className="mt-3 text-sm leading-6 text-slate-500">Additional CCL information can be added later through the backend and admin workflow without changing the portal structure.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

function NavLink({ to, current, children }) {
  return <Link to={to} className={current ? 'text-slate-900 font-semibold' : 'text-slate-500 hover:text-slate-900'}>{children}</Link>
}

function Loading() {
  return <div className="mx-auto max-w-7xl px-5 py-24 text-center text-slate-500">Loading…</div>
}

function ErrorBox({ message }) {
  return <div className="mx-auto max-w-3xl rounded-2xl border border-red-200 bg-red-50 p-5 text-sm text-red-700">{message}</div>
}

function Home() {
  const { data, loading, error } = useCCLs()
  const active = data.filter(c => c.status === 'active')
  const featured = active[0] || data[0]
  return (
    <div>
      <section className="bg-slate-950 text-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-24 md:grid-cols-[1.2fr_.8fr] md:items-center">
          <div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-[.25em] text-amber-300">One Single Portal</p>
            <h1 className="max-w-4xl text-5xl font-black leading-tight md:text-7xl">People. Places. Stories.</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">A common digital home for Community Co-Creation Labs — designed to publish verified community information today and support future data, media and dashboards as each CCL grows.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/explore" className="rounded-xl bg-white px-5 py-3 font-semibold text-slate-950">Explore CCLs</Link>
              <Link to="/stories" className="rounded-xl border border-white/20 px-5 py-3 font-semibold text-white">Read stories</Link>
            </div>
          </div>
          {featured && <div className="rounded-3xl p-7 shadow-2xl" style={{background: `linear-gradient(135deg, ${featured.theme?.primaryColor || '#0f172a'}, ${featured.theme?.secondaryColor || '#334155'})`}}>
            <p className="text-xs font-semibold uppercase tracking-[.2em] text-white/70">Featured CCL</p>
            <h2 className="mt-3 text-3xl font-bold">{featured.shortName || featured.name}</h2>
            <p className="mt-3 text-white/85">{featured.tagline}</p>
            <div className="mt-8 grid grid-cols-2 gap-3">
              {(featured.stats || []).slice(0, 4).map((s, i) => <div key={i} className="rounded-2xl bg-white/10 p-4"><div className="text-2xl font-bold">{s.value}</div><div className="mt-1 text-xs text-white/70">{s.label}</div></div>)}
            </div>
          </div>}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20">
        <div className="mb-10 flex items-end justify-between gap-5">
          <div><p className="text-sm font-semibold uppercase tracking-wider text-slate-500">The network</p><h2 className="mt-2 text-3xl font-black">Explore Community Co-Creation Labs</h2></div>
          <Link to="/explore" className="text-sm font-semibold">View all →</Link>
        </div>
        {loading ? <Loading /> : error ? <ErrorBox message={error} /> : <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">{data.map(c => <CCLCard key={c.slug} ccl={c} />)}</div>}
      </section>
    </div>
  )
}

function CCLCard({ ccl }) {
  const ready = ccl.status === 'active'
  return (
    <Link to={`/ccl/${ccl.slug}`} className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      <div className="h-2" style={{background: ccl.theme?.primaryColor || '#334155'}} />
      <div className="p-6">
        <div className="flex items-center justify-between gap-3">
          <span className={`rounded-full px-3 py-1 text-xs font-semibold ${ready ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}`}>{ready ? 'Active' : 'Content being added'}</span>
          <span className="text-xs text-slate-400">{ccl.location?.city}, {ccl.location?.state}</span>
        </div>
        <h3 className="mt-5 text-xl font-bold group-hover:underline">{ccl.shortName || ccl.name}</h3>
        <p className="mt-2 font-medium text-slate-600">{ccl.tagline}</p>
        <p className="mt-4 line-clamp-3 text-sm leading-6 text-slate-500">{ccl.description}</p>
        <div className="mt-6 text-sm font-semibold">Open CCL →</div>
      </div>
    </Link>
  )
}

function useCCLs() {
  const [state, setState] = useState({ data: [], loading: true, error: '' })
  useEffect(() => { getCCLs().then(r => setState({data:r.data.data || [], loading:false,error:''})).catch(e => setState({data:[],loading:false,error:e.response?.data?.message || e.message || 'Unable to load CCLs'})) }, [])
  return state
}

function Explore() {
  const { data, loading, error } = useCCLs()
  const [q, setQ] = useState('')
  const [filter, setFilter] = useState('all')
  const filtered = useMemo(() => data.filter(c => {
    const text = `${c.name} ${c.shortName} ${c.location?.city} ${c.description}`.toLowerCase()
    return text.includes(q.toLowerCase()) && (filter === 'all' || c.status === filter)
  }), [data, q, filter])
  return <section className="mx-auto max-w-7xl px-5 py-16">
    <div className="max-w-3xl"><p className="text-sm font-semibold uppercase tracking-wider text-slate-500">CCL Directory</p><h1 className="mt-2 text-4xl font-black md:text-5xl">Explore all CCLs</h1><p className="mt-4 text-slate-500">Every CCL has the same portal foundation. Published content is shown when available; future CCL data can be added later.</p></div>
    <div className="mt-8 flex flex-col gap-3 md:flex-row">
      <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search CCLs…" className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-slate-900 md:max-w-md" />
      <select value={filter} onChange={e=>setFilter(e.target.value)} className="rounded-xl border border-slate-300 bg-white px-4 py-3"><option value="all">All CCLs</option><option value="active">Active</option><option value="coming-soon">Content being added</option></select>
    </div>
    {loading ? <Loading /> : error ? <div className="mt-8"><ErrorBox message={error} /></div> : <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">{filtered.map(c => <CCLCard key={c.slug} ccl={c} />)}</div>}
    {!loading && !error && !filtered.length && <div className="mt-10 rounded-2xl border border-dashed border-slate-300 p-12 text-center text-slate-500">No CCLs match your search.</div>}
  </section>
}

function CCLDetail() {
  const { slug, sectionSlug, topicSlug } = useParams()
  const [ccl, setCcl] = useState(null)
  const [stories, setStories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  useEffect(() => {
    Promise.all([getCCL(slug), getStories({ccl: slug})]).then(([c, s]) => {setCcl(c.data.data); setStories(s.data.data || []); setLoading(false)}).catch(e => {setError(e.response?.data?.message || e.message); setLoading(false)})
  }, [slug])
  if (loading) return <Loading />
  if (error) return <section className="px-5 py-20"><ErrorBox message={error} /></section>
  if (!ccl) return null
  const menu = (ccl.menu || []).filter(item => item.isPublic !== false && item.slug)
  const selectedSection = menu.find(item => item.slug === sectionSlug)
  const selectedTopic = selectedSection?.subItems?.find(item => item.slug === topicSlug && item.isPublic !== false)
  if (sectionSlug && (!selectedSection || (topicSlug && !selectedTopic))) return <NotFound />

  const pageContent = sectionSlug ? getSectionContent(ccl.slug, sectionSlug, topicSlug) : null
  const pageTitle = topicSlug ? selectedTopic?.label : selectedSection?.label

  return <div>
    <section className="text-white" style={{background:`linear-gradient(135deg, ${ccl.theme?.primaryColor || '#0f172a'}, ${ccl.theme?.secondaryColor || '#334155'})`}}>
      <div className="mx-auto max-w-7xl px-5 py-20">
        <Link to="/explore" className="text-sm text-white/70">← All CCLs</Link>
        <div className="mt-8 max-w-4xl"><span className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold">{ccl.status === 'active' ? 'Active CCL' : 'Content being added'}</span><h1 className="mt-5 text-4xl font-black md:text-6xl">{ccl.name}</h1><p className="mt-5 text-xl text-white/85">{ccl.tagline}</p><p className="mt-5 max-w-3xl leading-8 text-white/75">{ccl.description}</p></div>
      </div>
    </section>
    <div className="mx-auto grid max-w-7xl gap-8 px-5 py-12 lg:grid-cols-[280px_1fr]">
      <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-4 lg:sticky lg:top-24">
        <nav aria-label="CCL menu">
          <div className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-400">CCL menu</div>
          <Link to={`/ccl/${slug}`} aria-current={!sectionSlug ? 'page' : undefined} className={`mb-1 block rounded-lg px-3 py-2 text-sm ${!sectionSlug ? 'bg-slate-100 font-semibold text-slate-950' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-950'}`}>Home</Link>
          <div className="space-y-1">
            {menu.map(item => {
              const active = item.slug === sectionSlug
              return <div key={item.slug}>
                <Link to={`/ccl/${slug}/${item.slug}`} aria-current={active && !topicSlug ? 'page' : undefined} className={`block rounded-lg px-3 py-2 text-sm ${active ? 'bg-slate-100 font-semibold text-slate-950' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-950'}`}>{item.label}</Link>
                {item.subItems?.filter(subItem => subItem.isPublic !== false).map(subItem => <Link key={subItem.slug} to={`/ccl/${slug}/${item.slug}/${subItem.slug}`} aria-current={active && topicSlug === subItem.slug ? 'page' : undefined} className={`ml-3 block rounded-lg px-3 py-2 text-sm ${active && topicSlug === subItem.slug ? 'font-semibold text-slate-950' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}`}>{subItem.label}</Link>)}
              </div>
            })}
          </div>
        </nav>
      </aside>
      <div className="space-y-8">
        {!sectionSlug ? <>
          <section className="rounded-3xl border border-slate-200 bg-white p-7 md:p-9">
            <p className="text-sm font-semibold uppercase tracking-wider text-slate-400">About</p>
            <h2 className="mt-2 text-3xl font-black">{ccl.shortName || ccl.name}</h2>
            <p className="mt-5 leading-8 text-slate-600">{ccl.about?.legacy || ccl.description}</p>
            {ccl.about?.vision && <div className="mt-8 grid gap-5 md:grid-cols-2"><div className="rounded-2xl bg-slate-50 p-5"><h3 className="font-bold">Vision</h3><p className="mt-2 text-sm leading-6 text-slate-600">{ccl.about.vision}</p></div><div className="rounded-2xl bg-slate-50 p-5"><h3 className="font-bold">Mission</h3><p className="mt-2 text-sm leading-6 text-slate-600">{ccl.about.mission}</p></div></div>}
          </section>
          {ccl.stats?.length > 0 && <section><h2 className="mb-4 text-2xl font-black">Data highlights</h2><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{ccl.stats.map((s,i)=><div key={i} className="rounded-2xl border border-slate-200 bg-white p-5"><div className="text-3xl font-black">{s.value}</div><div className="mt-1 text-sm font-semibold">{s.label}</div>{s.unit && <div className="text-xs text-slate-400">{s.unit}</div>}</div>)}</div></section>}
          <section>
            <h2 className="mb-4 text-2xl font-black">Explore this CCL</h2>
            <div className="grid gap-4 md:grid-cols-2">{menu.map(item => {
              const content = getSectionContent(ccl.slug, item.slug)
              return <Link key={item.slug} to={`/ccl/${slug}/${item.slug}`} className="rounded-2xl border border-slate-200 bg-white p-5 transition hover:-translate-y-0.5 hover:shadow-md">
                <h3 className="font-bold">{item.label}</h3>
                {content?.summary && <p className="mt-2 text-sm leading-6 text-slate-600">{content.summary}</p>}
                {item.subItems?.length > 0 && <p className="mt-3 text-xs font-semibold text-slate-500">{item.subItems.filter(subItem => subItem.isPublic !== false).length} topics · Open section →</p>}
              </Link>
            })}</div>
          </section>
          {stories.length > 0 && <section><div className="mb-4 flex items-center justify-between"><h2 className="text-2xl font-black">Stories</h2><Link className="text-sm font-semibold" to="/stories">All stories →</Link></div><div className="grid gap-4 md:grid-cols-2">{stories.slice(0,4).map(s=><StoryCard key={s._id} story={s}/>)}</div></section>}
          {ccl.importantLinks?.length > 0 && <ImportantLinks links={ccl.importantLinks} />}
        </> : <section className="rounded-3xl border border-slate-200 bg-white p-7 md:p-9">
          <Link to={`/ccl/${slug}`} className="text-sm font-semibold text-slate-500 hover:text-slate-950">← {ccl.shortName || 'CCL home'}</Link>
          <p className="mt-7 text-sm font-semibold uppercase tracking-wider text-slate-400">{selectedSection.label}</p>
          <h2 className="mt-2 text-3xl font-black">{pageTitle}</h2>
          {pageContent?.summary && <p className="mt-4 max-w-3xl leading-7 text-slate-600">{pageContent.summary}</p>}
          {topicSlug ? <SectionArticle content={pageContent} fallback={ccl.status === 'active' ? 'Community-approved content for this topic will be added here.' : 'This topic is planned for this CCL. Content will be added as it is developed with the community.'} /> : <>
            {selectedSection.subItems?.filter(item => item.isPublic !== false).length > 0 && <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {selectedSection.subItems.filter(item => item.isPublic !== false).map(item => {
                const topic = getSectionContent(ccl.slug, sectionSlug, item.slug)
                return <Link key={item.slug} to={`/ccl/${slug}/${sectionSlug}/${item.slug}`} className="rounded-2xl bg-slate-50 p-5 transition hover:bg-slate-100">
                  <h3 className="font-bold">{item.label}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{topic?.summary || 'Open this topic to explore its community content.'}</p>
                  <span className="mt-4 inline-block text-sm font-semibold">Explore topic →</span>
                </Link>
              })}
            </div>}
            {selectedSection.subItems?.filter(item => item.isPublic !== false).length === 0 && <SectionArticle content={pageContent} fallback={ccl.status === 'active' ? 'Community-approved content for this section will be added here.' : 'This section is planned for this CCL. Content will be added as it is developed with the community.'} />}
          </>}
          <SectionResources ccl={ccl} sectionSlug={topicSlug || sectionSlug} stories={stories} />
        </section>}
      </div>
    </div>
  </div>
}

function SectionArticle({ content, fallback }) {
  if (!content) return <p className="mt-6 rounded-2xl bg-slate-50 p-5 text-sm leading-6 text-slate-600">{fallback}</p>
  return <div className="mt-7 space-y-6">
    {content.paragraphs?.map((paragraph, index) => <p key={index} className="max-w-3xl leading-8 text-slate-700">{paragraph}</p>)}
    {content.sections?.map(section => <section key={section.title} className="max-w-3xl">
      <h3 className="text-xl font-bold">{section.title}</h3>
      {section.paragraphs?.map((paragraph, index) => <p key={index} className="mt-3 leading-7 text-slate-700">{paragraph}</p>)}
      {section.items && <ul className="mt-3 list-disc space-y-2 pl-5 text-slate-700">{section.items.map(item => <li key={item} className="leading-7">{item}</li>)}</ul>}
      {section.quote && <blockquote className="mt-4 border-l-4 border-slate-300 pl-4 italic leading-7 text-slate-600">{section.quote}</blockquote>}
    </section>)}
    {content.timeline && <ol className="space-y-3 border-l-2 border-slate-200 pl-5">{content.timeline.map(item => <li key={item.date} className="relative"><span className="font-bold">{item.date}</span><p className="mt-1 text-sm leading-6 text-slate-600">{item.detail}</p></li>)}</ol>}
  </div>
}

function SectionResources({ ccl, sectionSlug, stories }) {
  if (sectionSlug === 'contact' && ccl.contactInfo) return <div className="mt-8 rounded-2xl bg-slate-50 p-5">
    <h3 className="font-bold">Contact this CCL</h3>
    {ccl.contactInfo.email && <p className="mt-2 text-sm">Email: <a className="underline" href={`mailto:${ccl.contactInfo.email}`}>{ccl.contactInfo.email}</a></p>}
    {ccl.contactInfo.phone && <p className="mt-1 text-sm">Phone: <a className="underline" href={`tel:${ccl.contactInfo.phone}`}>{ccl.contactInfo.phone}</a></p>}
    {ccl.contactInfo.address && <p className="mt-1 text-sm">{ccl.contactInfo.address}</p>}
  </div>
  if (sectionSlug === 'team' && ccl.team?.length) return <div className="mt-8 grid gap-4 sm:grid-cols-2">{ccl.team.map((member, index) => <article key={`${member.name}-${index}`} className="rounded-2xl bg-slate-50 p-5"><h3 className="font-bold">{member.name}</h3><p className="mt-1 text-sm font-medium text-slate-600">{member.role}</p>{member.bio && <p className="mt-3 text-sm leading-6 text-slate-600">{member.bio}</p>}</article>)}</div>
  if (sectionSlug === 'collaborators' && ccl.collaborators?.length) return <div className="mt-8 grid gap-4 sm:grid-cols-2">{ccl.collaborators.map((collaborator, index) => <article key={`${collaborator.name}-${index}`} className="rounded-2xl bg-slate-50 p-5"><h3 className="font-bold">{collaborator.name}</h3>{collaborator.type && <p className="mt-1 text-sm text-slate-600">{collaborator.type}</p>}</article>)}</div>
  if (sectionSlug === 'stories' || sectionSlug === 'wastepickers') return stories.length ? <div className="mt-8 grid gap-4 md:grid-cols-2">{stories.slice(0,4).map(story => <StoryCard key={story._id} story={story} />)}</div> : null
  if (sectionSlug === 'important-links' || sectionSlug === 'resources') return ccl.importantLinks?.length ? <div className="mt-8"><ImportantLinks links={ccl.importantLinks} /></div> : null
  return null
}

function ImportantLinks({ links }) {
  return <section><h2 className="mb-4 text-2xl font-black">Important links</h2><div className="grid gap-3 md:grid-cols-2">{links.map((link, index) => <a key={index} href={link.url === '#' ? undefined : link.url} target={link.url === '#' ? undefined : '_blank'} rel="noreferrer" className="rounded-2xl border border-slate-200 bg-white p-5 hover:shadow-md"><div className="text-xs font-bold uppercase text-slate-400">{link.category}</div><div className="mt-1 font-bold">{link.title}</div><p className="mt-1 text-sm text-slate-500">{link.description}</p></a>)}</div></section>
}

function StoryCard({ story }) {
  return <Link to={`/stories/${story._id}`} className="rounded-2xl border border-slate-200 bg-white p-5 transition hover:-translate-y-0.5 hover:shadow-lg"><div className="text-xs font-semibold uppercase tracking-wider text-slate-400">{story.type}</div><h3 className="mt-2 font-bold">{story.title}</h3><p className="mt-2 text-sm leading-6 text-slate-500">{story.excerpt}</p></Link>
}

function Stories() {
  const [stories, setStories] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {getStories().then(r=>setStories(r.data.data||[])).finally(()=>setLoading(false))},[])
  return <section className="mx-auto max-w-7xl px-5 py-16"><p className="text-sm font-semibold uppercase tracking-wider text-slate-500">Community archive</p><h1 className="mt-2 text-4xl font-black">Stories</h1><p className="mt-4 max-w-2xl text-slate-500">Stories already present in the portal data are published here. More can be added through the backend later.</p>{loading?<Loading/>:<div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">{stories.map(s=><StoryCard key={s._id} story={s}/>)}</div>}</section>
}

function StoryDetail() {
  const { id } = useParams()
  const [story,setStory]=useState(null)
  const [loading,setLoading]=useState(true)
  useEffect(()=>{getStory(id).then(r=>setStory(r.data.data)).finally(()=>setLoading(false))},[id])
  if(loading)return <Loading/>
  if(!story)return <ErrorBox message="Story not found."/>
  return <article className="mx-auto max-w-4xl px-5 py-16"><Link to="/stories" className="text-sm font-semibold">← Stories</Link><p className="mt-8 text-xs font-bold uppercase tracking-wider text-slate-400">{story.type}</p><h1 className="mt-3 text-4xl font-black md:text-6xl">{story.title}</h1><p className="mt-5 text-xl text-slate-500">{story.subtitle}</p><div className="mt-10 whitespace-pre-line text-lg leading-9 text-slate-700">{story.content}</div></article>
}

function About() {
  return <section className="mx-auto max-w-4xl px-5 py-16"><p className="text-sm font-semibold uppercase tracking-wider text-slate-500">About the portal</p><h1 className="mt-2 text-4xl font-black">One portal, many CCLs</h1><p className="mt-6 text-lg leading-8 text-slate-600">The portal provides a common visual and information structure for Community Co-Creation Labs. Each CCL can have its own menu, data, stories, contacts and media while sharing the same platform.</p><div className="mt-10 grid gap-4 md:grid-cols-2">{fallbackTopics.map(t=><div key={t} className="rounded-2xl border border-slate-200 bg-white p-5 font-semibold">{t}</div>)}</div></section>
}

function AdminLogin() {
  const [email,setEmail]=useState('admin@ccl-portal.org')
  const [password,setPassword]=useState('Admin@123')
  const [error,setError]=useState('')
  const [busy,setBusy]=useState(false)
  const { login: signIn }=useAuth()
  const navigate=useNavigate()
  const submit=async e=>{e.preventDefault();setBusy(true);setError('');try{await signIn(email,password);navigate('/admin')}catch(err){setError(err.response?.data?.message||err.message||'Login failed')}finally{setBusy(false)}}
  return <section className="mx-auto max-w-md px-5 py-20"><div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm"><h1 className="text-3xl font-black">Admin login</h1><p className="mt-2 text-sm text-slate-500">Manage CCL data and portal content.</p>{error&&<div className="mt-5 rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</div>}<form onSubmit={submit} className="mt-7 space-y-4"><input className="w-full rounded-xl border p-3" value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email"/><input className="w-full rounded-xl border p-3" type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password"/><button disabled={busy} className="w-full rounded-xl bg-slate-900 p-3 font-semibold text-white">{busy?'Signing in…':'Sign in'}</button></form></div></section>
}

function Admin() {
  const { user }=useAuth()
  const {data,loading,error}=useCCLs()
  if(!user)return <section className="mx-auto max-w-xl px-5 py-20 text-center"><h1 className="text-3xl font-black">Admin access required</h1><Link className="mt-5 inline-block font-semibold" to="/admin/login">Sign in</Link></section>
  return <section className="mx-auto max-w-7xl px-5 py-16"><div className="flex flex-wrap items-end justify-between gap-5"><div><p className="text-sm font-semibold uppercase tracking-wider text-slate-500">Administration</p><h1 className="mt-2 text-4xl font-black">CCL content control</h1><p className="mt-3 text-slate-500">Current CCL records from MongoDB. Use the existing API to extend content as it becomes available.</p></div></div>{loading?<Loading/>:error?<ErrorBox message={error}/>:<div className="mt-10 overflow-hidden rounded-2xl border border-slate-200 bg-white"><table className="w-full text-left text-sm"><thead className="bg-slate-50 text-xs uppercase text-slate-500"><tr><th className="p-4">CCL</th><th className="p-4">Location</th><th className="p-4">Status</th><th className="p-4">Menu sections</th></tr></thead><tbody>{data.map(c=><tr className="border-t" key={c.slug}><td className="p-4 font-semibold">{c.shortName||c.name}</td><td className="p-4">{c.location?.city}, {c.location?.state}</td><td className="p-4">{c.status}</td><td className="p-4">{c.menu?.length||0}</td></tr>)}</tbody></table></div>}</section>
}

function AppRoutes() {
  return <Shell><Routes><Route path="/" element={<Home/>}/><Route path="/explore" element={<Explore/>}/><Route path="/ccl/:slug/:sectionSlug?/:topicSlug?" element={<CCLDetail/>}/><Route path="/stories" element={<Stories/>}/><Route path="/stories/:id" element={<StoryDetail/>}/><Route path="/about" element={<About/>}/><Route path="/admin/login" element={<AdminLogin/>}/><Route path="/admin" element={<Admin/>}/><Route path="*" element={<NotFound/>}/></Routes></Shell>
}

function NotFound(){return <section className="mx-auto max-w-xl px-5 py-24 text-center"><h1 className="text-5xl font-black">404</h1><p className="mt-3 text-slate-500">Page not found.</p><Link className="mt-6 inline-block font-semibold" to="/">Return home</Link></section>}

export default function App(){return <AuthProvider><AppRoutes/></AuthProvider>}
