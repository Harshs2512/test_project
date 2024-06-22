import React, { useEffect,useState, useRef } from 'react';
import { Image, Row, Col, Container } from 'react-bootstrap';
import axios from 'axios'
const LiveProject = () => {
    const [allProject,setAllProject] = useState([])
	const getProjects = async () => {
		try {
		  const res = await axios.get(
			"/api/siteSettings/project/addRecord"
		  );
		  if (res.status === 200) {
			setAllProject(res.data);
		  }
		} catch (error) {
		  console.log("Error fetching posts:", error);
		}
	  };
	  useEffect(() => {
		getProjects();
	  }, []);
    const alldataWithDuplicate = [...allProject, ...allProject];
    const containerRef = useRef(null);
    useEffect(() => {
        const container = containerRef.current;
        container.classList.add('smooth-scroll');
        const slideInterval = setInterval(() => {
            container.scrollTo({
                left: container.scrollLeft + 1,
                behavior: 'smooth'
            });
            if (container.scrollLeft >= container.scrollWidth / 2) {
                container.scrollTo({
                    left: 0,
                    behavior: 'smooth'
                });
            }
        }, 10);

        return () => {
            clearInterval(slideInterval);
            container.classList.remove('smooth-scroll');
        };
    }, []);
    return (
        <section className="bg-gray-100">
            <Container>
                <Row >
                    <Col md={12} className="px-lg-2 mb-7 my-2">
                        <h1 className="h1 fw-bold mt-3 text-capitalize text-center display-3">50 + Real world Project </h1>
                    </Col>
                </Row>
                <div className="logos" ref={containerRef} style={{ overflow: 'hidden' }}>
                    <div className="logos-slide d-flex">
                        {alldataWithDuplicate?.map((item, index) => {
                            return (
                                <div key={index} className="rounded bg-white shadow-lg border border-1 ms-3 text-center align-items-center">
                                    <div className='px-1 d-flex py-2 text-center justify-content-center' style={{ width: '20rem', height: '15rem' }}>
                                        <Image
                                            src={`/api/siteSettings/project/ProjectcoverImage/${item._id}`}
                                            alt="Project image 1"
                                            className="rounded-3 w-100 h-100"
                                        />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className="logos" ref={containerRef} style={{ overflow: 'hidden' }}>
                    <div className="logos-slide d-flex">
                    {alldataWithDuplicate?.map((item, index) => {
                            return (
                                <div key={index} className="rounded bg-white shadow-lg border border-1 ms-3 text-center align-items-center">
                                    <div className='px-1 d-flex py-2 text-center justify-content-center' style={{ width: '20rem', height: '15rem' }}>
                                        <Image
                                             src={`/api/siteSettings/project/ProjectcoverImage/${item._id}`}
                                            alt="Gallery image 1"
                                            className="rounded-3 w-100 h-100"
                                        />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </Container>
        </section>
    );
};

export default LiveProject;
