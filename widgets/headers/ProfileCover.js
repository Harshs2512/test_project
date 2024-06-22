// import node module libraries
import { Row, Col, Image, Card } from 'react-bootstrap';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
// import custom components
import LevelIconWithTooltip from 'widgets/miscellaneous/LevelIconWithTooltip';
const ProfileCover = ({ dashboardData }) => {
	const { data: session } = useSession();
	const userData =  session?.user;
	console.log(userData)
	return (
		<Row className="align-items-center">
			<Col xl={12} lg={12} md={12} sm={12}>
				<div
					className="pt-16 rounded-top-md profile-cover"
					style={{
						background: `url('/images/background/profile-bg.jpg')`,
						backgroundRepeat: 'no-repeat',
						backgroundSize: 'cover',
					}}
				></div>
				<Card className="card px-4 pt-2 pb-4 rounded-0 rounded-bottom shadow-sm">
					<div className="d-flex align-items-end justify-content-between">
						<div className="d-flex align-items-center">
							<div className="me-2 position-relative d-flex justify-content-end align-items-end mt-n5">
								<Image
									src={`/api/auth/profileimgadmin/${userData?._id}`}
									className="avatar-xl rounded-circle border border-4 border-white position-relative"
									alt="profile image"
								/>
								{dashboardData.verified ? (
									<Link
										href="#"
										className="position-absolute top-0 end-0"
										data-bs-toggle="tooltip"
										data-placement="top"
										title=""
										data-original-title="Verified"
									>
										<Image src="/images/svg/checked-mark.svg" alt="" height="30" width="30" />
									</Link>
								) : (
									''
								)}
							</div>
							<div className="lh-1">
								<h2 className="mb-0">
									{userData?.fname} { userData?.lname} <LevelIconWithTooltip level={dashboardData.level} />{' '}
								</h2>
								<p className="mb-0 d-block">{userData?.email}</p>
							</div>
						</div>
						<div>
							<Link
								href={session && session.user.role === 'instructor' ? "/marketing/instructor/add-new-course" : "/marketing/courses/buy_courses"}
								className="btn btn-primary d-md-block"
							>
								{session && session.user.role === 'instructor' ? "Add Course" : "Go To Dashboard"}
							</Link>

						</div>
					</div>
				</Card>
			</Col>
		</Row>
	);
};

export default ProfileCover;
