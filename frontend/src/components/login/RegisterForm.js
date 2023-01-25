import { Formik, Form } from 'formik';
import React, { useState } from 'react';
import RegisterInput from '../inputs/registerinput';
import * as Yup from 'yup';
import DateOfBirthSelect from './DateOfBirthSelect';
import GenderSelect from './GenderSelect';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setUserData } from '../../reducers/userSlice';
import { useNavigate } from 'react-router-dom';
import { setVisibleRegisterForm } from '../../reducers/generalSlice';

const userInfo = {
  first_name: '',
  last_name: '',
  email: '',
  password: '',
  bYear: 1996,
  bMonth: 1,
  bDay: 9,
  gender: '',
};

export default function RegisterForm() {
  const navigate = useNavigate();
  const [user, setUser] = useState(userInfo);
  const dispatch = useDispatch();
  const {
    first_name,
    last_name,
    email,
    password,
    bYear,
    bMonth,
    bDay,
    gender,
  } = user;
  const [dateError, setDateError] = useState('');
  const [genderError, setGenderError] = useState('');
  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const currentYear = new Date().getFullYear();
  const minAge = 18;
  const birtYearOptions = Array.from(
    new Array(currentYear - (minAge + 1920) + 1),
    (val, index) => {
      return currentYear - (minAge + index);
    }
  );

  // Validation
  const registerValidation = Yup.object().shape({
    first_name: Yup.string()
      .required("What's your First name?")
      .min(2, 'First name must be between 2 and 16 characters.')
      .max(16, 'First name must be between 2 and 16 characters.')
      .matches(/^[aA-zZ]+$/, 'Numbers and special characters are not allowed'),
    last_name: Yup.string()
      .required("What's your Last name?")
      .min(2, 'Last name must be between 2 and 16 characters.')
      .max(16, 'Last name must be between 2 and 16 characters.')
      .matches(/^[aA-zZ]+$/, 'Numbers and special characters are not allowed'),
    email: Yup.string().required("What's your email?").email('Invalid email'),
    password: Yup.string()
      .required("What's your password?")
      .min(6, 'Password must be between 6 and 16 characters.')
      .max(16, 'Password must be between 6 and 16 characters.'),
  });

  // Register Submit(
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const registerSubmit = async () => {
    try {
      setLoading(true);

      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/register`,
        {
          first_name,
          last_name,
          email,
          password,
          bYear,
          bMonth,
          bDay,
          gender,
        }
      );

      const { message, ...rest } = data;
      dispatch(setUserData(rest));
      dispatch(setVisibleRegisterForm(false));
      navigate('/');

      setError('');
      setSuccess(data.message);
      setLoading(false);
    } catch (e) {
      setLoading(false);
      setSuccess('');
      if (e.response?.data?.message) {
        setError(e.response.data.message);
      } else {
        setError('Something went wrong');
      }

      // Error handling
    }
  };

  if (loading) return <div className="loading"></div>;
  return (
    <div className="blur_2">
      <div className="register">
        <div className="register_header">
          <i
            onClick={() => {
              dispatch(setVisibleRegisterForm(false));
            }}
            className="exit_icon"
          ></i>
          <span>Sign Up</span>
          <span>it's quick and easy</span>
        </div>
        <Formik
          enableReinitialize
          initialValues={{
            first_name,
            last_name,
            email,
            password,
            bYear,
            bMonth,
            bDay,
            gender,
          }}
          validationSchema={registerValidation}
          onSubmit={(values) => {
            let currentData = new Date();
            // Tarihi doğru almak için aydan 1 çıkartıyoruz.
            let birthData = new Date(bYear, bMonth - 1, bDay);

            if (currentData.getFullYear() - birthData.getFullYear() < 14) {
              setDateError('You are too young to register');
            } else if (
              currentData.getFullYear() - birthData.getFullYear() >
              70
            ) {
              setDateError('You are too old to register');
            } else {
              setDateError('');
              if (gender === '') {
                setGenderError('Please select your gender');
              } else {
                setGenderError('');

                registerSubmit();
              }
            }
          }}
        >
          {(formik) => (
            <Form className="register_form">
              <div className="reg_line">
                <RegisterInput
                  type="text"
                  placeholder="First name"
                  name="first_name"
                  onChange={handleRegisterChange}
                />
                <RegisterInput
                  type="text"
                  placeholder="Surname"
                  name="last_name"
                  onChange={handleRegisterChange}
                />
              </div>
              <div className="reg_line">
                <RegisterInput
                  type="text"
                  placeholder="Mobile number or email address"
                  name="email"
                  onChange={handleRegisterChange}
                />
              </div>
              <div className="reg_line">
                <RegisterInput
                  type="password"
                  placeholder="New password"
                  name="password"
                  onChange={handleRegisterChange}
                />
              </div>
              <div className="reg_col">
                <DateOfBirthSelect
                  bYear={bYear}
                  bMonth={bMonth}
                  bDay={bDay}
                  handleRegisterChange={handleRegisterChange}
                  dateError={dateError}
                  birtYearOptions={birtYearOptions}
                />
              </div>
              <div className="reg_col">
                <GenderSelect
                  handleRegisterChange={handleRegisterChange}
                  genderError={genderError}
                />
              </div>
              <div className="reg_infos">
                By clicking Sign Up, you agree to our{' '}
                <span>Terms, Data Policy &nbsp;</span>
                and <span>Cookie Policy.</span> You may receive SMS
                notifications from us and can opt out at any time.
              </div>
              <div className="reg_btn_wrapper">
                <button type="submit" className="blue_btn open_signup">
                  Sign Up
                </button>
              </div>
              {error && (
                <div className="my-2 border w-full p-2 rounded-md text-center border-red-500 text-red-500">
                  {error}
                </div>
              )}

              {success && (
                <div className="my-2 border w-full p-2 rounded-md text-center border-green-500 text-green-500">
                  {success}
                </div>
              )}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
