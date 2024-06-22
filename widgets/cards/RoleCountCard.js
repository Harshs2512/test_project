// import node module libraries
import { Button, Card, Form, Image, Modal } from 'react-bootstrap';
import Link from 'next/link';
import { Avatar, AvatarGroup } from 'components/bootstrap/Avatar';
import { Fragment, useEffect, useState } from 'react';
import axios from 'axios';

const RoleCountCard = props => {
  const { item } = props;
  const roleId = item._id
  const [users, setUsers] = useState();
  const [modalOpen, setModalOpen] = useState(false);
  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const fetchUsers = async () => {
    const res = await axios.get("/api/auth/getadmins");
    setUsers(res.data)
  };

  useEffect(() => { fetchUsers(); }, [])

  return (
    <Fragment>
      <Card className="card-bordered mb-4 card-hover my-4 bg-gray-200">
        <Card.Body>
          <div>
            <div className="d-md-flex">
              <div className="ms-md-3 w-100 mt-3 mt-xl-1">
                <div className="d-flex justify-content-between mb-3">
                  <div>
                    <h3 className="mb-1 fs-4">
                      Total {users?.filter((item) => item.roles.includes(roleId)).length}{" "}
                      Users
                    </h3>
                  </div>
                  <div>
                    {/* bookmark */}
                    <AvatarGroup>
                      {users?.filter((item) => item.roles.includes(roleId)).map((item, index) => (
                        <Avatar
                          key={index}
                          size="md"
                          src={`/api/auth/profileimgadmin/${item._id}`}
                          type="image"
                          name={item?.fname}
                          className="rounded-circle rounded"
                          imgtooltip
                        />
                      ))}
                    </AvatarGroup>
                  </div>
                </div>
                <div className="d-md-flex justify-content-between ">
                  <div className="mb-2 mb-md-0">
                    <span className="me-2 fs-3">{item.rolename}</span>
                  </div>
                </div>
                <div>
                  <Link href={`/dashboard/roles-and-permissions/editrole?id=${roleId}`}>
                    <span className="me-2">Edit Role</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Card.Body>
      </Card>
      <Modal show={modalOpen} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Role</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className='mb-3'>
              <Form.Label>Enter Role</Form.Label>
              <Form.Control
                type="text"
                placeholder="Add new section"
              // value={sectionTitleInput}
              // onChange={(e) => setSectionTitleInput(e.target.value)} 
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary">
            Save
          </Button>
          <Button
            variant="secondary"
            onClick={handleCloseModal}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Fragment>

  )
}

export default RoleCountCard;