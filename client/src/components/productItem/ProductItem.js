import React from "react";
import { Card, Col, Image,Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";



const ProductItem = ({ toy }) => {

  const navigate = useNavigate();
	const Details = () => {
		navigate(`/product-details/${toy.name}`,{state:toy.id})
	}
  return (
    // <Col
    //   md={3}
    //   className={"mt-3"}
    //   onClick={() => navigate("/")}
    //   style={{ margin: "20px", width: "300px", border: "1px solid black" }}
    // >
    //   <Card style={{ cursor: "pointer" }} border={"light"}>
    //     <Image
    //       src="https://images.pexels.com/photos/12211/pexels-photo-12211.jpeg?cs=srgb&dl=pexels-tetyana-kovyrina-12211.jpg&fm=jpg"
    //       width="100%"
    //       height="100%"
    //     />

    //     <div className=" text-black-50  d-flex justify-content-between align-items-center mt-1">
    //       <div className="toy-name-galleryItem">{toy.name}</div>
    //     </div>
    //     <div className="toy-description-galleryItem">${toy.price}</div>
    //   </Card>
    // </Col>
    <Card style={{ width: "18rem", margin: "20px" }}>
      <Card.Img
        variant="top"
        src="https://images.pexels.com/photos/12211/pexels-photo-12211.jpeg?cs=srgb&dl=pexels-tetyana-kovyrina-12211.jpg&fm=jpg"
      />
      <Card.Body>
        <Card.Title className="toy-name-galleryItem">{toy.name}</Card.Title>
        <Card.Text>${toy.price}</Card.Text>
        <Button variant="primary" onClick={() => Details()} >Детальніше</Button>
      </Card.Body>
    </Card>
  );
};

export default ProductItem;
