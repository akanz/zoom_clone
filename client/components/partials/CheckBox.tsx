import React from "react";
import { BsFillCheckSquareFill } from "react-icons/bs";

interface CBProps {
  checked: boolean;
  text: string;
  onClick: () => void;
}

const CheckBox = ({ checked, onClick, text }: CBProps) => {
  return (
    <div className="flex items-center">
    <div className="w-6 h-6 rounded border border-gray-300" onClick={onClick}>
      {checked && (
        <BsFillCheckSquareFill className="bg-white rounded text-blue-500 w-full h-full" />
      )}
      
    </div>
    <span className="ml-1">{text}</span>
    </div>
  );
};

export default CheckBox;
