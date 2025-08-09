// src/pages/administrative-scope/employee/staffs/Staffs.tsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminsList from "./AdminsList";
import AdminsAdd from "./AdminsAdd";
import AdminsView from "./AdminsView";

const Admins: React.FC = () => (
  <Routes>
    <Route index element={<AdminsList />} />

    <Route path="create" element={<AdminsAdd />} />
    
    <Route path="edit/:id" element={<AdminsAdd />} />

    <Route path="view/:id" element={<AdminsView />} />
  </Routes>
);

export default Admins;
