// src/pages/administrative-scope/employee/staffs/Staffs.tsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import AdmissionsList from "./AdmissionsList";
import AdmissionsView from "./AdmissionsView";


const Admissions: React.FC = () => (
    <Routes>

        <Route index element={<AdmissionsList />} />

        {/* <Route path="create" element={<ManagementAdd />} />*/}

        <Route path="view/:id" element={<AdmissionsView />} />
    </Routes>
);

export default Admissions;
