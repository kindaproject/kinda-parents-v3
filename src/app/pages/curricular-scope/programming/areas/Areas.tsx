// src/pages/administrative-scope/employee/staffs/Staffs.tsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import AreasList from "./AreasList";
import AreasAdd from "./AreasAdd";

// import ModuleAdd from "./ModuleAdd";
// import ModuleView from "./ModuleView";

const Areas: React.FC = () => (
  <Routes>
    <Route index element={<AreasList />} />

    <Route path="create" element={<AreasAdd />} />

    <Route path="edit/:id" element={<AreasAdd />} />

    {/* <Route path="view/:id" element={<ModuleView />} /> */}
  </Routes>
);

export default Areas;
