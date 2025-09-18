import { useEffect, useState } from "react";
import { useAuth } from "../../../../../app/modules/auth";
import { SidebarMenuItem } from "./SidebarMenuItem";
import { SidebarMenuItemWithSub } from "./SidebarMenuItemWithSub";
import { menuConfig } from "./utils/utils";

const SidebarMenuMain = () => {
  return (
    <>
      <SidebarMenuItem
        to="/dashboard"
        icon="home"
        title="Inicio"
        fontIcon="bi-app-indicator"
      />

      <SidebarMenuItemWithSub
        to="/crafted/pages"
        title="Mi cuenta"
        fontIcon="bi-archive"
        icon="user">
        <SidebarMenuItem
          to="/crafted/pages/profile/overview"
          title="Perfil de usuario"
          hasBullet={true}
        />
        <SidebarMenuItem
          to="/crafted/pages/profile/projects"
          title="Estado de pagos"
          hasBullet={true}
        />
      </SidebarMenuItemWithSub>
      <SidebarMenuItem
        to="/crafted/pages/messages"
        icon="message-text-2"
        title="Buzón de mensajes"
        fontIcon="bi-app-indicator"
      />
      <SidebarMenuItem
        to="/crafted/pages/calendar"
        icon="calendar"
        title="Calendario de eventos y reuniones"
        fontIcon="bi-app-indicator"
      />
    </>
  );
};

export { SidebarMenuMain };
