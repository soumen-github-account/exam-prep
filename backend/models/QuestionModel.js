import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
    questionText: {
        type: String,
        required: true
    },

    questionImage: {
        type: String,
        default: null
    },

    questionType: {
        type: String,
        enum: ["MCQ", "MSQ"], 
        required: true
    },

    options: {
        type: [String],
        validate: [arr => arr.length === 4, "Exactly 4 options are required"]
    },

    // For MCQ -> single index like [2]
    // For MSQ -> multiple indexes like [0,2]
    correctAnswers: {
        type: [Number],
        required: true
    },

    difficulty: {
        type: String,
        enum: ["easy", "medium", "hard"],
        default: "medium"
    },

    marks: {
        type: Number,
        default: 2
    },

    negativeMarks: {
        type: Number,
        default: 0
    }

}, { timestamps: true });

const QuestionModel = mongoose.model("Questions", questionSchema)

export default QuestionModel;