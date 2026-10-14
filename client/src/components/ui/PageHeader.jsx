import Reveal from './Reveal'

export default function PageHeader({ kicker, title, children }) {
  return (
    <header className="border-b hairline">
      <div className="mx-auto max-w-7xl px-5 pb-12 pt-16 md:pb-16 md:pt-24">
        <Reveal>
          <p className="kicker">{kicker}</p>
          <h1 className="mt-4 max-w-4xl text-4xl font-semibold leading-[1.05] md:text-6xl">{title}</h1>
          {children && <p className="mt-6 max-w-2xl text-lg leading-8 text-ink-soft">{children}</p>}
        </Reveal>
      </div>
    </header>
  )
}
