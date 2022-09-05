import React, { useState } from "react";
import * as sessionActions from "../store/session";
import { useDispatch } from "react-redux";
import { NavLink, useHistory } from 'react-router-dom'
import './LoginForm.css'
function LoginForm() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const history = useHistory()

  const handleSubmit = (e) => {
    e.preventDefault();
    // setErrors([]);
    return dispatch(sessionActions.login({ email, password }))
    .then((res) => {
      setEmail("");
      setPassword("");
      if(res.status === 200) history.push('/')
    })

    .catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      }
    );
  };

  const demoUserLoginHandleSubmit = (e) => {
    e.preventDefault();
    const email ='tom@user.io'
    const password = 'password1'
    return dispatch(sessionActions.login({email, password}))
    .then((res) => {
      if(res.status === 200) history.push('/')
    })
  }

  return (
    <div className="loginFormContainer">
      <form className='loginForm' onSubmit={handleSubmit}>
        <div className="loginFormTitleConatainer">
          <h6 className="UTubeLogo"><span className="U">U</span><span className='t'>T</span><span className='u'>u</span>
          <span className="b">b</span><span className='e'>e</span></h6>
          <p className="signinTxt">Sign in</p>
          <p className="signContinueText">to continue to UTube</p>

        </div>
        <div>
          {/* <label> Email  </label> */}
          <input type="text" className="loginFormEmailInput" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
          {errors?.email &&
            <div className="errorContainer">
              <div>
                <i class="fa-solid fa-circle-exclamation loginErrorlogo"></i>
                <span className='loginError' key={errors.email}>{errors.email}</span>
              </div>
            </div>
          }
        </div>
        <div>
          {/* <label> Password </label> */}
          <input type="password" placeholder="Password" className="loginFormPasswordInput" value={password} onChange={(e) => setPassword(e.target.value)}/>
          {errors?.password &&
            <div className="errorContainer">
              <div>
                <i class="fa-solid fa-circle-exclamation loginErrorlogo"></i>
                <span className='loginError' key={errors.password}>{errors.password}</span>
              </div>
            </div>
          }
        </div>
        <div>
        {errors?.error &&
            <div className="errorContainer">
              <div>
                <i class="fa-solid fa-circle-exclamation loginErrorlogo"></i>
                <span className='loginError' key={errors.error}>{errors.error}</span>
              </div>
            </div>
          }

          <div>
             <p className="demoUserBtnTxt">Just looking? Use Demo mode to sign in and preview.</p>
            <button onClick={demoUserLoginHandleSubmit} className='demoUserBtn'>Demo User</button>
          </div>
        </div>

        <div className="loginBtnCreateAccountBtnContainer">
        <NavLink className='loginFormsignupLink' to={'/signup'}>Create account</NavLink>
         <button type="submit" className='loginFormLoginBtn'>Sign In</button>

        </div>
      </form>
    </div>
  );
}

export default LoginForm;
