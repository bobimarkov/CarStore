/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import * as React from 'react'
import { NavLink } from 'react-router-dom'
import { styled, type Theme, type CSSObject } from '@mui/material/styles'
import Box from '@mui/material/Box'
import MuiDrawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import ClearIcon from '@mui/icons-material/Clear'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import PersonIcon from '@mui/icons-material/Person'
import DashboardIcon from '@mui/icons-material/Dashboard'
import { DirectionsCar, KeyboardReturn, Report, Warehouse } from '@mui/icons-material'
import { Avatar } from '@mui/material'

const drawerWidth = 240

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen
  }),
  overflowX: 'hidden'
})

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`
  }
})

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar
}))

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme)
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme)
    })
  })
)

const NavBar: React.FC = () => {
  const [open, setOpen] = React.useState(false)

  const handleDrawerOpen = (): void => {
    setOpen(true)
  }

  const handleDrawerClose = (): void => {
    setOpen(false)
  }

  return (
        <Drawer variant="permanent" open={open}>
            <DrawerHeader>
                <IconButton onClick={open ? handleDrawerClose : handleDrawerOpen}>
                    {open ? <ClearIcon /> : <MenuIcon />}
                </IconButton>
            </DrawerHeader>
            <Divider />
            <Box height="100%" display="flex" flexDirection="column" justifyContent="space-between">
                <List>
                    {[
                      ['Dashboard', <DashboardIcon key="dashboard" />, '/admin/'],
                      ['Users', <PersonIcon key="user" />, '/admin/users'],
                      ['Cars', <DirectionsCar key="car" />, '/admin/cars'],
                      ['Dealerships', <Warehouse key="dealership" />, '/admin/dealerships'],
                      ['Reports', <Report key="report" />, '/admin/reports']
                    ].map((item, index) => (
                        <ListItem key={index} disablePadding sx={{ display: 'block' }}>
                            <NavLink
                                to={item[2] as string}
                                style={{
                                  color: 'black',
                                  textDecoration: 'none'
                                }}
                            >
                                <ListItemButton
                                    sx={{
                                      minHeight: 48,
                                      justifyContent: open ? 'initial' : 'center',
                                      px: 2.5
                                    }}
                                >
                                    <ListItemIcon
                                        sx={{
                                          minWidth: 0,
                                          mr: open ? 3 : 'auto',
                                          justifyContent: 'center'
                                        }}
                                    >
                                        {item[1]}
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={item[0]}
                                        sx={{
                                          opacity: open ? 1 : 0
                                        }}
                                    />
                                </ListItemButton>
                            </NavLink>
                        </ListItem>
                    ))}
                </List>
                <List>
                    {[
                      ['Boris Markov', <Avatar key="loggedUser" />],
                      ['Back to the website', <KeyboardReturn key="return" />]
                    ].map((item, index) => (
                        <ListItem key={index} disablePadding sx={{ display: 'block' }}>
                            <NavLink
                                to={item[2] as string}
                                style={{
                                  color: 'black',
                                  textDecoration: 'none'
                                }}
                            >
                                <ListItemButton
                                    sx={{
                                      minHeight: 48,
                                      justifyContent: open ? 'initial' : 'center',
                                      px: 2.5
                                    }}
                                >
                                    <ListItemIcon
                                        sx={{
                                          minWidth: 0,
                                          mr: open ? 3 : 'auto',
                                          justifyContent: 'center'
                                        }}
                                    >
                                        {item[1]}
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={item[0]}
                                        sx={{ opacity: open ? 1 : 0 }}
                                    />
                                </ListItemButton>
                            </NavLink>
                        </ListItem>
                    ))}
                </List>
            </Box>
        </Drawer>
  )
}

export default NavBar
