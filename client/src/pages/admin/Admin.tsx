import React from 'react'
import { Route, Routes } from 'react-router-dom'
import NavBar from '../../components/AdminNavBar'
import { Stack } from '@mui/material'
import AdminDashboard from './AdminDashboard'
import AdminReports from './AdminReports'
import AdminUsers from './AdminUsers'
import AdminDealerships from './AdminDealerships'
import AdminCars from './AdminCars'
import NotFound from './404'

const Admin: React.FC = () => (
    <Stack direction="row" spacing={1}>
        <NavBar />
        <Routes>
            <Route path="/admin/" element={<AdminDashboard />} />
            <Route path="/admin/cars" element={<AdminCars />} />
            <Route path="/admin/dealerships" element={<AdminDealerships />} />
            <Route path="/admin/users" element={<AdminUsers />} />
            <Route path="/admin/reports" element={<AdminReports />} />
            <Route path="/admin/*" element={<NotFound />} />
        </Routes>
    </Stack>
)

export default Admin
