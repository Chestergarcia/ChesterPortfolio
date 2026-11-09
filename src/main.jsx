import React, { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { motion, useAnimationControls, useReducedMotion } from 'framer-motion'
import {
  MapPin, Mail, Globe, ArrowUpRight, ChevronDown,
  BriefcaseBusiness, Palette, Code2, Figma, Layers,
  MonitorSmartphone, Menu, X, Send
} from 'lucide-react'
import './styles.css'

const tech = [
  { name: 'Figma', icon: <Figma />, url: 'https://www.figma.com/' },
  { name: 'Framer', icon: <Layers />, url: 'https://www.framer.com/' },
  { name: 'Photoshop', icon: <Palette />, url: 'https://www.adobe.com/products/photoshop.html' },
  { name: 'Shopify', icon: <Globe />, url: 'https://www.shopify.com/' },
  { name: 'HTML', icon: <Code2 />, url: 'https://developer.mozilla.org/en-US/docs/Web/HTML' },
  { name: 'CSS', icon: <Code2 />, url: 'https://developer.mozilla.org/en-US/docs/Web/CSS' },
  { name: 'JavaScript', icon: <Code2 />, url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript' },
  { name: 'Notion', icon: <BriefcaseBusiness />, url: 'https://www.notion.so/' },
]
const skills = ['UI Design', 'Web Design', 'Prototyping', 'Responsive Design', 'Visual Design', 'HTML & CSS', 'Figma', 'Framer']

const experience = [
  {
    role: 'Independent UI/UX & Web Design',
    company: 'Personal practice · Philippines',
    date: '2025 — Present',
    icon: <MonitorSmartphone />,
    detail: 'Creating interface concepts, responsive website layouts, and portfolio projects while continuing to build practical UI/UX skills.'
  },
  {
    role: 'Multimedia & Graphics Design Intern',
    company: 'Jacinto & Lirio · Philippines',
    date: '2024 — 2025',
    icon: <Palette />,
    detail: 'Created marketing graphics and product visuals for digital platforms, edited images, and helped maintain product listings through Shopify.'
  },
  {
    role: 'Technical Support Intern (OJT)',
    company: 'IT Avenue · Philippines',
    date: '2024',
    icon: <Code2 />,
    detail: 'Gained hands-on exposure to technical support workflows, troubleshooting, and assisting with basic IT-related concerns.'
  },
]

const projects = [
  {
    title: 'HRHub — HR Management Dashboard',
    type: 'Dashboard UI · Personal project',
    description: 'A dashboard concept for employee records, attendance monitoring, and HR data. Designed to make key information easier to scan through clear hierarchy and structured navigation.',
    tag: 'Dashboard',
    color: 'mint',
    icon: '▦',
    link: '#contact'
  },
  {
    title: 'WorkSync — HR Management Dashboard',
    type: 'Product design · Personal project',
    description: 'An interface exploration focused on organizing workplace tasks and people information into a simple, consistent dashboard experience.',
    tag: 'Product UI',
    color: 'peach',
    icon: '◎',
    link: '#contact'
  },
  {
    title: 'WorkSync — Website Design',
    type: 'Web design · Framer',
    description: 'A responsive business website concept with clean layouts, straightforward navigation, and a consistent visual system across screen sizes.',
    tag: 'Website',
    color: 'blue',
    icon: '◉',
    link: '#contact'
  },
]

function SectionTitle({ children, eyebrow }) {
  return <div className="section-heading"><span>{eyebrow}</span><h2>{children}</h2></div>
}

function TechTicker() {
  const shouldReduceMotion = useReducedMotion()
  const tickerControls = useAnimationControls()

  useEffect(() => {
    if (shouldReduceMotion) {
      tickerControls.set({ x: '0%' })
      return
    }

    tickerControls.start({
      x: ['0%', '-50%'],
      transition: { duration: 24, repeat: Infinity, ease: 'linear' }
    })
    return () => tickerControls.stop()
  }, [shouldReduceMotion, tickerControls])

  return (
    <div className="ticker" aria-label="Tools and technologies">
      <motion.div
        className="ticker-track"
        animate={tickerControls}
        onHoverStart={() => tickerControls.stop()}
        onHoverEnd={() => {
          if (!shouldReduceMotion) {
            tickerControls.start({ x: ['0%', '-50%'], transition: { duration: 24, repeat: Infinity, ease: 'linear' } })
          }
        }}
        onFocusCapture={() => tickerControls.stop()}
        onBlurCapture={event => {
          if (!event.currentTarget.contains(event.relatedTarget) && !shouldReduceMotion) {
            tickerControls.start({ x: ['0%', '-50%'], transition: { duration: 24, repeat: Infinity, ease: 'linear' } })
          }
        }}
      >
        {tech.map(item => (
          <a className="tech-chip" href={item.url} key={item.name} target="_blank" rel="noreferrer">
            <span className="tech-icon">{item.icon}</span><span>{item.name}</span><span className="sr-only">(opens in a new tab)</span>
          </a>
        ))}
        {tech.map(item => (
          <a className="tech-chip" href={item.url} key={`${item.name}-duplicate`} target="_blank" rel="noreferrer" tabIndex={-1} aria-hidden="true">
            <span className="tech-icon">{item.icon}</span><span>{item.name}</span>
          </a>
        ))}
      </motion.div>
    </div>
  )
}

function App() {
  const [expanded, setExpanded] = useState(0)
  const [menuOpen, setMenuOpen] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })

  const nav = ['Home', 'About', 'Skills', 'Experience', 'Projects', 'Contact']
  const submitForm = (e) => {
    e.preventDefault()
    const subject = encodeURIComponent(form.subject || 'Portfolio inquiry')
    const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`)
    window.location.href = `mailto:gchester005@gmail.com?subject=${subject}&body=${body}`
  }

  return (
    <div className="site-shell" id="home">
      <header className="topbar">
        <button className="mobile-brand" type="button" aria-label="Back to home" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>CG<span>.</span></button>
        <button className="menu-toggle" type="button" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen} aria-controls="site-navigation" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
        <nav id="site-navigation" className={menuOpen ? 'nav-links open' : 'nav-links'}>
          {nav.map(item => <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMenuOpen(false)}>{item}</a>)}
        </nav>
      </header>

      <main className="layout">
        <aside className="profile-card">
          <img className="portrait" src={`${import.meta.env.BASE_URL}profile.png`} alt="Portrait of Chester Garcia" />
          <span className="hello">Hello, I'm</span>
          <h1>Chester Garcia</h1>
          <p className="profile-role">UI/UX & Web Designer,<br />Digital Creative.</p>
          <div className="profile-rule" />
          <div className="availability"><span className="status-dot" />Available for opportunities</div>
          <div className="profile-meta"><MapPin />Philippines</div>
          <div className="profile-meta"><Globe /><a href="https://chestergarcia.github.io/ChesterPortfolio/" target="_blank" rel="noreferrer">Portfolio website</a></div>
          <div className="profile-meta"><Mail /><a href="mailto:gchester005@gmail.com">gchester005@gmail.com</a></div>
          <div className="profile-rule" />
          <a className="button button-outline" href="mailto:gchester005@gmail.com?subject=Request%20for%20CV" aria-label="Request a copy of Chester's CV by email">Request CV <Mail size={14} /></a>
          <a className="button button-dark" href="#contact">Contact Me</a>
          <p className="profile-note">Open to learning, collaboration, and new opportunities.</p>
        </aside>

        <div className="content-column">
          <section className="panel about-panel" id="about">
            <SectionTitle eyebrow="A LITTLE INTRODUCTION">About</SectionTitle>
            <p>I'm a UI/UX and Web Designer based in the Philippines, interested in creating clear, thoughtful, and user-friendly digital experiences.</p>
            <p>My background in multimedia design and technical support helps me approach design with both visual creativity and practical thinking. I'm continuously improving my skills in interface design, responsive layouts, and front-end fundamentals.</p>
          </section>

          <section className="panel skills-panel" id="skills">
            <SectionTitle eyebrow="WHAT I WORK WITH">Skills</SectionTitle>
            <div className="skill-list">{skills.map(skill => <span className="skill-pill" key={skill}>{skill}</span>)}</div>
          </section>

          <section className="panel experience-panel" id="experience">
            <SectionTitle eyebrow="WHERE I'VE LEARNED">Experience</SectionTitle>
            <div className="experience-list">
              {experience.map((item, i) => (
                <div className="experience-item" key={item.role}>
                  <button className="experience-toggle" onClick={() => setExpanded(expanded === i ? -1 : i)} aria-expanded={expanded === i}>
                    <span className="experience-icon">{item.icon}</span>
                    <span className="experience-main"><strong>{item.role}</strong><small>{item.company}</small></span>
                    <span className="experience-date">{item.date}</span>
                    <ChevronDown className={expanded === i ? 'chevron rotated' : 'chevron'} size={15} />
                  </button>
                  {expanded === i && <motion.p className="experience-detail" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}>{item.detail}</motion.p>}
                </div>
              ))}
            </div>
          </section>

          <div className="ticker-label">TOOLS & TECHNOLOGIES</div>
          <TechTicker />

          <section className="panel projects-panel" id="projects">
            <SectionTitle eyebrow="A FEW THINGS I'VE WORKED ON">Selected Projects</SectionTitle>
            <div className="project-list">
              {projects.map(project => (
                <a className="project-card" href={project.link} key={project.title} onClick={() => setForm(current => ({ ...current, subject: `Project inquiry: ${project.title}` }))}>
                  <span className={`project-icon ${project.color}`}>{project.icon}</span>
                  <span className="project-copy"><strong>{project.title}</strong><small>{project.type}</small><span>{project.description}</span></span>
                  <ArrowUpRight className="project-arrow" size={16} />
                </a>
              ))}
            </div>
          </section>

          <section className="panel contact-panel" id="contact">
            <SectionTitle eyebrow="LET'S CONNECT">Contact</SectionTitle>
            <p className="contact-intro">Have a project, opportunity, or question? Send me a message.</p>
            <form onSubmit={submitForm}>
              <label>Your Name<input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Your name" /></label>
              <label>Your Email<input required type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="you@example.com" /></label>
              <label>Subject<input value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })} placeholder="What is this about?" /></label>
              <label>Message<textarea required rows="4" value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} placeholder="Tell me a little about it..." /></label>
              <button className="button button-dark submit-button" type="submit">Send Message <Send size={14} /></button>
            </form>
          </section>
          <footer><span>© {new Date().getFullYear()} Chester Garcia · Philippines</span><a href="#home">Back to top ↑</a></footer>
        </div>
      </main>
    </div>
  )
}

createRoot(document.getElementById('root')).render(<App />)
