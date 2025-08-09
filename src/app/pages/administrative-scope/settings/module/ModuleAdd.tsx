import { useParams } from "react-router-dom";
import { adminPageSubHeader, moduleLinkPageHeader, modulePageSubHeader } from "../../complements/constants";
import ModAdd, {
  FieldConfig,
} from "../../../../../components/Mod/ModAdd/ModAdd";
const ModuleAdd = () => {
  const { id } = useParams<{ id: string }>();
  const adminFields: FieldConfig[] = [
    {
      name: "code",
      label: "Código",
      type: "text",
      // placeholder: 'Ingrese nombres',
      required: true,
      rules: ["required"],
    },
    {
      name: "name",
      label: "Nombre",
      type: "text",
      // placeholder: 'Ingrese nombres',
      required: true,
      rules: ["required"],
    },
    {
      name: "description",
      label: "Descripción",
      type: "textarea",
      // placeholder: 'Ingrese apellidos',
      required: true,
      rules: ["required"],
    },
    {
      name: "icon",
      label: "Icono",
      type: "text",
      required: true,
      rules: ["required"],
    },
    {
      name: "ambit",
      label: "Ámbito",
      type: "text",
      // placeholder: 'Ingrese nombres',
      required: true,
      rules: ["required"],
    },
    {
      name: "priority",
      label: "Prioridad",
      type: "text",
      rules: [""],
    },
    {
      name: "permissions",
      label: "Permisos",
      type: "multiSelect",
      canAddNew: false,
      options: [
        { value: "show", label: "Mostrar" },
        { value: "quick", label: "Listado rápido" },
        { value: "index", label: "Listado completo" },
        { value: "delete", label: "Eliminación" },
        // { value: "force", label: "Eliminación definitiva" },
        // { value: "custom", label: "Rutas personalizadas (Ej. Syncro, Export)" },
        // { value: "deleted", label: "Listado completo de recursos eliminados" },
        { value: "detail", label: "Vista detallada" },
        { value: "create", label: "Registro de un nuevo recurso" },
        { value: "update", label: "Actualización de un recurso" },
      ],
      required: true,
    },
  ];
  const adminQuickGuide = [
    {
      heading: "Código",
      text: "Código único que identifica al módulo dentro del sistema. Se utiliza como referencia técnica para gestionar funcionalidades y rutas asociadas.",
    },
    {
      heading: "Nombre",
      text: "Nombre visible del módulo tal como se presentará en la interfaz del sistema. Debe ser claro y representativo de la funcionalidad que ofrece.",
    },
    {
      heading: "Descripción",
      text: "Descripción breve del propósito y alcance del módulo. Sirve para informar a los administradores o miembros del personal sobre la funcionalidad que engloba.",
    },
    {
      heading: "Icono",
      text: "Nombre o clase del ícono que representa visualmente la plataforma. Se acepta cualquier librería compatible para asegurar consistencia visual en la interfaz.",
    },
    {
      heading: "Ámbito",
      text: "Ámbito dentro de la institución al que pertenece el módulo. Este campo permite organizar y contextualizar el uso del módulo según áreas como administración, gestión académica, comunicación, entre otros.",
    },
    {
      heading: "Prioridad",
      text: "Valor numérico que determina el orden de aparición del módulo en la interfaz. También puede emplearse para jerarquizar su relevancia o nivel de acceso.",
    },
    {
      heading: "Permisos",
      text: "Arreglo de permisos asociados al módulo. Cada valor representa una acción permitida dentro del mismo (por ejemplo: crear, actualizar, eliminar), y se utiliza para establecer controles de acceso dinámicos y personalizados.",
    },
  ];
  return (
    <ModAdd
      title="Módulo"
      subtitle={modulePageSubHeader}
      linkTitle={moduleLinkPageHeader}
      fields={adminFields}
      quickGuideItems={adminQuickGuide}
      apiUrl="/admin/module/store"
      getEditUrl={(id) => `/admin/module/show/${id}`}
      editUrl={(id) => `/admin/module/update/${id}`}
    />
  );
};

export default ModuleAdd;
