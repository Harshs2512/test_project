import { useRouter } from "next/router";
import axios from "axios";
import Link from "next/link";
import { Card, Table, Image, Badge } from "react-bootstrap";
import "react-toastify/dist/ReactToastify.css";
import ProfileLayout from "layouts/marketing/student/ProfileLayout";
import { getSession } from "next-auth/react";

const GuidePath = (props) => {
  const allGuides = props?.data;
  const guideList = [].concat(...allGuides.map((order) => order));
  const router = useRouter();
  const handleCodePage = async (GuidetId) => {
    try {
      const GuideData = await axios.get(`/api/Course-guide/${GuidetId}`);
      const SingleData = GuideData?.data?.contest;
      const serializedProblem = JSON.stringify(SingleData);
      const encodedProblem = encodeURIComponent(serializedProblem);
      const url = `/studio/Guide-code/codedesign?problem=${encodedProblem}`;
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
            <h3 className="mb-0">All Guided Path  {guideList.length}</h3>
          </div>
        </Card.Header>
        <Card.Body className="p-0">
          <Table responsive className="table-centered">
            <tbody>
              {guideList.length !== 0 ? (
                guideList.map((Guide, index) => {
                  return (
                    <tr key={index}>
                      <td>
                        <div className="d-flex align-items-between  ">
                          <Link href="#">
                            {Guide && (
                              <Image
                                src={`/api/Course-guide/getthumbnail/${Guide?._id}`}
                                alt={`Guide ${Guide._id}`}
                                className="rounded img-4by3-lg"
                              />
                            )}
                          </Link>
                          <div className="ms-3">
                            <h4 className="mb-2">
                              <Link href="#" className="text-inherit">
                                {Guide.contest_title}
                              </Link>
                            </h4>
                            <div>
                              <span>{Guide?.topic?.length} Topic</span>
                              <span className="ms-2">
                                <Badge>{Guide.contest_level}</Badge>
                              </span>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td >
                        <div className="d-flex justify-content-end align-content-end">
                          <Link
                            href="#"
                            onClick={() => handleCodePage(Guide._id)}
                            className="btn btn-primary mt-4 p-1"
                          >
                            Start Learning
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
                      src="/images/cybrommain/empty.png"
                      alt="empty image"
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
    const response = await axios.get(
      `${process.env.NEXTAUTH_URL}/api/Course-guide/buyGuide?userId=${userId}`
    );
    const allGuide = response?.data?.filteredPurchaseItems;
    return {
      props: {
        data: allGuide,
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

export default GuidePath;
