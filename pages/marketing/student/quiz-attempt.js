// import node module libraries
import Link from 'next/link';
import { Card, Table, Badge, Image,Spinner } from 'react-bootstrap';
// import profile layout wrapper
import ProfileLayout from 'layouts/marketing/student/ProfileLayout';
import axios from 'axios'
import { useEffect, useState } from 'react';
import Loading from './../../loading'
import { useSession } from 'next-auth/react';

const QuizAttempt = () => {
  const[loading,setLoading] = useState(false);
  const [attemptQuiz, setAttemptQuiz] = useState();
  const [quizDetails, setQuizDetails] = useState();
  const { data: session } = useSession();
	const userId = session?.user?._id
  const ResultBadge = ({ score }) => {
    let result = '';

    if (score < 33) {
      result = 'Fail';
    } else {
      result = 'Pass';
    }

    let bgValue = '';
    switch (result) {
      case 'Fail': bgValue = 'danger-soft'; break;
      case 'Pass': bgValue = 'success-soft'; break;
      default: break;
    }

    return (<Badge bg={bgValue}>{result}</Badge>);
  }
  const formatDate = (dateString) => {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June', 'July',
      'August', 'September', 'October', 'November', 'December'
    ];
    const date = new Date(dateString);
    const year = date.getFullYear().toString();
    const month = months[date.getMonth()];
    const day = String(date.getDate()).padStart(2, '0');
    return `${month} ${day}, ${year}`;
  };
  const getTimeValue = (createdAt) => {
    if (!createdAt) {
      return ''; 
    }
    const date = new Date(createdAt);
    const options = { hour: 'numeric', minute: 'numeric', hour12: true };
    const formattedTime = date.toLocaleString('en-US', options);
  
    return formattedTime;
  };
  
  useEffect(() => {
    const fetchQuizDetails = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/api/quiz/quizexam/attemptedQbyuser?userId=${userId }`);
        const quizes = response.data.quizes || [];
        setAttemptQuiz(quizes);
        const quizPromises = quizes.map(item => axios.get(`/api/quiz/${item.quizId}`));
        const quizResults = await Promise.all(quizPromises);
        setQuizDetails(quizResults.map(result => result.data.quiz));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching quiz history:", error);
      }
    };

    fetchQuizDetails();
  }, []);
  if (loading) {
    return (
      <ProfileLayout>
        <Loading />
      </ProfileLayout>
    );
  }
  return (
    <ProfileLayout>
      {attemptQuiz ?
        <Card>
          <Card.Header className="card-header">
            <div className="mb-3 mb-lg-0">
              <h3 className="mb-1">My Mock Attempt</h3>
              <p className="mb-0">You can find all of your order Invoices.</p>
            </div>
          </Card.Header>
          <Table responsive hover className="text-nowrap text-lg-wrap table-centered">
            <thead className="table-light">
              <tr>
                <th>Mock Info</th>
                <th>Questions</th>
                <th>Correct</th>
                <th>Incorrect</th>
                <th>Marks</th>
                <th>Score</th>
                <th>Result</th>
              </tr>
            </thead>
            <tbody>

              {attemptQuiz && attemptQuiz.map((item, index) => {
                const quizDetail = quizDetails && quizDetails.find(quiz => quiz._id === item.quizId);
                return (
                  <tr key={index}>
                    <td>
                      <div>
                        <Link href="#">
                          <h5 className="mb-1">{quizDetail ? quizDetail.title : 'Quiz Title Not Found'}</h5>
                        </Link>
                        <small>{formatDate(item.createdAt)}</small>{' '}
                        <small>{getTimeValue(item.createdAt)}</small>
                      </div>
                    </td>
                    <td>{item.questions_list.length}</td>
                    <td>{item.correctCount}</td>
                    <td>{item.incorrectCount}</td>
                    <td>-/-</td>
                    <td>{Math.round(item.score)} %</td>
                    <td><ResultBadge score={item.score} /></td>
                  </tr>
                )
              })}
            </tbody>
          </Table>
        </Card>
        :
        <Card className="border-0">
          <Card.Body className="p-10">
            <div className="text-center">
              <Image src='/images/svg/survey-img.svg' alt="" className="img-fluid" />
              <div className="px-lg-18">
                <h1>Welcome to Mock Test </h1>
                <p className="mb-0">Engage live or asynchronously with quiz and poll questions that participants complete at their own pace.</p>
                <Link href="/marketing/student/quiz-start" className="btn btn-primary mt-4">Start Your Mock Test</Link>
              </div>
            </div>
          </Card.Body>
        </Card>

      }
    </ProfileLayout>
  )
}

export default QuizAttempt;
