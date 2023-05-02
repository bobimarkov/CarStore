import { DatePicker } from '@mui/x-date-pickers'
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Stack,
  TextField,
  Typography
} from '@mui/material'
import React from 'react'
import { Controller, type FieldValues, useForm } from 'react-hook-form'
// import { DevTool } from '@hookform/devtools'

interface FormData extends FieldValues {
  username: string
  email: string
  name: {
    firstName: string
    lastName: string
  }
  password: string
  passwordConfirmation: string
  dateOfBirth: number
}

const RegisterForm = (): JSX.Element => {
  const form = useForm<FormData>()
  const { register, handleSubmit, formState, control } = form
  const errors = formState.errors

  return (
        <>
            <Typography variant="h4" textAlign="center" marginBottom={2}>
                Register
            </Typography>
            <Box
                component="form"
                sx={{ width: '300px' }}
                onSubmit={handleSubmit((data) => {
                  console.log(data)
                })}
                noValidate
            >
                <Stack spacing={1} width={300}>
                    <FormControl error={errors != null}>
                        <Controller
                            name="username"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    id="username"
                                    label="Username"
                                    name={field.name}
                                    value={field.value}
                                    onChange={field.onChange}
                                    onBlur={field.onBlur}
                                    inputRef={field.ref}
                                />
                            )}
                            rules={{
                              required: 'This field is required!'
                            }}
                        />
                        <FormHelperText>{errors.username?.message}</FormHelperText>
                    </FormControl>
                    <FormControl error={errors !== null}>
                        <Controller
                            name="password"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    id="password"
                                    type="password"
                                    label="Password"
                                    name={field.name}
                                    value={field.value}
                                    onChange={field.onChange}
                                    onBlur={field.onBlur}
                                    inputRef={field.ref}
                                />
                            )}
                            rules={{
                              pattern: {
                                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                                message:
                                        'The password must be at least 8 characters long and it must contain at least 1 uppercase letter, 1 lowercase letter, 1 digit and 1 special symbol!'
                              },
                              required: 'This field is required!'
                            }}
                        />
                        <FormHelperText>{errors.password?.message}</FormHelperText>
                    </FormControl>
                    <FormControl error={errors != null}>
                        <Controller
                            name="email"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    id="email"
                                    label="Email"
                                    name={field.name}
                                    value={field.value}
                                    onChange={field.onChange}
                                    onBlur={field.onBlur}
                                    inputRef={field.ref}
                                />
                            )}
                            rules={{
                              required: 'This field is required!'
                            }}
                        />
                        <FormHelperText>{errors.email?.message}</FormHelperText>
                    </FormControl>
                    <FormControl error={errors != null}>
                        <Controller
                            name="name.firstName"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    id="firstName"
                                    type="text"
                                    label="First Name"
                                    name={field.name}
                                    value={field.value}
                                    onChange={field.onChange}
                                    onBlur={field.onBlur}
                                    inputRef={field.ref}
                                />
                            )}
                            rules={{
                              required: 'This field is required!'
                            }}
                        />
                        <FormHelperText>{errors.name?.firstName?.message}</FormHelperText>
                    </FormControl>
                    <FormControl error={errors != null}>
                        <TextField
                            variant="outlined"
                            id="lastName"
                            type="text"
                            label="Last Name"
                            placeholder="Last Name"
                            {...register('name.lastName', {
                              required: 'This field is required!'
                            })}
                        ></TextField>
                        <FormHelperText>{errors.name?.lastName?.message}</FormHelperText>
                    </FormControl>
                    <FormControl error={errors != null}>
                        <Controller
                            name="dateOfBirth"
                            control={control}
                            render={({ field }) => (
                                <DatePicker
                                    value={field.value}
                                    onChange={field.onChange}
                                    label="Date of Birth"
                                />
                            )}
                        />
                        <FormHelperText>{errors.name?.lastName?.message} </FormHelperText>
                    </FormControl>
                    <Button variant="contained" type="submit">
                        Register
                    </Button>
                </Stack>
            </Box>
            {/* <div>
                <DevTool control={control} />
            </div> */}
        </>
  )
}

export default RegisterForm
