import { Route, Routes } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Shell from './components/layout/Shell'
import { NotFound } from './components/ui/States'
import Home from './pages/Home'
import Explore from './pages/Explore'
import CCLDetail from './pages/CCLDetail'
import Stories from './pages/Stories'
import StoryDetail from './pages/StoryDetail'
import About from './pages/About'
import Admin, { AdminLogin } from './pages/Admin'

export default function App() {
  return (
    <AuthProvider>
      <Shell>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/ccl/:slug/:sectionSlug?/:topicSlug?" element={<CCLDetail />} />
          <Route path="/stories" element={<Stories />} />
          <Route path="/stories/:id" element={<StoryDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Shell>
    </AuthProvider>
  )
}
