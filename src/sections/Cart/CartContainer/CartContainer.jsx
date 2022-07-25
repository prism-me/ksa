import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import { constants } from "../../../utils/constants";
import CartList from "../CartList/CartList";
import CartPaymentDetail from "../CartPaymentDetail/CartPaymentDetail";
import './CartContainer.scss';

function CartContainer(props) {
  return (
    <div className="cart-container">
      <Container>
        <div className="section-title-underlined">
          <h1>{constants?.site_content?.cart[props.language]}</h1>
        </div>
        <Row>
          <Col sm={7}>
            <CartList
              language={props.language} />
          </Col>
          <Col sm={5}>
            <CartPaymentDetail
              language={props.language} />
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

export default connect(mapStateToProps)(CartContainer);

