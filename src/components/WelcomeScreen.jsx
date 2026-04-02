import { useState } from 'react'

// Fallback owl SVG used until /public/mascot.png is provided
function OwlSVG() {
  return (
    <svg viewBox="0 0 76 76" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="38" cy="44" rx="22" ry="24" fill="#fff" fillOpacity="0.9"/>
      <ellipse cx="28" cy="36" rx="9" ry="9" fill="#fff"/>
      <ellipse cx="48" cy="36" rx="9" ry="9" fill="#fff"/>
      <circle cx="28" cy="36" r="5" fill="#1A56D6"/>
      <circle cx="48" cy="36" r="5" fill="#1A56D6"/>
      <circle cx="29.5" cy="34.5" r="1.5" fill="#fff"/>
      <circle cx="49.5" cy="34.5" r="1.5" fill="#fff"/>
      <ellipse cx="38" cy="44" rx="4" ry="3" fill="#FFB700"/>
      <rect x="24" y="18" width="10" height="6" rx="3" fill="#fff" fillOpacity="0.9" transform="rotate(-15 24 18)"/>
      <rect x="42" y="18" width="10" height="6" rx="3" fill="#fff" fillOpacity="0.9" transform="rotate(15 42 18)"/>
      <rect x="29" y="56" width="5" height="8" rx="2" fill="#FFB700"/>
      <rect x="42" y="56" width="5" height="8" rx="2" fill="#FFB700"/>
    </svg>
  )
}

// Mascot is served from /public/mascot.png — drop the file there to activate it.
// If the file doesn't exist, the owl placeholder is shown instead.
export default function WelcomeScreen({ onPlay }) {
  const [mascotLoaded, setMascotLoaded] = useState(false)

  return (
    <div className="welcome-card">
      <div className="hello-text">Hello!</div>

      <div className="mascot-wrap">
        <img
          src="/mascot.png"
          alt="Naubuc School mascot"
          style={{ display: mascotLoaded ? 'block' : 'none' }}
          onLoad={() => setMascotLoaded(true)}
        />
        {!mascotLoaded && <OwlSVG />}
      </div>

      <div className="quiz-title">Naubuc School Trivia</div>

      <button className="play-btn" onClick={onPlay} aria-label="Play">
        <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
      </button>

      <div className="play-label">Tap to Play!</div>

      <div className="star-row">
        <span className="star">⭐</span>
        <span className="star">🌟</span>
        <span className="star">✨</span>
      </div>
    </div>
  )
}
