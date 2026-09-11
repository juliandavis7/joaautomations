'use server'

import { Resend } from 'resend'
import { contact as contactCopy } from '@/lib/copy'

/**
 * The contact endpoint. A server action, so no route handler and no
 * client-side key. RESEND_API_KEY is read from the environment and is
 * never committed; see .env.example.
 */

export type ContactState = {
  status: 'idle' | 'success' | 'error'
  message?: string
  errors?: Partial<Record<'name' | 'email' | 'project', string>>
  values?: { name: string; email: string; project: string }
}

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function submitContact(
  _prev: ContactState,
  formData: FormData
): Promise<ContactState> {
  const str = (k: string) => String(formData.get(k) ?? '').trim()

  // Honeypot. A bot fills it; a person never sees it. Report success so
  // the sender learns nothing about why it did not arrive.
  if (str('company')) return { status: 'success' }

  const name = str('name')
  const email = str('email')
  const project = str('project')
  const values = { name, email, project }

  const errors: ContactState['errors'] = {}
  if (name.length < 2) errors.name = contactCopy.errors.name
  if (!email) errors.email = contactCopy.errors.email
  else if (!EMAIL.test(email)) errors.email = contactCopy.errors.emailFormat
  if (project.length < 2) errors.project = contactCopy.errors.project

  if (Object.keys(errors).length > 0) {
    return { status: 'error', errors, values }
  }

  const key = process.env.RESEND_API_KEY
  const to = process.env.CONTACT_TO
  const from = process.env.CONTACT_FROM

  if (!key || !to || !from) {
    console.error('[contact] RESEND_API_KEY, CONTACT_TO or CONTACT_FROM is not set.')
    return { status: 'error', message: contactCopy.error, values }
  }

  try {
    const resend = new Resend(key)
    const { error } = await resend.emails.send({
      from,
      to: [to],
      replyTo: email,
      subject: `New inquiry from ${name}`,
      text: [`Name: ${name}`, `Email: ${email}`, '', project].join('\n'),
    })

    if (error) {
      console.error('[contact] Resend rejected the send:', error)
      return { status: 'error', message: contactCopy.error, values }
    }
  } catch (err) {
    console.error('[contact] Send threw:', err)
    return { status: 'error', message: contactCopy.error, values }
  }

  return { status: 'success', message: contactCopy.success }
}
