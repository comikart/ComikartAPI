import React, { Component } from 'react';
import {
  Modal,
  ModalBody,
  ModalFooter,
  Button,
  Label,
  FormGroup,
  Input,
} from 'reactstrap';
import { connect } from 'react-redux';
import { createProduct } from '../../actions/productActions';

class ProductModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      unit_price: '',
      author: '',
      publisher: '',
      series: '',
      paperback: '',
      description: '',
    };
  }
  handleInput = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleSubmit = () => {
    this.props.toggle();
    this.props.createProduct(this.state);
  };
  render() {
    return (
      <Modal isOpen={this.props.modal} toggle={this.props.toggle}>
        <div className='modal-header'>
          <h4 className='modal-title' id='exampleModalLabel'>
            {this.props.title}
          </h4>
          <button
            type='button'
            className='close'
            aria-hidden='true'
            onClick={this.props.toggle}
          >
            <i className='tim-icons icon-simple-remove' />
          </button>
        </div>
        <ModalBody>
          <form>
            <FormGroup>
              <Label>Title</Label>
              <Input
                onChange={this.handleInput}
                type='text'
                name='title'
                placeholder='Enter Product Title'
              />
            </FormGroup>
            <FormGroup>
              <Label>Unit Price</Label>
              <Input
                onChange={this.handleInput}
                type='number'
                name='unit_price'
                placeholder='Enter price of product'
              />
            </FormGroup>
            <FormGroup>
              <Label>Author</Label>
              <Input
                onChange={this.handleInput}
                type='text'
                name='author'
                placeholder='Author name'
              />
            </FormGroup>
            <FormGroup>
              <Label>Publisher</Label>
              <Input
                onChange={this.handleInput}
                type='text'
                name='publisher'
                placeholder='Publisher Title'
              />
            </FormGroup>
            <FormGroup>
              <Label>Series</Label>
              <Input
                onChange={this.handleInput}
                type='text'
                name='series'
                placeholder='Series'
              />
            </FormGroup>
            <FormGroup>
              <Label>Paperback</Label>
              <Input
                onChange={this.handleInput}
                type='text'
                name='paperback'
                placeholder='paperback size'
              />
            </FormGroup>
            <FormGroup>
              <Label>Description</Label>
              <Input
                onChange={this.handleInput}
                type='textarea'
                name='description'
                placeholder='Description of product'
              />
            </FormGroup>
          </form>
        </ModalBody>
        <ModalFooter>
          <Button color='secondary' onClick={this.props.toggle}>
            Close
          </Button>
          <Button color='primary' onClick={this.handleSubmit}>
            Submit
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

export default connect(
  state => state,
  { createProduct },
)(ProductModal);
