import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AppContext } from "../contexts/AppContext";

const ResultPage = () => {
  const { backendUrl, questions } = useContext(AppContext);
  const [result, setResult] = useState(null);
//   const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    loadResult();
  }, []);

  const loadResult = async () => {
    const { data } = await axios.get(`${backendUrl}/exam/answers`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    });

    setResult(data.result);
    setAnswers(data.answers);

    // const qRes = await axios.get(`${backendUrl}/exam/getAllQuestions`);
    // setQuestions(qRes.data.questions);
  };

  if (!result) return <div className="p-5">Loading Result...</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      
      {/* Result Summary */}
      <div className="bg-white p-6 rounded-2xl shadow mb-6">
        <h1 className="text-2xl font-bold mb-4">Exam Result</h1>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="bg-blue-100 p-4 rounded">
            <p>Total Marks</p>
            <p className="text-xl font-bold">{result.totalMarks}</p>
          </div>

          <div className="bg-green-100 p-4 rounded">
            <p>Obtained</p>
            <p className="text-xl font-bold">{result.obtainedMarks}</p>
          </div>

          <div className="bg-green-200 p-4 rounded">
            <p>Correct</p>
            <p className="text-xl font-bold">{result.correctCount}</p>
          </div>

          <div className="bg-red-200 p-4 rounded">
            <p>Wrong</p>
            <p className="text-xl font-bold">{result.wrongCount}</p>
          </div>

          <div className="bg-gray-200 p-4 rounded">
            <p>Skipped</p>
            <p className="text-xl font-bold">{result.skippedCount}</p>
          </div>
        </div>
      </div>

      {/* Questions Review */}
      <div className="space-y-6">
        {questions.map((q, index) => {
          const ans = answers.find(
            a => a.questionId === q._id
          );

          return (
            <div key={q._id} className="bg-white p-5 rounded-xl shadow">
              <h2 className="font-semibold mb-2">
                Q{index + 1}. {q.questionText}
              </h2>

              {q.questionImage && (
                <img src={q.questionImage} className="w-60 mb-3" />
              )}

              {/* Options */}
              <div className="space-y-2">
                {q.options.map((opt, i) => {
                  const isCorrect = q.correctAnswers.includes(i);
                  const isSelected =
                    ans && ans.selectedAnswers.includes(i);

                  return (
                    <div
                      key={i}
                      className={`p-2 rounded border
                        ${isCorrect ? "bg-green-100 border-green-400" : ""}
                        ${isSelected && !isCorrect ? "bg-red-100 border-red-400" : ""}
                      `}
                    >
                      {opt}
                    </div>
                  );
                })}
              </div>

              {/* Explanation */}
              {q.explanation && (
                <div className="mt-3 text-sm text-gray-600">
                  <strong>Explanation:</strong> {q.explanation}
                </div>
              )}
            </div>
          );
        })}
      </div>

    </div>
  );
};

export default ResultPage;