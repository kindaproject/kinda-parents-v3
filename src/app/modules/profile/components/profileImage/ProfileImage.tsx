import React, { useState } from "react";
import useAxios from "../../../../../hooks/useAxios";
import { useAuth } from "../../../auth";
import { useUI } from "../../../../../hooks/useUi";

const ProfileImage = () => {
  const { currentUser, setCurrentUser } = useAuth();
  const { showToast } = useUI();
  const { execute } = useAxios();
  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("type", "avatar");
    formData.append("image", file);

    const { data, error } = await execute(
      "/admin/account/profile/image",
      "POST",
      formData,
      true
    );
    if (data?.status == 200) {
      showToast({
        type: "success",
        message: data?.data?.message,
      });
      setCurrentUser({ ...currentUser, avatar: data?.data?.image_url });
    } else {
      showToast({
        type: "error",
        message: error?.response?.data?.message,
      });
    }

    if (error) {
      console.error("Error subiendo imagen:", error);
    } else {
      console.log("Imagen subida correctamente", data);
    }
  };

  return (
    <div className="card">
      <form className="form d-flex flex-center">
        <div className="card-body mw-800px py-20">
          <div className="row mb-8">
            <label className="col-lg-3 col-form-label">Subir imagen</label>
            <div className="col-lg-9">
              <div className="spinner spinner-sm spinner-primary spinner-right">
                <input
                  name="avatar"
                  className="form-control form-control-lg form-control-solid"
                  type="file"
                  accept="image/*"
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProfileImage;
