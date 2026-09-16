import { motion } from 'framer-motion'
import { useEffect } from 'react'

export default function CircularNavTransition({ origin, onCovered, onComplete }) {
  const radius = Math.hypot(Math.max(origin.x, innerWidth - origin.x), Math.max(origin.y, innerHeight - origin.y)) + 48
  useEffect(() => {
    const timer = window.setTimeout(onCovered, 310)
    return () => window.clearTimeout(timer)
  }, [onCovered])
  return <motion.div className="nav-transition" style={{ '--origin-x': `${origin.x}px`, '--origin-y': `${origin.y}px`, '--radius': `${radius}px` }} initial={{ clipPath: 'circle(0px at var(--origin-x) var(--origin-y))', opacity: 1 }} animate={{ clipPath: ['circle(0px at var(--origin-x) var(--origin-y))', 'circle(var(--radius) at var(--origin-x) var(--origin-y))', 'circle(var(--radius) at var(--origin-x) var(--origin-y))', 'circle(0px at var(--origin-x) var(--origin-y))'], opacity: [1, 1, 1, 0] }} transition={{ duration: 0.78, times: [0, 0.38, 0.66, 1], ease: ['easeIn', 'linear', 'easeOut'] }} onAnimationComplete={onComplete} aria-hidden="true" />
}
