import { FieldConfig } from "../../../../../components/Mod/ModAdd/ModAdd";
import TabTableDetail from "../../../../../components/TabTableDetail/TabTableDetail";
import Avatar from "../../../../../components/ui/Avatar";
import { FilterConfig } from "../../../../../components/ui/FilterModal/FilterModal";
import { getDateStrTimeMes } from "../../../../../components/utils/dates";
import { allergiesOptions, contractTypeOptions, documentTypeOptions, genderOptions, maritalStatusOptions, parentsOptions, phoneCodeOpts, RoleMainTypeOptions, YesOrNoOptions } from "../../../../../components/utils/globalOptions";
import { dobleLine } from "../../../../../styles/themeStyles";





export const headersStaff = [
    {
        key: "name",
        label: "Nombre completo",
        width: 250,
        onRender: (row: any) => (
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <Avatar src={row.avatar} name={row.name} />
                <div>
                    <p style={{ fontWeight: "bold" }}>
                        {row.name} {row.primary_lastname} {row.secondary_lastname}
                    </p>
                    <p>{row.designation_name}</p>
                </div>
            </div>
        ),
    },
    {
        key: "mail",
        label: "Correo electrónico",
        width: 260,
        style: { width: 260 }
    },
    {
        key: "department_name",
        label: "Departamento",
        headerStyle: dobleLine,
        width: 160,
        onRender: (row: any) => (
            <p style={dobleLine}>{row.department_name || 'No especificado'}</p>
        ),
    },
    // {
    //   key: "department_name",
    //   label: "Designación / Departamento",
    //   headerStyle: dobleLine,
    //   width: 160,
    // },

    // {
    //   key: "contract_date",
    //   label: "Fecha de contrato",
    //   headerStyle: dobleLine,
    //   width: 140,
    //   onRender: (row: any) => (
    //     <p style={dobleLine}>{getDateStrTimeMes(row.contract_date)}</p>
    //   ),
    // },
    {
        key: "contract_type",
        label: "Tipo de contrato",
        width: 160,
        style: { width: 160, textAlign: "center" },
        onRender: (row: any) => (
            <span
                className={`badge badge-${row.contract_type === "permanent" ? "primary" : "secondary"
                    }`}>
                {row.contract_type === "permanent" ? "Permanente" : "Temporal"}
            </span>
        ),
    },

    {
        key: "is_available",
        label: "Estado",
        width: 100,
        style: { width: 100, textAlign: "center" },
        onRender: (row: any) => (
            <div style={{ display: "flex", justifyContent: "center" }}>
                <div
                    className={`badge badge-${row.is_available ? "success" : "danger"
                        }`}>
                    {row.is_available ? "Disponible" : "No disponible"}
                </div>
            </div>
        ),
    },
];

export const filtersConfigStaff: FilterConfig[] = [
    {
        type: "text",
        label: "Buscar por nombre o apellido",
        name: "name",
    },
    {
        type: "text",
        label: "Buscar por correo electrónico",
        name: "mail",
    },
    {
        type: "select",
        label: "Tipo de contrato",
        name: "contract_type",
        options: [
            { value: "permanent", label: "Permanente" },
            { value: "eventual", label: "Eventual" },
            { value: "temporary", label: "Temporal" },
            { value: "all", label: "Todos" },
        ],
        defaultValue: "all",
    },
    // {
    //   type: "date",
    //   label: "Fecha de contrato desde",
    //   name: "contract_date_from",
    // },
    // {
    //   type: "date",
    //   label: "Fecha de contrato hasta",
    //   name: "contract_date_to",
    // },
    {
        type: "select",
        label: "Estado de cuenta",
        name: "is_available",
        options: [
            { value: true, label: "Disponible" },
            { value: false, label: "No disponible" },
            { value: "all", label: "Todos" },
        ],
        defaultValue: "all",
    },
    {
        type: "select",
        label: "Ordenar por",
        name: "sort_by",
        options: [
            { value: "updated_at", label: "Fecha de actualización" },
            { value: "name", label: "Nombre" },
            { value: "contract_date", label: "Fecha de contrato" },
            { value: "contract_type", label: "Tipo de contrato" },
        ],
        placeholder: "Selecciona orden",
    },
    {
        type: "select",
        label: "Dirección de ordenamiento",
        name: "sort_direction",
        options: [
            { value: "asc", label: "Ascendente" },
            { value: "desc", label: "Descendente" },
        ],
        placeholder: "Selecciona dirección",
    },
];



//add 
export const staffFields: FieldConfig[] = [
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
        name: 'contract_type',
        label: 'Tipo de contrato',
        type: 'asyncSelect',
        inline: true,
        required: true,
        selectEndpoint: "/admin/staff/options",
        fieldKey: "contract_type",
        manualOptions: contractTypeOptions,
        rules: [
            'required',
        ],

    },
    {
        name: 'role_main_type',
        label: 'Tipo de rol',
        type: 'asyncSelect',
        style: { flex: 1, width: '100%' },
        startNewRow: true,
        inline: true,
        required: true,
        selectEndpoint: "/admin/staff/options",
        fieldKey: "role_main_type",
        manualOptions: RoleMainTypeOptions,
        rules: [
            'required',
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
        name: "supervisor_id",
        label: "Supervisor",
        type: "asyncSelect",
        selectEndpoint: "/admin/staff/list",
        fieldKey: "supervisor_id",
        startNewRow: true,
        inline: true,
        rowStyle: {
            flex: 1, width: '100%'
        },
        rules: ['required_if_boolean:role_main_type === "auxiliar"'],
        showIf: values => values.role_main_type === 'auxiliar',
    },
    {
        name: "service_start_at",
        label: "Inicio de servicio",
        type: "date",
        required: false,
        rules: [
            'required_if_boolean:role_main_type === "auxiliar"',
            'date_before:service_end_at'
        ],
        inline: true,
        rowStyle: { flex: 'none' },
        showIf: values => values.role_main_type === 'auxiliar',

    },

    {
        name: "service_end_at",
        label: "Fin de servicio",
        type: "date",
        required: false,
        rules: [
            'required_if_boolean:role_main_type === "auxiliar"',
            'date_after:service_start_at'
        ],
        inline: true,
        rowStyle: { flex: 'none' },

        style: {
            width: '100%'
        },
        showIf: values => values.role_main_type === 'auxiliar',

    },

    {
        name: "document",
        label: "Documento",
        type: "text",
        required: true,
        inline: true,
        startNewRow: true,
        rules: ['required',],
    },
    {
        name: "document_type",
        label: "Tipo Documento",
        type: "asyncSelect",
        inline: true,
        selectEndpoint: "/admin/staff/options",
        fieldKey: "document_type",
        required: true,
        // style: { width: '30%' },
        manualOptions: documentTypeOptions,
        rules: ['required'],
    },
    
    {
        name: "document_name",
        label: "Nombre de otro documento",
        type: "text",
        required: false,
        inline: true,
        rules: [
            'required_if_boolean:document_type === "other"',
        ],
        showIf: values => values.document_type === 'other',
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
        name: "address_reference",
        label: "Referencia de dirección",
        type: "text",
        required: false,
        inline: true,
        style: { width: '100%' },
        rules: [
            'required_if:address',
        ],
        showIf: values => values.address,
    },
    {
        name: "address_city",
        label: "Ciudad",
        type: "text",
        required: false,
        startNewRow: true,
        inline: true,
        rules: [
            'required_if:address',
        ],
        style: { width: '100%' },
        showIf: values => values.address,

    },
    {
        name: "address_state",
        label: "Departamento / Estado",
        type: "text",
        required: false,
        rules: [
            'required_if:address',
        ],
        inline: true,
        style: { width: '100%' },
        showIf: values => values.address,

    },
    {
        name: "address_latitude",
        label: "Latitud",
        type: "number",
        required: false,
        rules: [
            'required_if:address',
            'between:-90,90'
        ],
        startNewRow: true,
        inline: true,
        style: { width: '100%' },
        showIf: values => values.address,

    },
    {
        name: "address_longitude",
        label: "Longitud",
        type: "number",
        required: false,
        rules: [
            'required_if:address',
            'between:-180,180'
        ],
        style: { width: '100%' },
        showIf: values => values.address,
        inline: true
    },
    {
        name: 'marital_status',
        label: 'Estado civil',
        type: 'asyncSelect',
        required: false,
        selectEndpoint: "/admin/staff/options",
        fieldKey: "marital_status",
        manualOptions: maritalStatusOptions,
        startNewRow: true,
        inline: true
    },
    {
        name: "marital_status_name",
        label: "Otro estado civil",
        type: "text",
        required: false,
        rules: [
            'required_if_boolean:marital_status === "custom"',],
        inline: true,
        showIf: values => values.marital_status === 'custom',
    },


    {
        name: "emergency_phone_code",
        label: "Código emergencia",
        type: "select",
        required: false,
        inline: true,
        startNewRow: true,
        style: { width: 100 },
        rowStyle: { flex: 'none', width: 100 },

        options: phoneCodeOpts,
        rules: [
            'required_if:emergency_phone',
            'max:5',
        ],



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
    {
        name: "emergency_phone_whatsapp",
        label: "¿WhatsApp emergencia?",
        type: "select",
        required: false,
        options: YesOrNoOptions,
        rules: [
            'required_if:emergency_phone,emergency_phone_code',
        ],
        inline: true,
        style: { width: 200 },
        rowStyle: { flex: 'none', minWidth: 20 },

    },
    {
        name: "emergency_fullname",
        label: "Nombre emergencia",
        type: "text",
        required: false,
        rules: [
            'required_if:emergency_phone',
        ],
        showIf: values => values.emergency_phone,
        inline: true,
        startNewRow: true,
        style: {
            width: '100%'
        }
    },
    {
        name: "emergency_mail",
        label: "Correo emergencia",
        type: "email",
        required: false,
        inline: true,
        startNewRow: true,
        style: {
            width: '100%'
        },
        rules: ['email'],
        showIf: values => values.emergency_phone,
    },
    {
        name: "emergency_reference",
        label: "Referencia emergencia",
        type: "select",
        required: false,
        inline: true,
        // startNewRow: true,
        options: parentsOptions,
        rules: ["required_if:emergency_phone", "string", "in:options"],

        showIf: values => values.emergency_phone,
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
        name: 'gender',
        label: 'Género',
        type: 'asyncSelect',
        inline: true,
        selectEndpoint: "/admin/staff/options",
        fieldKey: "gender",
        required: false,
        manualOptions: genderOptions
    },
    {
        name: "biography",
        label: "Biografía",
        type: "textarea",
        required: false,

    },
    // {
    //     name: 'allergies',
    //     label: 'Alergias',
    //     type: 'tagsInput',
    //     required: false,
    //     rules: ['array_strings'],

    // },
    {
        name: 'allergies',
        label: 'Alergias',
        type: 'multiSelect',
        options: allergiesOptions,
        required: false,
    },
    {
        name: "blood_type",
        label: "Tipo de sangre",
        type: "text",
        required: false,
        startNewRow: true,
        inline: true
    },


];

export const staffQuickGuide = [
    {
        heading: 'Módulo de personal',
        text: 'En este módulo podrás agregar personal a la administración de tu empresa, incluyendo datos personales, contacto, documentación, y asignación de roles.'
    },
    {
        heading: 'Nombre completo',
        text: 'Incluye los nombres y apellidos del personal. Es importante escribir los nombres tal como figuran en documentos oficiales.'
    },
    {
        heading: 'Correo electrónico',
        text: 'Correo corporativo con dominio @kindagolden.pro. Es necesario para el acceso al sistema y la comunicación interna.'
    },
    {
        heading: 'Teléfono',
        text: 'Número de contacto del personal. Si se proporciona un número, también debe completarse el código de país y si tiene WhatsApp.'
    },
    {
        heading: '¿WhatsApp?',
        text: 'Indica si el número de teléfono proporcionado tiene WhatsApp para facilitar la comunicación.'
    },
    {
        heading: 'Tipo de rol',
        text: 'Selecciona el tipo de rol principal del personal: docente, administrativo o auxiliar. Esto define su área de trabajo.'
    },
    {
        heading: 'Fecha de contrato',
        text: 'Fecha oficial de inicio del contrato del personal. Utilízala para registros legales y administrativos.'
    },
    {
        heading: 'Tipo de contrato',
        text: 'Especifica si el contrato es eventual, permanente o temporal. Esto define la duración y condiciones del vínculo laboral.'
    },
    {
        heading: 'Documento',
        text: 'Número del documento de identidad que utiliza el personal. \nEj.: número de carnet o pasaporte.'
    },
    {
        heading: 'Tipo Documento',
        text: 'Tipo de documento usado: carnet de identidad, pasaporte u otro. Selecciona según el país de origen.'
    },
    {
        heading: 'Nombre de otro documento',
        text: 'Si seleccionaste "Otro" como tipo de documento, aquí debes especificar el nombre o descripción del mismo.'
    },
    {
        heading: 'Nacionalidad',
        text: 'País de nacionalidad del personal. Este dato puede ser requerido para trámites o contratos.'
    },
    {
        heading: 'Lugar de nacimiento',
        text: 'Ciudad, departamento o país donde nació el personal.'
    },
    {
        heading: 'Etnia',
        text: 'Grupo étnico con el que se identifica el personal. Puede ser útil para estadísticas institucionales.'
    },
    {
        heading: 'Biografía',
        text: 'Información breve sobre la trayectoria, logros o formación del personal. Campo opcional.'
    },
    {
        heading: 'Fecha de nacimiento',
        text: 'Fecha en la que nació el personal. Asegúrate de que sea una fecha válida.'
    },
    {
        heading: 'Género',
        text: 'Selecciona el género con el que se identifica el personal. Este campo es opcional.'
    },
    {
        heading: 'Dirección',
        text: 'Dirección actual del personal. Incluye calle, zona o avenida.'
    },
    {
        heading: 'Referencia de dirección',
        text: 'Información adicional que ayude a ubicar la dirección. \nEj.: cerca de una plaza, esquina, etc.'
    },
    {
        heading: 'Ciudad',
        text: 'Ciudad en la que reside el personal actualmente.'
    },
    {
        heading: 'Departamento / Estado',
        text: 'Departamento, estado o provincia donde reside el personal.'
    },
    {
        heading: 'Latitud y Longitud',
        text: 'Coordenadas geográficas de la dirección del personal. Se puede obtener con un GPS o Google Maps.'
    },
    {
        heading: 'Estado civil',
        text: 'Estado civil actual del personal: soltero, casado, divorciado, viudo u otro.'
    },
    {
        heading: 'Otro estado civil',
        text: 'Si se seleccionó "Otro", aquí se debe especificar el estado civil.'
    },
    {
        heading: 'Tipo de sangre',
        text: 'Grupo sanguíneo del personal. Información útil en emergencias.'
    },
    {
        heading: 'Alergias',
        text: 'Alergias conocidas del personal. Información importante para situaciones médicas.'
    },
    {
        heading: 'Teléfono de emergencia',
        text: 'Número de contacto en caso de emergencia. Asegúrate de que esté activo.'
    },
    {
        heading: 'Código emergencia',
        text: 'Código de país para el número de emergencia.\n Ej.: +591 para Bolivia.'
    },
    {
        heading: '¿WhatsApp emergencia?',
        text: 'Indica si el contacto de emergencia tiene WhatsApp.'
    },
    {
        heading: 'Nombre emergencia',
        text: 'Nombre completo de la persona de contacto en caso de emergencia.'
    },
    {
        heading: 'Correo emergencia',
        text: 'Correo electrónico del contacto de emergencia.'
    },
    {
        heading: 'Referencia emergencia',
        text: 'Relación con la persona de emergencia.\n Ej.: padre, madre, amigo, etc.'
    },
    {
        heading: 'Rol',
        text: 'Rol específico asignado al personal dentro del sistema.'
    },
    {
        heading: 'Supervisor',
        text: 'Si el personal es auxiliar, debe asignarse un supervisor responsable.'
    },
    {
        heading: 'Inicio y fin de servicio',
        text: 'Fechas en las que inicia y finaliza el servicio o periodo de trabajo del personal.'
    },
];


//view
// Genera los campos de detalle
export interface StaffViewData {
    profile: any;
    staff: any;
    role: any;
    designation: any;
}
export function makeStaffViewFields({
    profile,
    staff,
    role,
    designation,
}: StaffViewData) {
    return [
        {
            label: "Nombre completo",
            answerLabel: `${(profile?.user_name || "")
                .replace(/_/g, " ")
                .replace(/\b\w/g, (c: string) => c.toUpperCase())}`,
        },
        { label: "Correo electrónico", answerLabel: staff?.mail || "—" },
        {
            label: "Teléfono",
            answerLabel: staff?.phone
                ? `${staff.phone_code || ""} ${staff.phone}`.trim()
                : "—",
        },
        {
            label: "¿WhatsApp?",
            answerLabel:
                profile?.phone_whatsaapp === true
                    ? "Sí"
                    : profile?.phone_whatsaapp === false
                        ? "No"
                        : "—",
        },
        { label: "Rol", answerLabel: role?.name?.toLowerCase() || "—" },
        { label: "Tipo de rol", answerLabel: staff?.role_main_type || "—" },
        {
            label: "Fecha de contrato",
            answerLabel:
                staff?.contract_date
                    ? getDateStrTimeMes(staff.contract_date)
                    : "—",
        },
        { label: "Tipo de contrato", answerLabel: staff?.contract_type || "—" },
        { label: "Documento", answerLabel: profile?.document || "—" },
        { label: "Tipo Documento", answerLabel: profile?.document_type || "—" },
        {
            label: "Nombre de otro documento",
            answerLabel: profile?.document_name || "—",
        },
        { label: "Nacionalidad", answerLabel: profile?.nacionality || "—" },
        { label: "Lugar de nacimiento", answerLabel: profile?.birthplace || "—" },
        { label: "Etnia", answerLabel: profile?.ethnicity || "—" },
        { label: "Biografía", answerLabel: profile?.biography || "—" },
        {
            label: "Fecha de nacimiento",
            answerLabel: profile?.birthdate
                ? getDateStrTimeMes(profile.birthdate)
                : "—",
        },
        { label: "Género", answerLabel: profile?.gender || "—" },
        { label: "Dirección", answerLabel: profile?.address || "—" },
        {
            label: "Dirección de Referencia",
            answerLabel: profile?.address_reference || "—",
        },
        { label: "Ciudad", answerLabel: profile?.address_city || "—" },
        {
            label: "Departamento / Estado",
            answerLabel: profile?.address_state || "—",
        },
        {
            label: "Latitud",
            answerLabel: profile?.address_latitude || "—",
        },
        {
            label: "Longitud",
            answerLabel: profile?.address_longitude || "—",
        },
        { label: "Estado civil", answerLabel: profile?.marital_status || "—" },
        {
            label: "Otro estado civil",
            answerLabel: profile?.marital_status_name || "—",
        },
        { label: "Tipo de sangre", answerLabel: profile?.blood_type || "—" },
        {
            label: "Alergias",
            answerLabel: Array.isArray(profile?.allergies) &&
                profile.allergies.length > 0
                ? profile.allergies.join(", ")
                : "—",
        },
        // {
        //     label: "Teléfono de emergencia",
        //     answerLabel: profile?.emergency_phone
        //         ? `${profile.emergency_phone_code || ""} ${profile.emergency_phone}`.trim()
        //         : "—",
        // },
        // {
        //     label: "¿WhatsApp emergencia?",
        //     answerLabel:
        //         profile?.emergency_phone_whatsapp === true
        //             ? "Sí"
        //             : profile?.emergency_phone_whatsapp === false
        //                 ? "No"
        //                 : "—",
        // },
        // { label: "Nombre emergencia", answerLabel: profile?.emergency_fullname || "—" },
        // { label: "Correo emergencia", answerLabel: profile?.emergency_mail || "—" },
        // {
        //     label: "Referencia emergencia",
        //     answerLabel: profile?.emergency_reference || "—",
        // },
        {
            label: "Supervisor",
            answerLabel: profile?.supervisor_id || "—",
        },
        {
            label: "Inicio de servicio",
            answerLabel: staff?.service_start_at
                ? getDateStrTimeMes(staff.service_start_at)
                : "—",
        },
        {
            label: "Fin de servicio",
            answerLabel: staff?.service_end_at
                ? getDateStrTimeMes(staff.service_end_at)
                : "—",
        },
        {
            label: "Última actualización",
            answerLabel: profile?.updated_at
                ? getDateStrTimeMes(profile.updated_at)
                : "—",
        },
    ];
}

// Genera las pestañas de “Registros” y “Eventos”
// export function makeStaffSecondCardTabs() {
//     return [
//         {
//             id: "kt_tab_logs",
//             label: "Registros",
//             content: (
//                 <TabTableDetail
//                     data={registrosMockData}
//                     headers={registrosHeaders}
//                     linkToPath="/administrative-scope/employee/staffs"
//                     detailsButtonText="Ver todos los registros"
//                 />
//             ),
//         },
//         {
//             id: "kt_tab_events",
//             label: "Eventos",
//             content: (
//                 <TabTableDetail
//                     data={eventosMockData}
//                     headers={eventosHeaders}
//                     linkToPath="/administrative-scope/employee/staffs"
//                 />
//             ),
//         },
//     ];
// }
