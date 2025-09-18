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
import { useUI } from "../../../../hooks/useUi";

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
  const { store } = useUI();

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
    // const validationErrors = validate();
    // if (Object.keys(validationErrors).length > 0) {
    //   return;
    // }

    setLoading(true);
    // const url = getAuthEndpoint(formState.email);
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
    const randomToken = Array.from(crypto.getRandomValues(new Uint8Array(32)))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");

    const randomExpiresIn = Math.floor(Math.random() * (30 * 24 * 60 * 60)) + 1;
    saveAuth({
      api_token: randomToken,
      user: { name: "User", last_name: "Prueba" },
      expires_in: randomExpiresIn,
      required_change_password: false,
    });
    setCurrentUser({
      name: "User",
      last_name: "Prueba",
      required_change_password: false,
    });
    updateMenuMode("light");
    updateMode("light");
    setLoading(false);
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="form w-100 px-4 py-6" onSubmit={handleSubmit}>
      {/* Contenedor de logos */}
      <div
        // style={{ display: "flex" }}
        className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10 mb-8">
        <img
          className="w-[200px] md:w-[250px] lg:w-[280px] h-auto"
          src={toAbsoluteUrl("media/logos/GoldenLion.png")}
          alt="Golden Lion"
        />
        <img
          className="w-[180px] md:w-[230px] lg:w-[260px] h-auto"
          src={toAbsoluteUrl("media/logos/Kinda.png")}
          alt="Kinda"
        />
      </div>

      {/* Título */}
      <div className="text-center mb-8">
        <p className="text-[var(--c_white)] font-bold text-2xl md:text-3xl mb-3">
          ¡Bienvenido!
        </p>
        <p className="text-[var(--c_white)] text-sm md:text-base max-w-[350px] mx-auto">
          A nuestro espacio de encuentro con padres de familia
        </p>
      </div>

      {/* Input teléfono */}
      <div className="mb-6">
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

      {/* Botón */}

      <Button onClick={handleSubmit} variant="secondary" disabled={loading}>
        Enviar código de ingreso
      </Button>
    </div>
  );
}
