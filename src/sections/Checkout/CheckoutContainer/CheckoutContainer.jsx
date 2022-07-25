import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import { connect } from "react-redux";
import { constants } from "../../../utils/constants";
import './CheckoutContainer.scss';
import CheckoutPaymentDetail from "../CheckoutPaymentDetail/CheckoutPaymentDetail";
import CheckoutForm from "../CheckoutForm/CheckoutForm";
function CheckoutContainer(props) {

  return (
    <div className="checkout-container">
      <Container>
        <div className="section-title-underlined">
          <h1>{constants?.site_content?.checkout[props.language]}</h1>
        </div>
        <Row>
          <Col sm={7}>
            <CheckoutForm
              language={props.language}
            />
          </Col>
          <Col sm={5}>
            <CheckoutPaymentDetail
              language={props.language}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    global: state.globalReducer,
  };
};

export default connect(mapStateToProps)(CheckoutContainer);

