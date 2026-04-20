import { useAuth } from '../context/AuthContext'
import { difficultyColor } from '../data/algorithms'

export default function AlgorithmCard({ algorithm, onWatch, onUnlock }) {
  const { isLoggedIn } = useAuth()
  const isAccessible = !algorithm.locked || isLoggedIn

  return (
    <div
      className={`group relative rounded-xl border transition-all duration-200 overflow-hidden
        ${isAccessible
          ? 'border-zinc-800 bg-zinc-900/60 hover:bg-zinc-900 hover:border-zinc-700'
          : 'border-zinc-800/50 bg-zinc-900/30'
        }`}
    >
      {/* Locked overlay tint */}
      {!isAccessible && (
        <div className="absolute inset-0 bg-zinc-950/40 pointer-events-none rounded-xl z-10" />
      )}

      <div className="relative z-20 p-4 flex flex-col gap-3">
        {/* Top row */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h4 className={`font-display text-sm font-bold truncate ${isAccessible ? 'text-zinc-100' : 'text-zinc-500'}`}>
                {algorithm.name}
              </h4>
              {algorithm.locked && !isLoggedIn && (
                <span className="shrink-0 text-zinc-600">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                  </svg>
                </span>
              )}
            </div>
            <p className={`text-xs leading-relaxed line-clamp-2 ${isAccessible ? 'text-zinc-500' : 'text-zinc-600'}`}>
              {algorithm.description}
            </p>
          </div>
        </div>

        {/* Meta */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border font-body ${difficultyColor[algorithm.difficulty]}`}>
            {algorithm.difficulty}
          </span>
          <span className="flex items-center gap-1 text-[11px] text-zinc-600 font-body">
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2m6-2a10 10 0 11-20 0 10 10 0 0120 0z"/>
            </svg>
            {algorithm.duration}
          </span>
        </div>

        {/* Action button */}
        {isAccessible ? (
          <button
            onClick={() => onWatch(algorithm)}
            className="w-full flex items-center justify-center gap-2 py-2 rounded-lg bg-brand-500/10 hover:bg-brand-500 border border-brand-500/30 hover:border-brand-500 text-brand-400 hover:text-zinc-950 text-xs font-semibold font-body transition-all duration-200 group-hover:scale-[1.01]"
          >
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
            </svg>
            Assistir
          </button>
        ) : (
          <button
            onClick={() => onUnlock()}
            className="w-full flex items-center justify-center gap-2 py-2 rounded-lg bg-zinc-800/50 hover:bg-zinc-700/50 border border-zinc-700/50 text-zinc-500 hover:text-zinc-300 text-xs font-semibold font-body transition-all duration-200"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"/>
            </svg>
            Desbloquear
          </button>
        )}
      </div>
    </div>
  )
}
