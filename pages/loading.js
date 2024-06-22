import { Fragment } from 'react';
import {Spinner} from 'react-bootstrap';
const Spinners = () => {
    return (
        <Fragment>
            <div className="d-flex justify-content-center align-items-center my-12">
                <Spinner
                    animation="grow"
                    variant="primary"
                    className="me-2"
                />
                <Spinner
                    animation="grow"
                    variant="secondary"
                    className="me-2"
                />
                <Spinner
                    animation="grow"
                    variant="success"
                    className="me-2"
                />
                <Spinner
                    animation="grow"
                    variant="danger"
                    className="me-2"
                />
                <Spinner
                    animation="grow"
                    variant="warning"
                    className="me-2"
                />
            </div>
        </Fragment>
    );
};

export default Spinners;