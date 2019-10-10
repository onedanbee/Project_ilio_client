// eslint-disable-next-line
import React from "react";
import { Redirect } from "react-router-dom";
import { Form, Input, Button, Icon } from "antd";

class Login extends React.Component {
  componentDidMount() {
    if (this.props.logged_in) {
      fetch("http://localhost:8000/core/current_user/", {
        headers: {
          Authorization: `JWT ${localStorage.getItem("token")}`
        }
      })
        .then(res => res.json())
        .then(json => {
          this.setState({ username: json.username });
        });
    }
  }

  handleChangeId = event => {
    this.setState({ loginId: event.target.value });
  };
  handleChangePw = event => {
    this.setState({ loginPw: event.target.value });
  };

  handleClick = e => {
    const form = this.props.form;
    e.preventDefault();

    form.validateFields((err, values) => {
      if (!err) {
        fetch("http://localhost:8000/token-auth/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(values)
        })
          .then(res => res.json())
          .then(json => {
            localStorage.setItem("token", json.token);
            this.setState({
              username: json.user.username
            });
            return json;
          })
          .then(json => {
            this.props.handleClick();
          });
      }
    });
  };

  render() {
    const form = this.props.form;
    const login = this.props.value.login;
    return login ? (
      <Redirect to="/pages" />
    ) : (
      <div>
        <Form
          className="login-form"
          onSubmit={this.handleClick}
          style={{
            width: "300px",
            height: "50%",
            margin: "0 auto",
            marginTop: "150px",
            paddingTop: "20px",
            background: "#F5F5F5",
            borderRadius: "16px",
            padding: "20px"
          }}
        >
          <div
            style={{
              paddingBottom: "20px",
              fontSize: "25px",
              marginLeft: "10px"
            }}
          >
            Admin Login
          </div>
          <Form.Item>
            {form.getFieldDecorator("username", {
              rules: [
                { required: true, message: "Please input your username!" }
              ]
            })(
              <Input
                id="username"
                compact="true"
                name="username"
                prefix={
                  <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder="ID"
              />
            )}
          </Form.Item>
          <Form.Item hasFeedback>
            {form.getFieldDecorator("password", {
              rules: [
                {
                  required: true,
                  message: "Please input your password!"
                }
              ]
            })(
              <Input.Password
                compact="true"
                name="password"
                prefix={
                  <Icon type="key" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder="Password"
              />
            )}
          </Form.Item>
          <Form.Item>
            <Button
              htmlType="submit"
              style={{
                marginLeft: "95px"
              }}
            >
              Login
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

const WrappedLogin = Form.create({ name: "login" })(Login);

export default WrappedLogin;
