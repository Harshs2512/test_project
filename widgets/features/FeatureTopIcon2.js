import { Fragment } from "react";
import { Card } from "react-bootstrap";
import { useState } from "react";

const FeatureTopIcon = ({ item }) => {
  const [isHovered, setIsHovered] = useState(false);

  const cardStyle = {
    textAlign: "center",
    boxShadow: "0 0.20rem 5rem rgba(0.15, .15, 0.15, 0.15)",
    height: isHovered ? "280px" : "200px",
    width: isHovered ? "auto" : "auto",
    padding: isHovered ? "20px" : "10px",
    position: "relative",
    border: "0",
    overflow: "hidden",
    transition: "height 0.3s ease, padding 0.3s ease, width 0.3s ease",
    zIndex: isHovered ? 2 : 1, 
  };

  const overlayStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    opacity: isHovered ? 1 : 0,
    padding: isHovered ? "20px" : "10px",
    boxSizing: "border-box",
  };

  const titleStyle = {
    display: isHovered ? "none" : "block",
    top: isHovered ? "auto" : 0,
    bottom: isHovered ? "10px" : "auto",
  };

  const imageStyle = {
    margin: "5%",
    width: "50%",
    height: "50%",
  };

  return (
    <Fragment>
      {/* icon */}
      <Card
        style={cardStyle}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="mt-8"
      >
        <div className="text-white rounded-3 mb-4">
          <Card.Img src={item.icon} alt="image" style={imageStyle} />
        </div>
        <h2 className="fw-bold mt-n4" style={titleStyle}>
          {item.title}
        </h2>
        <div style={overlayStyle}>
          <h2 className="fw-bold">{item.title}</h2>
          <p>{item.description}</p>
        </div>
      </Card>
    </Fragment>
  );
};

export default FeatureTopIcon;
