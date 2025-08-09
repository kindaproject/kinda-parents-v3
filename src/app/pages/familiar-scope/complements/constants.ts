export const adminScopeStr = "Ámbito administrativo";
export const adminScopeEmplStr = "Administración de empleados";

export const stageList: any = {
  1: { label: "Aplicación", value: 1, color: "badge-light-danger" },
  2: { label: "Valoración", value: 2, color: "badge-light-warning" },
  3: { label: "Inscripción", value: 3, color: "badge-light-success" },
};

// src/pages/administrative-scope/employee/students/MockData.ts
export interface StudentRecord {
  id: number;
  level_name: string;
  grade_name: string;
  shift_name: string;
  primary_lastname: string;
  stage: number;
  name: string;
  documents: string;
  assessment: string;
  assignament: string;
  date: string;
}

export const MOCKDATA: StudentRecord[] = [
  {
    id: 1,
    level_name: "Inicial",
    stage: 1,
    grade_name: "1-A",
    shift_name: "Mañana",
    primary_lastname: "González",
    name: "María",
    documents: "Completos",
    assessment: "Excelente",
    assignament: "Matemáticas",
    date: "2025-05-12",
  },
  {
    id: 2,
    level_name: "Primaria",
    stage: 2,
    grade_name: "3-B",
    shift_name: "Tarde",
    primary_lastname: "Ramírez",
    name: "Carlos",
    documents: "Pendientes",
    assessment: "Bueno",
    assignament: "Ciencias",
    date: "2025-04-28",
  },
  {
    id: 3,
    level_name: "Secundaria",
    stage: 1,
    grade_name: "2-C",
    shift_name: "Mañana",
    primary_lastname: "López",
    name: "Ana",
    documents: "Completos",
    assessment: "Regular",
    assignament: "Historia",
    date: "2025-05-03",
  },
  {
    id: 4,
    level_name: "Primaria",
    stage: 3,
    grade_name: "5-A",
    shift_name: "Tarde",
    primary_lastname: "Fernández",
    name: "Luis",
    documents: "Completos",
    assessment: "Excelente",
    assignament: "Lengua",
    date: "2025-05-20",
  },
  {
    id: 5,
    level_name: "Secundaria",
    stage: 1,
    grade_name: "4-D",
    shift_name: "Mañana",
    primary_lastname: "Sánchez",
    name: "Laura",
    documents: "Pendientes",
    assessment: "Bueno",
    assignament: "Inglés",
    date: "2025-05-15",
  },
];
