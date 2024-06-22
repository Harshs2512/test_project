import { React, useState, useEffect } from "react";
import moment from "moment";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Badge,
  Modal,
  Form,
  Button,
} from "react-bootstrap";
import { useRouter } from "next/router";
const DayNames = {
  1: "Mon",
  2: "Tue",
  3: "Wed",
  4: "Thu",
  5: "Fri",
  6: "Sat",
  7: "Sun"
};
const Cell = ({ color, onClick }) => {
  let style = {
    backgroundColor: color,
    width: "15px",
    height: "9px",
    cursor: "pointer",
  };

  return (
    <div className="timeline-cells-cell" onClick={onClick} style={style}></div>
  );
};
const Month = ({ startDate, index }) => {
  let date = moment(startDate).add(index * 8, "day");
  let monthName = date.format("MMM");

  return (
    <div className={`timeline-months-month ${monthName}`}>{monthName}</div>
  );
};
const WeekDay = ({ index }) => {
  return <div className="timeline-weekdays-weekday">{DayNames[index]}</div>;
};
const Timeline = ({ range, data, colorFunc, onCellClick }) => {
  let days = Math.abs(range[0].diff(range[1], "days"));
  let cells = Array.from(new Array(days));

  let weekDays = Array.from(new Array(8));

  let months = Array.from(new Array(Math.floor(days / 7)));
  let min = Math.min(0, ...data.map((d) => d.value));
  let max = Math.max(...data.map((d) => d.value));
  let colorMultiplier = 1 / (max - min);
  let startDate = range[0];
  const DayFormat = "DDMMYYYY";
  return (
    <Container className="timeline d-flex flex-column align-items-center justify-content-center w-75 mx-auto">
      <div className="timeline-months w-100 justify-content-between overflow-x-scroll">
        {months.map((_, index) => (
          <Month key={index} index={index} startDate={startDate} />
        ))}
      </div>

      <div className="timeline-body ">
        <div className="timeline-weekdays">
          {weekDays.map((_, index) => (
            <WeekDay key={index} index={index} startDate={startDate} />
          ))}
        </div>

        <div className="timeline-cells overflow-x-scroll mt-4">
          {cells.map((_, index) => {
            let date = moment(startDate).add(index, "day");
            let dataPoint = data.find(
              (d) =>
                moment(date).format(DayFormat) ===
                moment(d.date).format(DayFormat)
            );
            let alpha = colorMultiplier * dataPoint.value;
            let color = colorFunc({ alpha });

            return (
              <Cell
                key={index}
                index={index}
                date={date}
                color={color}
                onClick={() => onCellClick(index)}
              />
            );
          })}
        </div>
      </div>
    </Container>
  );
};

const App = (props) => {
  
  const problemData = props?.data?.data
  // 1 year range
  let startDate = moment().add(-365, "days");
  let dateRange = [startDate, moment()];

  let data = Array.from(new Array(365)).map((_, index) => {
    return {
      date: moment(startDate).add(index, "day"),
      value: Math.floor(Math.random() * 100),
    };
  });
  const [open, setOpen] = useState(false);
  const [clickedCellIndex, setClickedCellIndex] = useState(null);

  const CellClick = (index) => {
    if (index === clickedCellIndex) {
      setOpen(!open);
    } else {
      setClickedCellIndex(index);
      setOpen(true);
    }
  };
  const router = useRouter();
  const date = new Date();
  

  const filteredData = problemData?.filter((problem) => {
    const problemStartDate = new Date(problem.contest_startDate);
    const isStartDateValid = !isNaN(problemStartDate.getTime());
    const isStartDateEqual = problemStartDate.toDateString() === date.toDateString();
    return isStartDateValid && isStartDateEqual;
});
const currentProblem=filteredData[0];
  const codePage = () => {
    const serializedProblem = JSON.stringify(currentProblem);
    const encodedProblem = encodeURIComponent(serializedProblem);
    const url = `/studio/code/Code-single/codedesign?problem=${encodedProblem}`;
    router.push(url);
  };
  return (
    <>
      {/* <Timeline
        range={dateRange}
        data={data}
        colorFunc={({ alpha }) => `rgba(23,92,145, ${alpha})`}
        onCellClick={CellClick}
      /> */}
      {clickedCellIndex !== null ? (
        <section className="pb-8 bg-white">
          <Container>
            <Row>
              <Col>
                <div className="text-center mb-8">
                  <h2 className="mb-1 display-4  text-uppercase">
                    Problem of saturday 30 Jan, 2024:
                  </h2>
                </div>
                <section className="mb-4 w-100 ">
                  <div>
                    <div className="d-md-flex">
                      <div className="ms-md-3 mt-3 mt-xl-1">
                        <div className="d-sm-block d-md-flex justify-content-between mb-2">
                          <div className="mb-2 mb-md-0">
                            <h3 className="mb-4 fs-4 text-break">
                              ` {clickedCellIndex} It looks like there might be
                              a small typo in your question, but I assume you're
                              asking for a "Warm-up Activity Question" related
                              to a coding problem. If that's the case, here's a
                              simple coding problem along with a question to
                              warm up your problem-solving skills:`
                            </h3>
                            <Badge bg="success" className="ms-0">
                              {" "}
                              Flipkart
                            </Badge>{" "}
                            <Badge bg="success" className="ms-0">
                              {" "}
                              Amazon
                            </Badge>
                            <div className="my-4 mb-md-0">
                              <span className="me-2">
                                <Badge bg="light" className="ms-1 text-success">
                                  Easy
                                </Badge>
                              </span>
                              <span className="me-2">
                                <Badge bg="light" className="ms-1 text-success">
                                  1.6k
                                </Badge>
                              </span>
                              <span className="me-2">
                                <Badge bg="light" className="ms-1 text-success">
                                  16.5%
                                </Badge>
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex justify-content-center align-items-center">
                      <div className="p-2">
                        <Button className="btn btn-info" onClick={codePage}>
                          Solve Problem
                        </Button>
                      </div>
                    </div>
                  </div>
                </section>
                <hr />
              </Col>
            </Row>
          </Container>
        </section>
      ) : (
        <section className="pb-8 bg-white">
          <Container>
            <Row>
              <Col>
                <div className="text-center mb-8">
                  <h2 className="mb-1 display-4  text-uppercase">
                    Problem of today `
                    {currentProblem && currentProblem.contest_startDate}`
                  </h2>
                </div>
                <section className="mb-4">
                  {currentProblem &&
                    currentProblem.questionsList.map((data, index) => (
                      <div div key={index}>
                        <div className="d-md-flex">
                          <div className="ms-md-3 mt-3 mt-xl-1">
                            <div className="d-sm-block d-md-flex justify-content-between mb-2">
                              <div className="mb-2 mb-md-0">
                                <h3
                                  dangerouslySetInnerHTML={{
                                    __html: data.problem_Statement,
                                  }}
                                  className="mb-4 fs-4 text-break"
                                ></h3>
                                <Badge bg="success" className="ms-0">
                                  {" "}
                                  Flipkart
                                </Badge>{" "}
                                <Badge bg="success" className="ms-0">
                                  {" "}
                                  Amazon
                                </Badge>
                                <div className="my-4 mb-md-0">
                                  <span className="me-2">
                                    <Badge
                                      bg="light"
                                      className="ms-1 text-success"
                                    >
                                      {data.problem_level}
                                    </Badge>
                                  </span>
                                  <span className="me-2">
                                    <Badge
                                      bg="light"
                                      className="ms-1 text-success"
                                    >
                                      1.6k
                                    </Badge>
                                  </span>
                                  <span className="me-2">
                                    <Badge
                                      bg="light"
                                      className="ms-1 text-success"
                                    >
                                      16.5%
                                    </Badge>
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="d-flex justify-content-center align-items-center">
                          <div className="p-2">
                            <Button className="btn btn-info" onClick={codePage}>
                              Solve Problem
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                </section>
                <hr />
              </Col>
            </Row>
          </Container>
        </section>
      )}
      {/* <Timeline range={dateRange} data={data} colorFunc={({ alpha }) => `rgba(220, 5,  3, ${alpha})`} />
            <Timeline range={dateRange} data={data} colorFunc={({ alpha }) => `rgba(5, 5,  200, ${alpha})`} /> */}
    </>
  );
};

export default App;
