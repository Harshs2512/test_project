// import node module libraries
import { Card } from 'react-bootstrap';
import Link from 'next/link';

// import widget/custom components
import { ApexCharts } from 'widgets';
import ProfileLayout from 'layouts/marketing/student/ProfileLayout';
import { useRouter } from 'next/router';

const QuizResult = () => {
  const router = useRouter();
  const { data } = router.query;

  if (!data) {
    return <ProfileLayout>
      <Card>
        <Card.Body className="p-10 text-center">
          <h1 className='mx-4 my-6'>Your Mock is Not Submitted Successfully. </h1>
          <h3 className=' text-center justify-content-center'>You can Click Go To Mock Button</h3>
          <h3 className=' text-center justify-content-center'> For Try Again</h3>
          <div className="mt-5 text-center justify-content-center">
            <Link href="quiz" className="btn btn-primary">Go To Mock</Link>
            {/* <Link href="#" className="btn btn-outline-secondary ms-2">Share <i className="fe fe-external-link"></i></Link> */}
          </div>
        </Card.Body>
      </Card>

    </ProfileLayout>;
  }

  const responseData = JSON.parse(data);

  let score = responseData.score;
  const QuizResultChartSeries = [score];
  const QuizResultChartOptions = {
    colors: ['#38a169'],
    plotOptions: {
      radialBar: {
        hollow: { margin: -2, size: '50%', background: '#d1f5ea' },
        dataLabels: {
          name: { show: true, fontSize: '18px', fontWeight: 600, offsetY: 7 },
          value: { show: false }
        }
      },
    },
    labels: [Math.round(score) + "%"],
  };
  return (
    <ProfileLayout>
      <Card>
        <Card.Body className="p-10 text-center">
          <div className="mb-4 ">
            {score >= 33 ? <h2>🎉 Congratulations. You passed!</h2> : <h2>Sorry. You Are Fail! Try Next Time.</h2>
            }
            <p className="mb-0 px-lg-14">You are successfully completed the quiz. Now you click on
              finish and back to your quiz page.</p>
          </div>
          <div className="d-flex justify-content-center">
            <div className="resultChart">
              <ApexCharts
                options={QuizResultChartOptions}
                series={QuizResultChartSeries}
                type="radialBar"
                height={150}
              />
            </div>
          </div>
          <div className="mt-3">
            <span>Correct Answer: <span className="text-dark">{responseData.correctCount}</span></span><br />
            <span>incorrect Answer: <span className="text-dark">{responseData.incorrectCount}</span></span><br />
            <span>Your Score: <span className="text-dark">{Math.round(score)} %</span></span><br />
            <span className="mt-2 d-block">Passing Score: <span className="text-dark">33%</span></span>
          </div>
          <div className="mt-5">
            <Link href="quiz" className="btn btn-primary">Finish</Link>
            {/* <Link href="#" className="btn btn-outline-secondary ms-2">Share <i className="fe fe-external-link"></i></Link> */}
          </div>
        </Card.Body>
      </Card>
    </ProfileLayout>
  )
}

export default QuizResult;
