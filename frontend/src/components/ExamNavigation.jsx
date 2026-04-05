const ExamNavigation = ({
  prevQuestion,
  nextQuestion,
  clearAnswer
}) => {
  return (
    <div className="flex justify-between items-center mt-8 border-t-1 border-t-gray-400 pt-4 max-sm:px-2">
      {/* Left Buttons */}
      <div className="flex gap-3">
        <button
          onClick={prevQuestion}
          className="px-5 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition font-medium max-sm:text-sm"
        >
          ← Previous
        </button>

        <button
          onClick={nextQuestion}
          className="px-5 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white transition font-medium max-sm:text-sm"
        >
          Next →
        </button>
      </div>

      {/* Right Buttons */}
      <div className="flex gap-3">
        <button
          onClick={clearAnswer}
          className="px-5 py-2 rounded-lg bg-red-100 hover:bg-red-200 text-red-600 font-medium transition max-sm:text-sm"
        >
          Clear Answer
        </button>

        {/* <button
          className="px-6 py-2 rounded-lg bg-green-500 hover:bg-green-600 text-white font-semibold transition"
        >
          Submit Exam
        </button> */}
      </div>
    </div>
  );
};

export default ExamNavigation;