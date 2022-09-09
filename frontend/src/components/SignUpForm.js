import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as sessionActions from "../store/session";
import {  useHistory } from 'react-router-dom'
import './SignUpForm.css'
const SignupFormPage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [image, setImage] = useState(null);
  const [errors, setErrors] = useState({});
  const [isSpinner, setShowSpinner] = useState(false)

  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const history = useHistory()

  const handleSubmit = (e) => {
    e.preventDefault();

    if(!Object.keys(errors).length){
      setShowSpinner(true)
  }

    dispatch(sessionActions.signup({ firstName,lastName, email, password, image,confirmPassword }))
      .then((res) => {
        setFirstName("");
        setLastName("")
        setEmail("");
        setPassword("");
        setconfirmPassword("");
        setImage(null);
        if(res.status === 200){
          setShowSpinner(false)
           history.push('/')
      }
      })
      .catch(async (res) => {
        setShowSpinner(false)
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
    <div className="signupFormOuterContainer">
       {isSpinner && <i className="fa-solid fa-circle-notch singnUpSubmitSpinner"></i>}
      <div className="signupFormContainer">
      <form className='signupForm' onSubmit={handleSubmit} >

      <div className="signUpFormTitleConatainer">
          <h6 className="UTubeLogo"><span className="U">U</span><span className='t'>T</span><span className='u'>u</span>
          <span className="b">b</span><span className='e'>e</span></h6>
          <p className="signUpTxt">Create your Account</p>
          <p className="signUpContinueText">to continue to UTube</p>

        </div>

        <div>

        <input  className="firstNameInput"  placeholder='First Name *' type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />

        <input type="text" className="lastNameInput"  placeholder='Last Name *'  value={lastName} onChange={(e) => setLastName(e.target.value)}  />

            {errors?.firstName &&
            <div className="errorContainer">
              <div>
                <i class="fa-solid fa-circle-exclamation signUpEerrorlogo"></i>
                <span className='signUpError' key={errors.firstName}>{errors.firstName}</span>
              </div>
            </div>
          }

            {errors?.lastName &&
            <div className={errors.lastName?.length>47&&"errorContainer"}>
              <div>
                <i class="fa-solid fa-circle-exclamation signUpEerrorlogo"></i>
                <span className='signUpError' key={errors.lastName}>{errors.lastName}</span>
              </div>
            </div>
          }

         </div>

        <div>
          {/* <label>Email  (required)</label><br></br> */}
          <input type="text" className="singnUpInput"  placeholder="Email *" value={email} onChange={(e) => setEmail(e.target.value)}/>
          {errors?.email &&
          <div className="errorContainer">
            <div>
              <i class="fa-solid fa-circle-exclamation signUpEerrorlogo"></i>
              <span className='signUpError' key={errors.email}>{errors.email}</span>
            </div>
          </div>
        }
        </div>
        <div>
          {/* <label> Password  (required)</label><br></br> */}
          <input type="password" className="singnUpInput" placeholder="Password *" value={password} onChange={(e) => setPassword(e.target.value)}/>
          {errors?.password &&
          <div className="errorContainer">
            <div>
              <i class="fa-solid fa-circle-exclamation signUpEerrorlogo"></i>
              <span className='signUpError' key={errors.password}>{errors.password}</span>
            </div>
          </div>
        }
        </div>
        <div>
          {/* <label>Confirm Password (required)</label><br></br> */}
          <input type="password" className="singnUpInput" placeholder="Confirm Password *" value={confirmPassword} onChange={(e) => setconfirmPassword(e.target.value)}/>
          {errors?.confirmPassword &&
          <div className="errorContainer">
            <div>
              <i class="fa-solid fa-circle-exclamation signUpEerrorlogo"></i>
              <span className='signUpError' key={errors.confirmPassword}>{errors.confirmPassword}</span>
            </div>
          </div>
        }
        </div>
        <div className="fileUploadInputLabelContainer">
          <label className='fileUploadInputLabel' for='profileImage'><i className="fa-solid fa-upload signuploadIcon"></i>Profile Image </label>
          <input id='profileImage' className="fileUploadInput" type="file" onChange={updateFile} />
          {image?.name && <p>{image?.name}</p>}
        </div>
        {errors?.profile &&
          <div className="errorContainer">
            <div>
              <i class="fa-solid fa-circle-exclamation signUpEerrorlogo"></i>
              <span className='signUpError' key={errors.profile}>{errors.profile}</span>
            </div>
          </div>
        }
        <div className="signUpCreateAccountBtnContainer">
          <button type="button"  className='signupInsteadBtn' onClick={()=>history.push('/signin')}>Sign in instead</button>
          <button type="submit" className="signUpbtn">Create Account</button>

        </div>

      </form>
      </div>
      <div className="signupSideIconContainer">
      <i className="fa-solid fa-user-plus signupSideIcon"></i>

      </div>

    </div>
  );
};

export default SignupFormPage;
