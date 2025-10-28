import { useState } from "react";
import AppMultiSelect from "@/components/AppMultiSelect";

function MultiSelectExample() {
  const [selectedFruits, setSelectedFruits] = useState(["apple", "banana"]);

  const fruitOptions = [
    { value: "apple", label: "🍎 蘋果" },
    { value: "banana", label: "🍌 香蕉" },
    { value: "orange", label: "🍊 橘子" },
    { value: "grape", label: "🍇 葡萄" },
    { value: "strawberry", label: "🍓 草莓" },
  ];

  return (
    <div className="p-6 space-y-6">
      <AppMultiSelect
        label="選擇水果"
        value={selectedFruits}
        onChange={setSelectedFruits}
        options={fruitOptions}
        width={400}
      />
      選中的值: {JSON.stringify(selectedFruits)}
    </div>
  );
}

export default MultiSelectExample;
