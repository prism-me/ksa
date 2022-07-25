import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import ButtonTheme from "./../../../components/ButtonTheme";
import { connect } from "react-redux";
import { constants } from "../../../utils/constants";
import './CheckoutForm.scss';

const initialObject = {
  first_name: "",
  last_name: "",
  email: "",
  phone: "",
  message: "",
  address: "",
  landmark: "",
  city: "",
  zipcode: "",
  cardnumber: "",
  expirydate: "",
  cvc: "",
  // openPaymentDetailBox: false,
};

function CheckoutForm(props) {

  const [contactForm, setContactForm] =
    useState(initialObject);
  const [openPaymentDetailBox, setPaymentForm] =
    useState(false);

  const handleInputFields = (e) => {
    let updateValue = { ...contactForm };
    updateValue[e.target.name] = e.target.value;
    setContactForm(updateValue);
    // console.log("Update values", updateValue);
  };

  const handleSubmit = () => {
    let name =
      contactForm.first_name + " " + contactForm.last_name;
    let email = contactForm.email;
    let phone = contactForm.phone;
    if (contactForm.first_name === "") {
      alert("Please enter your first name");
      return;
    }

    if (contactForm.last_name === "") {
      alert("Please enter your last name");
      return;
    }

    if (email === "") {
      alert("Please enter you valid email");
      return;
    }

    if (phone === "") {
      alert("Please enter your phone number");
      return;
    }

    let updateValue = { name, email, phone };
    // axios
    //   .post(
    //     "https://pigeonarabia.com/APIs/public/api/insertContact",
    //     updateValue
    //   )
    //   .then((response) => {
    //     if (
    //       response.status === 200 ||
    //       response.status === 201
    //     ) {
    //       setContactForm({ ...initialObject });
    //       alert("Your feedback sent successfully");
    //     }
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };

  const handleOpenPaymentDetailBox = (val) => {
    setPaymentForm(val);
  }

  return (
    <div className="checkout-form">
      <div className="form-wrapper">
        <Form>
          <Row>
            <Col sm={6}>
              <p><strong>{props.language === "en" ? "Contact Information" : "معلومات الإتصال"}</strong></p>
            </Col>
            <Col sm={6}>
              <p className="text_align">{props.language === "en" ? "Already have an aacount?" : "لديك حساب؟"} <a href="#" className="log_in_text">{props.language === "en" ? "Log in" : "تسجيل دخول"}</a></p>
            </Col>
          </Row>

          <Row>
            <Col sm={12}>
              <Form.Group controlId="email">
                <Form.Control
                  type="email"
                  name="email"
                  pattern=".+@globex\.com"
                  placeholder={props.language === "en" ? "Email Address*" : "*البريد الإلكتروني"}
                  required
                  value={contactForm.email}
                  onChange={handleInputFields}
                />
              </Form.Group>
            </Col>
            <Col sm={12}>
              <Form.Group controlId="keepme">
                <Form.Check
                  type="checkbox"
                  name="keepme"
                  style={{ fontSize: "13px" }}
                  label={props.language === "en" ? "Keep me up to date on news and offers" : "اجعلني على اطلاع بآخر الأخبار والعروض"}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col sm={12}>
              <p><strong>{props.language === "en" ? "Delivery Address" : "عنوان التسليم"}</strong></p>
            </Col>
          </Row>

          <Row>
            <Col sm={6}>
              <Form.Group controlId="firstName">
                <Form.Control
                  type="text"
                  name="first_name"
                  placeholder={props.language === "en" ? "Firstname*" : "*الإسم الأول"}
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
                  placeholder={props.language === "en" ? "Lastname*" : "*اسم العائلة"}
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
                  placeholder={props.language === "en" ? "Phone Number*" : "*رقم الهاتف"}
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
              <Form.Group controlId="landmark">
                <Form.Control
                  type="text"
                  name="landmark"
                  placeholder={props.language === "en" ? "Landmark" : "معلم بارز"}
                  value={contactForm.landmark}
                  onChange={handleInputFields}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col sm={12}>
              <Form.Group controlId="city">
                <Form.Control
                  type="text"
                  name="city"
                  placeholder={props.language === "en" ? "City" : "المدينة"}
                  value={contactForm.city}
                  onChange={handleInputFields}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col sm={4}>
              <Form.Group controlId="country">
                <select>
                  <option>{props.language === "en" ? "Country/Region" : "الدولة / الإقليم"}</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>
              </Form.Group>
            </Col>
            <Col sm={4}>
              <Form.Group controlId="state">
                <select>
                  <option>{props.language === "en" ? "State" : "المنطقة"}</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>
              </Form.Group>
            </Col>
            <Col sm={4}>
              <Form.Group controlId="zipcode">
                <Form.Control
                  type="text"
                  name="zipcode"
                  placeholder={props.language === "en" ? "Zipcode" : "الرمز البريدي"}
                  value={contactForm.zipcode}
                  onChange={handleInputFields}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col sm={12}>
              <Form.Group controlId="saveinfo">
                <Form.Check
                  type="checkbox"
                  name="saveinfo"
                  style={{ fontSize: "13px" }}
                  label={props.language === "en" ? "Save this information for next time" : "حفظ هذه المعلومات للاستخدام في المرة القادمة"}
                />
              </Form.Group>
            </Col>
          </Row>

          {/* <Row>
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
            </Col>
          </Row> */}
        </Form>
      </div>

      <div className="list_box">
        <h3>{props.language === 'en' ? "Payment Options" : "خيارات الدفع"}</h3>
        <Row>
          <Col>
            <Form>
              <Form.Group controlId="paymeny" className="payment_method">
                <input type="radio" id="paymentmethod1"
                  name="paymentmethod" value="cda" onClick={() => handleOpenPaymentDetailBox(true)} />
                <label for="paymentmethod1">{props.language === 'en' ? "Credit / Debit / ATM card" : "بطاقة اِئْتِمَانٌ / بطاقة خصم / بطاقة مصرفية"}</label><br></br>
                {openPaymentDetailBox &&
                  <Row>
                    <p>{props.language === 'en' ? "Input your debit or credit card details." : "أدخل تفاصيل بطاقة الخصم أو الائتمان الخاصة بك."}</p>
                    <Col sm={12}>
                      <Form.Group controlId="cardnumber">
                        <Form.Control
                          type="text"
                          name="cardnumber"
                          placeholder={props.language === 'en' ? "Card Number" : "رقم البطاقة"}
                          value={contactForm.cardnumber}
                          onChange={handleInputFields}
                        />
                      </Form.Group>
                    </Col>
                    <Col sm={6}>
                      <Form.Group controlId="expirydate">
                        <Form.Control
                          type="text"
                          name="expirydate"
                          placeholder={props.language === 'en' ? "Expiry Date" : "تاريخ الإنتهاء"}
                          value={contactForm.expirydate}
                          onChange={handleInputFields}
                        />
                      </Form.Group>
                    </Col>
                    <Col sm={6}>
                      <Form.Group controlId="cvc">
                        <Form.Control
                          type="text"
                          name="cvc"
                          placeholder={props.language === 'en' ? "CVC" : "رمز التحقق من البطاقة (CVC)"}
                          value={contactForm.cvc}
                          onChange={handleInputFields}
                        />
                      </Form.Group>
                    </Col>
                    {/* <Col sm={12}>
                      <ButtonTheme
                        variant="primary"
                        onClick={handleSubmit}
                        style={{
                          borderRadius: "6px",
                          width: "150px",
                        }}
                      >
                        {props.language === 'en' ? "Pay" : "دفع"}
                      </ButtonTheme>
                    </Col> */}
                  </Row>
                }
                <input type="radio" id="paymentmethod2"
                  name="paymentmethod" value="cod" onClick={() => handleOpenPaymentDetailBox(false)} />
                <label for="paymentmethod2">{props.language === 'en' ? "Cash On Delivery" : "الدفع عند التسليم"}</label>
              </Form.Group>
              <Col sm={12}>
                <ButtonTheme
                  variant="primary"
                  onClick={handleSubmit}
                  style={{
                    borderRadius: "6px",
                    width: "150px",
                  }}
                >
                  {props.language === 'en' ? "Confirm Order" : "تأكيد الطلب"}
                </ButtonTheme>
              </Col>
            </Form>
          </Col>
        </Row>
      </div>
    </div >
  );
}

const mapStateToProps = (state) => {
  return {
    global: state.globalReducer,
  };
};

export default connect(mapStateToProps)(CheckoutForm);

