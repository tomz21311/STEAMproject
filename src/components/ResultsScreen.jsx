function getTrophy(score) {
  if (score === 10) return '🏆'
  if (score >= 7)  return '🥈'
  if (score >= 4)  return '🎖️'
  return '🌈'
}

function getMessage(score) {
  if (score <= 3) return "Keep practicing — you've got this! 💪"
  if (score <= 6) return "Nice work! You're learning so much! 📚"
  if (score <= 8) return "Wow, great job! You're a trivia star! ⭐"
  if (score === 9) return "Almost perfect! You're amazing! 🎉"
  return "PERFECT SCORE! You're a genius! 🏆🎉"
}

export default function ResultsScreen({ score, total, onPlayAgain }) {
  return (
    <div className="results-card">
      <div className="trophy-icon">{getTrophy(score)}</div>

      <div className="results-title">Quiz Complete!</div>

      <p className="results-thanks">
        Thanks for playing Naubuc School Trivia!<br />You're a superstar! 🌟
      </p>

      <div className="score-box">
        <div className="score-number">{score}/{total}</div>
        <div className="score-label">Your Score</div>
      </div>

      <div className="score-message">{getMessage(score)}</div>

      <button className="play-again-btn" onClick={onPlayAgain}>
        ▶ Play Again!
      </button>
    </div>
  )
}
