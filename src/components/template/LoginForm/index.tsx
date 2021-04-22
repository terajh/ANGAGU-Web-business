import React, { useEffect, useState } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { Input, Form, FormGroup, Button } from 'reactstrap';
import './style.css';

const LoginForm: React.FC = () => {
  const { url } = useRouteMatch();
  return (
    <div className="login_wrapper">
      <div className="animate form login_form">
        <section className="login_content">
          <Form>
            <h1>Login Form</h1>
            <FormGroup>
              <Input type="text" id="email" placeholder="아이디" />
            </FormGroup>
            <FormGroup>
              <Input type="password" placeholder="패스워드" />
            </FormGroup>
            <div>
              <a className="reset_pass" href="/Main">
                로그인
              </a>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <a className="reset_pass" href="/">
                비밀번호를 잊으셨나요?
              </a>
            </div>

            <div className="clearfix" />

            <div className="separator">
              <p className="change_link">
                아이디가 없으신가요? &nbsp;
                <Link to={`${url}/Signup`} className="to_register">
                  회원가입
                </Link>
              </p>

              <div className="clearfix" />
              <br />

              <div>
                <h1>
                  <i className="fa fa-paw" /> 안가구
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
