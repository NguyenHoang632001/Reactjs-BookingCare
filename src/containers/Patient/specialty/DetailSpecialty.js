import React, { Component } from 'react';
import { connect } from 'react-redux';
import './DetailSpecialty.scss';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import img1 from '../../../assets/img1.jpg';
import { FormattedMessage } from 'react-intl';
import Select from 'react-select';
import {
  getAllDetailSpecialty,
  getAllSpecialty,
  getContentSpecialty,
  getDoctorInfor,
  getDoctorInforInSpecialty,
} from '../../../services/userServices';
import Header from '../../Header/Header';
import HomeHeader from '../../HomePage/HomeHeader';
import DoctorSchedule from '../doctor/DoctorSchedule';
import './DetailSpecialty.scss';
import * as actions from '../../../store/actions';
import DoctorExtrainFor from '../doctor/doctorExtrainFor';
import Footer from '../../Footer/Footer';
class DetailSpecialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allDetailSpecialty: '',
      arrId: [81, 82, 83],
      idSpecialty: '',
      arrDoctorInThisSpecialty: [],
      arrDoctorId: [],
      arrDoctorInfor: [],
      contentSpecialty: '',
      nameSpecialty: '',
      optionSelect: [],
      selectedProvince: '',
    };
  }
  async componentDidMount() {
    let data = await this.props.fetchAllDoctors();

    if (this.props.provinceArr) {
      let option = [];
      this.props.provinceArr.map((item) => {
        let object = {};
        object.value = item.keyMap;
        object.label = item.valueVn;
        option.push(object);
        return option;
      });

      this.setState({
        optionSelect: option,
      });
    }
    this.props.fetchProvince();
    if (this.props.match?.params?.id) {
      this.setState({
        idSpecialty: this.props.match.params.id,
      });
      let data = await getContentSpecialty(this.props.match.params.id);
      if (data && data.errCode === 0) {
        this.setState({
          contentSpecialty: data.data.descriptionMarkdown,
          nameSpecialty: data.data.name,
        });
      }
    }
  }
  async componentDidUpdate(prevprops, prevState, snapshot) {
    if (this.state.selectedProvince !== prevState.selectedProvince) {
      let province = this.state.selectedProvince;
      let allDoctorInSpecialty = await getDoctorInforInSpecialty(
        this.props.match.params.id
      );
      if (allDoctorInSpecialty && allDoctorInSpecialty.errCode === 0) {
        this.setState({
          arrDoctorInThisSpecialty: allDoctorInSpecialty.data,
        });
        let arrDoctorId = [];
        let doctorInfor = [];
        allDoctorInSpecialty.data.map(async (item) => {
          arrDoctorId.push(item.doctorId);

          return arrDoctorId;
        });
        arrDoctorId.map(async (item) => {
          let dataDoctor = await getDoctorInfor(item);
          if (dataDoctor && dataDoctor.errCode === 0) {
            doctorInfor.push(dataDoctor.data);
          }
          this.setState({
            arrDoctorInfor: doctorInfor,
          });
          return arrDoctorId;
        });
        this.setState({
          arrDoctorId: arrDoctorId,
        });
      }
      let arrDoctorInProvince = [];
      let arrDoctorInThisSpecialty = [];

      if (this.state.arrDoctorInfor) {
        this.state.arrDoctorInfor.map((item) => {
          if (item.Doctor_Infor.provinceId === province) {
            arrDoctorInProvince.push(item);
          }
        });
        this.state.arrDoctorInThisSpecialty.map((item) => {
          if (item.provinceId === province) {
            arrDoctorInThisSpecialty.push(item);
          }
        });
        this.setState({
          arrDoctorInfor: arrDoctorInProvince,
        });
        this.setState({
          arrDoctorInThisSpecialty: arrDoctorInThisSpecialty,
        });
        // return arrDoctorInProvince;
      }
    }
    if (prevprops.provinceArr !== this.props.provinceArr) {
      if (this.props.provinceArr) {
        let option = [];
        this.props.provinceArr.map((item) => {
          let object = {};
          object.value = item.keyMap;
          object.label = item.valueVn;
          option.push(object);
          return option;
        });

        this.setState({
          optionSelect: option,
        });
      }
    }
    if (prevprops.match.params.id !== this.state.idSpecialty) {
      this.setState({
        idSpecialty: this.props.match.params.id,
      });
      let allDoctorInSpecialty = await getDoctorInforInSpecialty(
        this.props.match.params.id
      );
      if (allDoctorInSpecialty && allDoctorInSpecialty.errCode === 0) {
        this.setState({
          arrDoctorInThisSpecialty: allDoctorInSpecialty.data,
        });
        let arrDoctorId = [];
        let doctorInfor = [];
        allDoctorInSpecialty.data.map(async (item) => {
          arrDoctorId.push(item.doctorId);

          return arrDoctorId;
        });
        arrDoctorId.map(async (item) => {
          let dataDoctor = await getDoctorInfor(item);
          if (dataDoctor && dataDoctor.errCode === 0) {
            doctorInfor.push(dataDoctor.data);
          }
          this.setState({
            arrDoctorInfor: doctorInfor,
          });
          return arrDoctorId;
        });
        this.setState({
          arrDoctorId: arrDoctorId,
        });
      }
    }
  }
  handleChangeInput = (e) => {
    this.setState({
      selectedProvince: e.value,
    });
  };
  handleToDetailDoctor = (id) => {
    // this.props.getDetailDoctor(id);
    console.log('doctor id', id);
    this.props.history.push(`/detail-doctor/${id}`);
  };
  render() {
    let arrDoctorInThisSpecialty = this.state.arrDoctorInThisSpecialty;

    let arrDoctorInfor = this.state.arrDoctorInfor;

    let optionSelect = this.state.optionSelect;
    let nameSpecialty = this.state.nameSpecialty;
    let contentSpecialty = this.state.contentSpecialty;
    return (
      <div className="container-detailer-specialty">
        <HomeHeader />

        <div className="intro-box">
          <div className="name-specialty">{nameSpecialty && nameSpecialty}</div>
          {contentSpecialty && <p>{contentSpecialty}</p>}
        </div>
        <div className="selected-province-specialty">
          <Select
            value={this.state.selectedProvince}
            onChange={(e) => this.handleChangeInput(e)}
            options={optionSelect}
            className="col-4"
          />
        </div>
        <div className="container-detail-specialty-item">
          {arrDoctorInThisSpecialty &&
            arrDoctorInThisSpecialty.length > 0 &&
            arrDoctorInThisSpecialty.map((item, index) => {
              return (
                <div className="item-detail-specialty" key={index}>
                  {' '}
                  {arrDoctorInfor &&
                    arrDoctorInfor.length > 0 &&
                    arrDoctorInfor.map((doctorInforItem, index) => {
                      if (doctorInforItem.id === item.doctorId) {
                        let imageBase64 = '';
                        if (doctorInforItem.image) {
                          imageBase64 = new Buffer(
                            doctorInforItem.image,
                            'base64'
                          ).toString('binary');
                        }

                        return (
                          <div className="box-left">
                            <div className="box-left-infor">
                              {' '}
                              <div
                                className="img-item"
                                style={{
                                  backgroundImage: `url(${imageBase64})`,
                                }}
                              ></div>
                              <div className="fullName">
                                {doctorInforItem.firstName}{' '}
                                {doctorInforItem.lastName}
                              </div>{' '}
                            </div>

                            <div className="doctor-description">
                              {doctorInforItem &&
                                doctorInforItem.Markdown &&
                                doctorInforItem.Markdown.description &&
                                doctorInforItem.Markdown.description}
                            </div>
                            <div>
                              {' '}
                              <i class="fa fa-location-arrow"></i>
                              {doctorInforItem &&
                                doctorInforItem.Doctor_Infor &&
                                doctorInforItem.Doctor_Infor.provinceTypeData &&
                                doctorInforItem.Doctor_Infor.provinceTypeData
                                  .valueVn && (
                                  <span
                                    className="local"
                                    style={{ padding: '0 10px' }}
                                  >
                                    {
                                      doctorInforItem.Doctor_Infor
                                        .provinceTypeData.valueVn
                                    }
                                  </span>
                                )}
                            </div>
                            <div
                              className="watch-more"
                              onClick={() =>
                                this.handleToDetailDoctor(item.doctorId)
                              }
                            >
                              Xem thêm
                            </div>
                          </div>
                        );
                      }
                    })}
                  <div className="box-right">
                    <DoctorSchedule doctorId={item.doctorId} />
                    <DoctorExtrainFor doctorId={item.doctorId} />
                  </div>
                </div>
              );
            })}
        </div>
        {arrDoctorInThisSpecialty.length === 0 && (
          <div className="annouce">KHÔNG CÓ BÁC SĨ KHOA NÀY</div>
        )}
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    allDoctors: state.admin.allDoctors,
    provinceArr: state.admin.provinceArr,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
    fetchProvince: () => dispatch(actions.fetchProvince()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);
