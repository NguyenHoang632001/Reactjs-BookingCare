import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HandBook.scss';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import camnang from '../../../assets/camnang.jpg';
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
class HandBook extends Component {
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
      slidesToShow: 2,
      slidesToScroll: 1,
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />,
    };
    return (
      <div className="section-HandBook">
        <h2 className="title-HandBook">Cẩm nang</h2>
        <button className="see-more">
          {' '}
          <FormattedMessage id="homepage.more" />
        </button>
        <div className="HandBook-content">
          <Slider {...settings}>
            <div className="item-img">
              <div className="container-item-img">
                {' '}
                <img src={camnang} className="img" />
                <h3>Nguyên nhân và cách trị mụn ẩn trên trán tại nhà</h3>
              </div>
            </div>
            <div className="item-img">
              <div className="container-item-img">
                {' '}
                <img src={camnang} className="img" />
                <h3>Trịnh Đạt</h3>
              </div>
            </div>
            <div className="item-img">
              <div className="container-item-img">
                {' '}
                <img src={camnang} className="img" />
                <h3>Nguyễn Quang Hùng</h3>
              </div>
            </div>
            <div className="item-img">
              <div className="container-item-img">
                {' '}
                <img src={camnang} className="img" />
                <h3>Đỗ Thị Dương</h3>
              </div>
            </div>
            <div className="item-img">
              <div className="container-item-img">
                {' '}
                <img src={camnang} className="img" />
                <h3>Trần Trọng Khải</h3>
              </div>
            </div>
            <div className="item-img">
              <div className="container-item-img">
                {' '}
                <img src={camnang} className="img" />
                <h3>Nguyễn Tuấn</h3>
              </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(HandBook);
