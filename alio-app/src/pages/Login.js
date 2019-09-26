import React from "react";
import { Redirect } from "react-router-dom";
import { Form, Input, Button, Icon } from "antd";

class Login extends React.Component {
  state = { login: false };
  handleClick = e => {
    const form = this.props.form;
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        this.setState({
          login: true
        });
      }
      console.log("뭐지", values);
      console.log(this.state.login);
    });
  };
  render() {
    const form = this.props.form;
    const login = this.state.login;
    console.log(login);
    return login ? (
      <Redirect to="/pages/main" />
    ) : (
      <div>
        <Form className="login-form" onSubmit={this.handleClick}>
          <Form.Item>
            {form.getFieldDecorator("id", {
              rules: [
                { required: true, message: "Please input your username!" }
              ]
            })(
              <Input
                id="id"
                compact="true"
                style={{ width: "50%" }}
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
                style={{ width: "50%" }}
                prefix={
                  <Icon type="key" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder="Password"
              />
            )}
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit" style={{ margin: "3px 3px 3px 3px" }}>
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
