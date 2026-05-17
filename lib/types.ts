export interface Note {
  id: string
  title: string
  body: string
  tags: string[]
  date: string
  createdAt: number
}

export interface CalendarEvent {
  id: string
  title: string
  time: string
  detail: string
  color: 'purple' | 'green' | 'amber'
  day?: number
}

export interface Message {
  id: string
  role: 'user' | 'ai'
  text: string
}
