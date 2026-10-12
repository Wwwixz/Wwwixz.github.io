import { useState } from 'react'
import { Icon } from './Icon'
import { isSoundOn, setSoundOn, sfx } from '../sound'

export function SettingsModal({ onClose }: { onClose: () => void }) {
  const [sound, setSound] = useState(isSoundOn())

  const toggle = () => {
    const v = !sound
    setSound(v)
    setSoundOn(v)
    if (v) sfx.click()
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()} role="dialog" aria-label="Настройки">
        <div className="modal__head">
          <h3>Настройки</h3>
          <button className="icon-btn" onClick={onClose} aria-label="Закрыть">
            <Icon name="cross" size={14} />
          </button>
        </div>
        <div className="modal__row">
          <span>Звуковые эффекты</span>
          <button
            className={`switch ${sound ? 'on' : ''}`}
            onClick={toggle}
            role="switch"
            aria-checked={sound}
            aria-label="Звуковые эффекты"
          />
        </div>
        <p className="modal__hint">
          Управление с клавиатуры: «П» — правда, «Л» — ложь, Enter — далее.
        </p>
      </div>
    </div>
  )
}
