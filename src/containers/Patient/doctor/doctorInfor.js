import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../../store/actions';
import './doctorInfor.scss';
import { classNames } from 'react-select/dist/index-ea9e225d.cjs.prod';

import BookingModal from './Modal/BookingModal';
import './doctorInfor.scss';
import { getDoctorInfor } from '../../../services/userServices';

const handleImage = (imgBuffer) => {
  return new Buffer(imgBuffer, 'base64').toString('binary');
};

class doctorInfor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      doctorId: '',
      dataDoctorInfor: '',
    };
  }

  async componentDidMount() {
    this.setState({
      doctorId: this.props.doctorId,
    });

    let data = await getDoctorInfor(this.props.doctorId);
    if (data && data.errCode === 0) {
      this.setState({
        dataDoctorInfor: data.data,
      });
    }
  }
  componentDidUpdate(prevprops, prevState, snapshot) {}
  renderTimeSchedule = (timeType, day) => {
    if (timeType && day) {
      return (
        <div>
          <div>
            {timeType},{day}
          </div>
          <div>Miễn phí đặt lịch</div>
        </div>
      );
    } else {
      <div></div>;
    }
  };
  render() {
    return (
      <div className="container-doctor-infor">
        <div className="box-doctor-infor">
          {this.state.dataDoctorInfor?.image && (
            <div
              className="img-doctor-infor"
              style={{
                backgroundImage: `url(${handleImage(
                  this.state.dataDoctorInfor.image
                )})`,
              }}
            ></div>
          )}
          {this.state.dataDoctorInfor?.Markdown?.description &&
            this.state.dataDoctorInfor?.firstName &&
            this.state.dataDoctorInfor?.lastName &&
            this.state.dataDoctorInfor?.positionData?.valueEn && (
              <div className="des-doctor-infor">
                <h2>
                  {this.state.dataDoctorInfor.positionData.valueEn}{' '}
                  {this.state.dataDoctorInfor.firstName}{' '}
                  {this.state.dataDoctorInfor.lastName}
                </h2>
                <p> {this.state.dataDoctorInfor.Markdown.description}</p>
                {this.renderTimeSchedule(
                  this.props.aboutTime,
                  this.props.selectDay
                )}
              </div>
            )}
        </div>

        <h3 className="box-price-schedule-doctor">
          Giá khám:
          <span>
            {this.state.dataDoctorInfor?.Doctor_Infor?.priceTypeData?.valueVn}{' '}
            VND
          </span>
        </h3>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchDetailDoctor: (id) => dispatch(actions.fetchDetailDoctor(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(doctorInfor);
