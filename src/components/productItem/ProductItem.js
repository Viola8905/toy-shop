import React from "react";
import { Card, Col, Image,Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";



const ProductItem = ({ toy }) => {

  const navigate = useNavigate();
	const Details = () => {
		navigate(`/product-details/${toy.name}`,{state:toy.id})
	}
  return (
   
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
