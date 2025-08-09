import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAxios from "../../../../../hooks/useAxios";
import TextDetail from "../../../../../components/TextDetail/TextDetail";
import PageHeader from "../../../../../components/PageHeader/PageHeader";
import { adminScopeEmplStr, adminScopeStr, credentialLinkPageHeader, credentialPageSubHeader } from "../../complements/constants";

import { getDateStrTimeMes } from "../../../../../components/utils/dates";
import TabTableDetail from "../../../../../components/TabTableDetail/TabTableDetail";
import ModView from "../../../../../components/Mod/ModView/ModView";

import Avatar from "../../../../../components/ui/Avatar";
import { allergiesOptions, statusOptions } from "../../../../../components/utils/globalOptions";
import { makeStaffViewFields } from "../staffs/config";
import { buildSecondCardTabs, makeCredentialViewFields } from "./config";
import { getBadgeClassByStatus } from "../../../../../components/utils/globalTags";

const CredentialView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data, loading } = useAxios(`/admin/credential/detail/${id}`, 'GET');
  console.log(data, 'datita');
    const secondCardTabs = buildSecondCardTabs(data || {});




  // const navigate = useNavigate();


  // const designationsMockData = data?.designations;
  // const designationsHeaders = [
  //   { key: "name", label: "Nombre" },
  //   { key: "description", label: "Descripción" },
  // ];
  // const permissionData = data?.permission;
  // const permissionHeaders = [
  //   { key: "module_name", label: "Nombre del módulo" },
  //   { key: "permissions", label: "Permisos", onRender: (value: any) => value.join(', ') },
  // ];
  // const modulesData = data?.modules;
  // const modulesHeaders = [
  //   { key: "name", label: "Nombre" },
  //   { key: "code", label: "Código" },
  //   { key: "icon", label: "Icono" },
  //   { key: "ambit", label: "Ámbito" },
  //   { key: "status", label: "Estado" },
  //   { key: "updated_at", label: "Actualizado", onRender: (value: any) => getDateStrTimeMes(value) },
  // ];


  // const tagsData = [
  //   <TextDetail label={'Nombre'} answerLabel={data?.tag?.name} />,
  //   <TextDetail label={'Descripción'} answerLabel={data?.tag?.description} />,
  //   <TextDetail label={'Color'} answerLabel={<div style={{ backgroundColor: `${data?.tag?.color}`, borderRadius: 6, width: 'max-content', padding: 4 }}>aaa{data?.tag?.color}</div>} />,
  //   <TextDetail label={'Grupo'} answerLabel={data?.tag?.group} />,
  //   <TextDetail label={'Estado'} answerLabel={<div className={getBadgeClassByStatus(data?.tag?.status)}>{statusOptions.find((item) => item.value === data?.tag?.status)?.label}</div>} />,
  // ]




  // const secondCardTabs = [
  //   {
  //     id: "kt_tab_designations",
  //     label: "Designaciones",
  //     content: (
  //       <TabTableDetail
  //         data={designationsMockData}
  //         headers={designationsHeaders}
  //         linkToPath={"/administrative-scope/employee/staffs"}
  //         detailsButtonText="Ver todas las designaciones"
  //       />
  //     ),
  //   },
  //   {
  //     id: "kt_tab_modules",
  //     label: "Módulos",
  //     content: (
  //       <TabTableDetail
  //         data={modulesData}
  //         headers={modulesHeaders}
  //         // linkToPath={"/administrative-scope/employee/staffs"}
  //         detailsButtonText="Ver todos los módulos"
  //       />
  //     ),
  //   },
  //   {
  //     id: "kt_tab_permission",
  //     label: "Permisos",
  //     content: (
  //       <TabTableDetail
  //         data={permissionData}
  //         headers={permissionHeaders}
  //         linkToPath={"/administrative-scope/employee/staffs"}
  //         detailsButtonText="Ver todos los permisos"
  //       />
  //     ),
  //   },
  //   {
  //     id: "kt_tab_tags",
  //     label: "Etiquetas",
  //     content: (
  //       <div style={{display: 'flex', flexDirection: 'column',gap:6}}> 
  //         {tagsData}
  //       </div>
  //     ),
  //   },

  // ];





  return (
    <ModView
      pageHeaderData={{
        title: 'Detalle de credencial',
        linkTitle: credentialLinkPageHeader,
        subtitle: credentialPageSubHeader,
      }}
      mod={{ single: 'Credencial' }}
      detailsLabels={makeCredentialViewFields(data || {})}
      secondCardTabs={secondCardTabs}
      loading={loading}

    />
  );
};

export default CredentialView;