// ─── HowItWorks ───────────────────────────────────────────────────────────────
// Numbered step section explaining the ingestion → indexing → tool-access pipeline.

const STEPS = [
  {
    num: '01',
    title: 'Point at a repo',
    body: 'Provide a local path or GitHub URL. The ingestion engine clones and crawls every file.',
  },
  {
    num: '02',
    title: 'AST parses every symbol',
    body: 'tree-sitter extracts functions, classes, and methods. Each symbol is indexed independently — not file chunks.',
  },
  {
    num: '03',
    title: 'Embeddings + graph built',
    body: 'Per-symbol vector embeddings land in Qdrant. Caller → callee edges and import chains are stored in MySQL.',
  },
  {
    num: '04',
    title: 'MCP tools go live',
    body: 'Your agent or IDE calls find_callers, trace_dependency_graph, and suggest_refactor in milliseconds.',
  },
]

export default function HowItWorks() {
  return (
    // ── Section wrapper ──
    // bg-[#050505]: near-black bg variant — change to #000 or any dark shade
    // py-28: vertical padding — adjust for more/less space between sections
    <section
      id="how-it-works"
      className="relative z-10 w-full px-6 py-28"
      style={{ backgroundColor: '#050505' }}
    >
      <div className="mx-auto max-w-6xl">

        {/* ── Section header ── */}
        <div className="mb-20 text-center">
          <p
            className="mb-3 text-xs uppercase tracking-[0.22em]"
            style={{
              fontFamily: "'Times New Roman', Times, serif",
              color: 'rgba(255,255,255,0.3)',  // eyebrow muted colour
            }}
          >
            How It Works
          </p>
          <h2
            className="font-normal"
            style={{
              fontFamily: "'Times New Roman', Times, serif",
              fontSize: 'clamp(1.9rem, 3.5vw, 3rem)',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              color: '#fff',
            }}
          >
            Four steps to{' '}
            <em style={{ color: 'rgba(255,255,255,0.4)', fontStyle: 'italic' }}>
              total clarity.
            </em>
          </h2>
        </div>

        {/* ── Steps grid ──
            lg:grid-cols-4 shows all four horizontally on desktop
            gap-6: spacing between step cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step) => (
            <div
              key={step.num}
              id={`step-${step.num}`}
              className="flex flex-col gap-4 rounded-2xl border p-8"
              style={{
                borderColor: 'rgba(255,255,255,0.08)',      // step card border
                backgroundColor: 'rgba(255,255,255,0.02)',  // step card tint
              }}
            >
              {/* ── Step number ──
                  Large display number; muted so it doesn't overpower the title.
                  Change color and fontFamily to restyle the numerals. */}
              <span
                style={{
                  fontFamily: "'Times New Roman', Times, serif",
                  fontSize: '3rem',
                  color: 'rgba(255,255,255,0.1)',  // number colour — increase opacity to make bolder
                  lineHeight: 1,
                  letterSpacing: '-0.04em',
                }}
              >
                {step.num}
              </span>

              {/* ── Step title ── */}
              <h3
                style={{
                  fontFamily: "'Times New Roman', Times, serif",
                  fontSize: '1rem',
                  color: '#fff',         // step title colour
                  fontWeight: 400,
                }}
              >
                {step.title}
              </h3>

              {/* ── Step body ── */}
              <p
                style={{
                  fontFamily: "'Times New Roman', Times, serif",
                  fontSize: '0.85rem',
                  color: 'rgba(255,255,255,0.42)',  // step body muted colour
                  lineHeight: 1.7,
                }}
              >
                {step.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
