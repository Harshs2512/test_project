// import node module libraries
import { Fragment,useState,useEffect } from 'react';
import Link from 'next/link';
import { Col, Row, Breadcrumb, Card } from 'react-bootstrap';
import axios from 'axios';
// import sub components
import { CreateProjectForm } from 'sub-components';
import { useRouter } from 'next/router';

const CreateProject = () => {
	const router = useRouter();
	const { id } = router.query;
const [singleProject,setSingleProject]= useState([])
	const getProjects = async () => {
		try {
			const res = await axios.get(
				`/api/siteSettings/project/addRecord?id=${id}`
			);
			if (res.status === 200) {
				setSingleProject(res.data);
			}
		} catch (error) {
			console.log("Error fetching posts:", error);
		}
	};

	useEffect(() => {
		getProjects();
	}, []);

	return (
		<Fragment>
			<Row>
				<Col lg={12} md={12} sm={12}>
					<div className="border-bottom pb-4 mb-4 d-md-flex align-items-center justify-content-between">
						<div className="mb-3 mb-md-0">
							<h1 className="mb-1 h2 fw-bold">Create New Project</h1>
							<Breadcrumb>
								<Breadcrumb.Item href="#">Dashboard</Breadcrumb.Item>
								<Breadcrumb.Item href="#">Project</Breadcrumb.Item>
								<Breadcrumb.Item active>Create Project</Breadcrumb.Item>
							</Breadcrumb>
						</div>
						<div>
							<Link href="/dashboard/projects/grid" className="btn btn-primary">
								Back to Project
							</Link>
						</div>
					</div>
				</Col>
			</Row>
			<div className="py-6">
				<Row>
					<Col xl={{ offset: 0, span: 12 }} md={12} xs={12}>
						<Card>
							<Card.Body className="p-lg-6">
								<CreateProjectForm item={singleProject}/>
							</Card.Body>
						</Card>
					</Col>
				</Row>
			</div>
		</Fragment>
	);
};

export default CreateProject;
