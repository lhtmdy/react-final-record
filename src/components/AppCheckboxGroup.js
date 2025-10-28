import { useState, useEffect } from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

function AppCheckboxGroup({ value = [], onChange, options = [], className = "", children, label }) {
  const [selectedValues, setSelectedValues] = useState(value || []);

  useEffect(() => {
    setSelectedValues(value || []);
  }, [value]);

  const handleChange = (optionValue, checked) => {
    let newValues;

    if (checked) {
      // 添加選中的值
      newValues = [...selectedValues, optionValue];
    } else {
      // 移除取消選中的值
      newValues = selectedValues.filter((v) => v !== optionValue);
    }

    setSelectedValues(newValues);

    // 通知父組件值的變化
    if (onChange) {
      onChange(newValues);
    }
  };

  return (
    <FormGroup className={`pt-[2px] ${className}`}>
      {label}
      <div className="flex gap-x-4 flex-wrap items-center">
        {/* 如果傳入了 options 陣列，自動渲染 checkbox */}
        {options.map((option) => {
          const optionValue = typeof option === "object" ? option.value : option;
          const optionLabel = typeof option === "object" ? option.label : option;
          const isChecked = selectedValues.includes(optionValue);

          return (
            <FormControlLabel
              key={optionValue}
              control={
                <Checkbox
                  checked={isChecked}
                  onChange={(e) => handleChange(optionValue, e.target.checked)}
                  value={optionValue}
                />
              }
              label={optionLabel}
              className="text-p"
            />
          );
        })}

        {/* 支援 children 方式傳入自定義 checkbox */}
        {children}
      </div>
    </FormGroup>
  );
}

export default AppCheckboxGroup;
