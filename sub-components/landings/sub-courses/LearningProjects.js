// import node module libraries
import Link from 'next/link';
import { Col, Row, Container, Image } from 'react-bootstrap';

const LearningProject = () => {

    const programFeatures = [
        {
            id: 1,
            icon: "https://www.almabetter.com/_next/image?url=https%3A%2F%2Falmablog-media.s3.ap-south-1.amazonaws.com%2FNetflix_fcd8457cf4.png&w=256&q=75",
            title: 'Zomato Restaurant Clustering and Sentiment Analysis',
        },
        {
            id: 2,
            icon: "https://www.almabetter.com/_next/image?url=https%3A%2F%2Falmablog-media.s3.ap-south-1.amazonaws.com%2FZomato_Restaurant_Clustering_and_Sentiment_Analysis_844284da5b.png&w=256&q=75",
            title: 'Walmart Sales Forecasting',
        },
        {
            id: 3,
            icon: "https://www.almabetter.com/_next/image?url=https%3A%2F%2Falmablog-media.s3.ap-south-1.amazonaws.com%2FYes_f5db6dc874.png&w=256&q=75",
            title: 'Learn Anytime, Anywhere',
            description: 'Integer ultricies lorem nec erat fau euismod ipsum nislnec leo iaculis.'
        },
        {
            id: 4,
            icon: "https://www.almabetter.com/_next/image?url=https%3A%2F%2Falmablog-media.s3.ap-south-1.amazonaws.com%2FAirbnb_Logo_Belo_1_51ac91d1f7.png&w=256&q=75",
            title: 'Skill-based Learning',
            description: 'YesBank Stock Closing Price Prediction.'
        }
    ]

    return (
        <section className="pb-lg-14 pb-6 mt-lg-10 mt-6">
            <Container>
                <Row>
                    <Col xl={{ offset: 3, span: 6 }} md={12} xs={12} >
                        <div className="text-center mb-lg-10 mb-6">
                            <h2 className="h1 fw-bold">Hand-on Learning & <u className="text-primary"><span className="text-warning">Projects</span></u></h2>
                            <p className="lead mb-0">Dive into real-world projects and sharpen your interview skills with mock interviews, preparing you for success in the competitive data science landscape.</p>
                        </div>
                    </Col>
                </Row>
                <Row className="align-items-center">
                    <Col xl={5} lg={6} md={12} xs={12}>
                        <div className="mb-6 mb-lg-0">
                            <div className="mb-4 mb-xl-6 px-3 py-4 rounded border border-1 border-gray-200">
                                <div>
                                    <h2>Capstone Projects</h2>
                                    <p className='text-body fs-3'>Undertake Industry Level Projects in teams</p>
                                </div>
                                <div >
                                    <Link className='text-warning fs-4' href={'/'}>Learn More</Link>
                                    <span></span>
                                </div>
                            </div>
                            <div className="mb-4 mb-xl-6 p-2 rounded border border-1 border-gray-200">
                                <div>
                                    <h2>Capstone Projects</h2>
                                    <p className='text-body fs-3'>Undertake Industry Level Projects in teams</p>
                                </div>
                                <div >
                                    <Link className='text-warning fs-4' href={'/'}>Learn More</Link>
                                    <span></span>
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col xl={{ offset: 1, span: 6 }} lg={6} md={12} xs={12}>
                        <Row className="row-cols-2">
                            {programFeatures.map((item, index) => {
                                return (
                                    <Col key={index}>
                                        <div className="mb-4 mb-xl-6 px-3 py-4 rounded border border-1 border-info text-center" style={{ height: '180px' }}>
                                            <div className="mb-4 text-primary text-center">
                                                <Image src={item.icon} alt='imge' className='img-fluid w-50' />
                                            </div>
                                            <div>
                                                <p className='text-dark'>{item.title}</p>
                                            </div>
                                            <div>
                                                <Link className='text-warning fs-4' href={'/'}>Start Now</Link>
                                            </div>
                                        </div>
                                    </Col>
                                )
                            })}
                        </Row>
                    </Col>
                </Row>
            </Container >
        </section >
    )
}

export default LearningProject;