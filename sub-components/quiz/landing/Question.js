import React, { Fragment, useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';

const Question = (props) => {
    const { item, handleAnswer } = props;
    const data = item.questionData;
    const [selectedValue, setSelectedValue] = useState();

    useEffect(() => {
        setSelectedValue(null);
    }, [item]);

    const handleOptionChange = (optionText) => {
        setSelectedValue(optionText);
        handleAnswer(item._id, optionText); 
    };

    return (
        <Fragment>
            <div className="d-flex justify-content-center"> 
    <div className=" w-50">
    <h3 className="text-center text-white  mb-4 ">Question {item.questionNumber} : {data.question} </h3>
        {data.options.map((option, index) => (
            <Form.Check key={index} type="radio" id={`radio-${data._id}-${index}`} bsPrefix="d-grid" className="mb-2">
                <Form.Check.Input
                    type="radio"
                    className="btn-check"
                    name={`answer-${data._id}`}
                    checked={selectedValue === option.text}
                    onChange={() => handleOptionChange(option.text)} 
                />
                <Form.Check.Label className={`btn btn-outline-light-primary text-start ${selectedValue === option.text ? 'text-black' : ''}`}>
                    {option.text}
                </Form.Check.Label>
            </Form.Check>
        ))}
    </div>
</div>

            
        </Fragment>
    );
};

export default Question;
