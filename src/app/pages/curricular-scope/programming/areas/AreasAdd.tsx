import { useParams } from "react-router-dom";
import ModAdd, {
  FieldConfig,
} from "../../../../../components/Mod/ModAdd/ModAdd";
const AreasAdd = () => {
  const { id } = useParams<{ id: string }>();
  const adminFields: FieldConfig[] = [
    {
      name: "code",
      label: "Código",
      type: "text",
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
      name: "short_name",
      label: "Nombre corto",
      type: "text",
      // placeholder: 'Ingrese apellidos',
      required: true,
      rules: ["required"],
    },
    {
      name: "order",
      label: "Orden",
      type: "number",
      required: true,
      rules: ["required"],
    },
    {
      name: "components_count",
      label: "Cant. de componentes",
      type: "number",
      rules: ["required"],
    },
    {
      name: "matters_count",
      label: "Cant. de materias",
      type: "number",
      rules: ["required"],
    },
  ];
  // const adminQuickGuide = [
  //   {
  //     heading: "Código",
  //     text: "Código único que identifica al módulo dentro del sistema. Se utiliza como referencia técnica para gestionar funcionalidades y rutas asociadas.",
  //   },
  //   {
  //     heading: "Nombre",
  //     text: "Nombre visible del módulo tal como se presentará en la interfaz del sistema. Debe ser claro y representativo de la funcionalidad que ofrece.",
  //   },
  //   {
  //     heading: "Descripción",
  //     text: "Descripción breve del propósito y alcance del módulo. Sirve para informar a los administradores o miembros del personal sobre la funcionalidad que engloba.",
  //   },
  //   {
  //     heading: "Icono",
  //     text: "Nombre o clase del ícono que representa visualmente la plataforma. Se acepta cualquier librería compatible para asegurar consistencia visual en la interfaz.",
  //   },
  //   {
  //     heading: "Ámbito",
  //     text: "Ámbito dentro de la institución al que pertenece el módulo. Este campo permite organizar y contextualizar el uso del módulo según áreas como administración, gestión académica, comunicación, entre otros.",
  //   },
  //   {
  //     heading: "Prioridad",
  //     text: "Valor numérico que determina el orden de aparición del módulo en la interfaz. También puede emplearse para jerarquizar su relevancia o nivel de acceso.",
  //   },
  //   {
  //     heading: "Permisos",
  //     text: "Arreglo de permisos asociados al módulo. Cada valor representa una acción permitida dentro del mismo (por ejemplo: crear, actualizar, eliminar), y se utiliza para establecer controles de acceso dinámicos y personalizados.",
  //   },
  // ];
  return (
    <ModAdd
      title="Área"
      subtitle={"- Ámbito Curricular - Programación - Áreas"}
      linkTitle={"/curricular-scope/programming/area/"}
      fields={adminFields}
      // quickGuideItems={adminQuickGuide}
      apiUrl="/admin/area/store"
      getEditUrl={(id) => `/admin/area/show/${id}`}
      editUrl={(id) => `/admin/area/update/${id}`}
    />
  );
};

export default AreasAdd;
