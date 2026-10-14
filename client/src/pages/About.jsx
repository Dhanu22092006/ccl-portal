import PageHeader from '../components/ui/PageHeader'
import Reveal from '../components/ui/Reveal'

const topics = ['People', 'Places', 'Stories', 'Community data', 'Surveys', 'Media', 'Important links']

export default function About() {
  return (
    <>
      <PageHeader kicker="About the portal" title="One portal, many labs">
        A shared space for local knowledge, collective action, and community-led change.
      </PageHeader>
      <section className="mx-auto grid max-w-7xl gap-14 px-5 py-16 md:grid-cols-[1.2fr_.8fr]">
        <Reveal>
          <p className="measure font-heading text-2xl leading-10 text-ink/90">
            The portal gives every Community Co-Creation Lab a common visual and information structure. Each lab keeps its own menu, data, stories, contacts and media, while sharing one platform and one way of telling its story.
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="kicker">What each lab can hold</p>
          <ul className="mt-5">
            {topics.map((t) => <li key={t} className="border-t hairline py-3 font-heading text-xl last:border-b">{t}</li>)}
          </ul>
        </Reveal>
      </section>
    </>
  )
}
