import React, { useState, useEffect } from "react";
import { LiaTimesSolid } from "react-icons/lia";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import mockPreviewQuestions from "../mock/mockPreviewQuestions";

const PreviewQuizOverlay: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [current, setCurrent] = useState(2); // Center on question 22 (index 2) for demo
  const questions = mockPreviewQuestions;
  const total = questions.length;

  // Store edited questions state
  const [editedQuestions, setEditedQuestions] = useState(() =>
    questions.map(q => ({ ...q, options: [...q.options] }))
  );
  // Track edit mode for the current question
  const [editMode, setEditMode] = useState<{ [idx: number]: boolean }>({});

  // Keyboard navigation for left/right arrow keys
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" && current > 0) {
        setCurrent((prev) => Math.max(0, prev - 1));
      }
      if (e.key === "ArrowRight" && current < total - 1) {
        setCurrent((prev) => Math.min(total - 1, prev + 1));
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [current, total]);

  // Helper for rendering a question card (center or side)
  const QuestionCard = ({
    q,
    idx,
    active,
    side,
  }: {
    q: typeof mockPreviewQuestions[0];
    idx: number;
    active?: boolean;
    side?: boolean;
  }) => {
    // Local state for editing
    const [localQ, setLocalQ] = useState({ ...q, options: [...q.options] });

    useEffect(() => {
      setLocalQ({ ...q, options: [...q.options] });
    }, [q]);

    const handleOptionChange = (optIdx: number, value: string) => {
      setLocalQ(lq => {
        const newOpts = [...lq.options];
        newOpts[optIdx] = value;
        return { ...lq, options: newOpts };
      });
    };

    const handleQuestionChange = (value: string) => {
      setLocalQ(lq => ({ ...lq, question: value }));
    };

    const handleCorrectChange = (optIdx: number) => {
      setLocalQ(lq => ({ ...lq, correct: optIdx }));
    };

    const handleDone = () => {
      setEditedQuestions(prev => {
        const updated = [...prev];
        updated[idx] = { ...localQ };
        return updated;
      });
      setEditMode(em => ({ ...em, [idx]: false }));
    };

    return (
      <div
        className={`
        bg-white rounded-xl shadow-lg flex flex-col relative
        ${active ? "w-[370px] min-h-[540px] max-h-[90vh] z-10" : "w-[220px] min-h-[340px] opacity-60 scale-90 z-0"}
        ${side ? "mx-[-30px]" : ""}
        transition-all duration-200
      `}
        style={{
          border: active ? "1.5px solid #E0E0E0" : "1px solid #E0E0E0",
          boxShadow: active
            ? "0 8px 32px 0 rgba(60,60,60,0.18)"
            : "0 2px 8px 0 rgba(60,60,60,0.10)",
        }}
      >
        <div className="p-4 pb-2 border-b border-[#C3C6CF] flex items-center justify-between">
          <span className="font-semibold text-[#1A1C1E]">{q.id}</span>
          {active && (
            <button
              className="w-8 h-8 flex items-center justify-center bg-[#ECEDF4] rounded-full hover:bg-[#d1d3db] transition"
              onClick={onClose}
              aria-label="Close"
            >
              <LiaTimesSolid className="text-[#1A1C1E] text-xl" />
            </button>
          )}
        </div>
        <div className={`p-4 flex-1 overflow-y-auto ${active ? "" : "pb-0"}`}>
          <div className="text-xs text-[#73777F] mb-2">
            {active && (
              <span className="font-semibold text-[#1A1C1E]">
                {editMode[idx] ? "Edit Question" : "Preview Question"}
              </span>
            )}
            <div className="mt-1">
              {active && editMode[idx] ? (
                <textarea
                  className="w-full border rounded p-1 text-xs"
                  value={localQ.question}
                  onChange={e => handleQuestionChange(e.target.value)}
                  rows={2}
                />
              ) : (
                localQ.question
              )}
            </div>
          </div>
          <div className="mb-2 text-xs font-medium text-[#1A1C1E]">
            {active && editMode[idx] && "Select an answer as correct"}
          </div>
          <div className="flex flex-col gap-2">
            {localQ.options.map((opt, oidx) => (
              <div
                key={oidx}
                className={`
                flex items-center rounded px-2 py-2 text-xs
                ${localQ.correct === oidx ? "bg-[#D4F3E3]" : "bg-[#F8F9FF]"}
                ${active && localQ.correct === oidx ? "border-l-4 border-[#1ABC9C]" : ""}
              `}
              >
                <span
                  className={`
                  mr-2 w-6 h-6 flex items-center justify-center rounded-full font-bold cursor-pointer
                  ${localQ.correct === oidx ? "bg-[#1ABC9C] text-white" : "bg-[#E0E0E0] text-[#73777F]"}
                `}
                  onClick={() => {
                    if (active && editMode[idx]) handleCorrectChange(oidx);
                  }}
                  style={{ userSelect: "none" }}
                >
                  {String.fromCharCode(65 + oidx)}
                </span>
                {active && editMode[idx] ? (
                  <input
                    className="truncate border rounded px-1 py-0.5 text-xs w-full"
                    value={opt}
                    onChange={e => handleOptionChange(oidx, e.target.value)}
                  />
                ) : (
                  <span className="truncate">{opt}</span>
                )}
                {active && (
                  <div className="ml-auto relative group">
                    <button className="p-1 rounded hover:bg-[#ECEDF4]">
                      <span className="text-lg">⋮</span>
                    </button>
                    <div className="hidden group-hover:block absolute right-0 top-6 bg-white border border-[#C3C6CF] rounded shadow z-10 min-w-[120px]">
                      <button className="px-4 py-2 text-xs hover:bg-[#F2F3FA] w-full text-left">
                        Delete Option
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="mt-4 text-xs text-[#73777F] font-semibold">
            {active && editMode[idx] && "Explain your answer"}
          </div>
        </div>
        <div className="px-4 pb-4 text-xs text-[#73777F]">
          <div>
            <span className="font-semibold">Answer</span>
            <div>
              {active && editMode[idx]
                ? localQ.options[localQ.correct] || ""
                : localQ.options[localQ.correct] || ""}
            </div>
          </div>
        </div>
        {/* Edit/Done button */}
        {active && (
          <div className="px-4 pb-4 flex justify-end">
            {editMode[idx] ? (
              <button
                className="bg-[#0360AB] text-white px-4 py-1 rounded text-xs"
                onClick={handleDone}
              >
                Done
              </button>
            ) : (
              <button
                className="bg-[#F2F3FA] text-[#0360AB] px-4 py-1 rounded text-xs"
                onClick={() => setEditMode(em => ({ ...em, [idx]: true }))}
              >
                Edit
              </button>
            )}
          </div>
        )}
      </div>
    );
  };

  // Get indices for carousel: two before, one before, current, one after, two after

  // Fix: Only render carousel and footer if there are questions
  if (!questions.length) return null;

  return (
    // Outer overlay
    <div
      className="fixed inset-0 z-[2000] flex flex-col justify-center items-center"
      style={{
        background: "#000000CC",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
      }}
    >
      {/* Main content area, centers carousel vertically and horizontally */}
      <div className="flex-1 flex flex-col justify-center items-center w-full relative z-20">
        <div className="flex items-center justify-center w-full relative z-30 overflow-x-auto scrollbar-thin scrollbar-thumb-[#E0E0E0] scrollbar-track-transparent">
          {/* Previous */}
          <button
            className="p-2 text-2xl text-[#1A1C1E] bg-white rounded-full shadow mx-2 disabled:opacity-40 z-50 flex-shrink-0"
            onClick={() => {
              if (current > 0) setCurrent(current - 1);
            }}
            disabled={current === 0}
            tabIndex={0}
            type="button"
            style={{ zIndex: 50 }}
          >
            <FaAngleLeft />
          </button>
          {/* Carousel */}
          <div className="flex items-center justify-center w-auto relative z-10 pointer-events-none gap-8 min-w-[400px]">
            {/* Only render a window of cards for performance */}
            {(() => {
              // Show max 5 cards at a time, centered on current
              const windowSize = 5;
              let start = Math.max(0, current - 2);
              let end = Math.min(questions.length, start + windowSize);
              if (end - start < windowSize && questions.length >= windowSize) {
                start = Math.max(0, end - windowSize);
              }
              return editedQuestions.slice(start, end).map((q, idx) => {
                const realIdx = start + idx;
                return (
                  <div
                    key={realIdx}
                    className={`transition-all duration-200 ${
                      realIdx === current ? "z-10" : "z-0"
                    }`}
                    style={{
                      marginLeft:
                        realIdx === current - 2
                          ? "-40px"
                          : realIdx === current - 1
                          ? "-30px"
                          : realIdx === current + 1
                          ? "-30px"
                          : realIdx === current + 2
                          ? "-40px"
                          : "0",
                      marginRight:
                        realIdx === current - 2
                          ? "-40px"
                          : realIdx === current - 1
                          ? "-30px"
                          : realIdx === current + 1
                          ? "-30px"
                          : realIdx === current + 2
                          ? "-40px"
                          : "0",
                      pointerEvents: "auto",
                    }}
                  >
                    <QuestionCard
                      q={q}
                      idx={realIdx}
                      active={realIdx === current}
                      side={realIdx !== current}
                    />
                  </div>
                );
              });
            })()}
          </div>
          {/* Next */}
          <button
            className="p-2 text-2xl text-[#1A1C1E] bg-white rounded-full shadow mx-2 disabled:opacity-40 z-50 flex-shrink-0"
            onClick={() => {
              if (current < total - 1) setCurrent(current + 1);
            }}
            disabled={current === total - 1}
            tabIndex={0}
            type="button"
            style={{ zIndex: 50 }}
          >
            <FaAngleRight />
          </button>
        </div>
      </div>
      {/* Footer (not fixed, just below the carousel) */}
      <div className="w-full bg-white border-t border-[#E0E0E0] flex items-center justify-between px-8 py-2 z-[2100]">
        {/* Pagination */}
        <div className="flex items-center gap-1">
          <button
            className="w-8 h-8 rounded text-[#1A1C1E] bg-[#F2F3FA] hover:bg-[#E0E0E0] flex items-center justify-center disabled:opacity-40"
            onClick={() => {
              if (current > 0) setCurrent(current - 1);
            }}
            disabled={current === 0}
            tabIndex={0}
            type="button"
          >
            <FaAngleLeft />
          </button>
          {/* Show max 7 buttons: first, prev, current-1, current, current+1, next, last */}
          {(() => {
            const maxButtons = 7;
            const btns = [];
            const totalBtns = questions.length;
            if (totalBtns <= maxButtons) {
              for (let i = 0; i < totalBtns; i++) {
                btns.push(
                  <button
                    key={i}
                    className={`w-8 h-8 rounded ${
                      current === i
                        ? "bg-[#0360AB] text-white border border-[#0360AB]"
                        : "bg-[#F2F3FA] text-[#1A1C1E]"
                    }`}
                    onClick={() => setCurrent(i)}
                    type="button"
                  >
                    {i + 1}
                  </button>
                );
              }
            } else {
              // Always show first and last, and up to 5 around current
              if (current > 2) {
                btns.push(
                  <button
                    key={0}
                    className={`w-8 h-8 rounded ${
                      current === 0
                        ? "bg-[#0360AB] text-white border border-[#0360AB]"
                        : "bg-[#F2F3FA] text-[#1A1C1E]"
                    }`}
                    onClick={() => setCurrent(0)}
                    type="button"
                  >
                    1
                  </button>
                );
                if (current > 3) btns.push(<span key="start-ellipsis" className="px-1">...</span>);
              }
              // Show up to 3 before and after current
              let start = Math.max(1, current - 2);
              let end = Math.min(totalBtns - 1, current + 3);
              for (let i = start; i < end; i++) {
                btns.push(
                  <button
                    key={i}
                    className={`w-8 h-8 rounded ${
                      current === i
                        ? "bg-[#0360AB] text-white border border-[#0360AB]"
                        : "bg-[#F2F3FA] text-[#1A1C1E]"
                    }`}
                    onClick={() => setCurrent(i)}
                    type="button"
                  >
                    {i + 1}
                  </button>
                );
              }
              if (end < totalBtns - 1) btns.push(<span key="end-ellipsis" className="px-1">...</span>);
              btns.push(
                <button
                  key={totalBtns - 1}
                  className={`w-8 h-8 rounded ${
                    current === totalBtns - 1
                      ? "bg-[#0360AB] text-white border border-[#0360AB]"
                      : "bg-[#F2F3FA] text-[#1A1C1E]"
                  }`}
                  onClick={() => setCurrent(totalBtns - 1)}
                  type="button"
                >
                  {totalBtns}
                </button>
              );
            }
            return btns;
          })()}
          <button
            className="w-8 h-8 rounded text-[#1A1C1E] bg-[#F2F3FA] hover:bg-[#E0E0E0] flex items-center justify-center disabled:opacity-40"
            onClick={() => {
              if (current < total - 1) setCurrent(current + 1);
            }}
            disabled={current === questions.length - 1}
            tabIndex={0}
            type="button"
          >
            <FaAngleRight />
          </button>
        </div>
        {/* Actions */}
        <div className="flex items-center gap-3">
          <button className="px-6 py-2 rounded bg-[#0360AB] text-white font-medium"
            onClick={onClose}
            type="button"
          >
            Save Changes
          </button>
          <button
            className="px-4 py-2 rounded-[8px] flex items-center gap-2 bg-[#FFDBCC] border-[1px] border-[#93000A] text-[#93000A] font-[500] "
            onClick={onClose}
            type="button"
          >
            <LiaTimesSolid />
            Cancel Preview
          </button>
        </div>
      </div>
    </div>
  );
};

export default PreviewQuizOverlay;
