import TextField from "@mui/material/TextField";
function AppInput({ label, value, name,onChange,multiline, maxRows }) {
    return(
        <TextField
          id="outlined-basic"
          label={label}
          variant="outlined"
          value={value}
          name={name}
          className="w-full"
           onChange={onChange}
            maxRows={maxRows}
            multiline={multiline}
        />
    )
}

export default AppInput;
