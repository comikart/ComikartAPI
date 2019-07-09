import React, { Component, Fragment } from 'react';
import Layout from '../../components/Layout';
import { connect } from 'react-redux';
import { withRouter } from 'next/router';
import { getProducts, deleteProduct } from '../../actions/productActions';

import ProductModal from '../../components/ProductModal';

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

const init = {
  title: '',
  unit_price: '',
  author: '',
  publisher: '',
  series: '',
  paperback: '',
  description: '',
};

class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      edit: false,
      product: { ...init },
    };
  }
  toggle = () => {
    this.setState(prevState => ({
      modal: !prevState.modal,
      edit: false,
      product: { ...init },
    }));
  };
  handleUpdate = product => {
    this.setState({ modal: true, edit: true, product });
  };
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
              <th>Discontinued</th>
              <th className='text-center'>Actions</th>
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
                  <Button
                    className='btn-icon btn-round'
                    color='success'
                    size='sm'
                    onClick={() => this.handleUpdate(product)}
                  >
                    <i className='tim-icons icon-pencil' />
                  </Button>
                  {` `}
                  <Button
                    className='btn-icon btn-round'
                    color='danger'
                    size='sm'
                    onClick={() => this.props.deleteProduct(product.id)}
                  >
                    <i className='tim-icons icon-simple-remove' />
                  </Button>
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
          {this.state.modal ? (
            <ProductModal
              modal={this.state.modal}
              toggle={this.toggle}
              edit={this.state.edit}
              product={this.state.product}
            />
          ) : null}
          <Row>
            <Col md='12'>
              <Card>
                <CardHeader>
                  <CardTitle tag='h4'>Products</CardTitle>
                  <button
                    type='button'
                    className='btn btn-primary'
                    onClick={this.toggle}
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
  { getProducts, deleteProduct },
)(withRouter(Products));
