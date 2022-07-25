import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import abdomenImage from "./../../../assets/images/post-pregnancy/post-pregnancy_01.jpeg";
import hipsImage from "./../../../assets/images/post-pregnancy/post-pregnancy_02.jpeg";
import legsImage from "./../../../assets/images/post-pregnancy/post-pregnancy_03.jpeg";

function GraphicInfo({ data }) {
  return (
    <div className="post-graphic-info">
      <Container>
        <Row>
          {data?.map((x) => (
            <Col sm={4}>
              <div className="inner-section">
                <h5>{x.title}</h5>
                <div dangerouslySetInnerHTML={{ __html: x?.description }}></div>
                <img src={x?.featured_img} alt={x.title} />
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default GraphicInfo;
