import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'

const greetings = ['Halo.', 'Hello.', 'Konnichiwa.', 'Bonjour.', 'Annyeong.', 'Ni Hao.', 'Hola.', 'Ciao.']

export default function LoadingScreen() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (index === greetings.length - 1) return undefined
    const delay = index === 0 ? 1050 : 360
    const timer = window.setTimeout(() => setIndex((current) => current + 1), delay)
    return () => window.clearTimeout(timer)
  }, [index])

  return <motion.div className="loading-screen" initial={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.55, ease: 'easeInOut' } }} aria-live="polite" aria-label="Loading portfolio">
    <div className="loading-content">
      <AnimatePresence mode="wait">
        <motion.p key={greetings[index]} className="loading-greeting" initial={{ opacity: 0, y: 16, filter: 'blur(7px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} exit={{ opacity: 0, y: -16, filter: 'blur(7px)' }} transition={{ duration: 0.18, ease: 'easeOut' }}>{greetings[index]}</motion.p>
      </AnimatePresence>
    </div><div className="loading-bottom"><span className="loading-label">Loading portfolio</span><div className="loading-track" aria-hidden="true"><motion.span initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 5, ease: [0.65, 0, 0.35, 1] }} /></div></div>
  </motion.div>
}
