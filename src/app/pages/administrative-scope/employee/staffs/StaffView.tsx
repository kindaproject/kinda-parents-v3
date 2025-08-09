import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAxios from "../../../../../hooks/useAxios";
import TextDetail from "../../../../../components/TextDetail/TextDetail";
import PageHeader from "../../../../../components/PageHeader/PageHeader";
import { adminScopeEmplStr, adminScopeStr } from "../../complements/constants";

import { getDateStrTimeMes } from "../../../../../components/utils/dates";
import TabTableDetail from "../../../../../components/TabTableDetail/TabTableDetail";
import ModView from "../../../../../components/Mod/ModView/ModView";
import { makeStaffViewFields } from "./config";
import Avatar from "../../../../../components/ui/Avatar";
import { allergiesOptions } from "../../../../../components/utils/globalOptions";

const StaffView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data, loading } = useAxios(`/admin/staff/detail/${id}`, 'GET');
  const profile = data?.profile;
  const staff = data?.staff;
  const role = data?.role;
  const designation = data?.designation;



  const navigate = useNavigate();

  const registrosHeaders = [
    {
      key: "status",
      label: "Estado",
      onRender: (row: any) => {
        return <p className="badge badge-light-success">{row?.status}</p>;
      },
    },
    { key: "action", label: "Acción" },
    { key: "date", label: "Fecha" },
  ];

  const registrosMockData = [
    {
      status: "Completado",
      action: "Actualización de información personal",
      date: "21 Feb 2023, 11:30 am",
    },
    {
      status: "En proceso",
      action: "Cambio de horario",
      date: "20 Dec 2023, 2:40 pm",
    },
  ];

  const eventosHeaders = [
    { key: "event", label: "Evento" },
    {
      key: "status",
      label: "Estado",
      onRender: (row: any) => {
        const variant = row.status === "Completado" ? "success" : "warning";
        return (
          <span className={`badge badge-light-${variant}`}>{row.status}</span>
        );
      },
    },
    { key: "date", label: "Fecha" },
  ];

  const eventosMockData = [
    {
      event: "Asignación de nuevo curso",
      status: "Completado",
      date: "20 Dec 2023, 10:30 am",
    },
    {
      event: "Solicitud de permiso",
      status: "En revisión",
      date: "24 Jun 2023, 10:30 am",
    },
  ];
  const emergencyTableDetailHeaders = [
    { key: "emergency_fullname", label: "Nombre" },
    { key: "emergency_mail", label: "Correo electrónico" },
    {
      key: "emergency_reference", label: "Referencia",

    },
    {
      key: "emergency_phone", label: "Número de teléfono", onRender: (row: any) => {
        return (
          <div>
            {row.emergency_phone_code}  {row.emergency_phone}
          </div>
        )
      }
    },
    { key: 'emergency_phone_whatsapp', label: "Whatsapp" },
  ]



  const secondCardTabs = [
    {
      id: "kt_tab_logs",
      label: "Registros",
      content: (
        <TabTableDetail
          data={registrosMockData}
          headers={registrosHeaders}
          linkToPath={"/administrative-scope/employee/staffs"}
          detailsButtonText="Ver todos los registros"
        />
      ),
    },
    {
      id: "kt_tab_alergies",
      label: "Alergias",
      content: (
        <div>
          <div className="card-body p-3" style={{ maxHeight: '200px', overflowY: 'auto' }}>
            {allergiesOptions.map((allergy: any, i: number) => (
              <div
                key={i}
                className="d-flex align-items-center justify-content-between py-2"
              >
                <span>{allergy.label}</span>
              </div>
            ))}

          </div>
        </div>
      ),
    },
    {
      id: "kt_tab_emergency",
      label: "Datos de contacto de emergencia",
      content: (
        <TabTableDetail
          data={[
            {
              emergency_fullname: profile?.emergency_fullname,
              emergency_mail: profile?.emergency_mail,
              emergency_reference: profile?.emergency_reference,
              emergency_phone: profile?.emergency_phone,
              emergency_phone_code: profile?.emergency_phone_code,
              emergency_phone_whatsapp: profile?.emergency_phone_whatsapp,
            }
          ]}
          headers={emergencyTableDetailHeaders}
          linkToPath={"/administrative-scope/employee/staffs"}
        />
      ),
    },
    {
      id: "kt_tab_biography",
      label: "Biografía",

      content: (
        <div className="flex flex-col justify-center items-center gap-8 text-center">
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 8 }}>
            <Avatar
              name={'profile?.name'}
              // src={profile?.image}
              className="flex justify-center w-full"
            />
          </div>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium amet nobis, sit exercitationem eius, modi tempora atque nihil placeat ut quo eum quibusdam voluptatem alias voluptas nulla? Consequuntur, libero temporibus?</p>
        </div>
      ),
    },
  ];

  return (
    <ModView
      pageHeaderData={{
        title: staff?.name || 'Detalle de empleado',
        linkTitle: '/administrative-scope/employee/staffs',
        subtitle: `${adminScopeStr} - ${adminScopeEmplStr}`,
      }}
      mod={{ single: 'Empleado' }}
      detailsLabels={makeStaffViewFields(data || {})}
      secondCardTabs={secondCardTabs}
      loading={loading}

    />
  );
};

export default StaffView;