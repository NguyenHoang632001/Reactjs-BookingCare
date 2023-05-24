import React, { Component } from 'react';
// import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './BookingModal.scss';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Label,
  Form,
  FormGroup,
} from 'reactstrap';
class BookingModal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {}
  toggle = () => {
    this.props.isStopModal();
  };

  render() {
    return (
      <div>
        <Modal
          isOpen={this.props.isOpenModal}
          size="lg"
          toggle={() => this.toggle()}
          className={'box-booking-modal'}
        >
          <ModalHeader toggle={() => this.toggle()}>
            THÔNG TIN ĐẶT LỊCH KHÁM BỆNH
          </ModalHeader>
          <ModalBody>{this.props.children}</ModalBody>
          <ModalFooter>
            <Button
              color="secondary"
              className="px-3 button-confirm"
              // onClick={() => this.toggle()}
            >
              xác nhận
            </Button>
            <Button
              color="secondary"
              className="px-3"
              onClick={() => this.toggle()}
            >
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
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

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
