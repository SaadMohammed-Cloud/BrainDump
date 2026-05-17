'use client'
import { useState } from 'react'
import { Note } from '@/lib/types'

interface NotesPanelProps {
  notes: Note[]
  activeId: string
  onSelect: (id: string) => void
  onEdit: (id: string, title: string, body: string) => void
}

const TAG_COLORS: Record<string, string> = {
  work: 'bg-brand-light text-brand',
  ideas: 'bg-green-100 text-green-700',
  personal: 'bg-amber-100 text-amber-700',
}

export default function NotesPanel({ notes, activeId, onSelect, onEdit }: NotesPanelProps) {
  const [saving, setSaving] = useState(false)
  const [saveTimer, setSaveTimer] = useState<any>(null)
  const [filter, setFilter] = useState('')

  const active = notes.find(n => n.id === activeId)
  const related = active
    ? notes.filter(n => n.id !== activeId && n.tags.some(t => active.tags.includes(t))).slice(0, 3)
    : []

  const filtered = filter
    ? notes.filter(n => n.title.toLowerCase().includes(filter.toLowerCase()) || n.body.toLowerCase().includes(filter.toLowerCase()))
    : notes

  function handleEdit(title: string, body: string) {
    onEdit(activeId, title, body)
    setSaving(true)
    clearTimeout(saveTimer)
    setSaveTimer(setTimeout(() => setSaving(false), 1000))
  }

  return (
    <div className="flex flex-1 overflow-hidden">
      {/* Notes list */}
      <div className="w-56 min-w-56 border-r border-gray-200 bg-white overflow-y-auto flex-shrink-0">
        <div className="px-3 py-2 border-b border-gray-200 text-xs text-gray-400">
          {filtered.length} notes
        </div>
        <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg px-2 py-1.5 mx-2 my-2">
          <i className="ti ti-search text-gray-400 text-xs" />
          <input
            type="text"
            placeholder="Filter..."
            value={filter}
            onChange={e => setFilter(e.target.value)}
            className="bg-transparent border-none outline-none text-xs text-gray-800 w-full"
          />
        </div>
        {filtered.map(note => (
          <div
            key={note.id}
            onClick={() => onSelect(note.id)}
            className={`px-3 py-2.5 border-b border-gray-100 cursor-pointer transition-colors ${
              note.id === activeId ? 'bg-brand-light' : 'hover:bg-gray-50'
            }`}
          >
            <div className="text-xs font-medium text-gray-900 truncate mb-0.5">
              {note.title || 'Untitled'}
            </div>
            <div className="text-xs text-gray-400 truncate mb-1.5">
              {note.body.replace(/\n/g, ' ').substring(0, 55)}...
            </div>
            <div className="flex items-center gap-1 flex-wrap">
              {note.tags.map(t => (
                <span key={t} className={`text-[10px] px-1.5 py-0.5 rounded-full ${TAG_COLORS[t] || 'bg-gray-100 text-gray-600'}`}>
                  {t}
                </span>
              ))}
              <span className="text-[10px] text-gray-400 ml-auto">{note.date}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Editor */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="px-3 py-1.5 border-b border-gray-200 flex items-center gap-1 bg-white flex-shrink-0">
          {['bold', 'italic', 'list', 'tag'].map(icon => (
            <button key={icon} className="p-1 rounded text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition-colors">
              <i className={`ti ti-${icon} text-sm`} />
            </button>
          ))}
          <div className="w-px h-3.5 bg-gray-200 mx-1" />
          <div className="ml-auto flex items-center gap-1 text-xs text-gray-400">
            {saving ? (
              <><i className="ti ti-dots text-xs" /> Saving...</>
            ) : (
              <><i className="ti ti-check text-xs text-green-600" /> Saved</>
            )}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-5">
          {active ? (
            <>
              <input
                key={active.id + '-title'}
                defaultValue={active.title}
                placeholder="Note title..."
                onChange={e => handleEdit(e.target.value, active.body)}
                className="w-full border-none outline-none text-lg font-medium text-gray-900 bg-transparent mb-2 font-sans"
              />
              <textarea
                key={active.id + '-body'}
                defaultValue={active.body}
                placeholder="Start writing... your AI will help organize this."
                onChange={e => handleEdit(active.title, e.target.value)}
                className="w-full border-none outline-none text-sm text-gray-800 bg-transparent leading-relaxed resize-none min-h-48 font-sans"
              />
              {related.length > 0 && (
                <div className="mt-5 pt-4 border-t border-gray-100">
                  <div className="text-[10px] text-gray-400 uppercase tracking-widest mb-2 flex items-center gap-1">
                    <i className="ti ti-git-branch text-xs" /> Related notes
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    {related.map(r => (
                      <div
                        key={r.id}
                        onClick={() => onSelect(r.id)}
                        className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-xs cursor-pointer hover:border-brand transition-colors"
                      >
                        <div className="font-medium text-gray-900 mb-0.5">{r.title}</div>
                        <div className="text-gray-400">{r.tags.join(', ')}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="text-center text-gray-400 text-sm mt-16">
              <i className="ti ti-notebook text-2xl block mb-2" />
              Select a note or create a new one
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
