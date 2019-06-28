import React, { Component, Fragment } from 'react';
import Layout from '../../components/Layout';
import { connect } from 'react-redux';
import { withRouter } from 'next/router';
import { getProducts } from '../../actions/productActions';

import Modal from '../../components/Modal';

// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
  Button,
  ButtonGroup,
} from 'reactstrap';

class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {
      renderModal: true,
    };
  }
  componentDidMount() {
    if (!this.props.user) this.props.router.push('/admin/login');
    if (!this.props.products) {
      this.props.getProducts();
    }
  }
  render() {
    let products = <h2>No products available.</h2>;
    if (this.props.products && this.props.products.length > 0) {
      products = (
        <Table className='table table-striped' responsive>
          <thead className='text-primary'>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Author</th>
              <th>Publisher</th>
              <th>Unit Price</th>
              <th>discontinued</th>
              <th className='text-center'>Update</th>
            </tr>
          </thead>
          <tbody>
            {this.props.products.map((product, i) => (
              <tr key={product.title + i}>
                <td>{product.id}</td>
                <td>{product.title}</td>
                <td>{product.author}</td>
                <td>{product.publisher}</td>
                <td>$ {product.unit_price}</td>
                <td>{`${this.props.products[0].is_discontinued}`}</td>
                <td className='text-center'>
                  <ButtonGroup>
                    <Button className='btn btn-link mr-2'>Edit</Button>
                    <Button className='btn btn-link'>Delete</Button>
                  </ButtonGroup>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      );
    }
    return (
      <Layout>
        <div className='content'>
          {/* {this.state.renderModal ? <Modal /> : null} */}
          <Row>
            <Col md='12'>
              <Card>
                <CardHeader>
                  <CardTitle tag='h4'>Products</CardTitle>
                  <button
                    type='button'
                    className='btn btn-primary'
                    data-toggle='modal'
                    data-target='#exampleModal3'
                  >
                    Add Product
                  </button>
                </CardHeader>
                <CardBody>{products}</CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </Layout>
    );
  }
}

export default connect(
  state => state,
  { getProducts },
)(withRouter(Products));
