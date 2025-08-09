import React, { useState, useEffect } from "react";
import useAxios from "../../../../../hooks/useAxios";
import { useNavigate } from "react-router-dom";

import {
  adminLinkPageHeader,
  adminPageSubHeader,
  adminScopeEmplStr,
  adminScopeStr,
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
import { filtersConfigAdmin, headersAdmin } from "./config";

const AdminsList = () => {
  const { execute } = useAxios();
  const [params, setParams]: any = useState({
    per_page: 10,
    page: 1,
  });
  const { reload } = useAxios("/admin/user/index", "GET", params);
  // const { data: data2 } = useAxios("/admin/staff/options", "GET", params);
  // console.log(data2);

  const deleteRow = async (id: any) => {
    const response: any = await execute(`/admin/user/safe/${id}`, "DELETE", {});
    if (response?.status >= 200) {
      reload();
      setOpenDel(false);
    }
  };

  const [openDel, setOpenDel] = React.useState(false);
  const [rowId, setRowId] = useState(null);

  useEffect(() => {
    reload();
    console.log("se cambio params", params);
  }, [params]);





  const intl = useIntl();
  return (
    <>
      {/* <AsyncSelect
        label="Tipo Documento"
        endpoint="/admin/staff/options"
        fieldKey="document_type"
        manualOptions={[
          { value: "identity", label: "Carnet de identidad" },
          { value: "passport", label: "Pasaporte" },
          { value: "other", label: "Otro" },
        ]}
        value={selectedStaff}
        onChange={opt => setSelectedStaff(opt)}
      /> */}
      <ModList
        gestion={false}
        mod={{
          single: intl.formatMessage({
            id: "TEXT.ADMIN.SINGLE",
          }),
          plural: intl.formatMessage({
            id: "TEXT.ADMIN.PLURAL",
          }),
          subPageHeader: adminPageSubHeader,
          linkPageHeader: adminLinkPageHeader,
        }}

        headers={headersAdmin}
        url="/admin/user/index"
        delUrl="/admin/user/delete"
        filtersConfig={filtersConfigAdmin}
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

export default AdminsList;
