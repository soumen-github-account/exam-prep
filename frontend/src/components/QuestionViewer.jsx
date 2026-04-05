// const QuestionViewer = ({ question, selectedOption, selectOption }) => {
//   return (
//     <div>
//       <h2 className="text-lg font-semibold mb-4">
//         {question.questionText}
//       </h2>

//       {question.questionImage && (
//         <img src={question.questionImage} className="mb-4 w-64" />
//       )}

//       {question.options.map((opt, index) => (
//         <label key={index} className="block mb-2">
//           <input
//             type="radio"
//             checked={selectedOption === index}
//             onChange={() => selectOption(question._id, index)}
//             className="mr-2"
//           />
//           {opt}
//         </label>
//       ))}
//     </div>
//   );
// };

// export default QuestionViewer;

import React from "react";

const QuestionViewer = ({
  question,
  selectedOptions = [],
  selectOption
}) => {
  const isMSQ = question.questionType === "MSQ";

  const handleChange = (index) => {
    if (isMSQ) {
      // Multiple select
      let updated = [...selectedOptions];

      if (updated.includes(index)) {
        updated = updated.filter((i) => i !== index);
      } else {
        updated.push(index);
      }

      selectOption(question._id, updated);
    } else {
      // Single select
      selectOption(question._id, [index]);
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 w-full mx-auto">
      {/* Question */}
      <h2 className="text-xl font-semibold mb-4">
        {question.questionText}
      </h2>

      {/* Question Image */}
      {question.questionImage && (
        <img
          src={question.questionImage}
          alt="question"
          className="mb-4 w-72 rounded-lg border-1 border-gray-300"
        />
      )}

      {/* Options */}
      <div className="space-y-3">
        {question.options.map((opt, index) => {
          const checked = selectedOptions.includes(index);

          return (
            <label
              key={index}
              className={`flex items-center p-3 border-1 border-gray-300 rounded-xl cursor-pointer transition
              ${checked ? "bg-blue-100 border-blue-400" : "hover:bg-gray-50"}`}
            >
              <input
                type={isMSQ ? "checkbox" : "radio"}
                checked={checked}
                onChange={() => handleChange(index)}
                className="mr-3 w-4 h-4"
              />
              <span>{opt}</span>
            </label>
          );
        })}
      </div>
    </div>
  );
};

export default QuestionViewer;