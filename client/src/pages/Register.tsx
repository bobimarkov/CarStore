import { Paper } from '@mui/material'
import React from 'react'
// import RegisterForm from '../components/RegisterForm'
import SignUp from '../components/RegForm2'

const Register = (): JSX.Element => {
  return (
    <Paper elevation={7} style={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      padding: '50px'
    }}>
      <SignUp />
    </Paper>
  )
}

export default Register
