import React from "react";
import {
  Button,
  Card,
  CardBody,
  Row,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
} from "reactstrap";
import { Mail, Lock, Check, Facebook, Twitter, GitHub } from "react-feather";
import { history } from "../../../../history";
import Checkbox from "../../../../components/@vuexy/checkbox/CheckboxesVuexy";
import googleSvg from "../../../../assets/img/svg/google.svg";
import { connect } from "react-redux";
import loginImg from "../../../../assets/img/pages/login.png";
import "../../../../assets/scss/pages/authentication.scss";
import { loginUser } from "../../../../redux/actions/auth";
import { Redirect } from "react-router-dom";

class Login extends React.Component {
  constructor(props) {
    super(props);

    if (this.props.user.token) this.props.history.push("/");

    this.state = {
      activeTab: "1",
      email: "",
      password: "",
    };
  }

  toggle = (tab) => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  };

  loginUser = (e) => {
    e.preventDefault();

    const user = {
      email: this.state.email,
      password: this.state.password,
    };

    this.props.loginUser(user);
  };

  render() {
    return (
      <>
        {this.props.user.token && <Redirect to="/" />}
        <Row className="m-0 justify-content-center">
          <Col
            sm="8"
            xl="7"
            lg="10"
            md="8"
            className="d-flex justify-content-center"
          >
            <Card className="bg-authentication login-card rounded-0 mb-0 w-100">
              <Row className="m-0">
                <Col
                  lg="6"
                  className="d-lg-block d-none text-center align-self-center px-1 py-0"
                >
                  <img src={loginImg} alt="loginImg" />
                </Col>
                <Col lg="6" md="12" className="p-0">
                  <Card className="rounded-0 mb-0 px-2">
                    <CardBody>
                      <h4>Login</h4>
                      <p>Welcome back, please login to your account.</p>
                      <Form onSubmit={this.loginUser}>
                        <FormGroup className="form-label-group position-relative has-icon-left">
                          <Input
                            type="email"
                            placeholder="Email"
                            value={this.state.email}
                            required
                            onChange={(e) =>
                              this.setState({ email: e.target.value })
                            }
                          />
                          <div className="form-control-position">
                            <Mail size={15} />
                          </div>
                          <Label>Email</Label>
                        </FormGroup>
                        <FormGroup className="form-label-group position-relative has-icon-left">
                          <Input
                            type="password"
                            required
                            placeholder="Password"
                            value={this.state.password}
                            onChange={(e) =>
                              this.setState({ password: e.target.value })
                            }
                          />
                          <div className="form-control-position">
                            <Lock size={15} />
                          </div>
                          <Label>Password</Label>
                        </FormGroup>
                        <FormGroup className="d-flex justify-content-between align-items-center">
                          <Checkbox
                            color="primary"
                            icon={<Check className="vx-icon" size={16} />}
                            label="Remember me"
                          />
                          <div className="float-right">Forgot Password?</div>
                        </FormGroup>
                        <div className="d-flex justify-content-between">
                          <Button.Ripple
                            color="primary"
                            outline
                            onClick={() => history.push("/pages/registration")}
                          >
                            Register
                          </Button.Ripple>
                          <Button.Ripple color="primary" type="submit">
                            Login
                          </Button.Ripple>
                        </div>
                      </Form>
                    </CardBody>
                    <div className="auth-footer">
                      <div className="divider">
                        <div className="divider-text">OR</div>
                      </div>
                      <div className="footer-btn">
                        <Button.Ripple className="btn-facebook" color="">
                          <Facebook size={14} />
                        </Button.Ripple>
                        <Button.Ripple className="btn-twitter" color="">
                          <Twitter size={14} stroke="white" />
                        </Button.Ripple>
                        <Button.Ripple className="btn-google" color="">
                          <img
                            src={googleSvg}
                            alt="google"
                            height="15"
                            width="15"
                          />
                        </Button.Ripple>
                        <Button.Ripple className="btn-github" color="">
                          <GitHub size={14} stroke="white" />
                        </Button.Ripple>
                      </div>
                    </div>
                  </Card>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </>
    );
  }
}

const props = connect((state) => ({ user: state.auth.user }), { loginUser });

export default props(Login);
