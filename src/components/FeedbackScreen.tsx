import { useEffect } from 'react'
import type { CSSProperties } from 'react'
import type { Question } from '../types'
import { Header } from './Header'
import { Icon } from './Icon'

interface Props {
  q: Question
  picked: boolean
  number: number
  total: number
  score: number
  onNext: () => void
}

export function FeedbackScreen({ q, picked, number, total, score, onNext }: Props) {
  const ok = picked === q.answer

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') onNext()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onNext])

  return (
    <div className="screen screen--feedback">
      <div className="content">
        <Header score={score} number={number} total={total} />
        <div className="fb__stage">
          <div className={`fb__icon ${ok ? 'fb__icon--ok' : 'fb__icon--bad'}`}>
            <Icon name={ok ? 'check' : 'cross'} size={34} />
            {ok && (
              <span className="sparks">
                {Array.from({ length: 10 }, (_, i) => (
                  <i
                    key={i}
                    style={
                      {
                        '--a': `${i * 36}deg`,
                        '--d': `${(i % 5) * 0.18}s`,
                      } as CSSProperties
                    }
                  />
                ))}
              </span>
            )}
          </div>
          <div className={`fb__title ${ok ? '' : 'fb__title--bad'}`}>
            {ok ? 'Правильно!' : 'Неверно!'}
          </div>
          <div className={`fb__panel ${ok ? 'fb__panel--ok' : 'fb__panel--bad'}`}>
            <div className="fb__q">{q.text}</div>
            {ok ? (
              <div className="fb__truth">Это {q.answer ? 'правда' : 'ложь'}!</div>
            ) : (
              <>
                <div className="fb__label">Правильный ответ:</div>
                <div className="fb__box">{q.correct}</div>
                {q.note && <div className="fb__note">{q.note}</div>}
              </>
            )}
          </div>
        </div>
        <div className="fb__footer">
          <button className="btn-next" onClick={onNext}>
            Далее
            <Icon name="arrowRight" size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}
