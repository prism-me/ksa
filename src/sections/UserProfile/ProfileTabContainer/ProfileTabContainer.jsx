import React, { useEffect, useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import { connect } from "react-redux";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import WishlistGrid from "../../Wishlist/WishlistGrid";
import OrderContainer from "../../Order/OrderContainer/OrderContainer";
import OrderTracking from "../../OrderTracking/OrderTracking/OrderTracking";
import Address from "../../Address/Address";
import Payment from "../../Payment/Payment";
import {
  AiOutlineLock,
  AiOutlineLogout,
  AiOutlineHeart,
  AiOutlineInfoCircle,
  AiOutlineOrderedList,
  AiOutlineHeatMap,
  AiOutlineMoneyCollect
} from "react-icons/ai";
import Spinner from "react-bootstrap/Spinner";
import ButtonTheme from "../../../components/ButtonTheme";
import { API } from "../../../http/API";
import { useHistory } from "react-router-dom";

function ProfileTabContainer(props) {

  const [activeTab, setActiveTab] = useState("basic");
  const history = useHistory();
  const [newPassword, setNewPassword] = useState("");
  const [oldpassword, setOldPassword] = useState("");

  useEffect(() => {
    if (props.activeTab) {
      setActiveTab(props.activeTab);
    }
  }, [props.activeTab]);

  const handelResetPassword = () => {
    let formdata = new FormData();
    formdata.append("password", oldpassword);
    formdata.append("changed_password", newPassword);
    formdata.append("email", props.user.email);
    API.post(`/auth/reset`, formdata, {
      "Content-Type": `multipart/form-data; boundary=${formdata._boundary}`,
    })
      .then((response) => {
        if (response.status === 200) {
          alert(response.data.message);
        } else {
          alert(response.data.message);
        }
      })
      .catch((error) => {
        if (oldpassword === '' && newPassword === '') {
          alert("Please Enter Current Password and New Password.");
        } else {
          if (oldpassword === '') {
            alert("Please Enter Current Password.");
          }
          if (newPassword === '') {
            alert("Please Enter New Password.");
          }
        }
      });
  };
  return (
    <div className="profile-tab-container">
      <Container className="tabs-wrapper">
        <Tab.Container
          id="left-tabs-example"
          defaultActiveKey={"basic"}
          activeKey={activeTab}
          onSelect={(name) => setActiveTab(name)}
        >
          <Row>
            <Col sm={3}>
              <Nav variant="pills" className="flex-column">
                <Nav.Item>
                  <Nav.Link eventKey="basic">
                    <AiOutlineInfoCircle className="mr-2" />
                    <span> {props.activeLanguage == 'en' ? 'Basic Info' : 'المعلومات الاساسيه'} </span>
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="wishlist">
                    <AiOutlineHeart className="mr-2" />
                    <span> {props.activeLanguage == 'en' ? 'Wishlist' : 'قائمة الأمنيات'} </span>
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="order">
                    <AiOutlineOrderedList className="mr-2" />
                    <span> {props.activeLanguage == 'en' ? 'Order' : 'Order'} </span>
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="orderTracking">
                    <AiOutlineHeatMap className="mr-2" />
                    <span> {props.activeLanguage == 'en' ? 'Order Tracking' : 'Order Tracking'} </span>
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="address">
                    <AiOutlineOrderedList className="mr-2" />
                    <span> {props.activeLanguage == 'en' ? 'Address' : 'Address'} </span>
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="payment">
                    <AiOutlineMoneyCollect className="mr-2" />
                    <span> {props.activeLanguage == 'en' ? 'Payment' : 'Payment'} </span>
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="reset">
                    <AiOutlineLock className="mr-2" />
                    <span> {props.activeLanguage == 'en' ? 'Reset Password' : 'إعادة تعيين كلمة المرور'} </span>
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="logout" onClick={() => props.logout()}>
                    <AiOutlineLogout className="mr-2" /> <span> {props.activeLanguage == 'en' ? 'Logout' : 'تسجيل خروج'} </span>
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
            <Col sm={9}>
              <Tab.Content>
                <Tab.Pane eventKey="basic">
                  <div className="tab-content basic-tab">
                    <h3 className="tab-title"> {props.activeLanguage == 'en' ? 'Basic Info' : 'المعلومات الاساسيه'}</h3>
                    <Row>
                      <Col sm={3}>
                        <div className="profile-avatar">
                          <img src={props.user?.avatar || ""} alt="" />
                        </div>
                      </Col>
                      <Col sm={9}>
                        <Row>
                          <Col sm={3} xs={5}>
                            <p>{props.activeLanguage == 'en' ? 'First Name' : 'الإسم الأول'}</p>
                          </Col>
                          <Col sm={9} xs={7}>
                            <p>{props.user?.name?.split(" ")?.[0]}</p>
                          </Col>
                        </Row>
                        <Row>
                          <Col sm={3} xs={5}>
                            <p>{props.activeLanguage == 'en' ? 'Last Name' : 'الإسم الاخير'}</p>
                          </Col>
                          <Col sm={9} xs={7}>
                            <p>
                              {props.user?.name?.split(" ")?.[1] ||
                                "Not provided"}
                            </p>
                          </Col>
                        </Row>
                        <Row>
                          <Col sm={3} xs={5}>
                            <p>{props.activeLanguage == 'en' ? 'Email' : 'البريد الالكتروني'}</p>
                          </Col>
                          <Col sm={9} xs={7}>
                            <p>{props.user?.email}</p>
                          </Col>
                        </Row>
                        <Row>
                          <Col sm={3} xs={5}>
                            <p>{props.activeLanguage == 'en' ? 'Social Connected' : 'التواصل الاجتماعي'}</p>
                          </Col>
                          <Col sm={9} xs={7}>
                            <p>{props.user?.is_social ? "Yes" : "No"}</p>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </div>
                </Tab.Pane>
                <Tab.Pane eventKey="wishlist">
                  <div className="tab-content wishlist-tab">
                    <h3 className="tab-title">{props.activeLanguage == 'en' ? 'Wishlist' : 'قائمة الأمنيات'}</h3>
                    <WishlistGrid data={props.userWishlistProducts} activeLanguage={props.activeLanguage} />
                  </div>
                </Tab.Pane>
                <Tab.Pane eventKey="order">
                  <div className="tab-content order-tab">
                    <h3 className="tab-title">{props.activeLanguage == 'en' ? 'Order' : 'Oredr'}</h3>
                    <OrderContainer data={props.userWishlistProducts} activeLanguage={props.activeLanguage} />
                  </div>
                </Tab.Pane>
                <Tab.Pane eventKey="orderTracking">
                  <div className="tab-content order-tracking-tab">
                    <h3 className="tab-title">{props.activeLanguage == 'en' ? 'Order Tracking' : 'Order Tracking'}</h3>
                    <OrderTracking data={props.userWishlistProducts} activeLanguage={props.activeLanguage} />
                  </div>
                </Tab.Pane>
                <Tab.Pane eventKey="address">
                  <div className="tab-content order-tracking-tab">
                    <h3 className="tab-title">{props.activeLanguage == 'en' ? 'Address' : 'Address'}</h3>
                    <Address data={props.userWishlistProducts} activeLanguage={props.activeLanguage} />
                  </div>
                </Tab.Pane>
                <Tab.Pane eventKey="payment">
                  <div className="tab-content order-tracking-tab">
                    <h3 className="tab-title">{props.activeLanguage == 'en' ? 'Payment' : 'Payment'}</h3>
                    <Payment data={props.userWishlistProducts} activeLanguage={props.activeLanguage} />
                  </div>
                </Tab.Pane>
                <Tab.Pane eventKey="reset">
                  <div className="tab-content reset-tab">
                    <h3 className="tab-title">{props.activeLanguage == 'en' ? 'Reset Password' : 'إعادة تعيين كلمة المرور'}</h3>
                    <Form>
                      <Row>
                        <Col sm={6}>
                          <Row>
                            <Col sm={12}>
                              <Form.Group controlId="password">
                                <Form.Label>{props.activeLanguage == 'en' ? 'Current Password' : 'كلمة المرور الحالية'}</Form.Label>
                                <Form.Control type="password"
                                  autoComplete="new-password"
                                  onChange={(e) => setOldPassword(e.target.value)}
                                />
                              </Form.Group>
                            </Col>
                            <Col sm={12}>
                              <Form.Group controlId="newPassword">
                                <Form.Label>{props.activeLanguage == 'en' ? 'New Password' : 'كلمة المرور الجديدة'}</Form.Label>
                                <Form.Control type="password"
                                  autoComplete="new-password"
                                  onChange={(e) => setNewPassword(e.target.value)}
                                />
                              </Form.Group>
                            </Col>
                            <Col sm={12}>
                              <ButtonTheme
                                variant="primary"
                                style={{ borderRadius: "6px", width: props.activeLanguage == "en" ? "150px" : "200px" }}
                                onClick={() => handelResetPassword()}
                                outline
                              >
                                {props.activeLanguage == 'en' ? 'Reset Password' : 'إعادة تعيين كلمة المرور'}
                              </ButtonTheme>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    </Form>
                  </div>
                </Tab.Pane>
                <Tab.Pane eventKey="logout">
                  <div className="tab-content logout-tab">
                    <h3 className="tab-title">{props.activeLanguage == 'en' ? 'Logout' : 'تسجيل خروج'}</h3>
                    <div className="d-flex align-items-center justify-content-center p-5">
                      <Spinner
                        animation="border"
                        variant="danger"
                        style={{ width: "50px", height: "50px" }}
                      />
                    </div>
                  </div>
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </Container>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.userReducer?.loggedInUser,
    userWishlistProducts: state.productReducer?.userWishlistProducts,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () =>
      dispatch({
        type: "LOGOUT",
      }),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileTabContainer);
