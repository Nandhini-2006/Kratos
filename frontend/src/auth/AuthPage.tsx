import { useState } from 'react'

type AuthMode = 'signin' | 'signup' | 'forgot'

const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
    <path fill="#4285F4" d="M21.35 12.23c0-.72-.06-1.42-.18-2.09H12v3.96h5.23a4.48 4.48 0 0 1-1.94 2.94v2.45h3.14c1.84-1.69 2.92-4.18 2.92-7.26Z" />
    <path fill="#34A853" d="M12 21.77c2.63 0 4.84-.87 6.45-2.37l-3.14-2.45c-.87.58-1.98.92-3.31.92-2.54 0-4.69-1.72-5.46-4.03H3.3v2.53A9.75 9.75 0 0 0 12 21.77Z" />
    <path fill="#FBBC05" d="M6.54 13.84A5.86 5.86 0 0 1 6.23 12c0-.64.11-1.26.31-1.84V7.63H3.3A9.77 9.77 0 0 0 2.25 12c0 1.58.38 3.08 1.05 4.37l3.24-2.53Z" />
    <path fill="#EA4335" d="M12 6.13c1.43 0 2.71.49 3.72 1.45l2.79-2.79C16.84 3.2 14.63 2.23 12 2.23a9.75 9.75 0 0 0-8.7 5.4l3.24 2.53C7.31 7.85 9.46 6.13 12 6.13Z" />
  </svg>
)

const AppleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.53 4.09ZM12.03 7.25C11.88 5.02 13.69 3.18 15.77 3c.29 2.58-2.34 4.5-3.74 4.25Z" />
  </svg>
)

const EyeIcon = ({ open }: { open: boolean }) => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
    {open ? <><path d="M2.5 12s3.2-5 9.5-5 9.5 5 9.5 5-3.2 5-9.5 5-9.5-5-9.5-5Z" /><circle cx="12" cy="12" r="2.5" /></> : <><path d="m3 3 18 18" /><path d="M10.58 10.58a2 2 0 0 0 2.84 2.84" /><path d="M9.88 5.08A10.86 10.86 0 0 1 12 4.87c6.3 0 9.5 7.13 9.5 7.13a16.7 16.7 0 0 1-3.05 3.75M6.61 6.61C3.79 8.42 2.5 12 2.5 12s3.2 7.13 9.5 7.13c1.27 0 2.4-.22 3.4-.58" /></>}
  </svg>
)

const ArrowLeft = () => <span aria-hidden="true">←</span>
const HomeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
    <path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1V10Z" />
  </svg>
)

export default function AuthPage({ onBack, initialMode = 'signin' }: { onBack: () => void; initialMode?: 'signin' | 'signup' }) {
  const [mode, setMode] = useState<AuthMode>(initialMode)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  const isSignUp = mode === 'signup'
  const isForgot = mode === 'forgot'

  return (
    <section className="auth-page">
      <div className="auth-page__topbar">
        <button className="auth-back" onClick={onBack} type="button"><ArrowLeft /> <span>Back</span></button>
        <button className="auth-home" onClick={onBack} type="button"><HomeIcon /> <span>Home</span></button>
      </div>

      <div className="auth-shell">
        <div className="auth-card">
          <div className="auth-brand">codebase</div>

          {!isForgot ? (
            <>
              <div className="auth-heading">
                <h1>{isSignUp ? 'Create your account.' : 'Welcome back.'}</h1>
                <p>{isSignUp ? 'Start understanding your codebase.' : 'Continue where you left off.'}</p>
              </div>

              <div className="auth-tabs" role="tablist" aria-label="Authentication mode">
                <button className={!isSignUp ? 'active' : ''} onClick={() => setMode('signin')} type="button">Sign In</button>
                <button className={isSignUp ? 'active' : ''} onClick={() => setMode('signup')} type="button">Sign Up</button>
              </div>

              <form className="auth-form" onSubmit={(e) => e.preventDefault()}>
                {isSignUp && (
                  <label className="auth-field">
                    <span>NAME</span>
                    <input type="text" placeholder="Your name" autoComplete="name" />
                  </label>
                )}

                <label className="auth-field">
                  <span>EMAIL ADDRESS</span>
                  <input type="email" placeholder="you@example.com" autoComplete="email" />
                </label>

                <label className="auth-field">
                  <span>PASSWORD</span>
                  <div className="password-wrap">
                    <input type={showPassword ? 'text' : 'password'} placeholder="••••••••" autoComplete={isSignUp ? 'new-password' : 'current-password'} />
                    <button type="button" className="password-toggle" onClick={() => setShowPassword((v) => !v)} aria-label={showPassword ? 'Hide password' : 'Show password'}><EyeIcon open={showPassword} /></button>
                  </div>
                </label>

                {isSignUp && (
                  <label className="auth-field">
                    <span>CONFIRM PASSWORD</span>
                    <div className="password-wrap">
                      <input type={showConfirm ? 'text' : 'password'} placeholder="••••••••" autoComplete="new-password" />
                      <button type="button" className="password-toggle" onClick={() => setShowConfirm((v) => !v)} aria-label={showConfirm ? 'Hide password' : 'Show password'}><EyeIcon open={showConfirm} /></button>
                    </div>
                  </label>
                )}

                {!isSignUp && <button className="forgot-link" type="button" onClick={() => setMode('forgot')}>Forgot password?</button>}

                <button className="auth-primary" type="submit">{isSignUp ? 'Create Account' : 'Log In'}</button>
              </form>

              <div className="auth-divider"><span>OR CONTINUE WITH</span></div>
              <div className="social-grid">
                <button type="button" className="social-button"><GoogleIcon /><span>Google</span></button>
                <button type="button" className="social-button"><AppleIcon /><span>Apple</span></button>
              </div>

              <p className="auth-switch">{isSignUp ? 'Already have an account?' : 'New to CodeMind?'} <button type="button" onClick={() => setMode(isSignUp ? 'signin' : 'signup')}>{isSignUp ? 'Sign In' : 'Create one'}</button></p>
            </>
          ) : (
            <>
              <div className="auth-heading">
                <h1>Reset your password.</h1>
                <p>Enter your email and we'll send you a reset link.</p>
              </div>
              <form className="auth-form" onSubmit={(e) => e.preventDefault()}>
                <label className="auth-field">
                  <span>EMAIL ADDRESS</span>
                  <input type="email" placeholder="you@example.com" autoComplete="email" />
                </label>
                <button className="auth-primary" type="submit">Send Reset Link</button>
              </form>
              <button className="auth-text-button" type="button" onClick={() => setMode('signin')}><ArrowLeft /> Back to Sign In</button>
            </>
          )}
        </div>
      </div>

      <p className="auth-legal">By continuing, you agree to Codebase's Terms and Privacy Policy.</p>
    </section>
  )
}
