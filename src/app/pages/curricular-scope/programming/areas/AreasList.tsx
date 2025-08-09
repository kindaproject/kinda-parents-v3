import React, { useState, useEffect } from "react";
import useAxios from "../../../../../hooks/useAxios";
import { useNavigate } from "react-router-dom";
import { FilterConfig } from "../../../../../components/ui/FilterModal/FilterModal";
import ModList from "../../../../../components/Mod/ModList/ModList";
import { useThemeMode } from "../../../../../_metronic/partials";
import { KTIcon } from "../../../../../_metronic/helpers";
import AsyncSelect from "../../../../../components/ui/AsyncSelect/AsyncSelect";
import { useIntl } from "react-intl";

const AreasList = () => {
  const headers = [
    {
      key: "id",
      label: "ID",
      width: 100,
      style: { width: "100px", textAlign: "center" },
    },
    {
      key: "code",
      label: "Código",
      width: 100,
      style: { width: "100px", textAlign: "center" },
    },
    {
      key: "name",
      label: "Nombre",

      onRender: (row: any) => {
        return (
          <div>
            <p
              style={{
                fontWeight: "bold",
              }}>
              {row.name} {row.lastname}
            </p>
          </div>
        );
      },
    },
    {
      key: "short_name",
      label: "Nombre Corto",
      width: 100,
      style: { width: "100px", textAlign: "center" },

      onRender: (row: any) => {
        return (
          <div>
            <p
              style={{
                fontWeight: "bold",
              }}>
              {row.short_name}
            </p>
          </div>
        );
      },
    },

    {
      key: "order",
      label: "Orden",
      width: 200,
      style: { width: "200px", textAlign: "center" },
    },
    {
      key: "components_count",
      label: "Cant. de componentes",
      width: 100,
      style: { width: "100px", textAlign: "center" },
    },
    {
      key: "matters_count",
      label: "Cant. de materias",
      width: 100,
      style: { width: "100px", textAlign: "center" },
    },
    {
      key: "status",
      label: "Estado",
      width: 100,
      style: { width: "100px", textAlign: "center" },
      onRender: (row: any) => {
        return (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div
              style={{ fontWeight: "500", textAlign: "center" }}
              className={`${
                row.status == "enabled"
                  ? "badge badge-success"
                  : "badge badge-danger"
              } `}>
              {row.status == "enabled" ? "Activado" : "Desactivado"}
            </div>
          </div>
        );
      },
    },

    {
      key: "actions",
      label: "Acciones",
      width: 140,
      style: { width: "140px", textAlign: "center" },
    },
  ];

  const filtersConfig: FilterConfig[] = [
    {
      type: "select",
      label: "Ordenar por",
      name: "sort_by",
      // placeholder: "Selecciona orden",
      options: [
        { value: "name", label: "Nombre" },
        { value: "ambit", label: "Ámbito" },
        { value: "priority", label: "Prioridad" },
        { value: "status", label: "Estado" },
        { value: "created_at", label: "Fecha de creación" },
        { value: "updated_at", label: "Última actualización" },
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

  return (
    <>
      <ModList
        gestion={false}
        mod={{
          single: "Área",
          plural: "Áreas",
          subPageHeader: "- Ámbito Curricular - Programación - Áreas",
          // linkPageHeader: adminLinkPageHeader,
        }}
        // filter={false}
        headers={headers}
        url="/admin/area/index"
        delUrl="/admin/area/delete"
        filtersConfig={filtersConfig}
        tableView={false}
        delMsg={
          <div>
            <strong>
              ¿Estás seguro de que deseas eliminar a este administrador?
            </strong>
            <p>
              Al confirmar, la cuenta quedará deshabilitada y no podrá acceder
              al sistema. Asegúrate de que no tenga tareas o procesos activos
              pendientes antes de continuar.
            </p>
          </div>
        }
      />
    </>
  );
};

export default AreasList;
