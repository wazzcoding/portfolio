import { motion } from 'framer-motion'

export default function HeroTicker({ text, y }) {
  const words = `${text} • ${text} • ${text} • `
  return <motion.div className="ticker" style={{ y }} aria-hidden="true"><div className="ticker-track"><span>{words}</span><span>{words}</span></div></motion.div>
}
