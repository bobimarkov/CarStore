import React, { useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  InputAdornment,
  IconButton,
  Paper,
  Box,
  Stack
} from '@mui/material'
import { ArrowDropDown, ArrowDropUp, Search } from '@mui/icons-material'
import { format } from 'date-fns'

interface User {
  username: string
  firstName: string
  lastName: string
  dateOfBirth: number
  email: string
  role?: string[] | undefined
  dealerships?: string[] | undefined
  is_blocked?: boolean | undefined
  is_messaging_blocked?: boolean | undefined
  is_reviewing_blocked?: boolean | undefined
  createdAt: number
  [key: string]: string | string[] | boolean | number | undefined
}

const UserTable: React.FC = () => {
  const [users, setUsers] = useState<User[]>([])
  const [orderBy, setOrderBy] = useState<string>('')
  const [order, setOrder] = useState<string>('')
  const [searchText, setSearchText] = useState<string>('')

  const handleSort = (field: keyof User & string): void => {
    const isAsc = orderBy === field && order === 'asc'
    const newOrder = isAsc ? 'desc' : 'asc'

    setOrderBy(field)
    setOrder(newOrder)

    setUsers(
      users.slice().sort((a, b) => {
        const aValue = a[field] as any
        const bValue = b[field] as any

        if (typeof aValue === 'string' && typeof bValue === 'string') {
          return newOrder === 'asc'
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue)
        } else {
          return newOrder === 'asc' ? aValue - bValue : bValue - aValue
        }
      })
    )
  }

  const filteredUsers = users.filter((user) => {
    const regex = new RegExp(searchText, 'i')
    return (
      regex.test(user.username) ||
      regex.test(user.firstName) ||
      regex.test(user.lastName) ||
      regex.test(user.email)
    )
  })

  return (
        <div>
            <TextField
                label="Search"
                variant="outlined"
                margin="normal"
                value={searchText}
                onChange={(e) => {
                  setSearchText(e.target.value)
                }}
                InputProps={{
                  endAdornment: (
                        <InputAdornment position="end">
                            <IconButton>
                                <Search />
                            </IconButton>
                        </InputAdornment>
                  )
                }}
            />
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            {[
                              ['username', 'Username'],
                              ['firstName', 'First Name'],
                              ['lastName', 'Last Name'],
                              ['dateOfBirth', 'Date of Birth'],
                              ['email', 'Email'],
                              ['createdAt', 'Registered at']
                            ].map((user) => (
                                <TableCell
                                    key={user[0]}
                                    onClick={() => {
                                      handleSort(user[0])
                                    }}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <Stack direction='row'>
                                        {orderBy === user[0] ? <strong>{user[1]}</strong> : user[1]}
                                        {orderBy === user[0] && (
                                            <Box display='flex' justifyContent='center'>
                                                {order === 'desc'
                                                  ? (
                                                    <ArrowDropDown />
                                                    )
                                                  : (
                                                    <ArrowDropUp />
                                                    )}
                                            </Box>
                                        )}
                                    </Stack>
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredUsers.map((user) => (
                            <TableRow key={user.username}>
                                <TableCell>{user.username}</TableCell>
                                <TableCell>{user.firstName}</TableCell>
                                <TableCell>{user.lastName}</TableCell>
                                <TableCell>{format(user.dateOfBirth, 'dd/MM/yyyy')}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{format(user.createdAt, 'dd/MM/yyyy')}</TableCell>
                                {/* <TableCell align="right">
                                    <IconButton>{/* Edit user button }</IconButton>
                                    <IconButton>{/* Delete user button  }</IconButton>
                                 </TableCell> */}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
  )
}

export default UserTable
