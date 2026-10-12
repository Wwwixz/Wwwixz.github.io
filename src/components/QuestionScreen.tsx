import { useEffect } from 'react'
import type { Question } from '../types'
import { Header } from './Header'

interface Props {
  q: Question
  number: number
  total: number
  score: number
  onPick: (answer: boolean) => void
}

export function QuestionScreen({ q, number, total, score, onPick }: Props) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const k = e.key.toLowerCase()
      if (k === '1' || k === 'п' || k === 'a') onPick(true)
      if (k === '2' || k === 'л' || k === 'd') onPick(false)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onPick])

  return (
    <div className="screen screen--question">
      <div className="content">
        <Header score={score} number={number} total={total} />
        <div className="q__stage">
          <div className="card">{q.text}</div>
          <div className="answers">
            <button className="answer answer--true" onClick={() => onPick(true)}>
              ПРАВДА
            </button>
            <button className="answer answer--false" onClick={() => onPick(false)}>
              ЛОЖЬ
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
