import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Menu, X, ArrowUpRight } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'

const links = [
  { to: '/', label: 'Home', end: true },
  { to: '/explore', label: 'Explore labs' },
  { to: '/stories', label: 'Stories' },
  { to: '/about', label: 'About' },
]

const linkCls = ({ isActive }) =>
  `relative py-1 text-sm font-medium transition ${isActive ? 'text-ink after:absolute after:inset-x-0 after:-bottom-1 after:h-px after:bg-clay' : 'text-ink-soft hover:text-ink'}`

export default function Shell({ children }) {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  const { user, logout } = useAuth()
  useEffect(() => { setOpen(false); window.scrollTo({ top: 0 }) }, [pathname])

  return (
    <div className="min-h-screen bg-paper text-ink">
      <a href="#main" className="sr-only z-50 bg-ink px-4 py-2 text-paper focus:not-sr-only focus:fixed focus:left-3 focus:top-3">Skip to content</a>
      <header className="sticky top-0 z-40 border-b hairline bg-paper/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          <Link to="/" className="flex items-baseline gap-3" aria-label="CCL Portal home">
            <span className="font-heading text-2xl font-bold tracking-tight">CCL</span>
            <span className="hidden border-l hairline pl-3 text-[11px] font-medium uppercase leading-tight tracking-[0.16em] text-ink-mute sm:block">
              Community<br />Co-Creation Labs
            </span>
          </Link>
          <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
            {links.map((l) => <NavLink key={l.to} {...l} className={linkCls}>{l.label}</NavLink>)}
            {user
              ? <button onClick={logout} className="text-sm font-medium text-ink-soft hover:text-ink">Log out</button>
              : <Link to="/admin/login" className="text-sm font-medium text-ink-mute hover:text-ink">Admin</Link>}
          </nav>
          <button className="-mr-2 p-2 md:hidden" aria-expanded={open} aria-controls="mobile-nav" aria-label={open ? 'Close menu' : 'Open menu'} onClick={() => setOpen((o) => !o)}>
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        {open && (
          <nav id="mobile-nav" aria-label="Mobile" className="border-t hairline bg-paper px-5 pb-6 pt-2 md:hidden">
            {links.map((l) => (
              <NavLink key={l.to} {...l} className={({ isActive }) => `block border-b hairline py-4 font-heading text-2xl ${isActive ? 'text-clay' : ''}`}>{l.label}</NavLink>
            ))}
            <Link to={user ? '/admin' : '/admin/login'} className="mt-4 block text-sm text-ink-mute">{user ? 'Admin dashboard' : 'Admin sign in'}</Link>
          </nav>
        )}
      </header>

      <main id="main">{children}</main>

      <footer className="mt-28 bg-ink text-paper">
        <div className="mx-auto max-w-7xl px-5 py-16">
          <p className="font-heading text-4xl font-semibold leading-tight md:text-6xl">
            Communities. Stories. <span className="italic text-[#E39A72]">Change.</span>
          </p>
          <p className="mt-5 max-w-xl text-paper/70">A shared space for local knowledge, collective action, and community-led change.</p>
          <div className="mt-14 grid gap-10 border-t border-paper/15 pt-10 md:grid-cols-3">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-paper/50">Portal</div>
              <ul className="mt-4 space-y-2 text-sm">
                {links.slice(1).map((l) => <li key={l.to}><Link className="inline-flex items-center gap-1 text-paper/80 hover:text-white" to={l.to}>{l.label} <ArrowUpRight size={14} aria-hidden="true" /></Link></li>)}
              </ul>
            </div>
            <div className="md:col-span-2">
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-paper/50">People · Places · Stories</div>
              <p className="mt-4 max-w-md text-sm leading-6 text-paper/70">Every lab keeps its own menu, data and voices. New community information is added through the admin workflow and appears here once reviewed.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
