// import node module libraries
import { useEffect, useState } from 'react';
import { Container, Row, Col, Table,Card,Image } from 'react-bootstrap';
import Link from 'next/link'
import axios from 'axios';

const FeaturesWithBullets = () => {
	const [alldata, setAlldata] = useState();
	const fetchData = async () => {
		try {
			const res = await axios.get("/api/siteSettings/secondPage/enquriySection/getRecord")
			setAlldata(res?.data[0])
		}
		catch (err) {
			console.log(err)
		}
	};
	useEffect(() => {
		fetchData();
	}, []);

	const UpcomingWebinarsData = [
		{
			id: 1,
			image: 'https://distanceeducationschool.com/wp-content/uploads/2022/09/icon-pink-png.png',
			title: 'Programme Details',
			descriptions: 'Complete Details on BCA Distance Learning Course Eligibility, Fees, Specializations, & Duration.',
			time: '6:00 PM – 8:00 PM GMT'
		},
		{
			id: 2,
			image: 'https://distanceeducationschool.com/wp-content/uploads/2022/09/purple-icon-png.png',
			title: 'University',
			descriptions: 'Admission to the Top UGC-DEB, NAAC A+ Accredited Universities in India.',
			time: '8:00 AM PDT'
		},
		{
			id: 3,
			image: 'https://distanceeducationschool.com/wp-content/uploads/2022/09/Green-Icon.png',
			title: 'Career Opportunities',
			descriptions: 'Distance BCA provides an array of opportunities. Click here to learn more & start your journey today.',
			time: '10:00 PM IST'
		},
		{
			id: 4,
			image: 'https://distanceeducationschool.com/wp-content/uploads/2022/09/blue-icon.png',
			title: 'Admission Process',
			descriptions: 'Experience a smooth and hassle-free admission process to our distance programs, all from the comfort of your home.',
			time: '10:00 PM IST'
		}
	];

	return (
		<section className="py-14 shadow-sm">
			<Container>
				<Row className='mx-auto w-lg-75 w-md-100'>
					<Table responsive>
						<thead>
							<tr>
								<th scope="col" className='text-white bg-info  fs-4' style={{ backgroundColor: 'blue', color: 'white' }}>Degree</th>
								<th scope="col" className='text-white bg-info  fs-4'>Full Form</th>
								<th scope="col" className='text-white bg-info  fs-4'>Duration</th>
								<th scope="col" className='text-white bg-info  fs-4'>Eligibility</th>
								<th scope="col" className='text-white bg-info  fs-4'>Semester Fee</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td className='text-white bg-dark border-2 border-white '>Batchelor</td>
								<td className='text-white bg-dark border-2 border-white'>(Bachelor of Computer Application)</td>
								<td className='text-white bg-dark border-2 border-white'>3 Year</td>
								<td className='text-white bg-dark border-2 border-white'>12th Pass</td>
								<td className='text-white bg-dark border-2 border-white'>36000 INR</td>
							</tr>
						</tbody>
					</Table>
				</Row>
				<Row className="py-6">
				{UpcomingWebinarsData.slice(0, 4).map((item, index) => {
						return (
							<Col key={index} lg={3} md={6} sm={12} className='py-3'>
								<Card className="mb-2 mb-xl-0 card-hover shadow-lg  border-6 border-bottom  border-warning justify-content-center  align-items-center">
									<Link href="#!" className="text-center pt-4">
										<Image src={item.image} alt="webinar-1"
											className="img-fluid w-50 h-50 rounded-top-3" />
									</Link>
									<Card.Body className='p-2'>
										<h4 className=" text-truncate text-center">
											<Link href="#!" className="text-inherit ">{item.title}</Link>
										</h4>
										<div className="px-2">
											<div className="mb-3 lh-1">
												<span className="fs-4">{item.descriptions}</span>
											</div>
										</div>
									</Card.Body>
								</Card>
							</Col>
						);
					})}
				</Row>
			</Container>
		</section>
	);
};
export default FeaturesWithBullets;
