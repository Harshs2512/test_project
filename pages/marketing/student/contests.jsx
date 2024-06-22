
import { useRouter } from "next/router";
import axios from "axios";
import Link from "next/link";
import { Card, Table, Image, Badge } from "react-bootstrap";
import "react-toastify/dist/ReactToastify.css";
import ProfileLayout from "layouts/marketing/student/ProfileLayout";
import {getSession } from 'next-auth/react';

const Contests = (props) => {
  const allContests = props?.data;
  const contestList = [].concat(...allContests.map((order) => order));
  const router = useRouter();  
  const handleCodePage = async (ContestId) => {
    try {
        const ContestData = await axios.get(`/api/Contest/${ContestId}`);
        const SingleData = ContestData?.data?.contest
        const serializedProblem = JSON.stringify(SingleData);
        const encodedProblem = encodeURIComponent(serializedProblem);
        const url = `/studio/challange/Code-single/codedesign?problem=${encodedProblem}`;
        router.push(url);
    } catch (error) {
      console.error("Error fetching user data", error);
    }
  };

  return (
    <ProfileLayout>
      <Card className="mb-4">
        <Card.Header className="d-flex align-items-center justify-content-between">
          <div className="">
            <h3 className="mb-0">All Contests {contestList.length}</h3>
          </div>
        </Card.Header>
        <Card.Body className="p-0">
          <Table responsive className="table-centered">
            <tbody>
              {contestList.length !== 0 ? (
                contestList.map((Contest, index) => {
                  return (
                    <tr key={index}>
                      <td>
                        <div className="d-flex align-items-center">
                          <Link href="#">
                            {Contest && (
                              <Image
                                src={`/api/Contest/getthumbnail/${
                                  Contest?._id
                                }`}
                                alt={`Contest ${Contest._id}`}
                                className="rounded img-4by3-lg"
                              />
                            )}
                          </Link>
                          <div className="ms-3">
                            <h4 className="mb-2">
                              <Link href="#" className="text-inherit">
                                {Contest.contest_title}
                                {/* {item.description.split(" ").slice(0, 20).join(" ")} */}
                              </Link>
                            </h4>
                            <div>
                              <span>
                                <span className="me-2 align-middle">
                                  <i className="fe fe-list"></i>
                                </span>
                                {Contest?.questionsList?.length} Questions
                              </span>
                              <span className="ms-2">
                                <Badge>
                                  {Contest.contest_level}   
                                </Badge>
                              </span>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div>
                          <Link
                            href="#"
                            onClick={() => handleCodePage(Contest._id)}
                            className="btn btn-primary mt-4 p-1"
                          >
                            Start Contest
                          </Link>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <>
                  <div className="text-center  justify-content-center  align-items-center ">
                    <h2>You have not purchased any item</h2>
                    <Image
                      src="/images/cybrommain/empty.png" alt="empty image"
                      className="w-25"
                    />
                  </div>
                </>
              )}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </ProfileLayout>
  );
};

export const getServerSideProps = async ({ req }) => {
	try {
	  const session = await getSession({ req });
	  const userId = session?.user?._id;
	  const response = await axios.get(`${process.env.NEXTAUTH_URL}/api/Contest/buyContest?userId=${userId}`);
	const allContest = response?.data?.filteredPurchaseItems;
	  return {
		props: {
		  data: allContest,
		},
	  };
	} catch (error) {
	  console.error("Error fetching data:", error);
	  return {
		props: {
		  data: [],
		},
	  };
	}
  };

export default Contests;
