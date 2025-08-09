import React from 'react'
import ModAdd, { FieldConfig } from '../../../../../components/Mod/ModAdd/ModAdd'
import { adminScopeStaffStr, adminScopeStr } from '../../complements/constants'
import { Placeholder } from 'react-bootstrap';
import { staffFields, staffQuickGuide } from './config';

const StaffAdd = () => {


  return (
    <ModAdd
      title="Empleados"
      subtitle={`- ${adminScopeStr} - ${adminScopeStaffStr}`}
      linkTitle='/administrative-scope/employee/staffs'
      fields={staffFields}
      quickGuideItems={staffQuickGuide}
      apiUrl="/admin/staff/store"
      getEditUrl={(id) => `/admin/staff/show/${id}`}
      editUrl={(id) => `/admin/staff/data/${id}`}
    />
  );
};

export default StaffAdd;
