import React from "react";
import { Card, Col, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";



const ProductItem = ({ toy }) => {
  const navigate = useNavigate();
  return (
    <Col md={3} className={"mt-3"} onClick={() => navigate("/")} style={{margin: "20px", width:"300px"}}>
      <Card style={{  cursor: "pointer" }} border={"light"}>
        <Image
          src="https://images.pexels.com/photos/12211/pexels-photo-12211.jpeg?cs=srgb&dl=pexels-tetyana-kovyrina-12211.jpg&fm=jpg"
          width="100%"
          height="100%"
        />

        <div className=" text-black-50  d-flex justify-content-between align-items-center mt-1">
          <div className="">Barbi</div>
        </div>
        <div>{toy.name}</div>
      </Card>
    </Col>
  );
};

export default ProductItem;
