import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const { isLoggedIn, user, login, logout } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const isDashboard = location.pathname === '/dashboard'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleLogin = () => {
    login()
    navigate('/dashboard')
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || isDashboard
          ? 'bg-zinc-950/95 backdrop-blur-md border-b border-zinc-800/60'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-5 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <div className="w-7 h-7 rounded-lg bg-brand-500 flex items-center justify-center">
            <svg width="14" height="14" fill="none" viewBox="0 0 14 14">
              <path d="M2 11 L5 7.5 L8 9.5 L12 3" stroke="#09090b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span className="font-display text-base font-bold tracking-tight">
            <span className="text-brand-400">Fast</span>
            <span className="text-zinc-100">erithm</span>
          </span>
        </Link>

        {/* Dashboard breadcrumb */}
        {isDashboard && (
          <span className="hidden sm:block text-xs text-zinc-600 font-body">
            / Dashboard
          </span>
        )}

        <div className="flex items-center gap-3 ml-auto">
          {isLoggedIn ? (
            <>
              {!isDashboard && (
                <Link
                  to="/dashboard"
                  className="hidden sm:inline-flex items-center gap-1.5 text-sm text-zinc-400 hover:text-zinc-100 transition-colors"
                >
                  Dashboard
                </Link>
              )}
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-brand-500/20 border border-brand-500/30 flex items-center justify-center text-xs font-bold text-brand-400 font-display">
                  {user?.avatar}
                </div>
                <span className="hidden sm:block text-sm text-zinc-400 font-body">{user?.name}</span>
              </div>
              <button
                onClick={logout}
                className="text-xs text-zinc-600 hover:text-zinc-300 transition-colors font-body px-2 py-1 rounded-lg hover:bg-zinc-800"
              >
                Sair
              </button>
            </>
          ) : (
            <>
              <button
                onClick={handleLogin}
                className="text-sm text-zinc-400 hover:text-zinc-100 transition-colors font-body hidden sm:block"
              >
                Entrar
              </button>
              <Link
                to="/dashboard"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-500 hover:bg-brand-400 text-zinc-950 text-sm font-semibold transition-all duration-200 hover:scale-105 active:scale-95"
              >
                Começar grátis
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  )
}
