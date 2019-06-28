import React, { Component } from 'react';

class Modal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className='modal modal-default'>
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h2 className='modal-title'>New Product</h2>
            </div>
            <div className='modal-body'>
              <input placeholder='title' />
            </div>
            <div className='modal-footer' />
          </div>
        </div>
      </div>
    );
  }
}

export default Modal;
