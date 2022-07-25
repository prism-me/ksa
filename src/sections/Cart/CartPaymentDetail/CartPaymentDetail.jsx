import React, { useEffect, useReducer, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import { constants } from "../../../utils/constants";
import { IoIosHeartEmpty, IoIosTrash } from "react-icons/io";
import ButtonTheme from "../../../components/ButtonTheme";
import "./CartPaymentDetail.scss";

function CartPaymentDetail(props) {
    return (
        <div className="cart-payment-detail">
            <div className="cart_delivery_to">
                <Row>
                    <Col sm={6}>
                        <h2>{props.language === 'en' ? 'Delivery to' : 'التسليم إلى'}</h2>
                    </Col>
                    <Col sm={6}>
                        <ButtonTheme
                            className="buy-now-btn buy_cart"
                            outline
                        >
                            {props.language === 'en' ? 'Change' : 'تغيير'}
                        </ButtonTheme>
                    </Col>
                </Row>
                <p>Conrad business towers, Dubai</p>
            </div>
            <div className="cart_payment_details">
                <h2>{props.language === 'en' ? 'Payment Details' : 'تفاصيل الدفع'}</h2>
                <Row>
                    <Col sm={8}>
                        <p>{props.language === 'en' ? 'Value of Product(s)' : 'قيمة المشتريات'}</p>
                    </Col>
                    <Col sm={4}>
                        <p>AED 874.65</p>
                    </Col>
                </Row>
                <Row>
                    <Col sm={8}>
                        <p>{props.language === 'en' ? 'Site Discount (-)' : 'خصم الموقع (-)'}</p>
                    </Col>
                    <Col sm={4}>
                        <p>AED 104.34</p>
                    </Col>
                </Row>
                <Row>
                    <Col sm={8}>
                        <p>{props.language === 'en' ? 'Shipping Charges (+)' : 'رسوم الشحن (+)'}</p>
                    </Col>
                    <Col sm={4}>
                        <p>{props.language === 'en' ? 'Free' : ''}</p>
                    </Col>
                </Row>
                <hr />
                <Row>
                    <Col sm={8}>
                        <p><strong>{props.language === 'en' ? 'Sub Total' : 'المجموع الفرعي'}</strong></p>
                    </Col>
                    <Col sm={4}>
                        <p>AED 770.31</p>
                    </Col>
                </Row>
                <hr />
                <Row>
                    <Col sm={8}>
                        <p><strong>{props.language === 'en' ? 'Final Payment' : 'المجموع'}</strong></p>
                    </Col>
                    <Col sm={4}>
                        <p>AED 770.31</p>
                    </Col>
                </Row>
            </div>
            <p className="safe_secure">{props.language == 'en' ? 'Safe and Secure Payments.Easy returns.100% Authentic products.' : 'دفع آمن وسهل. استرداد المال. منتجات أصلية 100٪.'}</p>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        global: state.globalReducer,
    };
};

export default connect(mapStateToProps)(CartPaymentDetail);

