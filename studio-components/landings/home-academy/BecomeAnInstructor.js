import {Container} from 'react-bootstrap'
import Heatmap from "studio-components/calandar/Heatmap";

const Home = (props) => {
  return (
    <Container className='d-flex flex-column align-items-center justify-content-center'>
    {/* <h1 className="h2 fw-bold mt-3 text-uppercase">Contest Activity Heatmap</h1> */}
    <Heatmap data={props}/>
  </Container>
  );
};

export default Home;
