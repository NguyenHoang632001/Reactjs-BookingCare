import React, { Component } from 'react';
import { connect } from 'react-redux';
import './MedicalFacility.scss';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import coso from '../../../assets/coso.jpg';
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
class MedicalFacility extends Component {
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
      slidesToShow: 4,
      slidesToScroll: 1,
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />,
    };
    return (
      <div className="section-medicalFacility">
        <h2 className="title-medicalFacility">Cơ sở y tế nổi bật</h2>
        <button className="see-more">
          {' '}
          <FormattedMessage id="homepage.more" />
        </button>
        <div className="medicalFacility-content">
          <Slider {...settings}>
            <div className="item-img">
              <img src={coso} className="img" />
              <h3>Bệnh viện hữu nghị Việt Đức</h3>
            </div>
            <div className="item-img">
              <img src={coso} className="img" />
              <h3>Bệnh viện Chợ Rẫy</h3>
            </div>
            <div className="item-img">
              <img src={coso} className="img" />
              <h3>Bệnh viện Bồng Sơn</h3>
            </div>
            <div className="item-img">
              <img src={coso} className="img" />
              <h3>Bệnh viện mắt Thủ Đức</h3>
            </div>
            <div className="item-img">
              <img src={coso} className="img" />
              <h3>Bệnh viện Nhi Đồng</h3>
            </div>
            <div className="item-img">
              <img src={coso} className="img" />
              <h3>Bệnh viện Trung Ương</h3>
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

export default connect(mapStateToProps, mapDispatchToProps)(MedicalFacility);
