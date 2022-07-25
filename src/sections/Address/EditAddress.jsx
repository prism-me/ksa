import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import { connect } from "react-redux";
import { IoIosHeartEmpty, IoIosTrash } from "react-icons/io";
import { constants } from "../../utils/constants";
import ButtonTheme from "./../../components/ButtonTheme";
import './Address.scss';

const initialObject = {
    first_name: "",
    last_name: "",
    phone: "",
    address: "",
};

function EditAddress(props) {
    const [contactForm, setContactForm] =
        useState(initialObject);

    const handleInputFields = (e) => {
        let updateValue = { ...contactForm };
        updateValue[e.target.name] = e.target.value;
        setContactForm(updateValue);
        // console.log("Update values", updateValue);
    };

    const handleSubmit = () => {
        let name =
            contactForm.first_name + " " + contactForm.last_name;
        let phone = contactForm.phone;
        let address = contactForm.address;

        let updateValue = { name, phone, address };
    };

    return (
        <div className="edit-address-container">
            <h2>Edit Address</h2>
            <Row>
                <Form>
                    <Row>
                        <Col sm={6}>
                            <Form.Group controlId="firstName">
                                <Form.Control
                                    type="text"
                                    name="first_name"
                                    placeholder={props.language === "en" ? "Firstname" : "الإسم الأول"}
                                    required
                                    value={contactForm.first_name}
                                    onChange={handleInputFields}
                                />
                            </Form.Group>
                        </Col>
                        <Col sm={6}>
                            <Form.Group controlId="lastName">
                                <Form.Control
                                    type="text"
                                    name="last_name"
                                    placeholder={props.language === "en" ? "Lastname" : "اسم العائلة"}
                                    value={contactForm.last_name}
                                    onChange={handleInputFields}
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col sm={12}>
                            <Form.Group controlId="mobileNumber">
                                <Form.Control
                                    type="text"
                                    name="phone"
                                    placeholder={props.language === "en" ? "Phone Number" : "رقم الهاتف"}
                                    value={contactForm.phone}
                                    onChange={handleInputFields}
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col sm={12}>
                            <Form.Group controlId="address">
                                <Form.Control
                                    type="text"
                                    name="address"
                                    placeholder={props.language === "en" ? "Apartment, Suite, etc." : "شقة، جناح، إلخ"}
                                    value={contactForm.address}
                                    onChange={handleInputFields}
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col sm={12}>
                            <ButtonTheme
                                variant="primary"
                                onClick={handleSubmit}
                                style={{
                                    borderRadius: "6px",
                                    width: "150px",
                                }}
                            >
                                {props.language === "en" ? "Submit" : "إرسال"}
                            </ButtonTheme>
                            <ButtonTheme
                                className="buy-now-btn buy_cart"
                                onClick={() => props.openEditForm(false)}
                                outline
                            >
                                {props.language == 'en' ? 'cancel' : 'cancel'}
                            </ButtonTheme>
                        </Col>
                    </Row>
                </Form>

            </Row>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        global: state.globalReducer,
    };
};

export default connect(mapStateToProps)(EditAddress);

