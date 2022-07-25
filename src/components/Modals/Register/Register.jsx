import React, { useState } from "react";
import {
  // Modal,
  Container,
  Row,
  Col,
  Form,
} from "react-bootstrap";
// import { MdClose } from "react-icons/md";
import { connect } from "react-redux";
import ButtonTheme from "./../../ButtonTheme";
import { FcGoogle } from "react-icons/fc";
import { TiSocialFacebook } from "react-icons/ti";
// import ClipLoader from "react-spinners/BounceLoader";
import { API } from "../../../http/API";
import GoogleLogin from "react-google-login";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import { useHistory } from "react-router-dom";

const Register = (props) => {
  const history = useHistory();
  const [showSpinner, setShowSpinner] = useState(false);
  const [validated, setValidated] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    // const form = event.currentTarget;
    // if (form.checkValidity() === false) {
    //   event.preventDefault();
    //   event.stopPropagation();
    // }
    setValidated(true);
    setShowSpinner(true);
    const passwordLength = password.length;
    if (firstName !== '' && lastName !== '' && email !== '' && password !== '' && passwordLength >= 6) {
      let formdata = new FormData();
      formdata.append("name", `${firstName} ${lastName}`);
      formdata.append("email", email);
      formdata.append("password", password);
      formdata.append("password_confirmation", password);

      API.post(`/auth/register`, formdata, {
        "Content-Type": `multipart/form-data; boundary=${formdata._boundary}`,
      }).then((response) => {
        setShowSpinner(false);
        props.registerSuccess(response.data);
        props.onHide();
        alert(
          "Your account has been created successfully."
        );
      })
        .catch((error) => {
          setShowSpinner(false);
          // setShow(true);
          //alert("There was some error Please try again.");
        });
    } else {
      //alert("There was some error Please try again.");
      if (firstName === '') {
        alert("Please Enter First Name.");
        // const error1 = "Please Enter First Name.";
        // props.allError = error1;
      }
      if (lastName === '') {
        alert("Please Enter Last Name.");
      }
      if (email === '') {
        alert("Please Enter Email.");
      }
      if (password === '') {
        alert("Please Enter Password.");
      }else if (passwordLength < 6) {
        alert("Password must be at least 6 characters.");
      }
    }
  };
  //Google Login
  const responseGoogle = (response) => {
    setShowSpinner(true);
    let formdata = new FormData();
    formdata.append("name", response.profileObj.name);
    formdata.append("email", response.profileObj.email);
    formdata.append(
      "password",
      response.profileObj.googleId
    );
    formdata.append(
      "password_confirmation",
      response.profileObj.googleId
    );
    formdata.append("avatar", response.profileObj.imageUrl);
    formdata.append("is_social", true);
    API.post(`/auth/register`, formdata, {
      "Content-Type": `multipart/form-data; boundary=${formdata._boundary}`,
    })
      .then((response) => {
        setShowSpinner(false);
        props.registerSuccess(response.data);
        props.onHide();
        alert(
          "Your account has been created successfully."
        );
        history.push("/profile");
      })
      .catch((error) => {
        setShowSpinner(false);
        console.log(error);
        // setShow(true);
        // alert("There was some error Please try again.");
      });
  };
  //Facebook Login
  const responseFacebook = (response) => {
  };
  return (
    <div>
      {/* {console.log("error1 ::", props.allError)} */}
      <div className="register-wrapper">
        <Container>
          {/* <div className="close-icon-wrapper"> */}
          {/* </div> */}
          <div
            // className="register-heading"
            className={`register-heading ${props.global.activeLanguage === "ar" ? "register-heading-Arabic" : ""}`}
          >
            <span>{props.global.activeLanguage == "en" ? 'Register' : 'سجل'}</span>
          </div>
          <div className="register-sub-heading">
            <p>{props.global.activeLanguage == "en" ? 'Register with your social media accounts' : 'سجل عبر حساباتك على مواقع التواصل'}</p>
          </div>
          <Row>
            <Col
              sm={12}
              md={6}
              className="google-register-col"
            >
              {/* <ButtonTheme className="google-register-button">
                <FcGoogle fontSize="20px" />
                <span>Register with Google</span>
              </ButtonTheme> */}
              <GoogleLogin
                clientId="443788196047-43sg5nlk5qh2a2p3615ifqlhe68apjvk.apps.googleusercontent.com"
                render={(renderProps) => (
                  <ButtonTheme
                    onClick={renderProps.onClick}
                    disabled={renderProps.disabled}
                    className="google-register-button"
                  >
                    <span>
                      <FcGoogle fontSize="20px" style={{ marginRight: "0.5rem" }} />
                      {props.global.activeLanguage == "en" ? 'Register with Google' : 'سجل عبر حسابك على قوقل'}</span>
                  </ButtonTheme>
                )}
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={"single_host_origin"}
              />
            </Col>
            <Col
              sm={12}
              md={6}
              className="facebook-register-col"
            >
              <FacebookLogin
                appId="1088597931155576"
                autoLoad={false}
                callback={() => responseFacebook}
                render={(renderProps) => (
                  <ButtonTheme
                    onClick={renderProps.onClick}
                    className="facebook-register-button"
                  >
                    <span>
                      <TiSocialFacebook fontSize="20px" style={{ marginRight: "0.5rem" }} />
                      {props.global.activeLanguage == "en" ? 'Register with Facebook' : 'سجل عبر حسابك على فيسبوك'}</span>
                  </ButtonTheme>
                )}
              />
            </Col>
          </Row>
        </Container>
        <div className="register-divivder-wrap">
          <hr />
        </div>
        <Container>
          <div className="form-wrapper">
            <Form>
              <Row>
                <Col sm={6}>
                  <Form.Group controlId="firstName">
                    <Form.Label>{props.global.activeLanguage == "en" ? 'First Name' : 'الإسم الأول'}</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      onChange={(e) =>
                        setFirstName(e.target.value)
                      }
                    />
                    <Form.Control.Feedback type="invalid">Please Enter First Name.</Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col sm={6}>
                  <Form.Group controlId="lastName">
                    <Form.Label>{props.global.activeLanguage == "en" ? 'Last Name' : 'الإسم الاخير'}</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      onChange={(e) =>
                        setLastName(e.target.value)
                      }
                    />
                  </Form.Group>
                </Col>
                <Col sm={12}>
                  <Form.Group controlId="email">
                    <Form.Label>{props.global.activeLanguage == "en" ? 'Email' : 'البريد الالكتروني'}</Form.Label>
                    <Form.Control
                      required
                      type="email"
                      onChange={(e) =>
                        setEmail(e.target.value)
                      }
                    />
                  </Form.Group>
                </Col>
                <Col sm={12}>
                  <Form.Group controlId="password">
                    <Form.Label>{props.global.activeLanguage == "en" ? 'Password' : 'كلمة المرور'}</Form.Label>
                    <Form.Control
                      required
                      type="password"
                      onChange={(e) =>
                        setPassword(e.target.value)
                      }
                    />
                  </Form.Group>
                </Col>
                <Col sm={12} className="login-button-col">
                  <ButtonTheme
                    variant="primary"
                    style={{
                      borderRadius: "4px",
                      width: "180px",
                      fontSize: "15px",
                    }}
                    onClick={handleSubmit}
                  >
                    {props.global.activeLanguage == "en" ? 'Register now' : 'سجل الآن‎'}
                  </ButtonTheme>
                </Col>
                <Col sm={12}>
                  <p className="text-center small">
                    {props.global.activeLanguage == "en" ? 'Already have an account ?' : 'لديك حساب بالفعل؟'} &nbsp;
                    <span
                      style={{
                        color: "#e65550",
                        textDecoration: "underline",
                        cursor: "pointer",
                      }}
                      onClick={() => props.shiftToLogin()}
                    >
                      {props.global.activeLanguage == "en" ? 'Login' : 'تسجيل دخول'}
                    </span>
                  </p>
                </Col>
              </Row>
            </Form>
          </div>
        </Container>
      </div>
      {/* <div
        className={`${
          showSpinner ? "d-flex" : "d-none"
        } flex-column text-center align-items-center justify-content-center`}
        style={{
          position: "absolute",
          zIndex: 99999,
          height: "100%",
          width: "100%",
          background: "rgba(255,255,255,0.6)",
        }}
      >
        <ClipLoader color={"#e65550"} loading={true} size={80} />
      </div> */}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.userReducer,
    global: state.globalReducer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    registerSuccess: (data) =>
      dispatch({
        type: "REGISTRATION_SUCCESS",
        payload: data,
      }),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Register);
