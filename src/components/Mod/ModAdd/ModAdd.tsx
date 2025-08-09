import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useUI } from "../../../hooks/useUi";
import useAxios from "../../../hooks/useAxios";
import { rules } from "../../utils/rules";
import { QuickGuide } from "../../ui/QuickGuide/QuickGuide";
import Button from "../../ui/Button/Button";
import Select, { Option } from "../../ui/Select/Select";
import Input from "../../ui/Input/Input";
import PageHeader from "../../PageHeader/PageHeader";
import styles from "./ModAdd.module.css";
import AsyncSelect from "../../ui/AsyncSelect/AsyncSelect";
import { useIntl } from "react-intl";
import TagsInput from "../../ui/TagsInput/TagsInput";
import TextArea from "../../ui/TextArea/TextArea";
import MultiSelect from "../../ui/MultiSelect/MultiSelect";
// import CustomDropdownSelect from "../../ui/CustomDropdownSelect/CustomDropdownSelect";

const styleInputs: any = {
  display: "flex",
  flexDirection: "column",
  flex: 1,
  width: "100%",
};

export type FieldType =
  | "text"
  | "textarea"
  | "email"
  | "number"
  | "password"
  | "select"
  | "asyncSelect"
  | "date"
  | "tagsInput"
  | "customDropdownSelect"
  | "multiSelect";

export interface FieldConfig {
  name: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  inline?: boolean;
  startNewRow?: boolean;
  rules?: string[];
  options?: Option[]; // solo para select
  selectEndpoint?: string; // solo para asyncSelect
  fieldKey?: string; // solo para asyncSelect
  manualOptions?: any; // opcional para asyncSelect
  required?: boolean;
  onlyOnEdit?: boolean; // <-- aparece sólo en edición
  onlyOnCreate?: boolean; // <-- aparece sólo en creación
  showIf?: (values: Record<string, any>) => boolean;
  style?: React.CSSProperties;
  rowStyle?: React.CSSProperties;
  // Propiedades específicas para multiSelect
  canAddNew?: boolean;
  maxSelections?: number;
  addNewWithEmoji?: boolean;
  emojis?: string[];
}

export interface ModAddProps {
  title: string;
  subtitle: string;
  linkTitle?: string;
  fields: FieldConfig[];
  quickGuideItems?: any;
  apiUrl: string;
  getEditUrl: (id: string) => string;
  editUrl?: (id: string) => string;
  buttonSaveText?: string;
}

const SkeletonLine = () => (
  <div className={styles.skeleton} style={{ height: 40, marginBottom: 16 }} />
);

const ModAdd: React.FC<ModAddProps> = ({
  title,
  subtitle,
  linkTitle = "/",
  fields,
  quickGuideItems,
  apiUrl,
  getEditUrl,
  editUrl,
  buttonSaveText,
}) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { showToast } = useUI();
  const { execute, loading }: any = useAxios();
  const [formState, setFormState] = useState<Record<string, any>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Carga de datos si es edición
  const fetchEditData = async () => {
    const { data }: any =
      editUrl && id ? await execute(getEditUrl(id), "GET", {}) : null;
    if (data?.status >= 200 && data?.status < 300) {
      setFormState(data?.data);
      // Los datos se han cargado correctamente
    }
  };

  useEffect(() => {
    fetchEditData();
  }, [id]);

  useEffect(() => {
    console.log("formState:", formState);
  }, [formState]);

  //  ----------

  // render de un solo campo
  const renderField = (f: FieldConfig) => {
    if (f.type === "select") {
      return (
        <Select
          key={f.name}
          label={f.label}
          options={f.options || []}
          value={
            formState[f.name] != null
              ? {
                  value: formState[f.name],
                  label: f.options!.find((o) => o.value === formState[f.name])!
                    .label,
                }
              : null
          }
          onChange={(opt) =>
            handleChange(f.name, (opt as Option)?.value ?? null)
          }
          placeholder={f.placeholder}
          required={f.required}
          error={errors[f.name]}
          style={{ width: "100%", ...f.style }}
        />
      );
    }
    if (f.type === "asyncSelect") {
      return (
        <AsyncSelect
          key={f.name}
          label={f.label}
          endpoint={f.selectEndpoint || ""}
          fieldKey={f.fieldKey}
          manualOptions={f.manualOptions?.map((opt: any) => ({
            value: opt.value || "",
            label: opt.label || "",
          }))}
          value={
            formState[f.name] != null
              ? {
                  value: formState[f.name],
                  label:
                    formState[f.name + "_label"] ?? String(formState[f.name]),
                }
              : null
          }
          onChange={(opt) => handleChange(f.name, opt?.value ?? null)}
          placeholder={f.placeholder}
          required={f.required}
          error={errors[f.name]}
          disabled={false}
          style={{ width: "100%", ...f.style }}
        />
      );
    }

    if (f.type === "textarea") {
      return (
        <TextArea
          key={f.name}
          label={f.label}
          name={f.name}
          value={formState[f.name] || ""}
          onChange={(e) => handleChange(f.name, e.target.value)}
          required={f.required}
          error={errors[f.name]}
          style={f.style}
          // className={f.className}
          placeholder={f.placeholder}
        />
      );
    }
    if (f.type === "date") {
      return (
        <Input
          key={f.name}
          label={f.label}
          type="date"
          name={f.name}
          value={formState[f.name] || ""}
          onChange={(e) => handleChange(f.name, e.target.value)}
          required={f.required}
          error={errors[f.name]}
          className={styles.dateInput}
          style={{ width: "100%", ...f.style }}
        />
      );
    }
    if (f.type === "tagsInput") {
      return (
        <TagsInput
          key={f.name}
          label={f.label}
          name={f.name}
          value={(formState[f.name] || []).map((value: any) => ({
            value,
            label:
              f.options?.find((opt) => opt.value === value)?.label || value,
          }))}
          onChange={(value) => handleChangeMultiSel(f.name, value)}
          error={errors[f.name]}
          required={f.required}
          style={{ width: "100%", ...f.style }}
        />
      );
    }
    if (f.type === "multiSelect") {
      return (
        <MultiSelect
          key={f.name}
          label={f.label}
          name={f.name}
          options={f.options || []}
          value={
            Array.isArray(formState[f.name])
              ? formState[f.name].map((value: any) => {
                  const option = f.options?.find((opt) => opt.value === value);
                  return option || { value, label: value };
                })
              : []
          }
          onChange={(value) => handleChangeMultiSel(f.name, value)}
          error={errors[f.name]}
          required={f.required}
          style={{ width: "100%", ...f.style }}
          placeholder={f.placeholder}
          canAddNew={f.canAddNew ?? true}
          maxSelections={f.maxSelections}
          onAddNew={(newItemLabel) => handleAddNewItem(f.name, newItemLabel)}
        />
      );
    }
    // if (f.type === "customDropdownSelect") {
    //   return (
    //     <CustomDropdownSelect
    //       key={f.name}
    //       label={f.label}
    //       name={f.name}
    //       value={formState[f.name] || null}
    //       onChange={val => handleChange(f.name, val)}
    //       error={errors[f.name]}
    //       required={f.required}
    //       style={{ width: '100%', ...f.style }}
    //       initialOptions={f.manualOptions}
    //     />
    //   );
    // }
    return (
      <Input
        key={f.name}
        label={f.label}
        type={f.type}
        name={f.name}
        placeholder={f.placeholder}
        value={formState[f.name] || ""}
        onChange={(e) => handleChange(f.name, e.target.value)}
        required={f.required}
        error={errors[f.name]}
        style={{ flex: 1, width: "100%", ...f.style }}
      />
    );
  };
  // agrupar campos inline
  // 1️⃣ Filtramos los campos que deben mostrarse
  const visibleFields = fields.filter((f) => {
    // onlyOnEdit / onlyOnCreate
    if ((f.onlyOnEdit && !id) || (f.onlyOnCreate && id)) return false;
    // showIf condicional
    if (f.showIf && !f.showIf(formState)) return false;
    return true;
  });

  // 2️⃣ Agrupar campos inline usando visibleFields en lugar de fields
  const grouped: FieldConfig[][] = [];
  let buffer: FieldConfig[] = [];
  visibleFields.forEach((f) => {
    if (f.inline) {
      if (f.startNewRow && buffer.length) {
        grouped.push(buffer);
        buffer = [];
      }
      buffer.push(f);
    } else {
      if (buffer.length) {
        grouped.push(buffer);
        buffer = [];
      }
      grouped.push([f]);
    }
  });
  if (buffer.length) grouped.push(buffer);

  // 3️⃣ Y en la validación, también iteras sobre visibleFields
  const validate = (): boolean => {
    let vErrors: Record<string, string> = {};

    visibleFields.forEach((f) => {
      if (f.rules) {
        vErrors = rules({
          key: f.name,
          value: formState[f.name],
          allValues: formState,
          errors: vErrors,
          rules: f.rules,
        });
      }
    });

    setErrors(vErrors);
    return Object.keys(vErrors).length === 0;
  };

  // Estado para rastrear campos modificados
  const [modifiedFields, setModifiedFields] = useState<Set<string>>(new Set());

  // Actualizar handleChange para rastrear campos modificados
  const handleChange = (name: string, value: any) => {
    setFormState((prev) => ({ ...prev, [name]: value }));
    setModifiedFields((prev) => new Set([...prev, name]));
    setErrors((prev) => {
      const copy = { ...prev };
      delete copy[name];
      return copy;
    });
  };

  const handleChangeMultiSel = (name: string, values: any) => {
    console.log("MultiSelect values:", values);
    const selectedValues = values.map((option: any) => option.value);
    console.log("Selected values:", selectedValues);
    handleChange(name, selectedValues);
  };

  const handleAddNewItem = (fieldName: string, newLabel: string) => {
    const newOption: Option = {
      value: newLabel.toLowerCase().replace(/\s+/g, "_"),
      label: newLabel,
    };

    const field = fields.find((f) => f.name === fieldName);
    if (field && field.options) {
      field.options.push(newOption);
      field.options.sort((a, b) => a.label.localeCompare(b.label));
    }

    setFormState((prev) => ({
      ...prev,
      [fieldName]: [
        ...(Array.isArray(prev[fieldName]) ? prev[fieldName] : []),
        newOption.value,
      ],
    }));

    setModifiedFields((prev) => new Set([...prev, fieldName]));
  };

  // Enviar formulario
  const handleSubmit = async (e: any) => {
    console.log(formState, "fst onSUbmit");
    e.preventDefault();
    if (!validate()) return;

    const method = id ? "PUT" : "POST";
    const url = id ? editUrl!(id) : apiUrl;

    // Si es edición, solo enviar campos modificados
    const payload = id
      ? Object.fromEntries(
          Object.entries(formState).filter(([key]) => modifiedFields.has(key))
        )
      : { ...formState };

    // const resp: any = await execute(url, method, payload);
    const { data, error } = await execute(url, method, payload);
    // console.log(error?.status, 'sassasa')

    if (data?.status && data.status >= 200 && data.status < 300) {
      // console.log(data?.status, 'registre')

      navigate(linkTitle);
      showToast({
        type: "success",
        message: `${title} guardado correctamente.`,
      });
    }
    if (!data && error?.status && error.status === 422) {
      // console.log("dada", error);
      showToast({
        type: "error",
        message: error?.response?.data?.message || "Error al guardar.",
        requireConfirmation: true,
      });
      setErrors(error?.response?.data?.errors || {});
    } else {
      if (error) {
        showToast({
          type: "error",
          message: error?.response?.data?.message || "Error al guardar.",
          requireConfirmation: true,
        });
        setErrors(error?.response?.data?.errors || {});
      }
    }
  };
  const intl = useIntl();
  return (
    <div className="">
      <PageHeader title={title} subtitle={subtitle} linkTitle={linkTitle} />
      <div className="d-flex flex-column flex-lg-row gap-4 pt-4">
        <section
          className="card flex-grow-1 w-100"
          style={{ maxHeight: "max-content" }}>
          <div
            className=" border-0 pt-6"
            style={{
              paddingBottom: 0,
              height: "max-content",
              paddingLeft: 16,
            }}>
            <h3>
              {/* {id
                ? `Editar ${title.toLowerCase()}`
                : `${intl.formatMessage({
                    id: "MENU.NEW",
                  })} ${title.toLowerCase()}`} */}
              {id
                ? `Editar ${title.toLowerCase()}`
                : `Crear ${title.toLowerCase()}`}
            </h3>
          </div>
          <div className="card-body" style={{ marginTop: -20 }}>
            {id && loading ? (
              grouped.flat().map((_, i) => <SkeletonLine key={i} />)
            ) : (
              <div>
                <div
                  className="d-flex flex-column gap-6"
                  style={{ width: "100%" }}>
                  {grouped.map((group, i) =>
                    group.length > 1 ? (
                      <div
                        key={i}
                        className={styles.responsiveWrap}
                        style={{ width: "100%" }}>
                        {group.map((f) => (
                          <div
                            key={f.name}
                            style={{
                              flex: "1 1 ",
                              marginBottom: "1rem",
                              // minWidth: "200px",
                              // display: "flex",
                              // flexDirection: "column",
                              ...f.rowStyle,
                            }}>
                            {renderField(f)}
                          </div>
                        ))}
                      </div>
                    ) : (
                      renderField(group[0])
                    )
                  )}
                </div>
                <div className="d-flex justify-content-end mt-4">
                  <Button
                    className="btn-light me-10"
                    onClick={() => navigate(linkTitle)}>
                    Cancelar
                  </Button>
                  <Button
                    variant="primary"
                    loading={loading}
                    onClick={(e: any) => handleSubmit(e)}>
                    {buttonSaveText
                      ? buttonSaveText
                      : id
                      ? "Actualizar"
                      : "Registrar"}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </section>
        {quickGuideItems && (
          <QuickGuide
            title="Guía de referencia rápida"
            items={quickGuideItems}
            className={styles.quickGuide}
          />
        )}
      </div>
    </div>
  );
};

export default ModAdd;
