import { Button, FormControl, FormHelperText, Link, Stack, TextField, Typography } from '@mui/material'
import React from 'react'
import { useForm } from 'react-hook-form'
// import { DevTool } from '@hookform/devtools'

interface FormData {
  username: string
  password: string
}

const LoginForm = (): JSX.Element => {
  const form = useForm<FormData>()
  const { register, handleSubmit, formState } = form
  const errors = formState.errors

  return (
        <>
            <Typography variant="h4" textAlign="center" marginBottom={2}>
                Login
            </Typography>
            <form
                style={{ width: '300px' }}
                onSubmit={handleSubmit((data) => {
                  console.log(data)
                })}
                noValidate
            >
                <Stack spacing={1} width={300}>
                    <FormControl error={errors != null}>
                        <TextField
                            variant="outlined"
                            id="username"
                            type="text"
                            placeholder="Username"
                            {...register('username', {
                              required: 'This field is required!'
                            })}
                        ></TextField>
                        <FormHelperText>{errors.username?.message}</FormHelperText>
                    </FormControl>
                    <FormControl error={errors !== null}>
                        <TextField
                            id="password"
                            type="password"
                            placeholder="Password"
                            {...register('password', {
                              pattern: {
                                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                                message:
                                        'The password must be at least 8 characters long and it must contain at least 1 uppercase letter, 1 lowercase letter, 1 digit and 1 special symbol!'
                              },
                              required: 'This field is required!'
                            })}
                        ></TextField>
                        <FormHelperText>{errors.password?.message}</FormHelperText>
                    </FormControl>
                    <Button variant="contained" type="submit">
                        Login
                    </Button>
                </Stack>
                <Stack direction="column" spacing={1} marginTop={2}>
                    <Link underline="none">
                        Reset password
                    </Link>
                    <Link underline="none">
                        Register
                    </Link>
                </Stack>
            </form>
            {/* <div>
                <DevTool control={control} />
            </div> */}
        </>
  )
}

export default LoginForm
