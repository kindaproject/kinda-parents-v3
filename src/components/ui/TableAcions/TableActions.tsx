// src/components/ui/TableActions/TableActions.tsx
import React from "react";
import { KTIcon } from "../../../_metronic/helpers";

interface Props {
  onView?: (() => void | null) | undefined;
  onEdit?: (() => void | null) | undefined;
  onDelete?: (() => void | null) | undefined;
}

const TableActions: React.FC<Props> = ({ onView, onEdit, onDelete }) => {
  return (
    <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
      {onView && <div
        style={{ cursor: "pointer" }}
        onClick={(e) => {
          e.stopPropagation();
          onView();
        }}>
        <KTIcon iconName="eye" className="fs-2" iconType="outline" />
      </div>}
      {onEdit && <div
        style={{ cursor: "pointer" }}
        onClick={(e) => {
          e.stopPropagation();
          onEdit();
        }}>
        <KTIcon iconName="pencil" className="fs-2" iconType="outline" />
      </div>}
      {onDelete && <div
        style={{ cursor: "pointer" }}
        onClick={(e) => {
          e.stopPropagation();
          onDelete();
        }}>
        <KTIcon
          iconName="trash"
          className="fs-2 text-danger"
          iconType="outline"
        />
      </div>}
    </div>
  );
};

export default TableActions;
