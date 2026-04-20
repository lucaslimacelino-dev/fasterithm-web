import { useState } from 'react'
import AccordionItem from './AccordionItem'
import { useAuth } from '../context/AuthContext'

export default function Accordion({ module, onWatch, onUnlock, defaultOpen = false }) {
  const { isLoggedIn } = useAuth()
  const [openId, setOpenId] = useState(defaultOpen ? module.algorithms[0]?.id : null)
  const [moduleOpen, setModuleOpen] = useState(defaultOpen)

  const unlockedCount = module.algorithms.filter(a => !a.locked || isLoggedIn).length
  const total = module.algorithms.length
  const progress = Math.round((unlockedCount / total) * 100)

  const handleToggle = (id) => {
    setOpenId(prev => (prev === id ? null : id))
  }

  return (
    <div className="rounded-2xl border border-zinc-800 overflow-hidden bg-zinc-950 transition-all duration-200">
      {/* Module header — clickable to collapse entire module */}
      <button
        onClick={() => setModuleOpen(p => !p)}
        className="w-full flex items-center gap-4 px-5 py-4 text-left hover:bg-zinc-900/60 transition-colors duration-200 group"
      >
        {/* Icon */}
        <div className="shrink-0 w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 group-hover:border-zinc-700 flex items-center justify-center text-lg transition-colors">
          {module.icon}
        </div>

        {/* Title + meta */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h2 className="font-display text-sm font-bold text-zinc-100">{module.title}</h2>
            <span className="text-[11px] font-body text-zinc-600 bg-zinc-900 border border-zinc-800 px-2 py-0.5 rounded-full">
              {unlockedCount}/{total}
            </span>
          </div>
          <p className="text-xs text-zinc-600 font-body mt-0.5 truncate">{module.description}</p>
        </div>

        {/* Progress bar + chevron */}
        <div className="hidden sm:flex items-center gap-3 shrink-0">
          <div className="w-20 h-1.5 rounded-full bg-zinc-800 overflow-hidden">
            <div
              className="h-full rounded-full bg-brand-500 transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="text-xs text-zinc-600 font-body w-7 text-right">{progress}%</span>
        </div>

        <svg
          className={`shrink-0 w-4 h-4 text-zinc-600 transition-transform duration-300 ${moduleOpen ? 'rotate-180' : ''}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/>
        </svg>
      </button>

      {/* Divider + items */}
      <div
        style={{
          display: moduleOpen ? 'block' : 'none',
        }}
      >
        <div className="border-t border-zinc-800/60">
          {module.algorithms.map((algo, index) => (
            <AccordionItem
              key={algo.id}
              algorithm={algo}
              index={index}
              isOpen={openId === algo.id}
              onToggle={() => handleToggle(algo.id)}
              onWatch={onWatch}
              onUnlock={onUnlock}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
