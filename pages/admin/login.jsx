import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'next/router';
import { login } from '../../actions/userActions';

// styles
import '../../static/scss/black-dashboard-react.scss';

// reactstrap components
import {
  Button,
  ButtonGroup,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Label,
  FormGroup,
  Input,
  Row,
  Col,
} from 'reactstrap';

const EMAIL = 'admin@email.com';
const PASSWORD = 'password';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: EMAIL,
      password: PASSWORD,
    };
  }
  handleSubmit = () => {
    const form = this.state;
    this.props.login(form);
  };
  handleInput = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value.length > 0 ? value : name === 'email' ? EMAIL : PASSWORD,
    });
  };
  componentDidUpdate() {
    if (this.props.user) {
      this.props.router.push('/admin/dashboard');
    }
  }
  render() {
    return (
      <div
        className='container-fluid d-flex align-items-center justify-content-center'
        style={{ minHeight: '100vh' }}
      >
        <Row className='w-100 justify-content-center'>
          <div className='col-lg-3 col-md-6 col-sm-10 col-xs-12'>
            <Card>
              <CardHeader>
                <CardTitle>
                  <h2>Admin Login</h2>
                </CardTitle>
              </CardHeader>
              <CardBody className='pb-4'>
                <Col>
                  <Row className='p-2 justify-content-center'>
                    <FormGroup>
                      <Label>
                        Email
                        <Input
                          type='email'
                          name='email'
                          placeholder='admin@email.com'
                          onChange={this.handleInput}
                        />
                      </Label>
                    </FormGroup>
                  </Row>
                  <Row className='p-2 justify-content-center'>
                    <FormGroup>
                      <Label>
                        Password
                        <Input
                          type='password'
                          name='password'
                          placeholder='password'
                          onChange={this.handleInput}
                        />
                      </Label>
                    </FormGroup>
                  </Row>
                  <Row className='p-2 justify-content-center'>
                    <ButtonGroup>
                      <Button onClick={this.handleSubmit}>Submit</Button>
                    </ButtonGroup>
                  </Row>
                </Col>
              </CardBody>
            </Card>
          </div>
        </Row>
      </div>
    );
  }
}

export default connect(
  state => state,
  { login },
)(withRouter(Login));
