import { useState } from "react";
import AppCheckboxGroup from "@/components/AppCheckboxGroup";
import AppTitle from "@/components/AppTitle";
import AppCodePanel from "@/components/AppCodePanel";
import AppMultiSelect from "@/components/AppMultiSelect";

function CheckboxGroupExample() {
  const [selectedValues, setSelectedValues] = useState(["apple", "banana"]);

  const fruitOptions = [
    { value: "apple", label: "🍎 蘋果" },
    { value: "banana", label: "🍌 香蕉" },
    { value: "orange", label: "🍊 橘子" },
    { value: "grape", label: "🍇 葡萄" },
  ];

  const handleChange = (values) => {
    setSelectedValues(values);
    console.log("選中的值:", values);
  };

  return (
    <div className="p-4">
      <div className="mb-6">
        <div className="flex items-center gap-x-3 mb-5">
          <AppCheckboxGroup
            label="選擇水果"
            value={selectedValues}
            onChange={handleChange}
            options={fruitOptions}
            className="mb-4"
          />
          <AppMultiSelect
            label="選擇水果"
            value={selectedValues}
            onChange={handleChange}
            options={fruitOptions}
            width={400}
          />
        </div>
        <div className="grid grid-cols-2 gap-x-4">
          <p>
            <AppTitle>使用陣列:</AppTitle>{" "}
            <AppCodePanel>{JSON.stringify(selectedValues)}</AppCodePanel>
          </p>
          <p>
            <AppTitle>使用逗號分隔字串:</AppTitle>
            <AppCodePanel>{JSON.stringify(selectedValues.join(","))}</AppCodePanel>
          </p>
        </div>
      </div>
    </div>
  );
}

export default CheckboxGroupExample;
