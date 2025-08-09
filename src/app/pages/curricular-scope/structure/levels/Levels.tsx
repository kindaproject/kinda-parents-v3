import React from 'react'
import { Route, Routes } from 'react-router-dom'
import LevelsList from './LevelsList'
import LevelsView from './LevelsView'

const Levels = () => {
  return (
    <Routes>
      <Route index element={<LevelsList />} />
      <Route path="view/:id" element={<LevelsView />} />
    </Routes>
  )
}

export default Levels