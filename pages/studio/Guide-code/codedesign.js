import {
  Offcanvas,
  Button,
  Row,
  Col,
  Tabs,
  Tab,
  Container,
  Badge,
} from "react-bootstrap";
import DarkLightMode from "layouts/DarkLightMode";
import { Submissions } from "widgets";
import React, { useState, useEffect } from "react";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/theme-monokai"; // Dark theme
import "ace-builds/src-noconflict/theme-chrome"; // Light theme
import BlankLayout from "layouts/marketing/BlankLayout";
import { useRouter } from "next/router";
import axios from "axios";
function CodeGuide() {
  const [show, setShow] = useState(false);
  const [shows, setShows] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [outputContent, setOutputContent] = useState("");
  const handleCloseQuestion = () => setShows(false);
  const [fontSize, setFontSize] = React.useState(18);
  const router = useRouter();
  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [languageSelected, setLanguageSelected] = useState("null");
  const [isRunning, setIsRunning] = useState(false);
  const [jdoodleLanguage, setJdoodleLanguage] = useState(null);
  const langSupport = [
    {
      level: "Python",
      value: "python",
    },
    {
      level: "C++",
      value: "c_cpp",
    },
    {
      level: "Java",
      value: "java",
    },
    {
      level: "JavaScript",
      value: "javascript",
    },
  ];
  useEffect(() => {
    if (languageSelected === "python") {
      setJdoodleLanguage("python3");
    } else if (languageSelected === "c_cpp") {
      setJdoodleLanguage("cpp");
    } else if (languageSelected === "java") {
      setJdoodleLanguage("java");
    } else {
      setJdoodleLanguage(null);
    }
  }, [languageSelected]);

  const handleLangSelect = (event) => {
    setLanguageSelected(event.target.value);
  };
  const handleFontSelect = (event) => {
    const selectedFontSize = parseInt(event.target.value, 10);
    setFontSize(selectedFontSize);
  };

  const [problem, setProblem] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState("");
  const functionData = problem?.Function_data || [];
  const [code, setCode] = useState(functionData[0]);
  const currentTestCase = currentQuestion?.testCases;
  const handleAceEditorChange = (value) => {
    setCode(value);
  };
  const EditorFullScreen = () => {
    if (!isFullScreen) {
      enterFullscreen();
    } else {
      exitFullscreen();
    }
  };

  const enterFullscreen = () => {
    const elem = document.documentElement;
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) {
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) {
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
      elem.msRequestFullscreen();
    }

    setIsFullScreen(true);
  };

  const exitFullscreen = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }

    setIsFullScreen(false);
  };
  useEffect(() => {
    if (router.query.problem) {
      try {
        const decodedProblem = decodeURIComponent(router.query.problem);
        const parsedProblem = JSON.parse(decodedProblem);
        setProblem(parsedProblem);
      } catch (error) {
        console.error("Error parsing problem data from URL", error);
      }
    }
  }, [router.query.problem]);

  const handleSolveClick = (question) => {
    setCurrentQuestion(question);
    setShow(false);
  };
  const program = {
    script: code,
    language: jdoodleLanguage,
    testCases: currentTestCase,
  };
  const HandleRun = async () => {
    setShows(true);
    try {
      const response = await axios.post("/api/code/compiler", program);
      setOutputContent(response?.data);
    } catch (error) {
      console.log(error, "error");
    }
  };
  const handleShowQuestion = async () => {
    setShows(true);
  };
  let test1 = "";

  if (currentQuestion && outputContent) {
    const testCases = currentQuestion.testCases;
    const outputParts = outputContent.output;
    if (outputParts !== null) {
      if (typeof outputParts === "string") {
        for (let i = 0; i < testCases.length; i++) {
          const testCase = testCases[i];
          const expectedOutput = testCase.output;
          if (outputParts === expectedOutput) {
            test1 = `Test Case Is pass ${i + 1}`;
            break;
          } else {
            console.log(`Test case ${testCase._id}: Output does not match`);
          }
        }
      } else {
        const roundedOutput = parseFloat(outputParts.toFixed(5));
        for (let i = 0; i < testCases.length; i++) {
          const testCase = testCases[i];
          const expectedOutput = testCase.output;
          if (roundedOutput === expectedOutput) {
            test1 = `Test Case pass ${i + 1}`;
            break;
          } else {
            console.log(`Test case ${testCase._id}: Output does not match`);
          }
        }
      }
    } else {
      console.log(
        "No valid floating-point number or string found in the output."
      );
    }
  } else {
    console.log("Either currentQuestion or outputContent is not available.");
  }
  return (
    <>
      <Offcanvas show={show} onHide={handleClose} className="bg-white">
        <Offcanvas.Header closeButton></Offcanvas.Header>
        <Offcanvas.Body>
          <div className="flex h-screen overflow-hidden">
            <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
              <main>
                <div>
                  <h2 className="text-xl font-bold">Question Topic wise</h2>
                  <div
                    className="overflow-x-auto"
                    style={{ overflowY: "scroll", maxHeight: "400px" }}
                  >
                    <ol>
                      {problem?.topic?.map((topicItem, tIndex) => (
                        <div key={tIndex}>
                          <h2>{topicItem.topic_name}</h2>
                          <ul>
                            {topicItem.questionsList.map((question, qIndex) => (
                              <li key={qIndex}>
                                <div className="d-flex justify-content-between align-items-center">
                                  <p
                                    className="cursor-pointer fs-4"
                                    onClick={() => {
                                      handleSolveClick(question);
                                    }}
                                    dangerouslySetInnerHTML={{
                                      __html: question.problem_Statement,
                                    }}
                                  ></p>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </ol>
                  </div>
                </div>
              </main>
            </div>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
      <Row className={`relative flex flex-col flex-1 mx-6 bg-white`}>
        <Col
          lg={4}
          className="mt-1 "
          style={{
            height: isFullScreen ? "850px" : "750px",
            overflow: "scroll",
          }}
        >
          <Button variant="" onClick={handleShow} className="p-4">
            <i className="fa fa-bars" aria-hidden="true"></i> Contests &
            Competitions
          </Button>
          <Tabs
            style={{
              width: "400px",
              border: "1px solid #ccc",
              borderRadius: "8px",
              overflow: "auto",
            }}
            variant="pills"
            defaultActiveKey="question"
          >
            <Tab eventKey="question" title="Statement">
              <div>
                <h4 className="">Welcome to Cybrom</h4>
                <Row className="w-100">
                  <Col>
                    <div className="d-flex gap-2 ">
                      <span>Time:- </span>
                      <h6 className="d-flex mt-1">
                        <span>H: </span>
                        <span>{currentQuestion?.problem_hour}</span>
                      </h6>
                      <h6 className="d-flex mt-1">
                        <span>M: </span>
                        <span>{currentQuestion?.problem_minute}</span>
                      </h6>
                      <h6 className="d-flex mt-1">
                        <span>S: </span>
                        <span>{currentQuestion?.problem_second}</span>
                      </h6>
                    </div>
                  </Col>
                  <Col>
                    <Badge className="bg-success">
                      {currentQuestion?.problem_level}
                    </Badge>
                  </Col>
                </Row>
                <h3>{problem?.topic?.topic_name} </h3>
                <hr />
                <h3>Statement:-</h3>
                <p
                  dangerouslySetInnerHTML={{
                    __html: currentQuestion.problem_Statement,
                  }}
                ></p>
                <div>
                  {currentQuestion?.example?.map((sample, index) => (
                    <div key={index}>
                      <h3>Example {index + 1}:-</h3>
                      <hr />
                      <h4> Input :-</h4>
                      <p>{sample.input_sample}</p>
                      <h4>Output :-</h4>
                      <p>{sample.output_sample}</p>
                      <h4>Explanation :-</h4>
                      <p
                        dangerouslySetInnerHTML={{
                          __html: sample.explanation_sample,
                        }}
                      ></p>
                    </div>
                  ))}
                </div>
                <div>
                  <h4>Constraints:-</h4>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: currentQuestion?.problem_Constraints,
                    }}
                  ></p>
                </div>
                <hr />
              </div>
            </Tab>
            <Tab eventKey="submission" title="Submissions">
              <Submissions />
            </Tab>
            <Tab eventKey="hint" title="Hints">
              Hints code 🤞
            </Tab>
          </Tabs>
        </Col>
        <Col lg={8} md={12} sm={12}>
          <div className="d-flex justify-content-between ">
            <select
              onChange={handleLangSelect}
              value={languageSelected}
              className="p-2 mb-2 rounded "
            >
              <option value="null" disabled hidden>
                Select Language
              </option>
              {langSupport.map((lang) => (
                <option key={lang.value} value={lang.value}>
                  {lang.level}
                </option>
              ))}
            </select>{" "}
            {isFullScreen ? (
              <Button variant="" onClick={handleShow}>
                <i className="fa fa-bars" aria-hidden="true"></i> Contests &
                Competitions
              </Button>
            ) : (
              <Button variant="" onClick={handleShowQuestion}>
                <u>Important Question By company</u>
              </Button>
            )}
            <span className="d-flex">
              <span>
                <select
                  onChange={handleFontSelect}
                  value={fontSize}
                  className="p-1 mt-1 rounded"
                >
                  {Array.from({ length: 20 }, (_, index) => index + 10).map(
                    (size) => (
                      <option key={size} value={size}>
                        {size}
                      </option>
                    )
                  )}
                </select>
              </span>
              <span onClick={EditorFullScreen}>
                <i className="fa fa-duotone fa-expand cursor-pointer mt-2 mx-2 fs-3 "></i>
              </span>
              <span onClick={toggleTheme}>
                <DarkLightMode />
              </span>
            </span>
          </div>
          <div
            style={{
              width: isFullScreen ? "100%" : "100%",
              height: isFullScreen ? "100%" : "650px",
              border: "1px solid #ccc",
              borderRadius: "8px",
              // overflow: "auto",
            }}
          >
            <AceEditor
              placeholder="Write your code here !!!!"
              name="Ashu"
              theme={darkMode ? "chrome" : "monokai"}
              fontSize={fontSize}
              showPrintMargin={true}
              showGutter={true}
              value={code}
              readOnly={isRunning}
              mode={languageSelected}
              highlightActiveLine={true}
              onChange={handleAceEditorChange}
              setOptions={{
                enableBasicAutocompletion: true,
                enableLiveAutocompletion: true,
                enableSnippets: true,
                showLineNumbers: true,
                tabSize: 2,
              }}
              className="w-100 h-100"
            />
            <Row className="d-flex justify-content-lg-end fixed-bottom mb-4 mx-4">
              <Col lg={4} className="d-flex justify-content-between ">
                <div>
                  <p className="cursor-pointer" onClick={handleShowQuestion}>
                    Console
                  </p>
                </div>
                <div className="position-relative d-flex">
                  <Button className="btn-success mr-2" onClick={HandleRun}>
                    Run
                  </Button>
                  <Button className="btn-success ms-2">Submit</Button>
                </div>
              </Col>
            </Row>
          </div>
          <Offcanvas
            show={shows}
            onHide={handleCloseQuestion}
            className="bg-white mb-10 h-full w-50 rounded "
            placement="end"
          >
            <Offcanvas.Header closeButton></Offcanvas.Header>
            <Offcanvas.Body>
              <div className="flex ">
                <div className=" flex flex-col flex-1 ">
                  <main>
                    <Container>
                      <Row className="d-flex justify-content-between ">
                        <Col>
                          <div>
                            <h3 className="text-xl font-bold">Output </h3>
                            <td>
                              <p className="cursor-pointer fs-5">
                                {outputContent?.output}
                              </p>
                              <p className="cursor-pointer fs-5 text-warning ">
                                Execution Time : {outputContent?.cpuTime}
                              </p>
                            </td>
                          </div>
                          <div>
                            <h4 className="text-success">{test1} </h4>
                          </div>
                        </Col>
                        <Col className="d-flex justify-content-end gap-4">
                          <div className="fixed-bottom position-relative  text-info rounded-1 ">
                            <h5 className="text-xl font-bold">Memory</h5>
                            <td>
                              <p className="cursor-pointer fs-5">
                                {outputContent?.memory} Byte
                              </p>
                            </td>
                          </div>
                          <div>
                            <p className="bg-black text-white p-1 rounded-1 ">
                              {languageSelected}
                            </p>
                          </div>
                          <div>
                            {outputContent ? (
                              <Button className="btn btn-sm bg-success">
                                Success
                              </Button>
                            ) : (
                              ""
                            )}
                          </div>
                          {/* <div>
                        <h3 className="text-xl font-bold">
                          Enter Input If Needed
                        </h3>
                        <textarea placeholder="Enter input data..." rows={5} />
                      </div> */}
                        </Col>
                        <Row>
                          <div>
                            {currentTestCase?.map((test, index) => {
                              return (
                                <div key={index}>
                                  <span className="fs-4 fw-bold">
                                    Expected Output:-
                                  </span>{" "}
                                  <p>
                                    {index + 1}) {test.output}{" "}
                                  </p>
                                </div>
                              );
                            })}
                          </div>
                        </Row>
                      </Row>

                      <Row className="d-flex justify-content-lg-end fixed-bottom mb-4 mx-4">
                        <Col lg={4} className="d-flex justify-content-end ">
                          <div className="position-relative d-flex">
                            <Button
                              className="btn-success mr-2"
                              onClick={HandleRun}
                            >
                              Run
                            </Button>
                            <Button className="btn-success ms-2">Submit</Button>
                          </div>
                        </Col>
                      </Row>
                    </Container>
                  </main>
                </div>
              </div>
            </Offcanvas.Body>
          </Offcanvas>
        </Col>
      </Row>
    </>
  );
}
CodeGuide.Layout = BlankLayout;
export default CodeGuide;
