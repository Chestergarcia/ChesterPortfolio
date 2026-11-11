import React, { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { motion, useAnimationControls, useReducedMotion } from 'framer-motion'
import {
  MapPin, Mail, Globe, ArrowUpRight, ChevronDown,
  BriefcaseBusiness, Palette, Code2,
  LayoutDashboard, MonitorSmartphone, UsersRound, Menu, X, Send
} from 'lucide-react'
import {
  siFigma, siFramer, siShopify, siHtml5, siCss, siJavascript, siNotion
} from 'simple-icons'
import './styles.css'

const tech = [
  { name: 'Figma', icon: siFigma },
  { name: 'Framer', icon: siFramer },
  { name: 'Photoshop', shortName: 'Ps', color: '#31a8ff' },
  { name: 'Shopify', icon: siShopify },
  { name: 'HTML', icon: siHtml5 },
  { name: 'CSS', icon: siCss },
  { name: 'JavaScript', icon: siJavascript },
  { name: 'Notion', icon: siNotion },
]
const skills = ['UI Design', 'Web Design', 'Prototyping', 'Responsive Design', 'Visual Design', 'HTML & CSS', 'Figma', 'Framer']

const createGmailComposeUrl = (subject, body) => {
  const params = new URLSearchParams({
    view: 'cm',
    fs: '1',
    to: 'gchester005@gmail.com',
    su: subject,
    body,
  })
  return `https://mail.google.com/mail/?${params.toString()}`
}

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
    icon: <LayoutDashboard aria-hidden="true" />,
  },
  {
    title: 'WorkSync — HR Management Dashboard',
    type: 'Product design · Personal project',
    description: 'An interface exploration focused on organizing workplace tasks and people information into a simple, consistent dashboard experience.',
    tag: 'Product UI',
    color: 'peach',
    icon: <UsersRound aria-hidden="true" />,
  },
  {
    title: 'WorkSync — Website Design',
    type: 'Web design · Framer',
    description: 'A responsive business website concept with clean layouts, straightforward navigation, and a consistent visual system across screen sizes.',
    tag: 'Website',
    color: 'blue',
    icon: <MonitorSmartphone aria-hidden="true" />,
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
    <div className="ticker" role="region" aria-label="Tools and technologies">
      <motion.div
        className="ticker-track"
        animate={tickerControls}
      >
        {[false, true].map(duplicate => (
          <div className="ticker-group" key={duplicate ? 'duplicate' : 'primary'} role={duplicate ? undefined : 'list'} aria-hidden={duplicate || undefined}>
            {tech.map(item => (
              <div className="tech-chip" key={item.name} role={duplicate ? undefined : 'listitem'}>
                <span className={`tech-icon${item.shortName ? ' tech-icon-photoshop' : ''}`} style={item.shortName ? { color: item.color } : { color: `#${item.icon.hex}` }}>
                  {item.shortName ? item.shortName : <svg viewBox="0 0 24 24" aria-hidden="true"><path d={item.icon.path} /></svg>}
                </span>
                <span>{item.name}</span>
              </div>
            ))}
          </div>
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
          <a className="button button-outline" href={createGmailComposeUrl('Request for CV', 'Hello, I would like to request a copy of your CV.\n\nMy name:\nMy email:')} target="_blank" rel="noreferrer" aria-label="Request a copy of Chester's CV by email">Request CV <Mail size={14} /></a>
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
                <a className="project-card" href={createGmailComposeUrl(`Project inquiry: ${project.title}`, `Hello, I would like to know more about ${project.title}.\n\nMy name:\nMy email:`)} key={project.title} target="_blank" rel="noreferrer">
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
            <form action="https://formsubmit.co/gchester005@gmail.com" method="POST">
              <input type="hidden" name="_subject" value={form.subject || 'Portfolio inquiry'} />
              <label>Your Name<input required name="name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Your name" /></label>
              <label>Your Email<input required type="email" name="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="you@example.com" /></label>
              <label>Subject<input name="subject" value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })} placeholder="What is this about?" /></label>
              <label>Message<textarea required name="message" rows="4" value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} placeholder="Tell me a little about it..." /></label>
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
