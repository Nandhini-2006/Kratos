import { useState } from 'react'
import VideoLoop from './components/VideoLoop'
import Hero from './components/Hero'
import Footer from './components/Footer'
import AuthPage from './auth/AuthPage'

type AuthMode = 'signin' | 'signup' | null

export default function App() {
  const [authMode, setAuthMode] = useState<AuthMode>(null)

  return (
    <div
      id="app-root"
      className="relative min-h-screen"
      style={{ backgroundColor: '#000' }}
    >
      <VideoLoop />

      {authMode ? (
        <AuthPage initialMode={authMode} onBack={() => setAuthMode(null)} />
      ) : (
        <>
          <main>
            <Hero onAuth={(mode) => setAuthMode(mode)} />
          </main>
          <Footer />
        </>
      )}
    </div>
  )
}
