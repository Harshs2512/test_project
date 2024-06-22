import { useRouter } from "next/router";
import React, { useContext, useState, useEffect } from "react";
import { Button, Container, Table, Card } from "react-bootstrap";
import axios from "axios";

import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";

const CompilerApp = () => {
  const router = useRouter();
  const [setques, setQues] = useState([{}]);
  useEffect(() => {
    async function fetchCodeQuestions(req, res) {
      try {
        const response = await axios.get("/api/code/code");
        // console.log(response.data,"{")
        setQues(response.data);

        if (response) {
          // console.log("Code Questions:", response.data);
        } else {
          console.error("Error fetching code questions:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching code questions:", error);
      }
    }

    fetchCodeQuestions();
  }, []);
  // const {  CodeAssignmentFindStudent } = useContext(AdminContext);
  const codeAssignment = setques;
  const handleSolveClick = (question) => {
    // const assignmentId = question._id || null;
    // CodeAssignmentFindStudent(assignmentId);
    router.push(`/codedesign`).then((response) => {
      if (response.status === 200) {
        //  console.log("deleted")
      }
    });
  };

  const handleUnlockClick = (assignment) => {
    // Implement the logic to unlock the assignment here
  };

  // console.log(codeAssignment)

  const [isFullScreen, setIsFullScreen] = useState(false);

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

  // Rest of your code...
  useEffect(() => {
    if (isFullScreen) {
      const handleBeforeUnload = (event) => {
        event.preventDefault();
        event.returnValue = 'If you close this window, your exam will submit automatically.';
      };

      window.addEventListener('beforeunload', handleBeforeUnload);

      return () => {
        window.removeEventListener('beforeunload', handleBeforeUnload);
      };
    }
  }, [isFullScreen]);
  const handleExitFullscreen = () => {
    if (
      !document.fullscreenElement &&
      !document.mozFullScreenElement &&
      !document.webkitFullscreenElement &&
      !document.msFullscreenElement
    ) {
      removeEventListeners();
      Swal.fire({
        title: "Are you sure?",
        text: "If you close this window, your exam will submit automatically?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Submit!",
        cancelButtonText: "No, cancel",
        reverseButtons: true,
      }).then((result) => {
        if (result.isConfirmed) {
          setIsFullScreen(false);
          router.push('/codeassignment/codeshow');                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             
        } else {
          // User canceled the SweetAlert, so re-enter fullscreen
          enterFullscreen();
        }
      });
    }
  };

  const enterFullscreen = () => {
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen().then(() => {
        setIsFullScreen(true);
        addEventListeners(); // Reattach event listeners
      });
    } else if (document.documentElement.mozRequestFullScreen) {
      document.documentElement.mozRequestFullScreen().then(() => {
        setIsFullScreen(true);
        addEventListeners(); // Reattach event listeners
      });
    } else if (document.documentElement.webkitRequestFullscreen) {
      document.documentElement.webkitRequestFullscreen().then(() => {
        setIsFullScreen(true);
        addEventListeners(); // Reattach event listeners
      });
    } else if (document.documentElement.msRequestFullscreen) {
      document.documentElement.msRequestFullscreen().then(() => {
        setIsFullScreen(true);
        addEventListeners(); // Reattach event listeners
      });
    }
  };

  const addEventListeners = () => {
    document.addEventListener("fullscreenchange", handleExitFullscreen, false);
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
  };

  const removeEventListeners = () => {
    document.removeEventListener("fullscreenchange", handleExitFullscreen);
    document.removeEventListener("mozfullscreenchange", handleExitFullscreen);
    document.removeEventListener(
      "webkitfullscreenchange",
      handleExitFullscreen
    );
    document.removeEventListener("MSFullscreenChange", handleExitFullscreen);
  };
  return (
    <div className="d-flex h-100 overflow-hidden">
  <div className="position-relative d-flex flex-column flex-grow-1 overflow-auto overflow-hidden">
    <div className="card w-100 h-100 d-flex flex-column justify-content-between">
      <div className="card-body">
        <h5 className="card-title text-primary">
          Ready to Solve Problems?
        </h5>
        <p className="card-text text-muted">
          Click the button below to enter fullscreen mode and start solving
          problems.
        </p>
      </div>
      <div className="card-body">
        <button
          className="btn btn-primary"
          onClick={() => {
            Swal.fire({
              title: "Are you sure?",
              text: "You are going into fullscreen mode. Are you ready?",
              icon: "warning",
              showCancelButton: true,
              confirmButtonText: "Yes, go fullscreen!",
              cancelButtonText: "No, cancel",
              reverseButtons: true,
            }).then((result) => {
              if (result.isConfirmed) {
                toggleFullScreen();
                handleSolveClick();
              }
            });
          }}
        >
          Start Solving
        </button>
      </div>
      <div className="card-footer text-center text-muted">
        Problems are waiting for your solutions
      </div>
    </div>

    {/* <main className="">
      <div className="p-5">
        {codeAssignment &&
          codeAssignment.length > 0 &&
          codeAssignment.map((assignment, index) => (
            <div key={index} className="m-3">
              {assignment.visibility === "true" ? (
                <h2 className="text-xl font-bold">{assignment.assignmentName}</h2>
              ) : (
                <div>
                  <b className="text-xl">{assignment.assignmentName}{" "}</b>
                  Assignment is locked currently
                </div>
              )}

              {assignment.visibility === "true" ? (
                <div className="overflow-x-auto">
                  <table className="table table-striped table-bordered table-hover">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Questions
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Marks
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white">
                      {assignment.questions.map((question, qIndex) => (
                        <tr key={qIndex}>
                          <td className="px-6 py-4">
                            <div className="flex items-center">
                              <span className="mr-2">{question.questionName}</span>
                            </div>
                          </td>
                          <td>
                            {assignment.visibility === "true" ? (
                              <span className="bg-gray-300 py-1 px-2 rounded-lg mr-2">
                                Marks: {question.marks}
                              </span>
                            ) : null}
                          </td>
                          <td>
                            {assignment.visibility === "true" ? (
                              <button
                                className="btn btn-primary"
                                onClick={() => {
                                  Swal.fire({
                                    title: 'Are you sure?',
                                    text: 'You are going into fullscreen mode. Are you ready?',
                                    icon: 'warning',
                                    showCancelButton: true,
                                    confirmButtonText: 'Yes, go fullscreen!',
                                    cancelButtonText: 'No, cancel',
                                    reverseButtons: true,
                                  }).then((result) => {
                                    if (result.isConfirmed) {
                                      toggleFullScreen();
                                      handleSolveClick(question);
                                    }
                                  });
                                }}
                              >
                                Solve
                              </button>
                            ) : (
                              <div></div>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : null}
            </div>
          ))}
      </div>
    </main> */}
  </div>
</div>

   
  );
};

export default CompilerApp;
