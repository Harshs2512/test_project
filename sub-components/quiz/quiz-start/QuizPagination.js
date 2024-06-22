import React from 'react';
import { Button } from 'react-bootstrap';
import Link from 'next/link';

const Pagination = ({ nPages, currentPage, setCurrentPage, 
  onSubmitAnswers, resetExplanationData, areOptionsDisabled
}) => {
  const nextPage = () => {
    if (currentPage !== nPages) {
      setCurrentPage(currentPage + 1);
      areOptionsDisabled(true);
    }
    resetExplanationData();
  }

  const prevPage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
      areOptionsDisabled(true);
    }
  }

  const handleSubmitAnswer = async () => {
    try {
      onSubmitAnswers();
    } catch (error) {
      console.error('An error occurred', error);
    }
  };

  return (
    <>
      <div className={`d-flex justify-content-${currentPage > 1 ? 'between' : 'end'}`}>
        {currentPage > 1 && (
          <Button variant="secondary" onClick={prevPage}>
            <i className="fe fe-arrow-left"></i> Previous
          </Button>
        )}
        {currentPage === nPages ? (
          <Link className="btn btn-primary" href="#" onClick={handleSubmitAnswer}>
            Finish
          </Link>
        ) : (
          <Button variant="primary" onClick={nextPage}>
            Next <i className="fe fe-arrow-right"></i>
          </Button>
        )}
      </div>
    </>
  );
}

export default Pagination;
