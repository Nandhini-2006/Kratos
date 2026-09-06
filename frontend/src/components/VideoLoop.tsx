import { useEffect, useRef } from 'react'

// ─────────────────────────────────────────────────────────────────────────────
// Background Video
// ─────────────────────────────────────────────────────────────────────────────

const VIDEO_SRC =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260429_115139_0fc6bd3d-3631-4d26-ab9b-28293887dcc9.mp4'

export default function VideoLoop() {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current

    if (!video) return

    // Make sure the video starts playing
    const startVideo = () => {
      video.play().catch(() => {
        // Browser blocked autoplay — nothing to do
      })
    }

    startVideo()

    // Safety net in case the browser stops playback
    const handleEnded = () => {
      video.currentTime = 0
      startVideo()
    }

    video.addEventListener('ended', handleEnded)

    return () => {
      video.removeEventListener('ended', handleEnded)
    }
  }, [])

  return (
    <div
      id="video-bg"
      className="fixed inset-0 z-0 overflow-hidden"
    >
      {/* Background Video */}
      <video
        ref={videoRef}
        src={VIDEO_SRC}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full"
        style={{
          objectFit: 'cover',
          objectPosition: 'center',
        }}
      />

      {/* Overall dark overlay */}
      <div
        className="absolute inset-0"
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.38)',
        }}
      />

      {/* Bottom fade */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.7) 85%, #000 100%)',
        }}
      />

      {/* Top fade */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, transparent 25%)',
        }}
      />
    </div>
  )
}