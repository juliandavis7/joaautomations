import Image from 'next/image'
import Container from '@/components/ui/Container'
import Section from '@/components/ui/Section'
import Reveal from '@/components/motion/Reveal'

/**
 * About on the Ash Mist canvas. Copy stays centered; the two founder
 * squares sit below as floating cards — Portal's useportal.net treatment
 * of rounded tiles, a 5px glow ring, and a slight opposing tilt.
 */
export default function About({
  heading,
  body,
  founders,
}: {
  heading: string
  body: string
  founders: readonly { name: string; src: string; alt: string }[]
}) {
  return (
    <Section id="about" labelledBy="about-heading" topPadding>
      <Container>
        <Reveal className="mx-auto max-w-reading text-center">
          <h2
            id="about-heading"
            className="m-0 mb-16 font-perfectly-nineties-regular text-heading leading-heading font-normal text-ink-black sm:mb-20"
          >
            {heading}
          </h2>
          <p className="mx-auto font-inter text-body leading-body tracking-body text-graphite">
            {body}
          </p>
        </Reveal>

        <Reveal
          delay={0.06}
          className="mx-auto mt-60 flex max-w-reading items-start justify-center lg:mt-80"
        >
          {founders.map((f, i) => (
            <figure
              key={f.name}
              className={`m-0 w-full max-w-[232px] ${i === 1 ? 'sm:-ml-16' : ''}`}
            >
              <div
                className={`relative aspect-square overflow-hidden rounded-3xl-2 shadow-subtle ${
                  i === 0 ? 'sm:-rotate-6' : 'sm:rotate-6'
                }`}
              >
                <Image
                  src={f.src}
                  alt={f.alt}
                  width={500}
                  height={500}
                  sizes="232px"
                  className="absolute left-1/2 top-1/2 h-[128%] w-[128%] max-w-none object-cover"
                  style={{
                    transform:
                      i === 0
                        ? 'translate(-56%, -50%) scaleX(-1)'
                        : 'translate(-44%, -50%) scaleX(-1)',
                  }}
                />
              </div>
              <figcaption className="mt-20 text-center font-inter text-body-sm leading-body-sm tracking-body-sm font-medium text-ink-black">
                {f.name}
              </figcaption>
            </figure>
          ))}
        </Reveal>
      </Container>
    </Section>
  )
}
