import React, { Component, Fragment } from 'react';
import Layout from '../../components/Layout';
import { connect } from 'react-redux';
import { withRouter } from 'next/router';
import { getProducts } from '../../actions/productActions';

// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
} from 'reactstrap';

class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    if (!this.props.products) {
    }
  }
  render() {
    const products = <h2>No products available.</h2>;
    if (this.props.products && this.props.products.length > 0) {
      products = (
        <Fragment>
          <thead className='text-primary'>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Unit Price</th>
              <th>Category</th>
              <th>Is Discontinued</th>
              <th>discontinued</th>
            </tr>
          </thead>
          <tbody>{products}</tbody>
        </Fragment>
      );
    }
    return (
      <Layout>
        <div className='content'>
          <Row>
            <Col md='12'>
              <Card>
                <CardHeader>
                  <CardTitle tag='h4'>Products</CardTitle>
                </CardHeader>
                <CardBody>
                  <Table className='tablesorter' responsive>
                    {products}
                  </Table>
                </CardBody>
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
