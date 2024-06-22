import db from "db/db";
import Quiz from "models/QuizModel";
import QuizResult from 'models/Quizexam-model';

function getCorrectAnswers(quiz) {
    const correctAnswers = {};
    for (const question of quiz.questions_list) {
        const questionId = question._id.toString();
        const questionType = question.question_type;

        if (questionType === 'single_choice' || questionType === 'true_false') {
            const correctOption = question.options.find(option => option.correctAnswer);
            correctAnswers[questionId] = correctOption ? correctOption.text : question.answer;
        } else if (questionType === 'multiple_choice') {
            const correctOptions = question.options.filter(option => option.correctAnswer);
            correctAnswers[questionId] = correctOptions.map(option => option.text);
        } else if (questionType === 'fill_in_blank') {
            correctAnswers[questionId] = question.answer;
        }
    }
    return correctAnswers;
}
async function submitQuizResult(req, res) {
    
    try {
        await db.connect();
        const { quizId, answers } = req.body;
        const quiz = await Quiz.findById(quizId).exec();
        if (!quiz) {
            return res.status(404).json({ message: "Quiz not found" });
        }
        const correctAnswers = getCorrectAnswers(quiz);
        const userId = req.query.id;
        const userAnswersWithQuestionIds = {};
        for (const [questionId, answer] of Object.entries(answers)) {
            const question = quiz.questions_list.find(question => question._id.toString() === questionId);
            if (question) {
                userAnswersWithQuestionIds[questionId] = answer;
            }
        }
        const questionAnswers = Object.entries(answers).map(([questionId, answer]) => ({
            questionId: questionId,
            answer,
        }));
        const totalQuestions = quiz.questions_list.length;
        const { score, correctCount } = calculateScore(userAnswersWithQuestionIds, correctAnswers, totalQuestions);
        const incorrectCount = totalQuestions - correctCount;
        const quizResult = new QuizResult({
            quizId: quizId,
            questions_list: questionAnswers,
            created_by: userId,
            score: score,
            correctCount: correctCount,
            incorrectCount: incorrectCount
        });
        const savedQuizResult = await quizResult.save();
        res.status(200).json({
            message: "Quiz result submitted successfully",
            score: score,
            quizResult: savedQuizResult,
            correctCount: correctCount,
            incorrectCount: incorrectCount
        });
        await db.disconnect();
    } catch (error) {
        console.error("An error occurred:", error);
        res.status(500).json({ message: "Error occurred while submitting quiz result" });
    }
    await db.disconnect();
}

function calculateScore(userAnswers, correctAnswers, totalQuestions) {
    let correctCount = 0;
    for (const questionId in userAnswers) {
        if (userAnswers.hasOwnProperty(questionId) && correctAnswers.hasOwnProperty(questionId)) {
            const userAnswer = userAnswers[questionId];
            const correctAnswer = correctAnswers[questionId];
            if (typeof userAnswer === 'string' && typeof correctAnswer === 'boolean') {
                // Convert user answer string to boolean
                const userAnswerBool = userAnswer.toLowerCase() === 'true';
                if (userAnswerBool === correctAnswer) {
                    correctCount++;
                }
            } else if (typeof userAnswer === 'string' && typeof correctAnswer === 'string') {
                if (userAnswer === correctAnswer) {
                    correctCount++;
                }
            } else if (Array.isArray(userAnswer) && Array.isArray(correctAnswer)) {
                if (userAnswer.sort().join() === correctAnswer.sort().join()) {
                    correctCount++;
                }
            }
        }
    }
    const score = (correctCount / totalQuestions) * 100;
    return { score, correctCount };
}
export default submitQuizResult;





