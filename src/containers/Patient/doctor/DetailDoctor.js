import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeHeader from '../../HomePage/HomeHeader';
import * as actions from '../../../store/actions';
import './DetailDoctor.scss';
import DoctorSchedule from './DoctorSchedule';
import DoctorExtrainFor from './doctorExtrainFor';
import BookingModal from './Modal/BookingModal';
import Footer from '../../Footer/Footer';
const handleImage = (imgBuffer) => {
  return new Buffer(imgBuffer, 'base64').toString('binary');
};

class DetailDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrDoctor: [],
      detailDoctor: '',
      isOpenModalUser: false,
    };
  }

  async componentDidMount() {
    await this.props.getDetailDoctor(this.props.match.params.id);
  }
  componentDidUpdate(prevprops, prevState, snapshot) {
    if (prevprops.detailDoctor !== this.props.detailDoctor) {
      this.setState({
        detailDoctor: this.props.detailDoctor,
      });
    }
  }

  render() {
    let contentMarkdown = this.state.detailDoctor?.Markdown?.contentHTML;

    return (
      <div>
        <HomeHeader isShowBanner={false} />
        <div className="container-detail-doctor">
          <div className="box-title">
            {this.state.detailDoctor?.image && (
              <div
                className="box-img-doctor"
                style={{
                  backgroundImage: `url(${handleImage(
                    this.state.detailDoctor.image
                  )})`,
                }}
              ></div>
            )}
            {this.state.detailDoctor && (
              <div className="detail-doctor">
                <div className="detail-name-doctor">
                  {this.state.detailDoctor.positionData.valueVn}{' '}
                  {this.state.detailDoctor.firstName}{' '}
                  {this.state.detailDoctor.lastName}
                </div>
                <div className="detail-description-doctor">
                  {this.state.detailDoctor.Markdown.description}
                </div>
              </div>
            )}
          </div>
          {this.state.detailDoctor && this.state.detailDoctor.id ? (
            <div className="doctor-schedule">
              <DoctorSchedule
                doctorId={this.state.detailDoctor.id}
                detailDoctor={this.state.detailDoctor}
              />
              {this.state.detailDoctor.id && (
                <DoctorExtrainFor doctorId={this.state.detailDoctor.id} />
              )}
            </div>
          ) : (
            <div></div>
          )}

          <div className="markdown">
            <div dangerouslySetInnerHTML={{ __html: contentMarkdown }} />
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    DetailDoctorMenuPath: state.app.DetailDoctorMenuPath,
    isLoggedIn: state.user.isLoggedIn,
    detailDoctor: state.admin.detailDoctor,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getDetailDoctor: (id) => dispatch(actions.fetchDetailDoctor(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
