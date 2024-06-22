// import node module libraries
import Link from 'next/link';
import { Row, Col, Image, Container, ListGroup } from 'react-bootstrap';

// import MDI icons
import Icon from '@mdi/react';
import { mdiFacebook, mdiTwitter, mdiInstagram } from '@mdi/js';
import axios from 'axios';
import { useEffect, useState } from 'react';

const FooterWithLinks = () => {
	const [alldata, setAlldata] = useState([]);

	const fetchData = async () => {
		const res = await axios.get("/api/siteSettings/landingPage/footer/getRecords");
		if (res.status === 200) {
			setAlldata(res?.data[0])
		}
	};
	useEffect(() => {
		fetchData();
	}, []);

	return (
		<footer className="pt-lg-10 pt-5 footer bg-light">
			<Container>
				<Row>
					<Col lg={4} md={6} sm={12}>
						{/* about company  */}
						<div className="mb-4">
							<Image src="/images/brand/logo/cybrom_long.png" alt="" className="logo-inverse w-50 h-25" />
							<div className="mt-4">
								<p>
									{alldata?.description}
								</p>
								{/* social media */}
								<div className="fs-4 mt-4">
									{alldata?.sociallinks?.map((item, index) => {
										return (
											<Link key={index} href={item.link} className="mdi mdi-facebook text-muted me-2">
												<Icon path={mdiFacebook} size={0.7} />
											</Link>
										)
									})}
								</div>
							</div>
						</div>
					</Col>
					{alldata?.links?.map((item, index) => (
						<Col lg={2} md={3} sm={6} key={index}>
							<div className='mb-4'>
								<h3 className="fw-bold mb-3">{item.mainlink}</h3>
								<ListGroup
									as="ul"
									bsPrefix="list-unstyled"
									className="nav nav-footer flex-column nav-x-0"
								>
									<ListGroup.Item as="li" bsPrefix=" ">
										<Link href="#" className="nav-link">
											{item?.sublink?.title}
										</Link>
									</ListGroup.Item>
								</ListGroup>
							</div>
						</Col>
					))}
					<Col lg={3} md={12} sm={12}>
						{/* contact info */}
						<div className="mb-4">
							<h3 className="fw-bold mb-3">Get in touch</h3>
							<p>{alldata?.address}</p>
							<p className="mb-1">
								Email: <Link href="#">{alldata?.email}</Link>
							</p>
							<p>
								Phone:{' '}
								<span className="text-dark fw-semi-bold">
									(+91) {alldata?.phone}
								</span>
							</p>
							<div className="d-flex">
								{alldata?.playstore?.status === 'true' ? <Link href={alldata?.playstore?.link}><Image src='/images/svg/appstore.svg' alt="" className="img-fluid" /></Link> : ''}
								{alldata?.appstore?.status === 'true' ? <Link href={alldata?.appstore?.link} className="ms-2"><Image src='/images/svg/playstore.svg' alt="" className="img-fluid" /></Link> : ''}
							</div>
						</div>
					</Col>
				</Row>
				<Row className="align-items-center g-0 border-top py-2 mt-6">
					{/* Desc  */}
					<Col lg={4} md={5} sm={12}>
						<span>© 2023 Cybrom All Rights Reserved</span>
					</Col>
					{/*  Links  */}
					<Col
						lg={8}
						md={7}
						sm={12}
						className="d-md-flex justify-content-end"
					>
						<nav className="nav nav-footer">
							<Link href="#" className="nav-link ps-0">
								Privacy Policy
							</Link>
							<Link href="#" className="nav-link px-2 px-md-3">
								Cookie Notice
							</Link>
							<Link href="#" className="nav-link d-none d-lg-block">
								Do Not Sell My Personal Information
							</Link>
							<Link href="#" className="nav-link">
								Terms of Use
							</Link>
						</nav>
					</Col>
				</Row>
			</Container>
		</footer>
	);
};

export default FooterWithLinks;
