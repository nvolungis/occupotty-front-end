import React               from "react";
import {connect}           from "react-redux";
import {bindActionCreators} from "redux";

import {fetchCurrentUser}  from "app/auth/actions";
import {isTokenSet}        from "app/auth/localstorage";

const mapStateToProps = (state) => ({
  currentUser: state.auth.currentUser
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    fetchCurrentUser: fetchCurrentUser
  }, dispatch);
};

/**
* Entry point for the whole App this includes secured and not secured content.
* Application gets composed by redux therefore we can access to all the redux
* sugar from here after.
*/
@connect(mapStateToProps, mapDispatchToProps)
export default class ApplicationContainer extends React.Component {
  componentWillMount() {
    if (isTokenSet()) {
      this.props.fetchCurrentUser();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (isTokenSet() && !nextProps.currentUser) {
      this.props.fetchCurrentUser();
    }
  }

  render () {
    return (
      <div>{this.props.children}</div>
    );
  }
}
