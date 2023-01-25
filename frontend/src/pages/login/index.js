<<<<<<< HEAD
import "./style.css"
import React from "react"
import LoginForm from "../../components/login/LoginForm"
import Footer from "../../components/login/Footer"
import RegisterForm from "../../components/login/RegisterForm"
import { useSelector } from "react-redux"
import { selectVisibleRegisterForm } from "../../reducers/generalSlice"

export default function Login() {
  const visibleRegisterForm = useSelector(selectVisibleRegisterForm)
=======
import './style.css';
import React from 'react';
import LoginForm from '../../components/login/LoginForm';
import Footer from '../../components/login/Footer';
import RegisterForm from '../../components/login/RegisterForm';
import { useSelector } from 'react-redux';
import { selectVisibleRegisterForm } from '../../reducers/generalSlice';

export default function Login() {
  const visibleRegisterForm = useSelector(selectVisibleRegisterForm);
>>>>>>> 89692fc014c47216612449ef706815e9445b0243
  return (
    <div className="login">
      <div className="login_wrapper">
        <LoginForm />
        {visibleRegisterForm && <RegisterForm />}
        <Footer />
      </div>
    </div>
  );
}
