import React from 'react'
import Button from '../ui/Button/Button'
import Table from '../ui/Table/Table'
import { useThemeMode } from '../../_metronic/partials'
import { useNavigate } from 'react-router-dom'

const TabTableDetail = ({ headers, data, linkToPath, detailsButtonText = 'Ver los detalles' }: any) => {
  const navigate = useNavigate()

  return (
    <>
      {/* <table className="table align-middle table-row-dashed fs-6 gy-5">
      <thead>
        <tr className="text-start text-muted fw-bold fs-7 text-uppercase gs-0">
          <th>Status</th>
          <th>Endpoint</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody className="text-gray-600 fw-semibold">
        <tr>
          <td>
            <span className="badge badge-light-success">200 OK</span>
          </td>
          <td>POST /v1/invoices/in_7876_1810/payment</td>
          <td>21 Feb 2023, 11:30 am</td>
        </tr>
        <tr>
          <td>
            <span className="badge badge-light-danger">500 ERR</span>
          </td>
          <td>POST /v1/invoices/in_5241_7881/invalid</td>
          <td>20 Dec 2023, 2:40 pm</td>
        </tr>
      </tbody>
    </table> */}

      <Table
        headers={headers}
        data={data}
        loading={false}             // pone `true` para ver los skeletons
        skeletonRows={2}            // número de líneas de placeholder
        className="mt-4"
      />


    {data?.length >= 11 && <Button onClick={() => navigate(linkToPath)} style={{marginTop: '1rem'}}>{detailsButtonText}</Button>}
    </>
  )
}

export default TabTableDetail