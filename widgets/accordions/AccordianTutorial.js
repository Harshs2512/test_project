// import node module libraries
import React, { useContext, Fragment } from "react";
import Link from "next/link";
import {
  Accordion,
  useAccordionButton,
  AccordionContext,
  ListGroup,
  ProgressBar,
  Badge,
} from "react-bootstrap";
const GKAccordionTutorials = ({parsedItem,onItemClick }) => {
  const data = parsedItem?.questionsList;
  const ContextAwareToggle = ({ children, eventKey, callback }) => {
    const currentEventKey = useContext(AccordionContext);
    const decoratedOnClick = useAccordionButton(
      eventKey,
      () => callback && callback(eventKey)
    );
    const isCurrentEventKey = currentEventKey === eventKey;

    return (
      <Fragment>
        <Link
          href="#!"
          onClick={decoratedOnClick}
          aria-expanded={isCurrentEventKey}
          className="h4 mb-0 d-flex align-items-center text-inherit text-decoration-none py-3 px-4 collapsed "
          data-bs-toggle="collapse"
          role="button"
          aria-controls="courseTwo"
        >
          <div className={`me-auto ${isCurrentEventKey ? "text-primary" : ""}`}>
            {children.chapter}
            <p className="mb-0 text-muted fs-6 mt-1 fw-normal">
              {children?.options?.length} Lession
            </p>
          </div>
          <span className="chevron-arrow ms-4">
            <i className="fe fe-chevron-down fs-4"></i>
          </span>
        </Link>
      </Fragment>
    );
  };
  const handleItemClick = (subitem) => {
    onItemClick(subitem);
  };
  return (
    <Accordion>
      <ListGroup as="ul" variant="flush">
        {data?.map((item, index) => {
          if (item?.options?.length === 0) {
            return (
              <ListGroup.Item key={index} as="li" className="p-0">
                <ContextAwareToggle eventKey={item._id}>
                  {item}
                </ContextAwareToggle>
              </ListGroup.Item>
            );
          } else {
            return (
              <ListGroup.Item key={index} as="li" className="p-0">
                <ContextAwareToggle eventKey={item._id}>
                  {item}
                </ContextAwareToggle>
                <Accordion.Collapse eventKey={item._id}>
                  <ListGroup variant="flush">
                    <ListGroup.Item className="border-top-0">
                      <ProgressBar
                        variant="success"
                        className="mb-2 progress"
                        now={item.completed}
                        style={{ height: "6px" }}
                      />
                      <small>{item.completed}% Completed</small>
                    </ListGroup.Item>
                    {item.options.map((subitem, index) => (
                      <ListGroup.Item
                        key={index}
                      >
                        <Link
                          href="#!"
                          className={`d-flex justify-content-between align-items-center text-${
                            subitem.status === "continue" ? "white" : "inherit"
                          } text-decoration-none`}
                          onClick={() => handleItemClick(subitem)}
                        >
                          <div className="text-truncate ">
                              <i className="fe fe-Book fs-4"></i>
                            <span className="fs-5">{subitem.TopicName}</span>
                          </div>
                        </Link>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </Accordion.Collapse>
              </ListGroup.Item>
            );
          }
        })}
      </ListGroup>
    </Accordion>
  );
};

export default GKAccordionTutorials;
