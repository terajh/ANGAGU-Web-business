import React, { useEffect, useState } from "react";
import { Input, Form, FormGroup, Button } from "reactstrap";
import './style.css'
const LoginForm = () => {
  return (
    <div className="login_wrapper">
      <div className="animate form login_form">
        <section className="login_content">
          <Form>
            <h1>Login Form</h1>
            <FormGroup>
              <Input
                type="text"
                id="email"
                placeholder="아이디"
                required=""
              />
            </FormGroup>
            <FormGroup>
              <Input
                type="password" 
                placeholder="패스워드"
                required=""
              />
            </FormGroup>
            <div>
              <a className="reset_pass" href="#">
                Log in
              </a>&nbsp;&nbsp;&nbsp;&nbsp;
              <a className="reset_pass" href="#">
                Lost your password?
              </a>
            </div>

            <div className="clearfix"></div>

            <div className="separator">
              <p className="change_link">
                New to site?
                <a href="#signup" className="to_register">
                  {" "}
                  Create Account{" "}
                </a>
              </p>

              <div className="clearfix"></div>
              <br />

              <div>
                <h1>
                  <i className="fa fa-paw"></i> 안가구
                </h1>
                
              </div>
            </div>
          </Form>
        </section>
      </div>
    </div>
  );
};

export default LoginForm;
