
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useAxios from '../../../../../hooks/useAxios';
import TextDetail from '../../../../../components/TextDetail/TextDetail';
import PageHeader from '../../../../../components/PageHeader/PageHeader';

import Select from 'react-select';
import ModView from '../../../../../components/Mod/ModView/ModView';
import { getDateStrTimeMes, getDateStrTimeMesShort } from '../../../../../components/utils/dates';
import Button from '../../../../../components/ui/Button/Button';
import TabTableDetail from '../../../../../components/TabTableDetail/TabTableDetail';
import { curricularScopeProgStr, curricularScopeStr, viewContentOptions } from '../../complements/constants';





const ManagementsView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data, reload, loading } = useAxios(`/admin/management/detail/${id}`, 'GET', {
    page: 1,
    per_page: 10,
  });

  // console.log(data, ';data de magan')
  const management = data?.management;
  const navigate = useNavigate();

  const headers = [
    {
      key: "status", label: "Status", onRender: (row: any) => {
        return <p className="badge badge-light-success">{row?.status}</p>;
      },
    },
    { key: "endpoint", label: "Endpoint" },
    { key: "date", label: "Date" },
  ];

  const mockData = [
    {
      status: "200 OK",
      endpoint: "POST /v1/invoices/in_7876_1810/payment",
      date: "21 Feb 2023, 11:30 am",
    },
    {
      status: "500 ERR",
      endpoint: "POST /v1/invoices/in_5241_7881/invalid",
      date: "20 Dec 2023, 2:40 pm",
    },
  ];
  const headers2 = [
    { key: "event", label: "Event" },
    {
      key: "status",
      label: "Status",
      onRender: (row: any) => {
        // Color dinámico según el valor
        const variant = row.status === "Completed" ? "success" : "warning";
        return <span className={`badge badge-light-${variant}`}>{row.status}</span>;
      },
    },
    { key: "date", label: "Date" },
  ];

  const mockData2 = [
    {
      event: "Emma Smith has made payment to #XRS-45670",
      status: "Completed",
      date: "20 Dec 2023, 10:30 am",
    },
    {
      event: "Invoice #KID-45655 status has changed",
      status: "In Transit",
      date: "24 Jun 2023, 10:30 am",
    },
  ];

  const seconCard = [
    {
      id: 'kt_tab_logs',
      label: 'Logs',
      content: (

        <TabTableDetail
          data={mockData}
          headers={headers}
          linkToPath={'/curricular-scope/programming/managements'}
        />
      )
    },
    {
      id: 'kt_tab_events',
      label: 'Events',
      content: (
        <TabTableDetail
          data={mockData2}
          headers={headers2}
          linkToPath={'/curricular-scope/programming/managements'}
        />
      )
    }
  ]

  return (
    <ModView
      pageHeaderData={{
        title: 'Gestión',
        linkTitle: "/curricular-scope/programming/management",
        subtitle: `- ${curricularScopeStr} - ${curricularScopeProgStr} `,
      }}
      mod={{ single: 'Gestión' }}
      detailsLabels={
        [
          { label: 'Nombre', answerLabel: management?.name ?? '—' },
          { label: 'Año', answerLabel: management?.year ?? '—' },
          { label: 'Fecha de inicio de actividades académicas', answerLabel: getDateStrTimeMes(management?.activity_start_at) ?? '—' },
          { label: 'Fecha de finalización de actividades académicas', answerLabel: getDateStrTimeMes(management?.activity_end_at) ?? "—" },
          { label: 'Fecha de extensión de las actividades académicas', answerLabel: getDateStrTimeMes(management?.activity_extended_at) ?? '-' },
          { label: 'Nivel de visibilidad del contenido vinculado a esta gestión', answerLabel: viewContentOptions.find((option: any) => option.value === management?.view_content)?.label ?? '—' },
        ]
      }
      secondCard={true}
      secondCardTabs={seconCard}
      loading={loading}
    />

  );
};

export default ManagementsView;
