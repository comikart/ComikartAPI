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
import { createProduct, updateProduct } from '../../actions/productActions';

class ProductModal extends Component {
  constructor(props) {
    super(props);
    this.state = this.props.product;
  }
  handleInput = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleSubmit = () => {
    const { id } = this.state;
    this.props.toggle();
    this.props.edit
      ? this.props.updateProduct(id, this.state)
      : this.props.createProduct(this.state);
  };
  render() {
    return (
      <Modal isOpen={this.props.modal} toggle={this.props.toggle}>
        <div className='modal-header'>
          <h4 className='modal-title'>
            {this.props.edit ? 'Update Product' : 'New Product'}
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
                value={this.state.title || ''}
                placeholder='Enter Product Title'
              />
            </FormGroup>
            <FormGroup>
              <Label>Unit Price</Label>
              <Input
                onChange={this.handleInput}
                type='number'
                name='unit_price'
                value={this.state.unit_price || ''}
                placeholder='Enter price of product'
              />
            </FormGroup>
            <FormGroup>
              <Label>Author</Label>
              <Input
                onChange={this.handleInput}
                type='text'
                name='author'
                value={this.state.author || ''}
                placeholder='Author name'
              />
            </FormGroup>
            <FormGroup>
              <Label>Publisher</Label>
              <Input
                onChange={this.handleInput}
                type='text'
                name='publisher'
                value={this.state.publisher || ''}
                placeholder='Publisher Title'
              />
            </FormGroup>
            <FormGroup>
              <Label>Series</Label>
              <Input
                onChange={this.handleInput}
                type='text'
                name='series'
                value={this.state.series || ''}
                placeholder='Series'
              />
            </FormGroup>
            <FormGroup>
              <Label>Paperback</Label>
              <Input
                onChange={this.handleInput}
                type='text'
                name='paperback'
                value={this.state.paperback || ''}
                placeholder='paperback size'
              />
            </FormGroup>
            <FormGroup>
              <Label>Description</Label>
              <Input
                onChange={this.handleInput}
                type='textarea'
                name='description'
                value={this.state.description || ''}
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
  { createProduct, updateProduct },
)(ProductModal);
