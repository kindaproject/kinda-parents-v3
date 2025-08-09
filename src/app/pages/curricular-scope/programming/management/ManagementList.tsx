import React, { useState, useEffect, ChangeEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAxios from "../../../../../hooks/useAxios";
import Table from "../../../../../components/ui/Table/Table";
import ModList from "../../../../../components/Mod/ModList/ModList";
import { FilterConfig } from "../../../../../components/ui/FilterModal/FilterModal";
import { viewContentOptions } from "../../complements/constants";
import MultiSelect from "../../../../../components/ui/MultiSelect/MultiSelect";
import { Option } from "../../../../../components/ui/Select/Select";

const ManagementList: React.FC = () => {
  // Table headers
  const headers: any = [
    {
      key: "name",
      label: "Nombre completo",
    },
    {
      key: "year",
      label: "Año",
    },
    {
      key: "view_content",
      label: "Visibilidad del contenido",
      onRender: (row: any) => {
        return (
          <div>
            {
              viewContentOptions.find(
                (option) => option.value === row.view_content
              )?.label
            }
          </div>
        );
      },
    },

    {
      key: "is_available",
      label: "Estado",
      onRender: (row: any) => {
        // console.log(row);
        return (
          <div>
            {row.is_available ? (
              <span className="badge badge-success">Activo</span>
            ) : (
              <span className="badge badge-danger">Inactivo</span>
            )}
          </div>
        );
      },
    },
  ];
  const filtersConfig: FilterConfig[] = [
    {
      type: "number",
      label: "Año mínimo permitido",
      name: "year_min",
      // placeholder: "Año mínimo permitido",
    },
    {
      type: "number",
      label: "Año máximo permitido  ",
      name: "year_max",
      // placeholder: "Año máximo permitido",
    },
    {
      type: "select",
      label: "Visibilidad del contenido retornado de la gestión",
      name: "view_content",
      options: viewContentOptions,
    },

    {
      type: "select",
      label: "Disponibilidad de la gestión",
      name: "is_available",
      options: [
        { value: true, label: "Disponible" },
        { value: false, label: "No disponible" },
        { value: "all", label: "Todos" },
      ],
      defaultValue: "all",
    },
    {
      type: "select",
      label: "Ordenar por",
      name: "sort_by",
      placeholder: "Selecciona orden",
      options: [
        // { value: "created_at", label: "Fecha de creación" },
        { value: "updated_at", label: "Fecha de actualización" },
        { value: "name", label: "Nombre" },
        { value: "year", label: "Año" },
        { value: "view_content", label: "Visibilidad del contenido" },
        { value: "is_available", label: "Estado de disponibilidad" },
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
    <ModList
      mod={{
        single: "Gestión",
        plural: "Gestiones",
        subPageHeader: `- Ámbito Curricular - Programaciones académicas -  Gestiones académicas `,
      }}
      headers={headers}
      url="/admin/management/index"
      delUrl="/admin/management/safe"
      filtersConfig={filtersConfig}
    />
  );
};

export default ManagementList;
