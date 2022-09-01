import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as sessionActions from "../store/session";
import {  useHistory } from 'react-router-dom'

const SignupFormPage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [image, setImage] = useState(null);
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const history = useHistory()

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(sessionActions.signup({ firstName,lastName, email, password, image,confirmPassword }))
      .then((res) => {
        setFirstName("");
        setLastName("")
        setEmail("");
        setPassword("");
        setconfirmPassword("");
        setImage(null);
        if(res.status === 200) history.push('/')
      })
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }

      });
  };

  const updateFile = (e) => {
    const file = e.target.files[0];
    if (file) setImage(file);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} >
        <div>
          <label>First Name<span className="requireAstrick">*</span></label>
          <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
          {errors?.firstName &&
          <div className="errorContainer">
            <div>
              <i class="fa-solid fa-circle-exclamation errorlogo"></i>
            </div>
            <div>
              <span className='error' key={errors.firstName}>{errors.firstName}</span>
            </div>
          </div>
        }
        </div>

        <div>
          <label> Last Name<span className="requireAstrick">*</span></label>
          <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)}  />
          {errors?.lastName &&
          <div className="errorContainer">
            <div>
              <i class="fa-solid fa-circle-exclamation errorlogo"></i>
            </div>
            <div>
              <span className='error' key={errors.lastName}>{errors.lastName}</span>
            </div>
          </div>
        }
        </div>
        <div>
          <label>Email<span className="requireAstrick">*</span></label>
          <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
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
          <label> Password<span className="requireAstrick">*</span> </label>
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
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
          <label>Confirm Password<span className="requireAstrick">*</span> </label>
          <input type="password" placeholder="Password" value={confirmPassword} onChange={(e) => setconfirmPassword(e.target.value)}/>
          {errors?.confirmPassword &&
          <div className="errorContainer">
            <div>
              <i class="fa-solid fa-circle-exclamation errorlogo"></i>
            </div>
            <div>
              <span className='error' key={errors.confirmPassword}>{errors.confirmPassword}</span>
            </div>
          </div>
        }
        </div>
        <div>
          <label> Profile Image </label>
          <input type="file" onChange={updateFile} />
        </div>
        {errors?.profile &&
          <div className="errorContainer">
            <div>
              <i class="fa-solid fa-circle-exclamation errorlogo"></i>
            </div>
            <div>
              <span className='error' key={errors.profile}>{errors.profile}</span>
            </div>
          </div>
        }
        <div>
          <button type="submit">Create User</button>

        </div>

      </form>

    </div>
  );
};

export default SignupFormPage;
