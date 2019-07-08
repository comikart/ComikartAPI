import React, { Component } from 'react';
import Layout from '../../components/Layout';
import { Card, CardHeader, CardBody, CardTitle, Table } from 'reactstrap';
import { getOrders } from '../../actions/orderActions';
import { connect } from 'react-redux';

class Orders extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    this.props.getOrders();
  }
  render() {
    let table = <p>No Orders Available.</p>;
    if (this.props.orders) {
      table = (
        <Table className='table table-hover' responsive>
          <thead className='text-primary'>
            <tr>
              <th>email</th>
              <th>address</th>
              <th>City</th>
              <th>State</th>
              <th className='text-center'>status</th>
            </tr>
          </thead>
          <tbody>
            {this.props.orders.map((e, i) => (
              <tr key={e.id + i}>
                <td>{e.email}</td>
                <td>{e.address_one}</td>
                <td>{e.city}</td>
                <td>{e.state}</td>
                <td className='text-center'>{e.status}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      );
    }
    return (
      <Layout>
        <div className='content'>
          <Card>
            <CardHeader>
              <CardTitle tag='h4'>Orders</CardTitle>
            </CardHeader>
            <CardBody>{table}</CardBody>
          </Card>
        </div>
      </Layout>
    );
  }
}

export default connect(
  state => state,
  { getOrders },
)(Orders);
