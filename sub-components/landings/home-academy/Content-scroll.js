// import { Col, Row, Container, Image, Card } from "react-bootstrap";
// import { useState, useEffect, useRef } from "react";
// import axios from "axios";

// const ContentScroll = (data) => {
//   // const [items, setItems] = useState([]);
//   const items = data.data;
//   const [currentItemIndex, setCurrentItemIndex] = useState(0);
//   const scrollableColumnRef = useRef(null);

//   const handleScroll = () => {
//     const scrollableColumn = scrollableColumnRef.current;
//     if (scrollableColumn) {
//       const card = scrollableColumn.querySelector(".card");
//       if (card) {
//         const scrollTop = scrollableColumn.scrollTop;
//         const cardHeight = card.clientHeight;
//         const newIndex = Math.floor(scrollTop / cardHeight);
//         setCurrentItemIndex(newIndex);
//       }
//     }
//   };

//   const handleWheel = (event) => {
//     const scrollableColumn = scrollableColumnRef.current;
//     if (scrollableColumn) {
//       scrollableColumn.scrollTop += event.deltaY;
//       event.preventDefault();
//     }
//   };
//   useEffect(() => {
//     const rowElement = document.querySelector('.scroll-row');
//     if (rowElement) {
//       rowElement.addEventListener('wheel', handleWheel);
//     }

//     return () => {
//       if (rowElement) {
//         rowElement.removeEventListener('wheel', handleWheel);
//       }
//     };
//   }, []);

//   return (
//     <section className="pb-lg-14 pb-6 bg-white">
//       <Container className="mx-auto">
//         <Row>
//           <Col>
//             <div className="text-start my-4 text-white text-center p-2">
//               <h1 className="h1 fw-bold">
//                 Best-in-class <span className="text-danger">Curriculum</span> &{" "}
//                 <span className="text-danger">pedagogy</span>
//               </h1>
//             </div>
//           </Col>
//         </Row>
//         <Row className="scroll-row align-items-center justify-content-center py-2">
//           <Col xl={6} lg={6} md={6} xs={12}>
//             <div
//               ref={scrollableColumnRef}
//               className="scrollable-column p-2 bg-light"
//               style={{
//                 maxHeight: "450px",
//                 overflowY: "auto",
//                 scrollbarWidth: "none",
//                 msOverflowStyle: "none",
//               }}
//               onScroll={handleScroll}
//             >
//               {items?.map((item, index) => (
//                 <div className="mt-3 pb-22 card" key={index}>
//                   <div className="mb-xl-2 p-2">
//                     <div className="text-primary d-flex">
//                       <div>
//                         <h2 className="px-1 text-uppercase">{item.title}</h2>
//                       </div>
//                     </div>
//                     <div className="m2-4">
//                       <p className="fs-4">{item.description}</p>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </Col>
//           <Col xl={6} lg={6} md={6} xs={12} style={{ maxHeight: "450px", overflowY: "hidden" }}>
//             <div className="mb-2 border border-warning rounded-3 d-inline-block text-center py-4">
//               {items?.length > 0 && currentItemIndex < items.length && (
//                 <>
//                   <Image
//                     src={`/api/siteSettings/secondPage/BestInClass/getlogo/${items[currentItemIndex]._id}`}
//                     alt="certificate"
//                     className="w-75 h-100 card-img"
//                     loading="lazy"
//                     placeholderSrc="/path/to/placeholder/image.jpg"
//                   />
//                 </>
//               )}
//             </div>
//           </Col>
//         </Row>

//       </Container>
//     </section>
//   );
// };

// export default ContentScroll;

import { Col, Row, Container, Image, Card } from "react-bootstrap";
import { useState, useEffect, useRef } from "react";
import axios from "axios";

const ContentScroll = () => {
  const [items, setItems] = useState([]);
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const scrollableColumnRef = useRef(null);

  const handleScroll = () => {
    const scrollableColumn = scrollableColumnRef.current;
    if (scrollableColumn) {
      const card = scrollableColumn.querySelector(".card");
      if (card) {
        const scrollTop = scrollableColumn.scrollTop;
        const cardHeight = card.clientHeight;
        const newIndex = Math.floor(scrollTop / cardHeight);
        setCurrentItemIndex(newIndex);
      }
    }
  };

  const handleWheel = (event) => {
    const scrollableColumn = scrollableColumnRef.current;
    if (scrollableColumn) {
      scrollableColumn.scrollTop += event.deltaY;
      event.preventDefault();
    }
  };

  const handleMouseMove = (event) => {
    const scrollableColumn = scrollableColumnRef.current;
    if (scrollableColumn) {
      const { clientY } = event;
      const { top, height } = scrollableColumn.getBoundingClientRect();
      const scrollHeight = scrollableColumn.scrollHeight - scrollableColumn.clientHeight;
      const scrollPercentage = (clientY - top) / height;
      scrollableColumn.scrollTop = scrollHeight * scrollPercentage;
    }
  };

  const getAllData = async () => {
    try {
      const res = await axios.get("/api/siteSettings/secondPage/BestInClass/addRecord");
      const dataAll = res?.data?.Data;
      if (res.status === 200) {
        setItems(dataAll);
      }
    } catch (error) {
      console.log("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    getAllData();
  }, []);

  useEffect(() => {
    const rowElement = document.querySelector('.scroll-row');
    if (rowElement) {
      rowElement.addEventListener('wheel', handleWheel);
      rowElement.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      if (rowElement) {
        rowElement.removeEventListener('wheel', handleWheel);
        rowElement.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, []);

  return (
    <section className="pb-lg-14 pb-6 bg-white">
      <Container className="mx-auto">
        <Row>
          <Col>
            <div className="text-start my-4 text-white text-center p-2">
              <h1 className="h1 fw-bold">
                Best-in-class <span className="text-danger">Curriculum</span> &{" "}
                <span className="text-danger">pedagogy</span>
              </h1>
            </div>
          </Col>
        </Row>
        <Row className="scroll-row align-items-center justify-content-center py-2">
          <Col xl={6} lg={6} md={6} xs={12}>
            <div
              ref={scrollableColumnRef}
              className="scrollable-column p-2 bg-light"
              style={{
                maxHeight: "400px",
                overflowY: "auto",
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
              onScroll={handleScroll}
            >
              {items.map((item, index) => (
                <div className="mt-3 pb-16 card" key={index} style={{height:"350px"}}>
                  <div className="mb-xl-2 p-6">
                    <div className="text-primary d-flex">
                      <div>
                        <h2 className="px-1 text-uppercase">{item.title}</h2>
                      </div>
                    </div>
                    <div className="m2-4">
                      <p className="fs-4">{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Col>
          <Col xl={6} lg={6} md={6} xs={12} style={{ maxHeight: "450px", overflowY: "hidden" }}>
            <div className="mb-2 border border-warning rounded-3 d-inline-block text-center py-4">
              {items?.length > 0 && currentItemIndex < items.length && (
                <>
                  <Image
                    src={`/api/siteSettings/secondPage/BestInClass/getlogo/${items[currentItemIndex]._id}`}
                    alt="certificate"
                    className="w-50 h-50 img-fluid "
                  />
                </>
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default ContentScroll;
