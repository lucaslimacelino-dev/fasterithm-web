import { useState } from 'react'
import Navbar from '../components/Navbar'
import Accordion from '../components/Accordion'
import VideoModal from '../components/VideoModal'
import LoginPrompt from '../components/LoginPrompt'
import { useAuth } from '../context/AuthContext'
import { modules } from '../data/algorithms'

export default function Dashboard() {
  const { isLoggedIn } = useAuth()
  const [activeVideo, setActiveVideo] = useState(null)
  const [showLoginPrompt, setShowLoginPrompt] = useState(false)

  const totalAlgos = modules.reduce((acc, m) => acc + m.algorithms.length, 0)
  const freeAlgos   = modules.reduce((acc, m) => acc + m.algorithms.filter(a => !a.locked).length, 0)
  const accessCount = isLoggedIn ? totalAlgos : freeAlgos

  return (
    <div className="min-h-screen bg-zinc-950">
      <Navbar />

      <div className="pt-16">
        {/* Sticky page header */}
        <div className="border-b border-zinc-800/60 bg-zinc-950/90 backdrop-blur-sm sticky top-16 z-30">
          <div className="max-w-3xl mx-auto px-5 py-5 flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
            <div>
              <h1 className="font-display text-xl font-bold text-zinc-100">Módulos</h1>
              <p className="text-xs text-zinc-500 font-body mt-0.5">
                {accessCount} de {totalAlgos} aulas disponíveis
              </p>
            </div>
            <div className="flex items-center gap-2.5">
              {[
                { label: 'Módulos',   value: modules.length, dot: 'bg-brand-500' },
                { label: 'Aulas',     value: totalAlgos,     dot: 'bg-amber-500' },
                { label: 'Liberadas', value: accessCount,    dot: 'bg-violet-500' },
              ].map(({ label, value, dot }) => (
                <div key={label} className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800">
                  <div className={`w-1.5 h-1.5 rounded-full ${dot}`} />
                  <span className="text-xs font-body text-zinc-400">
                    <span className="text-zinc-200 font-semibold">{value}</span> {label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Not logged in banner */}
        {!isLoggedIn && (
          <div className="max-w-3xl mx-auto px-5 pt-5">
            <div className="flex items-center justify-between gap-4 px-4 py-3 rounded-xl bg-brand-500/8 border border-brand-500/20">
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg bg-brand-500/15 flex items-center justify-center shrink-0">
                  <svg className="w-3.5 h-3.5 text-brand-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <p className="text-sm font-body text-zinc-400">
                  Modo gratuito — <span className="text-zinc-300">{freeAlgos} aulas liberadas.</span> Faça login para desbloquear tudo.
                </p>
              </div>
              <button
                onClick={() => setShowLoginPrompt(true)}
                className="shrink-0 text-xs font-semibold font-body text-brand-400 hover:text-brand-300 transition-colors whitespace-nowrap"
              >
                Entrar →
              </button>
            </div>
          </div>
        )}

        {/* Accordion list */}
        <div className="max-w-3xl mx-auto px-5 py-6 space-y-3 pb-20">
          {modules.map((module, i) => (
            <Accordion
              key={module.id}
              module={module}
              defaultOpen={i === 0}
              onWatch={setActiveVideo}
              onUnlock={() => setShowLoginPrompt(true)}
            />
          ))}
        </div>
      </div>

      {activeVideo && (
        <VideoModal algorithm={activeVideo} onClose={() => setActiveVideo(null)} />
      )}
      {showLoginPrompt && (
        <LoginPrompt onClose={() => setShowLoginPrompt(false)} />
      )}
    </div>
  )
}
