import { FC, useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { PageTitle } from "../../../_metronic/layout/core";
import { useAuth } from "../../modules/auth";
import ChangePassword from "../../../components/ChangePassword/ChangePassword";
import Working from "../../../components/Working/Working";
import Avatar from "../../../components/ui/Avatar";

const DashboardWrapper: FC = () => {
  const { currentUser } = useAuth();
  const [openPassWord, setOpenPassword] = useState(false);
  const intl = useIntl();
  useEffect(() => {
    if (currentUser?.required_change_password) {
      setOpenPassword(true);
    }
  }, [currentUser]);
  return (
    <>
      {/* <DashboardPage /> */}
      {/* <Working /> */}
      <div>
        <div className="flex items-center gap-5 text-[34px]">
          <Avatar src={currentUser?.photo_url} name={currentUser?.name} />
          <p className="font-bold text-[var(--c_blue)]">
            ¡Hola Marilyn! Qué gusto verte aquí.
          </p>
        </div>
        <p>
          Nos alegra mucho que ahora podamos estar permanentemente comunicados a
          través de esta plataforma. Te invitamos a conocer el desempeño de cada
          uno de tus hijos, haciendo clic en las siguientes tarjetas.
        </p>
      </div>
      {openPassWord && (
        <ChangePassword
          open={openPassWord}
          onClose={() => setOpenPassword(false)}
        />
      )}
    </>
  );
};

export { DashboardWrapper };
