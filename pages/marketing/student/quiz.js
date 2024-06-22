import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Link from "next/link";
import { Card, Table, Image, Modal } from "react-bootstrap";
import "react-toastify/dist/ReactToastify.css";
import ProfileLayout from "layouts/marketing/student/ProfileLayout";
import Loading from "./../../loading";
import {getSession } from 'next-auth/react';
const Quiz = (props) => {
  const allQuizzes = props?.data;
  const quizList = [].concat(...allQuizzes.map((order) => order));
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [quizId, setQuizId] = useState("");
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  
  const handleViewQuizResult = (quizId) => (e) => {
    e.preventDefault();
    setEditModalOpen(true);
    setQuizId(quizId);
  };
  const QuizStart = async () => {
    setEditModalOpen(false);
    setLoading(true);
    try {
      await router.push({
        pathname: `/marketing/student/quiz-start`,
        query: { quizId },
      });
    } catch (error) {
      console.error("Error navigating to quiz:", error);
    }
  };
  const modelClose = () => {
    setEditModalOpen(false);
  };
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
        <Card.Header className="d-flex align-items-center justify-content-between">
          <div className="">
            <h3 className="mb-0">All Mock Test {quizList.length}</h3>
          </div>
        </Card.Header>
        <Card.Body className="p-0">
          <Table responsive className="table-centered">
            <tbody>
              {quizList.length !== 0 ? (
                quizList.map((quiz, index) => {
                  return (
                    <tr key={index}>
                      <td>
                        <div className="d-flex align-items-center">
                          <Link href="#">
                            {quiz && (
                              <Image
                                src={`/api/quiz/quizthumbnail/${
                                  quiz?._id
                                }`}
                                alt={`Quiz ${quiz._id}`}
                                className="rounded img-4by3-lg"
                              />
                            )}
                          </Link>
                          <div className="ms-3">
                            <h4 className="mb-2">
                              <Link href="#" className="text-inherit">
                                {quiz.title}
                              </Link>
                            </h4>
                            <div>
                              <span>
                                <span className="me-2 align-middle">
                                  <i className="fe fe-list"></i>
                                </span>
                                {quiz?.questions_list?.length} Questions
                              </span>
                              <span className="ms-2">
                                <span className="me-2 align-middle">
                                  <i className="fe fe-clock"></i>
                                </span>
                                {quiz.hours} Hours {quiz.minutes} Minutes{" "}
                                {quiz.seconds} Seconds
                              </span>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div>
                          <Link
                            href="#"
                            onClick={handleViewQuizResult(quiz._id)}
                            className="btn btn-primary mt-4 p-1"
                          >
                            Start Your Quiz
                          </Link>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <>
                  <div className="text-center  justify-content-center  align-items-center ">
                    <h2>You have not purchased any item</h2>
                    <Image
                      src="/images/cybrommain/empty.png" alt="empty image"
                      className="w-25"
                    />
                  </div>
                </>
              )}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
      <Modal show={editModalOpen} onHide={modelClose} className="modal-lg">
        <Modal.Header closeButton>
          <Modal.Title>
            <h1>Welcome to the Mock Test</h1>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card.Body className="p-4">
            <h3 className="px-4">
              Before Starting Your Mock Test, Please Read the Instructions
              Carefully
            </h3>
            <div>
              <div className="px-4">
                <p className="mb-0">
                  Engage live or asynchronously with Mock and poll questions
                  that participants complete at their own pace.
                </p>
                <div className="my-2 d-flex">
                  <ol>
                    <li>
                      Ensure you attempt all questions during the mock test.
                    </li>
                    <li>
                      Read each question thoroughly before providing your
                      response.
                    </li>
                    <li>
                      Double-check your answers before moving on to the next
                      question.
                    </li>
                    <li>Be mindful of the time allocated for the mock test.</li>
                    <li>
                      Review your answers if time permits before submitting.
                    </li>
                    <li>
                      Once you have viewed the explanations for the questions,
                      please note that you cannot modify your answers.
                    </li>
                    <li>
                      Once you have reviewed your answers, click the Finish
                      button to submit your mock test.
                    </li>
                    <li>
                      Click the Finish button after you have attempted all the
                      questions.
                    </li>
                  </ol>
                  <Image
                    src="/images/svg/survey-img.svg"
                    alt=""
                    className="img-fluid"
                  />
                </div>
                <div className="text-center justify-conent-center">
                  <Link
                    href="#"
                    onClick={QuizStart}
                    className="btn btn-primary my-2"
                  >
                    Start Your Quiz
                  </Link>
                </div>
              </div>
            </div>
          </Card.Body>
        </Modal.Body>
      </Modal>
    </ProfileLayout>
  );
};

export const getServerSideProps = async ({ req }) => {
	try {
	  const session = await getSession({ req });
	  const userId = session?.user?._id;
	  const response = await axios.get(`${process.env.NEXTAUTH_URL}/api/quiz/addquiz?userId=${userId}`);
	const allCourses = response?.data?.filteredPurchaseItems;
	  return {
		props: {
		  data: allCourses,
		},
	  };
	} catch (error) {
	  console.error("Error fetching data:", error);
	  return {
		props: {
		  data: [],
		},
	  };
	}
  };

export default Quiz;
