import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './userManage.scss';
import {
  deleteUserServices,
  getUser,
  createNewUser,
  editUser,
} from '../../services/userServices';
import ModalUser from './ModalUser';
import { invalid } from 'moment/moment';
import ModalEditUser from './ModalEditUser';
class UserManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrUser: [],
      isOpenModalUser: false,
      firstName: '',
      id: '',
      lastName: '',
      email: '',
      address: '',
      phoneNumber: '',
      password: '',
      flag: true,
      // isOpenModalEditUser={this.state.isOpenModalUser}
      //                   isStopModalEditUser
      isOpenModalEditUser: false,
      // isStopModalEditUser
      idUpdate: '',
      firstNameUpdate: '',
      lastNameUpdate: '',
      addressUpdate: '',
      phoneNumberUpdate: '',
    };
  }

  async componentDidMount() {
    let res = await getUser('ALL');

    if (res && res.errCode == 0) {
      this.setState({
        arrUser: res.users,
      });
    }
  }
  handleDeleteUser = async (id) => {
    let data = await deleteUserServices(id);
    if (data && data.errCode == 0) {
      this.setState({
        flag: !this.state.flag,
      });
    }
  };
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
  handleOnchangInput = (e, id) => {
    let coppyState = { ...this.state };
    coppyState[id] = e.target.value;
    this.setState({
      ...coppyState,
    });
  };
  handleOnchangInputUpdate = (e, id) => {
    let coppyState = { ...this.state };
    coppyState[id] = e.target.value;
    this.setState({
      ...coppyState,
    });
  };
  checkValideInput = () => {
    let arr = [
      'firstName',
      'lastName',
      'email',
      'address',
      'phoneNumber',
      'password',
    ];
    let invalid = true;
    for (let i = 0; i < arr.length; i++) {
      if (!this.state[arr[i]]) {
        invalid = false;
        alert('missing parameter' + ' ' + arr[i]);
        break;
      }
    }
    return invalid;
  };
  async componentDidUpdate(prevProps, prevState) {
    if (prevState.flag !== this.state.flag) {
      let data = await getUser('ALL');
      if (data && data.errCode == 0) {
        this.setState({
          arrUser: data.users,
        });
      }
    }
  }
  handleToAddUser = async () => {
    let check = this.checkValideInput();
    if (check) {
      let data = await createNewUser(
        this.state.firstName,
        this.state.lastName,
        this.state.email,
        this.state.address,
        this.state.phoneNumber,
        this.state.password
      );

      if (data && data.errCode == 0) {
        this.setState({
          flag: !this.state.flag,
          isOpenModalUser: false,
        });
      }
    }
  };
  handleOnClickToEditUser = (user) => {
    this.setState({
      isOpenModalEditUser: !this.state.isOpenModalEditUser,
      firstNameUpdate: user.firstName,
      lastNameUpdate: user.lastName,
      addressUpdate: user.address,
      phoneNumberUpdate: user.phoneNumber,
      idUpdate: user.id,
    });
  };
  handleToStopModalEditUser = () => {
    this.setState({ isOpenModalEditUser: !this.state.isOpenModalEditUser });
  };
  handleUpdateUser = async (id) => {
    await editUser({
      id: id,
      firstName: this.state.firstNameUpdate,
      lastName: this.state.lastNameUpdate,
      address: this.state.addressUpdate,
      phoneNumber: this.state.phoneNumberUpdate,
    });

    this.setState({ isOpenModalEditUser: !this.state.isOpenModalEditUser });
    let data = await getUser('ALL');
    if (data && data.errCode == 0) {
      this.setState({
        arrUser: data.users,
      });
    }
  };
  render() {
    return (
      <div className="container-manage-user">
        <ModalUser
          isOpenModal={this.state.isOpenModalUser}
          isStopModal={this.handleToStopModal}
          className="from-ceate-new-user"
        >
          <div className="container  ">
            <div className="row ">
              <div className="ml-5 ">
                <div className="col-12 mt-3">Create new user</div>
                <div className="form-row d-flex">
                  <div className="form-group col-6 p-2">
                    <label for="inputEmail4">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      name="mail"
                      placeholder="Email"
                      onChange={(e) => this.handleOnchangInput(e, 'email')}
                      value={this.state.email}
                    />
                  </div>
                  <div className="form-group col-6 p-2">
                    <label for="inputPassword4">Password</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Password"
                      onChange={(e) => this.handleOnchangInput(e, 'password')}
                      value={this.state.password}
                    />
                  </div>
                </div>
                <div className="form-row d-flex">
                  <div className="form-group col-6 p-2">
                    <label for="inputEmail4">FirstName</label>
                    <input
                      type="text"
                      className="form-control"
                      name="firstName"
                      placeholder="FirstName"
                      onChange={(e) => this.handleOnchangInput(e, 'firstName')}
                      value={this.state.firstName}
                    />
                  </div>
                  <div className="form-group col-md-6 p-2">
                    <label for="inputPassword4">LastName</label>
                    <input
                      type="text"
                      className="form-control"
                      name="lastName"
                      placeholder="LastName"
                      onChange={(e) => this.handleOnchangInput(e, 'lastName')}
                      value={this.state.lastName}
                    />
                  </div>
                </div>
                <div className="form-row d-flex">
                  <div className="form-group col-6 p-2">
                    <label for="inputEmail4">Phone Number</label>
                    <input
                      type="text"
                      className="form-control"
                      name="firstName"
                      placeholder="FirstName"
                      onChange={(e) =>
                        this.handleOnchangInput(e, 'phoneNumber')
                      }
                      value={this.state.phoneNumber}
                    />
                  </div>
                  <div className="form-group col-md-6 p-2">
                    <label for="inputPassword4">Address</label>
                    <input
                      type="text"
                      className="form-control"
                      name="lastName"
                      placeholder="LastName"
                      onChange={(e) => this.handleOnchangInput(e, 'address')}
                      value={this.state.address}
                    />
                  </div>
                </div>

                <div className="form-row d-flex mr-2">
                  <div className="form-group col-3">
                    <label for="inputState">Sex</label>
                    <select name="gender" className="form-control">
                      <option value="1">Man</option>
                      <option value="0">Women</option>
                    </select>
                  </div>
                  <div className="form-group col-3 ">
                    <label for="inputZip">Role</label>
                    <select name="roleId" className="form-control">
                      <option value="1">Admin</option>
                      <option value="2">Doctor</option>
                      <option value="3">Patient</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary mt-2 px-3"
                  onClick={() => this.handleToAddUser()}
                >
                  Add New
                </button>
              </div>
            </div>
          </div>
        </ModalUser>

        <h2 className="title-manage-user">MANAGER USER</h2>
        <div>
          <div
            className="container-add-new-user"
            onClick={() => this.handleOpenModal()}
          >
            {' '}
            <i className="fa fa-plus icon-add-new-user"></i>Add new user
          </div>
          <table>
            <thead>
              <tr>
                <th>Email</th>
                <th>FirstName</th>
                <th>LastName</th>

                <th>Address</th>
                <th>Action</th>
              </tr>
            </thead>
            {this.state.arrUser.map((user, index) => {
              return (
                <tbody key={index}>
                  <tr key={index}>
                    <td>{user.email}</td>
                    <td>{user.firstName}</td>
                    <td>{user.lastName}</td>

                    <td>{user.address}</td>
                    <td>
                      <ModalEditUser
                        isOpenModalEditUser={this.state.isOpenModalEditUser}
                        isStopModalEditUser={this.handleToStopModalEditUser}
                        className="from-ceate-new-user"
                      >
                        <div className="container  ">
                          <div className="row ">
                            <div className="ml-5 ">
                              <div className="col-12 mt-3">Create new user</div>
                              <div className="form-row d-flex"></div>
                              <div className="form-row d-flex">
                                <div className="form-group col-6 p-2">
                                  <label for="inputEmail4">FirstName</label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="firstName"
                                    placeholder="FirstName"
                                    onChange={(e) =>
                                      this.handleOnchangInputUpdate(
                                        e,
                                        'firstNameUpdate'
                                      )
                                    }
                                    value={this.state.firstNameUpdate}
                                  />
                                </div>
                                <div className="form-group col-md-6 p-2">
                                  <label for="inputPassword4">LastName</label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="lastName"
                                    placeholder="LastName"
                                    onChange={(e) =>
                                      this.handleOnchangInputUpdate(
                                        e,
                                        'lastNameUpdate'
                                      )
                                    }
                                    value={this.state.lastNameUpdate}
                                  />
                                </div>
                              </div>
                              <div className="form-row d-flex">
                                <div className="form-group col-6 p-2">
                                  <label for="inputEmail4">Phone Number</label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="firstName"
                                    placeholder="FirstName"
                                    onChange={(e) =>
                                      this.handleOnchangInputUpdate(
                                        e,
                                        'phoneNumberUpdate'
                                      )
                                    }
                                    value={this.state.phoneNumberUpdate}
                                  />
                                </div>
                                <div className="form-group col-md-6 p-2">
                                  <label for="inputPassword4">Address</label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="lastName"
                                    placeholder="LastName"
                                    onChange={(e) =>
                                      this.handleOnchangInputUpdate(
                                        e,
                                        'addressUpdate'
                                      )
                                    }
                                    value={this.state.addressUpdate}
                                  />
                                </div>
                                {/* <div className="form-group col-md-6 p-2">
                                  <label for="inputPassword4">id</label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="lastName"
                                    placeholder="LastName"
                                    onChange={(e) =>
                                      this.handleOnchangInputUpdate(
                                        e,
                                        'idUpdate'
                                      )
                                    }
                                    value={this.state.idUpdate}
                                  />
                                </div> */}
                              </div>

                              <div className="form-row d-flex mr-2">
                                <div className="form-group col-3">
                                  <label for="inputState">Sex</label>
                                  <select
                                    name="gender"
                                    className="form-control"
                                  >
                                    <option value="1">Man</option>
                                    <option value="0">Women</option>
                                  </select>
                                </div>
                                <div className="form-group col-3 ">
                                  <label for="inputZip">Role</label>
                                  <select
                                    name="roleId"
                                    className="form-control"
                                  >
                                    <option value="1">Admin</option>
                                    <option value="2">Doctor</option>
                                    <option value="3">Patient</option>
                                  </select>
                                </div>
                              </div>

                              <button
                                type="submit"
                                className="btn btn-primary mt-2 px-3"
                                onClick={() => this.handleUpdateUser(user.id)}
                              >
                                Save
                              </button>
                            </div>
                          </div>
                        </div>
                      </ModalEditUser>
                      <button
                        onClick={() => {
                          this.handleOnClickToEditUser(user);
                        }}
                      >
                        {' '}
                        <i className="fa fa-edit"></i>{' '}
                      </button>
                      <button onClick={() => this.handleDeleteUser(user.id)}>
                        {' '}
                        <i className="fa fa-trash"></i>{' '}
                      </button>
                    </td>
                  </tr>
                </tbody>
              );
            })}
          </table>
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
