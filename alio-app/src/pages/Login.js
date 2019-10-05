import React from "react";
import { Redirect } from "react-router-dom";
import { Form, Input, Button, Icon } from "antd";

class Login extends React.Component {
  constructor(props) {
    super(props);
  }
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
      // setTimeout(() => {
      //   this.props.handleClick();
      // }, 300);
      console.log("뭐지", values);
      console.log(this.state.login);
    });
  };

  render() {
    console.log(this.props.value);
    const form = this.props.form;
    const login = this.props.value.login;
    return login ? (
      <Redirect to="/pages" />
    ) : (
      <div>
        <Form className="login-form" onSubmit={this.handleClick}>
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
                name="password"
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
