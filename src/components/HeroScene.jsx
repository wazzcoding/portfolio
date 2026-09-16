import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import HeroTicker from './HeroTicker'
import ProfileCard from './ProfileCard'
import FloatingObject from './FloatingObject'

export default function HeroScene({ config, onCtaClick, reduceMotion, isHeroReady }) {
  const wrapper = useRef(null)
  const { scrollYProgress } = useScroll({ target: wrapper, offset: ['start start', 'end end'] })
  const profileY = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : -54])
  const introY = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : -95])
  const tickerY = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : 135])

  return <section id="home" ref={wrapper} className="hero-scroll" aria-label="Introduction">
    <div className="hero-sticky">
      <motion.div className="hero-intro" style={{ y: introY }}><motion.div initial={false} animate={reduceMotion || isHeroReady ? { opacity: 1, y: 0, filter: 'blur(0px)' } : { opacity: 0, y: 22, filter: 'blur(7px)' }} transition={{ duration: reduceMotion ? 0 : 0.65, ease: [0.22, 1, 0.36, 1] }}><p>Hi, I&apos;m <em>{config.name}</em></p><span>{config.role}</span></motion.div></motion.div>
      <HeroTicker text={config.ticker} y={tickerY} />
      {config.objects.map((object) => <FloatingObject key={object.id} object={object} progress={scrollYProgress} reduceMotion={reduceMotion} isHeroReady={isHeroReady} />)}
      <motion.div className="profile-layer" style={{ y: profileY }}><ProfileCard config={config} onCtaClick={onCtaClick} isHeroReady={isHeroReady} reduceMotion={reduceMotion} /></motion.div>
      <div className="scroll-cue" aria-hidden="true"><span /> Scroll to explore</div>
    </div>
  </section>
}
