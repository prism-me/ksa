import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { HiOutlineArrowCircleRight } from "react-icons/hi";
import { useHistory } from "react-router-dom";
import { constants } from "../../../utils/constants";
import Title from "./Title";
import Slider from "../Slider";
import { connect } from "react-redux";
import {
  getCategories,
  getCategoryProducts,
  getProducts,
} from "../../../redux/products";
import Help from "../../Products/Help/Help";

function Welcome(props) {
  const history = useHistory();
  const { global } = props;
  return (
    <div className="welcome">
      <Title
        language={global?.activeLanguage}
        //   title={props.tagSection?.title}
        // description={props.tagSection?.description}
      />
      <div className="content-wrapper">
        <Container>
          <Row>
            <Col sm={4}>
              <div className="title-wrapper">
                <p>
                  {constants.site_content.history_since[props.language]}
                  {/*HISTORY SINCE 1957*/}
                </p>
                <h2>
                  {/*WELCOME TO{" "}*/}
                  {/*<br className="d-none d-sm-block" />{" "}*/}
                  {/*PIGEON MOTHER <br /> AND BABY CARE*/}
                  {/* {props.welcomeSection?.title} */}
                  {constants.site_content.Well_Come[props.language]}
                </h2>
                <div
                  className="d-flex align-items-center py-3 about-us-link"
                  onClick={() => history.push(`/${props.language}/about`)}
                >
                  <span
                    className="pr-sm-4"
                    style={{
                      fontWeight: 500,
                      color: "#666",
                      cursor: "pointer",
                    }}
                  >
                    {constants?.site_content?.about_us?.[props.language]}
                  </span>
                  <HiOutlineArrowCircleRight
                    fontSize="24px"
                    color="#ff0000"
                    style={{ cursor: "pointer" }}
                  />
                </div>
                <span
                  className="d-flex align-items-center read-message"
                  style={{
                    color: "#ff0000",
                    fontSize: "14px",
                    cursor: "pointer",
                    fontWeight: 500,
                  }}
                  onClick={() =>
                    history.push(`/${props.language}/about`)
                  }
                >
                  <span className="pr-sm-4">
                    {constants?.site_content?.ceo_message[props.language]}
                  </span>
                </span>
              </div>
            </Col>
            <Col sm={{ span: 6, offset: 2 }}>
              <div
                className="text-wrapper"
                // dangerouslySetInnerHTML={{
                //   __html: props.welcomeSection?.description,
                // }}
              >
                <p>
                  {
                    constants?.site_content?.welcomeSectionDescription[
                      props.language
                    ]
                  }
                  {/*The name that spells comfort and*/}
                  {/*convenience, PIGEON is today the market*/}
                  {/*leader in mother and baby care products.*/}
                  {/*Our extensive research to offer the*/}
                  {/*highest levels of comfort, safety and*/}
                  {/*quality make us the preferred brand in the*/}
                  {/*segment.*/}
                </p>
                <p>
                  {
                    constants?.site_content?.welcomeSectionDescription2[
                      props.language
                    ]
                  }
                  {/*With a wide range of products under the*/}
                  {/*PIGEON wing, we are your one-stop solution*/}
                  {/*to meet all your needs from maternity to*/}
                  {/*childcare. For over half a century, we at*/}
                  {/*PIGEON have worked tirelessly to develop*/}
                  {/*easy-to-use and affordable products for*/}
                  {/*each step of motherhood.*/}
                </p>
                <p>
                  <strong>
                    {constants?.site_content?.about_ceo[props.language]}
                  </strong>
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    global: state.globalReducer,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getProducts: (page) => dispatch(getProducts(page)),
    getCategories: () => dispatch(getCategories()),
    getCategoryProducts: (category) => dispatch(getCategoryProducts(category)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Welcome);
