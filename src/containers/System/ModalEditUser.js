import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
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
class ModalEditUer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}
  toggle = () => {
    this.props.isStopModalEditUser();
  };

  render() {
    return (
      <div>
        <Modal
          isOpen={this.props.isOpenModalEditUser}
          toggle={() => this.toggle()}
          size="lg"
          className={this.props.className}
        >
          <ModalHeader toggle={() => this.toggle()}>Modal title</ModalHeader>
          <ModalBody>{this.props.children}</ModalBody>
          <ModalFooter>
            {/* <Button color="primary" onClick={()=>this.toggle()}>
                  Do Something
                </Button>{' '} */}
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUer);
