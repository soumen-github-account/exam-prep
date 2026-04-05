import { useState, useContext } from "react";
import axios from "axios";
import { AppContext } from "../contexts/AppContext";

const AddQuestion = () => {
  const { backendUrl } = useContext(AppContext);

  const [form, setForm] = useState({
    questionText: "",
    questionType: "MCQ",
    options: ["", "", "", ""],
    correctAnswers: [],
    difficulty: "medium",
    marks: 2,
    negativeMarks: 0
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  // Handle option text
  const handleOptionChange = (index, value) => {
    const newOptions = [...form.options];
    newOptions[index] = value;
    setForm({ ...form, options: newOptions });
  };

  // Handle correct answer selection
  const handleCorrectAnswer = (index) => {
    if (form.questionType === "MCQ") {
      setForm({ ...form, correctAnswers: [index] });
    } else {
      let arr = [...form.correctAnswers];
      if (arr.includes(index)) {
        arr = arr.filter(i => i !== index);
      } else {
        arr.push(index);
      }
      setForm({ ...form, correctAnswers: arr });
    }
  };

  // Handle image
  const handleImage = (file) => {
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  // Submit
  const submitHandler = async () => {
    try {
      const formData = new FormData();
      formData.append("questionText", form.questionText);
      formData.append("questionType", form.questionType);
      formData.append("options", JSON.stringify(form.options));
      formData.append("correctAnswers", JSON.stringify(form.correctAnswers));
      formData.append("difficulty", form.difficulty);
      formData.append("marks", form.marks);
      formData.append("negativeMarks", form.negativeMarks);

      if (image) {
        formData.append("image", image);
      }

      await axios.post(`${backendUrl}/exam/add-question`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data"
        }
      });

      alert("Question Added Successfully");

      // Reset form
      setForm({
        questionText: "",
        questionType: "MCQ",
        options: ["", "", "", ""],
        correctAnswers: [],
        difficulty: "medium",
        marks: 2,
        negativeMarks: 0
      });
      setImage(null);
      setPreview(null);

    } catch (error) {
      console.log(error);
      alert("Error adding question");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center">
      <div className="bg-white p-6 rounded-2xl shadow w-full max-w-2xl">
        <h1 className="text-2xl font-bold mb-4">Add Question</h1>

        {/* Question Text */}
        <textarea
          placeholder="Enter Question"
          className="border p-2 w-full mb-3 rounded"
          value={form.questionText}
          onChange={e =>
            setForm({ ...form, questionText: e.target.value })
          }
        />

        {/* Image Upload */}
        <input
          type="file"
          className="mb-3"
          onChange={e => handleImage(e.target.files[0])}
        />

        {preview && (
          <img src={preview} className="w-40 mb-3 rounded" />
        )}

        {/* Question Type */}
        <select
          className="border p-2 w-full mb-3 rounded"
          value={form.questionType}
          onChange={e =>
            setForm({
              ...form,
              questionType: e.target.value,
              correctAnswers: []
            })
          }
        >
          <option value="MCQ">MCQ</option>
          <option value="MSQ">MSQ</option>
        </select>

        {/* Options */}
        <div className="space-y-2 mb-3">
          {form.options.map((opt, index) => (
            <div key={index} className="flex items-center gap-2">
              <input
                type="text"
                placeholder={`Option ${index + 1}`}
                className="border p-2 flex-1 rounded"
                value={opt}
                onChange={e =>
                  handleOptionChange(index, e.target.value)
                }
              />

              <input
                type={form.questionType === "MCQ" ? "radio" : "checkbox"}
                name="correctAnswer"
                checked={form.correctAnswers.includes(index)}
                onChange={() => handleCorrectAnswer(index)}
              />
            </div>
          ))}
        </div>

        {/* Difficulty */}
        <select
          className="border p-2 w-full mb-3 rounded"
          value={form.difficulty}
          onChange={e =>
            setForm({ ...form, difficulty: e.target.value })
          }
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>

        {/* Marks */}
        <input
          type="number"
          placeholder="Marks"
          className="border p-2 w-full mb-3 rounded"
          value={form.marks}
          onChange={e =>
            setForm({ ...form, marks: e.target.value })
          }
        />

        {/* Negative Marks */}
        <input
          type="number"
          placeholder="Negative Marks"
          className="border p-2 w-full mb-4 rounded"
          value={form.negativeMarks}
          onChange={e =>
            setForm({ ...form, negativeMarks: e.target.value })
          }
        />

        {/* Submit */}
        <button
          onClick={submitHandler}
          className="bg-blue-500 text-white w-full py-2 rounded-lg hover:bg-blue-600"
        >
          Add Question
        </button>
      </div>
    </div>
  );
};

export default AddQuestion;