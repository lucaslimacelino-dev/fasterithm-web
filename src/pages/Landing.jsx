import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'

const benefits = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"/>
      </svg>
    ),
    title: 'Aprenda mais rápido',
    text: 'Lições de até 15 min com foco num único conceito. Sem enrolação.',
    color: 'text-brand-400',
    bg: 'bg-brand-500/10 border-brand-500/20',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z"/>
      </svg>
    ),
    title: 'Pratique de verdade',
    text: 'Desafios interativos com feedback instantâneo logo após cada vídeo.',
    color: 'text-violet-400',
    bg: 'bg-violet-500/10 border-violet-500/20',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"/>
      </svg>
    ),
    title: 'Acompanhe o progresso',
    text: 'Trilhas adaptadas ao seu nível. Do zero às perguntas de entrevista.',
    color: 'text-amber-400',
    bg: 'bg-amber-500/10 border-amber-500/20',
  },
]

export default function Landing() {
  return (
    <div className="min-h-screen bg-zinc-950">
      <Navbar />

      {/* HERO */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-5 overflow-hidden pt-16">
        <div className="absolute inset-0 dot-bg opacity-40 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-brand-500/8 blur-[100px] pointer-events-none" />

        <div className="relative animate-fade-up opacity-0 delay-100 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-brand-500/30 bg-brand-500/10 text-brand-400 text-xs font-semibold tracking-widest uppercase mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-400 animate-pulse-slow" />
          Beta · Acesso gratuito
        </div>

        <h1 className="relative animate-fade-up opacity-0 delay-200 font-display text-5xl sm:text-6xl md:text-7xl font-bold leading-[1.05] tracking-tight max-w-4xl">
          Aprenda{' '}
          <span className="text-brand-400">algoritmos</span>
          <br />em minutos
        </h1>

        <p className="relative animate-fade-up opacity-0 delay-300 mt-6 text-zinc-400 text-lg max-w-xl leading-relaxed font-body">
          Lições curtas em vídeo, organizadas por módulo. Do Bubble Sort ao DFS — domine o essencial para entrevistas e projetos reais.
        </p>

        <div className="relative animate-fade-up opacity-0 delay-400 mt-8 flex flex-col sm:flex-row items-center gap-4">
          <Link
            to="/dashboard"
            className="group inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-brand-500 hover:bg-brand-400 text-zinc-950 font-semibold text-base transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg shadow-brand-500/20"
          >
            Começar grátis
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
            </svg>
          </Link>
          <span className="text-xs text-zinc-600 font-body">Sem cartão de crédito</span>
        </div>

        {/* Stats */}
        <div className="relative animate-fade-up opacity-0 delay-500 mt-14 flex flex-wrap justify-center gap-10">
          {[['13+', 'Algoritmos'], ['3', 'Módulos'], ['100%', 'Grátis pra começar']].map(([v, l]) => (
            <div key={l} className="flex flex-col items-center">
              <span className="font-display text-2xl font-bold text-brand-400">{v}</span>
              <span className="text-xs text-zinc-600 mt-1 font-body">{l}</span>
            </div>
          ))}
        </div>
      </section>

      {/* BENEFITS */}
      <section className="py-24 px-5">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-brand-400 text-xs font-semibold uppercase tracking-widest mb-3 font-body">Por que Fasterithm</p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-zinc-100">O jeito mais rápido de aprender</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {benefits.map((b) => (
              <div key={b.title} className={`rounded-2xl border ${b.bg} p-6 flex flex-col gap-4`}>
                <div className={`w-10 h-10 rounded-xl ${b.bg} flex items-center justify-center ${b.color}`}>
                  {b.icon}
                </div>
                <div>
                  <h3 className="font-display text-base font-bold text-zinc-100 mb-1">{b.title}</h3>
                  <p className="text-sm text-zinc-400 font-body leading-relaxed">{b.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BOTTOM */}
      <section className="py-24 px-5 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[200px] rounded-full bg-brand-500/8 blur-[80px] pointer-events-none" />
        <div className="relative max-w-xl mx-auto text-center">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-zinc-100 mb-4">
            Comece agora, é grátis
          </h2>
          <p className="text-zinc-400 font-body mb-8">
            Acesse os primeiros módulos sem precisar de conta. Faça login para desbloquear tudo.
          </p>
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-brand-500 hover:bg-brand-400 text-zinc-950 font-semibold transition-all hover:scale-105 active:scale-95 shadow-lg shadow-brand-500/20"
          >
            Acessar o Dashboard
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-zinc-800/60 py-8 px-5">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="font-display text-sm font-bold">
            <span className="text-brand-400">Fast</span>
            <span className="text-zinc-500">erithm</span>
          </span>
          <p className="text-xs text-zinc-600 font-body">© {new Date().getFullYear()} Fasterithm. Feito para devs 🇧🇷</p>
          <div className="flex gap-5 text-xs text-zinc-600 font-body">
            <a href="#" className="hover:text-zinc-400 transition-colors">Privacidade</a>
            <a href="#" className="hover:text-zinc-400 transition-colors">Termos</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
