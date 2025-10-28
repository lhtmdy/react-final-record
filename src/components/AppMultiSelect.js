import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(optionValue, selectedValues, theme) {
  return {
    fontWeight: selectedValues.includes(optionValue)
      ? theme.typography.fontWeightMedium
      : theme.typography.fontWeightRegular,
  };
}

export default function AppMultiSelect({
  label = "選擇選項",
  value = [],
  onChange,
  options = [],
  placeholder = "",
  className = "",
  width = 300,
  disabled = false,
  error = false,
  helperText = "",
  renderChip,
  renderOption,
  maxHeight = ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
  ...props
}) {
  const theme = useTheme();

  const handleChange = (event) => {
    const {
      target: { value: newValue },
    } = event;

    const result = typeof newValue === "string" ? newValue.split(",") : newValue;

    if (onChange) {
      onChange(result);
    }
  };

  // 處理選項格式 - 支援字串陣列或物件陣列
  const normalizedOptions = options.map((option) => {
    if (typeof option === "string") {
      return { value: option, label: option };
    }
    return option;
  });

  // 自定義 Chip 渲染
  const defaultRenderChip = (selected) => (
    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
      {selected.map((selectedValue) => {
        const option = normalizedOptions.find((opt) => opt.value === selectedValue);
        const displayLabel = option ? option.label : selectedValue;

        return <Chip key={selectedValue} label={displayLabel} size="small" />;
      })}
    </Box>
  );

  // 自定義選項渲染
  const defaultRenderOption = (option) => (
    <MenuItem
      key={option.value}
      value={option.value}
      style={getStyles(option.value, value, theme)}
      disabled={option.disabled}>
      {option.label}
    </MenuItem>
  );

  const customMenuProps = {
    ...MenuProps,
    PaperProps: {
      ...MenuProps.PaperProps,
      style: {
        ...MenuProps.PaperProps.style,
        maxHeight: maxHeight,
      },
    },
  };

  return (
    <FormControl
      sx={{ width: width }}
      className={className}
      error={error}
      disabled={disabled}
      {...props}>
      <InputLabel id={`multi-select-label-${label}`}>{label}</InputLabel>
      <Select
        labelId={`multi-select-label-${label}`}
        id={`multi-select-${label}`}
        multiple
        value={value}
        onChange={handleChange}
        input={<OutlinedInput label={label} />}
        placeholder={placeholder}
        renderValue={renderChip || defaultRenderChip}
        MenuProps={customMenuProps}>
        {normalizedOptions.map(renderOption || defaultRenderOption)}
      </Select>
      {helperText && (
        <div className={`text-sm mt-1 ${error ? "text-red-500" : "text-gray-500"}`}>
          {helperText}
        </div>
      )}
    </FormControl>
  );
}
