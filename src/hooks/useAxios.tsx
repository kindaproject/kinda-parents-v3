import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useAuth } from "../app/modules/auth";
import { useLang } from "../_metronic/i18n/Metronici18n";

const API_URL =
  import.meta.env.VITE_APP_API_URL || "https://kindagolden.pro/api";

const useAxios = (
  initialUrl = "",
  initialMethod = "GET",
  initialOptions = {},
  isFormData = false
) => {
  const [data, setData]: any = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [waiting, setWaiting] = useState(0);
  const [reloadFlag, setReloadFlag] = useState(0);

  const currentLang = useLang();
  const { auth, logout } = useAuth();

  const request = useCallback(
    async (
      url: any,
      method = "GET",
      options: any = {},
      isFormData?: boolean
    ) => {
      setLoading(true);
      setWaiting((prev) => prev + 1);
      const fid = localStorage.getItem("fid");
      const customHeaders = options.headers || {};
      const payload = options?.headers ? { ...options } : options;
      // Eliminar headers del body si existen (ya los usamos arriba)
      delete payload.headers;
      try {
        const response = await axios({
          url: `${API_URL}${url}`,
          method,
          headers: {
            Authorization: auth?.api_token ? `Bearer ${auth.api_token}` : "",
            "X-Device-UUID": fid || "",
            "Accept-Language": currentLang || "es",
            "X-Management-Year": "2025",

            "Content-Type": isFormData
              ? "multipart/form-data"
              : "application/json",
            ...customHeaders,
          },
          ...(method === "GET" ? { params: payload } : { data: payload }),
        });

        return { response, error: null };
      } catch (err: any) {
        if (err.response?.status === 401) {
          console.warn("Sesión expirada. Cerrando sesión...");
          logout();
        }
        return { response: null, error: err };
      } finally {
        setLoading(false);
        setWaiting((prev) => Math.max(0, prev - 1));
      }
    },
    [auth, logout, currentLang] // Mantenemos currentLang en las dependencias para que se actualice el header
  );

  const fetchData = useCallback(
    async (url: any, method = "GET", options = {}, isFormData: boolean) => {
      const { response, error } = await request(
        url,
        method,
        options,
        isFormData
      );
      if (response) {
        setData(response.data);
        setError(null);
      } else {
        setError(error);
        setData(null);
      }
    },
    [request]
  );

  const execute = async (
    url: any,
    method = "GET",
    options = {},
    isFormData?: boolean
  ) => {
    const { response, error } = await request(url, method, options, isFormData);
    if (response) {
      return { data: response, error: null };
    } else {
      return { data: null, error };
    }
  };

  const reload = useCallback(() => {
    setReloadFlag((prev) => prev + 1);
  }, []);

  useEffect(() => {
    if (initialUrl && initialMethod) {
      fetchData(initialUrl, initialMethod, initialOptions, isFormData);
    }
  }, [reloadFlag, fetchData, initialUrl, initialMethod]);

  // Ya no recargamos automáticamente cuando cambia el idioma
  // El idioma se actualizará en futuras peticiones porque currentLang está en las dependencias de request

  return { data, error, loading, waiting, execute, reload };
};

export default useAxios;
