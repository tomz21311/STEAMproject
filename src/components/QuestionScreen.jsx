import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import confetti from 'canvas-confetti'

const CORRECT_MESSAGES = [
  "Good job! That's right! 🎉",
  "Awesome! You got it! 🌟",
  "Yes! You're a star! ⭐",
  "Correct! Way to go! 🎊",
  "Brilliant! You nailed it! 🏆",
]

const WRONG_MESSAGES = [
  "So close! Check the green answer! 😮",
  "Not quite — see the right one in green! 💪",
  "Keep trying! You've got this! 😊",
  "Oops! Look at the green answer! 🌈",
]

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

export default function QuestionScreen({ question, questionIndex, total, onAnswer, onNext }) {
  const [selected, setSelected]   = useState(null)
  const [answered, setAnswered]   = useState(false)
  const [feedback, setFeedback]   = useState(null)  // { text, type }

  function handleSelect(idx) {
    if (answered) return
    const isCorrect = idx === question.correct
    setSelected(idx)
    setAnswered(true)
    onAnswer(isCorrect)

    if (isCorrect) {
      setFeedback({ text: pick(CORRECT_MESSAGES), type: 'correct' })
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#1A56D6', '#FFB700', '#22C55E', '#FF6B6B', '#A855F7'],
      })
    } else {
      setFeedback({ text: pick(WRONG_MESSAGES), type: 'wrong' })
    }
  }

  function handleNext() {
    setSelected(null)
    setAnswered(false)
    setFeedback(null)
    onNext()
  }

  const progress = ((questionIndex + 1) / total) * 100

  function btnClass(idx) {
    if (!answered) return 'answer-btn'
    if (idx === question.correct) return 'answer-btn correct'
    if (idx === selected) return 'answer-btn wrong'
    return 'answer-btn'
  }

  return (
    <div className="question-card">
      <div className="progress-bar-wrap">
        <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
      </div>

      <div className="question-counter">
        Question {questionIndex + 1} of {total}
      </div>

      <div className="question-text">{question.question}</div>

      <div className="answer-grid">
        {question.answers.map((ans, idx) => (
          <button
            key={idx}
            className={btnClass(idx)}
            onClick={() => handleSelect(idx)}
            disabled={answered}
          >
            {ans}
          </button>
        ))}
      </div>

      <AnimatePresence>
        {feedback && (
          <motion.div
            className={`feedback-banner ${feedback.type}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {feedback.text}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {answered && (
          <motion.button
            className="next-btn"
            onClick={handleNext}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 300, damping: 20 } }}
            exit={{ opacity: 0 }}
          >
            {questionIndex + 1 >= total ? 'See Results 🏆' : 'Next ➜'}
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  )
}
