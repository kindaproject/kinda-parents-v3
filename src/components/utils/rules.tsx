export const rules = ({
  key,
  value,
  allValues = {},
  errors = {},
  rules = [],
}: {
  key: string;
  value?: string;
  allValues?: any;
  errors?: any;
  rules?: string[];
}) => {
  let newErrors = { ...errors };
  const nullValue =
    value === undefined ||
    value === null ||
    (typeof value === 'string' && value.trim() === '');




  for (const rule of rules) {
    if (newErrors[key]) break;
    console.log(value, 'numero');

    if (rule.startsWith('required_if:')) {
      // extraigo los nombres tras "required_if:"
      const deps = rule.split(':')[1].split(',');
      // compruebo si al menos uno tiene valor
      const shouldRequire = deps.some(dep => {
        const v = allValues[dep];
        return v !== undefined && v !== null && !(typeof v === 'string' && v.trim() === '');
      });
      if (shouldRequire) {
        if (value === undefined || value === null || (typeof value === 'string' && !value.trim())) {
          newErrors[key] = 'Este campo es requerido';
        }
      }
      continue;
    }
    if (rule.startsWith('required_if_boolean:')) {
      // Extraemos la expresión booleana tras el prefijo
      const expr = rule.slice('required_if_boolean:'.length).trim();
      let shouldRequire = false;

      try {
        // Creamos una función que evalúa la expresión en el contexto de allValues
        // Usamos `with` para acceder directo a las propiedades de allValues
        const fn = new Function(
          'values',
          `with (values) { return (${expr}); }`
        );
        shouldRequire = Boolean(fn(allValues));
      } catch (e) {
        console.error('Error al evaluar required_if_boolean:', expr, e);
      }

      // Si la expresión dio true, validamos que el campo tenga valor
      if (shouldRequire) {
        const isEmpty =
          value === undefined ||
          value === null ||
          (typeof value === 'string' && !value.trim());

        if (isEmpty) {
          newErrors[key] = 'Este campo es requerido';
        }
      }

      continue;
    }
    if (rule.startsWith("before_or_equal:")) {
      const otherKey = rule.split(":")[1];
      const otherValue = allValues[otherKey];

      if (value && otherValue) {
        const currentDate = new Date(value);
        const otherDate = new Date(otherValue);

        if (isNaN(currentDate.getTime()) || isNaN(otherDate.getTime())) {
          newErrors[key] = "Formato de fecha inválido";
        } else if (currentDate > otherDate) {
          newErrors[key] = `La fecha debe ser igual o anterior a ${otherKey}`;
        }
      }
      continue;
    }

    if (rule.startsWith("after_or_equal:")) {
      const otherKey = rule.split(":")[1];
      const otherValue = allValues[otherKey];

      if (value && otherValue) {
        const currentDate = new Date(value);
        const otherDate = new Date(otherValue);

        if (isNaN(currentDate.getTime()) || isNaN(otherDate.getTime())) {
          newErrors[key] = "Formato de fecha inválido";
        } else if (currentDate < otherDate) {
          newErrors[key] = `La fecha debe ser igual o posterior a ${otherKey}`;
        }
      }
      continue;
    }

    if (rule.startsWith("equal:")) {
      const otherKey = rule.split(":")[1];
      const otherValue = allValues[otherKey];

      if (value !== otherValue) {
        newErrors[key] = `Este campo debe ser igual a ${otherKey}`;
      }
      continue;
    }
    if (rule.startsWith("date_after_or_equal:")) {
      const otherKey = rule.split(":")[1];
      const otherValue = allValues[otherKey];

      if (value && otherValue) {
        const currentDate = new Date(value);
        const otherDate = new Date(otherValue);

        if (isNaN(currentDate.getTime()) || isNaN(otherDate.getTime())) {
          newErrors[key] = "Formato de fecha inválido";
        } else if (currentDate < otherDate) {
          newErrors[key] = `La fecha debe ser igual o posterior a ${otherKey}`;
        }
      }
      continue;
    }
    if (rule.startsWith("date_before:")) {
      const otherKey = rule.split(":")[1];
      const otherValue = allValues[otherKey];

      if (value && otherValue) {
        const currentDate = new Date(value);
        const otherDate = new Date(otherValue);

        if (isNaN(currentDate.getTime()) || isNaN(otherDate.getTime())) {
          newErrors[key] = "Formato de fecha inválido";
        } else if (currentDate >= otherDate) {
          newErrors[key] = `La fecha debe ser anterior a la fecha de finalización`;
        }
      }
      continue;
    }
    if (rule.startsWith("date_after:")) {
      const otherKey = rule.split(":")[1];
      const otherValue = allValues[otherKey];

      if (value && otherValue) {
        const currentDate = new Date(value);
        const otherDate = new Date(otherValue);

        if (isNaN(currentDate.getTime()) || isNaN(otherDate.getTime())) {
          newErrors[key] = "Formato de fecha inválido";
        } else if (currentDate <= otherDate) {
          newErrors[key] = `La fecha debe ser posterior a la fecha de inicio`;
        }
      }
      continue;
    }


    if (rule.startsWith("same_year_as_all:")) {
      const otherKeys = rule.split(":")[1].split(",");
      const yearAsNumber = parseInt(value || '');

      if (isNaN(yearAsNumber)) {
        newErrors[key] = "Año inválido";
        continue;
      }

      const mismatched = otherKeys.find((keyRef) => {
        const otherVal = allValues[keyRef];
        const dateYear = new Date(otherVal).getFullYear();
        return isNaN(dateYear) || dateYear !== yearAsNumber;
      });

      if (mismatched) {
        newErrors[key] = `El año debe coincidir con el de las fechas de inicio y finalización`;

      }

      continue;
    }

    if (rule.startsWith("min:")) {
      const minLength = parseInt(rule.split(":")[1]);
      if (typeof value === "string" && value.trim().length < minLength) {
        newErrors[key] = `Debe tener al menos ${minLength} caracteres`;
      }
      continue;
    }

    if (rule.startsWith("max:")) {
      const maxLength = parseInt(rule.split(":")[1]);
      if (typeof value === "string" && value.trim().length > maxLength) {
        newErrors[key] = `Debe tener como máximo ${maxLength} caracteres`;
      }
      continue;
    }
    if (rule.startsWith("between:")) {
      const [minStr, maxStr] = rule.split(":")[1].split(",");
      const min = parseFloat(minStr);
      const max = parseFloat(maxStr);
      if (!nullValue) {
        const num = parseFloat(value as string);
        if (isNaN(num) || num < min || num > max) {
          newErrors[key] = `El valor debe estar entre ${min} y ${max}`;
        }
      }
      continue;
    }
    if (rule.startsWith("less_equal:")) {
      const ruleValue = rule.split(":")[1];
      const [refKeyOrValue, label] = ruleValue.split("|");

      let maxValue: number | null = null;
      const refValue = allValues[refKeyOrValue];

      // Determinar si se trata de una referencia a otro campo
      if (refValue !== undefined) {
        maxValue = parseFloat(refValue);
      } else {
        maxValue = parseFloat(refKeyOrValue);
      }

      if (!nullValue) {
        const num = parseFloat(value as string);
        if (isNaN(num) || isNaN(maxValue) || num > maxValue) {
          newErrors[key] = `El valor debe ser menor o igual a ${label || maxValue}`;
        }
      }
      continue;
    }


    if (rule.startsWith("greater_equal:")) {
      const ruleValue = rule.split(":")[1];
      const [refKeyOrValue, label] = ruleValue.split("|");

      let minValue: number | null = null;
      const refValue = allValues[refKeyOrValue];

      // Determinar si se trata de una referencia a otro campo
      if (refValue !== undefined) {
        minValue = parseFloat(refValue);
      } else {
        minValue = parseFloat(refKeyOrValue);
      }

      if (!nullValue) {
        const num = parseFloat(value as string);
        if (isNaN(num) || isNaN(minValue) || num < minValue) {
          newErrors[key] = `El valor debe ser mayor o igual a ${label || minValue}`;
        }
      }
      continue;
    }


    switch (rule) {
      case "required":
        if (value === undefined || value === null || value === '' || (typeof value === 'string' && value.trim() === "")) {
          newErrors[key] = "Este campo es requerido";
        }
        break;

      case "email":
        if (!nullValue && !(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value || ""))) {
          newErrors[key] = "Este campo debe ser un email válido";
        }
        break;
      case "emailKindaPro":
        if (!value?.endsWith('@kindagolden.pro')) {
          newErrors[key] = "El email debe ser del dominio @kindagolden.pro";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          newErrors[key] = "Este campo debe ser un email válido";
        }
        break;
      case "password":
        if (
          !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z\d])[a-zA-Z\d\S]{6,24}$/.test(
            value || ""
          )
        ) {
          newErrors[key] =
            "La contraseña debe tener entre 6 y 24 caracteres, incluyendo una mayúscula, una minúscula, un número y un símbolo";
        }
        break;

      case "phone":
        if (!nullValue && !/^[0-9]{9}$/.test(value || "")) {
          newErrors[key] = "El teléfono debe tener 9 dígitos";
        }
        break;

      case "number":
        if (!nullValue && !/^[0-9]+$/.test(value || "")) {
          newErrors[key] = "Este campo debe ser un número";
        }
        break;
      case "alpha":
        if (!nullValue && !/^[a-zA-Z]+$/.test(value || "")) {
          newErrors[key] = "Este campo debe ser solo letras";
        }
        break;
      case "alphaSpaces":
        if (!nullValue && !/^[A-Za-z\s]+$/.test(value || "")) {
          newErrors[key] = "Este campo debe contener solo letras y espacios";
        }
        break;
      case "alphaNumeric":
        if (!nullValue && !/^[a-zA-Z0-9]+$/.test(value || "")) {
          newErrors[key] = "Este campo debe contener solo letras y números";
        }
        break;
    }
  }

  return newErrors;
};
