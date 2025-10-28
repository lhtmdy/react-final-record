import TextField from "@mui/material/TextField";
import clsx from "clsx";
function AppInput({
  label,
  value,
  name,
  onChange,
  multiline,
  maxRows,
  className,
  type = "text",
  control,
  rules,
  register,
  errors,
  id,
}) {
  const inputClasses = clsx("w-full", className);
  return (
    <>
      <TextField
        id={id}
        label={label}
        variant="outlined"
        value={value}
        name={name}
        className={inputClasses}
        onChange={onChange}
        maxRows={maxRows}
        multiline={multiline}
        type={type}
        control={control}
        rules={rules}
        {...(register ? register(id, rules) : {})}
        error={errors && errors[id] ? true : false}
        helperText={errors && errors[id] ? errors[id]?.message : ""}
      />
    </>
  );
}

export default AppInput;
