// import node module libraries
import { Fragment, useEffect, useState } from 'react';
import Link from 'next/link';
import { Row, Col, Container } from 'react-bootstrap';
import axios from 'axios';

// import data files
import AdditionalFeaturesData from 'data/marketing/compare-plans/AdditionalFeaturesData';

const ComparePlansTable = () => {
	const [alldata, setAlldata] = useState([]);
	const fetchData = async () => {
		try {
			const res = await axios.get("/api/siteSettings/secondPage/compareplanSection/getRecord");
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
		<section className="pb-14 pt-lg-8">
			<Container>
				<Row>
					{/* heading */}
					<Col lg={6} xs={12}>
						<div className="mb-8">
							<h1 className="display-4 fw-bold mb-4 pe-8">
								Compare plan & <br />
								<span className="text-primary">additional features</span>
							</h1>
							{/* para */}
							<p className="lead">
								{alldata.pagedescription}
							</p>
						</div>
					</Col>
				</Row>
				<Row>
					<Col xs={12}>
						{/* table */}
						<div className="table-responsive">
							<table className="table text-nowrap">
								<tbody>
									<tr>
										<td className="border-top-0 ps-0" colSpan="5">
											<h1 className="fw-bold">Features</h1>
										</td>
										<td className="border-top-0 ps-0">
											<h3 className="mb-1 fw-bold">Free</h3>
											<Link href="#">Fullstack Development</Link>
										</td>
										<td className="border-top-0 ps-0">
											<h3 className="mb-1 fw-bold">Growth</h3>
											<Link href="#">Advance Fullstack Development</Link>
										</td>
									</tr>
									{alldata?.planfeature?.map((item, index) => {
										return (
											<Fragment key={index}>
												<tr>
													<td className="pt-8 ps-0">
														<h3 className="mb-0">{item.featuretitle}</h3>
													</td>
												</tr>
												{item.featurelist.map((subitem, index) => {
													return (
														<tr key={index}>
															<td className="border-top-0 ps-0" colSpan="5">
																{subitem.subtitle}
															</td>
															<td className="border-top-0 ps-0">
																<i
																	className={`fe fe-${subitem.free
																		? 'check fs-3 text-success'
																		: 'x fs-3 text-muted'
																		}`}
																></i>
															</td>
															<td className="border-top-0 ps-0">
																<i
																	className={`fe fe-${subitem.growth
																		? 'check fs-3 text-success'
																		: 'x fs-3 text-muted'
																		}`}
																></i>
															</td>
														</tr>
													);
												})}
											</Fragment>
										);
									})}
								</tbody>
							</table>
						</div>
					</Col>
				</Row>
			</Container>
		</section>
	);
}

export default ComparePlansTable; 