export type IconName =
  | 'trophy'
  | 'gear'
  | 'check'
  | 'cross'
  | 'star'
  | 'arrowRight'
  | 'arrowLeft'
  | 'refresh'
  | 'users'
  | 'chat'
  | 'soundOn'
  | 'soundOff'
  | 'emblem'

interface IconProps {
  name: IconName
  size?: number
}

const stroke = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2.4,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
}

export function Icon({ name, size = 20 }: IconProps) {
  switch (name) {
    case 'trophy':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" {...stroke} aria-hidden="true">
          <path d="M8 21h8" />
          <path d="M12 17v4" />
          <path d="M7 4h10v5a5 5 0 0 1-10 0V4Z" />
          <path d="M7 5H4v2a3 3 0 0 0 3 3" />
          <path d="M17 5h3v2a3 3 0 0 1-3 3" />
        </svg>
      )
    case 'gear':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M19.14 12.94a7.07 7.07 0 0 0 0-1.88l2.03-1.58a.5.5 0 0 0 .12-.64l-1.92-3.32a.5.5 0 0 0-.61-.22l-2.39.96a7.03 7.03 0 0 0-1.62-.94l-.36-2.54a.5.5 0 0 0-.5-.42h-3.84a.5.5 0 0 0-.5.42l-.36 2.54c-.59.24-1.13.56-1.62.94l-2.39-.96a.5.5 0 0 0-.61.22L2.65 8.84a.5.5 0 0 0 .12.64L4.8 11.06a7.07 7.07 0 0 0 0 1.88L2.77 14.52a.5.5 0 0 0-.12.64l1.92 3.32c.14.24.42.34.61.22l2.39-.96c.49.38 1.03.7 1.62.94l.36 2.54c.04.24.25.42.5.42h3.84c.25 0 .46-.18.5-.42l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.23.09.5 0 .61-.22l1.92-3.32a.5.5 0 0 0-.12-.64l-2.03-1.58ZM12 15.6a3.6 3.6 0 1 1 0-7.2 3.6 3.6 0 0 1 0 7.2Z" />
        </svg>
      )
    case 'check':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" {...stroke} strokeWidth={3} aria-hidden="true">
          <path d="M4.5 12.8l5 5L19.5 7" />
        </svg>
      )
    case 'cross':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" {...stroke} strokeWidth={3} aria-hidden="true">
          <path d="M6.5 6.5l11 11M17.5 6.5l-11 11" />
        </svg>
      )
    case 'star':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      )
    case 'arrowRight':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" {...stroke} aria-hidden="true">
          <path d="M4 12h15" />
          <path d="M13 6l6 6-6 6" />
        </svg>
      )
    case 'arrowLeft':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" {...stroke} aria-hidden="true">
          <path d="M20 12H5" />
          <path d="M11 6l-6 6 6 6" />
        </svg>
      )
    case 'refresh':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" {...stroke} aria-hidden="true">
          <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8" />
          <path d="M21 3v5h-5" />
        </svg>
      )
    case 'users':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" {...stroke} aria-hidden="true">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      )
    case 'chat':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" {...stroke} aria-hidden="true">
          <path d="M21 11.5a8.38 8.38 0 0 1-8.5 8.5c-1.5 0-3-.4-4.2-1.1L3 21l2.1-5.3A8.5 8.5 0 1 1 21 11.5Z" />
        </svg>
      )
    case 'soundOn':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" {...stroke} aria-hidden="true">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="currentColor" stroke="none" />
          <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
        </svg>
      )
    case 'soundOff':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" {...stroke} aria-hidden="true">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="currentColor" stroke="none" />
          <path d="M16 9l6 6M22 9l-6 6" />
        </svg>
      )
    case 'emblem':
      return (
        <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden="true">
          <g fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round">
            <path d="M11 42L34 9" />
            <path d="M37 42L14 9" />
            <circle cx="24" cy="26" r="5" />
          </g>
          <path d="M34 9l5.5-6.5-9.5 2.5z" fill="currentColor" />
          <path d="M14 9L8.5 2.5 18 5z" fill="currentColor" />
        </svg>
      )
  }
}
