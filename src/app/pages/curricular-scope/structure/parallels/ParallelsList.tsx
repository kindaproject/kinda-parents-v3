import React, { useState, useEffect } from "react";
import useAxios from "../../../../../hooks/useAxios";
import { useNavigate } from "react-router-dom";
import { getDateStrTimeMesShort } from "../../../../../components/utils/dates";
import { FilterConfig } from "../../../../../components/ui/FilterModal/FilterModal";
import ModList from "../../../../../components/Mod/ModList/ModList";

const ParallelsList = () => {
  const { execute } = useAxios();
  const [params, setParams]: any = useState({
    per_page: 10,
    page: 1,
  });
  const { data, reload } = useAxios("/parallels", "GET", params);

  const deleteRow = async (id: any) => {
    const response: any = await execute(`/parallels/${id}`, "DELETE", {});
    if (response?.status >= 200) {
      reload();
      setOpenDel(false);
    }
  };
  const [search, setSearch] = React.useState("");
  const navigate = useNavigate();
  const [parallels, setParallels] = React.useState({});
  const [initData, setInitData]: any = React.useState({});
  const [selectedRows, setSelectedRows] = React.useState<any>([]);
  const [openDel, setOpenDel] = React.useState(false);
  const [rowId, setRowId] = useState(null);

  useEffect(() => {
    reload();
  }, [params]);

  const headers = [
    {
      key: "name",
      label: "Nombre",
      onRender: (row: any) => {
        return (
          <div>
            <p style={{ fontWeight: "bold", color: 'var(--c_blackV3)' }}>
              {row.name}
            </p>
          </div>
        );
      },
    },
    { key: "category", label: "Categoría" },
    { key: "order", label: "Orden" },
    {
      key: "classes",
      label: "Clases",
      onRender: (row: any) => {
        return <p>{row.classes_count || 0}</p>;
      },
    },
    {
      key: "students",
      label: "Estudiantes",
      onRender: (row: any) => {
        return <p>{row.students_count || 0}</p>;
      },
    },
    {
      key: "updated_at",
      label: "Última actualización",
      onRender: (row: any) => {
        return <p>{getDateStrTimeMesShort(row?.updated_at)}</p>;
      },
    },
    {
      key:'status',
      label: 'Estado',
      onRender: (row: any) => {
        return <p className={row.status? 'badge badge-success' : 'badge badge-danger'}
        >{row.status ? 'Activo' : 'Inactivo'}</p>;
      },
    },
    {
      key: "actions",
      label: "Acciones",
      style: { width: "120px", textAlign: "center" },
    },
  ];

  const filtersConfig: FilterConfig[] = [
    {
      type: "select",
      label: "Categoría",
      name: "category",
      options: [
        { value: "primaria", label: "Primaria" },
        { value: "secundaria", label: "Secundaria" },
        { value: "all", label: "Todos" },
      ],
    },
    {
      type: "select",
      label: "Ordenar por",
      name: "sort_by",
      options: [
        { value: "updated_at", label: "Última actualización" },
        { value: "name", label: "Nombre" },
        { value: "order", label: "Orden" },
      ],
    },
    {
      type: "select",
      label: "Dirección de ordenamiento",
      name: "sort_direction",
      options: [
        { value: "asc", label: "Ascendente" },
        { value: "desc", label: "Descendente" },
      ],
    },
  ];

  // Datos mockeados para la tabla
  const mockData =  [
      {
        id: 1,
        name: "Paralelo A",
        category: "Primaria",
        order: 1,
        classes_count: 5,
        students_count: 25,
        updated_at: "2024-01-15T10:30:00",
        status: true
      },
      {
        id: 2,
        name: "Paralelo B",
        category: "Primaria",
        order: 2,
        classes_count: 4,
        students_count: 22,
        updated_at: "2024-01-14T15:45:00",
        status: true

      },
      {
        id: 3,
        name: "Paralelo C",
        category: "Secundaria",
        order: 1,
        classes_count: 6,
        students_count: 28,
        updated_at: "2024-01-13T09:20:00",
        status: false

      }
    ]

  

  return (
    <>
      <ModList
        gestion={false}
        mod={{
          single: "Paralelo",
          plural: "Paralelos",
          subPageHeader: "- Ámbito Curricular - Estructura - Paralelos",
          linkPageHeader: "/curricular-scope/structure/parallels",
        }}
        headers={headers}
        url="/parallels"
        delUrl="/parallels"
        mockData={mockData}
        filtersConfig={filtersConfig}
      />
    </>
  );
};

export default ParallelsList;