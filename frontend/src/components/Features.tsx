// ─── Features ─────────────────────────────────────────────────────────────────
// "What it does" section — explains the four core MCP tools.
// Sits below the hero in the solid-black content area.

// ── Feature card data ──
// Add/remove items here; layout auto-adjusts (CSS grid)
const FEATURES = [
  {
    id: 'find-callers',
    // Icon: simple SVG shape — swap with any inline SVG or icon component
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <circle cx="11" cy="11" r="9" stroke="currentColor" strokeWidth="1.3" />
        <path d="M7 11h8M11 7l4 4-4 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: 'find_callers()',
    body: 'Returns every call site for a given function across the entire repository. Never grep — always structured.',
  },
  {
    id: 'explain-function',
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <rect x="2" y="2" width="18" height="18" rx="4" stroke="currentColor" strokeWidth="1.3" />
        <path d="M7 7h8M7 11h5M7 15h6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      </svg>
    ),
    title: 'explain_function()',
    body: 'Summarises purpose, parameters, and side effects in plain English — grounded in AST structure, not guesswork.',
  },
  {
    id: 'trace-dependency-graph',
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <circle cx="4" cy="11" r="2.5" stroke="currentColor" strokeWidth="1.3" />
        <circle cx="18" cy="5" r="2.5" stroke="currentColor" strokeWidth="1.3" />
        <circle cx="18" cy="17" r="2.5" stroke="currentColor" strokeWidth="1.3" />
        <path d="M6.4 10.1L15.6 6M6.4 11.9L15.6 16" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    ),
    title: 'trace_dependency_graph()',
    body: 'Walks caller→callee edges and import chains from any root symbol. Visual graph of how code connects.',
  },
  {
    id: 'suggest-refactor',
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M5 17L11 5L17 17" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M7.5 13h7" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      </svg>
    ),
    title: 'suggest_refactor()',
    body: 'Proposes structural improvements with full codebase context. Not text matching — semantic structural reasoning.',
  },
]

export default function Features() {
  return (
    // ── Section wrapper ──
    // bg-black: solid black to contrast with the video hero above
    // py-28 px-6: vertical/horizontal section padding — change for tighter/looser spacing
    <section
      id="features"
      className="relative z-10 w-full bg-black px-6 py-28"
    >
      <div className="mx-auto max-w-6xl">

        {/* ── Section header ── */}
        <div className="mb-20 text-center">
          {/* Eyebrow */}
          <p
            className="mb-3 text-xs uppercase tracking-[0.22em]"
            style={{
              fontFamily: "'Times New Roman', Times, serif",
              color: 'rgba(255,255,255,0.35)',  // very muted — change for more visibility
            }}
          >
            Core Capabilities
          </p>

          {/* Section heading ──
              Change fontSize clamp to scale heading for different breakpoints */}
          <h2
            className="font-normal"
            style={{
              fontFamily: "'Times New Roman', Times, serif",
              fontSize: 'clamp(1.9rem, 3.5vw, 3rem)',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              color: '#fff',                    // section heading colour
            }}
          >
            Beyond text search —
            <em style={{ color: 'rgba(255,255,255,0.45)', fontStyle: 'italic' }}>
              {' '}structural intelligence.
            </em>
          </h2>

          {/* Section sub-copy */}
          <p
            className="mx-auto mt-4 max-w-xl"
            style={{
              fontFamily: "'Times New Roman', Times, serif",
              fontSize: '1rem',
              color: 'rgba(255,255,255,0.45)',  // muted body — change for contrast
              lineHeight: 1.75,
            }}
          >
            Combining tree-sitter static analysis with Qdrant vector embeddings,
            CodeMind understands what your code <em>means</em>, not just what it says.
          </p>
        </div>

        {/* ── Feature cards grid ──
            grid-cols changes based on screen width.
            gap-6: card spacing — increase for breathing room */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((f) => (
            <div
              key={f.id}
              id={`feature-${f.id}`}
              // ── Card container ──
              // rounded-2xl + border: card shape and outline
              // p-7: internal card padding
              // hover:-translate-y-1: subtle lift on hover
              className="flex flex-col gap-5 rounded-2xl border p-7 transition-transform duration-300 hover:-translate-y-1"
              style={{
                borderColor: 'rgba(255,255,255,0.1)',  // card border — change opacity for visibility
                backgroundColor: 'rgba(255,255,255,0.03)', // card bg tint — change for glassmorphism
              }}
            >
              {/* ── Icon wrapper ── */}
              <div
                className="flex h-10 w-10 items-center justify-center rounded-xl"
                style={{
                  backgroundColor: 'rgba(255,255,255,0.07)', // icon bg
                  color: 'rgba(255,255,255,0.6)',             // icon colour
                }}
              >
                {f.icon}
              </div>

              {/* ── Card title (tool name) ── */}
              <h3
                className="font-normal"
                style={{
                  fontFamily: "'Times New Roman', Times, serif",
                  fontSize: '0.95rem',
                  color: '#fff',              // card title colour
                  letterSpacing: '0.01em',
                }}
              >
                {f.title}
              </h3>

              {/* ── Card body text ── */}
              <p
                style={{
                  fontFamily: "'Times New Roman', Times, serif",
                  fontSize: '0.85rem',
                  color: 'rgba(255,255,255,0.45)', // card description colour
                  lineHeight: 1.7,
                }}
              >
                {f.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
