// Public marketing/landing page — Server Component
import Link from "next/link";
import { ArrowRight, ChevronRight, FlaskConical, Cylinder, Gauge, Layers, Thermometer, Zap, BarChart2, ShieldCheck, BookOpen, Globe, Award } from "lucide-react";

const MODULES = [
  { id: "slurry", icon: FlaskConical, title: "Slurry Design", description: "Compute slurry density, yield, mix water and additive quantities for API Class G/H cement.", tags: ["Density", "Yield", "Additives"] },
  { id: "volumes", icon: Cylinder, title: "Annular & Pipe Volumes", description: "Calculate annular and pipe internal volumes with precise capacity factors for cementing intervals.", tags: ["Annular", "Displacement", "Capacity"] },
  { id: "displacement", icon: Gauge, title: "Displacement & Pump", description: "Determine pump strokes, output rates, HHP requirements and displacement time.", tags: ["Pump Output", "HHP", "Strokes"] },
  { id: "plug", icon: Layers, title: "Cement Plug Balance", description: "Design balanced cement plugs with precise slurry volume, displacement and pull-out procedures.", tags: ["Plug Length", "Balance", "Displacement"] },
  { id: "job", icon: Thermometer, title: "Job Execution", description: "Model BHST/BHCT temperature profiles, hydrostatic pressures, ECD and thickening time indices.", tags: ["BHCT", "ECD", "Pressure"] },
];

const FEATURES = [
  { icon: Zap, title: "Real-Time Computation", desc: "Instant results as you type — no submit buttons required." },
  { icon: BarChart2, title: "Sensitivity Analysis", desc: "Interactive charts reveal how parameters affect outcomes." },
  { icon: ShieldCheck, title: "API-Compliant Formulas", desc: "Built on industry-standard API 10A/10B equations." },
  { icon: BookOpen, title: "Modular Workflow", desc: "Each module is self-contained for focused, efficient work." },
  { icon: Globe, title: "Field-Ready Interface", desc: "Optimised for tablet and desktop use on location." },
  { icon: Award, title: "Engineering Grade", desc: "Designed for qualified cementing engineers and specialists." },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Nav */}
      <nav className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
        <div className="w-full px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="relative w-8 h-8 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-2 border-brand-green opacity-40" />
              <div className="w-4 h-4 rounded-full border-2 border-brand-green" />
              <div className="absolute top-0 right-0 w-2.5 h-2.5 rounded-full bg-brand-green" />
            </div>
            <span className="text-base font-bold tracking-tight">Cem<span className="text-brand-green">Cal</span></span>
          </Link>
          <Link href="/dashboard" className="flex items-center gap-2 px-4 py-2 rounded-lg bg-brand-green text-black text-sm font-semibold hover:bg-brand-green/90 transition-colors">
            Launch App <ArrowRight size={14} />
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] bg-[size:48px_48px] opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
        <div className="relative w-full px-6 py-24 md:py-32">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-brand-green/30 bg-brand-green/5 text-brand-green text-xs font-medium mb-6">
              <div className="w-1.5 h-1.5 rounded-full bg-brand-green animate-pulse" />
              API Class G/H · Oilfield Units · v2.0
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-6">
              Professional<br />
              <span className="text-brand-green">Cementing</span> Calculations<br />for the Field
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-2xl">
              CemCal is a comprehensive, API-compliant engineering toolkit for well cementing specialists.
              Slurry design, volumetrics, hydraulics and job execution — all in one precision-built platform.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/dashboard" className="flex items-center gap-2 px-6 py-3 rounded-lg bg-brand-green text-black font-semibold hover:bg-brand-green/90 transition-colors">
                Open Calculator Suite <ArrowRight size={16} />
              </Link>
              <a href="#modules" className="flex items-center gap-2 px-6 py-3 rounded-lg border border-border hover:bg-muted transition-colors text-sm font-medium">
                Explore Modules <ChevronRight size={16} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b border-border bg-muted/30">
        <div className="w-full px-6 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[["5", "Engineering Modules"], ["Class G/H", "API Standards"], ["40+", "Calculation Parameters"], ["Oilfield", "Unit Systems"]].map(([v, l]) => (
              <div key={l} className="text-center">
                <div className="text-2xl font-bold text-brand-green font-mono">{v}</div>
                <div className="text-xs text-muted-foreground mt-1 uppercase tracking-wide">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modules */}
      <section id="modules" className="w-full px-6 py-20">
        <div className="mb-12">
          <p className="text-xs font-semibold text-brand-green uppercase tracking-widest mb-3">Calculator Modules</p>
          <h2 className="text-3xl font-bold tracking-tight mb-4">Five Precision Engineering Modules</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {MODULES.map((m) => {
            const Icon = m.icon;
            return (
              <Link key={m.id} href={`/dashboard?tab=${m.id}`}
                className="glass-card p-5 hover:border-brand-green/40 transition-all group">
                <div className="p-2.5 rounded-xl bg-brand-green/10 text-brand-green w-fit mb-4 group-hover:bg-brand-green/20 transition-colors">
                  <Icon size={20} />
                </div>
                <h3 className="font-bold text-foreground mb-2">{m.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">{m.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {m.tags.map(t => (
                    <span key={t} className="text-[10px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground border border-border font-medium">{t}</span>
                  ))}
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Features */}
      <section className="border-t border-border bg-muted/20">
        <div className="w-full px-6 py-20">
          <div className="mb-12">
            <p className="text-xs font-semibold text-brand-green uppercase tracking-widest mb-3">Platform Capabilities</p>
            <h2 className="text-3xl font-bold tracking-tight mb-4">Built for Engineering Excellence</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((f) => {
              const Icon = f.icon;
              return (
                <div key={f.title} className="flex gap-4">
                  <div className="p-2 rounded-lg bg-brand-green/10 text-brand-green h-fit shrink-0"><Icon size={18} /></div>
                  <div>
                    <h4 className="font-semibold text-sm mb-1">{f.title}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-muted/20">
        <div className="w-full px-6 py-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <span className="text-sm font-semibold">Cem<span className="text-brand-green">Cal</span> v2.0</span>
            <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
              <span>API Class G/H Cement</span><span>·</span>
              <span>Oilfield Units (ppg, ft, psi)</span><span>·</span>
              <span>For qualified engineers only</span>
            </div>
          </div>
          <div className="mt-6 pt-6 border-t border-border">
            <p className="text-xs text-muted-foreground">
              <strong className="text-foreground">Engineering Disclaimer:</strong> All calculations are for preliminary design guidance only. Results must be verified by qualified engineers before field application.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}