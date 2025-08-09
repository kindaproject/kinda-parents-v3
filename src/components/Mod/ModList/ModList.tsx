import React, { useState, useEffect, useRef } from "react";
import useAxios from "../../../hooks/useAxios";
import TableActions from "../../ui/TableAcions/TableActions";
import InputSearch from "../../ui/InputSearch/InputSearch";
import { useNavigate } from "react-router-dom";
import Table from "../../ui/Table/Table";

import ModalDel from "../ModalDel/ModalDel";
import Pagination from "../../ui/Pagination/Pagination";
import FilterModal, { FilterConfig } from "../../ui/FilterModal/FilterModal";
import { getTodayDate } from "../../utils/dates";
import Icon from "../../ui/Icon/Icon";
import { IconAdd } from "../../ui/Icon/IconLibrary";
import Button from "../../ui/Button/Button";
import { useUI } from "../../../hooks/useUi";
import { useIntl } from "react-intl";
import PageHeader from "../../PageHeader/PageHeader";

interface Header {
  key: string;
  label: string | React.ReactNode;
  className?: string;
  onRender?: (item: Record<string, any>) => React.ReactNode;
}

interface ModListProps {
  mod: {
    single: string;
    plural: string;
    subPageHeader?: string;
    linkPageHeader?: string;
  };
  headers: Header[];
  mockData?: any[];
  url: string;
  delUrl: string;
  createPath?: string;
  viewPath?: (id: any) => string;
  editPath?: (id: any) => string;
  filter?: boolean;
  filtersConfig?: FilterConfig[];
  handleApplyFilter?: (filters: any) => void;
  selectable?: boolean;
  gestion?: boolean;
  delMsg?: any;
  tableEdit?: boolean;
  tableView?: boolean;
  tableDelete?: boolean;
}

const ModList = ({
  mod,
  headers: initialHeaders,
  mockData = [],
  url,
  delUrl,
  createPath = "create",
  viewPath = (id) => `view/${id}`,
  editPath = (id) => `edit/${id}`,
  filter = true,
  filtersConfig = [],
  // handleApplyFilter = () => { },
  selectable = false,
  gestion = false,
  delMsg,
  tableView = true,
  tableEdit = true,
  tableDelete = true,
}: ModListProps) => {
  const navigate = useNavigate();
  const { execute, loading: loadingExecute } = useAxios();
  const { showToast } = useUI();

  const [params, setParams]: any = useState({
    per_page: 10,
    page: 1,
    created_at_min: "2025-01-01",
    created_at_max: getTodayDate(),
  });

  const { data, reload, loading } = useAxios(url, "GET", params);
  const [openDel, setOpenDel] = useState(false);
  const [rowIdToDelete, setRowIdToDelete] = useState<any>(null);
  const [selectedRows, setSelectedRows] = useState<any>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const typingTimeout = useRef<NodeJS.Timeout | null>(null);

  const handleOpenDelModal = (id: any) => {
    setRowIdToDelete(id);
    setOpenDel(true);
  };

  const handleConfirmDelete = async () => {
    if (!rowIdToDelete) return;
    const { data }: any = await execute(
      `${delUrl}/${rowIdToDelete}`,
      "DELETE",
      {}
    );
    if (data?.status >= 200 && data.status < 300) {
      reload();
      setOpenDel(false);
      showToast({
        title: "Éxito",
        message: "Registro eliminado correctamente",
        type: "success",
      });
    } else {
      showToast({
        title: "Error",
        message: "No se pudo eliminar el registro",
        type: "error",
      });
    }
  };

  const [search, setSearch] = useState("");
  // const [filteredData, setFilteredData]: any = useState([]);

  useEffect(() => {
    reload();
  }, [params]);

  // useEffect(() => {
  //   if (data?.items) {
  //     setFilteredData(data.items);
  //   }
  // }, [data]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value || "";
    setSearch(term);

    if (typingTimeout.current) {
      clearTimeout(typingTimeout.current);
    }

    typingTimeout.current = setTimeout(() => {
      setParams((prev: any) => ({
        ...prev,
        search: term || null,
      }));
    }, 2000);

    if (!term) {
      // setFilteredData(data?.items || []);
      return;
    }
  };

  const handleApplyFilter = (filters: Record<string, any>) => {
    setParams((prev: any) => {
      // clonamos prev y forzamos page=1
      const next: Record<string, any> = { ...prev, page: 1 };

      for (const key in filters) {
        const val = filters[key];
        // si val es 'all' o vacío, borramos la clave de next
        if (
          val === "all" ||
          val === null ||
          val === undefined ||
          (typeof val === "string" && val.trim() === "") ||
          (Array.isArray(val) && val.length === 0)
        ) {
          delete next[key];
        } else {
          // si es un valor válido, lo actualizamos
          next[key] = val;
        }
      }

      return next;
    });

    setIsFilterOpen(false);
  };

  const headers = initialHeaders.map((h) => {
    if (h.key !== "actions") {
      return h;
    }
    // Si el propio header ya define onRender, lo respetamos
    if (h.onRender) {
      return h;
    }
    // En caso contrario, creamos un onRender que muestre TableActions
    return {
      ...h,
      headerStyle: {
        textAlign: "flex-end",
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
      },
      onRender: (row: any) => (
        <TableActions
          onView={
            tableView
              ? () => {
                  navigate(viewPath(row.id));
                }
              : undefined
          }
          onEdit={
            tableEdit
              ? () => {
                  navigate(editPath(row.id));
                }
              : undefined
          }
          onDelete={
            tableDelete
              ? () => {
                  handleOpenDelModal(row.id);
                }
              : undefined
          }
        />
      ),
    };
  });

  // Si NO había ninguna columna “actions” proporcionada, la añadimos al final:
  const hasActions = initialHeaders.some((h) => h.key === "actions");
  const finalHeaders: any = hasActions
    ? headers
    : [
        ...headers,
        {
          key: "actions",
          label: "Acciones",
          style: { width: "120px", textAlign: "flex-end" },
          onRender: (row: any) => (
            <TableActions
              onView={
                tableView
                  ? () => {
                      navigate(viewPath(row.id));
                    }
                  : undefined
              }
              onEdit={
                tableEdit
                  ? () => {
                      navigate(editPath(row.id));
                    }
                  : undefined
              }
              onDelete={
                tableDelete
                  ? () => {
                      handleOpenDelModal(row.id);
                    }
                  : undefined
              }
            />
          ),
        } as Header,
      ];

  const intl = useIntl();
  return (
    <>
      <section>
        <PageHeader
          title={mod.plural}
          subtitle={mod.subPageHeader}
          linkTitle={mod.linkPageHeader || "/"}
          gestion={gestion}
        />
        {/* {PageHeader} */}
      </section>

      <div className="card p-4  mt-4">
        <div className="card-header border-0 p-0 pt-6 d-flex justify-content-between align-items-center">
          <InputSearch
            search={search}
            handleSearch={handleSearch}
            placeholder={`Buscar ${mod.plural.toLowerCase()}`}
          />

          <div>
            {!selectedRows.length ? (
              <>
                {/* <button
                  className="btn btn-light-primary me-3"
                  onClick={() => setIsFilterOpen(true)}>
                  <i className="bi bi-funnel" /> Filtros
                </button> */}
                {filter && (
                  <Button
                    variant="secondary"
                    onClick={() => setIsFilterOpen(true)}
                    icon={<i className="bi bi-funnel" />}
                    loading={loading}>
                    {intl.formatMessage({
                      id: "TEXT.FILTERS",
                    })}
                  </Button>
                )}

                <Button
                  variant="primary"
                  onClick={() => navigate(createPath)}
                  icon={<Icon name={IconAdd} className="text-white" reverse />}>
                  {/* {intl.formatMessage({
                    id: "MENU.NEW",
                  })}{" "}
                  {mod.single.toLowerCase()} */}
                  {"Crear " + mod.single.toLocaleLowerCase()}
                </Button>
              </>
            ) : (
              <button className="btn btn-primary">
                Exportar ({selectedRows.length})
              </button>
            )}
          </div>
        </div>

        <div className="pt-4">
          <Table
            headers={finalHeaders}
            data={data?.items || mockData}
            selectable={selectable}
            onSelectionChange={setSelectedRows}
            // style={{
            //   height: "calc(100vh - 420px)",
            // }}
            // onRowClick={(row) => navigate(viewPath(row.id))}
            loading={loading}
          />
          <Pagination pagination={data?.pagination} setParams={setParams} />
        </div>
      </div>

      <ModalDel
        openDel={openDel}
        setOpenDel={setOpenDel}
        deleteRow={handleConfirmDelete}
        loading={loadingExecute}
        delMsg={delMsg}></ModalDel>

      {filter && (
        <FilterModal
          show={isFilterOpen}
          onClose={() => setIsFilterOpen(false)}
          onApply={(payload) => {
            handleApplyFilter(payload);
          }}
          filtersConfig={filtersConfig}
          applyText="Aplicar"
          resetText="Limpiar"
        />
      )}
    </>
  );
};

export default ModList;
