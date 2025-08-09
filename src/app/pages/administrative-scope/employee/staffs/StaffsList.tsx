import React, { useState } from "react";
import { adminScopeStaffStr, adminScopeStr } from "../../complements/constants";
import ModList from "../../../../../components/Mod/ModList/ModList";
import useAxios from "../../../../../hooks/useAxios";
import TableActions from "../../../../../components/ui/TableAcions/TableActions";
import { getDateStrTimeMes } from "../../../../../components/utils/dates";
import { dobleLine } from "../../../../../styles/themeStyles";
import Avatar from "../../../../../components/ui/Avatar";
import { FilterConfig } from "../../../../../components/ui/FilterModal/FilterModal";
import { filtersConfigStaff, headersStaff } from "./config";

const StaffsList = () => {

  /////////a/aaaaa
  const headers2 = [
    {
      key: "name",
      label: "Nombre completo",
      width: 180,
      onRender: (row: any) => (
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <Avatar src={row.avatar} name={row.name} />
          <div>
            <p style={{ fontWeight: "bold" }}>
              {row.name} {row.primary_lastname} {row.secondary_lastname}
            </p>
            <p>{row.designation_name}</p>
          </div>
        </div>
      ),
    },
    {
      key: "mail",
      label: "Correo electrónico",
      width: 260,
      style: { width: 260 },
    },
    // {
    //   key: "department_name",
    //   label: "Designación / Departamento",
    //   headerStyle: dobleLine,
    //   width: 160,
    // },

    // {
    //   key: "contract_date",
    //   label: "Fecha de contrato",
    //   headerStyle: dobleLine,
    //   width: 140,
    //   onRender: (row: any) => (
    //     <p style={dobleLine}>{getDateStrTimeMes(row.contract_date)}</p>
    //   ),
    // },
    {
      key: "contract_type",
      label: "Tipo de contrato",
      width: 160,
      style: { width: 160, textAlign: "center" },
      onRender: (row: any) => (
        <span
          className={`badge badge-${row.contract_type === "permanent" ? "primary" : "secondary"
            }`}>
          {row.contract_type === "permanent" ? "Permanente" : "Temporal"}
        </span>
      ),
    },

    {
      key: "is_available",
      label: "Estado",
      width: 100,
      style: { width: 100, textAlign: "center" },
      onRender: (row: any) => (
        <span
          className={`badge badge-${row.is_available ? "success" : "danger"}`}>
          {row.is_available ? "Disponible" : "No disponible"}
        </span>
      ),
    },
  ];
  /////aaa



  return (
    <ModList
      mod={{
        single: "Empleado",
        plural: "Empleados",
        subPageHeader: `- ${adminScopeStr} - ${adminScopeStaffStr}`,
        linkPageHeader: "/administrative-scope/employee/staffs",
      }}
      headers={headersStaff}
      // mockData={[]}
      url="/admin/staff/index"
      delUrl="/admin/staff/safe"
      filtersConfig={filtersConfigStaff}
      tableEdit={false}
    />
  );
};

export default StaffsList;
