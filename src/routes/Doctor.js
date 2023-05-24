import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import UserManage from '../containers/Doctor/UserManage';
import UserRedux from '../containers/Doctor/Admin/UserRedux';
import ManageDoctor from '../containers/Doctor/Admin/ManageDoctor';
import Header from '../containers/Header/Header';
import ManageSchedule from '../containers/System/Doctor/ManageSchedule';
class Doctor extends Component {
  render() {
    {
    }
    const { isLoggedIn } = this.props;
    return (
      <>
        {isLoggedIn && <Header />}
        <div className="Doctor-container">
          <div className="Doctor-list">
            <Switch>
              <Route
                path="/doctor/manage-schedule"
                component={ManageSchedule}
              />
            </Switch>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    DoctorMenuPath: state.app.DoctorMenuPath,
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Doctor);
