import React from "react";
import { KTSVG } from "../../../_metronic/helpers";

interface DataModalProps {
  open: boolean;
  onClose: () => void;
  fullScreen?: boolean;
  buttonText?: string;
  buttonCancel?: string;
  onSave?: () => void;
  children?: React.ReactNode;
  title?: string;
}

const DataModal: React.FC<DataModalProps> = ({
  open,
  onClose,
  fullScreen = false,
  buttonText = "Guardar",
  buttonCancel = "Cancelar",
  onSave,
  children,
  title = "",
}) => {
  if (!open) return null;

  return (
    <>
      <div className="modal-backdrop fade show"></div>
      <div className="modal fade show d-block" tabIndex={-1}>
        <div className={`modal-dialog ${fullScreen ? "modal-fullscreen" : ""}`}>
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{title}</h5>
              <div
                className="btn btn-icon btn-sm btn-active-light-primary ms-2"
                onClick={onClose}
                aria-label="Close">
                <KTSVG
                  path="media/icons/duotune/arrows/arr061.svg"
                  className="svg-icon svg-icon-2x"
                />
              </div>
            </div>
            <div className="modal-body">{children}</div>
            <div className="modal-footer">
              <button type="button" className="btn btn-light" onClick={onClose}>
                {buttonCancel}
              </button>
              {onSave && (
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={onSave}>
                  {buttonText}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DataModal;
