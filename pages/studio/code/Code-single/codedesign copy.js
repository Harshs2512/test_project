import {
  Offcanvas,
  Button,
  Form,
  Container,
  Row,
  Col,
  Tabs,
  Tab,
} from "react-bootstrap";

import React, { useState, useContext, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/ext-language_tools";

import BlankLayout from "layouts/marketing/BlankLayout";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import { Resizable } from "react-resizable";
import "react-resizable/css/styles.css";

function Codedesign() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [setques, setQues] = useState([{}]);
  useEffect(() => {
    async function fetchCodeQuestions(req, res) {
      try {
        const response = await axios.get("/api/code/code");
        setQues(response.data);
        if (response) {
        } else {
          console.error("Error fetching code questions:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching code questions:", error);
      }
    }

    fetchCodeQuestions();
  }, []);
  const [editorWidth, setEditorWidth] = useState(500);

  const handleResize = (event, { size }) => {
    setEditorWidth(size.width);
  };
  const codeAssignment2 = setques;
  const handleSolveClick = (question) => {
    const assignmentId = question._id;

    setShow(false);
    router.push(`/codedesign?assignmentId=${assignmentId}`);
  };

  const router = useRouter();

  const { assignmentId } = router.query;

  const [isFullScreen, setIsFullScreen] = useState(false);
  const [finddata, setDataques] = useState([{}]);
  const [assignmentNameCode, setAssignmentsCode] = useState([{}]);
  useEffect(() => {
    async function fetchCodeQuestions() {
      try {
        const response = await axios.get("/api/code/code");
        setAssignmentsCode(response.data);
        if (response) {
        } else {
          console.error("Error fetching code questions:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching code questions:", error);
      }
    }

    fetchCodeQuestions();
  }, []);
  const codeAssignment = assignmentNameCode;
  useEffect(() => {
    async function fetchCodeQuestions() {
      if (assignmentId === undefined) {
        return;
      }
      try {
        const response = await axios.get(
          `/api/code/newcode?assignmentId=${assignmentId}`
        );
        setDataques(response.data);
      } catch (error) {
        console.error("Error fetching code questions:", error);
      }
    }

    fetchCodeQuestions();
  }, [assignmentId]);

  const StudentQues = finddata;
  const [languageSelected, setLanguageSelected] = useState("null");
  const [outputContent, setOutputContent] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [isCompileError, setIsCompileError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [inputData, setInputData] = useState("");
  const [results, setResults] = useState([]);
  const [marks, setMarks] = useState(null);
  const Client_Secret_Key = "1f442ee74b29e308f1f09b4417d94d9c5fe2b431";
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [submittedCode, setSubmittedCode] = useState("");

  const langSupport = [
    {
      n: "python 3",
      v: "python3",
    },
    {
      n: "C",
      v: "c",
    },
    {
      n: "C++",
      v: "cpp",
    },
    {
      n: "C++11",
      v: "CPP11",
    },
    {
      n: "C++14",
      v: "CPP14",
    },

    {
      n: "Java",
      v: "JAVA",
    },
    {
      n: "Java 8",
      v: "JAVA8",
    },
    {
      n: "JavaScript(Rhino)",
      v: "JAVASCRIPT",
    },
    {
      n: "JavaScript(Nodejs)",
      v: "JAVASCRIPT_NODE",
    },
  ];
  const textAreaRef = useRef(null);
  const intervalIdRef = useRef(null);
  const handleLangSelect = (event) => {
    setLanguageSelected(event.target.value);
  };

  const handleInputChange = (event) => {
    setInputData(event.target.value);
  };

  const handleResetClick = (event) => {
    event.preventDefault();
    setCode("");
    setInputData("");
    setOutputContent("");
    setLanguageSelected("null");
    setResults([]);
    setShowPopup(false);
    if (intervalIdRef.current) {
      clearInterval(intervalIdRef.current);
      intervalIdRef.current = null;
    }
    setIsRunning(false);
    setIsCompileError(false);
    setErrorMessage("");
  };

  const [codeRun, setCodeRun] = useState(false);
  let testCasesArray = [];

  codeAssignment &&
    codeAssignment.length > 0 &&
    codeAssignment.map((assignment, index) => {
      if (assignment.questions && assignment.questions.length > 0) {
        const desiredQuestionId = StudentQues._id;
        const desiredQuestion = assignment.questions.find(
          (question) => question._id === desiredQuestionId
        );

        if (desiredQuestion && desiredQuestion.testCases) {
          testCasesArray = testCasesArray.concat(desiredQuestion.testCases);
        }
      }
    });

  const [code, setCode] = useState();

  const [showTextarea, setShowTextarea] = useState(false);

  useEffect(() => {
    if (codeRun) {
      const allPassed = results.every((result) => result.success);
      if (allPassed) {
        setPopupMessage("Congratulations! Your answer is correct.");
      } else {
        setPopupMessage("Your answer is incorrect keep, trying!!");
      }
      setCodeRun(false);
    }
  }, [results, codeRun]);
  const handleAceEditorChange = (value) => {
    setCode(value);
  };

  const toggleFullScreen = () => {
    const elem = document.documentElement;

    if (!isFullScreen) {
      if (elem.requestFullscreen) {
        elem.requestFullscreen().then(() => setIsFullScreen(true));
        attachFullscreenListeners();
      } else if (elem.mozRequestFullScreen) {
        elem.mozRequestFullScreen().then(() => setIsFullScreen(true));
        attachFullscreenListeners();
      } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen().then(() => setIsFullScreen(true));
        attachFullscreenListeners();
      } else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen().then(() => setIsFullScreen(true));
        attachFullscreenListeners();
      }
    } else {
      exitFullscreenWithSweetAlert();
    }
  };

  const attachFullscreenListeners = () => {
    if (document.addEventListener) {
      document.addEventListener(
        "fullscreenchange",
        handleExitFullscreen,
        false
      );
      document.addEventListener(
        "mozfullscreenchange",
        handleExitFullscreen,
        false
      );
      document.addEventListener(
        "webkitfullscreenchange",
        handleExitFullscreen,
        false
      );
      document.addEventListener(
        "MSFullscreenChange",
        handleExitFullscreen,
        false
      );
    }
  };

  const exitFullscreenWithSweetAlert = () => {
    if (
      document.fullscreenElement ||
      document.mozFullScreenElement ||
      document.webkitFullscreenElement ||
      document.msFullscreenElement
    ) {
      if (document.exitFullscreen) {
        document.exitFullscreen().then(() => setIsFullScreen(false));
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen().then(() => setIsFullScreen(false));
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen().then(() => setIsFullScreen(false));
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen().then(() => setIsFullScreen(false));
      }
    }
  };

  const handleExitFullscreen = () => {
    if (
      !document.fullscreenElement &&
      !document.mozFullScreenElement &&
      !document.webkitFullscreenElement &&
      !document.msFullscreenElement
    ) {
      document.removeEventListener("fullscreenchange", handleExitFullscreen);
      document.removeEventListener("mozfullscreenchange", handleExitFullscreen);
      document.removeEventListener(
        "webkitfullscreenchange",
        handleExitFullscreen
      );
      document.removeEventListener("MSFullscreenChange", handleExitFullscreen);

      Swal.fire({
        title: "Are you sure?",
        text: "If you close this window, your exam will submit automatically?",
        icon: "warning",
        showCancelButton: true,
        allowOutsideClick: false,
        confirmButtonText: "Submit!",
        cancelButtonText: "No, cancel",
        reverseButtons: true,
      }).then((result) => {
        if (result.isConfirmed) {
          setIsFullScreen(false);
          router.push("/codeassignment/codeshow");
        } else {
          toggleFullScreen();
        }
      });
    }
  };

  const handleRunOnJdoodle = async () => {
    setResults(0);

    const program = {
      script: code,
      language: languageSelected,
      stdin: inputData,
      testCases: testCasesArray,
      // studentId: currentUser._id,
      marks: marks,
      questionId: StudentQues._id,
    };

    if (!program.script || !program.language) {
      Swal.fire({
        text: "Please fill in all required fields.?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Submit!",
        cancelButtonText: "No, cancel",
        reverseButtons: true,
      }).then((result) => {
        if (result.isConfirmed) {
        } else {
          toggleFullScreen();
        }
      });

      return;
    }

    try {
      const response = await axios.post("/api/code/compiler", program);
      setResults(response.data);
      if (response.status === 200) {
        setOutputContent(response.data[0].actual_output);
        setCodeRun(true);
      } else {
        setOutputContent(
          "Error running code on Jdoodle: " + response.data.error
        );
      }
    } catch (error) {
      setOutputContent("Error connecting to the backend: " + error.message);
    }
  };

  return (
    <>
      <div>
        {/* <Container
          className={`relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden`}
        > */}
          <Row>
            <Col lg={4} className="p-4 resizable-col">
              <Tabs
                variant="pills"
                defaultActiveKey="question"
                id="uncontrolled-tab-example"
                className="mb-3"
              >
                <Tab eventKey="question" title="Questions">
                  <div>
                    <h1 className="">Welcome to Cybrom ERP..!</h1>
                    {codeAssignment &&
                      codeAssignment.length > 0 &&
                      codeAssignment.map((assignment, index) => (
                        <div key={index} className="m-3">
                          {assignment.questions?.map(
                            (question, questionIndex) => {
                              const desiredQuestionId = StudentQues?._id;
                              if (
                                desiredQuestionId &&
                                question._id === desiredQuestionId
                              ) {
                                return (
                                  <div key={questionIndex}>
                                    <strong>Question Name:</strong>{" "}
                                    {question.questionName &&
                                      question.questionName}{" "}
                                    <br />
                                    {question.testCases &&
                                      question.testCases.length > 0 &&
                                      question?.testCases.map(
                                        (testCase, testCaseIndex) => (
                                          <div
                                            key={testCaseIndex}
                                            className="border rounded shadow p-4 mb-4"
                                          >
                                            <strong>
                                              Test Case {testCaseIndex + 1}:
                                            </strong>{" "}
                                            {testCase.description &&
                                              testCase.description}{" "}
                                            <br />
                                            <div className="mb-2">
                                              <strong className="text-white-500">
                                                Input:
                                              </strong>
                                              {testCase.input && (
                                                <code className="bg-white p-2 rounded border border-gray-300 d-block">
                                                  {testCase.input}
                                                </code>
                                              )}
                                            </div>
                                            <div>
                                              <strong className="text-green-500">
                                                Expected Output:
                                              </strong>
                                              {testCase.output && (
                                                <code className="bg-gray-200 p-2 rounded border border-gray-300 d-block">
                                                  {testCase.output.trim()}
                                                </code>
                                              )}
                                            </div>
                                          </div>
                                        )
                                      )}
                                  </div>
                                );
                              }
                              return null;
                            }
                          )}
                        </div>
                      ))}

                    {!StudentQues?._id && (
                      <div>
                        <h3>Select a problem you`d like to work on.</h3>
                        <h4>Click on the corner menu.</h4>
                      </div>
                    )}
                  </div>
                </Tab>
                <Tab eventKey="description" title="Descriptions">
                  <div>
                    <h1 className="">Welcome to Cybrom ERP..!</h1>
                    {codeAssignment &&
                      codeAssignment.length > 0 &&
                      codeAssignment.map((assignment, index) => (
                        <div key={index} className="m-3">
                          {assignment.questions?.map(
                            (question, questionIndex) => {
                              const desiredQuestionId = StudentQues?._id;
                              if (
                                desiredQuestionId &&
                                question._id === desiredQuestionId
                              ) {
                                return (
                                  <div key={questionIndex}>
                                    <strong>Name:</strong>{" "}
                                    {assignment.assignmentName &&
                                      assignment.assignmentName}{" "}
                                    <br />
                                    <strong>Question Name:</strong>{" "}
                                    {question.questionName &&
                                      question.questionName}{" "}
                                    <br />
                                    <strong>Description:</strong>{" "}
                                    {question.description &&
                                      question.description}{" "}
                                    <br />
                                    {question.testCases &&
                                      question.testCases.length > 0 &&
                                      question?.testCases.map(
                                        (testCase, testCaseIndex) => (
                                          <div
                                            key={testCaseIndex}
                                            className="border rounded shadow p-4 mb-4"
                                          >
                                            <strong>
                                              Test Case {testCaseIndex + 1}:
                                            </strong>{" "}
                                            {testCase.description &&
                                              testCase.description}{" "}
                                            <br />
                                            <div className="mb-2">
                                              <strong className="text-white-500">
                                                Input:
                                              </strong>
                                              {testCase.input && (
                                                <code className="bg-white p-2 rounded border border-gray-300 d-block">
                                                  {testCase.input}
                                                </code>
                                              )}
                                            </div>
                                            <div>
                                              <strong className="text-green-500">
                                                Expected Output:
                                              </strong>
                                              {testCase.output && (
                                                <code className="bg-gray-200 p-2 rounded border border-gray-300 d-block">
                                                  {testCase.output.trim()}
                                                </code>
                                              )}
                                            </div>
                                          </div>
                                        )
                                      )}
                                  </div>
                                );
                              }
                              return null;
                            }
                          )}
                        </div>
                      ))}

                    {!StudentQues?._id && (
                      <div>
                        <h3>Select a problem you`d like to work on.</h3>
                        <h4>Click on the corner menu.</h4>
                      </div>
                    )}
                  </div>
                </Tab>
                <Tab eventKey="submission" title="Submissions">
                  Submissions code
                </Tab>
                <Tab eventKey="hint" title="Hints">
                  Hints code 🤞
                </Tab>
              </Tabs>
            </Col>
            <Resizable
              className="p-4"
              width={500}
              height={Infinity}
              handle={<span className="custom-handle" />}
              onResize={handleResize}
            >
              <Col lg={8} className="p-4 resizable-col">
                <select
                  onChange={handleLangSelect}
                  value={languageSelected}
                  className="p-2 mb-2 rounded "
                >
                  <option value="null" disabled hidden>
                    Select Language
                  </option>
                  {langSupport.map((lang) => (
                    <option key={lang.v} value={lang.v}>
                      {lang.n}
                    </option>
                  ))}
                </select>
                <AceEditor
                  className="w-100"
                  placeholder="Write your code here !!!!"
                  theme="white"
                  name="Ashu"
                  fontSize={18}
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
                />
              </Col>
            </Resizable>
          </Row>

          <div className="p-2 rounded-b ml-4 flex items-center justify-center">
            <>
              <Button
                className={`reset px-2 py-1 m-2 rounded ${
                  isRunning ? "disabled" : "bg-danger text-white"
                }`}
                onClick={handleResetClick}
                disabled={isRunning}
              >
                Reset
              </Button>
              <Button
                onClick={() => setShowTextarea(!showTextarea)}
                className="px-4 py-2 m-2 bg-indigo-500 text-white rounded hover-bg-indigo-600 focus-outline-none"
              >
                Take User Input
              </Button>
              {showTextarea && (
                <textarea
                  placeholder="Enter input data..."
                  value={inputData}
                  onChange={handleInputChange}
                  rows={5}
                />
              )}
              <Button
                className={`run-jdoodle px-4 py-2 float-right rounded ${
                  isRunning ? "disabled" : "bg-indigo-500 text-white"
                }`}
                onClick={handleRunOnJdoodle}
                disabled={isRunning}
              >
                Compile & Submit
              </Button>
            </>
          </div>

          <div className="p-4 flex flex-col">
            <h1 className="font-weight-bold text-xl mt-4 text-center"></h1>
            <div />
            <div>
              <h2 className="text-xl font-weight-bold mb-4">Results:</h2>
              <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 gap-4">
                {Array.isArray(results) && results.length > 0
                  ? results.map((result, index) => (
                      <div key={index} className="card">
                        <div
                          className={`card-body ${
                            result.success
                              ? "bg-success text-white"
                              : "bg-danger text-white"
                          }`}
                        >
                          <h5 className="card-title">Test Case {index + 1}</h5>
                          <p className="card-text font-weight-bold">
                            {result.success ? "Pass" : "Failed"}
                          </p>
                          <p className="card-text">
                            <span className="font-weight-bold">Expected:</span>{" "}
                            {result.expected_output}
                          </p>
                          <p className="card-text">
                            <span className="font-weight-bold">
                              Your Output:
                            </span>{" "}
                            {result.actual_output}
                          </p>
                        </div>
                      </div>
                    ))
                  : null}
              </div>
              {popupMessage && (
                <>
                  {/* Backdrop to blur other content */}
                  <div
                    className="fixed-top fixed-left w-100 h-100 bg-dark opacity-80"
                    style={{ zIndex: "100" }}
                  ></div>

                  {/* Modal */}
                  <div
                    className="fixed-top fixed-left w-100 h-100 d-flex align-items-center justify-content-center"
                    style={{ zIndex: "101" }}
                  >
                    <div className="card">
                      <div
                        className={`card-body ${
                          popupMessage ===
                          "Congratulations! Your answer is correct."
                            ? "bg-success"
                            : "bg-danger"
                        }`}
                      >
                        <h5 className="card-title text-white">
                          {popupMessage}
                        </h5>
                        <button
                          className="btn btn-light mt-3"
                          onClick={() => setPopupMessage("")}
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        {/* </Container> */}
      </div>
    </>
  );
}
Codedesign.Layout = BlankLayout;
export default Codedesign;
