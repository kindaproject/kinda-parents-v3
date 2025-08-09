import React, { useState, useEffect, useMemo } from "react";
import { useIntl } from "react-intl";
import { Link } from "react-router-dom";
import Select from "react-select";
import { Modal, Button, Spinner, Dropdown } from "react-bootstrap";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  ColumnDef,
} from "@tanstack/react-table";
import useAxios from "../../../../../hooks/useAxios";
import { KTIcon } from "../../../../../_metronic/helpers";
import Working from "../../../../../components/Working/Working";

type Level = { id: number; name: string };
type Class = { id: number; name: string };

interface Activity {
  id: number;
  name: string;
  type: string;
  location: string;
  start_date: string;
  start_time: string;
  end_date: string;
  end_time: string;
  suspended: number;
  status: string;
  color: string;
}

const Activities: React.FC = () => {
  const intl = useIntl();

  // 1️⃣ Niveles
  const { data: levelsData, loading: lvLoading } = useAxios("/initials/levels");
  const levels: Level[] = levelsData || [];
  const [selectedLevel, setSelectedLevel] = useState<number | null>(null);

  // 2️⃣ Clases para el nivel
  const {
    data: classesData,
    loading: clLoading,
    execute: loadClasses,
  } = useAxios();
  const classes: Class[] = classesData || [];

  useEffect(() => {
    if (selectedLevel !== null) {
      loadClasses(`/initials/classes/${selectedLevel}`);
    }
  }, [selectedLevel, loadClasses]);

  const [selectedClass, setSelectedClass] = useState<number | null>(null);

  // 3️⃣ Actividades para la clase
  const {
    data: actRaw,
    loading: actLoading,
    execute: loadActivities,
  } = useAxios();
  const [activities, setActivities] = useState<Activity[]>([]);

  const loadData = async () => {
    if (!selectedClass) return;
    const res = await loadActivities(`activity/class/all/${selectedClass}`);
    if (res?.data?.data) {
      const mapped: Activity[] = res.data.data.map((e: any) => ({
        id: e.id,
        name: e.name,
        type: e.type,
        location: e.location,
        start_date: e.start_formatted,
        start_time: e.start_time,
        end_date: e.end_formatted,
        end_time: e.end_time,
        suspended: e.suspended,
        status: e.statusName,
        color: e.statusColor,
      }));
      setActivities(mapped);
    }
  };

  // 4️⃣ Búsqueda local
  const [search, setSearch] = useState("");
  const filtered = useMemo(() => {
    if (!search) return activities;
    return activities.filter((a) =>
      a.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, activities]);

  // 5️⃣ Definición de columnas para React Table
  const columns = useMemo<ColumnDef<Activity>[]>(
    () => [
      { accessorKey: "name", header: "Nombre" },
      { accessorKey: "type", header: "Tipo" },
      { accessorKey: "location", header: "Ubicación" },
      {
        accessorKey: "start_date",
        header: "Inicia",
        cell: (info) => (
          <div>
            <div>{info.row.original.start_date}</div>
            <small className="text-muted">{info.row.original.start_time}</small>
          </div>
        ),
      },
      {
        accessorKey: "end_date",
        header: "Termina",
        cell: (info) => (
          <div>
            <div>{info.row.original.end_date}</div>
            <small className="text-muted">{info.row.original.end_time}</small>
          </div>
        ),
      },
      {
        accessorKey: "suspended",
        header: "Clases",
        cell: (info) => (
          <div>
            Clases{" "}
            {info.row.original.suspended === 0 ? "normales" : "suspendidas"}
            <br />
            <small className="text-muted">
              {info.row.original.suspended === 1
                ? "Durante la actividad"
                : "Todo el día"}
            </small>
          </div>
        ),
      },
      {
        accessorKey: "status",
        header: "Estado",
        cell: (info) => (
          <span className={`badge badge-light-${info.row.original.color}`}>
            {info.row.original.status}
          </span>
        ),
      },
      {
        id: "actions",
        header: "Acciones",
        cell: ({ row }) => (
          <Dropdown>
            <Dropdown.Toggle variant="light-sm" size="sm">
              Acciones <KTIcon iconName="down" />
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item
                as={Link}
                to="/academic-scope/development/activities/view">
                Ver
              </Dropdown.Item>
              <Dropdown.Item
                as={Link}
                to="/academic-scope/development/activities/edit">
                Editar
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => console.log("Desactivar", row.original.id)}
                className="text-danger">
                Desactivar
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        ),
      },
    ],
    []
  );

  const table = useReactTable({
    data: filtered,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  // 6️⃣ Modal de filtros
  const [showFilter, setShowFilter] = useState(false);

  return <Working />;
};

export default Activities;
