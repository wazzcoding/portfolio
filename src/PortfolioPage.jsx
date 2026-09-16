import { useEffect, useRef, useState } from 'react'
import Lenis from 'lenis'
import { AnimatePresence } from 'framer-motion'
import { heroConfig, navItems, stackConfig } from './heroConfig'
import HeroScene from './components/HeroScene'
import CircularNavTransition from './components/CircularNavTransition'
import LoadingScreen from './components/LoadingScreen'
import InteractiveHoverButton from './components/InteractiveHoverButton'
import SectionWaveDivider from './components/SectionWaveDivider'
import StackMarquee from './components/StackMarquee'

const sections = [
  { id: 'about', eyebrow: 'About me', title: 'I turn bold ideas into memorable digital experiences.', copy: 'A multidisciplinary designer and developer focused on expressive interfaces, movement, and meaningful detail.' },
  { id: 'stack', eyebrow: 'Toolkit', title: 'Design-led, technically grounded.', copy: 'React, motion systems, visual identity, prototyping, and a healthy respect for performance.' },
  { id: 'services', eyebrow: 'What I do', title: 'From the first spark to the polished launch.', copy: 'I help ambitious teams create digital products and portfolio sites that feel unmistakably theirs.' },
  { id: 'projects', eyebrow: 'Selected work', title: 'A few things made with care.', copy: 'This area is ready for your case studies, featured projects, and collaborations.' },
  { id: 'contact', eyebrow: 'Start a project', title: 'Have a bright idea?', copy: 'Tell me about it and let us make something with real personality.' },
]

export default function PortfolioPage() {
  const lenisRef = useRef(null)
  const transitionCovered = useRef(false)
  const [activeSection, setActiveSection] = useState('home')
  const [transition, setTransition] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isHeroReady, setIsHeroReady] = useState(false)
  const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

  useEffect(() => {
    if (reduceMotion) return undefined
    const lenis = new Lenis({ lerp: 0.09, smoothWheel: true, syncTouch: false })
    lenisRef.current = lenis
    let frame
    const raf = (time) => { lenis.raf(time); frame = requestAnimationFrame(raf) }
    frame = requestAnimationFrame(raf)
    return () => { cancelAnimationFrame(frame); lenis.destroy() }
  }, [reduceMotion])

  useEffect(() => {
    document.body.classList.add('is-loading')
    const timer = window.setTimeout(() => {
      setIsLoading(false)
      document.body.classList.remove('is-loading')
    }, reduceMotion ? 250 : 5100)
    return () => {
      window.clearTimeout(timer)
      document.body.classList.remove('is-loading')
    }
  }, [reduceMotion])

  useEffect(() => {
    const observed = ['home', ...sections.map(({ id }) => id)]
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && setActiveSection(entry.target.id)),
      { rootMargin: '-42% 0px -48% 0px', threshold: 0 },
    )
    observed.forEach((id) => document.getElementById(id) && observer.observe(document.getElementById(id)))
    return () => observer.disconnect()
  }, [])

  const navigate = (id, event) => {
    event?.preventDefault()
    const target = document.getElementById(id)
    if (!target) return
    const rect = event?.currentTarget?.getBoundingClientRect()
    const origin = rect ? { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 } : { x: innerWidth / 2, y: innerHeight / 2 }
    if (reduceMotion) {
      target.scrollIntoView({ behavior: 'smooth' })
      history.replaceState(null, '', `#${id}`)
      return
    }
    transitionCovered.current = false
    setTransition({ origin, target: id })
  }

  const onCoverComplete = () => {
    if (!transition || transitionCovered.current) return
    transitionCovered.current = true
    const target = document.getElementById(transition.target)
    history.replaceState(null, '', `#${transition.target}`)
    if (lenisRef.current) lenisRef.current.scrollTo(target, { offset: 0, immediate: true })
    else target.scrollIntoView({ behavior: 'auto' })
  }

  return (
    <main>
      <nav className="site-nav" aria-label="Primary navigation">
        <div className="nav-links">
          {navItems.map((item) => <a key={item.id} href={`#${item.id}`} className={activeSection === item.id ? 'is-active' : ''} onClick={(event) => navigate(item.id, event)}>{item.label}</a>)}
        </div>
        <a className="sign-up" href="#contact" onClick={(event) => navigate('contact', event)}>Say hello <span>↗</span></a>
      </nav>
      <HeroScene config={heroConfig} onCtaClick={(event) => navigate('contact', event)} reduceMotion={reduceMotion} isHeroReady={isHeroReady} />
      {sections.map((section, index) => {
        if (section.id === 'stack') {
          return (
            <section className="content-section section-stack section-stack--white" id="stack" key="stack">
              <h2 className="stack-title">tech stack</h2>
              <div className="stack-marquee-wrap stack-marquee-wrap--large">
                <StackMarquee title="FRONTEND" items={stackConfig.frontend} direction="left" reduceMotion={reduceMotion} speed={18} />
                <StackMarquee title="BACKEND" items={stackConfig.backend} direction="right" reduceMotion={reduceMotion} speed={18} />
                <StackMarquee title="DEPLOYMENT" items={stackConfig.deployment} direction="left" reduceMotion={reduceMotion} speed={18} />
              </div>
            </section>
          )
        }
        return (
          <section className={`content-section section-${section.id}`} id={section.id} key={section.id}>
            {section.id === 'about' && <SectionWaveDivider fill="#121319" />}
            <div className="section-count">0{index + 1}</div>
            <div><p className="eyebrow">{section.eyebrow}</p><h2>{section.title}</h2><p className="section-copy">{section.copy}</p>{section.id === 'contact' && <a className="email-link" href="mailto:hello@example.com">hello@example.com ↗</a>}</div>
          </section>
        )
      })}
      <AnimatePresence>{transition && <CircularNavTransition origin={transition.origin} onCovered={onCoverComplete} onComplete={() => setTransition(null)} />}</AnimatePresence>
      <AnimatePresence onExitComplete={() => setIsHeroReady(true)}>{isLoading && <LoadingScreen />}</AnimatePresence>
    </main>
  )
}
