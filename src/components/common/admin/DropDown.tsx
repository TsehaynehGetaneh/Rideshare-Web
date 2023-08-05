import React from "react";
import { reverse_map } from "@/components/admin/ride-request/Status";

type DropDownProps = {
  label: string;
  options: { option: string; value: number }[];
  setValue: React.Dispatch<React.SetStateAction<number>>;
};

const DropDown = ({ label, options, setValue }: DropDownProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = Number(e.target.value);
    setValue(selectedValue);
  };

  return (
    <div className="flex items-center gap-2">
      <label
        htmlFor="countries"
        className="font-medium text-gray-900 dark:text-white"
      >
        {label}
      </label>
      <select
        className="px-3 py-2 border rounded-lg outline-none focus:ring-primary focus:border-primary"
        name="role"
        id="role"
        onChange={handleChange}
      >
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DropDown;
