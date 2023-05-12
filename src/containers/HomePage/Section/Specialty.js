import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Specialty.scss';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import img1 from '../../../assets/img1.jpg';
import { FormattedMessage } from 'react-intl';
function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: 'block',
        background: '#eee',
        width: '26px',
        height: '26px',
        borderRadius: '50%',
      }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: 'block',

        background: '#eee',
        // borderRadius: '50%',
        width: '26px',
        height: '26px',
        borderRadius: '50%',
      }}
      onClick={onClick}
    />
  );
}
class Specialty extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  handleToChangLanguage = (language) => {
    if (language == 'vi') {
      this.setState({
        activeLanguage: 'vi',
      });
    } else {
      this.setState({
        activeLanguage: 'en',
      });
    }
  };

  render() {
    let settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 5,
      slidesToScroll: 1,
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />,
    };
    return (
      <div className="section-specialty">
        <h2 className="title-specialty">Chuyên khoa phổ biến</h2>
        <button className="see-more">
          {' '}
          <FormattedMessage id="homepage.more" />
        </button>
        <div className="specialty-content">
          <Slider {...settings}>
            <div className="item-img">
              <img src={img1} className="img" />
              <h3>Cơ xương khớp</h3>
            </div>
            <div className="item-img">
              <img src={img1} className="img" />
              <h3>Thần kinh</h3>
            </div>
            <div className="item-img">
              <img src={img1} className="img" />
              <h3>Tiêu hóa</h3>
            </div>
            <div className="item-img">
              <img src={img1} className="img" />
              <h3>Tim mạch</h3>
            </div>
            <div className="item-img">
              <img src={img1} className="img" />
              <h3>Tai mũi họng</h3>
            </div>
            <div className="item-img">
              <img src={img1} className="img" />
              <h3>Cột sống</h3>
            </div>
          </Slider>
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

export default connect(mapStateToProps, mapDispatchToProps)(Specialty);
