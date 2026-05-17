# 🧠 Braindump — Your Personal AI Workspace

A Mem.ai-style personal AI workspace with notes, calendar, smart search, and an AI assistant powered by Claude.

---

## ✨ Features

- 📝 **Notes** — Write, tag, and organize notes with auto-save
- 📅 **Calendar** — Monthly view with event agenda
- 🔍 **Smart Search** — Search notes by keyword with highlighting
- 🤖 **AI Assistant** — Chat with Claude about your notes and schedule
- 🔗 **Related Notes** — Auto-surfaces connected notes as you write

---

## 🚀 Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Set up your API key

```bash
cp .env.example .env.local
```

Then open `.env.local` and add your Anthropic API key:

```
ANTHROPIC_API_KEY=sk-ant-...
```

Get your key at: https://console.anthropic.com

### 3. Run the app

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🏗️ Project Structure

```
braindump/
├── app/
│   ├── api/chat/route.ts   # AI chat API endpoint
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Main app page
│   └── globals.css         # Global styles
├── components/
│   ├── Sidebar.tsx         # Left navigation sidebar
│   ├── NotesPanel.tsx      # Notes list + editor
│   ├── CalendarPanel.tsx   # Calendar + agenda view
│   ├── SearchPanel.tsx     # Smart search panel
│   └── AISidebar.tsx       # AI chat assistant
├── lib/
│   ├── types.ts            # TypeScript types
│   └── data.ts             # Sample notes and events
├── .env.example            # Environment variable template
└── README.md
```

---

## 🚢 Deploy to Vercel

1. Push this folder to a GitHub repo
2. Go to [vercel.com](https://vercel.com) and import the repo
3. Add `ANTHROPIC_API_KEY` in the Vercel environment variables settings
4. Deploy — done! 🎉

---

## 🔮 Next Steps / Ideas

- [ ] Connect Google Drive to persist notes
- [ ] Connect Google Calendar for real events
- [ ] Add AI auto-tagging as you type
- [ ] Add note sharing / team workspace
- [ ] Mobile app with React Native
- [ ] Web search integration in AI assistant

---

Built with Next.js 14, Tailwind CSS, and Claude (Anthropic).
