import mongoose from "mongoose";

const answerSchema = new mongoose.Schema({
    questionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Question"
    },

    selectedAnswers: [Number], 

    isCorrect: Boolean,

    marksObtained: Number
});

const examAttemptSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    answers: [answerSchema],

    totalMarks: Number,
    obtainedMarks: Number,

    correctCount: Number,
    wrongCount: Number,
    skippedCount: Number,

    status: {
        type: String,
        enum: ["in-progress", "submitted"],
        default: "in-progress"
    }

}, { timestamps: true });

export const ExamAttemptModel = mongoose.model("ExamAttempt", examAttemptSchema)