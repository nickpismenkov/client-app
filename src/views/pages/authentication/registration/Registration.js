import React from "react";
import { connect } from "react-redux";
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
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import {
  Mail,
  Check,
  Facebook,
  Twitter,
  GitHub,
  User,
  List,
  Eye,
  EyeOff,
} from "react-feather";
import { history } from "../../../../history";
import Checkbox from "../../../../components/@vuexy/checkbox/CheckboxesVuexy";
import googleSvg from "../../../../assets/img/svg/google.svg";
import loginImg from "../../../../assets/img/pages/login.png";
import "../../../../assets/scss/pages/authentication.scss";
import { registrationUser, closeAlert } from "../../../../redux/actions/auth";
import { Redirect } from "react-router-dom";

class Registration extends React.Component {
  constructor(props) {
    super(props);

    if (this.props.user.token) this.props.history.push("/");

    this.state = {
      activeTab: "1",
      email: "",
      name: "",
      rememberMe: false,
      policy: false,
      role: "student",
      password: "",
      passwordVisible: false,
      modal: false,
    };
  }

  toggle = (tab) => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  };

  toggleModal = () => {
    this.setState((prevState) => ({
      ...prevState,
      ...{ modal: !prevState.modal },
    }));
  };

  changeEmail = (e) => {
    e.persist();
    this.setState((prevState) => ({
      ...prevState,
      ...{ email: e.target.value },
    }));
  };

  changeName = (e) => {
    e.persist();
    this.setState((prevState) => ({
      ...prevState,
      ...{ name: e.target.value },
    }));
  };

  changePassword = (e) => {
    e.persist();
    this.setState((prevState) => ({
      ...prevState,
      ...{ password: e.target.value },
    }));
  };

  changeCheckbox = (e) => {
    e.persist();
    this.setState((prevState) => ({
      ...prevState,
      ...{ rememberMe: e.target.checked },
    }));
  };

  registrationUser = (e) => {
    e.preventDefault();

    const user = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      rememberMe: this.state.rememberMe,
    };

    this.props.registrationUser(user);
  };

  changeRole = (e) => {
    e.persist();
    this.setState((prevState) => ({
      ...prevState,
      ...{ role: e.target.value },
    }));
  };

  changePolicy = (e) => {
    e.persist();
    this.setState((prevState) => ({
      ...prevState,
      ...{ policy: false },
    }));
    this.toggleModal();
  };

  changePasswordVisible = (e) => {
    e.persist();
    this.setState((prevState) => ({
      ...prevState,
      ...{ passwordVisible: !prevState.passwordVisible },
    }));
  };

  render() {
    return (
      <>
        {this.props.user.token && <Redirect to="/" />}
        <Modal
          isOpen={this.props.user.alert.status}
          toggle={() => this.props.closeAlert()}
          className="modal-dialog-centered"
        >
          <ModalHeader
            toggle={() => this.props.closeAlert()}
            className="bg-danger"
          >
            Error
          </ModalHeader>
          <ModalBody className="modal-dialog-centered">
            {this.props.user.alert.text}
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={() => this.props.closeAlert()}>
              Ok
            </Button>
          </ModalFooter>
        </Modal>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggleModal}
          className="modal-dialog-centered"
        >
          <ModalHeader toggle={this.toggleModal} className="bg-info">
            Terms of Use and Privacy Policy
          </ModalHeader>
          <ModalBody className="modal-dialog-centered">
            Privacy Policy...
          </ModalBody>
          <ModalFooter>
            <Button
              color="danger"
              onClick={() => {
                this.setState((prevState) => ({
                  ...prevState,
                  ...{ policy: false },
                }));
                this.toggleModal();
              }}
            >
              Disagree
            </Button>
            <Button
              color="success"
              onClick={() => {
                this.setState((prevState) => ({
                  ...prevState,
                  ...{ policy: true },
                }));
                this.toggleModal();
              }}
            >
              Agree
            </Button>
          </ModalFooter>
        </Modal>
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
                      <h4>Registration</h4>
                      <p>Please, register your account.</p>
                      <FormGroup className="form-label-group position-relative has-icon-left">
                        <Input
                          type="text"
                          placeholder="Name"
                          value={this.state.name}
                          onChange={this.changeName}
                          required
                        />
                        <div className="form-control-position">
                          <User size={15} />
                        </div>
                        <Label>Name</Label>
                      </FormGroup>
                      <Form onSubmit={this.registrationUser}>
                        <FormGroup className="form-label-group position-relative has-icon-left">
                          <Input
                            type="email"
                            placeholder="Email"
                            value={this.state.email}
                            onChange={this.changeEmail}
                            required
                          />
                          <div className="form-control-position">
                            <Mail size={15} />
                          </div>
                          <Label>Email</Label>
                        </FormGroup>
                        <FormGroup className="form-label-group position-relative has-icon-left">
                          <Input
                            type="select"
                            value={this.state.role}
                            onChange={this.changeRole}
                          >
                            <option value="student">Student</option>
                            <option value="teacher">Teacher</option>
                            <option value="involved parent">
                              Involved parent
                            </option>
                            <option value="parent">Parent</option>
                          </Input>
                          <div className="form-control-position">
                            <List size={15} />
                          </div>
                          <Label>Role</Label>
                        </FormGroup>
                        <FormGroup className="form-label-group position-relative has-icon-left">
                          <Input
                            type={
                              !this.state.passwordVisible ? "password" : "text"
                            }
                            placeholder="Password"
                            value={this.state.password}
                            onChange={this.changePassword}
                            required
                          />
                          <div className="form-control-position">
                            {!this.state.passwordVisible ? (
                              <Eye
                                onClick={this.changePasswordVisible}
                                size={15}
                              />
                            ) : (
                              <EyeOff
                                onClick={this.changePasswordVisible}
                                size={15}
                              />
                            )}
                          </div>
                          <Label>Password</Label>
                        </FormGroup>
                        <FormGroup className="d-flex justify-content-between align-items-center">
                          <Checkbox
                            checked={this.state.policy}
                            onChange={this.changePolicy}
                            color="success"
                            icon={<Check className="vx-icon" size={16} />}
                            label="I agree to Terms of Use and Privacy Policy"
                          />
                        </FormGroup>
                        <FormGroup className="d-flex justify-content-between align-items-center">
                          <Checkbox
                            checked={this.state.rememberMe}
                            onChange={this.changeCheckbox}
                            color="primary"
                            icon={<Check className="vx-icon" size={16} />}
                            label="Remember me"
                          />
                        </FormGroup>
                        <div className="d-flex justify-content-between">
                          <Button.Ripple
                            color="primary"
                            outline
                            onClick={() => history.push("/pages/login")}
                          >
                            Login
                          </Button.Ripple>
                          <Button.Ripple
                            color="primary"
                            type="submit"
                            disabled={!this.state.policy ? true : false}
                          >
                            Register
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

const props = connect((state) => ({ user: state.auth.user }), {
  registrationUser,
  closeAlert,
});

export default props(Registration);
