import React, { Component } from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";

/**
 * Define HOC for route for check auth check
 * @param {*} ComposedComponent 
 * @returns 
 */
const RequireAuthLogin = (ComposedComponent) => {
  class RequireAuthLogin extends Component {
    static propTypes = {
      user: PropTypes.any,
      history: PropTypes.any,
    };

    componentDidMount() {
      const { auth, history } = this.props;
      if (auth?.userData?.Data?.access_token) {
        history.push("/coupons");
      }
    }

    render() {
      return <ComposedComponent {...this.props} />;
    }
  }

  const mapState = (state) => {
    return {
      auth: state.auth,
    };
  };

  return connect(mapState, null)(RequireAuthLogin);
}

export default RequireAuthLogin