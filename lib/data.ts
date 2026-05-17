import { Note, CalendarEvent } from './types'

export const SAMPLE_NOTES: Note[] = [
  { id: '1', title: 'Q3 Strategy Planning', body: 'Key goals for Q3:\n- Launch new product line by August\n- Expand into 3 new markets\n- Hire 5 senior engineers\n\nMain focus: customer retention and reducing churn.', tags: ['work'], date: 'Today', createdAt: Date.now() - 1000 },
  { id: '2', title: 'Dashboard Redesign Ideas', body: 'Ideas:\n- Real-time metrics panel\n- Drag-and-drop widgets\n- Dark mode first\n- Better mobile responsiveness', tags: ['ideas', 'work'], date: 'Yesterday', createdAt: Date.now() - 86400000 },
  { id: '3', title: 'Book Notes — Thinking Fast and Slow', body: 'System 1 vs System 2 thinking.\n\nSystem 1: automatic, fast, emotional.\nSystem 2: slow, deliberate, logical.', tags: ['personal'], date: 'May 12', createdAt: Date.now() - 3 * 86400000 },
  { id: '4', title: 'Weekly Reflection — May 10', body: 'What went well:\n- Finished API integration\n- Great 1:1 with the team\n\nWhat to improve:\n- More proactive about blockers', tags: ['personal', 'work'], date: 'May 10', createdAt: Date.now() - 5 * 86400000 },
]

export const SAMPLE_EVENTS: CalendarEvent[] = [
  { id: 'e1', title: 'Team standup', time: '9:00 AM', detail: 'Daily sync · 15 min', color: 'purple', day: 15 },
  { id: 'e2', title: 'Product review', time: '2:00 PM', detail: 'Design team · Conf room A', color: 'amber', day: 15 },
  { id: 'e3', title: '1:1 with Alex', time: '4:30 PM', detail: 'Engineering · Video call', color: 'purple', day: 16 },
  { id: 'e4', title: 'Sprint planning', time: '10:00 AM', detail: 'Full team · 2 hours', color: 'green', day: 19 },
  { id: 'e5', title: 'Demo day', time: '3:00 PM', detail: 'Stakeholders · Main hall', color: 'amber', day: 21 },
]
