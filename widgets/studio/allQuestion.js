// import node module libraries
import PropTypes from "prop-types";
import { Card, Image } from "react-bootstrap";
import {useState} from "react"

const QuestionSubmission = () => {
    const [finddata, setDataques] = useState([{}]);
    const StudentQues = finddata;
    const [assignmentNameCode, setAssignmentsCode] = useState([{}]);
    const codeAssignment = assignmentNameCode;
  return (
    <div>
      <h1 className="">Question Submittion Result</h1>
      {codeAssignment &&
        codeAssignment.length > 0 &&
        codeAssignment.map((assignment, index) => (
          <div key={index} className="m-3">
            {assignment.questions?.map((question, questionIndex) => {
              const desiredQuestionId = StudentQues?._id;
              if (desiredQuestionId && question._id === desiredQuestionId) {
                return (
                  <div key={questionIndex}>
                    <strong>Question Name:</strong>{" "}
                    {question.questionName && question.questionName} <br />
                    {question.testCases &&
                      question.testCases.length > 0 &&
                      question?.testCases.map((testCase, testCaseIndex) => (
                        <div
                          key={testCaseIndex}
                          className="border rounded shadow p-4 mb-4"
                        >
                          <strong>Test Case {testCaseIndex + 1}:</strong>{" "}
                          {testCase.description && testCase.description} <br />
                          <div className="mb-2">
                            <strong className="text-white-500">Input:</strong>
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
                      ))}
                  </div>
                );
              }
              return null;
            })}
          </div>
        ))}

      {!StudentQues?._id && (
        <div>
          <h3>Select a problem you`d like to work on.</h3>
          <h4>Click on the corner menu.</h4>
        </div>
      )}
    </div>
  );
};


export default QuestionSubmission;
