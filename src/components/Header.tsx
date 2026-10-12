import { Icon } from './Icon'

function Progress({ value, total }: { value: number; total: number }) {
  return (
    <span className="progress" role="img" aria-label={`Прогресс: ${value} из ${total}`}>
      {Array.from({ length: total }, (_, i) => (
        <span key={i} className={i < value ? 'on' : undefined} />
      ))}
    </span>
  )
}

export function Header({ score, number, total }: { score: number; number: number; total: number }) {
  return (
    <div className="hud">
      <span className="hud__score">
        <Icon name="trophy" size={17} />
        Баллы: {score}
      </span>
      <span className="hud__q">
        Вопрос {number} из {total}
      </span>
      <Progress value={number} total={total} />
    </div>
  )
}
