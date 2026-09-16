import { motion, useTransform } from 'framer-motion'
import { useLayoutEffect, useRef, useState } from 'react'

export default function FloatingObject({ object, progress, reduceMotion, isHeroReady }) {
  const objectRef = useRef(null)
  const [launchOffset, setLaunchOffset] = useState({ x: 0, y: 0 })
  const [hasLanded, setHasLanded] = useState(false)
  const parallaxY = useTransform(progress, [0, 1], [0, reduceMotion ? 0 : object.parallax])

  useLayoutEffect(() => {
    const updateLaunchOffset = () => {
      const rect = objectRef.current?.getBoundingClientRect()
      if (!rect) return
      setLaunchOffset({
        x: window.innerWidth / 2 - (rect.left + rect.width / 2),
        y: window.innerHeight / 2 - (rect.top + rect.height / 2),
      })
    }
    updateLaunchOffset()
    window.addEventListener('resize', updateLaunchOffset)
    return () => window.removeEventListener('resize', updateLaunchOffset)
  }, [])

  const launchAnimation = reduceMotion || isHeroReady
    ? { x: 0, y: 0, scale: 1, opacity: 1 }
    : { x: launchOffset.x, y: launchOffset.y, scale: 0.45, opacity: 0 }

  return <motion.div className={`floating-object object-${object.kind}`} style={{ '--x': object.x, '--y': object.y, '--mobile-x': object.mobileX, '--mobile-y': object.mobileY, '--size': `${object.size}px`, rotateZ: object.rotateZ, y: parallaxY }}>
    <motion.div ref={objectRef} className="object-launch" initial={false} animate={launchAnimation} transition={isHeroReady && !reduceMotion ? { type: 'spring', stiffness: 48, damping: 17, mass: 1.15 } : { duration: 0 }} onAnimationComplete={() => { if (isHeroReady && !reduceMotion) setHasLanded(true) }}>
      <motion.div className="object-float" animate={hasLanded && !reduceMotion ? { y: [-object.float, object.float, -object.float] } : { y: 0 }} transition={{ duration: object.duration, delay: 0, repeat: hasLanded && !reduceMotion ? Infinity : 0, ease: 'easeInOut' }}>
        <span className="object-shape">
          {object.asset ? <img src={object.asset} alt={`${object.label} logo`} /> : <><strong>{object.mark}</strong><small>{object.label}</small></>}
        </span>
      </motion.div>
    </motion.div>
  </motion.div>
}
