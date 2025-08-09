import React from "react";
import { IconWorking } from "../ui/Icon/IconLibrary";
import Icon from "../ui/Icon/Icon";

const Working = () => {
  return (
    <div
      style={{
        height: "calc(100vh - 134px)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}>
        <Icon name={IconWorking} size={60} />
      </div>
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
        ¡Estamos trabajando en ello!
      </h1>
      <p className="text-gray-600 dark:text-gray-300 max-w-md">
        Esta sección aún está en construcción. Vuelve pronto para ver las
        novedades 🚧
      </p>
    </div>
  );
};

export default Working;
