import React from 'react';

import Layout from '../../components/Layout';

import { connect } from 'react-redux';

import { withRouter } from 'next/router';

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardText,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
} from 'reactstrap';

class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    if (!this.props.user) {
      this.props.router.push('/admin/login');
    }
  }
  render() {
    let email = '';
    let first_name = '';
    let last_name = '';

    if (this.props.user) {
      email = this.props.user.email;
      first_name = this.props.user.first_name;
      last_name = this.props.user.last_name;
    }
    return (
      <Layout>
        <div className='content'>
          <Row>
            <Col md='8'>
              <Card>
                <CardHeader>
                  <h5 className='title'>Edit Profile</h5>
                </CardHeader>
                <CardBody>
                  <Form>
                    <Row>
                      <Col className='pr-md-1' md='6'>
                        <FormGroup>
                          <label htmlFor='exampleInputEmail1'>
                            Email address
                          </label>
                          <Input
                            defaultValue={email}
                            placeholder='email address'
                            type='email'
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className='pr-md-1' md='6'>
                        <FormGroup>
                          <label>First Name</label>
                          <Input
                            defaultValue={first_name}
                            placeholder='Company'
                            type='text'
                          />
                        </FormGroup>
                      </Col>
                      <Col className='pl-md-1' md='6'>
                        <FormGroup>
                          <label>Last Name</label>
                          <Input
                            defaultValue={last_name}
                            placeholder='Last Name'
                            type='text'
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className='pr-md-1' md='6'>
                        <FormGroup>
                          <label>Password</label>
                          <Input placeholder='Enter new password' type='text' />
                        </FormGroup>
                      </Col>
                      <Col className='pl-md-1' md='6'>
                        <FormGroup>
                          <label> Confirm Password</label>
                          <Input
                            placeholder='type new password again'
                            type='text'
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </Form>
                </CardBody>
                <CardFooter>
                  <Button className='btn-fill' color='primary' type='submit'>
                    Save
                  </Button>
                </CardFooter>
              </Card>
            </Col>
            <Col md='4'>
              <Card className='card-user'>
                <CardBody>
                  <CardText />
                  <div className='author'>
                    <div className='block block-one' />
                    <div className='block block-two' />
                    <div className='block block-three' />
                    <div className='block block-four' />
                    <a href='#pablo' onClick={e => e.preventDefault()}>
                      <img
                        alt='...'
                        className='avatar'
                        src={require('../../static/img/anime3.png')}
                      />
                      <h5 className='title'>
                        {first_name} {last_name}
                      </h5>
                    </a>
                    <p className='description'>Admin</p>
                  </div>
                  <div className='card-description' />
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
  {},
)(withRouter(UserProfile));
