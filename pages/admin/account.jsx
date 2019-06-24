import React from 'react';

import Layout from '../../components/Layout';

import { connect } from 'react-redux';

import { withRouter } from 'next/router';

import { updateUser } from '../../actions/userActions';

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
    this.state = this.props.user
      ? {
          isChanged: false,
          email: this.props.user.email,
          first_name: this.props.user.first_name,
          last_name: this.props.user.last_name,
          password: '',
          passwordTwo: '',
        }
      : {
          isChange: false,
          email: '',
          first_name: '',
          last_name: '',
          password: '',
          passwordTwo: '',
        };
  }
  componentDidMount() {
    if (!this.props.user) {
      this.props.router.push('/admin/login');
    }
  }
  handleInput = e => {
    this.setState({
      [e.target.name]: e.target.value,
      isChanged: true,
    });
  };
  handleUpdate = () => {
    const { first_name, last_name, email, password, passwordTwo } = this.state;
    const update = {};
    if (email && email !== this.props.user.email) {
      update.email = email;
    }
    if (first_name && first_name !== this.props.user.first_name) {
      update.first_name = first_name;
    }
    if (last_name && last_name !== this.props.user.last_name) {
      update.last_name = last_name;
    }
    if (password) {
      if (password === passwordTwo) {
        update.password = password;
      }
    }

    this.setState(
      { isChanged: false, password: '', passwordTwo: '' },
      this.props.updateUser(update),
    );
  };
  render() {
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
                            defaultValue={this.state.email}
                            placeholder='email address'
                            type='email'
                            name='email'
                            onChange={this.handleInput}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className='pr-md-1' md='6'>
                        <FormGroup>
                          <label>First Name</label>
                          <Input
                            defaultValue={this.state.first_name}
                            placeholder='Company'
                            type='text'
                            name='first_name'
                            onChange={this.handleInput}
                          />
                        </FormGroup>
                      </Col>
                      <Col className='pl-md-1' md='6'>
                        <FormGroup>
                          <label>Last Name</label>
                          <Input
                            defaultValue={this.state.last_name}
                            placeholder='Last Name'
                            type='text'
                            name='last_name'
                            onChange={this.handleInput}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className='pr-md-1' md='6'>
                        <FormGroup>
                          <label>New Password</label>
                          <Input
                            placeholder='Enter new password'
                            type='password'
                            name='password'
                            onChange={this.handleInput}
                          />
                        </FormGroup>
                      </Col>
                      <Col className='pl-md-1' md='6'>
                        <FormGroup>
                          <label> Confirm Password</label>
                          <Input
                            placeholder='type new password again'
                            type='password'
                            name='passwordTwo'
                            onChange={this.handleInput}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </Form>
                </CardBody>
                <CardFooter>
                  {this.state.isChanged ? (
                    <Button
                      onClick={this.handleUpdate}
                      className='btn-fill'
                      color='primary'
                      type='submit'
                    >
                      Save
                    </Button>
                  ) : null}
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
                        {this.state.first_name} {this.state.last_name}
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
  { updateUser },
)(withRouter(UserProfile));
