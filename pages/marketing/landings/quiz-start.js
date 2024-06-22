import { useState } from "react";
import { Card, Row } from "react-bootstrap";
import axios from "axios";
import BlankLayout from "layouts/marketing/BlankLayout";
import { Questions, QuizProgress, QuizPaginations } from "sub-components";
import { QuizData } from "data/marketing/quiz/QuizData";

const QuizStart = (props) => {
  const activeQuizData = props.quizData.filter(item => item.is_published === "active");
  const lastIndex = activeQuizData.length - 1;
  const lastItem = activeQuizData[lastIndex];
  let questionsData = []; 
  if (lastItem && lastItem.questions_list && lastItem.questions_list.length > 0) {
    questionsData = lastItem.questions_list.map((question, index) => {
      return {
        questionNumber: index + 1,
        questionData: question
      };
    });
  }

  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(1);
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  
  const currentRecords = questionsData.slice(indexOfFirstRecord, indexOfLastRecord);
  const nPages = Math.ceil(questionsData.length / recordsPerPage);

  const handleAnswer = (questionId, selectedOption) => {

  };

  const handleSubmitAnswers = async () => {
    // Perform submission logic here
  };

  return (
    <>
      <section >
        <div className="bg-gradient-color py-8" style={{height:"765px"}}>
          <div className="w-75 mx-auto ">
          <div className="mb-4   text-white ">
            <Card.Body>
              <QuizProgress
                currentQuestion={currentRecords[0].questionNumber}
                totalQuestion={questionsData.length}
              />

              {/* Question(s) */}
              <div className="mt-5 ">
                <Questions item={currentRecords[0]} handleAnswer={handleAnswer} />
              </div>
            </Card.Body>
          </div>

          {/* Quiz Pagination */}
          <QuizPaginations
            nPages={nPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            onSubmitAnswers={handleSubmitAnswers}
          />
        </div>
        </div>
        
      </section>
    </>
  );
};

QuizStart.Layout = BlankLayout;

// Fetch data during build time
export const getStaticProps = async () => {
  try {
    const data = await axios.get(`${process.env.NEXTAUTH_URL}/api/siteSettings/landingPage/quiz/addQuiz`);
    const quizData = data?.data.quizLive;
    return {
      props: {
        quizData,
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      props: {
        quizData: [],
      },
    };
  }
};

export default QuizStart;
