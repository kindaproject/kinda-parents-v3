import React from "react";
import { Routes, Route } from "react-router-dom";
import ParallelsList from "./ParallelsList";

// import ParallelsAdd from "./ParallelsAdd";


const Parallels: React.FC = () => (
  <Routes>
    <Route index element={<ParallelsList />} />

    {/* <Route path="create" element={<ParallelsAdd />} />
    
    <Route path="edit/:id" element={<ParallelsAdd />} /> */}

    {/* <Route path="view/:id" element={<ParallelsView />} /> */}
  </Routes>
);

export default Parallels;