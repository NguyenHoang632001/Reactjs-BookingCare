import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../store/actions';

import './Footer.scss';
import { LANGUAGES } from '../../utils';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import './Footer.scss';
import _ from 'lodash';
class Footer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      menuApp: [],
    };
  }

  componentDidMount() {}
  render() {
    return (
      <div className="Footer-container">
        <div className="container-footer-left">
          <div className="logo-footer">
            <div className="img-logo"></div>
          </div>
          <div className="title-footer">
            Công ty cổ phần công nghệ Booking Care
          </div>
          <div className="item-title-footer">
            Khu đô thị mới Cầu Giấy, Phường Dịch Vọng Hậu, Quận Cầu Giấy, Thành
            phố Hà Nội, Việt Nam
          </div>
          <div className="item-title-footer">
            ĐKKD số: 0106790291. Sở KHĐT Hà Nội cấp ngày 16/03/2015
          </div>
        </div>
        <div className="container-footer-right">
          <div className="title-place">Trụ sở tại Hà Nội</div>
          <div className="item">
            Lô B4/D21, Khu đô thị mới Cầu Giấy, Phường Dịch Vọng Hậu, Quận Cầu
            Giấy, Thành phố Hà Nội, Việt Nam
          </div>
          <div className="title-place">Văn phòng tại TP Hồ Chí Minh</div>
          <div className="item">Số 01, Hồ Bá Kiện, Phường 15, Quận 10</div>
          <div className="title-place">Hỗ trợ khách hàng</div>
          <div className="item item-support">
            support@bookingcare.vn (7h - 18h)
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

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
