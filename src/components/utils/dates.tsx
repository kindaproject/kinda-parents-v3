import { MONTHS } from "./strings";

const DAYS = [
  "domingo",
  "lunes",
  "martes",
  "miércoles",
  "jueves",
  "viernes",
  "sábado",
];
const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

export const getDateStrTimeMesShort = (date: Date | string) => {
  if (!date) return;

  const dateObj = typeof date === "string" ? new Date(date) : date;

  const mes = dateObj.getMonth() + 1;
  const dia = dateObj.getDate();
  const año = dateObj.getFullYear();
  const hora = dateObj.getHours().toString().padStart(2, "0");
  const minutos = dateObj.getMinutes().toString().padStart(2, "0");

  return `${mes}/${dia}/${año} ${hora}:${minutos}`;
};
export const getDateStrTimeMes = (date: Date | string) => {
  if (!date) return;

  const dateObj = typeof date === "string" ? new Date(date) : date;

  const mes = dateObj.getMonth() + 1;
  const dia = dateObj.getDate();
  const año = dateObj.getFullYear();
  const hora = dateObj.getHours().toString().padStart(2, "0");
  const minutos = dateObj.getMinutes().toString().padStart(2, "0");

  return `${dia} de ${MONTHS[mes]} del ${año},  ${hora}:${minutos}`;
};
export const getDateStrMes = (date: Date | string) => {
  if (!date) return;

  const dateObj = typeof date === "string" ? new Date(date) : date;

  const diaSemana = DAYS[dateObj.getDay()];
  const dia = dateObj.getDate();
  const mes = MONTHS[dateObj.getMonth() + 1];
  const año = dateObj.getFullYear();

  return `${capitalize(diaSemana)} ${dia} de ${mes} del ${año}`;
};

export const getTodayDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};
