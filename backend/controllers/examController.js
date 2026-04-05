import { ExamAttemptModel } from "../models/ExamAttempt.js";
import QuestionModel from "../models/QuestionModel.js";


export const getQuestions = async(req, res) => {
    try {
        const questions = await QuestionModel.find().sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            count: questions.length,
            questions
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
}

// export const createExamAttempt = async (req, res) => {
//     try {
//         const userId = req.user._id;

//         let attempt = await ExamAttemptModel.findOne({
//             userId,
//             status: "in-progress"
//         });

//         if (!attempt) {
//             attempt = await ExamAttemptModel.create({
//                 userId,
//                 answers: []
//             });
//         }

//         res.json({
//             success: true,
//             attempt
//         });

//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: "Server error"
//         });
//     }
// };
export const createExamAttempt = async (req, res) => {
    try {
        const userId = req.user._id;

        // Check submitted attempt
        const submittedAttempt = await ExamAttemptModel.findOne({
            userId,
            status: "submitted"
        });

        if (submittedAttempt) {
            return res.json({
                success: true,
                status: "submitted"
            });
        }

        let attempt = await ExamAttemptModel.findOne({
            userId,
            status: "in-progress"
        });

        if (!attempt) {
            attempt = await ExamAttemptModel.create({
                userId,
                answers: []
            });
        }

        res.json({
            success: true,
            status: "in-progress",
            attempt
        });

    } catch (error) {
        res.status(500).json({
            success: false
        });
    }
};

export const saveAnswer = async (req, res) => {
    try {
        const { questionId, selectedAnswers } = req.body;
        const userId = req.user._id;

        let attempt = await ExamAttemptModel.findOne({
            userId,
            status: "in-progress"
        });

        if (!attempt) {
            return res.status(404).json({
                success: false,
                message: "Attempt not found"
            });
        }

        const existingAnswer = attempt.answers.find(
            ans => ans.questionId.toString() === questionId
        );

        if (existingAnswer) {
            existingAnswer.selectedAnswers = selectedAnswers;
        } else {
            attempt.answers.push({
                questionId,
                selectedAnswers
            });
        }

        await attempt.save();

        res.json({
            success: true,
            message: "Answer saved"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};

export const getAttemptAnswers = async (req, res) => {
    try {
        const userId = req.user._id;

        // Get latest attempt (submitted or in-progress)
        const attempt = await ExamAttemptModel.findOne({
            userId
        }).sort({ createdAt: -1 });

        if (!attempt) {
            return res.json({
                success: true,
                status: "not-started",
                answers: []
            });
        }

        res.json({
            success: true,
            status: attempt.status,
            answers: attempt.answers,
            result: attempt.status === "submitted" ? {
                totalMarks: attempt.totalMarks,
                obtainedMarks: attempt.obtainedMarks,
                correctCount: attempt.correctCount,
                wrongCount: attempt.wrongCount,
                skippedCount: attempt.skippedCount
            } : null
        });

    } catch (error) {
        res.status(500).json({
            success: false
        });
    }
};


export const submitExam = async (req, res) => {
    try {
        const userId = req.user._id;

        const attempt = await ExamAttemptModel.findOne({
            userId,
            status: "in-progress"
        });

        if (!attempt) {
            return res.status(404).json({
                success: false,
                message: "No active attempt"
            });
        }

        const questions = await QuestionModel.find();

        let correctCount = 0;
        let wrongCount = 0;
        let skippedCount = 0;
        let obtainedMarks = 0;

        questions.forEach(q => {
            const ans = attempt.answers.find(
                a => a.questionId.toString() === q._id.toString()
            );

            if (!ans || ans.selectedAnswers.length === 0) {
                skippedCount++;
                return;
            }

            const isCorrect =
                JSON.stringify(ans.selectedAnswers.sort()) ===
                JSON.stringify(q.correctAnswers.sort());

            if (isCorrect) {
                correctCount++;
                obtainedMarks += q.marks;
            } else {
                wrongCount++;
                obtainedMarks -= q.negativeMarks;
            }

            ans.isCorrect = isCorrect;
            ans.marksObtained = isCorrect ? q.marks : -q.negativeMarks;
        });

        const totalMarks = questions.reduce((sum, q) => sum + q.marks, 0);

        attempt.totalMarks = totalMarks;
        attempt.obtainedMarks = obtainedMarks;
        attempt.correctCount = correctCount;
        attempt.wrongCount = wrongCount;
        attempt.skippedCount = skippedCount;
        attempt.status = "submitted";

        await attempt.save();

        res.json({
            success: true,
            result: {
                totalMarks,
                obtainedMarks,
                correctCount,
                wrongCount,
                skippedCount
            }
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};

