import React from "react"
import { Form, Formik } from "formik"
import * as Yup from "yup"
import { Link } from "react-router-dom"

import LoginInput from "../../components/inputs/logininput"
const loginInfos = {
  email: "",
  password: "",
}
export default function LoginForm() {
  const facebookIcon = process.env.PUBLIC_URL + "/icons/facebook.svg"
  const [login, setLogin] = React.useState(loginInfos)
  const { email, password } = login
  const handleChange = (e) => {
    const { name, value } = e.target
    setLogin({ ...login, [name]: value })
  }

  const loginValidation = Yup.object({
    email: Yup.string()
      .required("Email address is required")
      .email("Must be a valid email address")
      .max(100, "Email address must be less than 100 characters"),
    password: Yup.string().required("Password is required"),
  })
  return (
    <div className="login_wrap">
      <div className="login_1">
        <img src={facebookIcon} alt="" />
        <span>
          Facebook helps you connect and share with the people in your life.
        </span>
      </div>
      <div className="login_2">
        <div className="login_2_wrap">
          <Formik
            enableReinitialize
            initialValues={{
              email: email,
              password: password,
            }}
            validationSchema={loginValidation}
          >
            {(formik) => (
              <Form>
                <LoginInput
                  type="text"
                  name="email"
                  id="email"
                  placeholder="Email address or Phone number"
                  onChange={handleChange}
                />
                <LoginInput
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Password"
                  onChange={handleChange}
                  bottom
                />
                <button type="submit" className="blue_btn">
                  Log In
                </button>
              </Form>
            )}
          </Formik>

          <Link to="/forgot" className="forgot_password">
            Forgotten passwor?
          </Link>
          <div className="sign_splitter"></div>
          <button className="blue_btn open_signup">Create Account</button>
        </div>
        <Link to="" className="sign_extra">
          <b>Create a Page </b>
          for a celebrity, band or business.
        </Link>
      </div>
    </div>
  )
}
