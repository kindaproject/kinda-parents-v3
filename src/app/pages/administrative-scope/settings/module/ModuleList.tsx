import React, { useState, useEffect } from "react";
import useAxios from "../../../../../hooks/useAxios";
import { useNavigate } from "react-router-dom";

import {
  adminLinkPageHeader,
  adminPageSubHeader,
  adminScopeEmplStr,
  adminScopeStr,
  moduleLinkPageHeader,
  modulePageSubHeader,
} from "../../complements/constants";
import {
  getDateStrMes,
  getDateStrTimeMes,
  getDateStrTimeMesShort,
  getTodayDate,
} from "../../../../../components/utils/dates";
import { FilterConfig } from "../../../../../components/ui/FilterModal/FilterModal";
import ModList from "../../../../../components/Mod/ModList/ModList";
import { useThemeMode } from "../../../../../_metronic/partials";
import { KTIcon } from "../../../../../_metronic/helpers";
import AsyncSelect from "../../../../../components/ui/AsyncSelect/AsyncSelect";
import { useIntl } from "react-intl";

const ModuleList = () => {
  const headersAdmin = [
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
      key: "ambit",
      label: "Ámbito",
      // width: 100, return <p>{getDateStrTimeMes(row?.created_at)}</p>;
      width: 260,
      style: { width: "260px" },
    },

    {
      key: "permissions_count",
      label: "Cant. de permisos",
      width: 200,
      style: { width: "200px", textAlign: "center" },
    },
    {
      key: "priority",
      label: "Prioridad",
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
          single: "Modulo",
          plural: "Modulos",
          subPageHeader: modulePageSubHeader,
          linkPageHeader: moduleLinkPageHeader,
        }}
        // filter={false}
        headers={headersAdmin}
        url="/admin/module/index"
        delUrl="/admin/module/delete"
        filtersConfig={filtersConfig}
        tableView={false}
        delMsg={
          <div>
            <strong>¿Estás seguro de que deseas eliminar este módulo?</strong>
            <p>
              Al confirmar, el módulo quedará eliminado y no podrá ser accedido
              más. Asegúrate de que no tenga tareas o procesos activos
              pendientes antes de continuar.
            </p>
          </div>
        }
      />
    </>
  );
};

export default ModuleList;
