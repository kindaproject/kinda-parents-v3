import React, { useState } from "react";
import Select from "../../../../../components/ui/Select/Select";
import useAxios from "../../../../../hooks/useAxios";
import { useAuth } from "../../../auth";
import { useUI } from "../../../../../hooks/useUi";

const Preference = ({}: any) => {
  const { currentUser, setCurrentUser } = useAuth();
  const [data, setData] = useState({
    locale: currentUser?.locale,
    theme: currentUser?.theme,
  });
  const { showToast } = useUI();
  const { execute } = useAxios();
  const updateData = (fieldsToUpdate: any) => {
    const updatedData = { ...data, ...fieldsToUpdate };
    setData(updatedData);
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const { data: response, error } = await execute(
      "/admin/account/profile/preference",
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
      setCurrentUser({ ...currentUser, ...data });
    } else {
      showToast({
        type: "error",
        message: error?.response?.data?.message,
      });
    }
  };
  const handleCancel = () => {
    setData({ locale: currentUser?.locale, theme: currentUser?.theme });
  };
  return (
    <div className="card">
      {/* begin::Form */}
      <form className="form d-flex flex-center">
        <div className="card-body mw-800px py-20">
          <div className="row mb-8">
            <label className="col-lg-3 col-form-label">Idioma</label>
            <div className="col-lg-9">
              <div className="spinner spinner-sm spinner-primary spinner-right">
                <Select
                  className="form-select form-select-lg form-select-solid"
                  value={data?.locale}
                  variant="V2"
                  options={[
                    { label: "Español", value: "es" },
                    { label: "Ingles", value: "en" },
                    { label: "Portugues", value: "pt" },
                  ]}
                  onChange={(option: any) => {
                    updateData({ locale: option?.value });
                  }}
                />
              </div>
            </div>
          </div>
          <div className="row mb-8">
            <label className="col-lg-3 col-form-label">Thema</label>
            <div className="col-lg-9">
              <div className="spinner spinner-sm spinner-primary spinner-right">
                <Select
                  className="form-select form-select-lg form-select-solid"
                  value={data?.theme}
                  variant="V2"
                  options={[
                    { label: "Claro", value: "light" },
                    { label: "Oscuro", value: "dark" },
                    { label: "Sistema", value: "system" },
                  ]}
                  onChange={(option: any) => {
                    updateData({ theme: option.value });
                  }}
                />
              </div>
            </div>
          </div>

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
};

export default Preference;
