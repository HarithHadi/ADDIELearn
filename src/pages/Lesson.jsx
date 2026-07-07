import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import addieVideo from "../assets/Video/Addie.mp4";

// ── LESSON DATA ────────────────────────────────────────────────
const lessons = [
  {
    id: 1,
    StartTime: 0,
    StopTime : 25,
    title: "ADDIE Introduction",
    tag: "Introduction",
    tagColor: "bg-teal",
    duration: "1 min",
    icon: "",
    summary:
      "The ADDIE model is a step-by-step process for creating effective learning materials. It has five phases: Analysis, Design, Development, Implementation, and Evaluation.",
    keyPoints: [
      "A means Analyze",
      "D means Design",
      "D means Develop",
      "I means Implement",
      "E means evaluate"
    ],
  },
  {
    id: 2,
    StartTime: 25,
    StopTime : 54,
    title: "Analysis",
    tag: "Phases",
    tagColor: "bg-teal",
    duration: "2 Minutes",
    icon: "",
    summary:
      "The Analysis phase identifies the learners' needs, learning goals, and any problems that the learning material should address.",
    keyPoints: [
      "Identifying the learning needs",
      "Understanding the audience's characteristics",
      "Defining the learning objectives",
    ],
  },
  {
    id: 3,
    StartTime: 54,
    StopTime : 74,
    title: "Design",
    tag: "Phases",
    tagColor: "bg-teal",
    duration: "2 Minutes",
    icon: "",
    summary:
      "Plan the learning objectives, lesson structure, activities, assessments, and overall user experience.",
    keyPoints: [
      "Outline the high-level design strategy for the course",
      "Decide on the content",
      "Determine high level strategies and media",
      "Create a core blueprint of the core structure",
    ],
  },
  {
    id: 4,
    StartTime: 74,
    StopTime : 94,
    title: "Develop",
    tag: "Phases",
    tagColor: "bg-teal",
    duration: "2 Minutes",
    icon: "",
    summary:
      "Create and develop the learning materials, multimedia content, and interactive features based on the design.",
    keyPoints: [
      "Creation of the course material",
      "Developing case studies",
      "Assembling the learning content",
    ],
  },
  {
    id: 5,
    StartTime: 94,
    StopTime : 115,
    title: "Implement",
    tag: "Phases",
    tagColor: "bg-teal",
    duration: "2 Minutes",
    icon: "",
    summary:
      "Deliver the learning materials to learners and ensure the system is ready for use.",
    keyPoints: [
      "Course delivery to the learners",
      "Scheduling, Registration, and Distribution of materials ",
    ],
  },
  {
    id: 6,
    StartTime: 115,
    StopTime : 140,
    title: "Evaluate",
    tag: "Phases",
    tagColor: "bg-teal",
    duration: "2 Minutes",
    icon: "",
    summary:
      "Assess the effectiveness of the learning materials through feedback and results, then make improvements where needed.",
    keyPoints: [
      "Gathering feedback",
      "Assessing learner's performance",
      "Determining the overall effectiveness of the training program",
    ],
  },
  {
    id: 7,
    StartTime: 140,
    StopTime : 170,
    title: "Why use the ADDIE model?",
    tag: "Phases",
    tagColor: "bg-teal",
    duration: "2 Minutes",
    icon: "",
    summary:
      "The ADDIE model provides a flexible yet structured approach that can be applied to any learning context, helping create organized, effective, and learner-focused educational materials.",
    keyPoints: [
      "Guides the development of learning materials step by step.",
      "Ensures the content is designed based on the target audience and learning objectives.",
      "Uses evaluation and feedback to improve the learning materials over time.",
    ],
  }
];



// ── VISUAL COMPONENTS ──────────────────────────────────────────


// ── MAIN PAGE ──────────────────────────────────────────────────
export default function Lesson() {
  const [activeId, setActiveId] = useState(1);
  const lesson = lessons.find((l) => l.id === activeId);
  const currentIndex = lessons.findIndex((l) => l.id === activeId);

  const videoRef = useRef(null);

  const stopTime = 120; // seconds

  const handleTimeUpdate = () => {
    const video = videoRef.current;

    if (video.currentTime >= stopTime) {
      video.pause();
      video.currentTime = stopTime; // Keeps it exactly at 2:00
    }
  };

  function LessonVisual({ startTime, stopTime }) {
    const videoRef = useRef(null);
    const watchedUntil = useRef(startTime);

    // Reset video whenever a new lesson is selected
    useEffect(() => {
      const video = videoRef.current;

      if (!video) return;

      video.currentTime = startTime;
      watchedUntil.current = startTime;
    }, [startTime]);

    const handleTimeUpdate = () => {
      const video = videoRef.current;

      if (!video) return;

      // Record the furthest point legitimately watched
      watchedUntil.current = Math.max(
        watchedUntil.current,
        video.currentTime
      );

      // Stop at the end of this lesson
      if (video.currentTime >= stopTime) {
        video.pause();
        video.currentTime = stopTime;
        watchedUntil.current = stopTime;
      }
    };

    const handleSeeking = () => {
      const video = videoRef.current;

      if (!video) return;

      // Prevent seeking before this lesson
      if (video.currentTime < startTime) {
        video.currentTime = startTime;
        return;
      }

      // Prevent skipping ahead
      if (video.currentTime > watchedUntil.current) {
        video.currentTime = watchedUntil.current;
      }

      // Prevent seeking beyond the lesson end
      if (video.currentTime > stopTime) {
        video.currentTime = stopTime;
      }
    };

    return (
      <video
        ref={videoRef}
        controls
        className="w-full"
        onTimeUpdate={handleTimeUpdate}
        onSeeking={handleSeeking}
      >
        <source src={addieVideo} type="video/mp4" />
      </video>
    );
  }

  return (
    <div className="min-h-screen bg-cream font-retro">
      <div className="relative max-w-5xl mx-auto px-4">
        {/* Page header */}
        <div className="mb-2">
          <h1 className="text-4xl md:text-5xl font-black leading-tight uppercase text-ink">
            Lessons
          </h1>
          <p className="text-sm  text-ink/70 font-semibold">
            Learn the basics
          </p>
        </div>

        {/* ── MAIN LAYOUT: sidebar + content ── */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* LEFT — stepper / topic list */}
          <div
            className="md:w-64 shrink-0 rounded-retro p-4 bg-white border-2 border-ink shadow-retro"
            style={{ alignSelf: "flex-start" }}
          >
            <p className="text-xs font-bold tracking-widest uppercase mb-4 px-1 text-ink/60">
              Topics
            </p>

            <div className="relative flex flex-col gap-2">
              {lessons.map((l) => {
                const isActive = l.id === activeId;
                const isDone = l.id < activeId;
                return (
                  <button
                    key={l.id}
                    onClick={() => setActiveId(l.id)}
                    className="relative flex items-center gap-3 px-2 py-2.5 rounded-retro text-left transition-all duration-100 w-full border-2"
                    style={{
                      background: isActive ? "var(--color-teal)" : "transparent",
                      borderColor: isActive ? "var(--color-ink)" : "transparent",
                      boxShadow: isActive ? "3px 3px 0px 0px rgba(0,0,0,1)" : "none",
                    }}
                  >
                    {/* Step indicator */}
                    <div
                      className="relative z-10 w-9 h-9 rounded-full flex items-center justify-center shrink-0 text-sm font-black border-2 border-ink"
                      style={{
                        background: isActive
                          ? "var(--color-ink)"
                          : isDone
                          ? "var(--color-coral)"
                          : "var(--color-cream)",
                        color: isActive ? "var(--color-cream)" : "var(--color-ink)",
                      }}
                    >
                      {isDone ? "✓" : l.id}
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold truncate leading-tight text-ink">
                        {l.icon} {l.title}
                      </p>
                      <p className="text-xs mt-0.5 text-ink/60">{l.duration}</p>
                    </div>

                    {isActive && (
                      <svg viewBox="0 0 16 16" fill="none" stroke="black" strokeWidth={2.5} className="w-3.5 h-3.5 flex-shrink-0">
                        <path d="M6 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* RIGHT — lesson content */}
          <div className="flex-1 flex flex-col gap-5">
            {/* Lesson card */}
            <div className="rounded-retro overflow-hidden bg-white border-2 border-ink shadow-retro">
              {/* Card header */}
              <div className="px-7 py-5 border-b-2 border-ink flex items-start justify-between gap-4 bg-cream-dark">
                <div>
                  <span className={`inline-block text-xs font-bold px-3 py-1 rounded-retro border-2 border-ink uppercase tracking-wide text-ink ${lesson.tagColor}`}>
                    {lesson.tag}
                  </span>
                  <h2 className="text-2xl font-black mt-2 uppercase text-ink">
                    {lesson.icon} {lesson.title}
                  </h2>
                </div>
                <div className="shrink-0 flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-retro border-2 border-ink bg-white text-ink">
                  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={2} className="w-3.5 h-3.5">
                    <circle cx="8" cy="8" r="6" />
                    <path d="M8 5v3l2 2" strokeLinecap="round" />
                  </svg>
                  {lesson.duration}
                </div>
              </div>

              {/* Visual diagram */}
              <div
                className="mx-7 mt-6 rounded-retro flex items-center justify-center p-4 bg-cream border-2 border-dashed border-ink"
                style={{ minHeight: "140px" }}
              >
                <LessonVisual startTime={lesson.StartTime} stopTime={lesson.StopTime} />
              </div>

              {/* Content */}
              <div className="px-7 py-6">
                {/* Summary */}
                <p className="text-sm leading-relaxed mb-6 text-ink/80">
                  {lesson.summary}
                </p>

                {/* Key points */}
                <div className="mb-6">
                  <p className="text-xs font-bold tracking-widest uppercase mb-3 text-ink/60">
                    Key Points
                  </p>
                  <div className="flex flex-col gap-2.5">
                    {lesson.keyPoints.map((point, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-xs font-black border-2 border-ink bg-cream-dark text-ink">
                          {i + 1}
                        </div>
                        <p className="text-sm leading-relaxed text-ink/80">{point}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation buttons */}
            <div className="flex items-center justify-between gap-3">
              <button
                onClick={() => currentIndex > 0 && setActiveId(lessons[currentIndex - 1].id)}
                disabled={currentIndex === 0}
                className="flex items-center gap-2 px-5 py-3 rounded-retro text-sm font-bold border-2 border-ink transition-all"
                style={{
                  background: currentIndex === 0 ? "var(--color-cream-dark)" : "var(--color-cream)",
                  color: currentIndex === 0 ? "rgba(0,0,0,0.35)" : "var(--color-ink)",
                  boxShadow: currentIndex === 0 ? "none" : "3px 3px 0px 0px rgba(0,0,0,1)",
                  cursor: currentIndex === 0 ? "not-allowed" : "pointer",
                }}
              >
                ← Previous
              </button>

              {/* Progress dots */}
              <div className="flex items-center gap-2">
                {lessons.map((l) => (
                  <button
                    key={l.id}
                    onClick={() => setActiveId(l.id)}
                    className="rounded-full border-2 border-ink transition-all"
                    style={{
                      width: l.id === activeId ? "22px" : "10px",
                      height: "10px",
                      background:
                        l.id === activeId
                          ? "var(--color-ink)"
                          : l.id < activeId
                          ? "var(--color-coral)"
                          : "var(--color-cream)",
                    }}
                  />
                ))}
              </div>

              {currentIndex < lessons.length - 1 ? (
                <button
                  onClick={() => setActiveId(lessons[currentIndex + 1].id)}
                  className="flex items-center gap-2 px-5 py-3 rounded-retro text-sm font-black border-2 border-ink transition-all hover:translate-x-[1px] hover:translate-y-[1px] active:translate-x-[3px] active:translate-y-[3px]"
                  style={{
                    background: "var(--color-teal)",
                    color: "var(--color-ink)",
                    boxShadow: "3px 3px 0px 0px rgba(0,0,0,1)",
                  }}
                >
                  Next →
                </button>
              ) : (
                <Link to="/quiz">
                  <button
                    className="flex items-center gap-2 px-5 py-3 rounded-retro text-sm font-black border-2 border-ink transition-all hover:translate-x-[1px] hover:translate-y-[1px] active:translate-x-[3px] active:translate-y-[3px]"
                    style={{
                      background: "var(--color-coral)",
                      color: "var(--color-ink)",
                      boxShadow: "3px 3px 0px 0px rgba(0,0,0,1)",
                    }}
                  >
                    Try Quiz
                  </button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}