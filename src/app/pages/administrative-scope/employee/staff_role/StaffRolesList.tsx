import React from "react";
import ModList from "../../../../../components/Mod/ModList/ModList";
import type { FilterConfig } from "../../../../../components/ui/FilterModal/FilterModal";
import { filtersConfigStaffRole, staffRoleHeaders } from "./config";


const StaffRolesList: React.FC = () => {


    return (
        <ModList
            mod={{
                single: "Rol de Personal",
                plural: "Roles de Personal",
                subPageHeader: "- Gestión de Roles",
            }}
            headers={staffRoleHeaders}
            url="/admin/credential/index"
            delUrl="/admin/credential/safe"
            filtersConfig={filtersConfigStaffRole}
        />
    );
};

export default StaffRolesList;
