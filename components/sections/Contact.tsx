'use client'

import { useFormState, useFormStatus } from 'react-dom'
import Button from '@/components/ui/Button'
import Container from '@/components/ui/Container'
import Field from '@/components/ui/Field'
import Section from '@/components/ui/Section'
import Reveal from '@/components/motion/Reveal'
import { submitContact, type ContactState } from '@/lib/contact-action'
import { contact as contactCopy } from '@/lib/copy'

/**
 * Three fields on a Paper White card: name, email, and the project.
 * Validation errors come back from the server action and render inline
 * against the field they belong to, wired through aria-describedby.
 */

function Submit({ label, sending }: { label: string; sending: string }) {
  const { pending } = useFormStatus()
  return (
    <Button type="submit" disabled={pending} className="w-full sm:w-auto">
      {pending ? sending : label}
      <svg
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-16 w-16 flex-none"
        aria-hidden="true"
      >
        <path d="M3 8h10M9 4l4 4-4 4" />
      </svg>
    </Button>
  )
}

const initial: ContactState = { status: 'idle' }

export default function Contact() {
  const [state, formAction] = useFormState(submitContact, initial)
  const v = state.values

  return (
    <Section id="contact" labelledBy="contact-heading" topPadding>
      <Container>
        <Reveal>
          <div className="mx-auto w-full max-w-feature rounded-3xl bg-paper-white p-24 shadow-subtle sm:p-40 lg:p-60">
            <h2
              id="contact-heading"
              className="m-0 mb-24 font-perfectly-nineties-regular text-heading leading-heading font-normal text-ink-black sm:mb-36"
            >
              {contactCopy.heading}
            </h2>

            {state.status === 'success' ? (
              <p
                role="status"
                className="m-0 font-inter text-body leading-body tracking-body text-graphite"
              >
                {state.message ?? contactCopy.success}
              </p>
            ) : (
              <form action={formAction} className="flex flex-col gap-20" noValidate>
                <div className="grid grid-cols-1 gap-20 sm:grid-cols-2">
                  <Field
                    id="name"
                    label={contactCopy.fields.name.label}
                    placeholder={contactCopy.fields.name.placeholder}
                    required
                    error={state.errors?.name}
                    defaultValue={v?.name}
                  />
                  <Field
                    id="email"
                    type="email"
                    label={contactCopy.fields.email.label}
                    placeholder={contactCopy.fields.email.placeholder}
                    required
                    error={state.errors?.email}
                    defaultValue={v?.email}
                  />
                </div>
                <Field
                  id="project"
                  textarea
                  label={contactCopy.fields.project.label}
                  placeholder={contactCopy.fields.project.placeholder}
                  required
                  error={state.errors?.project}
                  defaultValue={v?.project}
                />

                {/* Honeypot. Hidden from people and from assistive tech. */}
                <div aria-hidden="true" className="hidden">
                  <label htmlFor="company">Company</label>
                  <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
                </div>

                {state.status === 'error' && state.message ? (
                  <p
                    role="alert"
                    className="m-0 font-inter text-body-sm leading-body-sm tracking-body-sm text-ink-black"
                  >
                    {state.message}
                  </p>
                ) : null}

                <div>
                  <Submit label={contactCopy.submit} sending={contactCopy.sending} />
                </div>
              </form>
            )}
          </div>
        </Reveal>
      </Container>
    </Section>
  )
}
