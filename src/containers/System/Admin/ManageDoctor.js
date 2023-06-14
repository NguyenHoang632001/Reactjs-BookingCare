import React, { Component } from 'react';

import { connect } from 'react-redux';
import './UserRedux.scss';
import * as actions from '../../../store/actions';
import './TableManageUser.scss';
import 'react-image-lightbox/style.css'; // This only needs to be imported once in your app
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import './ManageDoctor.scss';
import Select from 'react-select';
import { getAllSpecialty } from '../../../services/userServices';
// Register plugins if required
// MdEditor.use(YOUR_PLUGINS_HERE);

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

// handleToConvertToOptionSelect = (arr) => {};
class ManageDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDoctor: '',
      contentMarkdown: '',
      contnetHTML: '',
      doctorOptions: [],
      specialtyOptions: [],
      discriptionDoctor: '',
      selectedProvince: '',
      selectedPayment: '',
      selectedPrice: '',
      nameClinic: '',
      note: '',
      addressClinic: '',
      detailDoctor: '',
      selectedSpecialty: '',
    };
  }

  async componentDidMount() {
    this.props.fetchAllDoctors();
    this.props.fetchPrice();
    this.props.fetchProvince();
    this.props.fetchPayment();
    let data = await getAllSpecialty();
    if (data && data.errCode === 0) {
      this.setState({
        specialtyOptions: this.builtDataSelectOptionSpecialty(data.data),
      });
    }
  }
  componentDidUpdate(prevprops, prevState, snapshot) {
    if (prevprops.doctors !== this.props.doctors) {
      this.setState({
        doctorOptions: this.props.doctors,
      });
      //
    }
    if (prevprops.detailDoctor !== this.props.detailDoctor) {
      if (
        this.props.detailDoctor.Markdown.description &&
        this.props.detailDoctor.Markdown.contentMarkdown &&
        this.props.detailDoctor.Doctor_Infor &&
        this.props.detailDoctor.Doctor_Infor.priceTypeData &&
        this.props.detailDoctor.Doctor_Infor.provinceTypeData &&
        this.props.detailDoctor.Doctor_Infor.paymentTypeData
        // this.props.detailDoctor.Doctor_Infor.paymentTypeData
      ) {
        this.setState({
          discriptionDoctor: this.props.detailDoctor.Markdown.description,
          contentMarkdown: this.props.detailDoctor.Markdown.contentMarkdown,
          contnetHTML: this.props.detailDoctor.Markdown.contentHTML,
          nameClinic: this.props.detailDoctor.Doctor_Infor.nameClinic,
          addressClinic: this.props.detailDoctor.Doctor_Infor.addressClinic,
          note: this.props.detailDoctor.Doctor_Infor.note,
        });
        if (this.props.language === 'en') {
          this.setState({
            selectedPrice: {
              label:
                this.props.detailDoctor.Doctor_Infor.priceTypeData.valueEn +
                '$',
              value: this.props.detailDoctor.Doctor_Infor.priceId,
            },
            selectedProvince: {
              label:
                this.props.detailDoctor.Doctor_Infor.provinceTypeData.valueEn,
              value: this.props.detailDoctor.Doctor_Infor.priceId,
            },
            selectedPayment: {
              label:
                this.props.detailDoctor.Doctor_Infor.paymentTypeData.valueEn,
              value: this.props.detailDoctor.Doctor_Infor.priceId,
            },
            selectedSpecialty: {
              label: this.props.detailDoctor.Doctor_Infor.specialtyId,
            },
          });
        }
        if (this.props.language === 'vi') {
          this.setState({
            selectedPrice: {
              label:
                this.props.detailDoctor.Doctor_Infor.priceTypeData.valueVn +
                ' VND',
              value: this.props.detailDoctor.Doctor_Infor.priceId,
            },
            selectedProvince: {
              label:
                this.props.detailDoctor.Doctor_Infor.provinceTypeData.valueVn,
              value: this.props.detailDoctor.Doctor_Infor.priceId,
            },
            selectedPayment: {
              label:
                this.props.detailDoctor.Doctor_Infor.paymentTypeData.valueVn,
              value: this.props.detailDoctor.Doctor_Infor.priceId,
            },
            selectedSpecialty: {
              label: this.props.detailDoctor.Doctor_Infor.specialtyId,
            },
          });
        }
      } else {
        this.setState({
          discriptionDoctor: '',
          contentMarkdown: '',
          nameClinic: '',
          addressClinic: '',
          note: '',
          selectedPrice: '',
          selectedPayment: '',
          selectedProvince: '',
          selectedSpecialty: '',
        });
      }
    }
    if (prevprops.language !== this.props.language) {
      if (
        this.props.detailDoctor.Markdown.description &&
        this.props.detailDoctor.Markdown.contentMarkdown &&
        this.props.detailDoctor.Doctor_Infor
      ) {
        this.setState({
          discriptionDoctor: this.props.detailDoctor.Markdown.description,
          contentMarkdown: this.props.detailDoctor.Markdown.contentMarkdown,
          nameClinic: this.props.detailDoctor.Doctor_Infor.nameClinic,
          addressClinic: this.props.detailDoctor.Doctor_Infor.addressClinic,
          note: this.props.detailDoctor.Doctor_Infor.note,
        });
        if (this.props.language === 'en') {
          this.setState({
            selectedPrice: {
              label:
                this.props.detailDoctor.Doctor_Infor.priceTypeData.valueEn +
                '$',
              value: this.props.detailDoctor.Doctor_Infor.priceId,
            },
            selectedProvince: {
              label:
                this.props.detailDoctor.Doctor_Infor.provinceTypeData.valueEn,
              value: this.props.detailDoctor.Doctor_Infor.priceId,
            },
            selectedPayment: {
              label:
                this.props.detailDoctor.Doctor_Infor.paymentTypeData.valueEn,
              value: this.props.detailDoctor.Doctor_Infor.priceId,
            },
          });
        }
        if (this.props.language === 'vi') {
          this.setState({
            selectedPrice: {
              label:
                this.props.detailDoctor.Doctor_Infor.priceTypeData.valueVn +
                ' VND',
              value: this.props.detailDoctor.Doctor_Infor.priceId,
            },
            selectedProvince: {
              label:
                this.props.detailDoctor.Doctor_Infor.provinceTypeData.valueVn,
              value: this.props.detailDoctor.Doctor_Infor.priceId,
            },
            selectedPayment: {
              label:
                this.props.detailDoctor.Doctor_Infor.paymentTypeData.valueVn,
              value: this.props.detailDoctor.Doctor_Infor.priceId,
            },
          });
        }
      } else {
        this.setState({
          discriptionDoctor: '',
          contentMarkdown: '',
          nameClinic: '',
          addressClinic: '',
          note: '',
          selectedPrice: '',
          selectedPayment: '',
          selectedProvince: '',
        });
      }
    }
  }

  handleEditorChange = ({ html, text }) => {
    this.setState({
      contentMarkdown: text,
      contnetHTML: html,
    });
  };
  handleToSaveOnchangDoctor = async () => {
    this.props.saveDetailDoctor({
      id: this.state.selectedDoctor.value,
      contentMarkdown: this.state.contentMarkdown,
      contentHTML: this.state.contnetHTML,
      discriptionDoctor: this.state.discriptionDoctor,

      selectedProvince: this.state.selectedProvince.value,
      selectedPayment: this.state.selectedPayment.value,
      selectedPrice: this.state.selectedPrice.value,
      nameClinic: this.state.nameClinic,
      note: this.state.note,
      addressClinic: this.state.addressClinic,
      selectedSpecialty: this.state.selectedSpecialty.value,
    });
  };
  handleChange = (selectedDoctor) => {
    this.setState({ selectedDoctor }, () =>
      this.props.fetchDetailDoctor(+selectedDoctor.value)
    );
  };
  handleToTakeDiscriptionDoctor = (e) => {
    this.setState({
      discriptionDoctor: e.target.value,
    });
  };
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
  removeDuplicates = (array) => {
    return Array.from(new Set(array));
  };
  builtDataSelectOption = (arr) => {
    let arrSelect = [];
    if (this.props.language === 'en') {
      if (arr && arr.length > 0)
        this.removeDuplicates(arr).map((item) => {
          if (item.type === 'PRICE') {
            let object = {};
            object.label = `${item.valueEn} $`;
            object.value = `${item.keyMap}`;
            arrSelect.push(object);
          } else {
            let object = {};
            object.label = `${item.valueEn} `;
            object.value = `${item.keyMap}`;
            arrSelect.push(object);
          }
        });
      return arrSelect;
    }
    if (this.props.language === 'vi') {
      if (arr && arr.length > 0)
        this.removeDuplicates(arr).map((item) => {
          if (item.type === 'PRICE') {
            let object = {};
            object.label = `${item.valueEn} VND`;
            object.value = `${item.keyMap}`;
            arrSelect.push(object);
          } else {
            let object = {};
            object.label = `${item.valueVn} `;
            object.value = `${item.keyMap}`;
            arrSelect.push(object);
          }
        });
      return arrSelect;
    }
  };
  builtDataSelectOptionSpecialty = (arr) => {
    let arrSpecialty = [];
    if (arr && arr.length > 0) {
      arr.map((item) => {
        let object = {};
        object.label = item.name;
        object.value = item.id;
        arrSpecialty.push(object);
        return arrSpecialty;
      });
    }
    return arrSpecialty;
  };
  handleChangeInput = (e, id) => {
    let arrObject = ['price', 'payment', 'province', 'specialty'];
    arrObject.map((item) => {
      if (id === 'price') {
        this.setState({
          selectedPrice: e,
        });
      }
      if (id === 'payment') {
        this.setState({
          selectedPayment: e,
        });
      }
      if (id === 'province') {
        this.setState({
          selectedProvince: e,
        });
      }
      if (id === 'specialty') {
        this.setState({
          selectedSpecialty: e,
        });
      }
      return;
    });
  };
  handleToChangText = (e, id) => {
    if (id === 'room') {
      this.setState({
        nameClinic: e.target.value,
      });
    }
    if (id === 'address') {
      this.setState({ addressClinic: e.target.value });
    }
    if (id === 'note') {
      this.setState({ note: e.target.value });
    }
  };
  removeDuplicates(arr) {
    let uniqueArray = [];
    let idSet = new Set();

    // Duyệt qua từng phần tử trong mảng
    for (let i = 0; i < arr.length; i++) {
      let currentObj = arr[i];

      // Kiểm tra xem id đã tồn tại trong Set chưa
      if (!idSet.has(currentObj.id)) {
        idSet.add(currentObj.id);
        uniqueArray.push(currentObj);
      }
    }

    return uniqueArray;
  }
  render() {
    return (
      <>
        <div className="containerManageDoctor">
          <h2 className="titleManageDoctor">MANAGE DOCTOR</h2>
          <div className="container-discription-doctor">
            <div className="add-content-discription-doctor">
              <label className="title-discription-doctor">
                Discription doctor
              </label>
              <textarea
                rows="4"
                className="textarea-doctor"
                onChange={(e) => this.handleToTakeDiscriptionDoctor(e)}
                value={this.state.discriptionDoctor}
              ></textarea>
            </div>
            <div className="Choose-a-doctor">
              <label className="title-to-choose-a-doctor">
                Choose a doctor
              </label>
              <Select
                value={this.state.selectedDoctor}
                onChange={(e) => this.handleChange(e)}
                options={this.builtDataSelect(this.state.doctorOptions)}
                // onClick={() => this.handleOnclickOption()}
                className="select-a-doctor"
              />
            </div>
          </div>
          <div className="row">
            <div className="col-4 ">
              <label className="">Giá khám bệnh</label>

              <Select
                value={this.state.selectedPrice}
                onChange={(e) => this.handleChangeInput(e, 'price')}
                options={this.builtDataSelectOption(this.props.priceArr)}
                className="col-12"
              />
            </div>
            <div className="col-4">
              <label className="">Chọn phương thức thanh toán</label>
              <Select
                value={this.state.selectedPayment}
                onChange={(e) => this.handleChangeInput(e, 'payment')}
                options={this.builtDataSelectOption(this.props.paymentArr)}
                className="col-12"
              />
            </div>
            <div className="col-4">
              <label className="">Chọn tỉnh thảnh</label>
              <Select
                value={this.state.selectedProvince}
                onChange={(e) => this.handleChangeInput(e, 'province')}
                options={this.builtDataSelectOption(this.props.provinceArr)}
                className="col-12"
              />
            </div>
            <div className="col-4 ">
              <label className="">Tên phòng khám</label>
              <input
                className="col-12"
                value={this.state.nameClinic}
                onChange={(e) => this.handleToChangText(e, 'room')}
              ></input>
            </div>
            <div className="col-4">
              <label className="">Địa chỉ phòng khám</label>
              <input
                onChange={(e) => this.handleToChangText(e, 'address')}
                className="col-12"
                value={this.state.addressClinic}
              ></input>
            </div>
            <div className="col-4">
              <label className="">Note</label>
              <input
                className="col-12"
                value={this.state.note}
                onChange={(e) => this.handleToChangText(e, 'note')}
              ></input>
            </div>
            <div className="col-4">
              <label className="">Chọn chuyên khoa</label>
              <Select
                value={this.state.selectedSpecialty}
                onChange={(e) => this.handleChangeInput(e, 'specialty')}
                options={this.state.specialtyOptions}
                className="col-12"
              />
            </div>
            <div className="col-4">
              <label className="">Chọn phòng khám</label>
              <input
                className="col-12"
                value={this.state.note}
                onChange={(e) => this.handleToChangText(e, 'note')}
              ></input>
            </div>
          </div>
          <MdEditor
            style={{ height: '500px' }}
            renderHTML={(text) => mdParser.render(text)}
            onChange={this.handleEditorChange}
            value={this.state.contentMarkdown}
          />
          <button
            className="buttonToSave"
            onClick={() => this.handleToSaveOnchangDoctor()}
          >
            Save
          </button>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userRedux: state.admin.userRedux,

    doctors: state.admin.allDoctors,
    priceArr: state.admin.priceArr,
    provinceArr: state.admin.provinceArr,
    paymentArr: state.admin.paymentArr,
    language: state.app.language,
    detailDoctor: state.admin.detailDoctor,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGenderStart: () => dispatch(actions.fetchGenderStart()),
    getUserStart: () => dispatch(actions.fetchAllUserStart()),
    deleteUserStart: (userId) => dispatch(actions.deleteUserStart(userId)),
    loadTopDoctors: () => dispatch(actions.fetchTopDoctors()),
    fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
    saveDetailDoctor: (dataDoctors) =>
      dispatch(actions.saveDetailDoctorInfor(dataDoctors)),
    fetchPrice: () => dispatch(actions.fetchPrice()),
    fetchPayment: () => dispatch(actions.fetchPayment()),
    fetchProvince: () => dispatch(actions.fetchProvince()),
    fetchDetailDoctor: (id) => dispatch(actions.fetchDetailDoctor(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
