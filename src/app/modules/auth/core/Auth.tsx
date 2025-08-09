/* eslint-disable react-refresh/only-export-components */
import { FC, useState, useEffect, createContext, useContext } from "react";
import { LayoutSplashScreen } from "../../../../_metronic/layout/core";
import { AuthModel, UserModel } from "./_models";
import * as authHelper from "./AuthHelpers";
import { getUserByToken } from "./_requests";
import { WithChildren } from "../../../../_metronic/helpers";

type AuthContextProps = {
  auth: AuthModel | undefined;
  saveAuth: (auth: AuthModel | undefined) => void;
  currentUser: any;
  setCurrentUser: any;
  logout: () => void;
};

const initAuthContextPropsState = {
  auth: authHelper.getAuth(),
  saveAuth: () => {},
  currentUser: undefined,
  setCurrentUser: () => {},
  logout: () => {},
};

const AuthContext = createContext<AuthContextProps>(initAuthContextPropsState);

const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider: FC<WithChildren> = ({ children }) => {
  const [auth, setAuth] = useState(authHelper.getAuth());
  // const [currentUser, setCurrentUser] = useState({});
  const [currentUserState, setCurrentUserState]: any = useState(undefined);
  const saveAuth = (auth: any) => {
    setAuth(auth);
    if (auth) {
      authHelper.setAuth(auth);
    } else {
      authHelper.removeAuth();
    }
  };
  const setCurrentUser = (user: UserModel | undefined) => {
    setCurrentUserState(user);
    if (auth) {
      const updatedAuth = { ...auth, user };
      setAuth(updatedAuth);
      authHelper.setAuth(updatedAuth);
    }
  };

  const logout = () => {
    saveAuth(undefined);
    setCurrentUserState(undefined);
    authHelper.removeAuth();
  };

  return (
    <AuthContext.Provider
      value={{
        auth,
        saveAuth,
        currentUser: currentUserState,
        setCurrentUser,
        logout,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

const AuthInit: FC<WithChildren> = ({ children }) => {
  const { auth, currentUser, logout, setCurrentUser } = useAuth();
  const [showSplashScreen, setShowSplashScreen] = useState(true);
  useEffect(() => {
    if (auth && auth.api_token) {
      if (authHelper.isTokenExpired(auth.expires_in)) {
        logout();
      } else {
        // console.log(auth,"áuthlpm");
        setCurrentUser({
          ...auth.user,
          modules: auth.modules,
          required_change_password: auth.required_change_password,
        }); // ✅ Asignamos el user guardado en login
      }
    } else {
      logout();
    }

    setShowSplashScreen(false);
  }, []);

  return showSplashScreen ? <LayoutSplashScreen /> : <>{children}</>;
};

export { AuthProvider, AuthInit, useAuth };
