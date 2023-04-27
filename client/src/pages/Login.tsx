import { Paper } from '@mui/material'
import React from 'react'
import LoginForm from '../components/LoginForm'

const Login = (): JSX.Element => {
  return (
    <Paper elevation={7} style={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      padding: '50px'
    }}>
      <LoginForm />
    </Paper>
  )
}

export default Login
