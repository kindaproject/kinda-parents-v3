import { lazy, FC, Suspense } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { MasterLayout } from "../../_metronic/layout/MasterLayout";
import TopBarProgress from "react-topbar-progress-indicator";
import { DashboardWrapper } from "../pages/dashboard/DashboardWrapper";
import { MenuTestPage } from "../pages/MenuTestPage";
import { getCSSVariableValue } from "../../_metronic/assets/ts/_utils";
import { WithChildren } from "../../_metronic/helpers";
import BuilderPageWrapper from "../pages/layout-builder/BuilderPageWrapper";
import Empty from "../pages/empty/Empty";
import Admins from "../pages/administrative-scope/employee/admins/Admins";
import Staffs from "../pages/administrative-scope/employee/staffs/Staffs";
import Managements from "../pages/curricular-scope/programming/management/Managements";
import Parallels from "../pages/curricular-scope/structure/parallels/Parallels";
import Admissions from "../pages/familiar-scope/register/admissions/Admissions";
import Grades from "../pages/curricular-scope/structure/grades/Grades";
import Levels from "../pages/curricular-scope/structure/levels/Levels";
import Assists from "../pages/academic-scope/development/assists/Assists";
import Working from "../../components/Working/Working";
import StaffRole from "../pages/administrative-scope/employee/staff_role/StaffRoles";
import StaffRoles from "../pages/administrative-scope/employee/staff_role/StaffRoles";
import Credential from "../pages/administrative-scope/employee/credential/Credential";
import Module from "../pages/administrative-scope/settings/module/Module";
import Areas from "../pages/curricular-scope/programming/areas/Areas";

const PrivateRoutes = () => {
  const ProfilePage = lazy(() => import("../modules/profile/ProfilePage"));
  const WizardsPage = lazy(() => import("../modules/wizards/WizardsPage"));
  const AccountPage = lazy(() => import("../modules/accounts/AccountPage"));
  const WidgetsPage = lazy(() => import("../modules/widgets/WidgetsPage"));
  const ChatPage = lazy(() => import("../modules/apps/chat/ChatPage"));
  const UsersPage = lazy(
    () => import("../modules/apps/user-management/UsersPage")
  );
  const Activities = lazy(
    () => import("../pages/academic-scope/development/activities/Activities")
  );

  return (
    <Routes>
      <Route element={<MasterLayout />}>
        {/* Redirect to Dashboard after success login/registartion */}
        <Route path="auth/*" element={<Navigate to="/dashboard" />} />
        {/* Pages */}
        <Route path="dashboard" element={<DashboardWrapper />} />
        <Route path="builder" element={<BuilderPageWrapper />} />
        <Route path="menu-test" element={<MenuTestPage />} />
        {/* Lazy Modules */}
        <Route
          path="crafted/pages/profile/*"
          element={
            <SuspensedView>
              <ProfilePage />
            </SuspensedView>
          }
        />
        <Route
          path="crafted/pages/wizards/*"
          element={
            <SuspensedView>
              <WizardsPage />
            </SuspensedView>
          }
        />
        <Route
          path="crafted/widgets/*"
          element={
            <SuspensedView>
              <WidgetsPage />
            </SuspensedView>
          }
        />
        <Route
          path="crafted/account/*"
          element={
            <SuspensedView>
              <AccountPage />
            </SuspensedView>
          }
        />
        <Route
          path="apps/chat/*"
          element={
            <SuspensedView>
              <ChatPage />
            </SuspensedView>
          }
        />
        <Route
          path="apps/user-management/*"
          element={
            <SuspensedView>
              <UsersPage />
            </SuspensedView>
          }
        />
        <Route
          path="academic-scope/development/activities/*"
          element={
            <SuspensedView>
              <Activities />
            </SuspensedView>
          }
        />
        <Route
          path="academic-scope/development/assists/*"
          element={
            <SuspensedView>
              <Assists />
            </SuspensedView>
          }
        />
        <Route
          path="academic-scope/*"
          element={
            <SuspensedView>
              <Working />
            </SuspensedView>
          }
        />
        <Route
          path="familiar-scope/*"
          element={
            <SuspensedView>
              <Working />
            </SuspensedView>
          }
        />
        <Route
          path="curricular-scope/*"
          element={
            <SuspensedView>
              <Working />
            </SuspensedView>
          }
        />
        <Route
          path="curricular-scope/programming/management/*"
          element={
            <SuspensedView>
              <Managements />
            </SuspensedView>
          }
        />
        <Route
          path="curricular-scope/programming/area/*"
          element={
            <SuspensedView>
              <Areas />
            </SuspensedView>
          }
        />

        <Route
          path="administrative-scope/programming/*"
          element={
            <SuspensedView>
              <Working />
            </SuspensedView>
          }
        />

        {/* <Route
          path='administrative-scope/*'
          element={
            <SuspensedView>
              <Working />
            </SuspensedView>
          }
        /> */}
        <Route
          path="administrative-scope/employee/*"
          element={
            <SuspensedView>
              <Working />
            </SuspensedView>
          }
        />
        <Route
          path="administrative-scope/employee/admin/*"
          element={
            <SuspensedView>
              <Admins />
            </SuspensedView>
          }
        />
        <Route
          path="administrative-scope/*"
          element={
            <SuspensedView>
              <Working />
            </SuspensedView>
          }
        />
        <Route
          path="/administrative-scope/settings/module/*"
          element={
            <SuspensedView>
              <Module />
            </SuspensedView>
          }
        />

        <Route
          path="administrative-scope/employee/staffs/*"
          element={
            <SuspensedView>
              <Staffs />
            </SuspensedView>
          }
        />
        <Route
          path="administrative-scope/employee/credential/*"
          element={
            <SuspensedView>
              <Credential />
            </SuspensedView>
          }
        />
        <Route
          path="familiar-scope/register/admissions/*"
          element={
            <SuspensedView>
              <Admissions />
            </SuspensedView>
          }
        />

        <Route
          path="curricular-scope/structure/parallels/*"
          element={
            <SuspensedView>
              <Parallels />
            </SuspensedView>
          }
        />
        <Route
          path="curricular-scope/structure/grades/*"
          element={
            <SuspensedView>
              <Grades />
            </SuspensedView>
          }
        />
        <Route
          path="curricular-scope/structure/levels/*"
          element={
            <SuspensedView>
              <Levels />
            </SuspensedView>
          }
        />

        {/* Page Not Found */}
        <Route path="*" element={<Navigate to="/error/404" />} />
      </Route>
    </Routes>
  );
};

const SuspensedView: FC<WithChildren> = ({ children }) => {
  const baseColor = getCSSVariableValue("--bs-primary");
  TopBarProgress.config({
    barColors: {
      "0": baseColor,
    },
    barThickness: 1,
    shadowBlur: 5,
  });
  return <Suspense fallback={<TopBarProgress />}>{children}</Suspense>;
};

export { PrivateRoutes };
