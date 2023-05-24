import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import * as actions from '../../store/actions';
import './Login.scss';
import { handleLoginUser } from '../../services/userServices';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      passWord: '',
      showPassword: true,
      errMessage: '',
    };
  }
  handleOnchangUserName = (e) => {
    this.setState({
      userName: e.target.value,
    });
  };
  handleOnchangPassword = (e) => {
    this.setState({
      passWord: e.target.value,
    });
  };
  handleShowpassWord = () => {
    this.setState({
      showPassword: !this.state.showPassword,
    });
  };
  handleOnclickSubmit = async () => {
    this.setState({
      errMessage: '',
    });

    try {
      const res = await handleLoginUser(
        this.state.userName,
        this.state.passWord
      );
      if (res && res.errCode !== 0) {
        this.setState({
          errMessage: res.errMessage,
        });
      }
      if (res && res.errCode == 0) {
        this.props.userLoginSuccess(res.user);
      }
    } catch (error) {
      // console.log('check erro',error.response)

      if (error.response.data) {
        if (error.response.data) {
          this.setState({
            errMessage: error.response.data.errMessage,
          });
        }
      }
    }
  };

  handleForgotPassword = () => {
    alert('forgot password');
  };
  handleToEnter = (e) => {
    if ((e.key = 'Enter')) {
      this.handleOnclickSubmit();
    }
  };

  render() {
    // const { username, password, loginError } = this.state;
    // const { lang } = this.props;
    // console.log("chcek erro message",this.state.errMessage)
    return (
      <div className="container-login">
        <div className="form-login">
          <h2 className="title-login">Login Form</h2>
          <div className="form-input">
            <label>UserName</label>
            <input
              type="text"
              className="input-login"
              value={this.state.userName}
              onChange={(e) => {
                this.handleOnchangUserName(e);
              }}
            />
          </div>
          <div className="form-input">
            <label>Password</label>
            <input
              type={this.state.showPassword == false ? 'password' : 'text'}
              className="input-login"
              value={this.state.passWord}
              onChange={(e) => {
                this.handleOnchangPassword(e);
              }}
              onKeyDown={(e) => this.handleToEnter(e)}
            />

            <i
              className={
                this.state.showPassword == false
                  ? 'fa fa-eye-slash showPasword'
                  : 'fa fa-eye showPasword'
              }
              onClick={() => this.handleShowpassWord()}
            ></i>
          </div>
          <h3 className="notiauthen">{this.state.errMessage}</h3>

          <button
            className="login-button"
            onClick={() => {
              this.handleOnclickSubmit();
            }}
          >
            Login
          </button>
          <h3
            className="forgot-password"
            onClick={() => {
              this.handleForgotPassword();
            }}
          >
            forgot password
          </h3>
        </div>
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
    navigate: (path) => dispatch(push(path)),
    // adminLoginSuccess: (adminInfo) => dispatch(actions.adminLoginSuccess(adminInfo)),
    // userLoginFail: () => dispatch(actions.adminLoginFail()),
    userLoginSuccess: (userInfo) =>
      dispatch(actions.userLoginSuccess(userInfo)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
