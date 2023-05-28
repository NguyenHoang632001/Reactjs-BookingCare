import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';
import './DoctorSchedule.scss';
import moment from 'moment';
import { LANGUAGES } from '../../../utils';
import {
  bookingAppoitment,
  getAllcodeServices,
  getExtraDoctorById,
  getScheduleByDateService,
  getScheduleForUserService,
} from '../../../services/userServices';
import { toast } from 'react-toastify';
import './DoctorSchedule.scss';
import BookingModal from './Modal/BookingModal';
import DoctorInfor from './doctorInfor';
import DatePicker from '../../../components/Input/DatePicker';
// import localization from 'moment/local/vi';
const handleImage = (imgBuffer) => {
  return new Buffer(imgBuffer, 'base64').toString('binary');
};

class DoctorSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allDays: [],
      scheduleData: [],
      arrTimeForDoctor: [],
      doctorId: '',
      allTimeSchedule: '',
      sellectedDate: [],
      isOpenModalBooking: false,
      ExtraDoctor: [],
      timeType: '',
      dateToTimeStamp: '',
      bookingScheduleForUser: '',
      aboutTimeSchedule: '',
      email: '',
      phoneNumber: '',
      address: '',
      fullName: '',
      reason: '',

      currentDate: '',
      sellectedGender: '',
      arrGender: [],
      detailDoctor: '',
      doctorFirstName: '',
      doctorLastName: '',
    };
  }

  async componentDidMount() {
    this.props.fetchGenderStart();
    this.setState({
      arrGender: this.props.gender,
    });

    this.setState({
      doctorFirstName: this.props.detailDoctor.firstName,
      doctorLastName: this.props.detailDoctor.lastName,
      doctorId: this.props.doctorId,
    });
    await this.props.fetchTimeSchedule('TIME');
    let { language } = this.props;

    let arrDate = [];
    for (let i = 0; i < 7; i++) {
      let object = {};
      if (language === LANGUAGES.VI) {
        object.label = moment(new Date()).add(i, 'days').format('dddd-DD/MM');
      } else if (language === LANGUAGES.EN) {
        object.label = moment(new Date())
          .add(i, 'days')
          .locale('en')
          .format('ddd-DD/MM');
      }
      object.value = moment(new Date()).add(i, 'days').startOf('day').valueOf();
      arrDate.push(object);
    }
    this.setState({
      allDays: arrDate,
    });

    var time = moment(arrDate[0].label, 'dddd-DD/MM');
    // Lấy timestamp
    var date = time.valueOf();
    this.setState({
      dateToTimeStamp: date,
      sellectedDate: arrDate[0].label,
    });
    let doctorId = this.props.doctorId;

    let res = await getScheduleByDateService(doctorId, date);
    if (res && res.errCode === 0) {
      let takeTime = this.handeToTakeTimeShedule(
        this.props.allTimeSchedule,
        res.data
      );

      this.setState({
        arrTimeForDoctor: takeTime,
      });
    }
  }
  async componentDidUpdate(prevprops, prevState, snapshot) {
    // if (this.props.detailDoctor !== prevprops.detailDoctor) {
    //   this.setState({
    //     doctorFirstName: this.props.firstName,
    //     doctorLastName: this.props.lastName,
    //   });
    // }
    if (prevprops.language !== this.props.language) {
      let arrDate = [];
      for (let i = 0; i < 7; i++) {
        let object = {};
        if (this.props.language === LANGUAGES.VI) {
          object.label = moment(new Date()).add(i, 'days').format('dddd-DD/MM');
        } else if (this.props.language === LANGUAGES.EN) {
          object.label = moment(new Date())
            .add(i, 'days')
            .locale('en')
            .format('ddd-DD/MM');
        }

        object.value = moment(new Date())
          .add(i, 'days')
          .startOf('day')
          .valueOf();
        arrDate.push(object);
      }

      this.setState({
        allDays: arrDate,
      });
    }
    if (prevprops.doctorId !== this.props.doctorId) {
      await this.props.fetchTimeSchedule('TIME');
      this.setState({
        doctorId: this.props.doctorId,
      });
      //have doctorId
      let { language } = this.props;

      let arrDate = [];
      for (let i = 0; i < 7; i++) {
        let object = {};
        if (language === LANGUAGES.VI) {
          object.label = moment(new Date()).add(i, 'days').format('dddd-DD/MM');
        } else if (language === LANGUAGES.EN) {
          object.label = moment(new Date())
            .add(i, 'days')
            .locale('en')
            .format('ddd-DD/MM');
        }
        object.value = moment(new Date())
          .add(i, 'days')
          .startOf('day')
          .valueOf();
        arrDate.push(object);
      }

      //have arrDate

      this.setState({
        allDays: arrDate,
      });

      var time = moment(arrDate[0].label, 'dddd-DD/MM');
      // Lấy timestamp
      var date = time.valueOf();
      //have date 1684602000000

      let doctorId = this.props.doctorId;
      //dave doctorId
      let res = await getScheduleByDateService(doctorId, date);

      //dave res.data
      this.setState({
        scheduleData: res.data,
      });

      //dave all time schedule
      if (res && res.errCode === 0) {
        let takeTime = this.handeToTakeTimeShedule(
          this.props.allTimeSchedule,
          res.data
        );

        if (takeTime && takeTime.length > 0) {
          this.setState({
            arrTimeForDoctor: takeTime,
          });
        }
      }
      let data = await getExtraDoctorById(this.props.doctorId);

      if (data && data.errCode === 0) {
        this.setState({
          ExtraDoctor: data.data,
        });
      }
    }
  }
  handleToTakeGender = (e) => {
    this.setState({
      sellectedGender: e.target.value,
    });
  };
  handleToTakeData = async (e) => {
    this.setState({
      sellectedDate: e.target.value,
    });
    var time = moment(e.target.value, 'dddd-DD/MM');

    // Lấy timestamp
    var date = time.valueOf();
    this.setState({
      dateToTimeStamp: date,
    });

    let doctorId = this.props.doctorId;

    let res = await getScheduleByDateService(doctorId, date);

    if (res && res.errCode === 0) {
      this.setState({
        scheduleData: res.data,
      });
      if (this.props.allTimeSchedule && this.props.allTimeSchedule.length > 0) {
        let takeTime = this.handeToTakeTimeShedule(
          this.props.allTimeSchedule,
          res.data
        );
        if (takeTime) {
          this.setState({
            arrTimeForDoctor: takeTime,
          });
        }
      }
    }
  };
  handeToTakeTimeShedule = (allTime, scheduleTime) => {
    if (scheduleTime && scheduleTime.length > 0) {
      let takeTime = [];
      scheduleTime.map((itemScheduleTime) => {
        allTime.map((itemInAllTime) => {
          if (itemScheduleTime.timeType === itemInAllTime.keyMap) {
            takeTime.push(itemInAllTime.valueEn);
            return takeTime;
          }
        });
      });

      return takeTime; //take time to run some item in screen
    }
  };
  handleToStopModal = () => {
    this.setState({
      isOpenModalBooking: !this.state.isOpenModalBooking,
    });
  };

  fotmatFrice = (price) => {
    let formatedPrice = price.toLocaleString('it-IT', {
      style: 'currency',
      currency: 'VND',
    });
    return formatedPrice;
  };
  getTimeType = (time) => {
    let timeType = '';
    this.props.allTimeSchedule &&
      this.props.allTimeSchedule.map((item) => {
        if (item.valueEn === time) {
          timeType = item.keyMap;

          return timeType;
        }
      });

    return timeType;
  };

  handleToOpenBookingSchedule = async (itemTime) => {
    this.setState({ aboutTimeSchedule: itemTime });
    this.setState({ isOpenModalBooking: !this.state.isOpenModalBooking });

    let timeType = this.getTimeType(itemTime);

    this.setState({
      timeType: timeType,
    });
    let data = await getScheduleForUserService(
      // this.state.timeType,
      timeType,
      this.state.dateToTimeStamp
    );
    let timeUserChoose = await getAllcodeServices('TIME');
    if (timeUserChoose && timeUserChoose?.data && data && data.data?.timeType) {
      let timeDataType = '';
      timeUserChoose.data.map((item) => {
        if (item.keyMap === data.data.timeType) {
          timeDataType = item;

          return timeDataType;
        }
        return timeDataType;
      });

      let BookingSchedule = { ...data.data, timeDataType };
      this.setState({
        bookingScheduleForUser: BookingSchedule,
      });
    }
  };

  handleChangeDate = (date) => {
    this.setState({
      currentDate: date[0].getTime(),
    });
  };
  handleToTakeInforUser = (e, id) => {
    let arrInfor = ['email', 'phoneNumber', 'address', 'fullName', 'reason'];
    //
    if (id === 'email') {
      this.setState({
        email: e.target.value,
      });
    }
    if (id === 'phoneNumber') {
      this.setState({
        phoneNumber: e.target.value,
      });
    }
    if (id === 'address') {
      this.setState({
        address: e.target.value,
      });
    }
    if (id === 'fullName') {
      this.setState({
        fullName: e.target.value,
      });
    }
    if (id === 'reason') {
      this.setState({
        reason: e.target.value,
      });
    }
  };
  handleToConfirmBook = async () => {
    let {
      doctorId,

      fullName,
      currentDate,
      address,
      email,
      reason,
      sellectedGender,
      timeType,
      dateToTimeStamp,
      phoneNumber,
      aboutTimeSchedule,
      sellectedDate,
      doctorFirstName,
      doctorLastName,
    } = this.state;
    console.log('firstName', doctorId);
    console.log('lastName', doctorLastName);
    let data = await bookingAppoitment({
      doctorId,
      fullName,
      currentDate,
      address,
      email,
      reason,
      dateToTimeStamp,
      phoneNumber,
      sellectedGender,
      timeType,
      aboutTimeSchedule,
      sellectedDate,
      doctorFirstName,
      doctorLastName,
    });
    if (data && data.errCode === 0) {
      toast.success('Booking Success!, check mail to confirm');
    } else {
      toast.error('Booking failed');
    }
  };
  render() {
    let { arrTimeForDoctor } = this.state;
    console.log('detail doctor', this.props.detailDoctor);
    return (
      <>
        <div className="container-schedule-doctor">
          <div className="container-select-time">
            <select
              onChange={(e) => this.handleToTakeData(e)}
              className="tag-sellect-box"
            >
              {this.state.allDays && this.state.allDays.length > 0}
              {this.state.allDays.map((day, index) => {
                return (
                  <option key={index} className="option-select-item">
                    {day.label}
                  </option>
                );
              })}
            </select>
          </div>

          {this.state.scheduleData && this.state.scheduleData.length > 0 ? (
            <div className="box-schdule-arr">
              <div className="title-schedule">
                <i className="fa fa-calendar title-icon"></i>
                <span className="title-calender">Lịch Khám</span>
              </div>
              <div className="time-work">
                {arrTimeForDoctor &&
                  arrTimeForDoctor.length > 0 &&
                  arrTimeForDoctor.map((itemTime, index) => {
                    return (
                      <span
                        key={index}
                        className="time-work-item"
                        onClick={() =>
                          this.handleToOpenBookingSchedule(itemTime)
                        }
                      >
                        {' '}
                        {itemTime}
                      </span>
                    );
                  })}
              </div>
            </div>
          ) : (
            <div className="">Không có lịch trong khoảng thời gian này</div>
          )}
        </div>
        <BookingModal
          isOpenModal={this.state.isOpenModalBooking}
          isStopModal={this.handleToStopModal}
          handleToConfirmBook={this.handleToConfirmBook}
          className="from-ceate-new-user"
        >
          <div>
            <div>
              <DoctorInfor
                doctorId={this.state.doctorId}
                aboutTime={this.state.aboutTimeSchedule}
                selectDay={this.state.sellectedDate}
              />
            </div>

            <div className="row p-2">
              <div className="col-6">
                <label className="">Họ tên</label>
                <input
                  className="col-12"
                  onChange={(e) => this.handleToTakeInforUser(e, 'fullName')}
                  value={this.state.fullName}
                ></input>
              </div>
              <div className="col-6">
                <label className="">SỐ điện thoại</label>
                <input
                  className="col-12"
                  onChange={(e) => this.handleToTakeInforUser(e, 'phoneNumber')}
                  value={this.state.phoneNumber}
                ></input>
              </div>
              <div className="col-6">
                <label className="">Địa chỉ Email</label>
                <input
                  className="col-12"
                  onChange={(e) => this.handleToTakeInforUser(e, 'email')}
                  value={this.state.email}
                ></input>
              </div>
              <div className="col-6">
                <label className="">Dịa chỉ liên hệ</label>
                <input
                  className="col-12"
                  onChange={(e) => this.handleToTakeInforUser(e, 'address')}
                  value={this.state.address}
                ></input>
              </div>
              <div className="col-12">
                <label className="">Lí do khám bệnh</label>
                <input
                  className="col-12"
                  onChange={(e) => this.handleToTakeInforUser(e, 'reason')}
                  value={this.state.reason}
                ></input>
              </div>

              <div className="col-6">
                <label className="">Ngày sinh</label>
                <DatePicker
                  onChange={this.handleChangeDate}
                  value={this.state.currentDate}
                  className="col-12"
                />
              </div>
              <div className="col-6 container-gender">
                <label className="">Giới tính</label>
                <select
                  selected="selected"
                  onChange={(e) => this.handleToTakeGender(e)}
                  className="col-12 box-gender"
                >
                  <option value="" selected disabled hidden>
                    Choose here
                  </option>
                  {this.props.gender && this.props.gender.length > 0}
                  {this.props.gender.map((item, index) => {
                    return (
                      <option key={index} className="col-12 item-gender">
                        {item.valueEn}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
          </div>
        </BookingModal>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    DoctorScheduleMenuPath: state.app.DoctorScheduleMenuPath,
    isLoggedIn: state.user.isLoggedIn,
    DoctorSchedule: state.admin.DoctorSchedule,
    language: state.app.language,
    allTimeSchedule: state.admin.allTimeSchedule,
    gender: state.admin.gender,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getDetailDoctor: (id) => dispatch(actions.fetchDetailDoctor(id)),
    fetchTimeSchedule: (data) => dispatch(actions.fetchTimeSchedule(data)),
    fetchGenderStart: () => dispatch(actions.fetchGenderStart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
