import { useState } from "react";
import { defaultAccount, IAccount } from "./AccountModel";
import Select from "../../../../../components/ui/Select/Select";
import useAxios from "../../../../../hooks/useAxios";
import { useUI } from "../../../../../hooks/useUi";
import InputProfile from "./InputProfile";
interface PropsType {
  user: any;
  reLoad: any;
}
export function Account({ user, reLoad }: PropsType) {
  const [data, setData]: any = useState(user);
  const { execute } = useAxios();
  const { showToast } = useUI();
  const [errors, setErrors] = useState({});

  const updateData = (fieldsToUpdate: any) => {
    const updatedData = { ...data, ...fieldsToUpdate };
    setData(updatedData);
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    delete data?.user_name;
    const { data: response, error }: any = await execute(
      "/admin/account/profile/update",
      "PUT",
      {
        ...data,
      }
    );
    if (response?.status === 200) {
      showToast({
        type: "success",
        message: response?.data?.message,
      });
      reLoad();
    } else {
      showToast({
        type: "error",
        message: error?.response?.data?.message,
      });
      setErrors(error?.response?.data?.errors);
    }
  };
  const handleCancel = () => {
    setData(user);
  };

  return (
    <div className="card">
      {/* begin::Form */}
      <form className="form d-flex flex-center">
        <div className="card-body mw-800px py-20">
          {/* begin::Form row */}
          <InputProfile
            label="Nombre"
            name="name"
            type="text"
            placeholder="Nombre"
            value={data?.name}
            onChange={(e) => updateData({ name: e.target.value })}
            required={true}
            error={errors}
          />
          <InputProfile
            label="Apellido"
            name="primary_lastname"
            type="text"
            placeholder="Apellido"
            value={data?.primary_lastname}
            onChange={(e) => updateData({ primary_lastname: e.target.value })}
            required={true}
            error={errors}
          />
          {/* <div className="row mb-8">
            <label className="col-lg-3 col-form-label">
              Fecha de cumpleaños{" "}
            </label>
            <div className="col-lg-9">
              <div className="spinner spinner-sm spinner-primary spinner-right">
                <input
                  className="form-control form-control-lg form-control-solid"
                  type="date"
                  value={data?.birthdate}
                  onChange={(e) => updateData({ birthdate: e.target.value })}
                />
              </div>
            </div>
          </div> */}
          <InputProfile
            label="Fecha de cumpleaños"
            name="birthdate"
            type="date"
            placeholder="Fecha de cumpleaños"
            value={data?.birthdate}
            onChange={(e) => updateData({ birthdate: e.target.value })}
            error={errors}
            required={true}
          />
          <div className="row mb-8">
            <label className="col-lg-3 col-form-label">Género</label>
            <div className="col-lg-9">
              <div className="spinner spinner-sm spinner-primary spinner-right">
                <Select
                  className="form-select form-select-lg form-select-solid"
                  value={data?.gender}
                  variant="V2"
                  options={[
                    { label: "Masculino", value: "male" },
                    { label: "Femenino", value: "female" },
                  ]}
                  onChange={(option: any) => {
                    updateData({ gender: option?.value });
                  }}
                />
              </div>
            </div>
          </div>
          <div className="row mb-8">
            <label className="col-lg-3 col-form-label">Estado civil</label>
            <div className="col-lg-9">
              <div className="spinner spinner-sm spinner-primary spinner-right">
                <Select
                  className="form-select form-select-lg form-select-solid"
                  value={data?.marital_status || user?.marital_status}
                  variant="V2"
                  options={[
                    { label: "Soltero", value: "single" },
                    { label: "Casado", value: "married" },
                  ]}
                  onChange={(option: any) => {
                    updateData({ marital_status: option.value });
                  }}
                />
              </div>
            </div>
          </div>
          <div className="row mb-8">
            <label className="col-lg-3 col-form-label">Biografía</label>
            <div className="col-lg-9">
              <div className="spinner spinner-sm spinner-primary spinner-right">
                <textarea
                  name="biography"
                  className="form-control form-control-lg form-control-solid resize-none"
                  rows={4}
                  value={data?.biography}
                  onChange={(e) => updateData({ biography: e.target.value })}
                />
              </div>
            </div>
          </div>
          <InputProfile
            label="Título profesional"
            name="job_title"
            type="text"
            placeholder="Título profesional"
            value={data?.job_title}
            onChange={(e) => updateData({ job_title: e.target.value })}
            error={errors}
            required={true}
          />
          <InputProfile
            label="Especialización laboral"
            name="job_specialization"
            type="text"
            placeholder="Especialización laboral"
            value={data?.job_specialization}
            onChange={(e) => updateData({ job_specialization: e.target.value })}
            error={errors}
            required={true}
          />
          <InputProfile
            label="Dirección"
            name="address"
            type="text"
            placeholder="Dirección"
            value={data?.address}
            onChange={(e) => updateData({ address: e.target.value })}
            error={errors}
            required={true}
          />
          <InputProfile
            label="País"
            name="address_country"
            type="text"
            placeholder="País"
            value={data?.address_country}
            onChange={(e) => updateData({ address_country: e.target.value })}
            error={errors}
            required={true}
          />
          <div className="separator separator-dashed my-10"></div>
          <div className="row">
            <label className="col-lg-3 col-form-label"></label>
            <div className="col-lg-9">
              <button
                onClick={handleSubmit}
                type="reset"
                className="btn btn-primary fw-bolder px-6 py-3 me-3">
                Guardar cambios
              </button>
              <button
                onClick={handleCancel}
                type="reset"
                className="btn btn-color-gray-600 btn-active-light-primary fw-bolder px-6 py-3">
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
