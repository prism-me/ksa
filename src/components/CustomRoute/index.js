import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import { types } from "../../redux/global/types";
class CustomRoute extends Component {
  state = {
    // isAuthenticated: true,
  };
  renderRoute = () => {
    let isAuthenticated = this.props.user?.isAuthenticated;
    // const { isAuthenticated } = this.state;
    const { isPrivate, path, component, exact } =
      this.props;
    if (!isPrivate) {
      return (
        <Route
          path={path}
          exact={exact}
          component={component}
        />
      );
    } else {
      if (isAuthenticated) {
        return (
          <Route
            path={path}
            exact={exact}
            component={component}
          />
        );
      } else {
        return <Redirect to={`/${this.props.global.activeLanguage}/login`} />;
      }
    }
  };

  // componentDidUpdate(prevProps)

  render() {
    return this.renderRoute();
    const { global } = this.props;
  }
}

const mapStateToProps = (state) => {
  return {
    user: state?.userReducer,
    global: state.globalReducer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setActiveLanguage: (language) =>
      dispatch({
        type: types.SET_ACTIVE_LANGUAGE,
        payload: {
          language: language,
        },
      }),
    // loginRequest: ({ username, token }) => dispatch(loginRequest({ username, token }))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomRoute);

// export default CustomRoute;
