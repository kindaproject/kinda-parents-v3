import React, { useState, useEffect, useRef } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import Select, { Option } from '../Select/Select';
import { getTodayDate } from '../../utils/dates';
import { rules } from '../../utils/rules';


export type FilterOption = {
  value: string | number | boolean | null;
  label: string | null;
};


export type FilterConfig =
  | {
    type: 'select';
    label: string;
    name: string;
    options: Option[] | null;
    placeholder?: string;
    isMulti?: boolean;
    defaultValue?: string | number | boolean;
    defaultValues?: Array<string | number | boolean>;
    rules?: string[];
  }
  | {
    type: 'checkboxGroup';
    label: string;
    name: string;
    options: FilterOption[];
    defaultValues?: Array<string | number | boolean>;
    rules?: string[];
  }
  | {
    type: 'radioGroup';
    label: string;
    name: string;
    options: FilterOption[];
    inline?: boolean;
    defaultValue?: string | number | boolean;
    rules?: string[];

  }
  | {
    type: 'switch';
    label: string;
    name: string;
    defaultChecked?: boolean;
    rules?: string[];
  }
  | {
    type: 'text';
    label: string;
    name: string;
    placeholder?: string;
    defaultValue?: string;
    rules?: string[];
  }
  | {
    type: 'number';
    label: string;
    name: string;
    placeholder?: string;
    defaultValue?: string;
    rules?: string[];

  }
  | {
    type: 'dateRange';
    label: string;
    nameFrom: string;
    nameTo: string;
    defaultFrom?: string;
    defaultTo?: string;
    rules?: string[];
    rulesFrom?: string[];         // ← reglas específicas para el “from”
    rulesTo?: string[];           // ← reglas específicas para el “to”
  };



function getSelectDefault(
  cfg: Extract<FilterConfig, { type: 'select' }>
): string | number | boolean | null {
  if (cfg.defaultValue !== undefined) {
    return cfg.defaultValue;
  }
  if (cfg.options?.some((o) => o.value === 'all')) {
    return 'all';
  }
  return null;
}

interface FilterModalProps {
  show: boolean;
  onClose: () => void;
  onApply: (filters: Record<string, any>) => void;
  filtersConfig: FilterConfig[];
  applyText?: string;
  resetText?: string;
}

const FilterModal: React.FC<FilterModalProps> = ({
  show,
  onClose,
  onApply,
  filtersConfig,
  applyText = 'Aplicar',
  resetText = 'Limpiar',
}) => {
  const [values, setValues] = useState<Record<string, any>>({});
  const hasInit = useRef(false);
  const [errors, setErrors] = useState<Record<string, string>>({});


  useEffect(() => {
    if (!show) return;
    if (hasInit.current) return;
    const initial: Record<string, any> = {};

    filtersConfig.forEach((cfg) => {
      switch (cfg.type) {
        case 'select':
          initial[cfg.name] = cfg.isMulti
            ? cfg.defaultValues ?? []
            : getSelectDefault(cfg);
          break;
        case 'checkboxGroup':
          initial[cfg.name] = cfg.defaultValues ?? [];
          break;
        case 'radioGroup':
          initial[cfg.name] = cfg.defaultValue ?? null;
          break;
        case 'switch':
          initial[cfg.name] = cfg.defaultChecked ?? false;
          break;
        case 'text':
          initial[cfg.name] = cfg.defaultValue ?? '';
          break;
        case 'dateRange':
          initial[cfg.nameFrom] = cfg.defaultFrom ?? '';
          initial[cfg.nameTo] = cfg.defaultTo ?? getTodayDate();
          break;
      }
    });

    setValues(initial);
    hasInit.current = true;
  }, [show, filtersConfig]);


  const handleChange = (name: string, val: any) => {
    setValues((prev) => ({ ...prev, [name]: val }));
  };


  const handleReset = () => {
    const resetVals: Record<string, any> = {};

    filtersConfig.forEach((cfg) => {
      switch (cfg.type) {
        case 'select':
          resetVals[cfg.name] = cfg.isMulti
            ? cfg.defaultValues ?? []
            : getSelectDefault(cfg);
          break;
        case 'checkboxGroup':
          resetVals[cfg.name] = cfg.defaultValues ?? [];
          break;
        case 'radioGroup':
          resetVals[cfg.name] = cfg.defaultValue ?? null;
          break;
        case 'switch':
          resetVals[cfg.name] = cfg.defaultChecked ?? false;
          break;
        case 'text':
          resetVals[cfg.name] = cfg.defaultValue ?? '';
          break;
        case 'number':
          resetVals[cfg.name] = cfg.defaultValue ?? '';
          break;
        case 'dateRange':
          resetVals[cfg.nameFrom] = cfg.defaultFrom ?? '';
          resetVals[cfg.nameTo] = cfg.defaultTo ?? getTodayDate();
          break;
      }
    });

    setValues(resetVals);
  };


  // const handleApply = () => {
  //   onApply(values);
  //   onClose();
  // };
  const handleApply = () => {
    let vErrors: Record<string, string> = {};

    filtersConfig.forEach(cfg => {
      if (cfg.type === 'dateRange') {
        if (cfg.rulesFrom) {
          vErrors = rules({
            key: cfg.nameFrom,
            value: values[cfg.nameFrom],
            allValues: values,
            errors: vErrors,
            rules: cfg.rulesFrom,
          });
        }
        if (cfg.rulesTo) {
          vErrors = rules({
            key: cfg.nameTo,
            value: values[cfg.nameTo],
            allValues: values,
            errors: vErrors,
            rules: cfg.rulesTo,
          });
        }
      } else if (cfg.rules) {
        vErrors = rules({
          key: cfg.name,
          value: values[cfg.name],
          allValues: values,
          errors: vErrors,
          rules: cfg.rules,
        });
      }
    });

    setErrors(vErrors);
    // Si no hay errores, aplico filtros y cierro
    if (Object.keys(vErrors).length === 0) {
      onApply(values);
      onClose();
    }
  };


  return (
    <Modal show={show} onHide={onClose} centered backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>Opciones de Filtros</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ height: '350px', overflowY: 'scroll' }}>
        <Form>
          {filtersConfig.map((cfg, idx) => {
            switch (cfg.type) {
              case 'select':
                return (
                  <Form.Group className="mb-3" key={idx}>
                    <Form.Label>{cfg.label}</Form.Label>
                    <Select
                      placeholder={cfg.placeholder}
                      options={cfg.options}
                      value={
                        values[cfg.name] !== null
                          ? {
                            value: values[cfg.name],
                            label:
                              cfg.options?.find((o) => o.value === values[cfg.name])
                                ?.label || ''
                          }
                          : null
                      }
                      onChange={(opt) => {
                        if (cfg.isMulti) {
                          handleChange(
                            cfg.name,
                            (opt as any).map((o: any) => o.value)
                          );
                        } else {
                          handleChange(cfg.name, (opt as Option)?.value ?? null);
                        }
                      }}
                    />
                    {errors[cfg.name] && (
                      <Form.Text className="text-danger">
                        {errors[cfg.name]}
                      </Form.Text>
                    )}
                  </Form.Group>
                );

              case 'checkboxGroup':
                return (
                  <Form.Group className="mb-3" key={idx}>
                    <Form.Label>{cfg.label}</Form.Label>
                    <div>
                      {cfg.options.map((opt) => (
                        <Form.Check
                          inline
                          key={String(opt.value)}
                          type="checkbox"
                          label={opt.label}
                          checked={(values[cfg.name] as any[])?.includes(opt.value)}
                          onChange={(e) => {
                            const checked = e.target.checked;
                            const prevArr = (values[cfg.name] as any[]) || [];
                            if (checked) {
                              handleChange(cfg.name, [...prevArr, opt.value]);
                            } else {
                              handleChange(
                                cfg.name,
                                prevArr.filter((v) => v !== opt.value)
                              );
                            }
                          }}
                        />
                      ))}
                    </div>
                    {errors[cfg.name] && (
                      <Form.Text className="text-danger">
                        {errors[cfg.name]}
                      </Form.Text>
                    )}
                  </Form.Group>
                );

              case 'radioGroup':
                return (
                  <Form.Group className="mb-3" key={idx}>
                    <Form.Label>{cfg.label}</Form.Label>
                    <div className={cfg.inline ? 'd-flex gap-3' : ''}>
                      {cfg.options.map((opt) => (
                        <Form.Check
                          inline
                          key={String(opt.value)}
                          name={cfg.name}
                          type="radio"
                          label={opt.label}
                          id={`radio-${cfg.name}-${String(opt.value)}`}
                          value={String(opt.value)}
                          checked={values[cfg.name] === opt.value}
                          onChange={() => handleChange(cfg.name, opt.value)}
                        />
                      ))}
                    </div>
                    {errors[cfg.name] && (
                      <Form.Text className="text-danger">
                        {errors[cfg.name]}
                      </Form.Text>
                    )}
                  </Form.Group>
                );

              case 'switch':
                return (
                  <Form.Group className="mb-3" key={idx}>
                    <Form.Label className="me-3">{cfg.label}</Form.Label>
                    <Form.Check
                      type="switch"
                      id={`switch-${cfg.name}`}
                      checked={values[cfg.name] as boolean}
                      onChange={(e) => handleChange(cfg.name, e.target.checked)}
                    />
                    {errors[cfg.name] && (
                      <Form.Text className="text-danger">
                        {errors[cfg.name]}
                      </Form.Text>
                    )}
                  </Form.Group>
                );

              case 'text':
                return (
                  <Form.Group className="mb-3" key={idx}>
                    <Form.Label>{cfg.label}</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder={cfg.placeholder}
                      value={values[cfg.name] as string}
                      onChange={(e) => handleChange(cfg.name, e.target.value)}
                    />
                  </Form.Group>
                );

              case 'number':
                return (
                  <Form.Group className="mb-3" key={idx}>
                    <Form.Label>{cfg.label}</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder={cfg.placeholder}
                      value={(values[cfg.name] as string) || ''}
                      onChange={(e) => handleChange(cfg.name, e.target.value)}
                    />
                    {errors[cfg.name] && (
                      <Form.Text className="text-danger">
                        {errors[cfg.name]}
                      </Form.Text>
                    )}
                  </Form.Group>
                )

              case 'dateRange':
                return (
                  <Form.Group className="mb-3" key={idx}>
                    <Form.Label>{cfg.label}</Form.Label>
                    <div className="d-flex gap-2">

                      <Form.Control
                        type="date"
                        value={(values[cfg.nameFrom] as string) || getTodayDate()}
                        onChange={(e) => handleChange(cfg.nameFrom, e.target.value)}
                      />
                      <Form.Control
                        type="date"
                        value={(values[cfg.nameTo] as string) || getTodayDate()}
                        onChange={(e) => handleChange(cfg.nameTo, e.target.value)}
                      />
                    </div>
                    {errors[cfg.nameFrom] && (
                      <Form.Text className="text-danger">
                        {errors[cfg.nameFrom]}
                      </Form.Text>
                    )}
                  </Form.Group>
                );

              default:
                return null;
            }
          })}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="light" onClick={handleReset}>
          {resetText}
        </Button>
        <Button variant="primary" onClick={handleApply}>
          {applyText}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default FilterModal;
