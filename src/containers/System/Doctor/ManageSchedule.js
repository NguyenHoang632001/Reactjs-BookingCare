import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../../Header/Header';
import './ManageSchedule.scss';
import DatePicker from '../../../components/Input/DatePicker';
import Select from 'react-select';
import { ToastContainer, toast } from 'react-toastify';
import * as actions from '../../../store/actions';
import moment from 'moment';
import { bulkCreateScheduleService } from '../../../services/userServices';

class ManageSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      doctorOptions: [],
      currentDate: '',
      allTimeSchedule: [],
      language: 'vn',
      selectedDoctor: '',
    };
  }
  async componentDidMount() {
    this.props.fetchAllDoctors();
    this.props.fetchTimeSchedule('TIME');
  }
  componentDidUpdate(prevprops, prevState, snapshot) {
    if (prevprops.doctors !== this.props.doctors) {
      this.setState({
        selectedDoctor: '',
        doctorOptions: this.props.doctors,
      });
    }
    if (prevprops.allTimeSchedule !== this.props.allTimeSchedule) {
      let data = this.props.allTimeSchedule;
      if (data && data.length > 0) {
        data = data.map((time) => {
          return { ...time, isSelected: false };
        });
      }
      this.setState({
        allTimeSchedule: data,
      });
    }
    if (prevprops.language !== this.props.language) {
      this.setState({
        language: this.props.language,
      });
    }
  }
  builtDataSelect = (arr) => {
    let arrSelect = [];
    if (arr && arr.length > 0)
      arr.map((item) => {
        let object = {};
        object.label = `${item.firstName} ${item.lastName}`;
        object.value = `${item.id}`;
        arrSelect.push(object);
      });
    return arrSelect;
  };
  handleChange = (selectedDoctor) => {
    this.setState({ selectedDoctor });
  };
  handleChangeDate = (date) => {
    this.setState({
      currentDate: date[0],
    });
  };
  handleToSubmitTime = (time) => {
    let data = this.state.allTimeSchedule;
    if (data && data.length > 0) {
      data.map((item) => {
        if (item.id === time.id) {
          item.isSelected = !item.isSelected;
          return item;
        }
      });
    }
    this.setState({
      allTimeSchedule: data,
    });
  };
  handleSubmitSave = async () => {
    let { currentDate, selectedDoctor, allTimeSchedule } = this.state;
    let formatAllTimeSchedule = [];
    let dataRespone = {};
    let dataFinal = [];
    if (!currentDate || !selectedDoctor) {
      toast.error('Missing parameter!');
    } else {
      let formatedDate = new Date(currentDate).getTime();
      if (allTimeSchedule && allTimeSchedule.length > 0) {
        formatAllTimeSchedule = allTimeSchedule.filter(
          (item) => item.isSelected === true
        );
        if (formatAllTimeSchedule && formatAllTimeSchedule.length > 0) {
          dataFinal = formatAllTimeSchedule.map((item) => {
            return {
              doctorId: selectedDoctor.value,
              date: formatedDate,
              timeType: item.keyMap,
            };
          });
        }
      }

      if (!dataFinal.length > 0) {
        toast.error('Missing time schedule!');
      } else {
        // let res = await bulkCreateScheduleService(dataFinal);
        console.log(dataFinal);
        let res = await bulkCreateScheduleService({
          arrSchedule: dataFinal,
          doctorId: selectedDoctor.value,
          date: formatedDate,
        });
        console.log('res,', res);
        console.log(res);
        if (res && res.errCode === 0) {
          toast.success('Create schedules success');
        }
      }
    }
  };
  render() {
    return (
      <>
        <Header />
        <div className="title-manage-schedule">MANAGE DOCTOR SCHEDULE</div>
        <div className="container-manage-schedule">
          <div className="choose-manage-schedule row">
            <div className="row choose-doctor">
              <div className="col-6 ">
                <label className="col-6">Chọn bác sĩ</label>
                <Select
                  value={this.state.selectedDoctor}
                  onChange={(e) => this.handleChange(e)}
                  options={this.builtDataSelect(this.state.doctorOptions)}
                  className="select-a-doctor"
                />
              </div>
              <div className="col-6">
                <label className="col-6">Chọn ngày</label>

                <DatePicker
                  onChange={this.handleChangeDate}
                  minDate={new Date()}
                  value={this.state.currentDate}
                  className="form-control"
                />
              </div>
            </div>
            <div className="choose-time col-6">
              {this.state.allTimeSchedule &&
                this.state.allTimeSchedule.map((time, index) => {
                  return (
                    <button
                      className={
                        time.isSelected === false
                          ? 'time-button'
                          : 'time-button active'
                      }
                      onClick={() => this.handleToSubmitTime(time)}
                    >
                      {this.state.language === 'vi'
                        ? time.valueEn
                        : time.valueVn}
                    </button>
                  );
                })}
            </div>
            <button
              className="col-1 submit-button"
              onClick={() => this.handleSubmitSave()}
            >
              Lưu
            </button>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ManageScheduleMenuPath: state.app.ManageScheduleMenuPath,
    isLoggedIn: state.user.isLoggedIn,
    userRedux: state.admin.userRedux,
    doctors: state.admin.allDoctors,
    allTimeSchedule: state.admin.allTimeSchedule,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
    fetchTimeSchedule: (data) => dispatch(actions.fetchTimeSchedule(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
