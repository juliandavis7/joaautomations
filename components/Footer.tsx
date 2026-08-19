import { site } from '@/content/site'

/** Wordmark, email, one legal row. No video. No Terms link. */
export default function Footer() {
  return (
    <footer className="container footer">
      <div className="max-w-ct mx-auto footer__inner">
        <p className="display footer__wordmark">{site.wordmark}</p>
        <a className="body footer__email" href={`mailto:${site.email}`}>
          {site.email}
        </a>
        <p className="mono footer__legal">
          <span>&copy; {new Date().getFullYear()} JOA</span>
          <a href="/privacy-policy">Privacy</a>
        </p>
      </div>
    </footer>
  )
}
