import TabTableDetail from "../../TabTableDetail/TabTableDetail";
import { getDateStrTimeMes } from "../../utils/dates";
import TableActions from "../TableAcions/TableActions";


interface LogItem {
    id: number | string;
    module?: string;
    user_type?: string;
    user_avatar?: string;
    user_fullname?: string;
    user_designation?: string;
    response: number;
    method?: string;
    action?: string;
    content?: boolean;
    request_at?: string;
    [key: string]: any;
}

interface LogTableProps {
    logs: LogItem[];
    linkToPath?: string;
    detailsButtonText?: string;
    onViewLog?: (log: LogItem) => void;
}

const methodColorMap: Record<string, string> = {
    post: "#D08F00",
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

const LogTable: React.FC<LogTableProps> = ({ logs, linkToPath, detailsButtonText, onViewLog }) => {
    const logsHeaders = [
        {
            key: "user",
            label: "USUARIO",
            onRender: (row: LogItem) => (
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ flexShrink: 0 }}>
                        <img
                            src={row.user_avatar || ""}
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
            label: "CÓDIGO",
            onRender: (row: LogItem) => {
                const variant = getResponseVariant(Number(row.response));
                let bg = "#f0f0f0";
                let color = "#555";

                if (variant === "success") {
                    bg = "#d1f2e7";
                    color = "#056d50";
                } else if (variant === "warning") {
                    bg = "#fff4ce";
                    color = "#a17500";
                } else if (variant === "danger") {
                    bg = "#fde2e2";
                    color = "#a94442";
                }

                return (
                    <div
                        style={{
                            display: "inline-block",
                            padding: "4px 10px",
                            borderRadius: 999,
                            fontWeight: 600,
                            fontSize: 12,
                            minWidth: 60,
                            textAlign: "center",
                            textTransform: "uppercase",
                        }}
                        className={`badge badge-light-${variant}`}
                    >
                        {row.response} {variant === "success" ? "OK" : ""}
                    </div>
                );
            },
        },
        {
            key: "method",
            label: "METODO",
            onRender: (row: LogItem) => {
                const m = (row.method || "").toUpperCase();
                const color = methodColorMap[(row.method || "").toLowerCase()] || methodColorMap.default;
                return (
                    <div
                        style={{
                            fontWeight: 600,
                            fontSize: 12,
                            color,
                            textTransform: "uppercase",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        {m}
                    </div>
                );
            },
        },
        {
            key: "action",
            label: "ACCIÓN",
            onRender: (row: LogItem) => {
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
            label: "CONTENIDO",
            onRender: (row: LogItem) => (
                <div style={{ fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center" }}>
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
            label: "FECHA DE SOLICITUD",
            onRender: (row: LogItem) => (
                <div style={{ fontSize: 12, color: "#6c7a93" }}>
                    {row.request_at ? getDateStrTimeMes(row.request_at) : "-"}
                </div>
            ),
        },
        {
            key: "actions",
            label: "ACCIONES",
            onRender: (row: LogItem) =>
                onViewLog ? (
                    <TableActions onView={() => onViewLog(row)} />
                ) : null,
        },
    ];

    return (
        <TabTableDetail
            data={logs}
            headers={logsHeaders}
            linkToPath={linkToPath}
            detailsButtonText={detailsButtonText}
        />
    );
};

export default LogTable;
export type { LogItem };
