import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeHeader from './HomeHeader';
import Specialty from './Section/Specialty';
import './HomePage.scss';
import MedicalFacility from './Section/MedicalFacility';
import OutstandingDoctor from './Section/OutstandingDoctor';
import HandBook from './Section/HandBook';
import About from './Section/About';
import Footer from '../Footer/Footer';
class HomePage extends Component {
  render() {
    return (
      <div className="container-homepage">
        <HomeHeader isShowBanner={true} />
        <Specialty />

        <MedicalFacility />
        <OutstandingDoctor />
        <HandBook />
        <About />

        <Footer></Footer>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
