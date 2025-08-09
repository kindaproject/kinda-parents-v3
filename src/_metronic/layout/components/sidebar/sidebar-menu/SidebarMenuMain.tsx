import { useEffect, useState } from "react";
import { useAuth } from "../../../../../app/modules/auth";
import { SidebarMenuItem } from "./SidebarMenuItem";
import { SidebarMenuItemWithSub } from "./SidebarMenuItemWithSub";
import { menuConfig } from "./utils/utils";

const SidebarMenuMain = () => {
  const { currentUser }: any = useAuth();
  console.log(currentUser, 'currentus');
  // const [isAdmin, setIsAdmin] = useState(false);
  // const permissions = new Set(
  //   currentUser?.permissions?.map((p: any) => p.module_key)
  // );
  // const hasPermission = (key: string) => permissions.has(key);

  const email = currentUser?.mail?.trim().toLowerCase();
  const isAdmin = email.endsWith('@kindagolden.pro');

  const permissions = new Set(
    currentUser?.modules?.map((p: any) => p.key)
  );


  const hasAnyPermission = (keys: string[]) => keys.some(key => hasPermission(key));

  // {hasAnyPermission(["management", "period", "area", "matter", "merit", "shift", "schedule"]) && (


  const hasPermission = (key: string) => {
    // Si es admin, tiene todos los permisos aunque el array esté vacío
    // if (isAdmin) return true;
    return permissions.has(key);
  };


  // Ámbito Académico
  const dataDevelopment = currentUser?.modules?.filter(
    (item: any) => item.key === 'activity'
      || item.key === 'assist'
      || item.key === 'license'
      || item.key === 'permission'
  )

  const dataPlanningAcademic = currentUser?.modules?.filter(
    (item: any) => item.key === 'curricular-activity'
      // || item.key === 'learning-goal'
      // || item.key === 'study-plan'
      // || item.key === 'information-resource'

      || item.key === 'team'
      || item.key === 'level'
      || item.key === 'parallel'
      || item.key === 'classroom'
  )

  const dataPerformance = currentUser?.modules?.filter(
    (item: any) => item.key === 'qualification'
      || item.key === 'distinction'
      || item.key === 'exam'
      || item.key === 'classwork'
      || item.key === 'homework'
      || item.key === 'note'
  )

  const dataOrganization = currentUser?.modules?.filter(
    (item: any) => item.key === 'academic-calendar'
      || item.key === 'daily-schedule'
      || item.key === 'class-schedule'
  )

  // Ámbito Familiar
  const dataManagementFamily = currentUser?.modules?.filter(
    (item: any) => item.key === 'family'
      || item.key === 'student'
      || item.key === 'tutor'
      || item.key === 'tutor-role'
  )

  const dataCommunicationFamily = currentUser?.modules?.filter(
    (item: any) => item.key === 'notice'
      || item.key === 'message'
      || item.key === 'meeting'
      || item.key === 'proverb'
  )

  const dataFinance = currentUser?.modules?.filter(
    (item: any) => item.key === 'pending-payment'
      || item.key === 'payment-plan'
      || item.key === 'payment-type'
      || item.key === 'payment-method'
      || item.key === 'currency'
  )

  const dataRegister = currentUser?.modules?.filter(
    (item: any) => item.key === 'admission'
      || item.key === 'document'
      || item.key === 'kardex'
  )

  // Ámbito Curricular
  const dataAssignment = currentUser?.modules?.filter(
    (item: any) => item.key === 'class'
      || item.key === 'assignment'
      || item.key === 'supervisor'
      || item.key === 'teacher'
      || item.key === 'auxiliary'
  )

  const dataStructureCur = currentUser?.modules?.filter(
    (item: any) => item.key === 'team'
      || item.key === 'level'
      || item.key === 'grade'
      || item.key === 'classroom'
      || item.key === 'parallel'
  )

  // Ambito administrativo 

  const dataEmployee = currentUser?.modules?.filter(
    (item: any) => item.key === 'department'
      || item.key === 'admin'
      || item.key === 'designation'
      || item.key === 'staff'
      || item.key === 'user'
      || item.key === 'credential'
  )

  const dataProgramming = currentUser?.modules?.filter(
    (item: any) => item.key === 'management'
      || item.key === 'period'
      || item.key === 'area'
      || item.key === 'matter'
      || item.key === 'merit'
      || item.key === 'shift'
      || item.key === 'schedule'
  )

  const dataConnection = currentUser?.modules?.filter(
    (item: any) => item.key === 'chat'
      || item.key === 'mail'
      || item.key === 'notification'
      || item.key === 'reminder'
  )

  const dataAssistance = currentUser?.modules?.filter(
    (item: any) => item.key === 'guide'
      || item.key === 'question'
      || item.key === 'suggestion'
      || item.key === 'report'
  )
  const dataStructureAdm = currentUser?.modules?.filter(
    (item: any) => item.key === 'ambient-type'
      || item.key === 'ambient-feature'
      || item.key === 'ambient'
  )

  const dataComunicationAdm = currentUser?.modules?.filter(
    (item: any) => item.key === 'notification-channel'
  )

  const dataSettings = currentUser?.modules?.filter(
    (item: any) => item.key === 'module'
      || item.key === 'setting'
      || item.key === 'environment'
      || item.key === 'tag'
      || item.key === 'platform'
      || item.key === 'language'

  )


  const allModuleGroups: any = {


    development: dataDevelopment,
    planningAcademic: dataPlanningAcademic,
    performance: dataPerformance,
    organization: dataOrganization,

    //familiar
    managementFamily: dataManagementFamily,
    communicationFamily: dataCommunicationFamily,
    finance: dataFinance,
    register: dataRegister,
    //curricular
    assignment: dataAssignment,
    structureCur: dataStructureCur,
    programming: dataProgramming,
    //administrativo
    connection: dataConnection,
    employee: dataEmployee,
    assistance: dataAssistance,
    structureAdm: dataStructureAdm,
    communicationAdm: dataComunicationAdm,
    settings: dataSettings,
  };


  // const 


  // useEffect(() => {
  //   const email = currentUser?.mail?.trim().toLowerCase();
  //   setIsAdmin(email?.endsWith('@kindagolden.pro'));
  //   console.log(email?.endsWith('@kindagolden.pro'), 'trrue or false currentuser');
  // }, [currentUser]);
  return (
    <>
      <SidebarMenuItem
        to="/dashboard"
        icon="home"
        title="Tablero Principal"
        fontIcon="bi-app-indicator"
      />

      {menuConfig.map((section) => {
        const visibleItems = section.items.filter(
          (item) => allModuleGroups[item.key]?.length > 0
        );

        if (visibleItems.length === 0) return null;

        return (
          <div key={section.scopeKey}>
            <div className="menu-item">
              <div className="menu-content pt-8 pb-2">
                <span className="menu-section text-muted text-uppercase fs-8 ls-1 fw-bold">
                  {section.sectionTitle}
                </span>
              </div>
            </div>

            {visibleItems.map((group) => (
              <SidebarMenuItemWithSub
                key={group.key}
                to={group.basePath}
                icon={group.icon}
                title={group.title}>
                {allModuleGroups[group.key].map((item: any) => (
                  <SidebarMenuItem
                    key={item.key}
                    to={`/${section.scopeKey}/${group.key}/${item.key}`}
                    title={item.name}
                    icon={item.icon || group.icon}
                    hasBullet
                  />
                ))}
              </SidebarMenuItemWithSub>
            ))}
          </div>
        );
      })}
    </>

  );
};

export { SidebarMenuMain };



//  <>
//       {/* Dashboard */}
//       <SidebarMenuItem
//         to="/dashboard"
//         icon="home"
//         title={"Tablero Principal"}
//         fontIcon="bi-app-indicator"
//       />

//       {/* Ámbito Académico */}
//       <div className="menu-item">
//         <div className="menu-content pt-8 pb-2">
//           <span
//             style={{ fontWeight: "bold" }}
//             className="menu-section text-muted text-uppercase fs-8 ls-1">
//             {"Ámbito Académico"}
//           </span>
//         </div>
//       </div>

//       <SidebarMenuItemWithSub
//         to="/development"
//         icon="chart-line-up"
//         title={"Desarrollo"}>
//         {dataDevelopment?.map((item: any) => (
//           <SidebarMenuItem
//             key={item.key}
//             to={`/academic-scope/development/${item.key}`}
//             title={item.name}
//             hasBullet
//             icon={item.icon || "chart-line-up"}
//           />
//         ))}
//       </SidebarMenuItemWithSub>

//       <SidebarMenuItemWithSub
//         to="/planning-academic"
//         icon="book-open"
//         title={"Planificación"}>
//         {dataPlanningAcademic?.map((item: any) => (
//           <SidebarMenuItem
//             key={item.key}
//             to={`/academic-scope/planning-academic/${item.key}`}
//             title={item.name}
//             hasBullet
//             icon={item.icon || "book-open"}
//           />
//         ))}
//       </SidebarMenuItemWithSub>

//       <SidebarMenuItemWithSub
//         to="/performance"
//         icon="teacher"
//         title={"Rendimiento"}>
//         {dataPerformance?.map((item: any) => (
//           <SidebarMenuItem
//             key={item.key}
//             to={`/academic-scope/performance/${item.key}`}
//             title={item.name}
//             hasBullet
//             icon={item.icon || "teacher"}
//           />
//         ))}
//       </SidebarMenuItemWithSub>

//       <SidebarMenuItemWithSub
//         to="/organization"
//         icon="calendar"
//         title={"Organización"}>
//         {dataOrganization?.map((item: any) => (
//           <SidebarMenuItem
//             key={item.key}
//             to={`/academic-scope/organization/${item.key}`}
//             title={item.name}
//             hasBullet
//             icon={item.icon || "calendar"}
//           />
//         ))}
//       </SidebarMenuItemWithSub>

//       {/* Ámbito Familiar */}
//       <div className="menu-item">
//         <div className="menu-content pt-8 pb-2">
//           <span
//             style={{ fontWeight: "bold" }}
//             className="menu-section text-muted text-uppercase fs-8 ls-1">
//             {"Ámbito Familiar"}
//           </span>
//         </div>
//       </div>

//       <SidebarMenuItemWithSub
//         to="/management-family"
//         icon="people"
//         title={"Administración"}>
//         {dataManagementFamily?.map((item: any) => (
//           <SidebarMenuItem
//             key={item.key}
//             to={`/familiar-scope/management-family/${item.key}`}
//             title={item.name}
//             hasBullet
//             icon={item.icon || "people"}
//           />
//         ))}
//       </SidebarMenuItemWithSub>

//       <SidebarMenuItemWithSub
//         to="/communication"
//         icon="message-text-2"
//         title={"Comunicación"}>
//         {dataCommunicationFamily?.map((item: any) => (
//           <SidebarMenuItem
//             key={item.key}
//             to={`/familiar-scope/communication/${item.key}`}
//             title={item.name}
//             hasBullet
//             icon={item.icon || "message-text-2"}
//           />
//         ))}
//       </SidebarMenuItemWithSub>
//       <SidebarMenuItemWithSub
//         to="/finance"
//         icon="dollar"
//         title={"Finanzas"}>
//         {dataFinance?.map((item: any) => (
//           <SidebarMenuItem
//             key={item.key}
//             to={`/familiar-scope/finance/${item.key}`}
//             title={item.name}
//             hasBullet
//             icon={item.icon || "dollar"}
//           />
//         ))}
//       </SidebarMenuItemWithSub>

//       <SidebarMenuItemWithSub
//         to="/register"
//         icon="document"
//         title={"Registros"}>
//         {dataRegister?.map((item: any) => (
//           <SidebarMenuItem
//             key={item.key}
//             to={`/familiar-scope/register/${item.key}`}
//             title={item.name}
//             hasBullet
//             icon={item.icon || "document"}
//           />
//         ))}
//       </SidebarMenuItemWithSub>

//       {/* Ámbito Curricular */}
//       <div className="menu-item">
//         <div className="menu-content pt-8 pb-2">
//           <span
//             style={{ fontWeight: "bold" }}
//             className="menu-section text-muted text-uppercase fs-8 ls-1">
//             {"Ámbito Curricular"}
//           </span>
//         </div>
//       </div>

//       <SidebarMenuItemWithSub
//         to="/assignment"
//         icon="category"
//         title={"Administración"}>
//         {dataAssignment?.map((item: any) => (
//           <SidebarMenuItem
//             key={item.key}
//             to={`/curricular-scope/assignment/${item.key}`}
//             title={item.name}
//             hasBullet
//             icon={item.icon || "category"}
//           />
//         ))}
//       </SidebarMenuItemWithSub>

//       <SidebarMenuItemWithSub
//         to="/structure"
//         icon="book"
//         title={"Planificación"}>
//         {dataStructure?.map((item: any) => (
//           <SidebarMenuItem
//             key={item.key}
//             to={`/curricular-scope/structure/${item.key}`}
//             title={item.name}
//             hasBullet
//             icon={item.icon || "book"}
//           />
//         ))}
//       </SidebarMenuItemWithSub>

//       <SidebarMenuItemWithSub
//         to="/programming"
//         icon="notepad"
//         title={"Programación"}>

//         {/* <SidebarMenuItem
//           to="/curricular-scope/programming/management"
//           title={"Gestiones"}
//           hasBullet
//         />

//         {hasPermission("period") && (
//           <SidebarMenuItem
//             to="/curricular-scope/programming/periods"
//             title={"Periodos"}
//             hasBullet
//           />
//         )}
//         {hasPermission("area") && (
//           <SidebarMenuItem
//             to="/curricular-scope/programming/areas"
//             title={"Areas"}
//             hasBullet
//           />
//         )}
//         {hasPermission("matter") && (
//           <SidebarMenuItem
//             to="/curricular-scope/programming/matters"
//             title={"Materias"}
//             hasBullet
//           />
//         )}
//         {hasPermission("merit") && (
//           <SidebarMenuItem
//             to="/curricular-scope/programming/merits"
//             title={"Meritos"}
//             hasBullet
//           />
//         )}
//         {hasPermission("shift") && (
//           <SidebarMenuItem
//             to="/curricular-scope/programming/shifts"
//             title={"Turnos"}
//             hasBullet
//           />
//         )}
//         {hasPermission("schedule") && (
//           <SidebarMenuItem
//             to="/curricular-scope/programming/schedules"
//             title={"Horarios"}
//             hasBullet
//           />
//         )} */}
//         {dataProgramming?.map((item: any) => (
//           <SidebarMenuItem
//             key={item.key}
//             to={`/curricular-scope/programming/${item.key}`}
//             title={item.name}
//             icon={item.icon || 'notepad'}
//           // hasBullet
//           />
//         ))}

//       </SidebarMenuItemWithSub>

//       {/* Ámbito Administrativo */}
//       <div className="menu-item">
//         <div className="menu-content pt-8 pb-2">
//           <span
//             style={{ fontWeight: "bold" }}
//             className="menu-section text-muted text-uppercase fs-8 ls-1">
//             {"Ámbito Administrativo"}
//           </span>
//         </div>
//       </div>

//       <SidebarMenuItemWithSub
//         to="/connection"
//         icon="notification-status"
//         title={"Comunicación"}>
//         {dataConnection?.map((item: any) => (
//           <SidebarMenuItem
//             key={item.key}
//             to={`/administrative-scope/connection/${item.key}`}
//             title={item.name}
//             hasBullet
//             icon={item.icon || "notification-status"}
//           />
//         ))}
//       </SidebarMenuItemWithSub>

//       <SidebarMenuItemWithSub
//         to="/employee"
//         icon="profile-user"
//         title={"Personal"}>
//         {/* <SidebarMenuItem
//           to="/administrative-scope/employee/admins"
//           title={"Administradores"}
//           hasBullet
//         />
//         {hasPermission("staff") && (
//           <SidebarMenuItem
//             to="/administrative-scope/employee/staffs"
//             title={"Personal"}
//             hasBullet
//           />
//         )}
//         {hasPermission("department") && (
//           <SidebarMenuItem
//             to="/administrative-scope/employee/departments"
//             title={"Departamentos"}
//             hasBullet
//           />
//         )}
//         {hasPermission("designation") && (
//           <SidebarMenuItem
//             to="/administrative-scope/employee/designations"
//             title={"Designaciones"}
//             hasBullet
//           />
//         )}
//         {hasPermission("role") && (
//           <SidebarMenuItem
//             to="/administrative-scope/employee/admin-roles"
//             title={"Roles"}
//             hasBullet
//           />
//         )}
//         {hasPermission("role") && (
//           <SidebarMenuItem
//             to="/administrative-scope/employee/staff_roles"
//             title={"Roles de Personal"}
//             hasBullet
//           />
//         )}
//         {hasPermission("user") && (
//           <SidebarMenuItem
//             to="/administrative-scope/employee/users"
//             title={"Usuarios"}
//             hasBullet
//           />
//         )} */}
//         {dataEmployee?.map((item: any) => (
//           <SidebarMenuItem
//             key={item.key}
//             to={`/administrative-scope/employee/${item.key}`}
//             title={item.name}
//             // hasBullet
//             icon={item.icon || "profile-user"}
//           />
//         ))}
//       </SidebarMenuItemWithSub>

//       {dataAssistance?.length > 0 && <SidebarMenuItemWithSub

//         to="/assistance"
//         icon="message-question"
//         title={"Asistencia"}>
//         {dataAssistance?.map((item: any) => (
//           <SidebarMenuItem
//             key={item.key}
//             to={`/administrative-scope/assistance/${item.key}`}
//             title={item.name}
//             hasBullet
//             icon={item.icon || "message-question"}
//           />
//         ))}
//       </SidebarMenuItemWithSub>}

//       {dataSettings.length > 0 && <SidebarMenuItemWithSub
//         to="/settings"
//         icon="setting-2"
//         title={"Configuraciones"}>
//         {dataSettings?.map((item: any) => (
//           <SidebarMenuItem
//             key={item.key}
//             to={`/administrative-scope/settings/${item.key}`}
//             title={item.name}
//             hasBullet
//             icon={item.icon || "setting-2"}
//           />
//         ))}
//       </SidebarMenuItemWithSub>}
//     </>


