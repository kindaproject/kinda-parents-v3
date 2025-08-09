import React, { useState, useEffect } from "react";
import useAxios from "../../../../../hooks/useAxios";
import { useNavigate } from "react-router-dom";

import { adminScopeEmplStr, adminScopeStr, MOCKDATA, stageList } from '../../complements/constants';
import { getDateStrTimeMesShort } from "../../../../../components/utils/dates";
import { FilterConfig } from "../../../../../components/ui/FilterModal/FilterModal";
import ModList from "../../../../../components/Mod/ModList/ModList";

const AdmissionsList = () => {
    const { execute } = useAxios();
    const [params, setParams]: any = useState({
        per_page: 10,
        page: 1,
    });
    const { data, reload } = useAxios("/admin/user/index", "GET", params);

    const deleteRow = async (id: any) => {
        const response: any = await execute(`/admin/user/safe/${id}`, "DELETE", {});
        if (response?.status >= 200) {
            reload();
            setOpenDel(false);
        }
    };
    const [search, setSearch] = React.useState("");
    const navigate = useNavigate();
    const [admins, setAdmins] = React.useState({});
    const [initData, setInitData]: any = React.useState({});
    const [selectedRows, setSelectedRows] = React.useState<any>([]);
    const [openDel, setOpenDel] = React.useState(false);
    const [rowId, setRowId] = useState(null);

    useEffect(() => {
        reload();
        console.log("se cambio params", params);
    }, [params]);

    const headers = [
        { key: "level_name", label: "Nivel", },
        { key: "grade_name", label: "Grado", },
        { key: "shift_name", label: "Turno" },
        {
            key: "stage", label: "Etapa",
            onRender: (row: any) => {
                return (
                    <p
                        className={`badge ${stageList[row?.stage].color}`} style={{ fontSize: 12 }} >
                        {stageList[row?.stage].label}
                    </p>
                );
            }
        },
        { key: "primary_lastname", label: "Apellidos" },
        { key: "name", label: "Nombres" },
        { key: "documents", label: "Documentaciòn" },
        { key: "assessment", label: "Valoraciòn" },
        { key: "assignament", label: "Curso asignado" },
        {
            key: "date", label: "Fecha de admisiòn",
            onRender: (row: any) => {
                return (
                    <p>
                        {getDateStrTimeMesShort(row?.date)}
                    </p>
                );
            }
        },
        {
            key: "actions",
            label: "Acciones",
            style: { width: "120x", textAlign: "center" },
        },
    ];

    const filtersConfig: FilterConfig[] = [
        {
            type: "dateRange",
            label: "Fecha de creación",
            nameFrom: "created_at_min",
            nameTo: "created_at_max",
        },
        {
            type: "select",
            label: "Dos pasos verificado",
            name: "twostep_verified",
            options: [
                { value: "mail", label: "Mail" },
                { value: "phone", label: "Phone" },
                { value: "authenticator", label: "Authenticator" },
            ],
            placeholder: "Selecciona tipo de 2FA",
            isMulti: false,
        },
        {
            // Ahora es radio en lugar de switch
            type: "radioGroup",
            label: "Conectado",
            name: "is_connected",
            inline: true, // para que las opciones se muestren una al lado de otra
            options: [
                { value: true, label: "Sí" },
                { value: false, label: "No" },
                { value: null, label: "Todos" },
            ],
        },
        {
            // Ahora es radio en lugar de switch
            type: "radioGroup",
            label: "Disponible",
            name: "is_available",
            inline: true, // para que las opciones se muestren una al lado de otra
            options: [
                { value: true, label: "Disponible" },
                { value: false, label: "No disponible" },
                { value: null, label: "Todos" },
            ],
        },
        {
            type: "text",
            label: "Palabra clave",
            name: "keyword",
            placeholder: "Buscar…",
        },
        {
            type: "select",
            label: "Ordenar por",
            name: "sort_by",
            placeholder: "Selecciona orden",
            options: [
                { value: "created_at", label: "Fecha de creación" },
                { value: "name", label: "Nombre" },
                { value: "lastname", label: "Apellido" },
            ],
        },
        {
            type: "select",
            label: "Dirección de ordenamiento",
            name: "sort_direction",
            placeholder: "Selecciona dirección",
            options: [
                { value: "asc", label: "Ascendente" },
                { value: "desc", label: "Descendente" },
            ],
        },
    ];



    return (
        <>
            <ModList
                mod={{
                    single: "Admisiòn",
                    plural: "Admisiones",
                    subPageHeader: `- ${adminScopeStr} - ${adminScopeEmplStr} `,
                    linkPageHeader: "/familiar-scope/register/admissions",
                }}
                headers={headers}
                url="/admissions/index"
                delUrl="/admissions/safe"
                filtersConfig={filtersConfig}
                mockData={MOCKDATA}
            />
        </>
    );
};

export default AdmissionsList;
