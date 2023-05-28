import React, { Component } from 'react';
// import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { verifyBooking } from '../../services/userServices';
import Header from '../Header/Header';
import HomeHeader from '../HomePage/HomeHeader';
import './VerifyBooking.scss';
class VerifyBooking extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: '',
      doctorId: '',
      showTitle: false,
    };
  }
  async componentDidMount() {
    if (this.props.location && this.props.location.search) {
      const urlParams = new URLSearchParams(this.props.location.search);
      const token = urlParams.get('token');
      const doctorId = urlParams.get('doctorId');
      let data = await verifyBooking({ token: token, doctorId: doctorId });
      console.log(data);
      if (data && data.errCode === 0) {
        this.setState({
          showTitle: true,
        });
      }
    }
  }

  render() {
    return (
      <div>
        {this.state.showTitle === true ? (
          <div></div>
        ) : (
          <div>
            {' '}
            <HomeHeader />
            <div className="box-booking-verify">
              BẠN ĐÃ XÁC NHẬN THÀNH CÔNG, HẸN GẶP BẠN TẠI PHÒNG KHÁM
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(VerifyBooking);
