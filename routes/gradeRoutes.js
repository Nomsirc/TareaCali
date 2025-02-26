const express = require('express');
const authMiddleware = require('../Middleware/authMiddleware');
const { saveGrade, getMyGrades, getAllGrades } = require('../Controller/gradeController');

const router = express.Router();

router.post('/grades', authMiddleware(['user', 'admin']), saveGrade);
router.get('/grades/me', authMiddleware(['user', 'admin']), getMyGrades);
router.get('/grades', authMiddleware(['admin']), getAllGrades);

module.exports = router;