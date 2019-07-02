import React, { Component } from 'react';
import { Label, FormGroup, Input, FormText } from 'reactstrap';
import Modal from '../Modal';

const ProductModal = props => (
  <Modal
    title={props.title}
    modal={props.modal}
    toggle={props.toggle}
    submit={props.submit}
  >
    <form>
      <FormGroup>
        <Label>Title</Label>
        <Input type='text' name='title' placeholder='Enter Product Title' />
      </FormGroup>
      <FormGroup>
        <Label>Unit Price</Label>
        <Input
          type='number'
          name='unitPrice'
          placeholder='Enter price of product'
        />
      </FormGroup>
      <FormGroup>
        <Label>Author</Label>
        <Input type='text' name='author' placeholder='Author name' />
      </FormGroup>
      <FormGroup>
        <Label>Series</Label>
        <Input type='text' name='series' placeholder='Series' />
      </FormGroup>
      <FormGroup>
        <Label>Paperback</Label>
        <Input type='text' name='paperback' placeholder='paperback size' />
      </FormGroup>
      <FormGroup>
        <Label>Description</Label>
        <Input
          type='textarea'
          name='description'
          placeholder='Description of product'
        />
      </FormGroup>
    </form>
  </Modal>
);

export default ProductModal;
