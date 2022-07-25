import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Table } from "react-bootstrap";
import { connect } from "react-redux";
import { constants } from "../../utils/constants";
import ButtonTheme from "./../../components/ButtonTheme";
import './Payment.scss';

function Payment(props) {
  return (
    <div className="payment-container">
      <Container>
        <Row>
          <Col sm={8}>
            <p>Card ending in <strong>7200</strong></p>
            <p><strong>Name :</strong> Lovetto Nazareth</p>
            <ButtonTheme
              className="buy-now-btn buy_cart"
              outline
            >
              {props.language == 'en' ? 'Delete' : 'Delete'}
            </ButtonTheme>
          </Col>
          <Col sm={4}>
            <p><span>Visa</span></p>
            <p><strong>Expiry :</strong> Aug, 2022</p>
          </Col>
        </Row>
        <hr></hr>
        <Row>
          <Col sm={8}>
            <p>Card ending in <strong>7200</strong></p>
            <p><strong>Name :</strong> Lovetto Nazareth</p>
            <ButtonTheme
              className="buy-now-btn buy_cart"
              outline
            >
              {props.language == 'en' ? 'Delete' : 'Delete'}
            </ButtonTheme>
          </Col>
          <Col sm={4}>
            <p><span>Visa</span></p>
            <p><strong>Expiry :</strong> Aug, 2022</p>
          </Col>
        </Row>

      </Container>
    </div >
  );
}

const mapStateToProps = (state) => {
  return {
    global: state.globalReducer,
  };
};

export default connect(mapStateToProps)(Payment);

