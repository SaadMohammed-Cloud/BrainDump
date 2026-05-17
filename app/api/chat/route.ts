import { GoogleGenerativeAI } from '@google/generative-ai'
import { NextRequest, NextResponse } from 'next/server'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

export async function POST(req: NextRequest) {
  try {
    const { message, notes, events } = await req.json()

    const notesContext = notes
      .map((n: any) => `[${n.title}] (${n.tags.join(', ')}):\n${n.body}`)
      .join('\n\n---\n\n')

    const eventsContext = events
      .map((e: any) => `${e.time} — ${e.name}: ${e.detail}`)
      .join('\n')

    const model = genAI.getGenerativeModel({ model: 'models/gemini-2.5-flash' })

    const prompt = `You are Braindump AI, a personal assistant inside a note-taking app.
You have access to the user's notes and calendar. Be concise, warm, and genuinely helpful.
Keep replies under 4 sentences unless more detail is needed. Plain text only, no markdown symbols.

USER'S NOTES:
${notesContext}

TODAY'S CALENDAR:
${eventsContext}

User's question: ${message}`

    const result = await model.generateContent(prompt)
    const text = result.response.text()
    return NextResponse.json({ text })

  } catch (error: any) {
    console.error('Gemini error:', error)
    return NextResponse.json({ text: 'Error: ' + error.message }, { status: 200 })
  }
}
