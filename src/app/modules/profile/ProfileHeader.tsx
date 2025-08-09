import { FC, useEffect, useState } from "react";
import { KTIcon, toAbsoluteUrl } from "../../../_metronic/helpers";
import { Link, useLocation } from "react-router-dom";
import { Dropdown1 } from "../../../_metronic/partials";
import { ToolbarWrapper } from "../../../_metronic/layout/components/toolbar";
import { Content } from "../../../_metronic/layout/components/content";
import Avatar from "../../../components/ui/Avatar";
import useAxios from "../../../hooks/useAxios";
import { Account } from "./components/account/Account";
import Preference from "./components/preference/Preference";
import ProfileImage from "./components/profileImage/ProfileImage";

const ProfileHeader: FC = () => {
  const [tab, setTab] = useState("A");
  const [dataDetail, setDataDetail] = useState({});
  const {
    data: user,
    reload,
    execute,
  } = useAxios("/admin/account/profile/show", "GET", {});
  // /admin/account/profile/detail
  const getDetail = async () => {
    const { data } = await execute("/admin/account/profile/detail", "GET", {});
    if (data?.status == 200) {
      setDataDetail(data?.data);
    }
  };
  useEffect(() => {
    getDetail();
  }, []);
  console.log(dataDetail);
  return (
    <Content>
      <div className="card mb-5 mb-xl-10">
        <div className="card-body pt-9 pb-0">
          <div className="d-flex flex-wrap flex-sm-nowrap mb-3">
            <div className="me-7 mb-4">
              <div className="symbol symbol-100px symbol-lg-160px symbol-fixed position-relative">
                <Avatar
                  name={user?.name}
                  src={user?.avatar}
                  size={140}
                  fontSize={60}
                />
                {/* <KTIcon iconName="file-up " className="fs-1 ki-outline" /> */}
                {/* <div className="position-absolute translate-middle bottom-0 start-100 mb-6 bg-success rounded-circle border border-4 border-white h-20px w-20px"></div> */}
              </div>
            </div>

            <div className="flex-grow-1">
              <div className="d-flex justify-content-between align-items-start flex-wrap mb-2">
                <div className="d-flex flex-column">
                  <div className="d-flex align-items-center mb-2">
                    <a
                      href="#"
                      className="text-gray-800 text-hover-primary fs-2 fw-bolder me-1">
                      {user?.name + " " + user?.primary_lastname}
                    </a>
                    <a href="#">
                      <KTIcon iconName="verify" className="fs-1 text-primary" />
                    </a>
                  </div>

                  <div className="d-flex flex-wrap fw-bold fs-6 mb-4 pe-2">
                    <a
                      href="#"
                      className="d-flex align-items-center text-gray-500 text-hover-primary mb-2">
                      <KTIcon iconName="sms" className="fs-4 me-1" />
                      {user?.mail}
                    </a>
                  </div>
                </div>
              </div>

              <div className="d-flex flex-wrap flex-stack">
                <div className="d-flex align-items-center w-200px w-sm-300px flex-column mt-3">
                  <div className="d-flex justify-content-between w-100 mt-auto mb-2">
                    <span className="fw-bold fs-6 text-gray-500">
                      Finalización del perfil
                    </span>
                    <span className="fw-bolder fs-6">
                      {user?.profile_completion}%
                    </span>
                  </div>
                  <div className="h-5px mx-3 w-100 bg-light mb-3">
                    <div
                      className="bg-success rounded h-5px"
                      role="progressbar"
                      style={{ width: user?.profile_completion + "%" }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="d-flex overflow-auto h-55px">
            <ul className="nav nav-stretch nav-line-tabs nav-line-tabs-2x border-transparent fs-5 fw-bolder flex-nowrap">
              <li className="nav-item">
                <p
                  className={
                    `nav-link text-active-primary me-6 ` +
                    (tab === "A" && "active")
                  }
                  onClick={() => setTab("A")}>
                  Cuenta
                </p>
              </li>
              <li className="nav-item">
                <p
                  className={
                    `nav-link text-active-primary me-6 ` +
                    (tab === "P" && "active")
                  }
                  onClick={() => setTab("P")}>
                  Preferencias
                </p>
              </li>
              {/* <li className="nav-item">
                  <p
                    className={
                      `nav-link text-active-primary me-6 ` +
                      (tab === "I" && "active")
                    }
                    // to="/crafted/pages/profile/projects"
                    onClick={() => setTab("I")}>
                    Imagen de perfil
                  </p>
                </li> */}
            </ul>
          </div>
        </div>
      </div>
      {tab == "A" && user && <Account user={user} reLoad={reload} />}
      {tab == "P" && user && <Preference />}
      {/* {tab == "I" && user && <ProfileImage />} */}
    </Content>
  );
};

export { ProfileHeader };
