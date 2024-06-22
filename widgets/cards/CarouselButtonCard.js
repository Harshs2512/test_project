// import node module libraries
import { Card, Image } from 'react-bootstrap';
import Link from 'next/link';

const CarouselButtonCard = (props) => {
    const { item, index, dataid } = props;
    return (
        <Card className="ms-1" style={{ height: "430px" }}>
            <Card.Img
                variant="top"
                src={`/api/siteSettings/landingPage/carouselButton/getCompanylogo/${dataid}?index=${index}`}
                width={200}
                height={200}
            />
            <Card.Body>
                <Card.Title className='text-primary text-center '>{item.cardtitle}</Card.Title>
                <Card.Text className=''>
                    {item.description}
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default CarouselButtonCard