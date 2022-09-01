import React, { useState } from "react";
import * as sessionActions from "../store/session";
import { useDispatch } from "react-redux";
import { NavLink, useHistory } from 'react-router-dom'
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
    <form onSubmit={handleSubmit}>
      <div>
        <label> Email  </label>
        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)}/>
        {errors?.email &&
          <div className="errorContainer">
            <div>
              <i class="fa-solid fa-circle-exclamation errorlogo"></i>
            </div>
            <div>
              <span className='error' key={errors.email}>{errors.email}</span>
            </div>
          </div>
        }
      </div>
      <div>
        <label> Password </label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
        {errors?.password &&
          <div className="errorContainer">
            <div>
              <i class="fa-solid fa-circle-exclamation errorlogo"></i>
            </div>
            <div>
              <span className='error' key={errors.password}>{errors.password}</span>
            </div>
          </div>
        }
      </div>
      <div>
      {errors?.error &&
          <div className="errorContainer">
            <div>
              <i class="fa-solid fa-circle-exclamation errorlogo"></i>
            </div>
            <div>
              <span className='error' key={errors.error}>{errors.error}</span>
            </div>
          </div>
        }
        <button type="submit">Log In</button>

        <button onClick={demoUserLoginHandleSubmit} className='demoUserBtn'>Demo User</button>
      </div>

      <div>
      <NavLink to={'/signup'}>Create account</NavLink>
      </div>



    </form>
  );
}

export default LoginForm;
