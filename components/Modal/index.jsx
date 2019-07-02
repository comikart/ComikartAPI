import React, { Component } from 'react';
import {
  Modal as BootModal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from 'reactstrap';

class Modal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <BootModal
        isOpen={this.props.modal}
        toggle={this.props.toggle}
        className=''
      >
        <ModalHeader toggle={this.props.toggle}>
          <h2 className='modal-title'>{this.props.title}</h2>
        </ModalHeader>
        <ModalBody>{this.props.children}</ModalBody>
        <ModalFooter>
          <Button color='secondary' onClick={this.props.toggle}>
            Close
          </Button>
          {this.props.submit ? (
            <Button color='primary' onClick={this.props.submit}>
              Submit
            </Button>
          ) : null}
        </ModalFooter>
      </BootModal>
    );
  }
}

export default Modal;
