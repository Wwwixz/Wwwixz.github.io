import { useEffect } from 'react'
import { Icon } from './Icon'

interface Props {
  score: number
  total: number
  onRestart: () => void
}

function tier(score: number): { badge: string; desc: string; cls: string } {
  if (score >= 100)
    return {
      badge: 'Абсолютный чемпион!',
      desc: 'Идеальный результат! Вы знаете Африку как свой пять пальцев. Так держать!',
      cls: 'res__badge--gold',
    }
  if (score >= 80)
    return {
      badge: 'Вы настоящий знаток Африки!',
      desc: 'Отличный результат! Вы хорошо разбираетесь в географии, природе и культуре этого удивительного континента.',
      cls: 'res__badge--gold',
    }
  if (score >= 60)
    return {
      badge: 'Хороший результат!',
      desc: 'Вы уже многое знаете об Африке. Ещё немного — и вы станете настоящим знатоком!',
      cls: 'res__badge--orange',
    }
  if (score >= 40)
    return {
      badge: 'Есть куда расти!',
      desc: 'Неплохое начало! Узнайте больше интересных фактов об Африке и попробуйте снова.',
      cls: 'res__badge--copper',
    }
  return {
    badge: 'Это только начало!',
    desc: 'Не расстраивайтесь! Африка полна удивительных открытий — сыграйте ещё раз!',
    cls: 'res__badge--gray',
  }
}

export function ResultsScreen({ score, total, onRestart }: Props) {
  const t = tier(score)

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Enter') onRestart()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onRestart])

  return (
    <div className="screen screen--results">
      <div className="content results">
        <div className="res__card">
          <div className="res__trophy">
            <Icon name="trophy" size={38} />
          </div>
          <h2 className="res__heading">Ваш результат</h2>
          <div className="res__score">
            {score} / {total * 10}
          </div>
          <div className="res__unit">Баллов</div>
          <div className={`res__badge ${t.cls}`}>
            <Icon name="star" size={14} />
            {t.badge}
          </div>
          <p className="res__desc">{t.desc}</p>
        </div>
        <button className="btn-red res__again" onClick={onRestart}>
          <Icon name="refresh" size={18} />
          Играть снова
        </button>
      </div>
    </div>
  )
}
