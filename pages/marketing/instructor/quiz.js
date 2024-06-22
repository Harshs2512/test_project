// import node module libraries
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios'
import Link from 'next/link';
import Loading from './../../loading'
import DotBadge from 'components/bootstrap/DotBadge';
import { Card, Table, Image, Spinner } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
// import profile layout wrapper
import ProfileLayout from 'layouts/marketing/instructor/ProfileLayout';
import { useSession } from 'next-auth/react';
const Quiz = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [quizList, setQuizList] = useState([]);
  const fetchQuiz = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`/api/quiz/quizByInstructor?userId=${userId}`);
      const data = response?.data?.quizes;
      setQuizList(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error('Error fetching products:', error);
    }

  };

  const { data: session } = useSession();
	const userId = session?.user?._id
  useEffect(() => {
    fetchQuiz();
  }, []);
  const handleDelete = async (id) => {
    try {
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success ms-2',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
      })

      swalWithBootstrapButtons.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          const res = axios.delete(`/api/quiz/${id}`)
          if (res) {
            fetchQuiz();
          }
          else {
            toast.error("something went wrong")
          }
          swalWithBootstrapButtons.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        }
      })
    } catch (error) {
      toast.error("Somtihing went wrong");
      console.log(error)
    }
  }
  const handleViewQuizResult = (quizId) => (e) => {
    e.preventDefault();
    router.push({
      pathname: '/marketing/instructor/quiz-single',
      query: { quizId },
    });
  };
  const handleResult = (quizId) => (e) => {
    e.preventDefault();
    router.push({
      pathname: '/marketing/instructor/quiz-result',
      query: { quizId },
    });
  };
  if (loading) {
    return (
      <ProfileLayout>
        <Card.Header className="d-flex align-items-center justify-content-between">
          <div className="">
            <h3 className="mb-0">All Mock Test {quizList.length}</h3>
          </div>
          <div>
            <Link href="add-new-quiz" className="btn btn-primary btn-sm">Add New Quiz</Link>
          </div>
        </Card.Header>
          <Loading />
      </ProfileLayout>
    );
  }
  return (
    <ProfileLayout>
      <ToastContainer />
      <Card className="mb-4">
        {/* Card header */}
        <Card.Header className="d-flex align-items-center justify-content-between">
          <div className="">
            <h3 className="mb-0">All Mock Test {quizList.length}</h3>
          </div>
          <div>
            <Link href="add-new-quiz" className="btn btn-primary btn-sm">Add New Quiz</Link>
          </div>
        </Card.Header>
        {/* Card body */}
        <Card.Body className="p-0">
          <Table responsive className="table-centered">
            <tbody>
              {quizList ?
                quizList && quizList.map((quiz, index) => {
                  return (
                    <tr key={index}>
                      <td >
                        <div className="d-flex align-items-center">
                          {/* quiz img */}
                          <Link href="#" onClick={handleViewQuizResult(quiz._id)} >
                            {quiz && (<Image
                              src={`data:${quiz.image.contentType};base64,${Buffer.from(quiz.image.data).toString(
                                'base64'
                              )}`}
                              alt={`Quiz ${quiz._id}`} className="rounded img-4by3-lg" />)}
                          </Link>
                          {/* quiz content */}
                          <div className="ms-3">
                            <h4 className="mb-2">
                              <Link href="#" onClick={handleViewQuizResult(quiz._id)} className="text-inherit">{quiz.title}</Link>
                            </h4>
                            <div>
                              <span><span className="me-2 align-middle"><i className="fe fe-list"></i></span>{quiz.questions_list.length} Questions</span>
                              <span className="ms-2"><span className="me-2 align-middle"><i className="fe fe-clock"></i></span> {quiz.hours}  Hours {quiz.minutes}  Minutes {quiz.seconds}  seconds</span>
                              {quiz.is_published === 'live' ?
                                <Link href="#" onClick={handleResult(quiz._id)} className="ms-2 text-body"><span
                                  className="me-2 align-middle  "><i className="fe fe-file-text"></i></span>Result
                                </Link> :
                                <>{' '}
                                  <i className="fe fe-file-text"></i><span> No Result</span>
                                </>}
                              <span className='mx-6 align-middle'>
                                <DotBadge
                                  bg={
                                    quiz.is_published === 'pending'
                                      ? 'warning'
                                      : quiz.is_published === 'live'
                                        ? 'success'
                                        : quiz.is_published === 'reject'
                                          ? 'danger'
                                          : ''
                                  }
                                >{quiz.is_published === 'pending'
                                  ? 'Pending'
                                  : quiz.is_published === 'live'
                                    ? 'Live'
                                    : quiz.is_published === 'reject'
                                      ? 'Rejected' : ''}</DotBadge>
                              </span>

                            </div>
                            <div>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>
                        {/* icon */}
                        <div>
                          <Link href="#" className="text-inherit"><i className="fe fe-settings"></i></Link>
                          <Link href="#top" className="ms-2 link-danger"><i className="fe fe-trash-2" onClick={() => handleDelete(quiz._id)}></i></Link>
                        </div>
                      </td>
                    </tr>
                  )
                })
                :
                <p>Quiz Empty</p>
              }
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </ProfileLayout >
  )
}

export default Quiz;
