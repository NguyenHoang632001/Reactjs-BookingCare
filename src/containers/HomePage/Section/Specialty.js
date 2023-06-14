import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Specialty.scss';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import img1 from '../../../assets/img1.jpg';
import { FormattedMessage } from 'react-intl';
import { getAllSpecialty } from '../../../services/userServices';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';

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
    this.state = {
      allSpecialty: '',
      selectedIdSpeacialty: '',
    };
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

  handleImg = (imgBuffer) => {
    let img = '';
    img = new Buffer(imgBuffer, 'base64').toString('binary');
  };
  async componentDidMount() {
    let data = await getAllSpecialty();
    if (data && data.errCode === 0) {
      console.log('data specialtu', data);
      this.setState({
        allSpecialty: data.data,
      });
    }
  }
  // history = useHistory();
  handleToDetailSpecialty = (id) => {
    this.props.history.push(`/detail-specialty/${id}`);
  };
  render() {
    let settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />,
    };
    console.log('this.state.data', this.state.selectedIdSpeacialty);
    return (
      <div className="section-specialty">
        <h2 className="title-specialty">Chuyên khoa phổ biến</h2>
        <button className="see-more">
          {' '}
          <FormattedMessage id="homepage.more" />
        </button>
        <div className="specialty-content">
          <Slider {...settings}>
            {this.state.allSpecialty &&
              this.state.allSpecialty.length > 0 &&
              this.state.allSpecialty.map((item, index) => {
                let imageBase64 = '';
                if (item.image) {
                  imageBase64 = new Buffer(item.image, 'base64').toString(
                    'binary'
                  );
                }

                return (
                  // <Link className="item-img" to="/detail-specialty/2">
                  <div
                    className="item-img"
                    to={`/detail-specialty/${this.state.selectedIdSpeacialty}`}
                    onClick={() => this.handleToDetailSpecialty(item.id)}
                  >
                    <div
                      className="img"
                      style={{ backgroundImage: `url(${imageBase64})` }}
                    ></div>
                    <h3>{item.name}</h3>
                  </div>
                );
              })}
          </Slider>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log('state', state);
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Specialty)
);
