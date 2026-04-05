
import express from "express"
import { isAuthenticate } from "../middleware/authMiddleware.js";
import { createExamAttempt, getAttemptAnswers, getQuestions, saveAnswer, submitExam } from "../controllers/examController.js";

const router = express.Router()

router.get("/getAllQuestions", isAuthenticate, getQuestions)
router.post("/start", isAuthenticate, createExamAttempt);
router.post("/save-answer", isAuthenticate, saveAnswer);
router.get("/answers", isAuthenticate, getAttemptAnswers);
router.post("/submit", isAuthenticate, submitExam);

export default router;