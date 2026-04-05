// const QuestionPalette = ({
//   questions,
//   currentQuestion,
//   setCurrentQuestion,
//   answers,
//   open,
//   setOpen
// }) => {
//   return (
//     <div
//       className={`fixed top-0 left-0 h-full w-72 bg-white shadow-xl p-4 transform transition-transform duration-300 z-50
//       ${open ? "translate-x-0" : "-translate-x-full"}`}
//     >
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="font-semibold text-lg">Question Palette</h2>
//         <button onClick={() => setOpen(false)}>✕</button>
//       </div>

//       <div className="grid grid-cols-5 gap-2">
//         {questions.map((q, index) => {
//           const isAnswered = answers[q._id];

//           return (
//             <button
//               key={q._id}
//               onClick={() => {
//                 setCurrentQuestion(index);
//                 setOpen(false);
//               }}
//               className={`p-2 rounded text-white
//                 ${currentQuestion === index
//                   ? "bg-blue-600"
//                   : isAnswered
//                   ? "bg-green-500"
//                   : "bg-gray-400"
//                 }`}
//             >
//               {index + 1}
//             </button>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default QuestionPalette;
import { RxCross2 } from "react-icons/rx";
const QuestionPalette = ({
  questions,
  currentQuestion,
  setCurrentQuestion,
  answers,
  open,
  setOpen
}) => {
  return (
    <>
      {/* Mobile Drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-72 bg-white shadow-xl p-4 z-50 transform transition-transform duration-300 md:hidden
        ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-semibold text-lg">Questions</h2>
          <button onClick={() => setOpen(false)}><RxCross2 className="text-[30px] cursor-pointer"/></button>
        </div>

        <div className="grid grid-cols-5 gap-2">
          {questions.map((q, index) => {
            const isAnswered = answers[q._id];

            return (
              <button
                key={q._id}
                onClick={() => {
                  setCurrentQuestion(index);
                  setOpen(false);
                }}
                className={`p-2 rounded text-white
                  ${currentQuestion === index
                    ? "bg-blue-600"
                    : isAnswered
                    ? "bg-green-500"
                    : "bg-gray-400"
                  }`}
              >
                {index + 1}
              </button>
            );
          })}
        </div>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden md:block w-1/4 bg-white p-4 shadow rounded-2xl">
        <h2 className="font-semibold mb-3">Questions</h2>

        <div className="grid grid-cols-5 gap-2">
          {questions.map((q, index) => {
            const isAnswered = answers[q._id];

            return (
              <button
                key={q._id}
                onClick={() => setCurrentQuestion(index)}
                className={`p-2 rounded text-white
                  ${currentQuestion === index
                    ? "bg-blue-600"
                    : isAnswered
                    ? "bg-green-500"
                    : "bg-gray-400"
                  }`}
              >
                {index + 1}
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default QuestionPalette;