import React, { useState, useEffect } from 'react';
import { Link, Route, Switch, useRouteMatch } from 'react-router-dom';
import { LoginForm, SignupForm } from 'components/template';

const Login: React.FC = () => {
  const { path } = useRouteMatch();
  return (
    <>
      <Route exact path={`${path}`} component={LoginForm} />
      <Route exact path={`${path}/Signup`} component={SignupForm} />
    </>
  );
};

export default Login;
