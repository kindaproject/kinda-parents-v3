import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../core/Auth";

import { KTIcon, toAbsoluteUrl } from "../../../../_metronic/helpers";
import useAxios from "../../../../hooks/useAxios";
import Input from "../../../../components/ui/Input/Input";
import Icon from "../../../../components/ui/Icon/Icon";
import {
  IconEye,
  IconEyeOff,
  IconMicroTeams,
} from "../../../../components/ui/Icon/IconLibrary";
import { getId } from "firebase/installations";
import { installations } from "../../../../firebase";
import { rules } from "../../../../components/utils/rules";
import Button from "../../../../components/ui/Button/Button";
import styles from "./Login.module.css";
import { useThemeMode } from "../../../../_metronic/partials";
import { useI18n } from "../../../../_metronic/i18n/Metronici18n";
import SelectAutoWidth from "../../../../components/ui/SelectAutoWidth/SelectAutoWidth";

export function Login() {
  const [loading, setLoading] = useState(false);
  const [formState, setFormState]: any = useState({ contry: "+591" });

  const navigate = useNavigate();
  const { saveAuth, setCurrentUser } = useAuth();
  const { execute } = useAxios();
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors]: any = useState({});
  const { updateMode, updateMenuMode } = useThemeMode();
  const { setLanguage } = useI18n();

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    // console.log(name, value);
    setFormState((prev: any) => ({ ...prev, [name]: value }));
  };

  const getAuthEndpoint = (email: string): string => {
    const domain = email.split("@")[1]?.toLowerCase();
    return domain === "kindagolden.pro"
      ? "/admin/auth/login"
      : "/staff/auth/login";
  };
  // const generateUUID = (): string => {
  //   return crypto.randomUUID();
  // };

  const validate = () => {
    let errors;
    errors = rules({
      key: "email",
      value: formState.email,
      errors: errors,
      rules: ["required", "email"],
    });
    errors = rules({
      key: "password",
      errors: errors,
      value: formState.password,
      rules: ["required", "password"],
    });

    setErrors(errors);
    return errors;
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      return;
    }
    // const prohibitedDomains = [
    //   "kindagolden",
    //   "gmail",
    //   "outlook",
    //   "outlookeducation",
    //   "goldeneducation",
    // ];

    // const emailLower = formState?.email?.toLowerCase() || "";
    // const hasForbiddenDomain = prohibitedDomains.some((domain) =>
    //   emailLower.includes(domain)
    // );
    // if (!hasForbiddenDomain) {
    //   setErrors({
    //     email: "No se permite el inicio de sesión con este correo electrónico",
    //   });
    //   return;
    // }
    setLoading(true);
    const url = getAuthEndpoint(formState.email);
    // const fid = await getId(installations);
    // localStorage.setItem("fid", fid);
    // const { data } = await execute(url, "POST", {
    //   mail: formState.email,
    //   password: formState.password,
    //   device_uuid: fid,
    // });
    // if (data?.status === 200) {
    //   const {
    //     token,
    //     expires_in,
    //     user,
    //     required_change_password,
    //     managements,
    //     modules,
    //     designation,
    //     role,
    //   } = data.data;
    //   saveAuth({
    //     api_token: token,
    //     user,
    //     managements,
    //     modules,
    //     expires_in,
    //     required_change_password,
    //   });

    //   setCurrentUser({
    //     ...user,
    //     required_change_password,
    //     designation,
    //     role,
    //     managements,
    //     modules,
    //   });
    //   updateMenuMode(user?.theme);
    //   updateMode(user?.theme);
    //   setLanguage(user?.locale);
    //   navigate("/");
    // } else {
    //   alert("Credenciales incorrectas, intenta de nuevo.");
    // }

    setLoading(false);
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="form w-100" onSubmit={handleSubmit}>
      <div style={{ display: "flex", justifyContent: "center", gap: 40 }}>
        <img
          className="mx-auto w-279px h-80px w-md-50 w-xl-300px mb-10 mb-lg-20"
          src={toAbsoluteUrl("media/logos/GoldenLion.png")}
          alt=""
        />
        <img
          className="mx-auto w-230px h-80px w-md-50 w-xl-300px mb-10 mb-lg-20"
          src={toAbsoluteUrl("media/logos/Kinda.png")}
          alt=""
        />
      </div>
      <div className="text-center mb-11">
        <h1 className="text-gray-900 fw-bolder mb-3">Iniciar Sesión</h1>
        <div className="text-gray-500 fw-semibold fs-6">
          Accede a tu cuenta usando tus credenciales
        </div>
      </div>
      <div className="fv-row mb-8">
        <Input
          label="Ingresa tu número de usuario:"
          placeholder="Correo electrónico"
          type="number"
          error={errors.email}
          name="phone"
          autoComplete="off"
          onChange={handleChange}
          value={formState.email}
          iconLeft={
            <SelectAutoWidth
              label=""
              name="contry"
              onChange={handleChange}
              value={formState.contry}
              options={[
                {
                  value: "+52",

                  label: "",
                  flag: "https://flagcdn.com/w20/mx.png",
                },
                {
                  value: "+54",
                  label: "",
                  flag: "https://flagcdn.com/w20/ar.png",
                },
                {
                  value: "+591",
                  label: "",
                  flag: "https://flagcdn.com/w20/bo.png",
                },
              ]}
            />
          }
        />
      </div>
      {/* 
      <div className="fv-row mb-3">
        <Input
          label="Contraseña"
          placeholder="Contraseña"
          type={showPassword ? "text" : "password"}
          name="password"
          onChange={handleChange}
          error={errors.password}
          value={formState.password}
          iconRight={
            <Icon
              onClick={handleShowPassword}
              className="cursor-pointer text-gray-500"
              style={{ marginRight: errors.password ? 28 : 0 }}
              name={showPassword ? IconEye : IconEyeOff}
              reverse={true}
            />
          }
        />
      </div> */}

      {/* <div className="d-flex flex-wrap gap-3 fs-base fw-semibold mb-8">
        <div />
        <Link to="/auth/forgot-password" className="link-primary">
          ¿Has olvidado tu contraseña?
        </Link>
      </div> */}

      <div className="d-grid mb-10">
        <Button
          onClick={handleSubmit}
          className="btn btn-primary"
          disabled={loading}>
          {!loading && <span className="indicator-label">Continuar</span>}
          {loading && (
            <span className="indicator-progress" style={{ display: "block" }}>
              Por favor espera...
              <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
            </span>
          )}
        </Button>
      </div>
      {/* <div className="d-grid mb-10">
        <Button
          className={`${styles.buttonTeams} w-100`}
          onClick={() => console.log("ingreso por teams")}
          icon={<Icon viewBox="0 0 48 48" size={24} name={IconMicroTeams} />}>
          Ingresar con Microsoft Teams
        </Button>
      </div> */}
    </div>
  );
}
