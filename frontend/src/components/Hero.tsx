// ─── Hero ─────────────────────────────────────────────────────────────────────
// The above-the-fold section that overlays the video.
// Hero content fades out and drifts upward smoothly when scrolling.

import { useEffect, useRef } from 'react'

export default function Hero({ onAuth }: { onAuth: (mode: 'signin' | 'signup') => void }) {
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      const el = contentRef.current
      if (!el) return

      const scrollY = window.scrollY
      const viewH = window.innerHeight

      // Fade starts after 5% of viewport scroll
      const fadeStart = viewH * 0.05

      // Fully faded after 55% of viewport scroll
      const fadeEnd = viewH * 0.55

      if (scrollY <= fadeStart) {
        el.style.opacity = '1'
        el.style.transform = 'translateY(0px)'
      } else if (scrollY >= fadeEnd) {
        el.style.opacity = '0'
        el.style.transform = 'translateY(-32px)'
      } else {
        const progress =
          (scrollY - fadeStart) / (fadeEnd - fadeStart)

        el.style.opacity = String(1 - progress)
        el.style.transform = `translateY(${-32 * progress}px)`
      }
    }

    window.addEventListener('scroll', handleScroll, {
      passive: true,
    })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <section
      id="hero"
      className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 pt-24 pb-32 text-center"
    >
      {/* ── Hero Content ── */}
      <div
        ref={contentRef}
        className="flex w-full flex-col items-center text-center"
        style={{
          transition: 'opacity 0.12s ease, transform 0.12s ease',
        }}
      >
        {/* ── Main Headline ── */}
        <h1
          className="anim-fade-up max-w-5xl font-normal"
          style={{
            fontFamily: "'Times New Roman', Times, serif",
            fontSize: 'clamp(2.6rem, 6.5vw, 5.5rem)',
            lineHeight: 1.02,
            letterSpacing: '-0.02em',
            color: '#fff',
          }}
        >
          Your codebase,{' '}
          <em
            style={{
              color: 'rgba(255,255,255,0.55)',
              fontStyle: 'italic',
            }}
          >
            finally understood.
          </em>
        </h1>

        {/* ── Description ── */}
        <p
          className="anim-fade-up-d1 max-w-2xl leading-relaxed"
          style={{
            fontFamily: "'Times New Roman', Times, serif",
            fontSize: 'clamp(1rem, 1.6vw, 1.2rem)',
            color: 'rgba(255,255,255,0.6)',
            letterSpacing: '0.01em',
            textAlign: 'center',

            // Space between headline and paragraph
            marginTop: '1.5rem',

            // Remove any browser default bottom margin
            marginBottom: '0',
          }}
        >
          CodeMind indexes every function, class, and method in your repo using
          AST parsing and semantic embeddings — then exposes tools like{' '}

          <span
            style={{
              color: 'rgba(255,255,255,0.85)',
              fontStyle: 'italic',
            }}
          >
            find_callers
          </span>
          ,{' '}

          <span
            style={{
              color: 'rgba(255,255,255,0.85)',
              fontStyle: 'italic',
            }}
          >
            explain_function
          </span>
          , and{' '}

          <span
            style={{
              color: 'rgba(255,255,255,0.85)',
              fontStyle: 'italic',
            }}
          >
            suggest_refactor
          </span>{' '}

          — because understanding code structure is not the same as searching
          text.
        </p>

        {/* ── Sign In / Sign Up ── */}
        <div
          className="anim-fade-up-d2 flex items-center justify-center gap-10"
          style={{
            // Explicit spacing — not dependent on Tailwind mt classes
            marginTop: '1.6rem',
          }}
        >
          <button
            onClick={() => onAuth('signin')}
            className="nav-link cursor-pointer border-0 bg-transparent p-0 outline-none"
            style={{
              fontFamily: "'Times New Roman', Times, serif",
              fontSize: '0.85rem',
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: 'rgba(255, 255, 255, 0.88)',
            }}
          >
            Sign In
          </button>

          <button
            onClick={() => onAuth('signup')}
            className="nav-link cursor-pointer border-0 bg-transparent p-0 outline-none"
            style={{
              fontFamily: "'Times New Roman', Times, serif",
              fontSize: '0.85rem',
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: 'rgba(255, 255, 255, 0.88)',
            }}
          >
            Sign Up
          </button>
        </div>
      </div>
    </section>
  )
}