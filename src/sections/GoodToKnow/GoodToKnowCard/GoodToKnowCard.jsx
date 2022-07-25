import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import "./GoodToKnowCard.scss";

// import goodToKnow2 from "../../../assets/images/good-to-know/goodToKnow02.jpg";

const GoodToKnowCard = (props) => {
  return (
    <div className="goodtoknow-card">
      <Container>
        <Row className="good-to-know-row-reverse">
          <Col
            sm={{ span: 7, order: props.textOrder || 0 }}
          >
            <div className="text-wrap-good">
              <h5>{props.goodToKnowData?.title}</h5>

              <div
                dangerouslySetInnerHTML={{
                  __html: props.goodToKnowData?.content,
                }}
              ></div>
            </div>
          </Col>
          <Col sm={5}>
            <div className="image-wrap-good">
              {props.goodToKnowData?.featured_img && (
                <img
                  src={props.goodToKnowData?.featured_img}
                  alt=""
                  className="good-to-know-image"
                />
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default GoodToKnowCard;
