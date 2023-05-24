import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../store/actions';
import Navigator from '../../components/Navigator';
import { adminMenu, doctorMenu } from './menuApp';
import './Header.scss';
import { LANGUAGES } from '../../utils';
import { FormattedMessage } from 'react-intl';
import _ from 'lodash';
class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      menuApp: [],
    };
  }
  handleOnclickAddActive = (language) => {
    this.props.changeLanguageAppRedux(language);
  };
  componentDidMount() {
    let { userInfo } = this.props;
    let menuApp = [];
    if (userInfo && !_.isEmpty(userInfo)) {
      let role = userInfo.roleId;
      if (role === 'R1') {
        menuApp = adminMenu;
      }
      if (role === 'R2') {
        menuApp = doctorMenu;
      }
      if (role === 'R3') {
        menuApp = '';
      }
    }
    this.setState({
      menuApp: menuApp,
    });
  }
  render() {
    const { processLogout, language, userInfo } = this.props;

    return (
      <div className="header-container">
        {/* thanh navigator */}
        <div className="header-tabs-container">
          <Navigator menus={this.state.menuApp} />
        </div>
        {/* nút logout */}
        <div className="languages">
          <span className="welcome">
            <FormattedMessage id="home-header.Welcome" />
            {userInfo && userInfo.firstName ? userInfo.firstName : ''}
          </span>
          <span
            className={language === LANGUAGES.VI ? 'language-vi active' : ''}
            onClick={() => this.handleOnclickAddActive(LANGUAGES.VI)}
          >
            VN
          </span>
          <span
            className={language === LANGUAGES.EN ? 'language-en active' : ''}
            onClick={() => this.handleOnclickAddActive(LANGUAGES.EN)}
          >
            EN
          </span>
          <div
            className="btn btn-logout"
            onClick={processLogout}
            title="logout"
          >
            <i className="fas fa-sign-out-alt"></i>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
    userInfo: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    processLogout: () => dispatch(actions.processLogout()),
    changeLanguageAppRedux: (language) =>
      dispatch(actions.changeLanguageApp(language)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
