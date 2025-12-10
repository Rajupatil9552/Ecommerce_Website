import React from 'react'
import { Outlet } from 'react-router-dom'
import AdminNavbar from '../../components/AdminNavbar'

const AdminDashboard = () => {
  return (
    <div>
      <AdminNavbar />
      <Outlet />
    </div>
  )
}

export default AdminDashboard