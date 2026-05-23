import { GoogleGenerativeAI } from '@google/generative-ai'
import { NextRequest, NextResponse } from 'next/server'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

export async function POST(req: NextRequest) {
  try {
    const { type, message, notes, events, body, allNotes } = await req.json()

    const model = genAI.getGenerativeModel({ model: 'models/gemini-2.5-flash' })

    // Auto-organize a note
    if (type === 'organize') {
      const otherNotes = allNotes?.map((n: any) => `[${n.title}] (${n.tags?.join(', ')}): ${n.body?.substring(0, 100)}`).join('\n') || ''

      const prompt = `You are an AI that organizes notes. Given the raw note below, respond with ONLY a valid JSON object, no markdown, no backticks, no explanation.

Raw note: "${body}"

Other existing notes for context:
${otherNotes}

Respond with exactly this JSON structure:
{
  "title": "a concise title (max 6 words)",
  "tags": ["tag1", "tag2"],
  "summary": "one sentence summary",
  "relatedNotes": ["title of related note 1", "title of related note 2"]
}

Rules:
- tags must only be from: work, ideas, personal, meeting, finance, health, learning
- relatedNotes should match titles from the existing notes list, max 2
- if no related notes exist, use empty array
- keep summary under 15 words`

      const result = await model.generateContent(prompt)
      let text = result.response.text().trim()
      // Strip any markdown backticks if present
      text = text.replace(/```json/g, '').replace(/```/g, '').trim()
      const organized = JSON.parse(text)
      return NextResponse.json(organized)
    }

    // Regular AI chat
    const notesContext = notes
      ?.map((n: any) => `[${n.title}] (${n.tags?.join(', ')}):\n${n.body}`)
      .join('\n\n---\n\n') || ''

    const eventsContext = events
      ?.map((e: any) => `${e.time} — ${e.name}: ${e.detail}`)
      .join('\n') || ''

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
    return NextResponse.json({ error: error.message, text: 'Error: ' + error.message }, { status: 200 })
  }
}
