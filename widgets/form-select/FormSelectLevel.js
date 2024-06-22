// import node module libraries
import { Fragment } from 'react';
import { Form } from 'react-bootstrap';
import PropTypes from 'prop-types';

export const FormSelectLevel = (props) => {
    const { placeholder, defaultselected, options, id, name, onChange, required,value } = props;

    return (
        < Fragment>
            < Form.Select
                defaultValue={defaultselected}
                id={id}
                value={value}
                name={name}
                onChange={onChange}
                required={required}
            >
                {placeholder ? (
                    < option value="" className="text-muted">
                        {placeholder}
                    </option>
                ) : (
                    ''
                )}
                {options.map((item, index) => {
                    return (
                        < option key={index} value={item.value} className="text-dark">
                            {item.label}
                        </option>
                    );
                })}
            </Form.Select>
        </Fragment>
    );
};

FormSelectLevel.propTypes = {
    placeholder: PropTypes.string.isRequired,
    defaultselected: PropTypes.string.isRequired,
    required: PropTypes.bool.isRequired,
    id: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string,
};

FormSelectLevel.defaultProps = {
    placeholder: '',
    defaultselected: '',
    required: false,
    id: '',
    value: '',
    name: ''
};

export default FormSelectLevel;