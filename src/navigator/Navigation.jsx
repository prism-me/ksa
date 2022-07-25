import React, { Component } from "react";
import { Redirect, Switch } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { routes } from "./routes";
import Route from "./../components/CustomRoute";
import Login from "../components/Modals/Login/Login";
import Register from "../components/Modals/Register/Register";
import Error404 from "../pages/Error404";
import { connect } from "react-redux";
// import { getCategories, getProducts } from "../redux/products";
import {
  getCategories,
  getCategoryProducts,
  getProducts,
} from "../redux/products";
import { types } from "../redux/products/types";

class Navigation extends Component {
  state = {
    loginModal: false,
    allError : {}
  };
  setLoginModal = (status) => { };

  render() {
    return (
      <Switch>
        {/* <Route path="/" exact={true} isPrivate={true} component={Home} /> */}
        <Route
          // path="/login"
          path={`/en/login`}
          exact={true}
          isPrivate={false}
          component={() => (
            <Login
              show={true}
              isPage={true}
              language={global?.activeLanguage}
              onHide={() => this.props.history.goBack()}
              shiftToRegister={() => {
                this.props.history.push(`/${this.props.global.activeLanguage}/register`);
                // setRegisterModal(true);
              }}
            />
          )}
        />
        <Route
          // path="/login"
          path={`/ar/login`}
          exact={true}
          isPrivate={false}
          component={() => (
            <Login
              show={true}
              isPage={true}
              language={global?.activeLanguage}
              onHide={() => this.props.history.goBack()}
              shiftToRegister={() => {
                this.props.history.push(`/${this.props.global.activeLanguage}/register`);
                // setRegisterModal(true);
              }}
            />
          )}
        />
        <Route
          path={`/en/register`}
          // path="/register"
          exact={true}
          isPrivate={false}
          component={() => (
            <Register
              show={true}
              isPage={true}
              onHide={() => this.props.history.goBack()}
              language={global?.activeLanguage}
              shiftToLogin={() => {
                this.props.history.push(`/${this.props.global.activeLanguage}/login`);
              }}
              // allError = {this.state.allError}
            />
          )}
        />
        <Route
          path={`/ar/register`}
          // path="/register"
          exact={true}
          isPrivate={false}
          component={() => (
            <Register
              language={global?.activeLanguage}
              show={true}
              isPage={true}
              onHide={() => this.props.history.goBack()}
              shiftToLogin={() => {
                this.props.history.push(`/${this.props.global.activeLanguage}/login`);
              }}
            />
          )}
        />

        {/* {routes.map((route) => {
          return (
            <Route
              path={route.path}
              exact={route.exact}
              component={route.component}
              isPrivate={route.isPrivate}
            />
          );
        })} */}

        {routes.map((route, index) => {
          return (
            <Route
              path={index === 0 ? `${route.path}` : `/en${route.path}`}
              // path={`/${this.props.global.activeLanguage}${route.path}`}
              // path={route.path}
              exact={route.exact}
              component={route.component}
              isPrivate={route.isPrivate}
            />
          );
        })}
        {routes.map((route, index) => {
          return (
            <Route
              path={index === 0 ? `${route.path}` : `/ar${route.path}`}
              // path={`/${this.props.global.activeLanguage}${route.path}`}
              // path={route.path}
              exact={route.exact}
              component={route.component}
              isPrivate={route.isPrivate}
            />
          );
        })}

        <Route path="*" component={() => <Error404 />} isPrivate={false} />
        {/* <Redirect to="/error404" /> */}
      </Switch>
    );
  }
}

// export default withRouter(Navigation);

const mapStateToProps = (state) => {
  return {
    user: state.userReducer,
    products: state?.productReducer?.products,
    allProducts: state?.productReducer?.allProducts,
    searchData: state?.productReducer?.searchData,
    totalProducts: state?.productReducer?.totalProducts,
    categories: state?.productReducer?.categories,
    global: state.globalReducer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () =>
      dispatch({
        type: "LOGOUT",
      }),
    setActiveLanguage: (language) =>
      dispatch({
        type: types.SET_ACTIVE_LANGUAGE,
        payload: {
          language: language,
        },
      }),
    getProducts: (page) => dispatch(getProducts(page)),
    getCategories: () => dispatch(getCategories()),
    getCategoryProducts: (category) => dispatch(getCategoryProducts(category)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Navigation));
