import React, { useEffect, useReducer, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import { constants } from "../../../utils/constants";
import { IoIosHeartEmpty, IoIosTrash } from "react-icons/io";
import ButtonTheme from "../../../components/ButtonTheme";
import "./CartList.scss";

function CartList(props) {
    const [value, setIncrement] = useState(1);
    const incrementClicks = (v) => {
        setIncrement(v + 1);
    }

    const decrementClicks = (v) => {
        setIncrement(v - 1);
    }
    return (
        <div className="cart-list">
            <div className="list_box">
                <Row>
                    <Col sm={4}>
                        <div className="product_img">
                            <img src="https://s3.eu-central-1.amazonaws.com/pigeon-gallery/album1%2FElectric%20Breast%20Pump%20Portable%20new.jpeg" />
                        </div>
                        <div className="product_qyt">
                            <div className="quantity-input">
                                <button className="quantity-input__modifier quantity-input__modifier--right" onClick={() => incrementClicks(value)}>
                                    &#xff0b;
                                </button>
                                <input className="quantity-input__screen" type="text" value={value} readonly />
                                <button className="quantity-input__modifier quantity-input__modifier--left" onClick={() => decrementClicks(value)}>
                                    &mdash;
                                </button>
                            </div>
                        </div>
                    </Col>
                    <Col sm={8}>
                        <div className="cart_list_detail">
                            <h2>Pigeon Breast Pump Manual - White</h2>
                            <p>Size: 10.4 x 20.6 x 20.4 cm</p>
                            <p className="cart_list_price">Price : AED 243.47 <span>AED 278.25</span></p>

                            <ButtonTheme
                                className="buy-now-btn save_btn"
                                outline
                            >
                                {props.language == 'en' ? 'Save for later' : 'الحفظ لوقت لاحق'}
                                <IoIosHeartEmpty />
                            </ButtonTheme>
                            <ButtonTheme
                                className="buy-now-btn buy_cart"
                                outline
                            >
                                {props.language == 'en' ? 'Remove' : 'إزالة'}
                                <IoIosTrash />
                            </ButtonTheme>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col sm={4}>
                        <div className="product_img">
                            <img src="https://s3.eu-central-1.amazonaws.com/pigeon-gallery/album1%2FElectric%20Breast%20Pump%20Portable%20new.jpeg" />
                        </div>
                        <div className="product_qyt">
                            <div className="quantity-input">
                                <button className="quantity-input__modifier quantity-input__modifier--right" onClick={() => incrementClicks(value)}>
                                    &#xff0b;
                                </button>
                                <input className="quantity-input__screen" type="text" value={value} readonly />
                                <button className="quantity-input__modifier quantity-input__modifier--left" onClick={() => decrementClicks(value)}>
                                    &mdash;
                                </button>
                            </div>
                        </div>
                    </Col>
                    <Col sm={8}>
                        <div className="cart_list_detail">
                            <h2>Pigeon Breast Pump Manual - White</h2>
                            <p>Size: 10.4 x 20.6 x 20.4 cm</p>
                            <p className="cart_list_price">Price : AED 243.47 <span>AED 278.25</span></p>

                            <ButtonTheme
                                className="buy-now-btn save_btn"
                                outline
                            >
                                {props.language == 'en' ? 'Save for later' : 'الحفظ لوقت لاحق'}
                                <IoIosHeartEmpty />
                            </ButtonTheme>
                            <ButtonTheme
                                className="buy-now-btn buy_cart"
                                outline
                            >
                                {props.language == 'en' ? 'Remove' : 'إزالة'}
                                <IoIosTrash />
                            </ButtonTheme>
                        </div>
                    </Col>
                </Row>
            </div>
            <Row>
                <div className="order_action_div">
                    <ButtonTheme
                        className="buy-now-btn"
                        outline
                    >
                        {props.language == 'en' ? 'Place Order' : 'تقديم طلب'}
                    </ButtonTheme>
                    <ButtonTheme
                        className="buy-now-btn buy_cart"
                        outline
                    >
                        {props.language == 'en' ? 'Continue Shopping' : 'مواصلة الشراء '}
                    </ButtonTheme>
                </div>
            </Row>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        global: state.globalReducer,
    };
};

export default connect(mapStateToProps)(CartList);

