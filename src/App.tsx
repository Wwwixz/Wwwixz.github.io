import { useState } from 'react'
import type { Phase, Question, SceneName } from './types'
import { QUESTIONS, shuffle } from './data/questions'
import { Scene } from './components/Scenes'
import { HomeScreen } from './components/HomeScreen'
import { QuestionScreen } from './components/QuestionScreen'
import { FeedbackScreen } from './components/FeedbackScreen'
import { ResultsScreen } from './components/ResultsScreen'
import { SettingsModal } from './components/SettingsModal'
import { sfx } from './sound'

const params = new URLSearchParams(window.location.search)
/** Дев-режим: /?quick — игра из 2 вопросов (для быстрой проверки экрана результатов) */
const QUICK = params.has('quick')

const TOTAL_POINTS = 10

export default function App() {
  const [phase, setPhase] = useState<Phase>('home')
  const [questions, setQuestions] = useState<Question[]>([])
  const [index, setIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [picked, setPicked] = useState<boolean | null>(null)
  const [settingsOpen, setSettingsOpen] = useState(false)

  const current = questions[index]

  const start = () => {
    sfx.start()
    setQuestions(shuffle(QUICK ? QUESTIONS.slice(0, 2) : QUESTIONS))
    setIndex(0)
    setScore(0)
    setPicked(null)
    setPhase('question')
  }

  const pick = (answer: boolean) => {
    if (!current || picked !== null) return
    const isCorrect = answer === current.answer
    setPicked(answer)
    if (isCorrect) setScore((s) => s + TOTAL_POINTS)
    if (isCorrect) sfx.correct()
    else sfx.wrong()
    setPhase('feedback')
  }

  const next = () => {
    if (index + 1 >= questions.length) {
      sfx.finish()
      setPhase('results')
    } else {
      sfx.click()
      setIndex((i) => i + 1)
      setPicked(null)
      setPhase('question')
    }
  }

  const bg: SceneName =
    phase === 'home'
      ? 'elephant'
      : phase === 'results'
        ? 'giraffe'
        : current
          ? current.scene
          : 'elephant'

  const tint =
    phase === 'feedback'
      ? picked !== null && current && picked === current.answer
        ? 'tint--ok'
        : 'tint--bad'
      : phase === 'results'
        ? 'tint--res'
        : ''

  return (
    <div className="app">
      <div className="scene-wrap">
        <Scene name={bg} />
      </div>
      <div className={`tint ${tint}`} />
      {phase === 'home' && (
        <HomeScreen
          onStart={start}
          onSettings={() => {
            sfx.click()
            setSettingsOpen(true)
          }}
        />
      )}
      {phase === 'question' && current && (
        <QuestionScreen
          key={index}
          q={current}
          number={index + 1}
          total={questions.length}
          score={score}
          onPick={pick}
        />
      )}
      {phase === 'feedback' && current && picked !== null && (
        <FeedbackScreen
          key={`fb-${index}`}
          q={current}
          picked={picked}
          number={index + 1}
          total={questions.length}
          score={score}
          onNext={next}
        />
      )}
      {phase === 'results' && (
        <ResultsScreen score={score} total={questions.length} onRestart={start} />
      )}
      {settingsOpen && <SettingsModal onClose={() => setSettingsOpen(false)} />}
    </div>
  )
}
