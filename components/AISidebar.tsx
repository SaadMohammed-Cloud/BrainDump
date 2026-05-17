'use client'
import { useState, useRef, useEffect } from 'react'
import { Note, Message, CalendarEvent } from '@/lib/types'

interface AISidebarProps {
  notes: Note[]
  events: CalendarEvent[]
  open: boolean
}

const SUGGESTIONS = [
  'Summarize all my notes and highlight the main themes',
  "What ideas haven't I fully explored yet?",
  'What should I focus on this week based on my notes?',
  'Create a meeting note template for today',
]

export default function AISidebar({ notes, events, open }: AISidebarProps) {
  const [messages, setMessages] = useState<Message[]>([
    { id: '0', role: 'ai', text: "Hi! I can help you organize notes, search your knowledge, or plan your schedule. What's on your mind?" }
  ])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const [showSuggs, setShowSuggs] = useState(true)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, typing])

  async function send(text?: string) {
    const msg = text || input.trim()
    if (!msg || typing) return
    setInput('')
    setShowSuggs(false)

    const userMsg: Message = { id: Date.now().toString(), role: 'user', text: msg }
    setMessages(prev => [...prev, userMsg])
    setTyping(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: msg, notes, events }),
      })
      const data = await res.json()
      setMessages(prev => [...prev, { id: Date.now().toString(), role: 'ai', text: data.text || 'Sorry, something went wrong.' }])
    } catch {
      setMessages(prev => [...prev, { id: Date.now().toString(), role: 'ai', text: 'Connection error. Is your API key set in .env.local?' }])
    } finally {
      setTyping(false)
    }
  }

  if (!open) return null

  return (
    <div className="w-64 min-w-64 border-l border-gray-200 bg-white flex flex-col">
      <div className="px-3 py-2.5 border-b border-gray-200 flex items-center gap-2 flex-shrink-0">
        <span className="text-sm font-medium text-gray-900 flex-1">AI assistant</span>
        <span className="bg-brand text-white text-[10px] px-2 py-0.5 rounded-full font-medium">Claude</span>
      </div>

      <div className="flex-1 overflow-y-auto p-2.5 flex flex-col gap-2">
        {messages.map(m => (
          <div key={m.id} className={m.role === 'user' ? 'self-end max-w-[90%]' : ''}>
            {m.role === 'ai' && (
              <div className="text-[10px] text-gray-400 mb-1 flex items-center gap-1">
                <i className="ti ti-sparkles text-xs" /> Braindump AI
              </div>
            )}
            <div className={`text-xs px-2.5 py-2 rounded-xl leading-relaxed ${
              m.role === 'ai'
                ? 'bg-gray-50 border border-gray-200 text-gray-800 rounded-tl-sm'
                : 'bg-brand text-white rounded-tr-sm'
            }`}>
              {m.text}
            </div>
          </div>
        ))}

        {typing && (
          <div>
            <div className="text-[10px] text-gray-400 mb-1 flex items-center gap-1">
              <i className="ti ti-sparkles text-xs" /> Braindump AI
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-xl rounded-tl-sm px-3 py-2.5 flex gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-gray-400 dot" />
              <div className="w-1.5 h-1.5 rounded-full bg-gray-400 dot" />
              <div className="w-1.5 h-1.5 rounded-full bg-gray-400 dot" />
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {showSuggs && (
        <div className="px-2 pb-1.5 flex flex-col gap-1">
          {SUGGESTIONS.map(s => (
            <button
              key={s}
              onClick={() => send(s)}
              className="w-full text-left text-xs text-gray-500 bg-gray-50 border border-gray-200 rounded-lg px-2.5 py-1.5 hover:text-brand hover:border-brand transition-colors"
            >
              {s}
            </button>
          ))}
        </div>
      )}

      <div className="p-2 border-t border-gray-200 flex gap-1.5 items-end flex-shrink-0">
        <textarea
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send() } }}
          placeholder="Ask your AI..."
          rows={1}
          className="flex-1 border border-gray-200 rounded-lg px-2.5 py-1.5 text-xs font-sans text-gray-800 bg-gray-50 outline-none resize-none max-h-16 leading-relaxed focus:border-brand"
        />
        <button
          onClick={() => send()}
          disabled={typing}
          className="bg-brand text-white rounded-lg p-2 flex items-center text-sm hover:opacity-85 transition-opacity disabled:opacity-50"
        >
          <i className="ti ti-send" />
        </button>
      </div>
    </div>
  )
}
