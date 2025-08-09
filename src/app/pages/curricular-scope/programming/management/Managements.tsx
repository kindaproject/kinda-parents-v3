// src/pages/administrative-scope/employee/staffs/Staffs.tsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import ManagementList from "./ManagementList";
import ManagementAdd from "./ManagementAdd";
import ManagementView from "./ManagementsView";

const Managements: React.FC = () => (
  <Routes>

    <Route index element={<ManagementList />} />

    <Route path="create" element={<ManagementAdd />} />

    <Route path="view/:id" element={<ManagementView />} />

    <Route path="edit/:id" element={<ManagementAdd />} />
  </Routes>
);

export default Managements;
