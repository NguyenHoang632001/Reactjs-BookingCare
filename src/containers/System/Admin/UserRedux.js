import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { CRUD_ACTIONS } from '../../../utils/constant';
import ModalUser from '../ModalUser';
import { getAllcodeServices } from '../../../services/userServices';
import './UserRedux.scss';
import * as actions from '../../../store/actions';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css'; // This only needs to be imported once in your app
import TableManageUser from './TableManageUser';
import { toast } from 'react-toastify';
import { CommonUtils } from '../../../utils';
let genderArr = (arr) =>
  arr.filter((value, index, self) => {
    return self.indexOf(value) === index;
  });
class UserRedux extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrUser: [],
      isOpenModalUser: false,
      genderArr: [],
      positionArr: [],
      roleArr: [],
      previewImg: '',
      photoIndex: 0,
      isOpen: false,
      id: '',
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      phoneNumber: '',
      address: '',
      gender: '',
      position: '',
      role: '',
      avatar: '',
      action: '',
    };
  }

  async componentDidMount() {
    this.props.getGenderStart();
    this.props.getPositionStart();
    this.props.getRoleStart();
    this.props.getUserStart();
  }

  handleOpenModal = () => {
    this.setState({
      isOpenModalUser: true,
    });
  };
  // deleteUserServices
  handleToStopModal = () => {
    this.setState({
      isOpenModalUser: !this.state.isOpenModalUser,
    });
  };
  componentDidUpdate(prevProps, preState, snapshot) {
    if (prevProps.genderRedux !== this.props.genderRedux) {
      let arrGender = this.props.genderRedux;
      this.setState({
        genderArr: this.props.genderRedux,
        gender: arrGender && arrGender.length > 0 ? arrGender[0].keyMap : '',
      });
    }
    if (prevProps.positionRedux !== this.props.positionRedux) {
      let arrPosition = this.props.positionRedux;

      this.setState({
        positionArr: this.props.positionRedux,
        position: arrPosition && arrPosition.length > 0 ? arrPosition[0] : '',
      });
    }
    if (prevProps.roleRedux !== this.props.roleRedux) {
      let arrRole = this.props.roleRedux;
      this.setState({
        roleArr: this.props.roleRedux,
        role: arrRole && arrRole.length > 0 ? arrRole[0].keyMap : '',
      });
    }
    if (prevProps.userRedux !== this.props.userRedux) {
      this.setState({
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        phoneNumber: '',
        address: '',
        gender: '',
        position: '',
        role: '',
        avatar: '',
        action: CRUD_ACTIONS.CREATE,
      });
    }
  }
  handleOnchangeFile = async (e) => {
    let data = e.target.files;
    let file = data[0];

    if (this.state.previewImg) {
      URL.revokeObjectURL(this.state.previewImg);
    }
    if (file) {
      let base64 = await CommonUtils.getBase64(file);

      let objectUrl = URL.createObjectURL(file);
      this.setState({
        previewImg: objectUrl,
        avatar: base64,
      });
    }
  };
  handleToDeleteImg = () => {
    this.setState({
      previewImg: '',
    });
  };
  onchangInput = (e, id) => {
    let coppyState = { ...this.state };
    coppyState[id] = e.target.value;
    this.setState({
      ...coppyState,
    });
  };
  handleCheckInput = () => {
    let isValid = true;
    let arrCheck = [
      'email',
      'password',
      'firstName',
      'lastName',
      'address',
      'phoneNumber',
    ];
    for (let i = 0; i <= arrCheck.length - 1; i++) {
      if (!this.state[arrCheck[i]]) {
        isValid = false;

        break;
      }
    }
    return isValid;
  };
  handleSaveUser = () => {
    if (this.handleCheckInput() == false) {
      toast.error('Missing parameter');
    }

    this.props.createNewUser({
      email: this.state.email,
      password: this.state.password,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      address: this.state.address,
      gender: this.state.gender,
      roleId: this.state.role,
      phoneNumber: this.state.phoneNumber,
      positionId: this.state.position,
      avatar: this.state.avatar,
    });
  };

  handleEditUserFromParent = (user) => {
    let imageBase64 = '';

    if (user.image) {
      imageBase64 = new Buffer(user.image, 'base64').toString('binary');
    }
    this.setState({
      id: user.id,
      email: user.email,
      password: 'hardcode',
      firstName: user.firstName,
      lastName: user.lastName,
      phoneNumber: user.phoneNumber,
      address: user.address,
      gender: user.gender,
      position: user.positionId,
      role: user.roleId,
      avatar: '',
      action: CRUD_ACTIONS.EDIT,
      previewImg: imageBase64,
    });
  };
  handleEditUser = () => {
    if (this.handleCheckInput() == false) {
      toast.error('Missing parameter');
    } else {
      this.props.editUserStart({
        id: this.state.id,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        address: this.state.address,
        gender: this.state.gender,
        roleId: this.state.role,
        phoneNumber: this.state.phoneNumber,
        positionId: this.state.position,
        avatar: this.state.avatar,
      });
      toast.success('Edit success! ');
    }
  };
  render() {
    let genders = [...new Set(this.state.genderArr.map((obj) => obj))];
    console.log(genders);
    let positions = [...new Set(this.state.positionArr.map((obj) => obj))];
    let roles = [...new Set(this.state.roleArr.map((obj) => obj))];
    let isLoading = this.props.isLoading;

    const { photoIndex, isOpen } = this.state;
    let {
      email,
      password,
      firstName,
      lastName,
      phoneNumber,
      address,
      gender,
      position,
      role,
    } = this.state;
    // console.log('check sate in usser redux', this.state);
    return (
      <div className="user-redux-container">
        <div className="text-center">CRUD WITH REUDUX</div>;
        <div>{isLoading === true ? 'Is Loading' : ''}</div>
        <div className="user-redux-body">
          <div className="container">
            <h2 className="titileAddUserRedux">Thêm người dùng với Redux</h2>
            <div className="row">
              <div className="col-3">
                <label>Email</label>
                <input
                  className="form-control"
                  type="email"
                  value={email}
                  onChange={(e) => this.onchangInput(e, 'email')}
                />
              </div>
              <div className="col-3">
                <label>Password</label>
                <input
                  className="form-control"
                  type="password"
                  value={password}
                  onChange={(e) => this.onchangInput(e, 'password')}
                />
              </div>
              <div className="col-3">
                <label>FirstName</label>
                <input
                  className="form-control"
                  type="text"
                  value={firstName}
                  onChange={(e) => this.onchangInput(e, 'firstName')}
                />
              </div>
              <div className="col-3">
                <label>LastName</label>
                <input
                  className="form-control"
                  type="text"
                  value={lastName}
                  onChange={(e) => this.onchangInput(e, 'lastName')}
                />
              </div>
              <div className="col-3">
                <label>Phone Number</label>
                <input
                  className="form-control"
                  type="text"
                  value={phoneNumber}
                  onChange={(e) => this.onchangInput(e, 'phoneNumber')}
                />
              </div>
              <div className="col-9">
                <label>Address</label>
                <input
                  className="form-control"
                  type="text"
                  value={address}
                  onChange={(e) => this.onchangInput(e, 'address')}
                />
              </div>
              <div className="col-3">
                <label>Gender</label>
                <select
                  class="form-control"
                  value={gender}
                  onChange={(e) => this.onchangInput(e, 'gender')}
                >
                  {genders &&
                    genders.length > 0 &&
                    genders.map((item, index) => {
                      return (
                        <option selected key={index} value={item.keyMap}>
                          {item.valueEn}
                        </option>
                      );
                    })}
                </select>
              </div>
              <div className="col-3">
                <label>Position</label>
                <select
                  class="form-control"
                  value={position}
                  onChange={(e) => this.onchangInput(e, 'position')}
                >
                  {positions &&
                    positions.length > 0 &&
                    positions.map((item, index) => {
                      return (
                        <option selected key={index} value={item.keyMap}>
                          {item.valueEn}
                        </option>
                      );
                    })}
                </select>
              </div>
              <div className="col-3">
                <label>RoleId</label>
                <select
                  class="form-control"
                  value={role}
                  onChange={(e) => this.onchangInput(e, 'role')}
                >
                  {roles &&
                    roles.length > 0 &&
                    roles.map((item, index) => {
                      return (
                        <option selected key={index} value={item.keyMap}>
                          {item.valueEn}
                        </option>
                      );
                    })}
                </select>
              </div>
              <div className="col-3 containerDowloadFile">
                <div className="col-3 containerDowloadFileItem">
                  <input
                    type="file"
                    id="dowloadFile"
                    hidden
                    onChange={(e) => this.handleOnchangeFile(e)}
                  />
                  <label htmlFor="dowloadFile" className="DowloadFileContent">
                    Tải ảnh đại diện
                  </label>
                  <i class="fa fa-upload"></i>
                </div>
                {this.state.previewImg.length > 0 ? (
                  <>
                    <div
                      className="showImg"
                      style={{
                        backgroundImage: `url(${this.state.previewImg}`,
                      }}
                      onClick={() => this.setState({ isOpen: true })}
                    >
                      <span
                        className="deleteImg"
                        onClick={() => this.handleToDeleteImg()}
                      >
                        <i className="fa fa-trash deleteImg"></i>
                      </span>
                      {isOpen && (
                        <Lightbox
                          mainSrc={this.state.previewImg}
                          // nextSrc={images[(photoIndex + 1) % images.length]}
                          // prevSrc={
                          //   images[
                          //     (photoIndex + images.length - 1) % images.length
                          //   ]
                          // }
                          onCloseRequest={() =>
                            this.setState({ isOpen: false })
                          }
                          // onMovePrevRequest={() =>
                          //   this.setState({
                          //     photoIndex:
                          //       (photoIndex + images.length - 1) %
                          //       images.length,
                          //   })
                          // }
                          // onMoveNextRequest={() =>
                          //   this.setState({
                          //     photoIndex: (photoIndex + 1) % images.length,
                          //   })
                          // }
                        />
                      )}
                    </div>
                  </>
                ) : (
                  <div></div>
                )}
              </div>

              <div className="col-12">
                {this.state.action === 'EDIT' ? (
                  <button
                    className="btn btn-edit"
                    onClick={() => this.handleEditUser()}
                  >
                    Lưu thay đổi
                  </button>
                ) : (
                  <button
                    className="btn btn-primary"
                    onClick={() => this.handleSaveUser()}
                  >
                    Save
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
        <TableManageUser
          handleEditUserFromParentKey={this.handleEditUserFromParent}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    genderRedux: state.admin.gender,
    roleRedux: state.admin.roles,
    positionRedux: state.admin.position,
    isLoading: state.admin.isLoading,
    userRedux: state.admin.userRedux,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGenderStart: () => dispatch(actions.fetchGenderStart()),
    getPositionStart: () => dispatch(actions.fetchPositionStart()),
    getRoleStart: () => dispatch(actions.fetchRoleStart()),
    createNewUser: (data) => dispatch(actions.createNewUserRedux(data)),
    getUserStart: () => dispatch(actions.fetchAllUserStart()),
    editUserStart: (data) => dispatch(actions.editUserStart(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
