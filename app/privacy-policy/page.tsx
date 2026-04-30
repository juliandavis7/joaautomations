import type { Metadata } from 'next'
import NavBar from '@/components/NavBar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Privacy Policy — JOA Automations',
  description:
    'How JOA Automations collects, uses, and protects your personal information when you use our website or book a call.',
}

export default function PrivacyPolicyPage() {
  return (
    <>
      <NavBar />
      <main
        className="px-5 sm:px-8 md:px-10"
        style={{
          paddingTop: 64 + 56,
          paddingBottom: 80,
          background: '#ffffff',
          minHeight: '100vh',
        }}
      >
        <article
          style={{
            maxWidth: 720,
            margin: '0 auto',
            fontFamily: "'DM Sans',sans-serif",
            color: '#333333',
            fontSize: 15,
            lineHeight: 1.7,
          }}
        >
          <h1
            style={{
              fontFamily: "'Plus Jakarta Sans',sans-serif",
              fontSize: 'clamp(1.75rem, 4vw, 2.25rem)',
              fontWeight: 700,
              color: '#102D4E',
              marginBottom: 12,
              lineHeight: 1.2,
            }}
          >
            Privacy Policy
          </h1>
          <p
            style={{
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              color: '#102D4E',
              opacity: 0.75,
              marginBottom: 28,
            }}
          >
            Last updated April 30, 2026
          </p>

          <p style={{ marginBottom: 20 }}>
            At <strong>JOA Automations</strong>, your privacy is important to us. When you fill out a
            form or book a call, we collect the information you provide (such as your name, email,
            phone number, and business details) solely for the purpose of responding to your inquiry
            and delivering our services.
          </p>

          <p style={{ marginBottom: 8 }}>We may use your information to:</p>
          <ul style={{ margin: '0 0 20px', paddingLeft: 22, listStyleType: 'disc' }}>
            <li style={{ marginBottom: 6 }}>Contact you regarding your request or booking</li>
            <li style={{ marginBottom: 6 }}>
              Send relevant updates or information about our services (only if you opt in)
            </li>
            <li style={{ marginBottom: 6 }}>Improve our communication and automation systems</li>
          </ul>

          <p style={{ marginBottom: 20 }}>
            We <strong>do not sell, rent, or share</strong> your personal information with any third
            parties. All data is stored securely and only accessed by authorized team members when
            necessary to serve you. You can request that we delete your information at any time by
            contacting us at{' '}
            <a
              href="mailto:joaautomations@gmail.com"
              style={{ color: '#102D4E', fontWeight: 600, textDecoration: 'underline' }}
            >
              joaautomations@gmail.com
            </a>
            .
          </p>

          <p style={{ marginBottom: 0 }}>
            By submitting any form on our site, you agree to the storing and processing of your
            personal data in accordance with this policy.
          </p>
        </article>
      </main>
      <Footer />
    </>
  )
}
