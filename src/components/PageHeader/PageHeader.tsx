import React from "react";
import { Link } from "react-router-dom";
import Select from "../ui/Select/Select";
import { useThemeMode } from "../../_metronic/partials";
interface PageHeaderProps {
  title: string;
  linkTitle: string;
  subtitle?: string;
  gestion?: boolean;
  params?: any;
  setParams?: any;
  className?: string;
}
const PageHeader = ({
  title,
  linkTitle,
  subtitle,
  gestion,
  params,
  setParams,
  className,
}: PageHeaderProps) => {
  const { mode } = useThemeMode();
  const [optionValue, setOptionValue] = React.useState<any>({
    value: "2025",
    label: "Gestión 2025",
  });
  const options: any = [
    { value: "2025", label: "Gestión 2025" },
    { value: "2024", label: "Gestión 2024" },
    { value: "2023", label: "Gestión 2023" },
  ];

  return (
    <div className={className}>
      <section
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          gap: "10px",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: 12,
        }}>
        <div>
          <Link
            to={linkTitle}
            className={`fs-3 ${mode === "dark" ? "text-white" : "text-black"}`}>
            {title}
          </Link>
          <p style={{ color: "var(--c_whiteV4)" }}>
            <Link to="/">Inicio</Link> {subtitle}{" "}
          </p>
        </div>
        {gestion && (
          <div className="div">
            <Select
              value={optionValue}
              onChange={(option) => {
                console.log(option?.value, "option gestion");
                if (!option) return;
                setOptionValue(option);
                if (setParams && params) {
                  setParams({
                    ...params,
                    created_at_min: `${option.value}-01-01`,
                    created_at_max: `${option.value}-12-31`,
                  });
                }
              }}
              options={options}
              className="min-w-[200px]"
            />
          </div>
        )}
      </section>
    </div>
  );
};

export default PageHeader;
