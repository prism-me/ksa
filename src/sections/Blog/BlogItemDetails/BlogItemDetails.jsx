import React from "react";
import { Badge, Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";

const BlogItemDetails = (props) => {
  // console.log("blogDetails ::", props?.activeArticle);

  return (
    <div className="milk-drinks-section">
      <Container>
        <div className="content-wrap">
          <div className="image-wrap">
            <img
              src={
                process.env.REACT_APP_IMAGE_BASE_URL +
                props?.activeArticle?.banner_img
              }
              alt="FeedingAdvisor"
              className="image"
            />
          </div>
          <div className="text-wrap">
            <Row>
              <Col sm={8}>
                <Badge variant="secondary" className="mb-2"></Badge>
                <h2>
                  {props.global.activeLanguage === "ar"
                    ? props?.activeArticle?.arabic.title
                    : props?.activeArticle?.title}
                </h2>
                <div
                  className="description"
                  dangerouslySetInnerHTML={{
                    __html:
                      props.global.activeLanguage === "ar"
                        ? props?.activeArticle?.arabic?.description
                        : props?.activeArticle?.description,
                  }}
                ></div>
              </Col>
              <Col sm={4}>
                <div className="detailed-image">
                  <img
                    src={
                      process.env.REACT_APP_IMAGE_BASE_URL +
                      props?.activeArticle?.featured_img
                    }
                    alt=""
                  />
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </Container>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    global: state.globalReducer,
  };
};

export default connect(mapStateToProps)(BlogItemDetails);
