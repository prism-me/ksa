import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import { connect } from "react-redux";
import { constants } from "../../utils/constants";
import ButtonTheme from "./../../components/ButtonTheme";
import EditAddress from "./EditAddress";
import './Address.scss';

function Address(props) {
  const [openEditer, setPaymentForm] = useState(false);
  const openEditForm = (val) => {
    setPaymentForm(val);
  }
  return (
    <div className="address-container">
      {!openEditer &&
        <Container>
          <Row>
            <Col sm={3}>
              <p>Name : </p>
            </Col>
            <Col sm={9}>
              <p>Lovetto Nazareth</p>
            </Col>
          </Row>
          <Row>
            <Col sm={3}>
              <p>Address : </p>
            </Col>
            <Col sm={9}>Conrad business towers, Dubai</Col>
          </Row>
          <Row>
            <Col sm={3}>
              <p>Mobile Number : </p>
            </Col>
            <Col sm={9}>+971 56 789 0233</Col>
          </Row>
          <Row>
            <Col sm={3}>
              <ButtonTheme
                className="buy-now-btn save_btn"
                outline
                onClick={() => openEditForm(true)}
              >
                {props.language == 'en' ? 'Edit' : 'Edit'}
              </ButtonTheme>
            </Col>
            <Col sm={3}>
              <ButtonTheme
                className="buy-now-btn buy_cart"
                outline
              >
                {props.language == 'en' ? 'Delete' : 'Delete'}
              </ButtonTheme>
            </Col>
          </Row>
        </Container>
      }
      {openEditer &&
        <EditAddress
          language={props.activeLanguage}
          openEditForm={openEditForm}
        />
      }
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    global: state.globalReducer,
  };
};

export default connect(mapStateToProps)(Address);

