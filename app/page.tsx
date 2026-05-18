'use client'
import { useState, useRef, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

const EVENTS = [
  { time: '9:00 AM', name: 'Team standup', detail: 'Daily sync · 15 min', color: 'purple', day: 15 },
  { time: '2:00 PM', name: 'Product review', detail: 'Design team · Conf room A', color: 'amber', day: 15 },
  { time: '4:30 PM', name: '1:1 with Alex', detail: 'Engineering · Video call', color: 'purple', day: 16 },
  { time: 'Tomorrow', name: 'Sprint planning', detail: 'Full team · 2 hours', color: 'green', day: 19 },
]

const TAG_CLASS: any = { work: 'tag-work', ideas: 'tag-ideas', personal: 'tag-personal' }
const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December']

export default function Home() {
  const [notes, setNotes] = useState<any[]>([])
  const [activeId, setActiveId] = useState<string | null>(null)
  const [view, setView] = useState('notes')
  const [aiOpen, setAiOpen] = useState(false)
  const [filter, setFilter] = useState('')
  const [saveStatus, setSaveStatus] = useState('saved')
  const [messages, setMessages] = useState([{ id: '0', role: 'ai', text: "Hi! I know all your notes. Ask me anything — summaries, ideas, or what to focus on." }])
  const [chatInput, setChatInput] = useState('')
  const [typing, setTyping] = useState(false)
  const [showSuggs, setShowSuggs] = useState(true)
  const [calDate, setCalDate] = useState(new Date())
  const [loading, setLoading] = useState(true)
  const msgsRef = useRef<HTMLDivElement>(null)
  const activeIdRef = useRef<string | null>(null)

  useEffect(() => {
    activeIdRef.current = activeId
  }, [activeId])

  useEffect(() => {
    loadNotes()
  }, [])

  useEffect(() => {
    if (msgsRef.current) msgsRef.current.scrollTop = msgsRef.current.scrollHeight
  }, [messages, typing])

  async function loadNotes() {
    setLoading(true)
    const { data, error } = await supabase
      .from('notes')
      .select('*')
      .order('created_at', { ascending: false })
    if (data && data.length > 0) {
      setNotes(data)
      setActiveId(data[0].id)
      activeIdRef.current = data[0].id
    }
    setLoading(false)
  }

  async function createNote() {
    const { data } = await supabase
      .from('notes')
      .insert({ title: '', body: '', tags: ['personal'], date: 'Just now' })
      .select()
      .single()
    if (data) {
      setNotes(prev => [data, ...prev])
      setActiveId(data.id)
      setView('notes')
    }
  }

  const activeNote = notes.find(n => n.id === activeId)
  const filtered = filter ? notes.filter(n => n.title.toLowerCase().includes(filter.toLowerCase()) || n.body.toLowerCase().includes(filter.toLowerCase())) : notes
  const related = activeNote ? notes.filter(n => n.id !== activeId && n.tags?.some((t: string) => activeNote.tags?.includes(t))).slice(0, 3) : []

  async function handleEdit(field: string, value: string) {
    const currentId = activeIdRef.current
    if (!currentId) return
    // Update local state immediately
    setNotes(prev => prev.map(n => n.id === currentId ? { ...n, [field]: value } : n))
    setSaveStatus('saving')
    // Save directly to Supabase
    const { error } = await supabase
      .from('notes')
      .update({ [field]: value })
      .eq('id', currentId)
    if (error) {
      console.error('Save error:', error)
      setSaveStatus('error')
    } else {
      setSaveStatus('saved')
    }
  }

  async function sendChat(text?: string) {
    const msg = text || chatInput.trim()
    if (!msg || typing) return
    setChatInput('')
    setShowSuggs(false)
    setMessages(prev => [...prev, { id: Date.now().toString(), role: 'user', text: msg }])
    setTyping(true)
    try {
      const res = await fetch('/api/chat', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ message: msg, notes, events: EVENTS }) })
      const data = await res.json()
      setMessages(prev => [...prev, { id: Date.now().toString(), role: 'ai', text: data.text || 'Something went wrong.' }])
    } catch {
      setMessages(prev => [...prev, { id: Date.now().toString(), role: 'ai', text: 'Connection error. Check your API key in .env.local' }])
    }
    setTyping(false)
  }

  const firstDay = new Date(calDate.getFullYear(), calDate.getMonth(), 1).getDay()
  const daysInMonth = new Date(calDate.getFullYear(), calDate.getMonth() + 1, 0).getDate()
  const today = new Date()
  const eventsOnDay = (d: number) => EVENTS.filter(e => e.day === d)

  if (loading) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', fontFamily: 'Inter, sans-serif', color: '#888', fontSize: 14 }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ width: 32, height: 32, borderRadius: 10, background: '#534AB7', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px', color: 'white', fontSize: 16 }}>🧠</div>
        Loading your notes...
      </div>
    </div>
  )

  return (
    <>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/tabler-icons.min.css" />
      <div className="app">
        <div className="sidebar">
          <div className="sidebar-logo">
            <div className="sidebar-logo-dot"><i className="ti ti-brain" /></div>
            Braindump
          </div>
          <div className="sidebar-nav">
            <button className={`nav-item ${view === 'notes' ? 'active' : ''}`} onClick={() => setView('notes')}><i className="ti ti-notebook" /> Notes</button>
            <button className={`nav-item ${view === 'calendar' ? 'active' : ''}`} onClick={() => setView('calendar')}><i className="ti ti-calendar" /> Calendar</button>
            <button className={`nav-item ${view === 'search' ? 'active' : ''}`} onClick={() => setView('search')}><i className="ti ti-search" /> Smart Search</button>
            <div className="nav-section">Spaces</div>
            <button className="nav-item" onClick={() => { setFilter('work'); setView('notes') }}><i className="ti ti-briefcase" /> Work</button>
            <button className="nav-item" onClick={() => { setFilter('ideas'); setView('notes') }}><i className="ti ti-bulb" /> Ideas</button>
            <button className="nav-item" onClick={() => { setFilter('personal'); setView('notes') }}><i className="ti ti-user" /> Personal</button>
          </div>
          <button className="new-note-btn" onClick={createNote}><i className="ti ti-plus" /> New note</button>
        </div>

        <div className="main">
          <div className="topbar">
            <span className="topbar-title">{view === 'notes' ? 'Notes' : view === 'calendar' ? 'Calendar' : 'Smart Search'}</span>
            <button className={`ai-toggle-btn ${aiOpen ? 'active' : ''}`} onClick={() => setAiOpen(o => !o)}>
              <i className="ti ti-sparkles" /> AI Assistant
            </button>
          </div>

          <div className="content">
            {view === 'notes' && (
              <>
                <div className="notes-list">
                  <div className="notes-list-header">{filtered.length} notes</div>
                  <div className="notes-search">
                    <i className="ti ti-search" style={{ color: '#bbb', fontSize: 13 }} />
                    <input placeholder="Filter notes..." value={filter} onChange={e => setFilter(e.target.value)} />
                  </div>
                  <div className="notes-scroll">
                    {filtered.map(note => (
                      <div key={note.id} className={`note-item ${note.id === activeId ? 'active' : ''}`} onClick={() => setActiveId(note.id)}>
                        <div className="note-item-title">{note.title || 'Untitled'}</div>
                        <div className="note-item-preview">{note.body?.replace(/\n/g, ' ').substring(0, 60)}...</div>
                        <div className="note-item-meta">
                          {note.tags?.map((t: string) => <span key={t} className={`tag ${TAG_CLASS[t] || ''}`}>{t}</span>)}
                          <span className="note-date">{note.date}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="editor">
                  <div className="editor-toolbar">
                    {['bold', 'italic', 'list', 'tag', 'link'].map(icon => (
                      <button key={icon} className="toolbar-btn"><i className={`ti ti-${icon}`} /></button>
                    ))}
                    <div className="toolbar-sep" />
                    <div className="save-indicator">
                      {saveStatus === 'saving'
                        ? <><i className="ti ti-dots" style={{ fontSize: 12 }} /> Saving...</>
                        : saveStatus === 'error'
                        ? <><i className="ti ti-x" style={{ fontSize: 12, color: 'red' }} /> Error</>
                        : <><i className="ti ti-check" style={{ fontSize: 12, color: '#1D9E75' }} /> Saved</>}
                    </div>
                  </div>
                  <div className="editor-content">
                    {activeNote && (
                      <>
                        <input
                          key={activeNote.id + '-t'}
                          className="editor-title"
                          defaultValue={activeNote.title}
                          placeholder="Untitled note"
                          onBlur={e => handleEdit('title', e.target.value)}
                          onChange={e => {
                            setNotes(prev => prev.map(n => n.id === activeId ? { ...n, title: e.target.value } : n))
                            setSaveStatus('saving')
                          }}
                        />
                        <div className="editor-meta">
                          <i className="ti ti-clock" style={{ fontSize: 12 }} /> {activeNote.date}
                          {activeNote.tags?.map((t: string) => <span key={t} className={`tag ${TAG_CLASS[t] || ''}`} style={{ marginLeft: 4 }}>{t}</span>)}
                        </div>
                        <textarea
                          key={activeNote.id + '-b'}
                          className="editor-body"
                          defaultValue={activeNote.body}
                          placeholder="Start writing..."
                          onBlur={e => handleEdit('body', e.target.value)}
                          onChange={e => {
                            setNotes(prev => prev.map(n => n.id === activeId ? { ...n, body: e.target.value } : n))
                            setSaveStatus('saving')
                          }}
                        />
                        {related.length > 0 && (
                          <div className="related-section">
                            <div className="related-title">Related notes</div>
                            <div className="related-cards">
                              {related.map((r: any) => (
                                <div key={r.id} className="related-card" onClick={() => setActiveId(r.id)}>
                                  <div className="related-card-title">{r.title}</div>
                                  <div className="related-card-sub">{r.tags?.join(', ')}</div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </>
            )}

            {view === 'calendar' && (
              <div className="calendar-panel">
                <div className="cal-nav">
                  <button className="cal-btn" onClick={() => setCalDate(new Date(calDate.getFullYear(), calDate.getMonth() - 1, 1))}><i className="ti ti-chevron-left" /></button>
                  <span className="cal-title">{MONTHS[calDate.getMonth()]} {calDate.getFullYear()}</span>
                  <button className="cal-btn" onClick={() => setCalDate(new Date(calDate.getFullYear(), calDate.getMonth() + 1, 1))}><i className="ti ti-chevron-right" /></button>
                </div>
                <div className="cal-days-header">
                  {['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map(d => <div key={d} className="cal-day-label">{d}</div>)}
                </div>
                <div className="cal-grid">
                  {Array.from({ length: firstDay }).map((_, i) => <div key={'e'+i} className="cal-cell dim" />)}
                  {Array.from({ length: daysInMonth }).map((_, i) => {
                    const d = i + 1
                    const isToday = today.getDate() === d && today.getMonth() === calDate.getMonth() && today.getFullYear() === calDate.getFullYear()
                    return (
                      <div key={d} className={`cal-cell ${isToday ? 'today' : ''}`}>
                        <div className="cal-num">{d}</div>
                        {eventsOnDay(d).map(e => <div key={e.name} className={`cal-ev cal-ev-${e.color}`}>{e.name}</div>)}
                      </div>
                    )
                  })}
                </div>
                <div className="agenda">
                  <div className="agenda-title">Upcoming this week</div>
                  {EVENTS.map(e => (
                    <div key={e.name} className="agenda-event">
                      <div className="agenda-time">{e.time}</div>
                      <div className="agenda-dot" style={{ background: e.color === 'purple' ? '#534AB7' : e.color === 'green' ? '#1D9E75' : '#EF9F27' }} />
                      <div>
                        <div className="agenda-name">{e.name}</div>
                        <div className="agenda-detail">{e.detail}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {view === 'search' && (
              <div className="search-panel">
                <div className="search-big">
                  <i className="ti ti-search" style={{ color: '#bbb', fontSize: 16 }} />
                  <input placeholder="Search your notes..." value={filter} onChange={e => setFilter(e.target.value)} autoFocus />
                </div>
                {!filter && <div className="search-empty"><i className="ti ti-brain" style={{ fontSize: 28, display: 'block', marginBottom: 8 }} />Search your notes by meaning</div>}
                {filter && filtered.map(note => {
                  const idx = note.body?.toLowerCase().indexOf(filter.toLowerCase())
                  const snippet = (idx > -1 ? note.body.substring(Math.max(0, idx - 40), idx + 80) : note.body?.substring(0, 80) || '').replace(/\n/g, ' ')
                  return (
                    <div key={note.id} className="search-result" onClick={() => { setActiveId(note.id); setView('notes') }}>
                      <div className="search-result-title">{note.title}</div>
                      <div className="search-result-snippet">...{snippet}...</div>
                      <div className="search-result-meta">
                        <i className="ti ti-file-text" style={{ fontSize: 12 }} /> {note.date}
                        {note.tags?.map((t: string) => <span key={t} className={`tag ${TAG_CLASS[t] || ''}`}>{t}</span>)}
                      </div>
                    </div>
                  )
                })}
              </div>
            )}

            <div className={`ai-sidebar ${aiOpen ? '' : 'closed'}`}>
              <div className="ai-header">
                <div className="ai-avatar"><i className="ti ti-sparkles" /></div>
                <span className="ai-header-name">Braindump AI</span>
                <div className="ai-online" />
              </div>
              <div className="messages" ref={msgsRef}>
                {messages.map(m => (
                  <div key={m.id} className={m.role === 'ai' ? 'msg-ai' : 'msg-user'}>
                    {m.role === 'ai' && <div className="msg-label">Braindump AI</div>}
                    <div className="bubble">{m.text}</div>
                  </div>
                ))}
                {typing && (
                  <div className="msg-ai">
                    <div className="msg-label">thinking...</div>
                    <div className="bubble"><div className="typing"><div className="td" /><div className="td" /><div className="td" /></div></div>
                  </div>
                )}
              </div>
              {showSuggs && (
                <div className="suggestions">
                  {['Summarize all my notes', "What ideas haven't I explored?", 'What should I focus on this week?'].map(s => (
                    <button key={s} className="suggestion-btn" onClick={() => sendChat(s)}><i className="ti ti-arrow-right" style={{ fontSize: 12 }} />{s}</button>
                  ))}
                </div>
              )}
              <div className="chat-input-area">
                <textarea className="chat-textarea" value={chatInput} onChange={e => setChatInput(e.target.value)} onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendChat() } }} placeholder="Ask anything..." rows={1} />
                <button className="send-button" onClick={() => sendChat()} aria-label="Send"><i className="ti ti-send" /></button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
