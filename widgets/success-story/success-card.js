// import node module libraries
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import {
	Card,
	ListGroup,
	Image
} from 'react-bootstrap';


const SuccesStoryCard = ({ item, viewby, extraclass }) => {
	const GridView = () => {
		return (
			<Card className={`mb-4 card-hover rounded-0 ${extraclass}`}>
				<div className="justify-content-center align-content-center ">
					{/* <div> */}
					<iframe src={item.Video_url}
						width="100%" height="100%"
						frameborder="0"
						className=''
						allow="autoplay; fullscreen" allowFullScreen>
					</iframe>
					{/* </div> */}

				</div>
				<Card.Body >
					<div>
						<h3 className="h4 text-truncate ">
							{item.student_name}
						</h3>
						<h3>{item.course}</h3>
					</div>

					<div className='py-4 border border-2 border-bottom-0 border-top-0 border-end-0 border-dark'></div>
					<div className={`lh-1 d-flex align-items-center `}>
						<div>
							<h4>{item.company_name} </h4>
							<div className="rounded bg-white shadow-lg border border-1 text-center align-items-center">
								<div className='d-flex text-center justify-content-center m-1' style={{ width: '6rem', height: '3rem' }}>
									<Image
										src={`/api/siteSettings/landingPage/placementRecords/getCompanylogo/${item._id}`}
										alt='company image' className='img-fluid ' />
								</div>
							</div>

						</div>
					</div>
				</Card.Body>
			</Card>
		);
	};
	return (
		<Fragment>
			{viewby === 'grid' ? (
				<GridView />
			) : " "}
		</Fragment>
	);
};
SuccesStoryCard.defaultProps = {
	free: false,
	viewby: 'grid',
	showprogressbar: false,
	extraclass: ''
};
SuccesStoryCard.propTypes = {
	item: PropTypes.object.isRequired,
	free: PropTypes.bool,
	viewby: PropTypes.string,
	showprogressbar: PropTypes.bool,
	extraclass: PropTypes.string
};

export default SuccesStoryCard;
