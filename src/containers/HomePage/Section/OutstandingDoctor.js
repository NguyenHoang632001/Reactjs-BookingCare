import React, { Component } from 'react';
import { connect } from 'react-redux';
import './OutstandingDoctor.scss';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { LANGUAGES } from '../../../utils';
import img1 from '../../../assets/img1.jpg';
import * as actions from '../../../store/actions';
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router';
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
class OutstandingDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrDoctor: [],
      detailDoctor: '',
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
  componentDidUpdate(prevprops, prevState, snapshot) {
    if (prevprops.topDoctors !== this.props.topDoctors) {
      this.setState({
        arrDoctor: this.props.topDoctors,
      });
    }
  }
  componentDidMount() {
    this.props.loadTopDoctors();
  }
  handleToDetailDoctor = (id) => {
    // this.props.getDetailDoctor(id);
    this.props.history.push(`/detail-doctor/${id}`);
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
    let settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 2,
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />,
    };
    let language = this.props.language;
    console.log(this.props.topDoctors);
    console.log('after', this.removeDuplicates(this.props.topDoctors));
    return (
      <div className="section-OutstandingDoctor">
        <h2 className="title-OutstandingDoctor">
          <FormattedMessage id="homepage.outStanding-doctor" />
        </h2>
        <button className="see-more">
          <FormattedMessage id="homepage.more" />
        </button>
        <div className="OutstandingDoctor-content">
          <Slider {...settings}>
            {this.state.arrDoctor &&
              this.state.arrDoctor.length > 0 &&
              this.removeDuplicates(this.props.topDoctors).map((item) => {
                let imageBase64 = '';
                if (item.image) {
                  imageBase64 = new Buffer(item.image, 'base64').toString(
                    'binary'
                  );
                }

                let nameVi = `${item.positionData.valueVn},${item.firstName} ${item.lastName}`;
                let nameEn = `${item.positionData.valueEn},${item.firstName} ${item.lastName}`;
                return (
                  <div
                    className="item-img"
                    onClick={() => this.handleToDetailDoctor(item.id)}
                  >
                    <div className="container-item-img">
                      {' '}
                      {/* <img src={imageBase64} className="img" /> */}
                      <div
                        className="img"
                        style={{ backgroundImage: `url(${imageBase64})` }}
                      ></div>
                      <h3>{language === LANGUAGES.VI ? nameVi : nameEn}</h3>
                      <div>Cơ xương khớp</div>
                    </div>
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
  return {
    topDoctors: state.admin.topDoctors,
    detailDoctor: state.admin.detailDoctor,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadTopDoctors: () => dispatch(actions.fetchTopDoctors()),
    getDetailDoctor: (id) => dispatch(actions.fetchDetailDoctor(id)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(OutstandingDoctor)
);
