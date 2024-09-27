import React, { useState } from 'react'
import "../Login/Login.css"
import assets from "../../assets/assets.js"


const Login = () => {
  const [current , UseCurrent] = useState("Sign up");

  return (
    <div className='login'>
      <img src = {assets.logo_big} alt='' className='logo' />
      <form className='Login-form'>
        <h2>{current} </h2>
     {current === "Sign up"?<input type="text" placeholder='Username' className='Form-input' required/> : null }     
        <input type="email" placeholder='Email address' className='Form-input' required />
        <input type="password" placeholder='Password' className='Form-input' required/>
      <button type='submit'>{current === "Sign up" ?  "Create Account"  : "Login Now"}</button>
   <div className="login-term">
    <input type='checkbox' required />
    <p>Agree to the terms of use & privacy policy </p>
   </div>
   <div className="login-forgot">
    {
      current ===  "Sign up" ?  <p className="login-toggle"> Already have a Account  <span onClick= {() => {
        UseCurrent("Login ");
      }}   >Login here </span> </p> :   <p className="login-toggle"> Create an Account  <span onClick= {() => {
        UseCurrent("Sign up ");
      }}   > Click here</span> </p>
    }
   
  
   </div>
      </form>
    </div>
  )
}

export default Login
