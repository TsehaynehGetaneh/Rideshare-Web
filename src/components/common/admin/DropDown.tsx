import React from "react";

type DropDownProps = {
    label:string,
    options:{option:string, value:string}[],
    setValue:React.Dispatch<React.SetStateAction<string>>
}

const DropDown = ({ label, options, setValue }: DropDownProps) => {
  return (
    <div className="flex items-center gap-2">
        <label htmlFor="countries" className="font-medium text-gray-900 dark:text-white">{label}</label>
        <select className="rounded-lg py-2 px-3 border outline-none focus:ring-primary focus:border-primary" name="role" id="role" onChange={(e) => setValue(e.target.value)}>
        {
            options.map((option, index) => 
            <option key={index} value={option.value}>{option.option}</option>
            )
        }
        </select>
    </div>
  );
};

export default DropDown;
