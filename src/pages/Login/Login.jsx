import React from 'react'
import "../Login/Login.css"
import assets from "../../assets/assets.js"


const Login = () => {
  return (
    <div className='login'>
      <img src = {assets.logo_big} alt='' className='logo' />
      <form className='Login-form'>
        <h2>Sign up </h2>
        <input type="text" placeholder='email' className='Form-input' required/>
        <input type="email" placeholder='Email address' className='Form-input' />
        <input type="password" placeholder='Password' className='Form-input' />
      <button type='submit'>Sign up </button>
   <div className="login-form">
    <input type='checkbox' />
    <p>Agree to the terms of use & privacy policy </p>
   </div>
   <div className="login-forward">
    <div className="login-toggle"> Already have a Account  <span> Click here</span> </div>
   </div>
      </form>
    </div>
  )
}

export default Login
