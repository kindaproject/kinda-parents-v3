

export const allOption = { value: "all", label: "Todos" }


export const YesOrNoOptions = [
    { value: true, label: "Sí" },
    { value: false, label: "No" },
];
export const TwoStepVerifyOptions = [
    { value: "mail", label: "Mail" },
    { value: "phone", label: "Phone" },
    { value: "authenticator", label: "Authenticator" },
];
export const phoneCodeOpts = [

    { value: '591', label: '🇧🇴 +591' },
    { value: '54', label: '🇦🇷 +54' },
    { value: '55', label: '🇧🇷 +55' }
]

export const documentTypeOptions = [
    { value: "identity", label: "Carnet de identidad" },
    { value: "passport", label: "Pasaporte" },
    { value: "driver_license", label: "Licencia de conductor" },
    { value: "custom", label: "Otro" },
]

export const genderOptions = [
    { value: "female", label: "Femenino" },
    { value: "male", label: "Masculino" },
    { value: "prefer_not_to_say", label: "Prefiero no decirlo" },
]


export const maritalStatusOptions = [
    { value: "single", label: "Soltero" },
    { value: "married", label: "Casado" },
    { value: "divorced", label: "Divorciado" },
    { value: "widower", label: "Viudo" },
    { value: "custom", label: "Otro" },
];
export const parentsOptions = [
    //   "parent": "Used for mother or father",
    // "spouse": "Used for couples",
    // "sibling": "Used for brothers or sisters",
    // "family": "Used for other family members",
    // "friend": "Used for friends",
    // "colleague": "Used for work colleague or professional associate",
    // "known": "Used for acquaintances without direct relationship",
    { value: "parent", label: "Padre/Madre/Tutor" },
    { value: "spouse", label: "Esposo/Cónyuge" },
    { value: "sibling", label: "Hermano/Hermana" },
    { value: "family", label: "Familiares" },
    { value: "friend", label: "Amigos" },
    { value: "colleague", label: "Colega" },
    { value: "known", label: "Conocido sin relación directa" },
]; // carga tus opciones de ../admin/staff/options;

export const statusOptions = [
    { value: "active", label: "Activo" },
    { value: "inactive", label: "Inactivo" },
    { value: "archived", label: "Archivado" },
    { value: "suspended", label: "Suspendido" },
]
export const RoleMainTypeOptions = [
    { value: "academic", label: "Docente" },
    { value: "administrative", label: "Administrativo" },
    { value: "auxiliar", label: "Auxiliar" },
]
export const contractTypeOptions = [
    { value: "eventual", label: "Contrato eventual" },
    { value: "permanent", label: "Contrato permanente" },
    { value: "temporary", label: "Contrato temporal" },
]

export const allergiesOptions = [
    { value: "polen", label: "Polen" },
    { value: "mariscos", label: "Mariscos" },
    { value: "abejas", label: "Abejas" },
]
