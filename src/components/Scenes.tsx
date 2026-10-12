import type { ReactNode } from 'react'
import type { SceneName } from '../types'

import elephantBg from '../assets/bg/elephant.jpg'
import zebraBg from '../assets/bg/zebra.jpg'
import nileBg from '../assets/bg/nile.jpg'
import mountainBg from '../assets/bg/mountain.jpg'
import desertBg from '../assets/bg/desert.jpg'
import coastBg from '../assets/bg/coast.jpg'
import volcanoBg from '../assets/bg/volcano.jpg'
import jungleBg from '../assets/bg/jungle.jpg'
import baobabBg from '../assets/bg/baobab.jpg'
import islandBg from '../assets/bg/island.jpg'
import lionBg from '../assets/bg/lion.jpg'
import giraffeBg from '../assets/bg/giraffe.jpg'

interface PhotoScene {
  src: string
  /** Смещение кадра, если сюжет не по центру */
  pos?: string
}

const PHOTOS: Record<SceneName, PhotoScene> = {
  elephant: { src: elephantBg, pos: 'center 55%' },
  zebra: { src: zebraBg },
  nile: { src: nileBg, pos: 'center 60%' },
  mountain: { src: mountainBg, pos: 'center 30%' },
  desert: { src: desertBg },
  coast: { src: coastBg, pos: 'center 45%' },
  volcano: { src: volcanoBg, pos: 'center 40%' },
  jungle: { src: jungleBg, pos: 'center 40%' },
  baobab: { src: baobabBg, pos: 'center 60%' },
  island: { src: islandBg, pos: 'center 45%' },
  lion: { src: lionBg, pos: 'center 35%' },
  giraffe: { src: giraffeBg, pos: 'center 45%' },
}

function PhotoSceneView({ name }: { name: SceneName }) {
  const p = PHOTOS[name]
  return (
    <div
      className="scene scene--photo"
      style={{ backgroundImage: `url(${p.src})`, backgroundPosition: p.pos ?? 'center' }}
      aria-hidden="true"
    >
      <span className="veil" />
    </div>
  )
}

export const SCENES: Record<SceneName, () => ReactNode> = Object.fromEntries(
  (Object.keys(PHOTOS) as SceneName[]).map((k) => [k, () => <PhotoSceneView key={k} name={k} />]),
) as Record<SceneName, () => ReactNode>

export function Scene({ name }: { name: SceneName }) {
  return <PhotoSceneView name={name} />
}
