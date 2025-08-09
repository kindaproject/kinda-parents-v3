import React from 'react'
import ModAdd, { FieldConfig } from '../../../../../components/Mod/ModAdd/ModAdd'
import { curricularScopeProgStr, curricularScopeStr } from '../../../curricular-scope/complements/constants'
import { staffRoleFields, staffRoleQuickGuide } from './config'
// import { curricularScopeProgStr, curricularScopeStr, viewContentOptions } from '../../complements/constants'

const StaffRolesAdd = () => {





    return (
        <ModAdd
            title="Rol de personal"
            subtitle={`- ${curricularScopeStr} - ${curricularScopeProgStr}`}
            linkTitle='/administrative-scope/employee/staff_roles'
            fields={staffRoleFields}
            quickGuideItems={staffRoleQuickGuide}
            apiUrl="/admin/credential/store"
            getEditUrl={(id) => `/admin/credential/show/${id}`}
            editUrl={(id) => `/admin/credential/data/${id}`}
        />

    )
}

export default StaffRolesAdd