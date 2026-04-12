import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Satellite, Brain, Bell, Shield, ChevronDown, Play,
  ArrowRight, Mail, Phone, MapPin, Github, Linkedin, Twitter,
  Globe, Zap, Eye, FileText, X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ModeToggle } from '@/components/mode-toggle';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import demoVideo from "@/assets/demo.mp4";

/* ─── Animated counter ─── */
function Counter({ target, suffix = '', duration = 2 }: { target: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = target / (duration * 60);
    const id = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(id); }
      else setCount(Math.floor(start));
    }, 1000 / 60);
    return () => clearInterval(id);
  }, [inView, target, duration]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

/* ─── Particle field (canvas) ─── */
function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    let animId: number;
    const particles: { x: number; y: number; vx: number; vy: number; r: number; o: number }[] = [];

    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    window.addEventListener('resize', resize);

    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 2 + 0.5,
        o: Math.random() * 0.5 + 0.2,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(16,185,129,${p.o})`;
        ctx.fill();
      });
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(16,185,129,${0.15 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize); };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />;
}

/* ─── Radar Animation ─── */
function RadarAnimation() {
  return (
    <div className="relative w-[300px] h-[300px] md:w-[450px] md:h-[450px] shrink-0 aspect-square border border-primary/40 rounded-full flex items-center justify-center overflow-hidden bg-primary/5 shadow-[0_0_40px_rgba(16,185,129,0.15)] mx-auto my-12">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(16,185,129,0.05)_100%)]"></div>
      <div className="absolute w-full h-full border border-primary/20 rounded-full"></div>
      <div className="absolute w-3/4 h-3/4 border border-primary/20 rounded-full"></div>
      <div className="absolute w-1/2 h-1/2 border border-primary/20 rounded-full"></div>
      <div className="absolute w-1/4 h-1/4 border border-primary/20 rounded-full"></div>
      <div className="absolute w-full h-px bg-primary/20"></div>
      <div className="absolute h-full w-px bg-primary/20"></div>
      <motion.div
        className="absolute w-[50%] h-[50%] bg-gradient-to-br from-primary/30 to-transparent origin-bottom-right"
        style={{ right: '50%', bottom: '50%' }}
        animate={{ rotate: 360 }}
        transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div className="absolute w-2.5 h-2.5 bg-red-500 rounded-full shadow-[0_0_10px_rgba(239,68,68,1)] top-1/4 left-1/3" animate={{ opacity: [0, 1, 0] }} transition={{ duration: 3, repeat: Infinity, times: [0, 0.1, 1], delay: 1 }} />
      <motion.div className="absolute w-3.5 h-3.5 bg-red-500 rounded-full shadow-[0_0_10px_rgba(239,68,68,1)] bottom-1/3 right-1/4" animate={{ opacity: [0, 1, 0] }} transition={{ duration: 3, repeat: Infinity, times: [0, 0.1, 1], delay: 2.5 }} />
      <motion.div className="absolute w-2 h-2 bg-red-500 rounded-full shadow-[0_0_10px_rgba(239,68,68,1)] top-[40%] right-[30%]" animate={{ opacity: [0, 1, 0] }} transition={{ duration: 3, repeat: Infinity, times: [0, 0.1, 1], delay: 0.5 }} />
    </div>
  );
}

/* ─── Grid overlay ─── */
function ScanGrid() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(hsl(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />
      <motion.div
        className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent"
        animate={{ top: ['0%', '100%'] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
      />
    </div>
  );
}

/* ─── Demo Video Modal ─── */
function DemoModal({ onClose }: { onClose: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Close on Escape key
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleKey);
    // Prevent background scroll
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/90 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal box */}
      <motion.div
        className="relative z-10 w-full max-w-4xl rounded-2xl overflow-hidden border border-primary/30 shadow-2xl shadow-primary/10"
        initial={{ scale: 0.92, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.92, opacity: 0, y: 20 }}
        transition={{ duration: 0.3, ease: [0.34, 1.1, 0.64, 1] }}
      >
        {/* Header bar */}
        <div className="flex items-center justify-between px-5 py-3 bg-card border-b border-border/50">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-xs font-mono text-muted-foreground tracking-widest">
              SATGUARD // DEMO WALKTHROUGH
            </span>
          </div>
          <button
            onClick={onClose}
            className="flex items-center justify-center w-8 h-8 rounded-full bg-secondary hover:bg-destructive/20 hover:text-destructive border border-border/50 transition-all duration-200"
            aria-label="Close video"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Video */}
        <div className="bg-black">
          <video
            ref={videoRef}
            src={demoVideo}
            controls
            autoPlay
            className="w-full max-h-[70vh] outline-none"
            style={{ display: 'block' }}
          >
            Your browser does not support the video tag.
          </video>
        </div>

        {/* Footer bar */}
        <div className="flex items-center justify-between px-5 py-3 bg-card border-t border-border/50">
          <p className="text-xs text-muted-foreground">
            Press <kbd className="px-1.5 py-0.5 rounded border border-border text-xs bg-secondary">Esc</kbd> or click outside to close
          </p>
          <p className="text-xs text-muted-foreground font-mono">AI-Powered Illegal Mining Detection</p>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── Feature cards ─── */
const features = [
  { icon: Satellite, title: 'Real-Time Satellite Data', desc: 'Continuous monitoring using Sentinel-2 satellite imagery with 10m resolution covering vast terrain.', color: 'text-cyan' },
  { icon: Brain, title: 'Advanced AI Analysis', desc: 'Deep learning models trained on 10,000+ images detect mining activity with 94% accuracy.', color: 'text-primary' },
  { icon: Bell, title: 'Immediate Notifications', desc: 'Get real-time alerts when new illegal mining activity is detected in monitored zones.', color: 'text-accent' },
  { icon: Shield, title: 'Automated Reporting', desc: 'Generate court-ready reports with GPS evidence, satellite imagery, and AI analysis.', color: 'text-cyan' },
];

/* ─── Stats ─── */
const heroStats = [
  { value: 1247, suffix: '+', label: 'Detections' },
  { value: 89, suffix: '', label: 'Critical Alerts' },
  { value: 24, suffix: '/7', label: 'Monitoring' },
  { value: 94, suffix: '%', label: 'Accuracy' },
];

const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.12 } } };
const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };

export default function LandingPage() {
  const navigate = useNavigate();

  // ── Demo modal state ──
  const [showDemo, setShowDemo] = useState(false);

  const featRef = useRef(null);
  const featInView = useInView(featRef, { once: true, margin: '-80px' });
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.25], [1, 0.95]);

  return (
    <div className="bg-background text-foreground overflow-x-hidden">

      {/* ── DEMO VIDEO MODAL ── */}
      {showDemo && <DemoModal onClose={() => setShowDemo(false)} />}

      {/* ── NAV ── */}
      <motion.header
        className="fixed top-0 inset-x-0 z-50 backdrop-blur-xl bg-background/60 border-b border-border/40"
        initial={{ y: -80 }} animate={{ y: 0 }} transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 h-16">
          <div className="flex items-center gap-2 text-xl font-extrabold tracking-tight">
            <Satellite className="w-6 h-6 text-cyan" />
            <span className="text-cyan">SAT</span><span className="text-primary">GUARD</span>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
            <a href="#features" className="hover:text-foreground transition-colors">Features</a>
            <a href="#stats" className="hover:text-foreground transition-colors">Technology</a>
            <a href="#cta" className="hover:text-foreground transition-colors">Contact</a>
          </nav>
          <div className="flex items-center gap-4">
            <Button size="sm" className="hidden sm:flex gap-2 shadow-lg shadow-primary/20" onClick={() => navigate('/dashboard')}>
              Launch Dashboard <ArrowRight className="w-4 h-4" />
            </Button>
            <ModeToggle />
          </div>
        </div>
      </motion.header>

      {/* ── HERO ── */}
      <motion.section style={{ opacity: heroOpacity, scale: heroScale }} className="relative min-h-screen flex items-center justify-center pt-16">
        <ParticleField />
        <ScanGrid />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7 }}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 text-sm text-primary mb-8">
              <Globe className="w-4 h-4" /> AI-Powered Earth Protection
            </div>
          </motion.div>

          <motion.h1
            className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight leading-tight lg:leading-[1.15] mb-8"
            initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.7 }}
          >
            Detecting Illegal Mining{' '}
            <span className="bg-gradient-to-r from-cyan to-primary bg-clip-text text-transparent block sm:inline mt-2 sm:mt-0">from Space</span>
          </motion.h1>

          <motion.p
            className="text-lg sm:text-2xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed"
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.6 }}
          >
            SATGUARD combines cutting-edge artificial intelligence with real-time satellite imagery to detect, monitor, and prevent illegal mining activities before irreversible damage occurs.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.5 }}
          >
            <Button size="lg" className="text-base px-8 shadow-xl shadow-primary/25 animate-pulse-glow" onClick={() => navigate('/dashboard')}>
              Launch Dashboard <ArrowRight className="w-5 h-5 ml-1" />
            </Button>

            {/* ── WATCH DEMO BUTTON — opens video modal ── */}
            <Button
              size="lg"
              variant="outline"
              className="text-base px-8 gap-2 border-border/60 hover:border-primary/50 hover:text-primary transition-all duration-200"
              onClick={() => setShowDemo(true)}
            >
              <Play className="w-4 h-4" /> Watch Demo
            </Button>
          </motion.div>

          {/* Hero stats */}
          <motion.div
            className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-16 max-w-2xl mx-auto"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9, duration: 0.6 }}
          >
            {heroStats.map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-2xl sm:text-3xl font-bold text-foreground">
                  <Counter target={s.value} suffix={s.suffix} />
                </p>
                <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground"
          animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="text-xs">Scroll to explore</span>
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </motion.section>

      {/* ── FEATURES ── */}
      <section id="features" className="relative py-20 px-6" ref={featRef}>
        <div className="max-w-7xl mx-auto">
          <motion.div className="text-center mb-16" variants={stagger} initial="hidden" animate={featInView ? 'visible' : 'hidden'}>
            <motion.p variants={fadeUp} className="text-sm font-semibold text-primary uppercase tracking-widest mb-3">How It Works</motion.p>
            <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-bold">Advanced Technology Protecting Our Planet</motion.h2>
          </motion.div>

          <motion.div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6" variants={stagger} initial="hidden" animate={featInView ? 'visible' : 'hidden'}>
            {features.map((f) => (
              <motion.div
                key={f.title}
                variants={fadeUp}
                className="group glass-card p-6 hover:border-primary/40 hover:-translate-y-1 transition-all duration-300"
              >
                <div className={`w-12 h-12 rounded-lg bg-secondary flex items-center justify-center mb-4 ${f.color} group-hover:scale-110 transition-transform`}>
                  <f.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── HOW IT WORKS STEPS ── */}
      <section id="stats" className="py-20 px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background pointer-events-none" />
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-accent uppercase tracking-widest mb-3">Pipeline</p>
            <h2 className="text-3xl sm:text-4xl font-bold">From Satellite to Courtroom</h2>
          </div>
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { icon: Satellite, step: '01', title: 'Capture', desc: 'Sentinel-2 satellites scan target regions every 5 days' },
              { icon: Eye, step: '02', title: 'Analyze', desc: 'AI models process multispectral imagery in real-time' },
              { icon: Zap, step: '03', title: 'Alert', desc: 'Instant notifications sent to authorities and stakeholders' },
              { icon: FileText, step: '04', title: 'Report', desc: 'Auto-generated legal reports with evidence packages' },
            ].map((s, i) => (
              <motion.div
                key={s.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
                className="flex flex-col items-center"
              >
                <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center mb-4">
                  <s.icon className="w-7 h-7 text-primary" />
                </div>
                <span className="text-xs font-bold text-primary mb-1">{s.step}</span>
                <h3 className="font-semibold text-lg mb-1">{s.title}</h3>
                <p className="text-sm text-muted-foreground">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── RADAR ANIMATION ── */}
      <section className="py-16 px-6 relative overflow-hidden">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Live Threat Monitoring</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Our AI continuously scans broad regions, isolating anomalous topography and newly formed structures associated with illegal extraction points.
          </p>
          <RadarAnimation />
        </div>
      </section>

      {/* ── USER INSTRUCTIONS ── */}
      <section className="py-20 px-6 bg-secondary/5 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold">How to Use SatGuard</h2>
            <p className="text-muted-foreground mt-4">Simple steps to start monitoring potential illegal mining activities</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="glass-card p-8 flex flex-col items-center text-center transition-all hover:scale-105 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5">
              <div className="w-12 h-12 rounded-full border-2 border-primary text-primary flex items-center justify-center font-bold text-xl mb-6 shadow-[0_0_15px_rgba(16,185,129,0.3)]">1</div>
              <h3 className="text-xl font-bold mb-3">Sign Up & Login</h3>
              <p className="text-muted-foreground text-sm">Securely log into the dashboard using your agency credentials to access monitoring tools.</p>
            </div>
            <div className="glass-card p-8 flex flex-col items-center text-center border-primary/30 relative transition-all hover:scale-105 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5">
              <div className="hidden md:block absolute -left-4 top-[4.5rem] w-8 h-px bg-primary/40"></div>
              <div className="w-12 h-12 rounded-full border-2 border-primary text-primary bg-primary/10 flex items-center justify-center font-bold text-xl mb-6 shadow-[0_0_20px_rgba(16,185,129,0.5)]">2</div>
              <h3 className="text-xl font-bold mb-3">Upload or Monitor</h3>
              <p className="text-muted-foreground text-sm">Drag and drop drone imagery or select real-time satellite data for constant high-risk zone scanning.</p>
              <div className="hidden md:block absolute -right-4 top-[4.5rem] w-8 h-px bg-primary/40"></div>
            </div>
            <div className="glass-card p-8 flex flex-col items-center text-center transition-all hover:scale-105 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5">
              <div className="w-12 h-12 rounded-full border-2 border-primary text-primary flex items-center justify-center font-bold text-xl mb-6 shadow-[0_0_15px_rgba(16,185,129,0.3)]">3</div>
              <h3 className="text-xl font-bold mb-3">Review & Act</h3>
              <p className="text-muted-foreground text-sm">Investigate AI-flagged alerts, confirm detected disturbances, and export legal reports.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQs ── */}
      <section className="py-24 px-6 max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold">Frequently Asked Questions</h2>
        </div>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-left font-medium text-lg">How accurately does the AI detect illegal mining?</AccordionTrigger>
            <AccordionContent className="text-muted-foreground leading-relaxed text-base pt-2 p-2">
              Our models utilize a multi-layered convolutional neural network mapping changes in NDVI (vegetation loss) and terrain disturbances, performing with a verified 94% accuracy rate that decisively outperforms manual auditing.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="text-left font-medium text-lg">How frequently is the satellite imagery updated?</AccordionTrigger>
            <AccordionContent className="text-muted-foreground leading-relaxed text-base pt-2 p-2">
              By utilizing the Sentinel-2 and Landsat constellations, we receive actionable imagery approximately every 5-7 days, which provides an ideal cadence for spotting early-stage extractive footprints.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger className="text-left font-medium text-lg">Are the generated reports compliant with legal bodies?</AccordionTrigger>
            <AccordionContent className="text-muted-foreground leading-relaxed text-base pt-2 p-2">
              Yes! All system reports include unadulterated source imagery, timestamp cryptographic hashing, and exact coordinate bounds specifically formatted to be admissible for environmental regulatory filings.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger className="text-left font-medium text-lg">Can I analyze my own local drone surveys here?</AccordionTrigger>
            <AccordionContent className="text-muted-foreground leading-relaxed text-base pt-2 p-2">
              Absolutely. In the dashboard's "Upload Detection" section, users can deposit high-resolution orthomosaics which are routed through the same AI classification models for extreme high-fidelity results.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>

      {/* ── CTA ── */}
      <section id="cta" className="relative py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-background to-cyan/10 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-primary/5 blur-[150px] pointer-events-none" />
        <motion.div
          className="relative z-10 max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-5xl font-bold mb-4">Ready to Protect Your Region?</h2>
          <p className="text-muted-foreground text-lg mb-8">Join 124 districts already using SATGUARD to combat illegal mining.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="text-base px-8 shadow-lg shadow-primary/25">Request Demo</Button>
            <Button size="lg" variant="outline" className="text-base px-8">Contact Sales</Button>
          </div>
          <p className="text-xs text-muted-foreground mt-4">Free trial for government agencies</p>
        </motion.div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-border/50 bg-card/30 backdrop-blur-sm py-16 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12">
          <div>
            <div className="flex items-center gap-2 text-lg font-extrabold mb-3">
              <Satellite className="w-5 h-5 text-cyan" />
              <span className="text-cyan">SAT</span><span className="text-primary">GUARD</span>
            </div>
            <p className="text-sm text-muted-foreground mb-4">AI-powered satellite analysis protecting Earth's resources from illegal mining.</p>
            <div className="flex gap-3 text-muted-foreground">
              <Linkedin className="w-5 h-5 hover:text-foreground cursor-pointer transition-colors" />
              <Twitter className="w-5 h-5 hover:text-foreground cursor-pointer transition-colors" />
              <Github className="w-5 h-5 hover:text-foreground cursor-pointer transition-colors" />
            </div>
          </div>
          {[
            { title: 'Product', links: ['Features', 'Pricing', 'Documentation', 'API Access'] },
            { title: 'Resources', links: ['Case Studies', 'Blog', 'Research Papers', 'FAQs'] },
          ].map((col) => (
            <div key={col.title}>
              <h4 className="font-semibold text-sm mb-4">{col.title}</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {col.links.map((l) => <li key={l} className="hover:text-foreground cursor-pointer transition-colors">{l}</li>)}
              </ul>
            </div>
          ))}
          <div>
            <h4 className="font-semibold text-sm mb-4">Contact</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-2"><Mail className="w-4 h-4" /> contact@satguard.ai</li>
              <li className="flex items-center gap-2"><Phone className="w-4 h-4" /> 1800-XXX-XXXX</li>
              <li className="flex items-center gap-2"><MapPin className="w-4 h-4" /> New Delhi, India</li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-border/40 flex flex-col sm:flex-row items-center justify-between text-xs text-muted-foreground">
          <p>© 2026 SATGUARD. All rights reserved.</p>
          <p>Powered by AI & Satellite Technology</p>
        </div>
      </footer>
    </div>
  );
}