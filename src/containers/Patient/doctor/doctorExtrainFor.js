import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../../store/actions';
import './doctorExtrainFor.scss';
import { classNames } from 'react-select/dist/index-ea9e225d.cjs.prod';
import { getExtraDoctorById } from '../../../services/userServices';
import BookingModal from './Modal/BookingModal';

const handleImage = (imgBuffer) => {
  return new Buffer(imgBuffer, 'base64').toString('binary');
};

class doctorExtrainFor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrDoctor: [],
      doctorExtrainFor: '',
      priceSelected: '',
      isShow: false,
      ExtraDoctor: [],
      isOpenModalUser: false,
    };
  }

  async componentDidMount() {
    this.props.fetchDetailDoctor(this.props.doctorId);

    if (this.props.language === 'en') {
      this.setState({
        priceSelected:
          this.props.detailDoctor.Doctor_Infor.priceTypeData.valueEn,
      });
    }
    if (this.props.language === 'vi') {
      this.setState({
        priceSelected:
          this.props.detailDoctor.Doctor_Infor.priceTypeData.valueVn,
      });
    }
    let data = await getExtraDoctorById(this.props.doctorId);
    if (data && data.errCode === 0) {
      this.setState({
        ExtraDoctor: data.data,
      });
    }
  }
  componentDidUpdate(prevprops, prevState, snapshot) {
    if (prevprops.language !== this.props.language) {
      if (this.props.language === 'en') {
        this.setState({
          priceSelected:
            this.props.detailDoctor.Doctor_Infor.priceTypeData.valueEn,
        });
      }
      if (this.props.language === 'vi') {
        this.setState({
          priceSelected:
            this.props.detailDoctor.Doctor_Infor.priceTypeData.valueVn,
        });
      }
      if (prevprops.doctorId !== this.props.doctorId) {
      }
    }
  }
  hanleToDetail = (id) => {
    if (id === 'show') {
      this.setState({
        isShow: !this.state.isShow,
      });
    } else if (id === 'hire') {
      this.setState({
        isShow: !this.state.isShow,
      });
    }
  };
  fotmatFrice = (price) => {
    let formatedPrice = price.toLocaleString('it-IT', {
      style: 'currency',
      currency: 'VND',
    });
    return formatedPrice;
  };
  render() {
    return (
      <div className="container-doctorInfor">
        <div className="titleAddressClinic">ĐỊA CHỈ PHÒNG KHÁM</div>
        {this.state.ExtraDoctor && (
          <h3 className="contentNameClinic">
            {' '}
            {this.state.ExtraDoctor.nameClinic}
          </h3>
        )}
        {this.state.ExtraDoctor && (
          <h3 className="contentAddressClinic">
            {' '}
            {this.state.ExtraDoctor.addressClinic}
          </h3>
        )}

        {this.state.isShow === false ? (
          <div className="box-price-doctor">
            <span>GIÁ KHẢM</span>

            {this.state.ExtraDoctor &&
            this.state.ExtraDoctor.priceTypeData?.valueEn &&
            this.props.language === 'en' ? (
              <span>
                {' '}
                {this.state.ExtraDoctor.priceTypeData?.valueEn &&
                  this.state.ExtraDoctor.priceTypeData.valueEn}{' '}
                $
              </span>
            ) : (
              <span>
                {' '}
                {this.state.ExtraDoctor.priceTypeData?.valueVn &&
                  this.fotmatFrice(
                    +this.state.ExtraDoctor.priceTypeData.valueVn
                  )}
              </span>
            )}
            <span
              onClick={() => this.hanleToDetail('show')}
              className="Watch-detail"
            >
              Xem chi tiết
            </span>
          </div>
        ) : (
          <div className="box-price-after-detail">
            <span>GIÁ KHÁM</span>
            {this.state.ExtraDoctor && this.props.language === 'en' ? (
              <span className="price">
                {' '}
                {this.state.ExtraDoctor.priceTypeData?.valueEn &&
                  this.state.ExtraDoctor.priceTypeData.valueEn}{' '}
                $
              </span>
            ) : (
              <span className="price">
                {this.state.ExtraDoctor.priceTypeData?.valueVn &&
                  this.fotmatFrice(
                    +this.state.ExtraDoctor.priceTypeData.valueVn
                  )}
              </span>
            )}
            <div>
              {this.props.detailDoctor && (
                <p>{this.state.ExtraDoctor && this.state.ExtraDoctor.note}</p>
              )}
            </div>
            <span
              onClick={() => this.hanleToDetail('hire')}
              className="Watch-detail"
            >
              {' '}
              Ẳn bảng giá
            </span>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    doctorExtrainForMenuPath: state.app.doctorExtrainForMenuPath,
    isLoggedIn: state.user.isLoggedIn,
    doctorExtrainFor: state.admin.doctorExtrainFor,
    detailDoctor: state.admin.detailDoctor,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchDetailDoctor: (id) => dispatch(actions.fetchDetailDoctor(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(doctorExtrainFor);
