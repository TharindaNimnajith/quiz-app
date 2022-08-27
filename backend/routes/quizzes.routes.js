const express = require('express')
const QuizController = require('../controllers/quizzes-controller')

const router = express.Router()

router.post('/quizzes', QuizController.addQuiz)
router.put('/quizzes/:id', QuizController.updateQuiz)
router.delete('/quizzes/:id', QuizController.deleteQuiz)
router.get('/quizzes/:id', QuizController.getQuiz)
router.get('/quizzes', QuizController.getQuizList)

module.exports = router
