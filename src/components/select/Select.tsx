import { useState } from "react";
import "./Select.scss";

type SelectProps = {
  height: string;
  placeholder: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  options: {
    value: string;
    label: string;
  }[];
};

const Select = ({
  height,
  placeholder,
  value,
  setValue,
  options,
}: SelectProps) => {
  const [open, setOpen] = useState(false);

  const handleSelect = (value: string) => {
    setValue(value);
    setOpen(false);
  };

  return (
    <div className="select-wrapper">
      <input
        style={{ height: height }}
        type="text"
        placeholder={placeholder}
        readOnly
        defaultValue={value}
        onClick={() => setOpen(!open)}
      />
      <div
        className="select-options"
        style={{ display: `${open ? "block" : "none"}` }}
      >
        {options.map((option, index) => (
          <div key={index} onClick={() => handleSelect(option.value)}>
            {option.value}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Select;
