// src/pages/administrative-scope/employee/staffs/Staffs.tsx
import React from 'react'
import { Routes, Route } from 'react-router-dom'
import StaffsList from './StaffsList'
import StaffAdd       from './StaffAdd'
import StaffView      from './StaffView'

const Staffs: React.FC = () => (
  <Routes>
    {/* /administrative-scope/employee/staffs */}
    <Route index element={<StaffsList />} />
    {/* /administrative-scope/employee/staffs/create */}
    <Route path="create" element={<StaffAdd />} />
    {/* /administrative-scope/employee/staffs/view/:id */}
    <Route path="view/:id" element={<StaffView />} />
    {/* /administrative-scope/employee/staffs/edit/:id */}
    <Route path="edit/:id" element={<StaffAdd />} />
  </Routes>
)

export default Staffs
