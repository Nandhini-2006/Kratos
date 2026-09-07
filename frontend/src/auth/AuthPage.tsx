import { useState } from 'react'
import { GoogleLogin } from '@react-oauth/google'

type AuthMode = 'signin' | 'signup' | 'forgot'

const API_URL = 'http://localhost:8080/api/auth'

const AppleIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.53 4.09ZM12.03 7.25C11.88 5.02 13.69 3.18 15.77 3c.29 2.58-2.34 4.5-3.74 4.25Z" />
  </svg>
)

const EyeIcon = ({ open }: { open: boolean }) => (
  <svg
    width="17"
    height="17"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    aria-hidden="true"
  >
    {open ? (
      <>
        <path d="M2.5 12s3.2-5 9.5-5 9.5 5 9.5 5-3.2 5-9.5 5-9.5-5-9.5-5Z" />
        <circle cx="12" cy="12" r="2.5" />
      </>
    ) : (
      <>
        <path d="m3 3 18 18" />
        <path d="M10.58 10.58a2 2 0 0 0 2.84 2.84" />
        <path d="M9.88 5.08A10.86 10.86 0 0 1 12 4.87c6.3 0 9.5 7.13 9.5 7.13a16.7 16.7 0 0 1-3.05 3.75M6.61 6.61C3.79 8.42 2.5 12 2.5 12s3.2 7.13 9.5 7.13c1.27 0 2.4-.22 3.4-.58" />
      </>
    )}
  </svg>
)

const ArrowLeft = () => (
  <span aria-hidden="true">←</span>
)

const HomeIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    aria-hidden="true"
  >
    <path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1V10Z" />
  </svg>
)

export default function AuthPage({
  onBack,
  initialMode = 'signin'
}: {
  onBack: () => void
  initialMode?: 'signin' | 'signup'
}) {
  const [mode, setMode] = useState<AuthMode>(initialMode)

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [forgotEmail, setForgotEmail] = useState('')

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const isSignUp = mode === 'signup'
  const isForgot = mode === 'forgot'

  const clearMessages = () => {
    setError('')
    setSuccess('')
  }

  const handleModeChange = (newMode: AuthMode) => {
    clearMessages()
    setMode(newMode)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    clearMessages()

    if (isSignUp && !name.trim()) {
      setError('Please enter your name')
      return
    }

    if (!email.trim()) {
      setError('Please enter your email')
      return
    }

    if (!password.trim()) {
      setError('Please enter your password')
      return
    }

    if (isSignUp && password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    setLoading(true)

    try {
      const response = await fetch(
        `${API_URL}/${isSignUp ? 'register' : 'login'}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(
            isSignUp
              ? {
                  name: name.trim(),
                  email: email.trim(),
                  password
                }
              : {
                  email: email.trim(),
                  password
                }
          )
        }
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(
          data.detail || 'Something went wrong'
        )
      }

      if (isSignUp) {
        setSuccess(
          'Account created successfully. Please sign in.'
        )

        setName('')
        setEmail('')
        setPassword('')
        setConfirmPassword('')

        setMode('signin')
      } else {
        localStorage.setItem(
          'token',
          data.token
        )

        localStorage.setItem(
          'user',
          JSON.stringify(data.user)
        )

        setSuccess('Login successful')

        console.log('Logged in user:', data.user)
        console.log('JWT token:', data.token)
      }
    } catch (err) {
      if (err instanceof TypeError) {
        setError(
          'Cannot connect to the backend. Make sure FastAPI is running on port 8080.'
        )
      } else {
        setError(
          err instanceof Error
            ? err.message
            : 'Something went wrong'
        )
      }
    } finally {
      setLoading(false)
    }
  }

  const handleForgotPassword = async (
    e: React.FormEvent
  ) => {
    e.preventDefault()

    clearMessages()

    if (!forgotEmail.trim()) {
      setError('Please enter your email')
      return
    }

    setLoading(true)

    try {
      const response = await fetch(
        `${API_URL}/forgot-password`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: forgotEmail.trim()
          })
        }
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(
          data.detail || 'Request failed'
        )
      }

      setSuccess(data.message)
    } catch (err) {
      if (err instanceof TypeError) {
        setError(
          'Cannot connect to the backend. Make sure FastAPI is running on port 8080.'
        )
      } else {
        setError(
          err instanceof Error
            ? err.message
            : 'Something went wrong'
        )
      }
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleSuccess = async (
    credential: string
  ) => {
    setLoading(true)
    clearMessages()

    try {
      const response = await fetch(
        `${API_URL}/google`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            credential
          })
        }
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(
          data.detail || 'Google login failed'
        )
      }

      localStorage.setItem(
        'token',
        data.token
      )

      localStorage.setItem(
        'user',
        JSON.stringify(data.user)
      )

      setSuccess('Google login successful')

      console.log('Google user:', data.user)
      console.log('JWT token:', data.token)
    } catch (err) {
      if (err instanceof TypeError) {
        setError(
          'Cannot connect to the backend. Make sure FastAPI is running on port 8080.'
        )
      } else {
        setError(
          err instanceof Error
            ? err.message
            : 'Google login failed'
        )
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="auth-page">

      <div className="auth-page__topbar">

        <button
          className="auth-back"
          onClick={onBack}
          type="button"
        >
          <ArrowLeft />
          <span>Back</span>
        </button>

        <button
          className="auth-home"
          onClick={onBack}
          type="button"
        >
          <HomeIcon />
          <span>Home</span>
        </button>

      </div>

      <div className="auth-shell">

        <div className="auth-card">

          <div className="auth-brand">
            codebase
          </div>

          {!isForgot ? (
            <>

              <div className="auth-heading">

                <h1>
                  {isSignUp
                    ? 'Create your account.'
                    : 'Welcome back.'}
                </h1>

                <p>
                  {isSignUp
                    ? 'Start understanding your codebase.'
                    : 'Continue where you left off.'}
                </p>

              </div>

              <div
                className="auth-tabs"
                role="tablist"
                aria-label="Authentication mode"
              >

                <button
                  className={!isSignUp ? 'active' : ''}
                  onClick={() =>
                    handleModeChange('signin')
                  }
                  type="button"
                >
                  Sign In
                </button>

                <button
                  className={isSignUp ? 'active' : ''}
                  onClick={() =>
                    handleModeChange('signup')
                  }
                  type="button"
                >
                  Sign Up
                </button>

              </div>

              <form
                className="auth-form"
                onSubmit={handleSubmit}
              >

                {isSignUp && (
                  <label className="auth-field">

                    <span>NAME</span>

                    <input
                      type="text"
                      placeholder="Your name"
                      autoComplete="name"
                      value={name}
                      onChange={(e) =>
                        setName(e.target.value)
                      }
                    />

                  </label>
                )}

                <label className="auth-field">

                  <span>EMAIL ADDRESS</span>

                  <input
                    type="email"
                    placeholder="you@example.com"
                    autoComplete="email"
                    value={email}
                    onChange={(e) =>
                      setEmail(e.target.value)
                    }
                  />

                </label>

                <label className="auth-field">

                  <span>PASSWORD</span>

                  <div className="password-wrap">

                    <input
                      type={
                        showPassword
                          ? 'text'
                          : 'password'
                      }
                      placeholder="••••••••"
                      autoComplete={
                        isSignUp
                          ? 'new-password'
                          : 'current-password'
                      }
                      value={password}
                      onChange={(e) =>
                        setPassword(e.target.value)
                      }
                    />

                    <button
                      type="button"
                      className="password-toggle"
                      onClick={() =>
                        setShowPassword(
                          (v) => !v
                        )
                      }
                      aria-label={
                        showPassword
                          ? 'Hide password'
                          : 'Show password'
                      }
                    >
                      <EyeIcon
                        open={showPassword}
                      />
                    </button>

                  </div>

                </label>

                {isSignUp && (
                  <label className="auth-field">

                    <span>
                      CONFIRM PASSWORD
                    </span>

                    <div className="password-wrap">

                      <input
                        type={
                          showConfirm
                            ? 'text'
                            : 'password'
                        }
                        placeholder="••••••••"
                        autoComplete="new-password"
                        value={confirmPassword}
                        onChange={(e) =>
                          setConfirmPassword(
                            e.target.value
                          )
                        }
                      />

                      <button
                        type="button"
                        className="password-toggle"
                        onClick={() =>
                          setShowConfirm(
                            (v) => !v
                          )
                        }
                        aria-label={
                          showConfirm
                            ? 'Hide password'
                            : 'Show password'
                        }
                      >
                        <EyeIcon
                          open={showConfirm}
                        />
                      </button>

                    </div>

                  </label>
                )}

                {!isSignUp && (
                  <button
                    className="forgot-link"
                    type="button"
                    onClick={() =>
                      handleModeChange('forgot')
                    }
                  >
                    Forgot password?
                  </button>
                )}

                {error && (
                  <p className="auth-error">
                    {error}
                  </p>
                )}

                {success && (
                  <p className="auth-success">
                    {success}
                  </p>
                )}

                <button
                  className="auth-primary"
                  type="submit"
                  disabled={loading}
                >
                  {loading
                    ? 'Please wait...'
                    : isSignUp
                      ? 'Create Account'
                      : 'Log In'}
                </button>

              </form>

              <div className="auth-divider">
                <span>
                  OR CONTINUE WITH
                </span>
              </div>

              <div className="social-grid">

                <div className="google-button">

                  <GoogleLogin
                    onSuccess={(credentialResponse) => {
                      if (
                        credentialResponse.credential
                      ) {
                        handleGoogleSuccess(
                          credentialResponse.credential
                        )
                      } else {
                        setError(
                          'Google credential not received'
                        )
                      }
                    }}
                    onError={() => {
                      setError(
                        'Google login failed'
                      )
                    }}
                    theme="filled_black"
                    size="large"
                    text="continue_with"
                    shape="rectangular"
                    width="100%"
                  />

                </div>

                <button
                  type="button"
                  className="social-button apple-button"
                >
                  <AppleIcon />

                  <span>
                    Continue with Apple
                  </span>
                </button>

              </div>

              <p className="auth-switch">

                {isSignUp
                  ? 'Already have an account?'
                  : 'New to CodeMind?'}

                {' '}

                <button
                  type="button"
                  onClick={() =>
                    handleModeChange(
                      isSignUp
                        ? 'signin'
                        : 'signup'
                    )
                  }
                >
                  {isSignUp
                    ? 'Sign In'
                    : 'Create one'}
                </button>

              </p>

            </>
          ) : (

            <>

              <div className="auth-heading">

                <h1>
                  Reset your password.
                </h1>

                <p>
                  Enter your email and we'll send you a reset link.
                </p>

              </div>

              <form
                className="auth-form"
                onSubmit={handleForgotPassword}
              >

                <label className="auth-field">

                  <span>
                    EMAIL ADDRESS
                  </span>

                  <input
                    type="email"
                    placeholder="you@example.com"
                    autoComplete="email"
                    value={forgotEmail}
                    onChange={(e) =>
                      setForgotEmail(
                        e.target.value
                      )
                    }
                  />

                </label>

                {error && (
                  <p className="auth-error">
                    {error}
                  </p>
                )}

                {success && (
                  <p className="auth-success">
                    {success}
                  </p>
                )}

                <button
                  className="auth-primary"
                  type="submit"
                  disabled={loading}
                >
                  {loading
                    ? 'Please wait...'
                    : 'Send Reset Link'}
                </button>

              </form>

              <button
                className="auth-text-button"
                type="button"
                onClick={() =>
                  handleModeChange('signin')
                }
              >
                <ArrowLeft />
                {' '}
                Back to Sign In
              </button>

            </>

          )}

        </div>

      </div>

      <p className="auth-legal">
        By continuing, you agree to Codebase's Terms and Privacy Policy.
      </p>

    </section>
  )
}