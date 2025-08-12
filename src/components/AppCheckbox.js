import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
function AppCheckbox({ label, value, name, onChange }) {
  return (
    <FormControlLabel
      className="w-full "
      control={
        <Checkbox
          id="outlined-basic"
          variant="outlined"
          value={value}
          name={name}
          onChange={onChange}
          checked={!!value}
        />
      }
      label={label}
    />
  );
}

export default AppCheckbox;
