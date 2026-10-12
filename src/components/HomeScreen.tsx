import { Icon } from './Icon'

interface Props {
  onStart: () => void
  onSettings: () => void
}

export function HomeScreen({ onStart, onSettings }: Props) {
  return (
    <div className="screen screen--home">
      <div className="content home">
        <button className="icon-btn home__gear" onClick={onSettings} aria-label="Настройки">
          <Icon name="gear" size={20} />
        </button>
        <div className="home__emblem">
          <Icon name="emblem" size={46} />
        </div>
        <div className="home__kicker">ПРАВДА ИЛИ ЛОЖЬ:</div>
        <h1 className="home__title">АФРИКА</h1>
        <p className="home__sub">Проверь свои знания о самом удивительном континенте!</p>
        <button className="btn-red home__start" onClick={onStart}>
          Начать игру
          <Icon name="arrowRight" size={18} />
        </button>
      </div>
    </div>
  )
}
