// src/pages/administrative-scope/employee/staffs/Staffs.tsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import ModuleList from "./ModuleList";
import ModuleAdd from "./ModuleAdd";
import ModuleView from "./ModuleView";

const Module: React.FC = () => (
  <Routes>
    <Route index element={<ModuleList />} />

    <Route path="create" element={<ModuleAdd />} />

    <Route path="edit/:id" element={<ModuleAdd />} />

    <Route path="view/:id" element={<ModuleView />} />
  </Routes>
);

export default Module;
