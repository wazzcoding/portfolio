import { motion } from 'framer-motion'
import InteractiveHoverButton from './InteractiveHoverButton'

export default function ProfileCard({ config, onCtaClick, isHeroReady, reduceMotion }) {
  const ready = reduceMotion || isHeroReady
  const transition = (delay = 0) => reduceMotion ? { duration: 0 } : { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }

  return <>
    <motion.figure className="profile-card" initial={false} animate={ready ? { opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' } : { opacity: 0, scale: 0.88, y: 16, filter: 'blur(7px)' }} transition={transition(0.18)}>
      <div className="profile-flipper">
        <div className="profile-face profile-front"><img src={config.avatar} alt={`Portrait of ${config.name}`} /></div>
        <div className="profile-face profile-back"><span>SCROLL</span><i>↓</i><small>Explore my work</small></div>
      </div>
    </motion.figure>
    <motion.div className="client-chip" initial={false} animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }} transition={transition(0.78)}><div className="mini-faces"><i>✦</i><i>●</i><i>♥</i></div><span>80+ happy clients</span></motion.div>
    <motion.div initial={false} animate={ready ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.96, y: 16 }} transition={transition(1.02)}><InteractiveHoverButton as="a" text={config.cta} href="#contact" className="hero-cta" onClick={onCtaClick} wide /></motion.div>
  </>
}
