import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useCCLs } from '../hooks/useCCL'
import { Loading, ErrorBox } from '../components/ui/States'
import PageHeader from '../components/ui/PageHeader'
import { errMsg, place, statusMeta } from '../lib/ccl'

export function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()
  const submit = async (e) => {
    e.preventDefault(); setBusy(true); setError('')
    try { await login(email, password); navigate('/admin') }
    catch (err) { setError(errMsg(err, 'Login failed')) }
    finally { setBusy(false) }
  }
  return (
    <section className="mx-auto max-w-md px-5 py-20 md:py-28">
      <p className="kicker">Administration</p>
      <h1 className="mt-3 text-4xl font-semibold">Sign in</h1>
      <p className="mt-3 text-ink-soft">Manage lab content and portal data.</p>
      {error && <div role="alert" className="mt-6 border border-clay/30 bg-clay/5 p-3 text-sm text-clay-dark">{error}</div>}
      <form onSubmit={submit} className="mt-8 space-y-5">
        <div><label htmlFor="email" className="mb-1.5 block text-sm font-medium">Email</label><input id="email" type="email" autoComplete="username" required className="field" value={email} onChange={(e) => setEmail(e.target.value)} /></div>
        <div><label htmlFor="pw" className="mb-1.5 block text-sm font-medium">Password</label><input id="pw" type="password" autoComplete="current-password" required className="field" value={password} onChange={(e) => setPassword(e.target.value)} /></div>
        <button disabled={busy} className="btn-primary w-full justify-center disabled:opacity-60">{busy ? 'Signing in…' : 'Sign in'}</button>
      </form>
    </section>
  )
}

export default function Admin() {
  const { user } = useAuth()
  const { data, loading, error } = useCCLs()
  if (!user) return (
    <section className="mx-auto max-w-xl px-5 py-24 text-center">
      <h1 className="text-4xl font-semibold">Admin access required</h1>
      <Link className="btn-primary mt-8" to="/admin/login">Sign in</Link>
    </section>
  )
  return (
    <>
      <PageHeader kicker="Administration" title="Lab content overview">Current lab records from MongoDB.</PageHeader>
      <section className="mx-auto max-w-7xl px-5 py-12">
        {loading ? <Loading /> : error ? <ErrorBox message={error} /> : (
          <div className="overflow-x-auto border hairline bg-paper-soft">
            <table className="w-full min-w-[34rem] text-left text-sm">
              <caption className="sr-only">All labs</caption>
              <thead className="border-b hairline text-xs uppercase tracking-wider text-ink-mute"><tr><th scope="col" className="p-4">Lab</th><th scope="col" className="p-4">Location</th><th scope="col" className="p-4">Status</th><th scope="col" className="p-4">Menu sections</th></tr></thead>
              <tbody>{data.map((c) => (
                <tr key={c.slug} className="border-t hairline">
                  <th scope="row" className="p-4 font-semibold">{c.shortName || c.name}</th>
                  <td className="p-4 text-ink-soft">{place(c)}</td>
                  <td className="p-4"><span className="inline-flex items-center gap-2"><span className={`h-1.5 w-1.5 rounded-full ${statusMeta(c.status).dot}`} aria-hidden="true" />{statusMeta(c.status).label}</span></td>
                  <td className="p-4 text-ink-soft">{c.menu?.length || 0}</td>
                </tr>
              ))}</tbody>
            </table>
          </div>
        )}
      </section>
    </>
  )
}
