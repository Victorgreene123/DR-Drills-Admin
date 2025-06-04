// 40 mock questions for quiz preview

const mockPreviewQuestions = Array.from({ length: 40 }).map((_, i) => ({
  id: i + 1,
  question: `Question ${i + 1}: What is the answer to this sample question number ${i + 1}?`,
  options: [
    `Option A for question ${i + 1}`,
    `Option B for question ${i + 1}`,
    `Option C for question ${i + 1}`,
    `Option D for question ${i + 1}`,
  ],
  correct: i % 4,
  answer: `Option ${String.fromCharCode(65 + (i % 4))} for question ${i + 1}`,
  explain: `Explanation for question ${i + 1}.`
}));

export default mockPreviewQuestions;
