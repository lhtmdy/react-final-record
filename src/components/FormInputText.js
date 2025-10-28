import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import TextField from "@mui/material/TextField";
const FormInputText = ({ name, control, label,onChange,value,rules,defaultValue }) => {
  return (
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({
          fieldState: { error },
          formState,
        }) => (
            <>
            {JSON.stringify(error)}
            <TextField
              helperText={error ? error.message : null}
              error={!!error}
              onChange={onChange}
              fullWidth
              label={label}
              name={name}
              variant="outlined"
              value={defaultValue}
            />
            </>
        )}
      />
  );
};

export default FormInputText;
