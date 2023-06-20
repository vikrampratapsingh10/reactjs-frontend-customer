import React from 'react'
import TextField from '@mui/material/TextField'
import { MuiOtpInput } from 'mui-one-time-password-input'
import { useState } from 'react'
import "./forget.css"
import Navigation from '../../navigation/Navigation'
import Button from '@mui/material/Button'

export default function ForgetPassword() {
  const [otp,setOtp]=useState()
  const handleChange=(newvalue)=>{
    setOtp(newvalue)
  }
  return <> 
<Navigation/>
<div id='forget'>
<h4>Reset your password</h4>
<samall><p className='mt-3' >Enter your email address and we'll send you a OTP.</p></samall>
<div id="forgetemail">
<TextField
  id='forgetfield'
  label="Enter Email"
  variant="outlined"
  color="primary"
  margin="normal"
  sizes="small"
  type='email'/>
  </div>
  <br/>
<MuiOtpInput  length={6} height={100} width={400} id='forgetotp' value={otp} onChange={handleChange} />
<Button
  variant='contained'
  color="success"
  size="large">
  Submit
</Button>

</div>

    </>

}
