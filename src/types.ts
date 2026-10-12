export type SceneName =
  | 'elephant'
  | 'zebra'
  | 'nile'
  | 'mountain'
  | 'desert'
  | 'coast'
  | 'volcano'
  | 'jungle'
  | 'baobab'
  | 'island'
  | 'lion'
  | 'giraffe'

export interface Question {
  id: string
  /** Утверждение, которое видит игрок */
  text: string
  /** Правильный ответ на утверждение */
  answer: boolean
  /** Как на самом деле — показывается, если игрок ошибся */
  correct: string
  /** Дополнительный факт */
  note?: string
  scene: SceneName
}

export type Phase = 'home' | 'question' | 'feedback' | 'results'
