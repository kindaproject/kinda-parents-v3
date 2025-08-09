
import React, { ReactNode } from "react";
import { Modal } from "react-bootstrap";
import { KTIcon } from "../../../_metronic/helpers";
import Button from "../../ui/Button/Button";

interface ModalDelProps {
  openDel: boolean;
  setOpenDel: (open: boolean) => void;
  deleteRow: () => void;
  delMsg?: any;
  loading: boolean;
  children?: ReactNode;
}

const ModalDel: React.FC<ModalDelProps> = ({
  openDel,
  setOpenDel,
  delMsg,
  deleteRow,
  children,
  loading
}) => {
  return (
    <Modal
      show={openDel}
      className="p-4"
      onHide={() => setOpenDel(false)}
      centered
    >
      <div className="p-4">
        {/*
          Si se pasa `children`, los renderizamos aquí.
          De lo contrario, utilizamos el contenido predeterminado.
        */}
        {children ? (
          children
        ) : (
          <>

            <div style={{ display: 'flex', }}>
              <KTIcon iconName="information-4" iconType="duotone" className="fs-1 text-warning me-2" />

              <div className="fs-4 font-bold mb-2">¿Está seguro de eliminar el registro seleccionado?</div>
            </div>

            {/* <p>
              Esta acción <strong>e eliminar de forma segura a un administrador del sistema. </strong> el registro seleccionado.
              <br />
              <span className="text-danger ">
                La eliminación segura consiste en marcar el registro como inactivo o eliminarlo de manera lógica, sin borrar su historial ni sus referencias relacionadas. Solo es posible realizar esta acción si el administrador no tiene procesos activos en el sistema como asignaciones de soporte, revisiones programadas u otras operaciones bloqueantes.
              </span>
            </p> */}
            {delMsg}
            <div className="d-flex justify-content-end mt-4 gap-2">

              <Button
                className="btn btn-light-primary"
                onClick={() => setOpenDel(false)}
              >
                Cancelar
              </Button>
              <Button
                className="btn btn-danger"
                onClick={deleteRow}
                loading={loading}
              >
                Eliminar
              </Button>
            </div>
          </>
        )}
      </div>
    </Modal>
  );
};

export default ModalDel;
