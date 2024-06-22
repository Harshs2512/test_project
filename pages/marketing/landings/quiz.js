// import node module libraries
import { Card } from "react-bootstrap";
import Link from "next/link";
import Image from "next/image";
// import profile layout wrapper
import BlankLayout from "layouts/marketing/BlankLayout";

const Quiz = () => {
  return (
    <section className="min-h-screen">
      <Card className="border-0 bg-gradient-color ">
        <Card.Body className="p-2 ">
          <div className="text-center p-4">
            <div style={{}} className="mx-auto">
              <Image
                src="/images/svg/Quiz.svg"
                alt=""
                className="mx-auto img-fluid "
                width={400}
                height={210}
              />
            </div>
            <div className="px-lg-18 py-lg-4">
              <h1 className="text-white">Welcome to Quiz</h1>
              <p className="mb-2 p-0 text-white">
                Engage live or asynchronously with quiz and poll questions that
                participants complete at their own pace.
              </p>
              <Link href="./quiz-start" className="btn btn-warning my-1">
                Start Your Quiz
              </Link>
            </div>
          </div>
        </Card.Body>
      </Card>
    </section>
  );
};
Quiz.Layout = BlankLayout;
export default Quiz;
