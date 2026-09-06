// ─── Footer ───────────────────────────────────────────────────────────────────
// Site footer with three columns: Brand, Product links, and Connect links.
// Plus a bottom bar with copyright and legal links.

// ── Footer link columns data ──
// Add/remove columns or links here; layout adjusts automatically
const COLUMNS = [
  {
    heading: 'Product',
    links: ['MCP Server', 'AST Parser', 'Embeddings', 'Dependency Graph', 'Changelog'],
  },
  {
    heading: 'Connect',
    links: ['GitHub', 'Documentation', 'API Reference', 'Reach Us'],
  },
]

export default function Footer() {
  return (
    // ── Footer wrapper ──
    // Fully transparent — video shows through beneath the footer text
    // px-8 py-20: horizontal/vertical footer padding — adjust for more/less space
    <footer
      id="footer"
      className="relative z-10 w-full px-8 py-20"
      style={{ backgroundColor: 'transparent' }}
    >
      <div className="mx-auto max-w-6xl">

        {/* ── Upper footer: brand + columns ──
            grid splits into brand (2fr) + columns (1fr each) on desktop */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">

          {/* ── Brand column ── */}
          <div className="flex flex-col gap-5 md:col-span-1">
            {/* Brand name — same Times Roman as navbar */}
            <span
              style={{
                fontFamily: "'Times New Roman', Times, serif",
                fontSize: '1.4rem',      // brand name size in footer
                letterSpacing: '0.04em',
                color: '#fff',
              }}
            >
              CodeMind
            </span>

            {/* Brand tagline */}
            <p
              style={{
                fontFamily: "'Times New Roman', Times, serif",
                fontSize: '0.85rem',
                color: 'rgba(255,255,255,0.38)',  // tagline muted colour
                lineHeight: 1.75,
                maxWidth: '240px',
              }}
            >
              Code intelligence for agentic systems.
              Structure over text — always.
            </p>

            {/* ── Social / quick links row ── */}
            <div className="flex gap-5">
              {['GitHub', 'Twitter', 'LinkedIn'].map((s) => (
                <a
                  key={s}
                  href="#"
                  id={`footer-social-${s.toLowerCase()}`}
                  className="nav-link"   /* reuse nav-link underline animation */
                  style={{
                    fontFamily: "'Times New Roman', Times, serif",
                    fontSize: '0.75rem',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: 'rgba(255,255,255,0.4)',  // social link colour
                    textDecoration: 'none',
                  }}
                >
                  {s}
                </a>
              ))}
            </div>
          </div>

          {/* ── Link columns ── */}
          {COLUMNS.map((col) => (
            <div key={col.heading} className="flex flex-col gap-5">
              {/* Column heading */}
              <h4
                style={{
                  fontFamily: "'Times New Roman', Times, serif",
                  fontSize: '0.7rem',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.3)',  // column heading muted colour
                }}
              >
                {col.heading}
              </h4>

              {/* Column links — each uses nav-link underline class */}
              <ul className="flex flex-col gap-3" style={{ listStyle: 'none' }}>
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      id={`footer-link-${link.toLowerCase().replace(/\s/g, '-')}`}
                      className="nav-link"
                      style={{
                        fontFamily: "'Times New Roman', Times, serif",
                        fontSize: '0.85rem',
                        color: 'rgba(255,255,255,0.45)',  // footer link colour — change for more contrast
                        textDecoration: 'none',
                      }}
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ── Bottom bar: copyright + legal ──
            mt-16 pt-8 border-t: visual separator from column content above */}
        <div
          className="mt-16 flex flex-col items-center justify-between gap-4 border-t pt-8 sm:flex-row"
          style={{ borderColor: 'rgba(255,255,255,0.07)' }}
        >
          {/* Copyright */}
          <p
            style={{
              fontFamily: "'Times New Roman', Times, serif",
              fontSize: '0.75rem',
              color: 'rgba(255,255,255,0.25)',  // copyright muted colour
              letterSpacing: '0.05em',
            }}
          >
            © {new Date().getFullYear()} CodeMind. All rights reserved.
          </p>

          {/* Legal links */}
          <div className="flex gap-6">
            {['Terms', 'Privacy', 'Cookies'].map((item) => (
              <a
                key={item}
                href="#"
                id={`footer-legal-${item.toLowerCase()}`}
                className="nav-link"
                style={{
                  fontFamily: "'Times New Roman', Times, serif",
                  fontSize: '0.75rem',
                  color: 'rgba(255,255,255,0.25)',  // legal link colour
                  textDecoration: 'none',
                  letterSpacing: '0.08em',
                }}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
