
import express from "express"
import { isAuthenticate } from "../middleware/authMiddleware.js";
import { addQuestion, createExamAttempt, getAttemptAnswers, getQuestions, saveAnswer, submitExam } from "../controllers/examController.js";
import upload from "../middleware/upload.js";

const router = express.Router()

router.get("/getAllQuestions", isAuthenticate, getQuestions)
router.post("/start", isAuthenticate, createExamAttempt);
router.post("/save-answer", isAuthenticate, saveAnswer);
router.get("/answers", isAuthenticate, getAttemptAnswers);
router.post("/submit", isAuthenticate, submitExam);
router.post("/add-question", upload.single("image"), addQuestion);

export default router;