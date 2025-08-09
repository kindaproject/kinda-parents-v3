/* eslint-disable @typescript-eslint/no-explicit-any */
import { AuthModel } from "./_models";

const AUTH_LOCAL_STORAGE_KEY = "kt-auth-react-v";
const getAuth = (): AuthModel | undefined => {
  const lsValue: string | null = localStorage.getItem(AUTH_LOCAL_STORAGE_KEY);
  if (!lsValue) return;
  try {
    return JSON.parse(lsValue) as AuthModel;
  } catch (error) {
    console.error("AUTH LOCAL STORAGE PARSE ERROR", error);
  }
};

export function getAuthCreatedAt(): number | null {
  const value = localStorage.getItem("auth_created_at");
  return value ? parseInt(value) : null;
}
const setAuth = (auth: AuthModel) => {
  localStorage.setItem(AUTH_LOCAL_STORAGE_KEY, JSON.stringify(auth));
  localStorage.setItem("auth_created_at", Date.now().toString());
};

const removeAuth = () => {
  if (!localStorage) {
    return;
  }

  try {
    localStorage.removeItem(AUTH_LOCAL_STORAGE_KEY);
  } catch (error) {
    console.error("AUTH LOCAL STORAGE REMOVE ERROR", error);
  }
};
export function isTokenExpired(expiresIn: number | any): boolean {
  const createdAt = getAuthCreatedAt();
  if (!createdAt) return true;

  const now = Date.now();
  return now >= createdAt + expiresIn * 1000; // expiresIn en segundos
}

export function setupAxios(axios: any) {
  axios.defaults.headers.Accept = "application/json";
  axios.interceptors.request.use(
    (config: { headers: { Authorization: string } }) => {
      const auth = getAuth();
      if (auth && auth.api_token) {
        config.headers.Authorization = `Bearer ${auth.api_token}`;
      }

      return config;
    },
    (err: any) => Promise.reject(err)
  );
}

export { getAuth, setAuth, removeAuth, AUTH_LOCAL_STORAGE_KEY };
