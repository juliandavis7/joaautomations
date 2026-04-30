'use client'

import { useEffect } from 'react'

export default function BookingSection() {
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://link.msgsndr.com/js/form_embed.js'
    script.async = true
    document.body.appendChild(script)
    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script)
      }
    }
  }, [])

  return (
    <section id="booking" className="px-5 py-16 sm:px-8 md:px-10 md:py-24" style={{ background: '#F4F6F8', borderTop: '1px solid #E8ECF0' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <div style={{
            fontFamily: "'DM Sans',sans-serif", fontSize: 11, fontWeight: 600,
            letterSpacing: '0.1em', textTransform: 'uppercase', color: '#4C87DB', marginBottom: 12,
          }}>
            Get started
          </div>
          <h2 style={{
            fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 'clamp(28px, 6vw, 38px)', fontWeight: 800,
            color: '#0D1F35', lineHeight: 1.15, letterSpacing: '-0.02em', marginBottom: 14,
          }}>
            Let&apos;s build your automation roadmap
          </h2>
          <p style={{
            fontFamily: "'DM Sans',sans-serif", fontSize: 17, color: '#4A5568',
            margin: '0 auto', lineHeight: 1.6,
          }}>
            Book a free strategy call below, or send us a message for anything else.
          </p>
        </div>

        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-2 lg:gap-8">
          <div style={{
            background: '#fff', border: '1px solid #E8ECF0', borderRadius: 12,
            overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
          }}>
            <iframe
              src="https://api.leadconnectorhq.com/widget/booking/vSeadLyYXgNRD77GYwdo"
              className="block w-full min-h-[600px] lg:min-h-[700px]"
              style={{ border: 'none' }}
              id="vSeadLyYXgNRD77GYwdo_booking"
              title="Book a strategy call"
            />
          </div>

          <div style={{
            background: '#fff', border: '1px solid #E8ECF0', borderRadius: 12,
            overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
          }}>
            <iframe
              src="https://api.leadconnectorhq.com/widget/form/DYmesREeqmP3gHmOdlaK"
              className="block w-full min-h-[600px] lg:min-h-[700px]"
              style={{ border: 'none' }}
              id="inline-DYmesREeqmP3gHmOdlaK"
              title="Contact form"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
