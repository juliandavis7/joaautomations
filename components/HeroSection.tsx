'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

export default function HeroSection() {
  return (
    <section id="site-hero" className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
      <style>{`
        @keyframes gradientDrift {
          0% { transform: translate3d(-10%, -7%, 0) scale(0.96); }
          30% { transform: translate3d(8%, 6%, 0) scale(1.14); }
          65% { transform: translate3d(-4%, 10%, 0) scale(1.06); }
          100% { transform: translate3d(-10%, -7%, 0) scale(0.96); }
        }

        @keyframes gradientFloat {
          0% { transform: translate3d(7%, 9%, 0) rotate(0deg) scale(0.98); }
          50% { transform: translate3d(-8%, -5%, 0) rotate(26deg) scale(1.18); }
          100% { transform: translate3d(7%, 9%, 0) rotate(0deg) scale(0.98); }
        }

        @keyframes shimmerMove {
          0% { transform: translateX(-120%) rotate(12deg); opacity: 0; }
          20% { opacity: 0.45; }
          55% { opacity: 0.25; }
          100% { transform: translateX(130%) rotate(12deg); opacity: 0; }
        }

        @keyframes gridFractalZoomA {
          0% { transform: scale(0.96); opacity: 0.03; }
          50% { transform: scale(1.08); opacity: 0.09; }
          100% { transform: scale(0.96); opacity: 0.03; }
        }

        @keyframes gridFractalZoomB {
          0% { transform: scale(1.1); opacity: 0.025; }
          50% { transform: scale(0.94); opacity: 0.075; }
          100% { transform: scale(1.1); opacity: 0.025; }
        }

        @keyframes ambientVibrance {
          0% { filter: saturate(1) brightness(1); }
          50% { filter: saturate(1.22) brightness(1.08); }
          100% { filter: saturate(1) brightness(1); }
        }
      `}</style>

      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(110,161,234,0.65),transparent_34%),radial-gradient(circle_at_82%_14%,rgba(35,155,229,0.48),transparent_30%),radial-gradient(circle_at_50%_78%,rgba(59,130,246,0.34),transparent_36%),linear-gradient(135deg,#071425_0%,#102D4E_48%,#071425_100%)]"
          style={{ animation: 'ambientVibrance 9s ease-in-out infinite' }}
        />
        <div
          className="absolute -left-32 top-10 h-[560px] w-[560px] rounded-full bg-[#6EA1EA]/45 blur-3xl"
          style={{ animation: 'gradientDrift 12s ease-in-out infinite' }}
        />
        <div
          className="absolute right-[-140px] top-[-80px] h-[620px] w-[620px] rounded-full bg-[#239BE5]/35 blur-3xl"
          style={{ animation: 'gradientFloat 14s ease-in-out infinite' }}
        />
        <div
          className="absolute bottom-[-180px] left-1/3 h-[620px] w-[620px] rounded-full bg-[#6EA1EA]/30 blur-3xl"
          style={{ animation: 'gradientDrift 16s ease-in-out infinite reverse' }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(2,6,23,0.05),rgba(2,6,23,0.72)),radial-gradient(circle_at_50%_40%,transparent_0%,rgba(2,6,23,0.34)_70%)]" />
        <div className="absolute inset-0">
          <div
            className="absolute -inset-12 origin-center bg-[linear-gradient(rgba(141,208,234,0.72)_1px,transparent_1px),linear-gradient(90deg,rgba(141,208,234,0.72)_1px,transparent_1px)] bg-[size:68px_68px]"
            style={{ animation: 'gridFractalZoomA 12s cubic-bezier(0.4,0,0.2,1) infinite' }}
          />
          <div
            className="absolute -inset-12 origin-center bg-[linear-gradient(rgba(110,161,234,0.62)_1px,transparent_1px),linear-gradient(90deg,rgba(110,161,234,0.62)_1px,transparent_1px)] bg-[size:36px_36px]"
            style={{ animation: 'gridFractalZoomB 12s cubic-bezier(0.4,0,0.2,1) infinite' }}
          />
        </div>
        <div
          className="absolute top-0 h-full w-1/3 bg-gradient-to-r from-transparent via-white/20 to-transparent blur-2xl"
          style={{ animation: 'shimmerMove 7s ease-in-out infinite' }}
        />
      </div>

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl items-center justify-center px-6 py-24 text-center sm:px-8 lg:px-12">
        <div className="max-w-4xl">
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: 'easeOut' }}
            className="text-5xl font-semibold tracking-tight text-white sm:text-6xl lg:text-7xl"
          >
            <span className="block">We automate the busywork.</span>
            <span className="mt-2 block text-[#8DD0EA]">You focus on growth.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            className="mx-auto mt-7 max-w-2xl text-lg leading-8 text-white/75 sm:text-xl"
          >
            Custom AI workflows for small businesses: built, tested, and maintained by our team.
            Live in under a week.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
            className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
          >
            <a
              href="#booking"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#6EA1EA] px-6 py-3.5 text-sm font-semibold text-white shadow-xl shadow-[#6EA1EA]/35 transition hover:scale-[1.02] hover:bg-[#5B96E6]"
            >
              Book a free strategy call
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
            </a>
            <a
              href="#process"
              className="group inline-flex items-center justify-center gap-2 rounded-full border border-[#3B82F6]/45 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-xl transition hover:scale-[1.02] hover:bg-[#3B82F6]/15"
            >
              <span>See how it works</span>
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
            className="mt-10 flex flex-wrap items-center justify-center gap-6"
          >
            {['50+ workflows built', 'Live in 5-7 days', 'ROI in the first 30 days'].map((item) => (
              <div key={item} className="flex items-center gap-2">
                <span className="text-sm text-[#3B82F6]">✓</span>
                <span className="text-sm text-white/65">{item}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
