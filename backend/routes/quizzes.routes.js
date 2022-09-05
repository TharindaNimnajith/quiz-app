const express = require('express')
const QuizController = require('../controllers/quizzes-controller')

const router = express.Router()

router.post('/quizzes', QuizController.addQuiz)
router.delete('/quizzes/:id', QuizController.deleteQuiz)
router.get('/quizzes/:id', QuizController.getQuiz)
router.get('/quizzes/:lesson/:quizLevel', QuizController.getQuizByLessonAndLevel)
router.get('/quizzes', QuizController.getQuizList)

module.exports = router
