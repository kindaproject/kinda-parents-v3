import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAxios from "../../../../../hooks/useAxios";
import TextDetail from "../../../../../components/TextDetail/TextDetail";
import PageHeader from "../../../../../components/PageHeader/PageHeader";
import {
  adminLinkPageHeader,
  adminPageSubHeader,
  adminScopeEmplStr,
  adminScopeStr,
} from "../../complements/constants";
import Select from "react-select";
import ModView from "../../../../../components/Mod/ModView/ModView";
import {
  getDateStrTimeMes,
  getDateStrTimeMesShort,
} from "../../../../../components/utils/dates";
import Button from "../../../../../components/ui/Button/Button";
import TabTableDetail from "../../../../../components/TabTableDetail/TabTableDetail";
import TableActions from "../../../../../components/ui/TableAcions/TableActions";
import { makeAdminViewFields } from "./config";
import Avatar from "../../../../../components/ui/Avatar";
import { exampleLogs } from "../credential/config";
import LogTable from "../../../../../components/ui/LogTable/LogTable";


const methodColorMap: Record<string, string> = {
  post: "#D08F00", // dorado
  get: "#0366d6",
  put: "#0f9d58",
  delete: "#d9534f",
  patch: "#795548",
  default: "#6c757d",
};

const getResponseVariant = (code: number) => {
  if (code >= 500) return "danger";
  if (code >= 400) return "warning";
  if (code >= 200 && code < 300) return "success";
  return "secondary";
};



const AdminsView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data, reload, loading } = useAxios(
    `/admin/user/detail/${id}`,
    "GET",
    {
      page: 1,
      per_page: 10,
    }
  );
  const user = data?.user;
  const navigate = useNavigate();

  const headers = [
    {
      key: "status",
      label: "Status",
      onRender: (row: any) => {
        return <p className="badge badge-light-success">{row?.status}</p>;
      },
    },
    { key: "endpoint", label: "Endpoint" },
    { key: "date", label: "Date" },
    {
      key: "actions",
      label: "Acciones",
      onRender: (row: any) => {
        return (
          <TableActions
            onView={() => {
              navigate(
                `/curricular-scope/programming/managements/view/${row.id}`
              );
            }}
          />
        );
      },
    },
  ];







  const logs = data?.logs || [];

  const logsHeaders = [
    {
      key: "user",
      label: "usuario",
      width: 360,
      style: { width: "360px", textAlign: "center" },
      onRender: (row: any) => (
        <div style={{ display: "flex", alignItems: "center", gap: 12, width: '100%' }}>
          <div style={{ flexShrink: 0 }}>
            <img
              src={row.user_avatar}
              alt={row.user_fullname}
              style={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.1 }}>
            <div style={{ fontWeight: 600, fontSize: 14, color: "#1f2d3d" }}>
              {row.user_fullname}
            </div>
            <div style={{ fontSize: 12, color: "#6c7a93" }}>
              {row.user_designation}
            </div>
          </div>
        </div>
      ),
    },
    {
      key: "response",
      label: "codigo",
      onRender: (row: any) => {
        const variant = getResponseVariant(Number(row.response));
        const bg = getResponseVariant(Number(row.response));
        const color =
          variant === "success"
            ? "#056d50"
            : variant === "warning"
              ? "#a17500"
              : variant === "danger"
                ? "#a94442"
                : "#555";
        return (
          <div
            style={{
              display: "inline-block",
              padding: "4px 10px",
              borderRadius: 999,
              background: bg,
              // color,
              fontWeight: 600,
              fontSize: 12,
              minWidth: 60,
              textAlign: "center",
            }}
            className={`badge badge-light-${variant}`}
          >
            {row.response} OK
          </div>
        );
      },
    },
    {
      key: "method",
      label: "metodo",
      onRender: (row: any) => {
        const m = (row.method || "").toUpperCase();
        const color = methodColorMap[row.method?.toLowerCase()] || methodColorMap.default;
        return (
          <div
            style={{
              fontWeight: 600,
              fontSize: 12,
              color,
              textTransform: "uppercase",
            }}
          >
            {m}
          </div>
        );
      },
    },
    {
      key: "action",
      label: "ACCION",
      onRender: (row: any) => {
        const act = row.action || "";
        return (
          <div style={{ fontWeight: 500, fontSize: 13, textTransform: "capitalize" }}>
            {act}
          </div>
        );
      },
    },
    {
      key: "content",
      label: "contenido",
      onRender: (row: any) => (
        <div style={{ fontSize: 16, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {row.content ? (
            <i className="bi bi-check-circle-fill fs-5 text-success"></i>
          ) : (
            <i className="bi bi-x-circle-fill fs-5 text-danger"></i>
          )}
        </div>
      ),
    },
    {
      key: "request_at",
      label: "FECHA SOLICITUD",
      onRender: (row: any) => (
        <div style={{ fontSize: 12, color: "#6c7a93" }}>
          {getDateStrTimeMes(row.request_at)}
        </div>
      ),
    },
  ];


  const secondCardTabs = [
    {
      id: "kt_tab_logs",
      label: "Logs",
      content: (
        // <TabTableDetail
        //   data={exampleLogs}
        //   headers={logsHeaders}
        //   linkToPath={"/curricular-scope/programming/managements"}
        //   detailsButtonText="Ver todos los detalles"
        // />
        <LogTable
          logs={exampleLogs}
          linkToPath={"/curricular-scope/programming/managements"}
          detailsButtonText="Ver todos los detalles"
          onViewLog={(log) => {
            // Ejemplo: hacer algo con el log
            console.log("Ver log", log);
          }}
        />
      ),
    },
    // podés agregar más tabs (events, etc.) si vienen de data
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



  return (
    <ModView
      pageHeaderData={{
        title: "Administrador",
        subtitle: adminPageSubHeader,
        linkTitle: adminLinkPageHeader,
      }}
      mod={{ single: "Administrador" }}
      detailsLabels={makeAdminViewFields(data || {})}
      secondCard={true}
      secondCardTabs={secondCardTabs}
      loading={loading}
    />
  );
};

export default AdminsView;
