import React from 'react'
import ModAdd, { FieldConfig } from '../../components/Mod/ModAdd/ModAdd'
import { staffQuickGuide } from './administrative-scope/employee/staffs/config'
import StaffView from './administrative-scope/employee/staffs/StaffView';

const Example = () => {
    const staffFields: FieldConfig[] = [
        {
            name: "name",
            label: "Nombres",
            type: "text",
            required: true,
            rules: ["required", "alphaSpaces"],
            // placeholder: 'Ingrese nombres'
        },
        {
            name: "primary_lastname",
            label: "Apellido paterno",
            type: "text",
            required: true,
            inline: true,
            rules: [
                'required',
                'alpha'
            ],
            style: { flex: 1 }

        },
        {
            name: 'secondary_lastname',
            label: 'Apellido materno',
            type: 'text',
            inline: true,
            style: { flex: 1 },


            required: false,
        },
        {
            name: 'mail',
            label: 'Correo electrónico',
            type: 'email',
            required: true,
            rules: [
                'required',
                'email'
            ],
            // placeholder: 'usuario@dominio.com'
        },
        {
            name: 'phone_code',
            label: 'Código de teléfono',
            type: 'select',

            // style: { minWidth: 20 },
            rowStyle: { flex: 'none', width: 100 },
            options: [
                { value: '591', label: '🇧🇴 +591' },
                { value: '54', label: '🇦🇷 +54' },
                { value: '55', label: '🇧🇷 +55' }
            ],
            required: false,
            inline: true,
            rules: [
                'required_if:phone',
                'max:5'
            ],
        },
        {
            name: "phone",
            label: "Teléfono",
            inline: true,
            type: "number",
            required: false,
            style: { width: '100%' },
            rowStyle: { flex: 1, },
            rules: [
                'number'
            ],
        },
        {
            name: "phone_whatsaapp",
            label: "¿WhatsApp?",
            type: "select",
            required: false,
            options: [
                { value: true, label: "Sí" },
                { value: false, label: "No" },
            ],
            style: { width: 200 },
            rowStyle: { flex: 'none', minWidth: 20 },
            inline: true,
            rules: [
                'required_if:phone,phone_code',
                'boolean'
            ],
        },
        {
            name: "contract_date",
            label: "Fecha de contrato",
            type: "date",
            required: true,
            inline: true,
            startNewRow: true,
            rules: [
                'required',
                'date_format:Y-m-d'
            ],
        },

        {
            name: 'role_id',
            label: 'Rol',
            type: 'asyncSelect',
            required: true,
            selectEndpoint: "/admin/staff_role/list",
            fieldKey: "role_id",
            inline: true,
            rules: ['required']
        },

        {
            name: "nacionality",
            label: "Nacionalidad",
            type: "text",
            required: true,
            rules: [
                'required',
                'alphaSpaces'
            ],
            inline: true,
            startNewRow: true

        },
        {
            name: "birthplace",
            label: "Lugar de nacimiento",
            type: "text",
            required: true,
            rules: [
                'required',
            ],
            inline: true,
            style: { width: '100%' }
        },
        {
            name: "ethnicity",
            label: "Etnia",
            type: "text",
            required: true,
            rules: [
                'required',
                'alphaSpaces'
            ],
        },

        {
            name: "address",
            label: "Dirección",
            type: "text",
            required: false,
            startNewRow: true,
            inline: true,
            style: {
                width: '100%'
            }
        },




        {
            name: "emergency_phone",
            label: "Teléfono de emergencia",
            type: "text",
            required: false,
            inline: true,
            style: { width: '100%' },
            rowStyle: { flex: 1, },

        },







        // solo opcionales

        {
            name: "birthdate",
            label: "Fecha de nacimiento",
            type: "date",
            required: false,
            inline: true,
            startNewRow: true,

        },

        {
            name: "biography",
            label: "Biografía",
            type: "textarea",
            required: false,

        },
        {
            name: 'allergies',
            label: 'Alergias',
            type: 'multiSelect',
            options: [
                { value: 'peanut', label: 'Maní' },
                { value: 'dairy', label: 'Lácteos' },
                { value: 'gluten', label: 'Gluten' },
                { value: 'eggs', label: 'Huevos' },
                { value: 'fish', label: 'Pescado' },
                { value: 'soy', label: 'Soja' },
                { value: 'tree_nuts', label: 'Frutos secos' },
                { value: 'shellfish', label: 'Pescado' },
                { value: 'sesame', label: 'Sesame' },
                { value: 'celery', label: 'Cebolla' },
                { value: 'mustard', label: 'Mostaza' },
                { value: 'sulphites', label: 'Sulfitos' },
            ],

            required: false,
            // rules: ['array_strings'],

        },
        //{
        //   name: 'allergies',
        //   label: 'Alergias',
        //   type: 'customDropdownSelect',
        //   manualOptions: [
        //     { value: 'peanut', label: 'Maní' },
        //     { value: 'dairy', label: 'Lácteos' },

        //   ],
        //   required: false,
        //   rules: ['array_strings'],

        // },
        {
            name: "blood_type",
            label: "Tipo de sangre",
            type: "text",
            required: false,
            startNewRow: true,
            inline: true
        },


    ];
    return (
        <div>?
            <div>Example</div>
     
            {/* <ModAdd
                title="Empleados"
                subtitle={`s`}
                linkTitle='/'
                fields={staffFields}
                quickGuideItems={staffQuickGuide}
                apiUrl="/admin/staff/store"
                getEditUrl={(id) => `/admin/staff/show/${id}`}
                editUrl={(id) => `/admin/staff/data/${id}`}
            /> */}
            <StaffView/>
        </div>
    )
}

export default Example