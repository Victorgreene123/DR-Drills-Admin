import React, { useEffect, useState } from "react";
import { LiaTimesSolid } from "react-icons/lia";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

type RawOption = { id: number; option_text: string; order: number };
type RawQuestion = {
  id: number | string;
  text: string;
  question_type?: string;
  image_url?: string | null;
  points?: number;
  explanation?: string | null;
  year?: number | null;
  order?: number; // <-- your question-level order (used as correctOrder)
  options: RawOption[];
};

const PreviewQuizOverlay: React.FC<{ onClose: () => void; data: RawQuestion[] ;  }> = ({
  onClose,
  data,

}) => {
  const questions: RawQuestion[] = data || [];
  const total = questions.length;

  useEffect(() => {
    console.log(questions)
  } ,[])
  // Start centered at 0 if there are questions
  const [current, setCurrent] = useState<number>(questions.length ? 0 : 0);

  // Keep editedQuestions as a copy of the original shape but editable
  const [editedQuestions, setEditedQuestions] = useState<
    (RawQuestion & { correctOrder?: number })[]
  >(() =>
    questions.map((q) => ({
      ...q,
      // ensure we have the same option objects (so id + order preserved)
      options: q.options.map((o) => ({ ...o })),
      // correctOrder derives from question.order (per your rule)
      correctOrder: q.order ?? undefined,
    }))
  );

  // If `data` changes, re-init editedQuestions (optional, adjust if you want to preserve edits)
  useEffect(() => {
    setEditedQuestions(
      questions.map((q) => ({
        ...q,
        options: q.options.map((o) => ({ ...o })),
        correctOrder: q.order ?? undefined,
      }))
    );
    // reset current safely
    if (questions.length) setCurrent(0);
  }, [data]);

  // Keyboard nav
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" && current > 0) setCurrent((s) => s - 1);
      if (e.key === "ArrowRight" && current < total - 1) setCurrent((s) => s + 1);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [current, total]);

  // Small QuestionCard component (keeps local edit state)
const QuestionCard: React.FC<{
  q: RawQuestion & { correctOrder?: number };
  idx: number;
  active?: boolean;
}> = ({ q, idx, active }) => {
  // Local editable copy
  const [localQ, setLocalQ] = useState<RawQuestion & { correctOrder?: number }>({
    ...q,
    options: q.options.map((o) => ({ ...o })),
    correctOrder: q.correctOrder,
  });

  const [isEditing, setIsEditing] = useState(false); // new toggle for editing

  // Keep localQ in sync when parent q changes
  useEffect(() => {
    setLocalQ({
      ...q,
      options: q.options.map((o) => ({ ...o })),
      correctOrder: q.correctOrder,
    });
  }, [q]);

  // edit handlers
  const handleOptionChange = (optIdx: number, value: string) => {
    setLocalQ((lq) => {
      const newOpts = lq.options.map((o, i) =>
        i === optIdx ? { ...o, option_text: value } : o
      );
      return { ...lq, options: newOpts };
    });
  };

  const handleQuestionChange = (value: string) => {
    setLocalQ((lq) => ({ ...lq, text: value }));
  };

  // Mark a specific option as the correct one by using its `order`
  const handleCorrectChange = (optIdx: number) => {
    const selected = localQ.options[optIdx];
    if (!selected) return;
    setLocalQ((lq) => ({ ...lq, correctOrder: selected.order }));
  };

  // Save local changes back into top-level editedQuestions
  const handleDone = () => {
    setEditedQuestions((prev) => {
      const copy = [...prev];
      copy[idx] = {
        ...copy[idx],
        text: localQ.text,
        options: copy[idx].options.map((origOpt, i) => ({
          ...origOpt,
          option_text: localQ.options[i]?.option_text ?? origOpt.option_text,
        })),
        correctOrder: localQ.correctOrder,
      };
      return copy;
    });
    setIsEditing(false); // exit edit mode
  };

  // find displayed answer text
  const answerOption = localQ.options.find((o) => o.order === localQ.correctOrder);

  return (
    <div
      className={`
        bg-white rounded-xl shadow-lg flex flex-col relative
        ${active ? "w-[370px] min-h-[540px] max-h-[90vh] z-10" : "w-[220px] min-h-[340px] opacity-60 scale-90 z-0"}
        transition-all duration-200
      `}
      style={{
        border: active ? "1.5px solid #E0E0E0" : "1px solid #E0E0E0",
        boxShadow: active ? "0 8px 32px 0 rgba(60,60,60,0.18)" : "0 2px 8px 0 rgba(60,60,60,0.10)",
      }}
    >
      <div className="p-4 pb-2 border-b border-[#C3C6CF] flex items-center justify-between">
        <span className="font-semibold text-[#1A1C1E]">{q.id}</span>
        {active && (
          <button
            className="w-8 h-8 flex items-center justify-center bg-[#ECEDF4] rounded-full hover:bg-[#d1d3db] transition"
            onClick={() => setIsEditing((prev) => !prev)}
            aria-label="Toggle Edit"
          >
            {isEditing ? "✏️" : "📝"}
          </button>
        )}
      </div>

      <div className={`p-4 flex-1 overflow-y-auto ${active ? "" : "pb-0"}`}>
        <div className="text-xs text-[#73777F] mb-2">
          {active && <span className="font-semibold text-[#1A1C1E]">Preview Question</span>}

          <div className="mt-1">
            {
              localQ.image_url && (
                <img src={localQ.image_url} className="w-full h-32"></img>
              )
            }
            {active && isEditing ? (
              <textarea
                className="w-full border rounded p-1 text-xs"
                value={localQ.text}
                onChange={(e) => handleQuestionChange(e.target.value)}
                rows={2}
              />
            ) : (
              localQ.text
            )}
          </div>
        </div>

        <div className="mb-2 text-xs font-medium text-[#1A1C1E]">
          {active && "Select an answer as correct"}
        </div>

        <div className="flex flex-col gap-2">
          {localQ.options.map((opt, oidx) => {
            const isCorrect = opt.order === localQ.correctOrder;
            return (
              <div
                key={opt.id ?? oidx}
                className={`
                  flex items-center rounded px-2 py-2 text-xs
                  ${isCorrect ? "bg-[#D4F3E3]" : "bg-[#F8F9FF]"}
                  ${isCorrect ? "border-l-4 border-[#1ABC9C]" : ""}
                `}
              >
                <span
                  className={`
                    mr-2 w-6 h-6 flex items-center justify-center rounded-full font-bold cursor-pointer
                    ${isCorrect ? "bg-[#1ABC9C] text-white" : "bg-[#E0E0E0] text-[#73777F]"}
                  `}
                  onClick={() => {
                    if (active && isEditing) handleCorrectChange(oidx);
                  }}
                  style={{ userSelect: "none" }}
                >
                  {String.fromCharCode(65 + oidx)}
                </span>

                {active && isEditing ? (
                  <input
                    className="truncate border rounded px-1 py-0.5 text-xs w-full"
                    value={opt.option_text}
                    onChange={(e) => handleOptionChange(oidx, e.target.value)}
                  />
                ) : (
                  <span className="truncate">{opt.option_text}</span>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-4 text-xs  ">
          <p className="text-sm text-[#73777F] font-semibold">Explanation</p>
          { localQ.explanation}
        </div>
      </div>

      <div className="px-4 pb-4 text-xs text-[#73777F]">
        <div>
          <span className="font-semibold">Answer</span>
          <div>{answerOption?.option_text ?? "—"}</div>
        </div>
      </div>

      {active && isEditing && (
        <div className="px-4 pb-4 flex justify-end gap-2">
          <button
            className="bg-[#0360AB] text-white px-4 py-1 rounded text-xs"
            onClick={handleDone}
          >
            Done
          </button>
        </div>
      )}
    </div>
  );
};


  // only render if there are questions
  if (!questions.length) return null;

  // carousel windowing logic (same as your original)
  const renderWindow = () => {
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
          className={`transition-all duration-200 ${realIdx === current ? "z-10" : "z-0"}`}
          style={{
            marginLeft:
              realIdx === current - 2 ? "-40px" : realIdx === current - 1 ? "-30px" : 0,
            marginRight:
              realIdx === current + 2 ? "-40px" : realIdx === current + 1 ? "-30px" : 0,
            pointerEvents: "auto",
          }}
        >
          <QuestionCard q={q} idx={realIdx} active={realIdx === current} />
        </div>
      );
    });
  };

  return (
    <div
      className="fixed inset-0 z-[2000] flex flex-col justify-center items-center"
      style={{
        background: "#000000CC",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
      }}
    >
      <div className="flex-1 flex flex-col justify-center items-center w-full relative z-20">
        <div className="flex items-center justify-center w-full relative z-30 overflow-x-auto scrollbar-thin scrollbar-thumb-[#E0E0E0] scrollbar-track-transparent">
          <button
            className="p-2 text-2xl text-[#1A1C1E] bg-white rounded-full shadow mx-2 disabled:opacity-40 z-50 flex-shrink-0"
            onClick={() => current > 0 && setCurrent((c) => c - 1)}
            disabled={current === 0}
            type="button"
          >
            <FaAngleLeft />
          </button>

          <div className="flex items-center justify-center w-auto relative z-10 pointer-events-none gap-8 min-w-[400px]">
            {renderWindow()}
          </div>

          <button
            className="p-2 text-2xl text-[#1A1C1E] bg-white rounded-full shadow mx-2 disabled:opacity-40 z-50 flex-shrink-0"
            onClick={() => current < total - 1 && setCurrent((c) => c + 1)}
            disabled={current === total - 1}
            type="button"
          >
            <FaAngleRight />
          </button>
        </div>
      </div>

      <div className="w-full bg-white border-t border-[#E0E0E0] flex items-center justify-between px-8 py-2 z-[2100]">
        <div className="flex items-center gap-1">
          <button
            className="w-8 h-8 rounded text-[#1A1C1E] bg-[#F2F3FA] hover:bg-[#E0E0E0] flex items-center justify-center disabled:opacity-40"
            onClick={() => current > 0 && setCurrent((c) => c - 1)}
            disabled={current === 0}
            type="button"
          >
            <FaAngleLeft />
          </button>

          {/* simple pagination — you can reuse your previous logic if you like */}
          {Array.from({ length: total }).map((_, i) => (
            <button
              key={i}
              className={`w-8 h-8 rounded ${current === i ? "bg-[#0360AB] text-white" : "bg-[#F2F3FA] text-[#1A1C1E]"}`}
              onClick={() => setCurrent(i)}
              type="button"
            >
              {i + 1}
            </button>
          ))}

          <button
            className="w-8 h-8 rounded text-[#1A1C1E] bg-[#F2F3FA] hover:bg-[#E0E0E0] flex items-center justify-center disabled:opacity-40"
            onClick={() => current < total - 1 && setCurrent((c) => c + 1)}
            disabled={current === total - 1}
            type="button"
          >
            <FaAngleRight />
          </button>
        </div>

        <div className="flex items-center gap-3">
          <button className="px-6 py-2 rounded bg-[#0360AB] text-white font-medium" onClick={onClose}>
            Save Changes
          </button>
          <button
            className="px-4 py-2 rounded-[8px] flex items-center gap-2 bg-[#FFDBCC] border-[1px] border-[#93000A] text-[#93000A]"
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
