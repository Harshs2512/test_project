import { Card, Image } from 'react-bootstrap';
import { useMediaQuery } from 'react-responsive';

export const StatTopSVGIcon = (prop) => {
	const { item } = prop;
	const { indexNumber } = prop;
	const isMobile = useMediaQuery({ query: '(max-width:  376px)' });

	return (
		<div
			id={`carouselExampleIndicators-${indexNumber}`}
			className=""
			data-ride="carousel"
			style={{ width: '200px' }}
		>
			<div className="carousel-inner">
				{[0, 1, 2].map((index) => (
					<div
						key={index}
						className={`carousel-item${index === 0 ? ' active' : ''} card border-0 card-0 shadow-lg`}
						style={{ borderRadius: '15%' }}
					>
						<div className="align-items-center justify-content-center pe-10">
							{item && item._id && (
								<Image
									src={`/api/siteSettings/landingPage/placementRecords/getStudenticon/${item?._id}`}
									alt="avatar image"
									className={`img-fluid profile-pic`}
								/>
							)}
						</div>
						<div className="mt-4 align-items-center justify-content-center">
							<h4 className='text-uppercase'>{item?.student_name}</h4>
							{item && item._id && (
								<Image
									src={`/api/siteSettings/landingPage/placementRecords/getCompanylogo/${item?._id}`}
									style={{ margin: '0 auto', width: 'auto', maxHeight: '40px' }}
									className='img-fluid'
									alt="avatar image"
								/>
							)}
							<p className="text-gray-500 mt-2 mb-0">Is Placed At</p>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};
