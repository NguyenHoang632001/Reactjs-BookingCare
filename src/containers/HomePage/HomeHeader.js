import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl'; // dùng để chuyển đổi ngôn ngữ
import './HomeHeader.scss';
import { LANGUAGES } from '../../utils';
import { changeLanguageApp } from '../../store/actions';
import Specialty from './Section/Specialty';

class HomeHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeLanguage: 'vi',
    };
  }
  handleToChangLanguage = (language) => {
    this.props.changeLanguageAppRedux(language);
  };
  render() {
    const { processLogout, language } = this.props;
    return (
      <div className="home-container">
        <div className="home-header-container">
          <div className="home-header-content">
            <div className="left-content">
              <i className="fa fa-bars header-menu"></i>
              <div className="header-logo"></div>
            </div>
            <div className="center-content">
              <div className="primary-content">
                <h2 className="title-content">
                  {' '}
                  <FormattedMessage id="home-header.specialty" />
                </h2>
                <span className="discription-content">
                  <FormattedMessage id="home-header.search-doctor" />
                </span>
              </div>
              <div className="primary-content">
                <h2 className="title-content">
                  <FormattedMessage id="home-header.Health facility" />
                </h2>
                <span className="discription-content">
                  <FormattedMessage id="home-header.Choose hospital clinic" />
                </span>
              </div>
              <div className="primary-content">
                <h2 className="title-content">
                  <FormattedMessage id="home-header.Doctor" />
                </h2>
                <span className="discription-content">
                  <FormattedMessage id="home-header.Choose a good doctor" />
                </span>
              </div>
              <div className="primary-content">
                <h2 className="title-content">
                  <FormattedMessage id="home-header.Medical examination package" />{' '}
                </h2>
                <span className="discription-content">
                  <FormattedMessage id="home-header.General health" />
                </span>
              </div>
            </div>
            <div className="right-content">
              {/* <FontAwesomeIcon icon="fa-regular fa-circle-question" /> */}
              <div>
                <i className="fa fa-question right-content-question"></i>
                <span className="right-content-title">
                  {' '}
                  <FormattedMessage id="home-header.Help" />
                </span>
              </div>
              <div className="language">
                <button
                  className={language === LANGUAGES.VI ? 'btn active' : 'btn'}
                  onClick={() => this.handleToChangLanguage(LANGUAGES.VI)}
                >
                  {LANGUAGES.VI}
                </button>
                <button
                  className={language === LANGUAGES.EN ? 'btn active' : 'btn'}
                  onClick={() => this.handleToChangLanguage(LANGUAGES.EN)}
                >
                  {LANGUAGES.EN}
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="header-home-banner">
          <h1 className="title1">
            <FormattedMessage id="home-header.PLATFORM OF HEALTHCARE" />
          </h1>
          <h2 className="title2">
            <FormattedMessage id="home-header.HOLISTIC HEALTHCARE" />
          </h2>
          <div className="banner-search">
            <div className="box-search">
              <i className="fa fa-search search-icon"></i>
              <input
                className="search-input-banner"
                placeholder={
                  <FormattedMessage id="home-header.Find a general health check-up package" />
                }
              ></input>
            </div>
          </div>
          <div className="banner-options">
            <div className="option-child">
              <i className="far fa-hospital icon-child-banner"></i>
              <span className="text-child">
                {' '}
                <FormattedMessage id="home-header.Specialist examination" />{' '}
              </span>
            </div>
            <div className="option-child">
              <i className="fas fa-mobile icon-child-banner"></i>
              <span className="text-child">
                <FormattedMessage id="home-header.Remote consultation" />
              </span>
            </div>
            <div className="option-child">
              <i className="fas fa-procedures icon-child-banner"></i>
              <span className="text-child">
                <FormattedMessage id="home-header.General health check-up" />
              </span>
            </div>
            <div className="option-child">
              <i className="far fa-hospital icon-child-banner"></i>
              <span className="text-child">
                <FormattedMessage id="home-header.Medical test" />
              </span>
            </div>
            <div className="option-child">
              <i className="far fa-hospital icon-child-banner"></i>
              <span className="text-child">
                <FormattedMessage id="home-header.Mental health" />
              </span>
            </div>
            <div className="option-child">
              <i className="far fa-hospital icon-child-banner"></i>
              <span className="text-child">
                <FormattedMessage id="home-header.Dental check-up" />
              </span>
            </div>
            <div className="option-child">
              <i className="far fa-hospital icon-child-banner"></i>
              <span className="text-child">
                <FormattedMessage id="home-header.Surgical package" />
              </span>
            </div>
            <div className="option-child">
              <i className="far fa-hospital icon-child-banner"></i>
              <span className="text-child">
                <FormattedMessage id="home-header.Medical products" />
              </span>
            </div>
            <div className="option-child">
              <i className="far fa-hospital icon-child-banner"></i>
              <span className="text-child">
                <FormattedMessage id="home-header.Full health examination" />
              </span>
            </div>
          </div>
        </div>
        {/* <Specialty /> */}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
    userInfo: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
