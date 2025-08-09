// src/pages/administrative-scope/employee/staffs/Staffs.tsx
import React from 'react'
import { Routes, Route } from 'react-router-dom'

import StaffRolesList from './StaffRolesList'
import StaffRolesAdd from './StaffRolesAdd'


const StaffRoles: React.FC = () => (
    <Routes>
        {/* /administrative-scope/employee/staffs */}
        <Route index element={<StaffRolesList />} />

         <Route path="create" element={<StaffRolesAdd />} /> 

    </Routes>
)

export default StaffRoles
