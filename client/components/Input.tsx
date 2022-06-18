import React from "react";

export interface InputProps {
  onClick: (e: any) => void;
  placeholder: string;
  name: string;
}
const Input = ({ onClick, placeholder, name }: InputProps) => {
  return (
    <div>
      <input
        className="p-2 my-2 border w-full border-gray-200 rounded"
        onChange={onClick}
        placeholder={placeholder}
        value={name}
      />
    </div>
  );
};

export default Input;
