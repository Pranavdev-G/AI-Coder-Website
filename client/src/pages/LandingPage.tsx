import { motion } from "framer-motion";
import { Activity, ArrowDownRight, ArrowRight, ArrowUpRight, Check, Code2, GitBranch, LockKeyhole, ShieldCheck, Sparkles, Workflow } from "lucide-react";
import { Link } from "wouter";

const codePreview = [
  ["1", "def ", "process_transactions", "(transactions, users):"],
  ["2", "    results = []"],
  ["3", "    for transaction in transactions:"],
  ["4", "        user = next((u for u in users"],
  ["5", "                    if u.id == transaction.user_id), None)"],
  ["6", "        if user and transaction.amount > 0:"],
  ["7", "            results.append({"],
  ["8", "                \"user\": user.name,"],
  ["9", "                \"amount\": transaction.amount"],
  ["10", "            })"],
  ["11", "    return results"],
];

const features = [
  { icon: Activity, tag: "01 / REVIEW", title: "Find the issue.\nUnderstand the why.", body: "Static signals and repository context come together in one review. Every finding shows its impact, evidence, and a path to resolution." },
  { icon: Workflow, tag: "02 / REFACTOR", title: "Better code,\nwith proof.", body: "Generate focused patches, compare the diff, then validate with analysis and tests before anything is applied." },
  { icon: ShieldCheck, tag: "03 / SHIP SAFELY", title: "Security in the\nengineering loop.", body: "Surface actionable risks with CWE and OWASP context—then follow each fix from finding to passing validation." },
];

const pipeline = ["Your code", "Static analysis", "AI reasoning", "Validated fix", "Ship with confidence"];

export default function LandingPage() {
  return (
    <div className="landing-page">
      <header className="landing-nav">
        <a className="brand-lockup landing-brand" href="/" aria-label="AI Coder home"><span className="brand-mark"><span className="brand-glyph"><Code2 size={16} /></span><span className="brand-name">ai<span>coder</span></span></span></a>
        <nav className="landing-links" aria-label="Product navigation"><a href="#platform">Platform</a><a href="#workflow">How it works</a><a href="#trust">Trust</a></nav>
        <div className="landing-nav-actions"><Link href="/dashboard" className="nav-signin">Open workspace <ArrowUpRight size={14} /></Link><Link href="/review" className="button-primary nav-cta">Try the demo <ArrowRight size={15} /></Link></div>
      </header>

      <main>
        <section className="hero-section">
          <div className="hero-grid" />
          <div className="hero-orb hero-orb-one" /><div className="hero-orb hero-orb-two" />
          <div className="hero-inner">
            <motion.div className="hero-copy" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
              <div className="eyebrow"><span className="status-pulse" /> THE INTELLIGENCE LAYER FOR YOUR CODE</div>
              <h1>Understand.<br /><span>Review.</span> Refactor.<br />Ship <em>better code.</em></h1>
              <p className="hero-subtitle">An intelligent code engineering platform powered by AI, static analysis, and repository-level reasoning.</p>
              <div className="hero-actions"><Link href="/dashboard" className="button-primary hero-primary">Start coding <ArrowRight size={16} /></Link><a href="#product-preview" className="button-secondary hero-secondary">Explore the demo <ArrowDownRight size={16} /></a></div>
              <div className="hero-proof"><div className="proof-avatars"><span>PY</span><span>JS</span><span>TS</span></div><span>Built for the way <strong>engineers think.</strong></span><span className="proof-dot">·</span><span>7 languages supported</span></div>
            </motion.div>

            <motion.div className="hero-product" id="product-preview" initial={{ opacity: 0, y: 24, rotate: 1.2 }} animate={{ opacity: 1, y: 0, rotate: 0 }} transition={{ duration: 0.7, delay: 0.12 }}>
              <div className="product-window">
                <div className="window-toolbar"><div className="traffic-lights"><i /><i /><i /></div><div className="window-breadcrumb"><span>studio</span><span>/</span><strong>transaction_service.py</strong><span className="python-pill">PY</span></div><span className="window-live"><span /> LIVE REVIEW</span></div>
                <div className="preview-editor-row">
                  <div className="preview-code"><div className="editor-tab"><Code2 size={13} /> transaction_service.py <span>×</span></div><div className="code-lines">
                    {codePreview.map(([line, ...content], index) => <div className={`code-line ${index === 3 || index === 4 ? "line-issue" : ""}`} key={line}><span className="code-num">{line.padStart(2, "0")}</span><code>{index === 0 ? <><span className="syntax-blue">def</span> <span className="syntax-cyan">process_transactions</span>(transactions, users):</> : content.join("")}</code>{(index === 3 || index === 4) && <span className="line-alert">●</span>}</div>)}
                  </div><div className="editor-status"><span>Python 3.12</span><span>UTF-8</span><span>Ln 4, Col 14</span></div></div>
                  <div className="preview-insight"><div className="insight-label"><span className="sparkle-small"><Sparkles size={12} /></span><span>AI REVIEW</span><span className="insight-confidence">97% confidence</span></div><div className="review-health"><div><small>CODE HEALTH</small><strong>87<span>/100</span></strong></div><div className="health-ring"><svg viewBox="0 0 42 42"><circle cx="21" cy="21" r="16" /><circle className="ring-value" cx="21" cy="21" r="16" /></svg><span>87</span></div></div><div className="insight-divider" /><div className="finding-type"><span className="finding-icon"><Activity size={14} /></span><div><small>PERFORMANCE · HIGH</small><strong>Inefficient nested iteration</strong></div></div><p className="finding-text">Repeated searches inside a loop increase lookup cost to <code>O(n × m)</code>.</p><div className="suggestion-box"><div><Check size={13} /> Suggested improvement</div><p>Index users by ID for <code>O(1)</code> lookups.</p></div><button className="preview-fix" onClick={() => { window.location.href = "/review"; }}>Review finding <ArrowRight size={13} /></button></div>
                </div>
                <div className="window-footer"><span><span className="footer-status-dot" /> Analysis complete</span><span>2 findings <span>·</span> 1.2s</span><span className="footer-branch"><GitBranch size={12} /> main</span></div>
              </div>
              <div className="floating-note"><span><ShieldCheck size={14} /></span><div><strong>Security checked</strong><small>OWASP · CWE coverage</small></div><Check size={14} className="note-check" /></div>
            </motion.div>
          </div>
          <div className="hero-bottom-rule"><span>ENGINEERING, WITH CONTEXT</span><span>01 — 05</span></div>
        </section>

        <section className="trusted-strip" id="trust"><span>MADE FOR THE ENTIRE CODE LIFECYCLE</span><div><span><Code2 size={16} /> Review</span><span><Sparkles size={16} /> Refactor</span><span><LockKeyhole size={16} /> Secure</span><span><Workflow size={16} /> Validate</span></div></section>

        <section className="platform-section" id="platform"><div className="section-intro"><div className="eyebrow">A BETTER WAY TO SHIP</div><h2>From first read to<br /><span>confident merge.</span></h2><p>One connected workflow that helps teams see more clearly, fix with intention, and validate before the code goes out.</p></div><div className="feature-list">{features.map((feature, index) => <motion.article className="feature-row" key={feature.tag} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.45, delay: index * 0.08 }}><div className="feature-index">0{index + 1}</div><div className="feature-icon"><feature.icon size={18} /></div><div className="feature-title"><small>{feature.tag}</small><h3>{feature.title.split("\n").map((line) => <span key={line}>{line}<br /></span>)}</h3></div><p>{feature.body}</p><ArrowUpRight size={17} className="feature-arrow" /></motion.article>)}</div></section>

        <section className="workflow-section" id="workflow"><div className="workflow-top"><div><div className="eyebrow">A REPEATABLE LOOP</div><h2>Intelligence that<br />ends in <span>better code.</span></h2></div><p>AI suggestions are only useful when they fit your codebase—and stand up to validation. Every step stays visible, reviewable, and in your hands.</p></div><div className="workflow-track">{pipeline.map((item, index) => <motion.div className="workflow-step" key={item} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.35, delay: index * 0.09 }}><span className="workflow-step-num">0{index + 1}</span><strong>{item}</strong>{index < pipeline.length - 1 && <span className="workflow-connector"><ArrowRight size={14} /></span>}</motion.div>)}</div></section>

        <section className="cta-section"><div className="cta-glow" /><div className="cta-copy"><span className="eyebrow">YOUR NEXT REVIEW STARTS HERE</span><h2>See the code<br />with <span>new eyes.</span></h2><p>Bring a snippet. Leave with clarity, a safer patch, and tests that prove it.</p></div><Link href="/review" className="button-primary cta-button">Open the live demo <ArrowRight size={16} /></Link><div className="cta-grid-mark">AI<br />/ C</div></section>
      </main>
      <footer className="landing-footer"><a className="brand-lockup" href="/" aria-label="AI Coder home"><span className="brand-mark"><span className="brand-glyph"><Code2 size={15} /></span><span className="brand-name">ai<span>coder</span></span></span></a><span>Understand. Review. Refactor. Ship better code.</span><span>© 2026 AI Coder · Interactive product demo</span></footer>
    </div>
  );
}
