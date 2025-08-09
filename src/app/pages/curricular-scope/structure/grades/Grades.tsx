import React from 'react'
import { Route, Routes } from 'react-router-dom'
import GradesList from './GradesList'

const Grades = () => {
  return (
    <Routes>
    <Route index element={<GradesList />} />
  </Routes>
  )
}

export default Grades