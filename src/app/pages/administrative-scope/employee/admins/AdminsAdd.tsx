import React from 'react';
import { useParams } from 'react-router-dom';

import { adminScopeStr, adminScopeEmplStr, adminLinkPageHeader, adminPageSubHeader } from '../../complements/constants';

import ModAdd, { FieldConfig } from '../../../../../components/Mod/ModAdd/ModAdd';
import { adminFields, adminQuickGuide } from './config';






const AdminsAdd: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <ModAdd
      title="Administrador"
      subtitle={adminPageSubHeader}
      linkTitle={adminLinkPageHeader}
      fields={adminFields}
      quickGuideItems={adminQuickGuide}
      apiUrl="/admin/user/store"
      getEditUrl={(id) => `/admin/user/show/${id}`}
      editUrl={(id) => `/admin/user/data/${id}`}

    />
  );
};

export default AdminsAdd;
