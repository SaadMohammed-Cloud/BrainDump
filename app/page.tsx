export default function LandingPage() {
  return (
    <div style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif", background: '#fff', color: '#1a1a1a' }}>

      {/* NAV */}
      <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 48px', borderBottom: '1px solid #e8e8ed', background: '#fff', position: 'sticky', top: 0, zIndex: 100 }}>
        <a href="/" style={{ display: 'flex', alignItems: 'center', gap: 9, fontSize: 16, fontWeight: 600, color: '#1a1a1a', textDecoration: 'none' }}>
          <div style={{ width: 32, height: 32, borderRadius: 9, background: '#7F77DD', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 16 }}>🧠</div>
          Braindump
        </a>
        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          <a href="#features" style={{ fontSize: 14, color: '#666', textDecoration: 'none' }}>Features</a>
          <a href="#how-it-works" style={{ fontSize: 14, color: '#666', textDecoration: 'none' }}>How it works</a>
          <a href="#pricing" style={{ fontSize: 14, color: '#666', textDecoration: 'none' }}>Pricing</a>
          <a href="#faq" style={{ fontSize: 14, color: '#666', textDecoration: 'none' }}>FAQ</a>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <a href="/sign-in" style={{ padding: '8px 16px', border: '1.5px solid #d0d0d0', borderRadius: 8, fontSize: 13, fontWeight: 500, background: '#f5f5f7', color: '#444', textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }}>Log in</a>
          <a href="/sign-up" style={{ padding: '8px 18px', border: 'none', borderRadius: 8, fontSize: 13, fontWeight: 500, background: '#7F77DD', color: '#fff', textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }}>Get started free</a>
        </div>
      </nav>

      {/* HERO */}
      <div style={{ padding: '72px 48px 48px', textAlign: 'center', background: '#fff' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: '#EEEDFE', color: '#534AB7', fontSize: 12, fontWeight: 500, padding: '5px 14px', borderRadius: 20, marginBottom: 22 }}>✦ AI-powered second brain</div>
        <h1 style={{ fontSize: 44, fontWeight: 600, lineHeight: 1.2, color: '#1a1a1a', marginBottom: 16 }}>
          Dump your thoughts.<br /><span style={{ color: '#7F77DD' }}>AI does the rest.</span>
        </h1>
        <p style={{ fontSize: 16, color: '#666', lineHeight: 1.75, maxWidth: 540, margin: '0 auto 32px' }}>The on-the-go notes app that automatically titles, tags, summarizes and connects your ideas — in 3 seconds flat.</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginBottom: 14 }}>
          <a href="/sign-up" style={{ padding: '13px 30px', background: '#7F77DD', color: '#fff', border: 'none', borderRadius: 10, fontSize: 15, fontWeight: 500, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 6 }}>Start for free →</a>
          <a href="#how-it-works" style={{ padding: '13px 26px', border: '1.5px solid #d0d0d0', borderRadius: 10, fontSize: 15, background: '#f5f5f7', color: '#444', textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }}>See how it works</a>
        </div>
        <div style={{ fontSize: 12, color: '#aaa', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5 }}>
          <span style={{ color: '#1D9E75' }}>✓</span> Free forever &nbsp;·&nbsp; No credit card needed
        </div>
      </div>

      {/* APP PREVIEW */}
      <div style={{ margin: '0 48px', border: '1px solid #e0e0e0', borderRadius: 14, overflow: 'hidden', boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>
        <div style={{ background: '#f5f5f7', borderBottom: '1px solid #e8e8ed', padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 6 }}>
          <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#E24B4A' }} />
          <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#EF9F27' }} />
          <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#1D9E75' }} />
          <span style={{ fontSize: 11, color: '#bbb', marginLeft: 8 }}>braindump.app</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '160px 1fr', gap: 12, padding: 16, background: '#f9f9fb' }}>
          <div style={{ background: '#fff', border: '1px solid #e8e8ed', borderRadius: 10, padding: 12 }}>
            <div style={{ fontSize: 9, color: '#bbb', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 8 }}>Your notes</div>
            <div style={{ height: 32, background: '#EEEDFE', borderRadius: 6, marginBottom: 6, padding: '6px 8px', display: 'flex', alignItems: 'center', gap: 5, fontSize: 11, color: '#534AB7', fontWeight: 500 }}>📄 Meeting with John</div>
            {['📄 Q3 strategy ideas', '📄 Book notes', '📄 Weekly reflection'].map(n => (
              <div key={n} style={{ height: 32, background: '#f5f5f7', borderRadius: 6, marginBottom: 6, padding: '6px 8px', display: 'flex', alignItems: 'center', gap: 5, fontSize: 11, color: '#666' }}>{n}</div>
            ))}
          </div>
          <div style={{ background: '#fff', border: '1px solid #e8e8ed', borderRadius: 10, padding: 16 }}>
            <div style={{ fontSize: 16, fontWeight: 500, color: '#1a1a1a', marginBottom: 12 }}>Meeting with John</div>
            <div style={{ background: '#EEEDFE', borderLeft: '3px solid #7F77DD', borderRadius: '0 6px 6px 0', padding: '9px 12px', marginBottom: 10, display: 'flex', alignItems: 'flex-start', gap: 7 }}>
              <span style={{ background: '#7F77DD', color: '#fff', fontSize: 9, padding: '2px 6px', borderRadius: 8, fontWeight: 700, flexShrink: 0 }}>✦ AI</span>
              <span style={{ fontSize: 11, color: '#534AB7', lineHeight: 1.5 }}>Potential Google partnership contact. Follow up next week.</span>
            </div>
            <div style={{ fontSize: 9, color: '#bbb', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 5 }}>✏ Your note</div>
            <div style={{ fontSize: 11, color: '#999', lineHeight: 1.6 }}>met john today good guy works at google might be useful for partnerships he said reach out next week</div>
          </div>
        </div>
      </div>

      {/* STATS */}
      <div style={{ padding: '48px 48px 0' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1, background: '#e8e8ed', border: '1px solid #e8e8ed', borderRadius: 14, overflow: 'hidden', maxWidth: 580, margin: '0 auto' }}>
          {[['3s', 'AI organizes your note'], ['10x', 'faster than manual tagging'], ['100%', 'your data, your privacy']].map(([n, l]) => (
            <div key={l} style={{ background: '#fff', padding: 24, textAlign: 'center' }}>
              <div style={{ fontSize: 28, fontWeight: 600, color: '#7F77DD', marginBottom: 4 }}>{n}</div>
              <div style={{ fontSize: 12, color: '#888' }}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* FEATURES */}
      <div id="features" style={{ padding: '64px 48px', background: '#EEEDFE' }}>
        <div style={{ fontSize: 11, color: '#7F77DD', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.09em', textAlign: 'center', marginBottom: 10 }}>Features</div>
        <h2 style={{ fontSize: 28, fontWeight: 600, textAlign: 'center', color: '#1a1a1a', marginBottom: 10 }}>Everything your brain needs</h2>
        <p style={{ fontSize: 15, color: '#888', textAlign: 'center', maxWidth: 500, margin: '0 auto 44px', lineHeight: 1.7 }}>Built for fast thinkers who want their notes to keep up.</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, maxWidth: 900, margin: '0 auto' }}>
          {[
            { icon: '✦', bg: '#EEEDFE', col: '#7F77DD', title: 'AI auto-organization', text: 'Type anything. AI titles, tags and summarizes every note in seconds.' },
            { icon: '⟳', bg: '#E1F5EE', col: '#1D9E75', title: 'Smart connections', text: 'AI links related notes automatically — surface ideas you\'d forgotten.' },
            { icon: '⌕', bg: '#FAEEDA', col: '#BA7517', title: 'Semantic search', text: 'Search by meaning. Find notes even when you forget the exact words.' },
            { icon: '▦', bg: '#E6F1FB', col: '#378ADD', title: 'Calendar view', text: 'See your schedule alongside your notes. Never miss context.' },
            { icon: '◎', bg: '#FBEAF0', col: '#D4537E', title: 'AI assistant', text: 'Chat with your notes. Ask questions, get summaries, brainstorm.' },
            { icon: '⊡', bg: '#FAECE7', col: '#D85A30', title: 'Works everywhere', text: 'Capture thoughts on any device. Syncs instantly across all of them.' },
          ].map(f => (
            <div key={f.title} style={{ background: '#fff', borderRadius: 14, padding: 20, border: '1px solid #e8e8ed' }}>
              <div style={{ width: 38, height: 38, borderRadius: 10, background: f.bg, color: f.col, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 14, fontSize: 18 }}>{f.icon}</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: '#1a1a1a', marginBottom: 6 }}>{f.title}</div>
              <div style={{ fontSize: 13, color: '#888', lineHeight: 1.65 }}>{f.text}</div>
            </div>
          ))}
        </div>
      </div>

      {/* HOW IT WORKS */}
      <div id="how-it-works" style={{ padding: '64px 48px', background: '#fff' }}>
        <div style={{ fontSize: 11, color: '#7F77DD', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.09em', textAlign: 'center', marginBottom: 10 }}>How it works</div>
        <h2 style={{ fontSize: 28, fontWeight: 600, textAlign: 'center', color: '#1a1a1a', marginBottom: 10 }}>Organized in 3 seconds</h2>
        <p style={{ fontSize: 15, color: '#888', textAlign: 'center', maxWidth: 500, margin: '0 auto 44px', lineHeight: 1.7 }}>No folders, no manual tagging. Just write and AI does the rest.</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, maxWidth: 800, margin: '0 auto' }}>
          {[
            { num: '1', bg: '#7F77DD', title: 'Dump your thought', text: 'Type anything, however messy. Voice notes, half-formed ideas, meeting scribbles — all welcome.' },
            { num: '2', bg: '#1D9E75', title: 'AI organizes it', text: '3 seconds after you stop typing, AI titles, tags, summarizes and connects it to related notes.' },
            { num: '3', bg: '#EF9F27', title: 'Find it instantly', text: 'Search by meaning. Ask AI questions. Never lose a thought again.' },
          ].map(s => (
            <div key={s.num} style={{ textAlign: 'center', padding: 20 }}>
              <div style={{ width: 38, height: 38, borderRadius: '50%', background: s.bg, fontSize: 14, fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px', color: '#fff' }}>{s.num}</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: '#1a1a1a', marginBottom: 7 }}>{s.title}</div>
              <div style={{ fontSize: 13, color: '#888', lineHeight: 1.65 }}>{s.text}</div>
            </div>
          ))}
        </div>
      </div>

      {/* PRICING */}
      <div id="pricing" style={{ padding: '64px 48px', background: '#f9f9fb' }}>
        <div style={{ fontSize: 11, color: '#7F77DD', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.09em', textAlign: 'center', marginBottom: 10 }}>Pricing</div>
        <h2 style={{ fontSize: 28, fontWeight: 600, textAlign: 'center', color: '#1a1a1a', marginBottom: 10 }}>Simple, honest pricing</h2>
        <p style={{ fontSize: 15, color: '#888', textAlign: 'center', maxWidth: 500, margin: '0 auto 44px', lineHeight: 1.7 }}>Start free. Upgrade when you're ready.</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16, maxWidth: 620, margin: '0 auto' }}>
          <div style={{ background: '#fff', border: '1.5px solid #e0e0e0', borderRadius: 16, padding: 26 }}>
            <div style={{ fontSize: 16, fontWeight: 600, color: '#1a1a1a', marginBottom: 4 }}>Free</div>
            <div style={{ fontSize: 34, fontWeight: 700, color: '#1a1a1a', marginBottom: 4 }}>$0<span style={{ fontSize: 14, color: '#aaa', fontWeight: 400 }}>/month</span></div>
            <div style={{ fontSize: 13, color: '#aaa', marginBottom: 20 }}>Perfect for getting started</div>
            <ul style={{ listStyle: 'none', marginBottom: 22 }}>
              {['Up to 10 notes', 'AI auto-organization', 'Basic search', 'Web access'].map(f => (
                <li key={f} style={{ fontSize: 13, color: '#555', padding: '6px 0', display: 'flex', alignItems: 'center', gap: 8, borderBottom: '1px solid #f5f5f5' }}>
                  <span style={{ color: '#1D9E75' }}>✓</span>{f}
                </li>
              ))}
            </ul>
            <a href="/sign-up" style={{ display: 'block', textAlign: 'center', padding: 11, borderRadius: 9, fontSize: 14, fontWeight: 500, background: '#f5f5f7', border: '1.5px solid #d0d0d0', color: '#444', textDecoration: 'none' }}>Get started free</a>
          </div>
          <div style={{ background: '#fff', border: '2px solid #7F77DD', borderRadius: 16, padding: 26 }}>
            <div style={{ background: '#EEEDFE', color: '#534AB7', fontSize: 11, fontWeight: 600, padding: '4px 12px', borderRadius: 20, display: 'inline-block', marginBottom: 12 }}>Most popular</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: '#1a1a1a', marginBottom: 4 }}>Pro</div>
            <div style={{ fontSize: 34, fontWeight: 700, color: '#1a1a1a', marginBottom: 4 }}>$9<span style={{ fontSize: 14, color: '#aaa', fontWeight: 400 }}>/month</span></div>
            <div style={{ fontSize: 13, color: '#aaa', marginBottom: 20 }}>For serious thinkers and builders</div>
            <ul style={{ listStyle: 'none', marginBottom: 22 }}>
              {['Unlimited notes', 'AI assistant chat', 'Smart connections', 'Calendar integration', 'Priority support'].map(f => (
                <li key={f} style={{ fontSize: 13, color: '#555', padding: '6px 0', display: 'flex', alignItems: 'center', gap: 8, borderBottom: '1px solid #f5f5f5' }}>
                  <span style={{ color: '#1D9E75' }}>✓</span>{f}
                </li>
              ))}
            </ul>
            <a href="/sign-up" style={{ display: 'block', textAlign: 'center', padding: 11, borderRadius: 9, fontSize: 14, fontWeight: 500, background: '#7F77DD', border: 'none', color: '#fff', textDecoration: 'none' }}>Start Pro — $9/mo</a>
          </div>
        </div>
      </div>

      {/* TESTIMONIALS */}
      <div style={{ padding: '64px 48px', background: '#fff' }}>
        <div style={{ fontSize: 11, color: '#7F77DD', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.09em', textAlign: 'center', marginBottom: 10 }}>Testimonials</div>
        <h2 style={{ fontSize: 28, fontWeight: 600, textAlign: 'center', color: '#1a1a1a', marginBottom: 10 }}>People love Braindump</h2>
        <p style={{ fontSize: 15, color: '#888', textAlign: 'center', maxWidth: 500, margin: '0 auto 44px', lineHeight: 1.7 }}>Join thousands of thinkers who never lose an idea.</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, maxWidth: 900, margin: '0 auto' }}>
          {[
            { initials: 'AK', bg: '#EEEDFE', col: '#534AB7', text: '"I used to lose half my ideas before I could organize them. Braindump changed that — I just dump and move on."', name: 'Alex K.', role: 'Product Manager' },
            { initials: 'SL', bg: '#E1F5EE', col: '#1D9E75', text: '"The AI organization is scary good. It titled and tagged a rambling voice note better than I ever could manually."', name: 'Sarah L.', role: 'Startup Founder' },
            { initials: 'MR', bg: '#FAEEDA', col: '#854F0B', text: '"Finally a notes app that keeps up with how my brain works. The AI connections feature blows my mind every day."', name: 'Marcus R.', role: 'Engineer' },
          ].map(t => (
            <div key={t.name} style={{ background: '#f9f9fb', borderRadius: 14, padding: 20, border: '1px solid #e8e8ed' }}>
              <div style={{ display: 'flex', gap: 3, marginBottom: 12 }}>
                {[...Array(5)].map((_, i) => <div key={i} style={{ width: 12, height: 12, background: '#EF9F27', borderRadius: 2 }} />)}
              </div>
              <div style={{ fontSize: 13, color: '#555', lineHeight: 1.7, marginBottom: 16 }}>{t.text}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 32, height: 32, borderRadius: '50%', background: t.bg, color: t.col, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 600 }}>{t.initials}</div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: '#1a1a1a' }}>{t.name}</div>
                  <div style={{ fontSize: 11, color: '#aaa' }}>{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ */}
      <div id="faq" style={{ padding: '64px 48px', background: '#f9f9fb' }}>
        <div style={{ fontSize: 11, color: '#7F77DD', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.09em', textAlign: 'center', marginBottom: 10 }}>FAQ</div>
        <h2 style={{ fontSize: 28, fontWeight: 600, textAlign: 'center', color: '#1a1a1a', marginBottom: 10 }}>Common questions</h2>
        <p style={{ fontSize: 15, color: '#888', textAlign: 'center', maxWidth: 500, margin: '0 auto 32px', lineHeight: 1.7 }}>Everything you need to know.</p>
        <div style={{ maxWidth: 640, margin: '0 auto' }}>
          {[
            { q: 'Is my data private?', a: 'Yes. Your notes are stored securely in your own database. We never train AI models on your personal notes.' },
            { q: 'How does the AI organization work?', a: '3 seconds after you stop typing, AI reads your note and automatically generates a title, picks tags, writes a summary, and links related notes.' },
            { q: 'Can I cancel anytime?', a: 'Yes, absolutely. Cancel from your account settings at any time. No questions asked, no hidden fees.' },
            { q: 'What devices does Braindump work on?', a: 'Any browser on Mac, Windows, iOS or Android. A dedicated mobile app is coming very soon.' },
            { q: 'How do I contact support?', a: 'Email us at support@braindump.app. We typically respond within a few hours.' },
          ].map(f => (
            <div key={f.q} style={{ background: '#fff', border: '1px solid #e8e8ed', borderRadius: 12, padding: '18px 20px', marginBottom: 10 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: '#1a1a1a', marginBottom: 7 }}>{f.q}</div>
              <div style={{ fontSize: 13, color: '#888', lineHeight: 1.7 }}>{f.a}</div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div style={{ margin: '0 48px 64px', background: '#7F77DD', borderRadius: 18, padding: 52, textAlign: 'center' }}>
        <div style={{ fontSize: 30, fontWeight: 600, color: '#fff', marginBottom: 12 }}>Start dumping your thoughts today</div>
        <div style={{ fontSize: 15, color: '#CECBF6', marginBottom: 28 }}>Free forever. No credit card. AI organizes everything.</div>
        <a href="/sign-up" style={{ padding: '13px 30px', background: '#fff', color: '#7F77DD', border: 'none', borderRadius: 10, fontSize: 15, fontWeight: 600, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 6 }}>Get started free →</a>
      </div>

      {/* FOOTER */}
      <footer style={{ borderTop: '1px solid #e8e8ed', padding: '28px 48px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#fff' }}>
        <a href="/" style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, fontWeight: 600, color: '#1a1a1a', textDecoration: 'none' }}>
          <div style={{ width: 28, height: 28, borderRadius: 8, background: '#7F77DD', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 14 }}>🧠</div>
          Braindump
        </a>
        <div style={{ display: 'flex', gap: 20 }}>
          {['Features', 'Pricing', 'FAQ', 'Privacy', 'Terms'].map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} style={{ fontSize: 13, color: '#aaa', textDecoration: 'none' }}>{l}</a>
          ))}
        </div>
        <div style={{ fontSize: 12, color: '#ccc' }}>© 2026 Braindump. All rights reserved.</div>
      </footer>
    </div>
  )
}
