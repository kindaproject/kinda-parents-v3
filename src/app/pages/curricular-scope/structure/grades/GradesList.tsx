import React from 'react'
import ModList from '../../../../../components/Mod/ModList/ModList'
import { curricularScopePlanStr, curricularScopeStr } from '../../complements/constants'


const MOCKDATA = [
    {
        id: 1,
        name: "Grado 1",
        team: "Equipo 1",
        nivel: "Nivel 1",
        classes: "Clase 1",
        register_by: "Usuario 1",
        register_designation: "designado",
        created_at: "2021-01-01",
        status: "Activo",
    },
    {
        id: 2,
        name: "Grado 2",
        team: "Equipo 2",
        nivel: "Nivel 2",
        classes: "Clase 2",
        register_by: "Usuario 2",
        register_designation: "designado",
        created_at: "2021-01-02",
        status: "Inactivo",
    },
    {
        id: 3,
        name: "Grado 3",
        team: "Equipo 3",
        nivel: "Nivel 3",
        classes: "Clase 3",
        register_by: "Usuario 3",
        register_designation: "designado",
        created_at: "2021-01-03",
        status: "Activo",

    },
    {
        id: 4,
        name: "Grado 4",
        team: "Equipo 4",
        nivel: "Nivel 4",
        classes: "Clase 4",
        register_by: "Usuario 4",
        register_designation: "designado",
        created_at: "2021-01-04",
        status: "Inactivo",

    }
]
const GradesList = () => {

    const headers: any = [
        {
            key: "name",
            label: "Nombre",

        },
        {
            label: "Equipo",
            key: "team",


        },
        {
            label: "nivel",
            key: "nivel",

        },
        {
            label: "Clases",
            key: "classes",

        },
        {
            key: "register_by",
            label: "Registrado por",

        },
        {
            key: "register_designation",
            label: "Designación registrador",


        },
        // {
        //     key: "created_at",
        //     label: "Ultima  actualización",


        // },
        {
            key: "status",
            label: "Estado",

        },
        {
            key: "actions",
            label: "Acciones",
            sortable: false,
        }
    ]
    const filtersConfig: any = [
        {
            name: "name",
            label: "Nombre",
            type: "text",
        },
    ]
    return (
        <ModList
            gestion={false}
            mod={{
                single: "Grado",
                plural: "Grados",
                subPageHeader: `- ${curricularScopeStr} - ${curricularScopePlanStr}`,
                linkPageHeader: "/",
            }}
            headers={headers}
            mockData={MOCKDATA}
            url="/"
            delUrl="/"
            filtersConfig={filtersConfig}
        />
    )
}

export default GradesList