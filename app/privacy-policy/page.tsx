import type { Metadata } from 'next'
import Footer from '@/components/Footer'
import NavBar from '@/components/NavBar'
import { site } from '@/content/site'

export const metadata: Metadata = {
  title: `Privacy — ${site.wordmark}`,
  description: `How ${site.wordmark} handles information collected through ${site.domain}.`,
}

/**
 * Rewritten this round. The previous copy described an AI automation
 * agency running SMS sequences and a booking widget; none of that is what
 * this site does now.
 */
export default function PrivacyPolicy() {
  return (
    <>
      <NavBar />
      <main id="top" className="shell section legal">
        <div className="max-w-ct mx-auto">
          <h1 className="display">Privacy</h1>
          <p className="mono legal__updated">Last updated 19 August 2026</p>

          <div className="legal__body">
            <h2 className="mono">Who we are</h2>
            <p>
              {site.wordmark} is a two-person studio. We design and build websites, implement
              CRMs, and automate small-business workflows. This policy covers {site.domain}.
            </p>

            <h2 className="mono">What we collect</h2>
            <p>
              Only what you type into the contact form: your name, your email address, a
              description of what you are building, and a budget range. There is no account to
              create, and we do not ask for anything else.
            </p>

            <h2 className="mono">Why we collect it</h2>
            <p>
              To read your message and write back. That is the whole purpose. We do not sell
              it, rent it, or add you to a marketing list, and we do not send you anything you
              did not ask for.
            </p>

            <h2 className="mono">Who else sees it</h2>
            <p>
              Two services handle the message on its way to us: Resend delivers the email, and
              Vercel hosts the site and keeps standard server logs. Neither is given the data
              for their own purposes.
            </p>

            <h2 className="mono">Cookies and analytics</h2>
            <p>
              This site sets no advertising or tracking cookies of its own.
            </p>

            <h2 className="mono">How long we keep it</h2>
            <p>
              Your message stays in our email the way any other email does. Ask us to delete it
              and we will.
            </p>

            <h2 className="mono">Your choices</h2>
            <p>
              Write to{' '}
              <a href={`mailto:${site.email}`}>
                {site.email}
              </a>{' '}
              to see what we hold about you, correct it, or have it deleted.
            </p>

            <h2 className="mono">Changes</h2>
            <p>
              If this policy changes, the date at the top changes with it.
            </p>
          </div>
        </div>
      </main>
      <div className="on-dark">
        <Footer />
      </div>
    </>
  )
}
