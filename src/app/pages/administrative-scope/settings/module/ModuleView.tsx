import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAxios from "../../../../../hooks/useAxios";
import TextDetail from "../../../../../components/TextDetail/TextDetail";
import PageHeader from "../../../../../components/PageHeader/PageHeader";
import { adminScopeEmplStr, adminScopeStr, moduleLinkPageHeader, modulePageSubHeader } from "../../complements/constants";

import { getDateStrTimeMes } from "../../../../../components/utils/dates";
import TabTableDetail from "../../../../../components/TabTableDetail/TabTableDetail";
import ModView from "../../../../../components/Mod/ModView/ModView";
import Avatar from "../../../../../components/ui/Avatar";
import { allergiesOptions } from "../../../../../components/utils/globalOptions";

const ModuleView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data, loading } = useAxios(`/admin/module/detail/${id}`, "GET");

  const navigate = useNavigate();
  const makeStaffViewFields = ({ item }: any) => {
    return [
      // {
      //   label: "Nombre completo",
      //   answerLabel: `${(profile?.user_name || "")
      //     .replace(/_/g, " ")
      //     .replace(/\b\w/g, (c: string) => c.toUpperCase())}`,
      // },
      // { label: "Correo electrónico", answerLabel: staff?.mail || "—" },
      // {
      //   label: "Teléfono",
      //   answerLabel: staff?.phone
      //     ? `${staff.phone_code || ""} ${staff.phone}`.trim()
      //     : "—",
      // },
      // {
      //   label: "¿WhatsApp?",
      //   answerLabel:
      //     profile?.phone_whatsaapp === true
      //       ? "Sí"
      //       : profile?.phone_whatsaapp === false
      //       ? "No"
      //       : "—",
      // },
      // { label: "Rol", answerLabel: role?.name?.toLowerCase() || "—" },
      // { label: "Tipo de rol", answerLabel: staff?.role_main_type || "—" },
      // {
      //   label: "Fecha de contrato",
      //   answerLabel: staff?.contract_date
      //     ? getDateStrTimeMes(staff.contract_date)
      //     : "—",
      // },
      // { label: "Tipo de contrato", answerLabel: staff?.contract_type || "—" },
      // { label: "Documento", answerLabel: profile?.document || "—" },
      // { label: "Tipo Documento", answerLabel: profile?.document_type || "—" },
      // {
      //   label: "Nombre de otro documento",
      //   answerLabel: profile?.document_name || "—",
      // },
      // { label: "Nacionalidad", answerLabel: profile?.nacionality || "—" },
      // { label: "Lugar de nacimiento", answerLabel: profile?.birthplace || "—" },
      // { label: "Etnia", answerLabel: profile?.ethnicity || "—" },
      // { label: "Biografía", answerLabel: profile?.biography || "—" },
      // {
      //   label: "Fecha de nacimiento",
      //   answerLabel: profile?.birthdate
      //     ? getDateStrTimeMes(profile.birthdate)
      //     : "—",
      // },
      // { label: "Género", answerLabel: profile?.gender || "—" },
      // { label: "Dirección", answerLabel: profile?.address || "—" },
      // {
      //   label: "Dirección de Referencia",
      //   answerLabel: profile?.address_reference || "—",
      // },
      // { label: "Ciudad", answerLabel: profile?.address_city || "—" },
      // {
      //   label: "Departamento / Estado",
      //   answerLabel: profile?.address_state || "—",
      // },
      // {
      //   label: "Latitud",
      //   answerLabel: profile?.address_latitude || "—",
      // },
      // {
      //   label: "Longitud",
      //   answerLabel: profile?.address_longitude || "—",
      // },
      // { label: "Estado civil", answerLabel: profile?.marital_status || "—" },
      // {
      //   label: "Otro estado civil",
      //   answerLabel: profile?.marital_status_name || "—",
      // },
      // { label: "Tipo de sangre", answerLabel: profile?.blood_type || "—" },
      // {
      //   label: "Alergias",
      //   answerLabel:
      //     Array.isArray(profile?.allergies) && profile.allergies.length > 0
      //       ? profile.allergies.join(", ")
      //       : "—",
      // },

      // {
      //   label: "Supervisor",
      //   answerLabel: profile?.supervisor_id || "—",
      // },
      // {
      //   label: "Inicio de servicio",
      //   answerLabel: staff?.service_start_at
      //     ? getDateStrTimeMes(staff.service_start_at)
      //     : "—",
      // },
      // {
      //   label: "Fin de servicio",
      //   answerLabel: staff?.service_end_at
      //     ? getDateStrTimeMes(staff.service_end_at)
      //     : "—",
      // },
      {
        label: "Última actualización",
        answerLabel: "—",
      },
    ];
  };
  return (
    <ModView
      pageHeaderData={{
        title: data?.name || "Detalle de módulo",
        linkTitle: moduleLinkPageHeader,
        subtitle: modulePageSubHeader,
      }}
      mod={{ single: "Módulo" }}
      detailsLabels={makeStaffViewFields(data || {})}
      // secondCardTabs={secondCardTabs}
      loading={loading}
    />
  );
};

export default ModuleView;
