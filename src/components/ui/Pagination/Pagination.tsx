import Select from "../Select/Select";

interface PaginationProps {
  pagination: any;
  // params: any;
  setParams: any;
}


const paginationOptions = [
  { value: 10, label: "10" },
  { value: 25, label: "25" },
  { value: 50, label: "50" },
  { value: 100, label: "100" },
]
const Pagination = ({ pagination, setParams }: PaginationProps) => {
  if (!pagination) return null;

  const { current_page, last_page, per_page, total } = pagination;
  const currentPage = current_page;
  const lastPage = last_page;
  const totalPages = Math.max(1, lastPage);

  // Calcular rango de elementos visibles
  const from = (currentPage - 1) * per_page + 1;
  const to = Math.min(from + per_page - 1, total);

  let startPage = Math.max(1, currentPage - 2);
  let endPage = Math.min(totalPages, startPage + 5);

  if (endPage - startPage < 5 && startPage > 1) {
    startPage = Math.max(1, endPage - 5);
  }

  const pages = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i
  );

  const handlePageChange = (page: number) => {
    setParams((prev: any) => ({ ...prev, page }));
  };

  return (
    <div
      style={{
        marginTop: "10px",
      }}>
      {/* Texto de totales */}


      {/* Controles de paginación */}
      <div
        style={{ display: "flex", alignItems: "center", justifyContent: 'space-between' }}>

        <div style={{ width: 160, display: 'flex', gap: 6 }}>
          <div className="text-sm text-gray-600 w-full">
            Mostrando {from}–{to} de {total}
          </div>
          <Select
            value={paginationOptions.find((o) => o.value == per_page)}
            onChange={(option: any) => {
              if (!option) return;
              setParams((prev: any) => ({ ...prev, per_page: option.value }));
            }}
            options={paginationOptions}
          />
        </div>


        <ul className="pagination"
        // style={{ flexGrow: 1 }}
        >
          <li
            className={`page-item previous ${currentPage === 1 ? "disabled" : ""
              }`}>
            <a
              href="#"
              className="page-link"
              onClick={(e) => {
                e.preventDefault();
                if (currentPage > 1) handlePageChange(currentPage - 1);
              }}>
              <i className="previous" />
            </a>
          </li>

          {pages.map((page) => (
            <li
              key={page}
              className={`page-item ${page === currentPage ? "active" : ""}`}>
              <a
                href="#"
                className="page-link"
                onClick={(e) => {
                  e.preventDefault();
                  handlePageChange(page);
                }}>
                {page}
              </a>
            </li>
          ))}

          <li
            className={`page-item next ${currentPage === lastPage ? "disabled" : ""
              }`}>
            <a
              href="#"
              className="page-link"
              onClick={(e) => {
                e.preventDefault();
                if (currentPage < lastPage) handlePageChange(currentPage + 1);
              }}>
              <i className="next" />
            </a>
          </li>
        </ul>

      </div>
      {pagination.per_page == 100 && (
        <span className="text-warning " style={{ fontSize: "12px" }}>
          Nota: La carga puede ser más lenta al mostrar 100 registros por
          página.
        </span>
      )}
    </div>
  );
};

export default Pagination;
