import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

interface SelectProps {
  label: string;
  name: string;
  value: string;
  onChange: (event: SelectChangeEvent) => void;
  options: {
    value: string;
    label: string;
    flag?: string; // URL de la bandera
  }[];
}

export default function SelectAutoWidth(props: SelectProps) {
  const { label, name, value, onChange, options } = props;

  return (
    <FormControl sx={{ m: 1, minWidth: 50 }}>
      {label && (
        <InputLabel id={`${name}-label`} sx={{ color: "white" }}>
          {label}
        </InputLabel>
      )}
      <Select
        labelId={`${name}-label`}
        id={`${name}-select`}
        value={value}
        onChange={onChange}
        autoWidth
        label={label}
        sx={{
          color: "white",
          "& .MuiOutlinedInput-notchedOutline": { border: "none" },
          "&:hover .MuiOutlinedInput-notchedOutline": { border: "none" },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": { border: "none" },
          "& .MuiSelect-icon": { color: "white" },
          "& .MuiSelect-select": { padding: 0 },
        }}>
        {options.map((item) => (
          <MenuItem key={item.value} value={item.value}>
            {item.flag && (
              <img
                src={item.flag}
                alt={item.label}
                style={{
                  width: 20,
                  height: 14,
                  marginRight: 8,
                  objectFit: "cover",
                }}
              />
            )}
            {item.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
