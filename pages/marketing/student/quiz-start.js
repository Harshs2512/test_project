import { Card, Image, Alert, Spinner } from 'react-bootstrap';
import { useState, useEffect,useCallback } from "react";
import Link from "next/link";
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from "next/router";
import { Question, QuizProgress, QuizPagination, QuizTimer } from 'sub-components';
import ProfileLayout from 'layouts/marketing/student/ProfileLayout';
import { useSession } from 'next-auth/react';
import Loading from './../../loading'
const QuizStart = () => {
  const session = useSession();
  const [setsingleQuiz, setsetsingleQuiz] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(1);
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = setsingleQuiz && setsingleQuiz.questions_list.slice(indexOfFirstRecord, indexOfLastRecord);
  const nPages = Math.ceil(setsingleQuiz?.questions_list?.length / recordsPerPage);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [explanationData, setExplanationData] = useState('');
  const [areOptionsDisabled, setAreOptionsDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [quizError, setQuizError] = useState(null);
  const router = useRouter();
  const { quizId } = router.query;

  const fetchQuiz = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(`/api/quiz/${quizId}`);
      setsetsingleQuiz(response.data.quiz);
      setLoading(false);
    } catch (error) {
      setQuizError("Error fetching quiz data");
      console.error("Error fetching quiz:", error);
      setLoading(false);
    }
  }, [quizId, setLoading, setQuizError]);

  useEffect(() => {
    if (quizId) {
      fetchQuiz();
    }
  }, [quizId,fetchQuiz ]);
  const handleSubmitAnswers = async () => {
    const unansweredQuestions = setsingleQuiz.questions_list.filter((question) => {
      const selectedAnswer = selectedAnswers[question._id];
      return !selectedAnswer || (Array.isArray(selectedAnswer) && selectedAnswer.length === 0);
    });
    if (unansweredQuestions.length > 0) {
      setQuizError("Please answer all questions before submitting.");
      return;
    }
    try {
      setQuizError(null);
      const response = await axios.post(`/api/quiz/quizexam/checkAnswer?id=${session.data.user._id}`, {
        quizId: setsingleQuiz._id,
        answers: selectedAnswers,
      });
      router.push({
        pathname: 'quiz-result',
        query: { data: JSON.stringify(response.data) },
      });
    } catch (error) {
      setQuizError("An error occurred while submitting quiz");
      console.error('An error occurred while submitting quiz:', error);
    }
  };
  const handleAnswerChange = (questionId, answer) => {
    setSelectedAnswers((prevSelectedAnswers) => ({
      ...prevSelectedAnswers,
      [questionId]: answer,
    }));
  };
  const resetExplanation = () => {
    setExplanationData('');
  };
  const areOptionsDisabledcheck = (value) => {
    setAreOptionsDisabled(value)
  }
  if (loading) {
    return (
      <ProfileLayout>
        <Loading />
      </ProfileLayout>
    );
  }
  return (
    <ProfileLayout>
      <Card className="mb-4">
        <Card.Body>
          {/* Question Title + Timer */}
          <div className="d-flex justify-content-between align-items-center border-bottom pb-3 mb-3">
            <div className="d-flex align-items-center">
              {setsingleQuiz ? (
                <div className="d-flex align-items-center">
                  <Link href="#">
                    {setsingleQuiz.image && (
                      <Image
                        src={`data:${setsingleQuiz.image.contentType
                          };base64,${Buffer.from(setsingleQuiz.image.data).toString(
                            "base64"
                          )}`}
                        alt={`Quiz ${setsingleQuiz._id}`}
                        className="rounded img-4by3-lg"
                      />
                    )}
                  </Link>
                  <div className="ms-3">
                    <h3 className="mb-2">
                      <Link href="#" className="text-inherit">
                        {setsingleQuiz.title}
                      </Link>
                    </h3>
                    <div>
                      <span>
                        <span className="me-2 align-middle">
                          <i className="fe fe-list"></i>
                        </span>
                        {setsingleQuiz.questions_list.length} Questions
                      </span>
                      <span className="ms-2">
                        <span className="me-2 align-middle">
                          <i className="fe fe-clock"></i>
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <p className='px-4'>Loading......</p>
              )}
            </div>
            {setsingleQuiz ? (
              <>
                <QuizTimer hours={setsingleQuiz?.hours} minutes={setsingleQuiz?.minutes} seconds={setsingleQuiz?.seconds} />
              </>
            ) : (
              <Loading />
            )}
          </div>
          {currentRecords && currentRecords.length > 0 ? (
            <>
              <QuizProgress  currentQuestion={currentRecords[0].question_number} totalQuestion={setsingleQuiz && setsingleQuiz.questions_list && setsingleQuiz.questions_list.length} />
              {/* Question(s) */}
            </>
          ) : (<span className='p-8'>Progress bar ...</span>)}
          <div className="mt-5">

            <div className="mt-5">
              {currentRecords && currentRecords.length > 0 ? (
                <>
                  <span>Question {currentRecords[0].question_number}</span>
                  <Question
                    item={currentRecords[0]}
                    onAnswerChange={handleAnswerChange}
                    resetExplanation={resetExplanation}
                    error={quizError}
                    isOptionsDisabledCheck={areOptionsDisabled}
                  />
                </>
              ) : (
                <span className='p-8'>No questions available.</span>
              )}
            </div>
          </div>
        </Card.Body>
      </Card>
      {/* Quiz Pagination */}
      <QuizPagination
        nPages={nPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        onSubmitAnswers={handleSubmitAnswers}
        resetExplanationData={resetExplanation}
        areOptionsDisabled={areOptionsDisabledcheck}
      />
    </ProfileLayout>
  )
}

export default QuizStart;
