import { SCENES } from './Scenes'
import type { SceneName } from '../types'

const LIST: SceneName[] = [
  'elephant',
  'zebra',
  'nile',
  'mountain',
  'desert',
  'coast',
  'volcano',
  'jungle',
  'baobab',
  'island',
  'lion',
  'giraffe',
]

/** Дев-галерея всех фонов: открывается по адресу /?scenes */
export function SceneGallery() {
  return (
    <div className="gallery">
      {LIST.map((n) => {
        const C = SCENES[n]
        return (
          <figure key={n} className="gallery__item">
            <div className="gallery__frame">{C()}</div>
            <figcaption>{n}</figcaption>
          </figure>
        )
      })}
    </div>
  )
}
