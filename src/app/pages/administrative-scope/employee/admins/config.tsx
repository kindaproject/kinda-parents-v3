
import { useThemeMode } from "../../../../../_metronic/partials";
import { FieldConfig } from "../../../../../components/Mod/ModAdd/ModAdd";
import PageHeader from "../../../../../components/PageHeader/PageHeader";
import Avatar from "../../../../../components/ui/Avatar";
import { FilterConfig } from "../../../../../components/ui/FilterModal/FilterModal";
import Tooltip from "../../../../../components/ui/Tooltip/Tooltip";
import { getDateStrTimeMes } from "../../../../../components/utils/dates";
import { documentTypeOptions, genderOptions, maritalStatusOptions, phoneCodeOpts, statusOptions, TwoStepVerifyOptions } from "../../../../../components/utils/globalOptions";
import { getBadgeClassByStatus } from "../../../../../components/utils/globalTags";
import { adminScopeEmplStr, adminScopeStr } from "../../complements/constants";
import { useIntl } from "react-intl";

// const { mode } = useThemeMode();




function renderTwoStepIcon(value: any) {
    switch (value) {
        case "mail":
            return <i className="bi bi-envelope fs-2 text-primary me-1"></i>;
        case "phone":
            return <i className="bi bi-telephone fs-2 text-success me-1"></i>;
        case "authenticator":
            return <i className="bi bi-lock fs-2 text-warning me-1"></i>;
        default:
            return <span className="text-muted">Ninguna</span>;
    }
}
export const headersAdmin = [
    {
        key: "name",
        label: <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ marginRight: 6 }}>
                Usuario administrador
            </div>
            <Tooltip text="Aqui se muestra el nombre del administrador,
             su estado de conexion y si la cuenta es principal">
                <i className="bi bi-question-circle fs-5 text-primary p-4"></i>
            </Tooltip>
        </div>,

        onRender: (row: any) => {
            return (
                <div className='d-flex gap-4 '>
                    <Avatar
                        src={row.avatar}
                        name={`${row.name} ${row.primary_lastname} ${row.secondary_lastname}`}
                        size={40}
                    />

                    <div>
                        <p
                            style={{
                                fontWeight: "bold",
                                // color: mode === "dark" ? "var(--c_white)" : "var(--c_blackV3)",
                            }}>
                            {row.name} {row.primary_lastname} {row.secondary_lastname}
                        </p>
                        <p
                            style={{ fontWeight: "500", fontSize: "var(--sSm)" }}
                            className={`${row.is_connected ? "text-success" : "text-[c_whiteV3]"
                                } `}>
                            {row.is_connected ? "Conectado" : "Desconectado"}
                        </p>
                        <p style={{ fontWeight: "500", fontSize: 12 }} className="text-info">
                            {row.account_principal ? "Cuenta principal" : ""}
                        </p>
                    </div>

                </div>
            );
        },
    },

    {
        key: "mail",
        label: "Correo electrónico",
        width: 260,
        style: { width: "260px" },
    },

    // {
    //   key: "is_connected",
    //   label: "Estado de conexión",
    //   onRender: (row: any) => {
    //     return (
    //       <p
    //         style={{ fontWeight: "500" }}
    //         className={`${row.is_connected ? "text-success" : "text-[c_whiteV3]"
    //           } `}>
    //         {row.is_connected ? "Conectado" : "Desconectado"}
    //       </p>
    //     );
    //   },
    // },
    {
        key: "status",
        label: "Estado de cuenta",
        width: 180,
        style: { width: "180px", textAlign: "center" },
        onRender: (row: any) => {
            return (
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <div
                        style={{ fontWeight: "500", textAlign: "center" }}
                        className={getBadgeClassByStatus(row.status)}>
                        {statusOptions.find((item) => item.value === row.status)?.label}
                    </div>
                </div>
            );
        },
    },
    {
        key: "account_verified",
        label: "Verificación de cuenta",
        width: 180,
        style: { width: "180px", textAlign: "center" },
    },
    {
        key: "twostep_verified",
        label: "Verificación 2f",
        width: 140,
        style: { width: "140px", textAlign: "center" },
        onRender: (row: any) => {
            return (
                <div style={{ display: "flex", justifyContent: "center" }}>
                    {renderTwoStepIcon(row.twostep_verified)}
                </div>
            );
        },
    },
    {
        // width: 100,
        key: "actions",
        label: "Acciones",
        width: 140,
        style: { width: "140px", textAlign: "center" },
        // onRender: (row: any) => {
        //   return <TableActions onDelete={() => { handleOpenDelModal(row.id) }} onEdit={() => navigate(`edit/${row.id}`)} />;
        // },
    },
];

export const filtersConfigAdmin: FilterConfig[] = [
    {
        type: "dateRange",
        label: "Fecha de creación",
        nameFrom: "created_at_min",
        nameTo: "created_at_max",
    },
    {
        type: "select",
        label: "Verificación en dos pasos",
        name: "twostep_verified",
        options: TwoStepVerifyOptions,
        // placeholder: "Selecciona tipo de 2FA",
        isMulti: false,
    },
    {
        // Ahora es radio en lugar de switch
        type: "select",
        label: "Estado de conexión",
        name: "is_connected",

        options: [
            { value: true, label: "Conectado" },
            { value: false, label: "Desconectado" },
            { value: "all", label: "Todos" },
        ],
    },
    {
        // Ahora es radio en lugar de switch
        type: "select",
        label: "Estado de cuenta",
        name: "is_available",
        options: [
            { value: true, label: "Disponible" },
            { value: false, label: "No disponible" },
            { value: "all", label: "Todos" },
        ],
    },

    {
        type: "select",
        label: "Ordenar por",
        name: "sort_by",
        // placeholder: "Selecciona orden",
        options: [
            { value: "created_at", label: "Fecha de creación" },
            { value: "name", label: "Nombre" },
            { value: "lastname", label: "Apellido" },
            { value: "email", label: "Correo electrónico" },
        ],
    },
    {
        type: "select",
        label: "Dirección de ordenamiento",
        name: "sort_direction",
        // placeholder: "Selecciona dirección",
        options: [
            { value: "asc", label: "Ascendente" },
            { value: "desc", label: "Descendente" },
        ],
    },
];


//add

export const adminFields: FieldConfig[] = [
    {
        name: 'mail',
        label: 'Correo electrónico',
        type: 'email',
        required: true,
        rules: ['required', 'email', 'emailKindaPro'],
    },
    {
        name: 'name',
        label: 'Nombres',
        type: 'text',
        required: true,
        rules: ['required', 'alphaSpaces'],
    },
    {
        name: 'primary_lastname',
        label: 'Primer apellido',
        type: 'text',
        required: true,
        startNewRow: true,
        inline: true,
        rules: ['required', 'alphaSpaces'],
    },
    {
        name: 'secondary_lastname',
        label: 'Segundo apellido',
        type: 'text',
        inline: true,
        rules: ['alphaSpaces'],
    },
    {
        name: 'phone_code',
        label: 'Código de país',
        type: 'select',
        required: false,
        inline: true,
        startNewRow: true,
        style: { width: 200 },
        rowStyle: { flex: 'none', width: 200 },
        options: phoneCodeOpts,
        rules: [
            'required_if:phone',
            'max:5',
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
        name: "document_type",
        label: "Tipo Documento",
        type: "asyncSelect",
        inline: true,
        selectEndpoint: "/admin/staff/options",
        fieldKey: "document_type",
        startNewRow: true,
        manualOptions: documentTypeOptions,
        rules: ['required_if:document_number'],
    },
    {
        name: "document_type_custom",
        label: "Nombre de otro documento",
        type: "text",
        required: false,
        inline: true,
        rules: [
            'required_if_boolean:document_type === "custom"',
        ],
        showIf: values => values.document_type === 'custom',
    },
    {
        name: "document_number",
        label: "Número de documento",
        type: "number",
        required: false,
        inline: true,
        rules: [
            'required_if:document_type',
        ],
        showIf: values => values.document_type,
    },
    {
        name: "nacionality",
        label: "Nacionalidad",
        type: "text",
        rules: [
            'alphaSpaces'
        ],
        inline: true,
        startNewRow: true
    },
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
    {
        name: "address",
        label: "Dirección",
        type: "text",
        inline: true,
        style: { width: '100%' },
        // showIf: values => values.address,
    },
    {
        name: "address_reference",
        label: "Referencia de Dirección",
        type: "text",
        required: false,
        inline: true,
        style: { width: '100%' },
        showIf: values => values.address,
    },
    {
        name: "address_country",
        label: "País",
        type: "text",
        required: false,
        inline: true,
        style: { width: '100%' },
    },
    {
        name: "address_city",
        label: "Ciudad",
        type: "text",
        required: false,
        inline: true,
        style: { width: '100%' },
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
        type: 'select',
        required: false,
        fieldKey: "marital_status",
        options: maritalStatusOptions,
        startNewRow: true,
        inline: true
    },
    {
        name: "marital_status_custom",
        label: "Otro estado civil",
        type: "text",
        required: false,
        rules: [
            'required_if_boolean:marital_status === "custom"',],
        inline: true,
        showIf: values => values.marital_status === 'custom',
    },
    {
        name: "job_title",
        label: "Título",
        type: "text",
        required: false,
        startNewRow: true,
        inline: true,
    },
    {
        name: "job_specialization",
        label: "Especialización",
        type: "text",
        required: false,
        inline: true,
    }

];

export const adminQuickGuide = [
    {
        heading: 'Módulo de administradores',
        text:
            'En este módulo gestionas todas las cuentas de administrador: ' +
            'puedes crear, editar y eliminar usuarios; asignarles roles y permisos; ' +
            'y revisar su actividad y estado de cuenta.'
    },
    {
        heading: 'Correo electrónico',
        text:
            'El correo electrónico del administrador es su identificador principal: ' +
            'se usa para iniciar sesión y recibir notificaciones.\n' +
            'Ejemplo: usuario@kindagolden.pro'
    },
    {
        heading: 'Nombres',
        text:
            'Son tu(s) nombre(s). Deben contener solo letras y/o espacios. ' +
            'Se mostrarán en reportes y comunicaciones internas.\n' +
            'Ejemplo: María Fernanda'
    },
    {
        heading: 'Primer apellido',
        text:
            'Primer apellido del administrador. Es requerido y debe contener solo letras.\n' +
            'Ejemplo: Rodríguez'
    },
    {
        heading: 'Segundo apellido',
        text:
            'Segundo apellido del administrador. Es opcional y debe contener solo letras.\n' +
            'Ejemplo: Gutiérrez'
    },
    {
        heading: 'Código de país',
        text:
            'Código telefónico del país. Se requiere si se ingresa un número de teléfono.\n' +
            'Ejemplo: +591'
    },
    {
        heading: 'Teléfono',
        text:
            'Número telefónico del administrador. Solo debe contener números.\n' +
            'Ejemplo: 78451236'
    },
    {
        heading: 'Tipo Documento',
        text:
            'Selecciona el tipo de documento del administrador. ' +
            'Puedes elegir una opción del sistema u "Otro" para ingresar un tipo personalizado.\n' +
            'Ejemplo: Carnet de identidad'
    },
    {
        heading: 'Nombre de otro documento',
        text:
            'Si seleccionas "Otro" como tipo de documento, escribe aquí el nombre personalizado.\n' +
            'Ejemplo: Carnet militar'
    },
    {
        heading: 'Número de documento',
        text:
            'Número del documento de identidad. Se requiere si se ha definido el tipo de documento.\n' +
            'Ejemplo: 12345678'
    },
    {
        heading: 'Nacionalidad',
        text:
            'País de nacionalidad del administrador. Solo debe contener letras y espacios.\n' +
            'Ejemplo: Boliviana'
    },
    {
        heading: 'Fecha de nacimiento',
        text:
            'Fecha de nacimiento del administrador. Útil para estadísticas o validaciones internas.\n' +
            'Ejemplo: 1990-05-12'
    },
    {
        heading: 'Género',
        text:
            'Selecciona el género del administrador. Puedes usar una opción predefinida o personalizar.\n' +
            'Ejemplo: Femenino'
    },
    {
        heading: 'Biografía',
        text:
            'Breve descripción personal o profesional del administrador. ' +
            'Puede incluir formación, experiencia o rol actual.\n' +
            'Ejemplo: Administradora de sistemas con 10 años de experiencia.'
    },
    {
        heading: 'Dirección',
        text:
            'Dirección física del domicilio actual o lugar referencial de contacto del administrador.\n' +
            'Ejemplo: Av. Los Pinos #345, Barrio Primavera'
    },
    {
        heading: 'Referencia de Dirección',
        text:
            'Complemento de la dirección que ayuda a ubicar mejor el lugar.\n' +
            'Ejemplo: Frente a la plaza principal'
    },
    {
        heading: 'País',
        text:
            'País correspondiente a la dirección ingresada.\n' +
            'Ejemplo: Bolivia'
    },
    {
        heading: 'Ciudad',
        text:
            'Ciudad correspondiente a la dirección ingresada.\n' +
            'Ejemplo: Santa Cruz de la Sierra'
    },
    {
        heading: 'Latitud',
        text:
            'Coordenada geográfica de latitud. Requiere que la dirección esté definida.\n' +
            'Ejemplo: -17.7833'
    },
    {
        heading: 'Longitud',
        text:
            'Coordenada geográfica de longitud. Requiere que la dirección esté definida.\n' +
            'Ejemplo: -63.1821'
    },
    {
        heading: 'Estado civil',
        text:
            'Selecciona el estado civil actual del administrador. Puedes usar opciones predefinidas o personalizadas.\n' +
            'Ejemplo: Soltero'
    },
    {
        heading: 'Otro estado civil',
        text:
            'Si seleccionas "Otro" como estado civil, especifica el valor personalizado aquí.\n' +
            'Ejemplo: Unión libre'
    },
    {
        heading: 'Título',
        text:
            'Título profesional o académico del administrador. Es opcional.\n' +
            'Ejemplo: Licenciada en Psicología'
    },
    {
        heading: 'Especialización',
        text:
            'Área específica de conocimiento o experiencia del administrador.\n' +
            'Ejemplo: Recursos Humanos'
    }
];




//view
export function makeAdminViewFields({ user }: any) {
    console.log(user, 'uuuuss')
    return [
        { label: "Nombre", answerLabel: user?.name ?? "" },
        { label: "Apellido", answerLabel: user?.primary_lastname ?? "" },
        { label: "Correo electrónico", answerLabel: user?.mail ?? "" },
        {
            label: "Estado de cuenta ",
            answerLabel: user?.is_available ? "Disponible" : "No disponible",
        },
        {
            label: "Protección de datos",
            answerLabel: user?.is_locked ? "Habilitada" : "No habilitada",
        },
        {
            label: "Tipo de cuenta",
            answerLabel: user?.is_principal ? "Principal" : "Secundaria",
        },
        {
            label: "Verificación de correo ",
            answerLabel: user?.email_verified_at ? "Realizada" : "No realizada",
        },
        {
            label: "Verificación de doble factor",
            answerLabel: user?.twostep_verified
                ? TwoStepVerifyOptions[user?.twostep_verified].label
                : "Ninguna",
        },
        {
            label: "Fecha de Creación",
            answerLabel: user?.created_at
                ? getDateStrTimeMes(user?.created_at)
                : "",
        },
        {
            label: "Última Actualización",
            answerLabel: user?.updated_at
                ? getDateStrTimeMes(user?.updated_at)
                : "",
        },
    ]
}