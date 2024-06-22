import axios from "axios";
import { useEffect, useState } from "react";
import { Container, Image, Row, Col } from "react-bootstrap";

const CareerGoalsSteps = () => {
    const [selectedButton, setSelectedButton] = useState(0);
    const [data, setData] = useState([]);
    const fetchData = async () => {
        try {
            const { data } = await axios.get('/api/siteSettings/secondPage/careerGoals/getRecords')
            setData(data)
        }
        catch (error) {
            console.log(error)
        }
    }
    useEffect(() => { fetchData() }, []);

    const handleClick = (index) => {
        setSelectedButton(index);
    };

    const currentData = selectedButton !== null ? data[selectedButton] : data[0];
    return (
        <section className="py-8 py-lg-16 bg-light-gradient-bottom bg-white">
            <Container>
                <Row>
                    <div className="mb-lg-10 mb-3 text-center my-4">
                        <h2 className="h1 fw-bold">Our Expert Services for your <u className="text-warning "><span className="text-warning"> Career Goals
                        </span></u></h2>
                        <p className="mb-0">Learn on an AI-powered platform with high-quality content, live sessions & mentoring from leading industry experts to achieve your desired goal.</p>
                    </div>
                </Row>
                <Row>
                    <div className='d-flex gap-10 justify-content-center'>
                        {data.map((item, index) => (
                            <div
                                className='d-flex align-items-center' style={{ cursor: 'pointer' }}
                                onClick={() => handleClick(index)}
                                key={index}
                            >
                                <i className={`fe fe-check rounded-circle p-2 text-white me-2 fs-3 ${selectedButton === index ? 'bg-success' : 'bg-gray-300'}`}></i>
                                <h3>{item.buttontitle}</h3>
                            </div>
                        ))}
                    </div>
                </Row>
                <Row className='py-4'>
                    <Container>
                        <div className='text-center'>
                            <Image src={`/api/siteSettings/secondPage/careerGoals/getimage/${currentData?._id}`} alt='image' />
                        </div>
                    </Container>
                </Row>
                <Row>
                    {data[selectedButton]?.steps?.slice(0, 2).map((item, index) => (
                        <Col lg={6} sm={12} key={index}>
                            <div className='text-center'>
                                <h3>{item.title}</h3>
                                <p>{item.description}</p>
                            </div>
                        </Col>
                    ))}
                </Row>
                <Row className="align-items-center">
                    <Col lg={5} sm={12} className='text-end'>
                        <Image src='/images/cybrommain/vector-arrow-left.svg' alt='image' />
                    </Col>
                    <Col lg={2} sm={12}>
                        <div className='text-center'>
                            <h3>{currentData?.steps[1]?.title}</h3>
                            <p>{currentData?.steps[1]?.description}</p>
                        </div>
                    </Col>
                    <Col lg={5} sm={12} className='text-start'>
                        <Image src='/images/cybrommain/vector-arrow-right.svg' alt='image' />
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default CareerGoalsSteps;