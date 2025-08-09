import React from 'react'
import ModList from '../../../../../components/Mod/ModList/ModList'
import { curricularScopePlanStr, curricularScopeStr } from '../../complements/constants'

// Datos de ejemplo para Niveles
const LEVELS_MOCKDATA = [
  {
    id: 1,
    name: 'Nivel 1',
    grade: 'Grado A',
    register_by: 'Usuario 1',
    created_at: '2021-01-01',
    status: 'Activo',
  },
  {
    id: 2,
    name: 'Nivel 2',
    grade: 'Grado B',
    register_by: 'Usuario 2',
    created_at: '2021-02-01',
    status: 'Inactivo',
  },
]

const LevelsList = () => {
  const headers: any = [
    { key: 'name', label: 'Nombres' },
    { key: 'grade', label: 'Grados' },
    { key: 'register_by', label: 'Registrado por' },
    { key: 'created_at', label: 'Última actualización' },
    { key: 'status', label: 'Estado' },
    { key: 'actions', label: 'Acciones', sortable: false },
  ]

  const filtersConfig: any = [
    { name: 'name', label: 'Nombres', type: 'text' },
  ]

  return (
    <ModList
      gestion={false}
      mod={{
        single: 'Nivel',
        plural: 'Niveles',
        subPageHeader: `- ${curricularScopeStr} - ${curricularScopePlanStr}`,
        linkPageHeader: '/',
      }}
      headers={headers}
      mockData={LEVELS_MOCKDATA}
      url='/'
      delUrl='/'
      filtersConfig={filtersConfig}
    />
  )
}

export default LevelsList
