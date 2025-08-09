import React from 'react'
import ModAdd, { FieldConfig } from '../../../../../components/Mod/ModAdd/ModAdd'
import { curricularScopeProgStr, curricularScopeStr, viewContentOptions } from '../../complements/constants'

const ManagementAdd = () => {


  const managementsFields: FieldConfig[] = [
    {
      name: 'name',
      label: 'Nombre de la gestión',
      type: 'text',
      rules: ['required'],
    },
    {
      name: 'year',
      label: 'Año correspondiente ala gestión',
      type: 'number',
      rules: ['required', 'number', 'same_year_as_all:activity_start_at,activity_end_at'],
    },
    {
      name: 'activity_start_at',
      label: 'Fecha de inicio actividades académicas',
      type: 'date',
      rules: ['required', 'date', 'date_before:activity_end_at'],
    },
    {
      name: 'activity_end_at',
      label: 'Fecha de finalización actividades académicas',
      type: 'date',
      // allValues:formstate,
      rules: ['required', 'date', 'date_after:activity_start_at'],
    },
    {
      name: 'activity_extended_at',
      label: 'Fecha de extensión de actividades académicas',
      type: 'date',
      onlyOnEdit: true,
      // rules: ['required', 'date'],

    },
    {
      name: 'view_content',
      label: 'Ver contenido',
      type: 'select',
      options: viewContentOptions,
    },
    // {
    //   name: 'allergies',
    //   label: 'Alergias',
    //   type: 'multiSelect',
    //   options: allergiesOptions,
    //   canAddNew: true,
    //   maxSelections: 1,
    //   rules: ['required'],

    // }

  ]
  const managmentsQuickGuide = [
    {
      heading: '¿Qué es una gestión académica?',
      text: 'Una gestión representa el periodo académico anual o ciclo institucional normalmente de 180 días en el que se desarrollan las clases, evaluaciones y actividades escolares.\n'
        + 'Controlar correctamente las gestiones es fundamental para organizar matrículas, asignaciones, clases y pagos por año.',
    },
    {
      heading: 'Nombre',
      text: 'Es el nombre principal con el que se identifica la gestión y se muestra publicamente.\nSe puede usar un nombre descriptivo como "Gestión escolar 2025"'
    },
    {
      heading: 'Año',
      text: 'Corresponde al año principal de la gestión y se utiliza como referencia general para todo lo que ocurre en ese periodo. Debe ser un número de cuatro dígitos y estar dentro de un rango lógico.\n'
        + 'Por ejemplo, si la gestión es para el año 2025, el año sería 2025.'
    },
    {
      heading: 'Fecha de inicio de actividades académicas',
      text: 'Fecha en la que comienzan oficialmente las actividades académicas para esta gestión. \n'
        + 'Debe estar dentro del año indicado y ser anterior a la fecha de fin.\n'
        + 'Por ejemplo , 2026-02-05."'
    },
    {
      heading: 'Fecha de finalización de actividades académicas',
      text: 'Fecha en la que finalizan las actividades escolares de la gestión. \n'
        + 'Debe ser posterior a la fecha de inicio y estar dentro del mismo año.\n'
        + 'Por ejemplo, si la fecha inicial es 2026-02-05, la fecha final puede ser 2026-05-15.'
    },
    {
      heading: 'Visibilidad',
      text: 'Permite definir quién puede ver el contenido de la gestión.\n'
        + 'Puede ser "Todos", "Solo administradores" o "Solo administradores y usuarios".\n'
        + 'Por ejemplo , "Solo administradores" para ocultar una gestión en preparación.'
    },
    {
      heading: 'Estado',
      text: 'Indica si la gestión está habilitada para ser utilizada activamente en el sistema.\n'
        + 'Debe estar activa para poder asignar clases, registrar estudiantes o generar reportes.\n'
        + 'Por ejemplo , true para mantener activa la gestión actual.'
    }

  ]


  return (
    <ModAdd
      title="Gestión"
      subtitle={`- ${curricularScopeStr} - ${curricularScopeProgStr}`}
      linkTitle='/curricular-scope/programming/managements'
      fields={managementsFields}
      quickGuideItems={managmentsQuickGuide}
      apiUrl="/admin/management/store"
      getEditUrl={(id) => `/admin/management/show/${id}`}
      editUrl={(id) => `/admin/management/data/${id}`}
    />

  )
}

export default ManagementAdd