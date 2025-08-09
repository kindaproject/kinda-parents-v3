import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import Input from "../ui/Input/Input";
import DataModal from "../ui/DataModal/DataModal";
import { useAuth } from "../../app/modules/auth";
import useAxios from "../../hooks/useAxios";
import { rules } from "../utils/rules";
import Icon from "../ui/Icon/Icon";
import { IconEye, IconEyeOff } from "../ui/Icon/IconLibrary";
import { useUI } from "../../hooks/useUi";
interface Props {
  open: boolean;
  onClose: () => void;
}

const ChangePassword = ({ open, onClose }: Props) => {
  const { setCurrentUser, currentUser } = useAuth();
  const [formState, setFormState]: any = useState({});
  const [errors, setErrors]: any = useState({});
  const { showToast } = useUI();
  const { execute } = useAxios();
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);
  const handleChange = (e: any) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };
  const validate = () => {
    let errors;
    errors = rules({
      key: "new_password",
      value: formState.new_password,
      errors: errors,
      rules: ["required", "password"],
    });
    errors = rules({
      key: "new_password_confirmation",
      errors: errors,
      value: formState.new_password_confirmation,
      rules: ["required", "password"],
    });
    errors = rules({
      key: "old_password",
      value: formState.old_password,
      errors: errors,
      rules: ["required", "password"],
    });
    setErrors(errors);
    return errors;
  };
  const getAuthEndpoint = () => {
    const domain = currentUser?.mail.split("@")[1]?.toLowerCase();
    return domain === "kindagolden.pro"
      ? "/admin/authenticate/password/initial"
      : "/staff/authenticate/password/initial";
  };

  const onSave = async () => {
    const url = getAuthEndpoint();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      return;
    }
    const { data }: any = await execute(url, "POST", formState);
    if (data.status === 200) {
      // logout();
      showToast({
        type: "success",
        message: `${data?.data?.message}	`,
      });
      setCurrentUser({ ...currentUser, required_change_password: false });
      onClose();
    }
  };
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleShowRePassword = () => {
    setShowRePassword(!showRePassword);
  };
  console.log(currentUser);
  return (
    <DataModal
      title="Cambiar contraseña"
      buttonText="Guardar"
      open={open}
      onSave={onSave}
      onClose={onClose}>
      {/* <Modal className="p-4" centered show={open} onHide={onClose}> */}
      <Input
        label="Contraseña antigua"
        name="old_password"
        value={formState.old_password}
        onChange={handleChange}
        error={errors?.old_password}
      />
      <Input
        label="Nueva contraseña"
        name="new_password"
        value={formState.new_password}
        onChange={handleChange}
        type={showPassword ? "text" : "password"}
        error={errors?.new_password}
        iconRight={
          <Icon
            onClick={handleShowPassword}
            className="cursor-pointer text-gray-500"
            name={showPassword ? IconEye : IconEyeOff}
            reverse={true}
          />
        }
      />
      <Input
        label="Confirmar nueva contraseña"
        name="new_password_confirmation"
        value={formState.new_password_confirmation}
        type={showRePassword ? "text" : "password"}
        iconRight={
          <Icon
            onClick={handleShowRePassword}
            className="cursor-pointer text-gray-500"
            name={showRePassword ? IconEye : IconEyeOff}
            reverse={true}
          />
        }
        onChange={handleChange}
        error={errors?.new_password_confirmation}
      />
      {/* </Modal> */}
    </DataModal>
  );
};

export default ChangePassword;
