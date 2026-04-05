
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AppContext } from "../contexts/AppContext";
import QuestionPalette from "./QuestionPalette";
import QuestionViewer from "./QuestionViewer";
import ExamNavigation from "./ExamNavigation";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";

const ExamPanel = () => {
  const { questions, loading, backendUrl } = useContext(AppContext);
  const [open, setOpen] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [examStatus, setExamStatus] = useState("in-progress");
  const [result, setResult] = useState(null);
  const navigate = useNavigate()
  // Load saved answers
  // const loadAnswers = async () => {
  //   try {
  //     const { data } = await axios.get(`${backendUrl}/exam/answers`, {
  //       headers: {
  //         Authorization: `Bearer ${localStorage.getItem("token")}`
  //       }
  //     });

  //     let saved = {};
  //     data.answers.forEach(ans => {
  //       saved[ans.questionId] = ans.selectedAnswers;
  //     });

  //     setAnswers(saved);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  const loadAnswers = async () => {
  const { data } = await axios.get(`${backendUrl}/exam/answers`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
  });

  let saved = {};
  data.answers.forEach(ans => {
    saved[ans.questionId] = ans.selectedAnswers;
  });

  setAnswers(saved);
  setExamStatus(data.status);

  if (data.status === "submitted") {
    setResult(data.result);
  }
};

  // Start exam + load answers
  useEffect(() => {
    const init = async () => {
      await axios.post(`${backendUrl}/exam/start`, {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });

      await loadAnswers();
    };

    init();
  }, []);

  // Save answer (MCQ + MSQ)
  const selectOption = async (questionId, selectedIndexes) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: selectedIndexes
    }));

    try {
      await axios.post(`${backendUrl}/exam/save-answer`, {
        questionId,
        selectedAnswers: selectedIndexes
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0)
      setCurrentQuestion(currentQuestion - 1);
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1)
      setCurrentQuestion(currentQuestion + 1);
  };

  const clearAnswer = async () => {
    const qId = questions[currentQuestion]._id;

    const newAnswers = { ...answers };
    delete newAnswers[qId];
    setAnswers(newAnswers);

    await axios.post(`${backendUrl}/exam/save-answer`, {
      questionId: qId,
      selectedAnswers: []
    });
  };

  if (loading) return <div className="p-5">Loading...</div>;
  if (!questions.length) return <div>No Questions</div>;
  if (examStatus === "submitted") {
    navigate("/result")
  }
  return (
    <div className="flex flex-col min-h-[90vh] bg-gray-100 md:p-4 gap-4">
      <Navbar setOpen={setOpen} loadAnswers={loadAnswers} />

      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}
      {/* Left Palette */}
       <QuestionPalette
        open={open}
        setOpen={setOpen}
        questions={questions}
        currentQuestion={currentQuestion}
        setCurrentQuestion={setCurrentQuestion}
        answers={answers}
      />

      {/* Right Question Area */}
      <div className="w-full bg-white md:p-6 max-sm:pb-6 shadow-lg rounded-2xl flex flex-col">
        <QuestionViewer
          question={questions[currentQuestion]}
          selectedOptions={answers[questions[currentQuestion]._id] || []}
          selectOption={selectOption}
        />
        
        <ExamNavigation
          prevQuestion={prevQuestion}
          nextQuestion={nextQuestion}
          clearAnswer={clearAnswer}
        />
      </div>
    </div>
  );
};

export default ExamPanel;