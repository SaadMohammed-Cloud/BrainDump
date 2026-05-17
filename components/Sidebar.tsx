'use client'

interface SidebarProps {
  view: string
  onView: (v: string) => void
  onNewNote: () => void
  onFilterTag: (tag: string) => void
}

export default function Sidebar({ view, onView, onNewNote, onFilterTag }: SidebarProps) {
  const navItem = (id: string, icon: string, label: string, onClick?: () => void) => (
    <button
      onClick={onClick || (() => onView(id))}
      className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm mb-0.5 transition-colors ${
        view === id && !onClick
          ? 'bg-brand-light text-brand font-medium'
          : 'text-gray-500 hover:bg-gray-100 hover:text-gray-800'
      }`}
    >
      <i className={`ti ti-${icon} text-base`} />
      {label}
    </button>
  )

  return (
    <div className="w-52 min-w-52 bg-white border-r border-gray-200 flex flex-col">
      <div className="px-4 py-3.5 border-b border-gray-200">
        <div className="flex items-center gap-2 text-[15px] font-medium text-gray-900">
          <div className="w-2 h-2 rounded-full bg-brand" />
          Braindump
        </div>
      </div>

      <div className="p-2 flex-1 overflow-y-auto">
        {navItem('notes', 'notebook', 'Notes')}
        {navItem('calendar', 'calendar', 'Calendar')}
        {navItem('search', 'search', 'Smart Search')}

        <div className="text-[10px] text-gray-400 uppercase tracking-widest px-3 pt-3 pb-1">
          Spaces
        </div>
        {navItem('work', 'briefcase', 'Work', () => onFilterTag('work'))}
        {navItem('ideas', 'bulb', 'Ideas', () => onFilterTag('ideas'))}
        {navItem('personal', 'user', 'Personal', () => onFilterTag('personal'))}
      </div>

      <button
        onClick={onNewNote}
        className="mx-2 mb-2 px-3 py-2 bg-brand text-white rounded-lg text-sm font-medium flex items-center gap-2 hover:opacity-90 transition-opacity"
      >
        <i className="ti ti-plus" />
        New note
      </button>
    </div>
  )
}
