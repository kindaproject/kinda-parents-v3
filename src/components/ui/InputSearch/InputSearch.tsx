import React from 'react'

interface InputSearchProps {
  search: string;
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}
const InputSearch = ({
  search,   
  handleSearch,
  placeholder ,   
}: InputSearchProps) => {
  return (
    <div className="d-flex align-items-center position-relative my-1">
            <i className="bi bi-search fs-3 position-absolute ms-3" />
            <input
              type="text"
              className="form-control form-control-solid w-300px ps-14"
              placeholder={placeholder}
              value={search}
              onChange={handleSearch}
            />
            
          </div>
  )
}

export default InputSearch