import { useRef, useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { difficultyColor } from '../data/algorithms'

export default function AccordionItem({ algorithm, isOpen, onToggle, onWatch, onUnlock, index }) {
  const { isLoggedIn } = useAuth()
  const isAccessible = !algorithm.locked || isLoggedIn
  const bodyRef = useRef(null)
  const [height, setHeight] = useState(0)

  useEffect(() => {
    if (bodyRef.current) {
      setHeight(isOpen ? bodyRef.current.scrollHeight : 0)
    }
  }, [isOpen])

  return (
    <div
      className={`group border-b border-zinc-800/60 last:border-b-0 transition-colors duration-200
        ${isOpen ? 'bg-zinc-900/80' : 'hover:bg-zinc-900/40'}`}
    >
      {/* Trigger row */}
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-3 px-5 py-4 text-left"
        aria-expanded={isOpen}
      >
        {/* Index number */}
        <span className={`shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold font-display transition-colors
          ${isOpen
            ? 'bg-brand-500 text-zinc-950'
            : 'bg-zinc-800 text-zinc-500 group-hover:text-zinc-300'}`}
        >
          {String(index + 1).padStart(2, '0')}
        </span>

        {/* Name */}
        <span className={`flex-1 font-display text-sm font-bold truncate transition-colors
          ${isOpen ? 'text-zinc-100' : 'text-zinc-300 group-hover:text-zinc-100'}`}>
          {algorithm.name}
        </span>

        {/* Meta pills */}
        <div className="hidden sm:flex items-center gap-2 shrink-0">
          <span className={`text-[11px] font-semibold font-body px-2 py-0.5 rounded-full border ${difficultyColor[algorithm.difficulty]}`}>
            {algorithm.difficulty}
          </span>
          <span className="flex items-center gap-1 text-xs text-zinc-600 font-body">
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2m6-2a10 10 0 11-20 0 10 10 0 0120 0z"/>
            </svg>
            {algorithm.duration}
          </span>
        </div>

        {/* Lock icon or check */}
        <div className="shrink-0 ml-2">
          {isAccessible ? (
            <div className={`w-5 h-5 rounded-full flex items-center justify-center transition-colors
              ${isOpen ? 'text-brand-400' : 'text-zinc-600 group-hover:text-zinc-400'}`}>
              <svg
                className={`w-3.5 h-3.5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/>
              </svg>
            </div>
          ) : (
            <div className="w-5 h-5 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-500">
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
              </svg>
            </div>
          )}
        </div>
      </button>

      {/* Expandable body */}
      <div
        ref={bodyRef}
        style={{ height, overflow: 'hidden', transition: 'height 0.3s cubic-bezier(0.4,0,0.2,1)' }}
        aria-hidden={!isOpen}
      >
        <div className="px-5 pb-5 pt-1">
          {/* Mobile meta (hidden above sm) */}
          <div className="flex items-center gap-2 mb-3 sm:hidden">
            <span className={`text-[11px] font-semibold font-body px-2 py-0.5 rounded-full border ${difficultyColor[algorithm.difficulty]}`}>
              {algorithm.difficulty}
            </span>
            <span className="flex items-center gap-1 text-xs text-zinc-600 font-body">
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2m6-2a10 10 0 11-20 0 10 10 0 0120 0z"/>
              </svg>
              {algorithm.duration}
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-4 pl-9">
            {/* Description */}
            <p className="flex-1 text-sm text-zinc-400 font-body leading-relaxed">
              {algorithm.description}
            </p>

            {/* Action */}
            <div className="shrink-0">
              {isAccessible ? (
                <button
                  onClick={() => onWatch(algorithm)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-400 text-zinc-950 text-xs font-bold font-body transition-all duration-200 hover:scale-105 active:scale-95 shadow-md shadow-brand-500/20"
                >
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                  Assistir
                </button>
              ) : (
                <div className="flex flex-col items-start sm:items-end gap-1.5">
                  <span className="flex items-center gap-1.5 text-[11px] text-zinc-500 font-body">
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                    </svg>
                    Bloqueado
                  </span>
                  <button
                    onClick={() => onUnlock()}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 hover:border-zinc-600 text-zinc-300 hover:text-zinc-100 text-xs font-bold font-body transition-all duration-200"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"/>
                    </svg>
                    Desbloquear
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
