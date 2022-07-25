import React, { useEffect, useReducer, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import "./CheckoutPaymentDetail.scss";

function CheckoutPaymentDetail(props) {
    return (
        <div className="checkout-payment-detail">
            <div className="list_box">
                <h3>{props.language === "en" ? "Order Summary" : "ملخص الطلب"}</h3>
                <Row>
                    <Col sm={4}>
                        <div className="product_img">
                            <img src="https://s3.eu-central-1.amazonaws.com/pigeon-gallery/album1%2FElectric%20Breast%20Pump%20Portable%20new.jpeg" />
                        </div>
                    </Col>
                    <Col sm={8}>
                        <div className="cart_list_detail">
                            <h2>Pigeon Breast Pump Manual - White</h2>
                            <p>Size: 10.4 x 20.6 x 20.4 cm</p>
                            <p className="cart_list_price">Price : AED 243.47 <span>AED 278.25</span></p>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col sm={4}>
                        <div className="product_img">
                            <img src="https://s3.eu-central-1.amazonaws.com/pigeon-gallery/album1%2FElectric%20Breast%20Pump%20Portable%20new.jpeg" />
                        </div>
                    </Col>
                    <Col sm={8}>
                        <div className="cart_list_detail">
                            <h2>Pigeon Breast Pump Manual - White</h2>
                            <p>Size: 10.4 x 20.6 x 20.4 cm</p>
                            <p className="cart_list_price">Price : AED 243.47 <span>AED 278.25</span></p>
                        </div>
                    </Col>
                </Row>
            </div>
            <div className="cart_payment_details">
                <h2>{props.language === "en" ? "Payment Details" : "تفاصيل الدفع"}</h2>
                <Row>
                    <Col sm={8}>
                        <p>{props.language === "en" ? "Value of Product(s)" : "قيمة المشتريات"}</p>
                    </Col>
                    <Col sm={4}>
                        <p>AED 874.65</p>
                    </Col>
                </Row>
                <Row>
                    <Col sm={8}>
                        <p>{props.language === "en" ? "Site Discount (-)" : "خصم الموقع (-)"}</p>
                    </Col>
                    <Col sm={4}>
                        <p>AED 104.34</p>
                    </Col>
                </Row>
                <Row>
                    <Col sm={8}>
                        <p>{props.language === "en" ? "Shipping Charges (+)" : "رسوم الشحن (+)"}</p>
                    </Col>
                    <Col sm={4}>
                        <p>{props.language === "en" ? "Free" : "مجاناً"}</p>
                    </Col>
                </Row>
                <hr />
                <Row>
                    <Col sm={8}>
                        <p><strong>{props.language === "en" ? "Sub Total" : "المجموع الفرعي"}</strong></p>
                    </Col>
                    <Col sm={4}>
                        <p>AED 770.31</p>
                    </Col>
                </Row>
                <hr />
                <Row>
                    <Col sm={8}>
                        <p><strong>{props.language === "en" ? "Final Payment" : "المجموع"}</strong></p>
                    </Col>
                    <Col sm={4}>
                        <p>AED 770.31</p>
                    </Col>
                </Row>
            </div>
            <p className="safe_secure">{props.language === "en" ? "Safe and Secure Payments.Easy returns.100% Authentic products." : "دفع آمن وسهل. استرداد المال. منتجات أصلية 100٪."}</p>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        global: state.globalReducer,
    };
};

export default connect(mapStateToProps)(CheckoutPaymentDetail);

