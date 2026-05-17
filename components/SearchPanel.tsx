'use client'
import { useState } from 'react'
import { Note } from '@/lib/types'

interface SearchPanelProps {
  notes: Note[]
  onSelect: (id: string) => void
  onView: (v: string) => void
}

const TAG_COLORS: Record<string, string> = {
  work: 'bg-brand-light text-brand',
  ideas: 'bg-green-100 text-green-700',
  personal: 'bg-amber-100 text-amber-700',
}

export default function SearchPanel({ notes, onSelect, onView }: SearchPanelProps) {
  const [query, setQuery] = useState('')

  const matches = query
    ? notes.filter(n =>
        n.title.toLowerCase().includes(query.toLowerCase()) ||
        n.body.toLowerCase().includes(query.toLowerCase())
      )
    : []

  function highlight(text: string) {
    if (!query) return text
    const parts = text.split(new RegExp(`(${query})`, 'gi'))
    return parts.map((p, i) =>
      p.toLowerCase() === query.toLowerCase()
        ? `<mark class="bg-brand-light text-brand rounded px-0.5">${p}</mark>`
        : p
    ).join('')
  }

  function getSnippet(body: string) {
    const idx = body.toLowerCase().indexOf(query.toLowerCase())
    const raw = idx > -1
      ? body.substring(Math.max(0, idx - 40), idx + 80)
      : body.substring(0, 80)
    return raw.replace(/\n/g, ' ')
  }

  return (
    <div className="flex-1 overflow-y-auto p-5">
      {/* Search box */}
      <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-4 py-2.5 mb-4 shadow-sm">
        <i className="ti ti-search text-gray-400 text-base" />
        <input
          type="text"
          placeholder="Search your notes by meaning..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          autoFocus
          className="bg-transparent border-none outline-none text-sm text-gray-800 w-full font-sans"
        />
        {query && (
          <button onClick={() => setQuery('')} className="text-gray-400 hover:text-gray-600 text-sm">
            <i className="ti ti-x" />
          </button>
        )}
      </div>

      {/* Results */}
      {!query && (
        <div className="text-center text-gray-400 text-sm mt-12">
          <i className="ti ti-brain text-2xl block mb-2" />
          Search your notes by meaning, not just keywords
        </div>
      )}

      {query && matches.length === 0 && (
        <div className="text-center text-gray-400 text-sm mt-12">
          <i className="ti ti-mood-sad text-2xl block mb-2" />
          No notes found for "{query}"
        </div>
      )}

      {matches.length > 0 && (
        <>
          <div className="text-xs text-gray-400 mb-3">
            {matches.length} result{matches.length > 1 ? 's' : ''} for "{query}"
          </div>
          {matches.map(note => (
            <div
              key={note.id}
              onClick={() => { onSelect(note.id); onView('notes') }}
              className="bg-white border border-gray-200 rounded-xl px-4 py-3 mb-2 cursor-pointer hover:border-brand transition-colors shadow-sm"
            >
              <div
                className="text-sm font-medium text-gray-900 mb-1"
                dangerouslySetInnerHTML={{ __html: highlight(note.title) }}
              />
              <div
                className="text-xs text-gray-500 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: '...' + highlight(getSnippet(note.body)) + '...' }}
              />
              <div className="flex items-center gap-1.5 mt-2">
                <i className="ti ti-file-text text-gray-300 text-xs" />
                <span className="text-[10px] text-gray-400">{note.date}</span>
                {note.tags.map(t => (
                  <span key={t} className={`text-[10px] px-1.5 py-0.5 rounded-full ${TAG_COLORS[t] || 'bg-gray-100 text-gray-600'}`}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  )
}
