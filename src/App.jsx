import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import WelcomeScreen from './components/WelcomeScreen'
import QuestionScreen from './components/QuestionScreen'
import ResultsScreen from './components/ResultsScreen'
import { QUESTIONS } from './data/questions'

const SCREEN = { WELCOME: 'welcome', QUESTION: 'question', RESULTS: 'results' }

const slideVariants = {
  initial: { opacity: 0, y: 24, scale: 0.96 },
  animate: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 260, damping: 20 } },
  exit:    { opacity: 0, y: -16, scale: 0.96, transition: { duration: 0.2 } },
}

export default function App() {
  const [screen, setScreen]   = useState(SCREEN.WELCOME)
  const [current, setCurrent] = useState(0)
  const [score, setScore]     = useState(0)

  function handlePlay() {
    setCurrent(0)
    setScore(0)
    setScreen(SCREEN.QUESTION)
  }

  function handleAnswer(isCorrect) {
    if (isCorrect) setScore(s => s + 1)
  }

  function handleNext() {
    if (current + 1 >= QUESTIONS.length) {
      setScreen(SCREEN.RESULTS)
    } else {
      setCurrent(c => c + 1)
    }
  }

  function handlePlayAgain() {
    setScreen(SCREEN.WELCOME)
  }

  return (
    <AnimatePresence mode="wait">
      {screen === SCREEN.WELCOME && (
        <motion.div key="welcome" variants={slideVariants} initial="initial" animate="animate" exit="exit">
          <WelcomeScreen onPlay={handlePlay} />
        </motion.div>
      )}

      {screen === SCREEN.QUESTION && (
        <motion.div key={`q-${current}`} variants={slideVariants} initial="initial" animate="animate" exit="exit">
          <QuestionScreen
            question={QUESTIONS[current]}
            questionIndex={current}
            total={QUESTIONS.length}
            onAnswer={handleAnswer}
            onNext={handleNext}
          />
        </motion.div>
      )}

      {screen === SCREEN.RESULTS && (
        <motion.div key="results" variants={slideVariants} initial="initial" animate="animate" exit="exit">
          <ResultsScreen score={score} total={QUESTIONS.length} onPlayAgain={handlePlayAgain} />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
