import { Link } from "react-router-dom";

// ── ADDIE PHASES (quick-glance strip) ───────────────────────────
const phases = [
  { letter: "A", name: "Analysis", color: "var(--color-teal)" },
  { letter: "D", name: "Design", color: "var(--color-teal)" },
  { letter: "D", name: "Develop", color: "var(--color-teal)" },
  { letter: "I", name: "Implement", color: "var(--color-teal)" },
  { letter: "E", name: "Evaluate", color: "var(--color-teal)" },
];

// ── SCAFFOLD STEPS (gradual release of responsibility) ──────────
const scaffoldSteps = [
  {
    step: "I DO",
    barHeight: "3.5rem",
    title: "You watch",
    page: "Home",
    to: "/",
    color: "var(--color-teal)",
    desc:
      "This page hands you the full map of the ADDIE model before you touch anything yourself — full support, zero pressure.",
  },
  {
    step: "WE DO",
    barHeight: "6rem",
    title: "You practice, guided",
    page: "Lesson",
    to: "/lesson",
    color: "var(--color-coral)",
    desc:
      "Work through each phase with explanations, key points, and video right alongside you. Support is still there if you need it.",
  },
  {
    step: "YOU DO",
    barHeight: "8.5rem",
    title: "You perform, independently",
    page: "Quiz",
    to: "/quiz",
    color: "var(--color-correct)",
    desc:
      "Test what stuck with no scaffolding left. The Quiz is where you prove the model is yours, not just something you read.",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-cream font-retro">
      <div className="relative max-w-5xl mx-auto px-4">
        {/* ── HERO ───────────────────────────────────────────── */}
        <section className="mb-10">
          <span
            className="inline-block text-xs font-bold px-3 py-1 rounded-retro border-2 border-ink uppercase tracking-wide text-ink mb-4"
            style={{ background: "var(--color-teal)" }}
          >
            A Scaffolded Course
          </span>

          <h1 className="text-4xl md:text-6xl font-black leading-[1.05] uppercase text-ink mb-4">
            Learn the
            <br />
            ADDIE Model
          </h1>

          <p className="text-sm md:text-base leading-relaxed text-ink/70 font-semibold max-w-xl mb-6">
            Five phases. One instructional design model. We'll get you there
            the way scaffolding theory says a skill actually sticks — support
            first, then less of it, until you don't need it at all.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <Link to="/lesson">
              <button
                className="px-6 py-3 rounded-retro text-sm font-black border-2 border-ink uppercase transition-all hover:translate-x-[1px] hover:translate-y-[1px] active:translate-x-[3px] active:translate-y-[3px]"
                style={{
                  background: "var(--color-ink)",
                  color: "var(--color-cream)",
                  boxShadow: "var(--shadow-retro)",
                }}
              >
                Start Learning →
              </button>
            </Link>
            <Link to="/quiz">
              <button
                className="px-6 py-3 rounded-retro text-sm font-bold border-2 border-ink uppercase transition-all hover:translate-x-[1px] hover:translate-y-[1px] active:translate-x-[3px] active:translate-y-[3px]"
                style={{
                  background: "var(--color-cream)",
                  color: "var(--color-ink)",
                  boxShadow: "var(--shadow-retro)",
                }}
              >
                Jump to Quiz
              </button>
            </Link>
          </div>
        </section>

        {/* ── ADDIE STRIP ────────────────────────────────────── */}
        <section className="mb-12">
          <p className="text-xs font-bold tracking-widest uppercase mb-3 text-ink/60">
            The Five Phases
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {phases.map((p, i) => (
              <div
                key={i}
                className="rounded-retro p-3 bg-white border-2 border-ink flex items-center gap-3"
                style={{ boxShadow: "var(--shadow-retro)" }}
              >
                <div
                  className="w-9 h-9 shrink-0 rounded-full flex items-center justify-center text-sm font-black border-2 border-ink text-ink"
                  style={{ background: p.color }}
                >
                  {p.letter}
                </div>
                <p className="text-xs font-bold uppercase text-ink leading-tight">
                  {p.name}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── SCAFFOLDING EXPLAINER ──────────────────────────── */}
        <section className="mb-12">
          <div
            className="rounded-retro p-6 md:p-8 bg-white border-2 border-ink"
            style={{ boxShadow: "var(--shadow-retro)" }}
          >
            <span
              className="inline-block text-xs font-bold px-3 py-1 rounded-retro border-2 border-ink uppercase tracking-wide text-ink mb-3"
              style={{ background: "var(--color-coral)" }}
            >
              Why It's Built This Way
            </span>
            <h2 className="text-2xl md:text-3xl font-black uppercase text-ink mb-3">
              The Scaffolding Approach
            </h2>
            <p className="text-sm leading-relaxed text-ink/80 max-w-2xl mb-8">
              Scaffolding theory says learners need decreasing support as
              their own skill increases. Each page on this site removes a
              little more of the safety net — by the time you reach the
              quiz, you're standing on your own.
            </p>

            {/* Staircase visual */}
            <div className="flex items-end justify-center gap-6 md:gap-10 mb-8">
              {scaffoldSteps.map((s, i) => (
                <div key={i} className="flex flex-col items-center gap-2">
                  <span className="text-xs font-black uppercase text-ink/50">
                    {s.step}
                  </span>
                  <div
                    className="w-16 md:w-20 rounded-t-retro border-2 border-ink"
                    style={{
                      height: s.barHeight,
                      background: s.color,
                      boxShadow: "var(--shadow-retro)",
                    }}
                  />
                </div>
              ))}
            </div>

            {/* Step cards */}
            <div className="grid md:grid-cols-3 gap-4">
              {scaffoldSteps.map((s, i) => (
                <Link key={i} to={s.to} className="group">
                  <div
                    className="h-full rounded-retro p-4 border-2 border-ink transition-all group-hover:translate-x-[1px] group-hover:translate-y-[1px]"
                    style={{
                      background: "var(--color-cream)",
                      boxShadow: "var(--shadow-retro)",
                    }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span
                        className="text-[10px] font-black px-2 py-0.5 rounded-retro border-2 border-ink uppercase"
                        style={{ background: s.color }}
                      >
                        {s.step}
                      </span>
                      <span className="text-[10px] font-bold uppercase text-ink/50">
                        {s.page}
                      </span>
                    </div>
                    <h3 className="text-sm font-black uppercase text-ink mb-1.5">
                      {s.title}
                    </h3>
                    <p className="text-xs leading-relaxed text-ink/70">
                      {s.desc}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="mb-16">
          <div
            className="rounded-retro p-6 md:p-8 border-2 border-ink flex flex-col md:flex-row items-center justify-between gap-5"
            style={{ background: "var(--color-ink)", boxShadow: "var(--shadow-retro)" }}
          >
            <div>
              <h3 className="text-xl md:text-2xl font-black uppercase text-cream mb-1">
                Ready for "We Do"?
              </h3>
              <p className="text-xs md:text-sm text-cream/70 font-semibold">
                Head into the first lesson — Analysis is up first.
              </p>
            </div>
            <Link to="/lesson" className="shrink-0">
              <button
                className="px-6 py-3 rounded-retro text-sm font-black border-2 border-ink uppercase whitespace-nowrap transition-all hover:translate-x-[1px] hover:translate-y-[1px] active:translate-x-[3px] active:translate-y-[3px]"
                style={{
                  background: "var(--color-teal)",
                  color: "var(--color-ink)",
                  boxShadow: "4px 4px 0px 0px rgba(232,227,211,1)",
                }}
              >
                Begin Lesson 1 →
              </button>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}