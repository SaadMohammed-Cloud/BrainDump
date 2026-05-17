'use client'
import { useState } from 'react'
import { CalendarEvent } from '@/lib/types'

const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December']
const DAYS = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']

const COLOR_MAP = {
  purple: { cell: 'bg-brand-light text-brand', dot: 'bg-brand', ev: 'bg-brand-light text-brand' },
  green:  { cell: 'bg-green-100 text-green-700', dot: 'bg-green-600', ev: 'bg-green-100 text-green-700' },
  amber:  { cell: 'bg-amber-100 text-amber-700', dot: 'bg-amber-500', ev: 'bg-amber-100 text-amber-700' },
}

interface CalendarPanelProps { events: CalendarEvent[] }

export default function CalendarPanel({ events }: CalendarPanelProps) {
  const [date, setDate] = useState(new Date())

  const today = new Date()
  const firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  const daysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()

  const eventsOnDay = (day: number) => events.filter(e => e.day === day)

  const upcomingEvents = [
    { time: '9:00 AM', name: 'Team standup', detail: 'Daily sync · 15 min', color: 'purple' as const },
    { time: '2:00 PM', name: 'Product review', detail: 'Design team · Conf room A', color: 'amber' as const },
    { time: '4:30 PM', name: '1:1 with Alex', detail: 'Engineering · Video call', color: 'purple' as const },
    { time: 'Tomorrow', name: 'Sprint planning', detail: 'Full team · 2 hours', color: 'green' as const },
  ]

  return (
    <div className="flex-1 overflow-y-auto p-5 bg-gray-50">
      {/* Month nav */}
      <div className="flex items-center gap-3 mb-3">
        <button onClick={() => setDate(new Date(date.getFullYear(), date.getMonth() - 1, 1))}
          className="border border-gray-200 rounded-lg px-2 py-1 text-gray-500 hover:bg-white text-sm flex items-center">
          <i className="ti ti-chevron-left" />
        </button>
        <span className="text-sm font-medium text-gray-900">
          {MONTHS[date.getMonth()]} {date.getFullYear()}
        </span>
        <button onClick={() => setDate(new Date(date.getFullYear(), date.getMonth() + 1, 1))}
          className="border border-gray-200 rounded-lg px-2 py-1 text-gray-500 hover:bg-white text-sm flex items-center">
          <i className="ti ti-chevron-right" />
        </button>
      </div>

      {/* Day labels */}
      <div className="grid grid-cols-7 gap-1 mb-1">
        {DAYS.map(d => <div key={d} className="text-center text-[10px] text-gray-400 py-1">{d}</div>)}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1">
        {Array.from({ length: firstDay }).map((_, i) => (
          <div key={'e' + i} className="bg-white border border-gray-100 rounded-lg p-1.5 min-h-14 opacity-30" />
        ))}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1
          const isToday = today.getDate() === day && today.getMonth() === date.getMonth() && today.getFullYear() === date.getFullYear()
          const dayEvents = eventsOnDay(day)
          return (
            <div key={day}
              className={`border rounded-lg p-1.5 min-h-14 cursor-pointer transition-colors ${
                isToday ? 'border-brand bg-brand-light' : 'bg-white border-gray-100 hover:border-brand'
              }`}>
              <div className={`text-[10px] font-medium mb-1 ${isToday ? 'text-brand' : 'text-gray-800'}`}>{day}</div>
              {dayEvents.map(e => (
                <div key={e.id} className={`text-[9px] px-1 py-0.5 rounded mb-0.5 truncate ${COLOR_MAP[e.color].ev}`}>
                  {e.title}
                </div>
              ))}
            </div>
          )
        })}
      </div>

      {/* Agenda */}
      <div className="mt-4">
        <div className="text-xs font-medium text-gray-500 mb-2">Upcoming this week</div>
        {upcomingEvents.map((e, i) => (
          <div key={i} className="bg-white border border-gray-100 rounded-lg px-3 py-2 mb-1.5 flex items-start gap-2.5">
            <div className="text-xs text-gray-400 min-w-12 flex-shrink-0 pt-0.5">{e.time}</div>
            <div className={`w-2 h-2 rounded-full mt-1 flex-shrink-0 ${COLOR_MAP[e.color].dot}`} />
            <div>
              <div className="text-xs font-medium text-gray-900">{e.name}</div>
              <div className="text-[11px] text-gray-400 mt-0.5">{e.detail}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
