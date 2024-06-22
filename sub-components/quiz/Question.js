import { useRouter } from 'next/router';
import { Fragment, useState, useEffect } from 'react';
import { ListGroup, Form, Alert } from 'react-bootstrap';
import axios from 'axios';

const Question = (props) => {
    const {
        item,
        onAnswerChange,
        error,
    } = props;
    const [isLoadingExplanation, setIsLoadingExplanation] = useState(false);
    const [selectedValue, setSelectedValue] = useState(0);
    const [selectedValues, setSelectedValues] = useState({});
    const [fillInBlankValues, setFillInBlankValues] = useState({});
    const [explanationData, setExplanationData] = useState('');
    const question = explanationData && explanationData.question;
    const [isButtonEnabled, setIsButtonEnabled] = useState(false);
    const [isQuestionDisabled, setIsQuestionDisabled] = useState(false);
    const [questionAnsweredState, setQuestionAnsweredState] = useState({});
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [explanationShown, setExplanationShown] = useState({});

    const handleAnswerChange = (value) => {
        if (!isQuestionDisabled) {
            setSelectedValue(value);
            setSelectedValues((prevSelectedValues) => ({
                ...prevSelectedValues,
                [item._id]: value,
            }));
            const hasSelectedOptions = Object.keys(selectedValues).some(
                (key) => selectedValues[key] !== undefined
            );
            onAnswerChange(item._id, value);
            setIsButtonEnabled(hasSelectedOptions);
            setIsQuestionDisabled(false);
        }
    };

    const router = useRouter();
    const { quizId } = router.query;
    const handleCheckboxChange = (optionText) => {
        if (!isQuestionDisabled) {
            const updatedSelectedValues = { ...selectedValues };
            if (!updatedSelectedValues[item._id]) {
                updatedSelectedValues[item._id] = [];
            }
            if (updatedSelectedValues[item._id].includes(optionText)) {
                updatedSelectedValues[item._id] = updatedSelectedValues[item._id].filter(
                    (value) => value !== optionText
                );
            } else {
                updatedSelectedValues[item._id].push(optionText);
            }
            const hasSelectedOptions = Object.keys(updatedSelectedValues).some(
                (key) => updatedSelectedValues[key] && updatedSelectedValues[key].length > 0
            );
            setSelectedValues(updatedSelectedValues);
            onAnswerChange(item._id, updatedSelectedValues[item._id]);
            setIsButtonEnabled(hasSelectedOptions);
        }
    };

    const handleFillInBlankChange = (value) => {
        setFillInBlankValues((prevAnswers) => ({
            ...prevAnswers,
            [item._id]: value,
        }));
        const allQuestionsAnswered = Object.keys(fillInBlankValues).every(
            (key) => fillInBlankValues[key].trim() !== ''
        );
        setIsButtonEnabled(allQuestionsAnswered);
        onAnswerChange(item._id, value);
    };
    const isCurrentQuestionAnswered = fillInBlankValues[item._id] && fillInBlankValues[item._id].trim() !== '';
    const showExplanation = async (quizId, questionId) => {
        try {
            const response = await axios.get(
                `/api/quiz/quizQu/getSingleQ?quizId=${quizId}&questionId=${questionId}`
            );
            setExplanationData(response.data);
            setExplanationShown((prevExplanationShown) => ({
                ...prevExplanationShown,
                [questionId]: true,
            }));
            setIsQuestionDisabled(true);
            setCurrentQuestionIndex(currentQuestionIndex + 1);

        } catch (error) {
            console.error('Error updating question:', error);
        } finally {
            setIsLoadingExplanation(false);
        }
        setIsQuestionDisabled(true);
    };
    const [selectedQuestion, setSelectedQuestion] = useState(null);
    useEffect(() => {
        if (item._id in selectedValues) {
            const prevSelectedValue = selectedValues[item._id] || (item.question_type === 'true_false' ? '' : 0);
            setSelectedValue(prevSelectedValue);
            setIsButtonEnabled(true);
            if (explanationShown[item._id]) {
                setIsQuestionDisabled(true);
            } else {
                setIsQuestionDisabled(false);
            }
        } else {
            setSelectedValue(item.question_type === 'true_false' ? '' : 0);
            setIsButtonEnabled(false);
            if (explanationShown[item._id]) {
                setIsQuestionDisabled(true);
            } else {
                setIsQuestionDisabled(false);
            }
        }

        if (!explanationShown[item._id]) {
            setExplanationData('');
        }
        if (item._id !== selectedQuestion) {
            setExplanationData('');
          }
          setSelectedQuestion(item._id);
    }, [item, selectedValues, explanationShown,selectedQuestion]);

    return (
        <Fragment>
            <h3 className="mb-3">{item.question}</h3>
            {error && <p className="text-danger">{error}</p>}
            {item.question_type === 'true_false' ? (
                <ListGroup>
                    <ListGroup.Item>
                        <Form.Check
                            type="radio"
                            id={`radio-true`}
                            name={`answer-${item.id}`}
                            label="True"
                            value="true"
                            checked={selectedValue === 'true'}
                            onChange={(e) => handleAnswerChange(e.target.value)}
                            disabled={
                                isQuestionDisabled ||
                                questionAnsweredState[item._id]
                            }
                        />
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Form.Check
                            type="radio"
                            id={`radio-false`}
                            name={`answer-${item.id}`}
                            label="False"
                            value="false"
                            checked={selectedValue === 'false'}
                            onChange={(e) => handleAnswerChange(e.target.value)}
                            disabled={
                                isQuestionDisabled ||
                                questionAnsweredState[item._id]
                            }
                        />
                    </ListGroup.Item>
                </ListGroup>
            ) : item.question_type === 'fill_in_blank' ? (
                <ListGroup className="mb-3">
                    <ListGroup.Item>
                        <Form.Control
                            type="text"
                            placeholder="Write Answer Here."
                            value={fillInBlankValues[item._id] || ''}
                            onChange={(e) => handleFillInBlankChange(e.target.value)}
                            onBlur={() =>
                                onAnswerChange(item._id, fillInBlankValues[item._id] || '')
                            }
                            disabled={
                                isQuestionDisabled ||
                                questionAnsweredState[item._id]
                            }
                        />
                    </ListGroup.Item>
                </ListGroup>
            ) : item.question_type === 'single_choice' ? (
                <ListGroup className="mb-3">
                    {item.options.map((answer, index) => (
                        <ListGroup.Item
                            key={index}
                            className={`list-group-item-action ${selectedValue === answer.text ? 'bg-light' : ''
                                }`}
                            aria-current="true"
                        >
                            <Form.Check
                                type="radio"
                                id={answer.id}
                                name={`answer-${item._id}`}
                                label={answer.text}
                                value={answer.text}
                                checked={selectedValue === answer.text}
                                onChange={(e) => handleAnswerChange(e.target.value)}
                                disabled={
                                    isQuestionDisabled ||
                                    questionAnsweredState[item._id]
                                }
                            />
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            ) : item.question_type === 'multiple_choice' ? (
                <ListGroup>
                    {item.options.map((answer, index) => (
                        <ListGroup.Item
                            key={index}
                            className={`list-group-item-action ${selectedValues[item._id]?.includes(answer.text) ? 'bg-light' : ''
                                }`}
                            aria-current="true"
                        >
                            <Form.Check
                                type="checkbox"
                                id={answer.id}
                                name={`answer-${item.id}`}
                                label={answer.text}
                                value={answer.text}
                                checked={selectedValues[item._id]?.includes(answer.text)}
                                onChange={() => handleCheckboxChange(answer.text)}
                                disabled={
                                    isQuestionDisabled ||
                                    questionAnsweredState[item._id]
                                }
                            />
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            ) : null}

            <div className="p-6">
                <div>
                        {question && (
                            <>
                                {question.question_type === 'true_false' ? (
                                        <h4>Correct Answer : {question.answer ? 'True' : 'False'}</h4>
                                ) : (
                                    question.question_type === 'fill_in_blank' && (
                                            <h4>Correct Answer : {question.answer}</h4>
                                    )
                                )}
                                {question.options && (
                                    <div>
                                        {question.options.map(option => (
                                            option.correctAnswer === true ? (

                                                <h4 key={option.id}>Correct Answer : {option.text}</h4>
                                            ) : null
                                        ))}
                                    </div>
                                )}
                            </>
                        )}
                </div>
                {explanationData &&
                    explanationData.question &&
                    explanationData.question.explanation && 
                    (
                        <div
                            dangerouslySetInnerHTML={{
                                __html: explanationData.question.explanation,
                            }}
                        />
                    )}


            </div>

            <div className="mt-2 ">
                <button
                    className="btn btn-outline-success btn-sm"
                    onClick={() => showExplanation(quizId, item._id)}
                    disabled={
                        !isButtonEnabled && !isCurrentQuestionAnswered ||
                        isLoadingExplanation ||
                        questionAnsweredState[item._id]
                    }
                >
                    {isLoadingExplanation ? 'loading...' : 'Show Explanation'}
                </button>
            </div>
        </Fragment>
    );
};

export default Question;
