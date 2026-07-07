import { useState } from "react";
import { Link } from "react-router-dom";

// ── QUIZ DATA ──────────────────────────────────────────────────
// Fill this in with your own questions. Each question needs:
// - id: unique number
// - question: the question text
// - options: array of answer strings
// - correctIndex: index (0-based) of the correct option in `options`
// - explanation: (optional) shown after answering, explains the correct answer
const questions = [
  {
    id: 1,
    question: "What does ADDIE stand for",
    options: ["A", "D", "D", "I"],
    correctIndex: 0,
    explanation: "it stands for addie",
  },
  {
    id: 2,
    question: "",
    options: ["", "", "", ""],
    correctIndex: 0,
    explanation: "",
  },
  // Add more question objects here...
];

// ── MAIN COMPONENT ─────────────────────────────────────────────
export default function Quizcomp() {
  const [activeIndex, setActiveIndex] = useState(0);
  // answers[i] = index of the option the user picked for question i, or null if unanswered
  const [answers, setAnswers] = useState(() => questions.map(() => null));
  const [finished, setFinished] = useState(false);

  const question = questions[activeIndex];
  const isLast = activeIndex === questions.length - 1;
  const isFirst = activeIndex === 0;

  const selected = answers[activeIndex];
  const answered = selected !== null;

  const score = answers.reduce(
    (total, ans, i) => (ans === questions[i].correctIndex ? total + 1 : total),
    0
  );
  const allAnswered = answers.every((a) => a !== null);

  function handleSelect(i) {
    if (answered) return;
    setAnswers((prev) => {
      const next = [...prev];
      next[activeIndex] = i;
      return next;
    });
  }

  function handlePrevious() {
    if (isFirst) return;
    setActiveIndex((i) => i - 1);
  }

  function handleNext() {
    if (isLast) {
      setFinished(true);
      return;
    }
    setActiveIndex((i) => i + 1);
  }

  function handleRestart() {
    setActiveIndex(0);
    setAnswers(questions.map(() => null));
    setFinished(false);
  }

  return (
    <div className="min-h-screen bg-cream font-retro">
      <div className="relative max-w-3xl mx-auto px-4 py-10">
        {/* Page header */}
        <div className="mb-6">
          <h1 className="text-4xl md:text-5xl font-black leading-tight uppercase text-ink">
            Quiz
          </h1>
          <p className="text-sm text-ink/70 font-semibold">
            Test what you've learned
          </p>
        </div>

        {!finished ? (
          <div className="flex flex-col gap-5">
            {/* Quiz card */}
            <div className="rounded-retro overflow-hidden bg-white border-2 border-ink shadow-retro">
              {/* Card header */}
              <div className="px-7 py-5 border-b-2 border-ink flex items-center justify-between gap-4 bg-cream-dark">
                <span className="inline-block text-xs font-bold px-3 py-1 rounded-retro border-2 border-ink uppercase tracking-wide text-ink bg-teal">
                  Question {activeIndex + 1} / {questions.length}
                </span>
                <div className="shrink-0 flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-retro border-2 border-ink bg-white text-ink">
                  Score: {score}
                </div>
              </div>

              {/* Question + options */}
              <div className="px-7 py-6">
                <h2 className="text-xl font-black mb-6 text-ink leading-snug">
                  {question.question}
                </h2>

                <div className="flex flex-col gap-3">
                  {question.options.map((option, i) => {
                    const isSelected = selected === i;
                    const isCorrect = i === question.correctIndex;

                    let bg = "var(--color-cream)";
                    let border = "var(--color-ink)";

                    if (answered) {
                      if (isCorrect) {
                        bg = "var(--color-teal)";
                      } else if (isSelected && !isCorrect) {
                        bg = "var(--color-coral)";
                      }
                    }

                    return (
                      <button
                        key={i}
                        onClick={() => handleSelect(i)}
                        disabled={answered}
                        className="relative flex items-center gap-3 px-4 py-3 rounded-retro text-left border-2 transition-all duration-100 w-full"
                        style={{
                          background: bg,
                          borderColor: border,
                          boxShadow: isSelected ? "3px 3px 0px 0px rgba(0,0,0,1)" : "none",
                          cursor: answered ? "default" : "pointer",
                        }}
                      >
                        <div
                          className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-xs font-black border-2 border-ink"
                          style={{
                            background: "var(--color-cream-dark)",
                            color: "var(--color-ink)",
                          }}
                        >
                          {String.fromCharCode(65 + i)}
                        </div>
                        <p className="text-sm font-semibold text-ink flex-1">
                          {option}
                        </p>
                      </button>
                    );
                  })}
                </div>

                {/* Explanation */}
                {answered && question.explanation && (
                  <div className="mt-5 px-4 py-3 rounded-retro border-2 border-dashed border-ink bg-cream">
                    <p className="text-xs font-bold tracking-widest uppercase mb-1 text-ink/60">
                      Explanation
                    </p>
                    <p className="text-sm leading-relaxed text-ink/80">
                      {question.explanation}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between gap-3">
              <button
                onClick={handlePrevious}
                disabled={isFirst}
                className="flex items-center gap-2 px-5 py-3 rounded-retro text-sm font-bold border-2 border-ink transition-all"
                style={{
                  background: isFirst ? "var(--color-cream-dark)" : "var(--color-cream)",
                  color: isFirst ? "rgba(0,0,0,0.35)" : "var(--color-ink)",
                  boxShadow: isFirst ? "none" : "3px 3px 0px 0px rgba(0,0,0,1)",
                  cursor: isFirst ? "not-allowed" : "pointer",
                }}
              >
                ← Previous
              </button>

              {/* Progress dots — click any answered question to jump back and review it */}
              <div className="flex items-center gap-2">
                {questions.map((q, i) => {
                  const canJump = i === activeIndex || answers[i] !== null;
                  return (
                    <button
                      key={q.id}
                      onClick={() => canJump && setActiveIndex(i)}
                      disabled={!canJump}
                      className="rounded-full border-2 border-ink transition-all"
                      style={{
                        width: i === activeIndex ? "22px" : "10px",
                        height: "10px",
                        background:
                          i === activeIndex
                            ? "var(--color-ink)"
                            : answers[i] !== null
                            ? "var(--color-coral)"
                            : "var(--color-cream)",
                        cursor: canJump ? "pointer" : "default",
                      }}
                    />
                  );
                })}
              </div>

              <button
                onClick={handleNext}
                disabled={!answered}
                className="flex items-center gap-2 px-5 py-3 rounded-retro text-sm font-black border-2 border-ink transition-all hover:translate-x-[1px] hover:translate-y-[1px] active:translate-x-[3px] active:translate-y-[3px]"
                style={{
                  background: answered ? "var(--color-teal)" : "var(--color-cream-dark)",
                  color: answered ? "var(--color-ink)" : "rgba(0,0,0,0.35)",
                  boxShadow: answered ? "3px 3px 0px 0px rgba(0,0,0,1)" : "none",
                  cursor: answered ? "pointer" : "not-allowed",
                }}
              >
                {isLast ? "Finish" : "Next →"}
              </button>
            </div>
          </div>
        ) : (
          /* Results screen */
          <div className="rounded-retro overflow-hidden bg-white border-2 border-ink shadow-retro">
            <div className="px-7 py-5 border-b-2 border-ink bg-cream-dark">
              <span className="inline-block text-xs font-bold px-3 py-1 rounded-retro border-2 border-ink uppercase tracking-wide text-ink bg-coral">
                Results
              </span>
              <h2 className="text-2xl font-black mt-2 uppercase text-ink">
                Quiz Complete
              </h2>
            </div>

            <div className="px-7 py-8 flex flex-col items-center gap-2 border-b-2 border-ink">
              <p className="text-5xl font-black text-ink">
                {score} / {questions.length}
              </p>
              <p className="text-sm font-semibold text-ink/70">
                questions answered correctly
              </p>
            </div>

            {/* Answer review */}
            <div className="px-7 py-6 flex flex-col gap-4">
              <p className="text-xs font-bold tracking-widest uppercase text-ink/60">
                Review Your Answers
              </p>

              {questions.map((q, i) => {
                const userAnswer = answers[i];
                const isCorrect = userAnswer === q.correctIndex;

                return (
                  <div
                    key={q.id}
                    className="rounded-retro border-2 border-ink p-4"
                    style={{
                      background: isCorrect ? "var(--color-cream)" : "var(--color-cream-dark)",
                    }}
                  >
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <p className="text-sm font-black text-ink flex-1">
                        {i + 1}. {q.question}
                      </p>
                      <span
                        className="shrink-0 text-xs font-bold px-2.5 py-1 rounded-retro border-2 border-ink uppercase"
                        style={{
                          background: isCorrect ? "var(--color-teal)" : "var(--color-coral)",
                          color: "var(--color-ink)",
                        }}
                      >
                        {isCorrect ? "Correct" : "Incorrect"}
                      </span>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      {q.options.map((option, j) => {
                        const isUserPick = j === userAnswer;
                        const isRightAnswer = j === q.correctIndex;

                        let bg = "var(--color-cream)";
                        if (isRightAnswer) bg = "var(--color-teal)";
                        else if (isUserPick && !isRightAnswer) bg = "var(--color-coral)";

                        return (
                          <div
                            key={j}
                            className="flex items-center gap-2.5 px-3 py-2 rounded-retro border-2 border-ink text-xs font-semibold text-ink"
                            style={{ background: bg }}
                          >
                            <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 text-[10px] font-black border-2 border-ink bg-cream-dark text-ink">
                              {String.fromCharCode(65 + j)}
                            </div>
                            <p className="flex-1">{option}</p>
                            {isUserPick && (
                              <span className="text-[10px] font-bold uppercase text-ink/60">
                                Your answer
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {q.explanation && (
                      <p className="text-xs leading-relaxed mt-3 text-ink/70">
                        {q.explanation}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="px-7 pb-7 pt-2 border-t-2 border-ink flex items-center justify-between gap-3">
              <button
                onClick={handleRestart}
                className="flex items-center gap-2 px-5 py-3 rounded-retro text-sm font-bold border-2 border-ink transition-all hover:translate-x-[1px] hover:translate-y-[1px] active:translate-x-[3px] active:translate-y-[3px]"
                style={{
                  background: "var(--color-cream)",
                  color: "var(--color-ink)",
                  boxShadow: "3px 3px 0px 0px rgba(0,0,0,1)",
                }}
              >
                ↺ Retake Quiz
              </button>

              <Link to="/">
                <button
                  className="flex items-center gap-2 px-5 py-3 rounded-retro text-sm font-black border-2 border-ink transition-all hover:translate-x-[1px] hover:translate-y-[1px] active:translate-x-[3px] active:translate-y-[3px]"
                  style={{
                    background: "var(--color-teal)",
                    color: "var(--color-ink)",
                    boxShadow: "3px 3px 0px 0px rgba(0,0,0,1)",
                  }}
                >
                  Done
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}