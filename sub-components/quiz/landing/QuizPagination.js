// import node module libraries
import { Button } from 'react-bootstrap'
import Link from 'next/link';

const Pagination = ({ nPages, currentPage, setCurrentPage, onSubmitAnswers }) => {
  const nextPage = () => {
    if (currentPage !== nPages) setCurrentPage(currentPage + 1)
  }
  const prevPage = () => {
    if (currentPage !== 1) setCurrentPage(currentPage - 1)
  }
  const handleSubmitAnswer = async () => {
    try {
      onSubmitAnswers();
    } catch (error) {
      console.error('An error occurred', error);
    }
  };
  return (
    <div className='d-flex justify-content-center'>
      <div className={`d-flex w-50 justify-content-${currentPage > 1 ? 'between' : 'end'}`}>
        {currentPage > 1 && <Button variant="info" onClick={prevPage}>
          <i className="fe fe-arrow-left"></i> Previous
        </Button>}
        {
          currentPage == nPages ?
            <Link className="btn btn-info" href="!#" onClick={handleSubmitAnswer}>Submit</Link>
            :
            <Button variant="info" onClick={nextPage}> Next <i className="fe fe-arrow-right"></i></Button>
        }

      </div>
    </div>

  )
}

export default Pagination