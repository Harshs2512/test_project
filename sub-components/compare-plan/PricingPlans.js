// import node module libraries
import { Row, Col, Container } from 'react-bootstrap';

// import sub components
import ComparePlanPricingCard from './ComparePlanPricingCard';

// import data files
import ComparePlansData from 'data/marketing/compare-plans/ComparePlansData';
import { useEffect, useState } from 'react';
import axios from 'axios';

const PricingPlans = () => {
	const [alldata, setAlldata] = useState([]);
	const fetchData = async () => {
		try {
			const res = await axios.get("/api/siteSettings/secondPage/pricingplanSection/getRecord");
			if (res.status === 200) {
				setAlldata(res.data[0]);
			};
		}
		catch (err) {
			console.log(err)
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<section className="py-14">
			<Container>
				<Row>
					<Col lg={{ span: 8, offset: 2 }} xl={{ span: 8, offset: 2 }} xs={12}>
						{/* heading */}
						<div className=" text-center mb-8">
							<h1 className="display-3 mb-3 fw-bold">
								{alldata?.title}
							</h1>
							<p className="lead px-md-14">
								{alldata?.description}
							</p>
						</div>
					</Col>
					{/* {ComparePlansData.map((item, index) => {
						return (
							<Col lg={5} md={12} xs={12} key={index} className='m-auto'>
								<ComparePlanPricingCard content={item} />
							</Col>
						);
					})} */}
					<Row>
						<Col lg={5} md={12} xs={12} className='m-auto'>
							<ComparePlanPricingCard content={alldata?.card_one ? alldata?.card_one : ''} />
						</Col>
						<Col lg={5} md={12} xs={12} className='m-auto'>
							<ComparePlanPricingCard content={alldata?.card_one ? alldata?.card_second : ''} />
						</Col>
					</Row>
				</Row>
			</Container>
		</section>
	);
}

export default PricingPlans; 