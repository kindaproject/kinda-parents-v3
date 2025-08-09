// import React from 'react';
// import { Link } from 'react-router-dom';
// // import { headerMenuDisplay } from '@/layouts/default-layout/config/helper';
// // import { getAssetPath } from '@/core/helpers/assets';
// // import KTIcon from '@/components/KTIcon';

// interface HeaderMenuProps {
//   // si necesitas pasar props, defínelas aquí
// }

// const HeaderMenu: React.FC<HeaderMenuProps> = () => {
//   return headerMenuDisplay ? (
//     <div
//       className="app-header-menu app-header-mobile-drawer align-items-stretch"
//       data-kt-drawer="true"
//       data-kt-drawer-name="app-header-menu"
//       data-kt-drawer-activate='{ "default": true, "lg": false }'
//       data-kt-drawer-overlay="true"
//       data-kt-drawer-width="225px"
//       data-kt-drawer-direction="end"
//       data-kt-drawer-toggle="#kt_app_header_menu_toggle"
//       data-kt-swapper="true"
//       data-kt-swapper-mode='{ "default": "append", "lg": "prepend" }'
//       data-kt-swapper-parent='{ "default": "#kt_app_body", "lg": "#kt_app_header_wrapper" }'
//     >
//       <div
//         className="menu menu-rounded menu-column menu-lg-row my-5 my-lg-0 align-items-stretch fw-semibold px-2 px-lg-0"
//         id="kt_app_header_menu"
//         data-kt-menu="true"
//       >
//         <div
//           className="menu-item menu-lg-down-accordion menu-sub-lg-down-indention me-0 me-lg-2"
//           data-kt-menu-trigger='{ "default": "click", "lg": "hover" }'
//           data-kt-menu-placement="bottom-start"
//         >
//           <span className="menu-link">
//             <span className="menu-title">Nuevos Estudiantes</span>
//             <span className="menu-arrow d-lg-none" />
//           </span>

//           <div className="menu-sub menu-sub-lg-down-accordion menu-sub-lg-dropdown px-lg-2 py-lg-4 w-lg-290px">
//             <div className="menu-item">
//               <Link
//                 to="/dashboard/admission-requests"
//                 className="menu-link m-0 p-0"
//                 title="Check out over 200 in-house components, plugins and ready for use solutions"
//                 data-bs-toggle="tooltip"
//                 data-bs-trigger="hover"
//                 data-bs-dismiss="click"
//                 data-bs-placement="right"
//               >
//                 <span className="menu-icon">
//                   <KTIcon icon-name="user-tick" icon-class="fs-3" />
//                 </span>
//                 <span className="menu-title">Solicitudes de admisión</span>
//               </Link>
//             </div>

//             <div className="menu-item">
//               <Link
//                 to="/dashboard/class_assignment"
//                 className="menu-link m-0 p-0"
//                 title="Check out the complete documentation"
//                 data-bs-toggle="tooltip"
//                 data-bs-trigger="hover"
//                 data-bs-dismiss="click"
//                 data-bs-placement="right"
//               >
//                 <span className="menu-icon">
//                   <KTIcon icon-name="abstract-26" icon-class="fs-3" />
//                 </span>
//                 <span className="menu-title">Asignaciones de curso</span>
//               </Link>
//             </div>

//             <div className="menu-item">
//               <a
//                 href="#"
//                 className="menu-link"
//                 title="Verifica la disponibilidad"
//               >
//                 <span className="menu-icon">
//                   <KTIcon icon-name="shield-search" icon-class="fs-3" />
//                 </span>
//                 <span className="menu-title">Verificación de disponibilidad</span>
//               </a>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   ) : (
//     <div className="align-items-stretch" />
//   );
// };

// export default HeaderMenu;
