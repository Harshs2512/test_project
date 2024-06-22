// import node module libraries
import React, { Fragment } from 'react';
import Link from 'next/link';
import { Card, ProgressBar, Dropdown } from 'react-bootstrap';
import axios from 'axios';
// import custom components
import { AvatarGroup, Avatar } from 'components/bootstrap/Avatar';

// import utility file
import { numberWithCommas, getStatusColor } from 'helper/utils';

// import data files
import ProjectTeamMembersData from 'data/dashboard/projects/ProjectTeamMembersData';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from 'next/router';
const ProjectCard = ({ item }) => {
	const router = useRouter()
	const actionHandler = async (id) => {
		try {
			const res = await axios.delete(`/api/siteSettings/project/addRecord?id=${id}`);
			if (res.status === 200) {
				toast.success("Project Deleted");
			}
		} catch (error) {
			console.log("Error while deleting:", error);
		}
	};

	const handleUpdate = async (id, status) => {
		try {
			const res = await axios.put(`/api/siteSettings/project/updatestatus`, {
				id: id,
				status: status,
			});
			if (res) {
				toast.success(`Project Status Changed successfully`);
			} else {
				toast.error("something went wrong");
			}
		} catch (error) {
			toast.error("Somtihing went wrong");
			console.log(error);
		}
	};
	const handleProgress = async (id,progress)=>{
		try{
			const res = await axios.put(`/api/siteSettings/project/updateprogress`, {
				id: id,
				progress: progress,
			});
			if (res) {
				toast.success(`Project progress Changed successfully`);
			} else {
				toast.error("something went wrong");
			}
		}catch (error) {
			toast.error("Somtihing went wrong");
			console.log(error);
		}
	}
	const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
		(<Link
			href=""
			ref={ref}
			onClick={(e) => {
				e.preventDefault();
				onClick(e);
			}}>
			{children}
		</Link>)
	));
	CustomToggle.displayName = 'CustomToggle';
	const ActionMenu = () => {
		return (
			<Dropdown>
				<ToastContainer />
				<Dropdown.Toggle as={CustomToggle}>
					<i className="fe fe-more-vertical text-muted"></i>
				</Dropdown.Toggle>
				<Dropdown.Menu align="end">
					<Dropdown.Header>Settings</Dropdown.Header>
					<Dropdown.Item eventKey="1">
						<Link href={`/dashboard/projects/create-project?id=${item._id}`}>
							<i className="fe fe-edit dropdown-item-icon"></i>Edit Details
						</Link>
					</Dropdown.Item>
					{/* <Dropdown.Item eventKey="2">
						<i className="fe fe-link dropdown-item-icon"></i>Copy project link
					</Dropdown.Item>
					<Dropdown.Item eventKey="3">
						<i className="fe fe-save dropdown-item-icon"></i>Save as Default
					</Dropdown.Item>
					<Dropdown.Item eventKey="3">
						<i className="fe fe-copy dropdown-item-icon"></i>Duplicate
					</Dropdown.Item>
					<Dropdown.Divider />
					<Dropdown.Item eventKey="3">
						<i className="fe fe-upload dropdown-item-icon"></i>Import
					</Dropdown.Item>
					<Dropdown.Item eventKey="3">
						<i className="fe fe-printer dropdown-item-icon"></i>Export / Print
					</Dropdown.Item>*/}
					
					
					<Dropdown.Item eventKey="3"
						onClick={() =>
							actionHandler(item._id)
						}>
						<i className="fe fe-trash dropdown-item-icon"></i>Delete Project
					</Dropdown.Item>
					{/* <Dropdown.Item eventKey="2"> */}
					{/* <Dropdown.Item eventKey="3">
						<i className="fe fe-users dropdown-item-icon"></i>Progress
					</Dropdown.Item> */}
					<Dropdown.Divider />
					<Dropdown>
							<Dropdown.Toggle id="dropdown-basic" className='p-0 mx-3 bg-white text-black border-0 ' varient="white">
								<i className="fe fe-archive dropdown-item-icon"></i> Progress
							</Dropdown.Toggle>
							<Dropdown.Menu>
								<Dropdown.Item  onClick={() => handleProgress(item._id, "25")}>25</Dropdown.Item>
								<Dropdown.Item  onClick={() => handleProgress(item._id, "50")}>50</Dropdown.Item>
								<Dropdown.Item  onClick={() => handleProgress(item._id, "75")}>75</Dropdown.Item>
								<Dropdown.Item  onClick={() => handleProgress(item._id, "100")}>100</Dropdown.Item>
							</Dropdown.Menu>
						</Dropdown>
					<Dropdown>
							<Dropdown.Toggle id="dropdown-basic" className='p-0 mx-3 bg-white text-black border-0 ' varient="white">
								<i className="fe fe-archive dropdown-item-icon"></i> Status
							</Dropdown.Toggle>
							<Dropdown.Menu>
								<Dropdown.Item  onClick={() => handleUpdate(item._id, "Pending")}>Pending</Dropdown.Item>
								<Dropdown.Item  onClick={() => handleUpdate(item._id, "Finished")}>Finished</Dropdown.Item>
								<Dropdown.Item  onClick={() => handleUpdate(item._id, "Progress")}>Progress</Dropdown.Item>
								<Dropdown.Item  onClick={() => handleUpdate(item._id, "Cancel")}>Cancel</Dropdown.Item>
							</Dropdown.Menu>
						</Dropdown>
					{/* </Dropdown.Item> */}
				</Dropdown.Menu>
			</Dropdown>
		);
	};

	const CardHeading = (item) => {
		if (item.icon != null) {
			return (
				<div className="d-flex align-items-center">
					<div className="icon-shape icon-lg rounded-3 border p-4">
						<i className={`fe fe-${item.icon} fs-3 text-muted`}></i>
					</div>
					<div className="ms-3">
						<h4 className="mb-0">
							<Link href="#" className="text-inherit text-truncate">
								{item.title}
							</Link>
						</h4>
						<span className="text-muted fs-6">{item.categories}</span>
					</div>
				</div>
			);
		} else {
			return (
				<div>
					<h4 className="mb-0">
						<Link href="#" className="text-inherit text-truncate ">
							{item.title}
						</Link>
					</h4>
					<span className="text-muted fs-6">{item.categories}</span>
				</div>
			);
		}
	};

	return (
		<Card className="h-100">
			{item.coverimage != null ? (
				<Fragment>
					<Card.Img
						variant="top"
						src={item.coverimage}
						className="img-fluid rounded-top"
					/>
					<div className="d-flex position-absolute end-0 pe-3 pt-3">
						<ActionMenu />
					</div>
				</Fragment>
			) : (
				''
			)}
			<Card.Body>
				{/* heading*/}
				{item.coverimage == null ? (
					<div className="d-flex align-items-center justify-content-between">
						{CardHeading(item)}
						<div className="d-flex align-items-center">
							<ActionMenu />
						</div>
					</div>
				) : (
					CardHeading(item)
				)}

				<div className="mt-3 mb-4">
					<p className="mb-0 text-truncate-line-2 ">{item.projectbrief}</p>
				</div>
				{/* progress */}
				<div className="d-flex justify-content-between align-items-center mb-5">
					<div className="d-flex align-items-center">
						{/* avatar group */}
						<AvatarGroup>
							{ProjectTeamMembersData.slice(0, 3).map((member, index) => {
								return (
									<Avatar
										size="md"
										src={member.image}
										type={`${member.image == null ? 'initial' : 'image'}`}
										name={member.name}
										className="rounded-circle"
										imgtooltip
										key={index}
									/>
								);
							})}
							{ProjectTeamMembersData.length > 3 && (
								<Avatar
									size="md"
									type="initial"
									name={`+${ProjectTeamMembersData.length - 3}`}
									variant="light"
									className="rounded-circle text-dark"
									showExact
								/>
							)}
						</AvatarGroup>

					</div>
					{/* text */}
					<div>
						<span
							className={`badge bg-light-${getStatusColor(
								item.status
							)} text-dark-${getStatusColor(item.status)}`}
						>
							{item.status}
						</span>
					</div>
				</div>
				<div>
					{/* progress bar */}
					<ProgressBar className="progress-tooltip" style={{ height: '6px' }}>
						<ProgressBar
							now={item.progress}
							style={{ width: item.progress + '%' }}
							variant={getStatusColor(item.status)}
						/>
						<div className="progress-bar">
							<span>{item.progress}%</span>
						</div>
					</ProgressBar>
				</div>
			</Card.Body>

			{/* card footer */}
			<Card.Footer className="p-0">
				<div className="d-flex justify-content-between ">
					<div className="w-50 py-3 px-4 ">
						<h6 className="mb-0 text-muted">Due Date:</h6>
						<p className="text-dark fs-6 fw-semi-bold mb-0">{item.duedate}</p>
					</div>
					<div className="border-start w-50 py-3 px-4">
						<h6 className="mb-0 text-muted">Budget:</h6>
						<p className="text-dark fs-6 fw-semi-bold mb-0">
							{item.budget}
						</p>
					</div>
				</div>
			</Card.Footer>
		</Card>
	);
};

export default ProjectCard;
