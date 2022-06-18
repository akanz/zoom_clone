import React from "react";
import { BsFillCheckSquareFill } from "react-icons/bs";

interface CBProps {
  checked: boolean;
  onClick: () => void;
}

const CheckBox = ({ checked, onClick }: CBProps) => {
  return (
    <div className="w-6 h-6 rounded border border-gray-300" onClick={onClick}>
      {checked && (
        <BsFillCheckSquareFill className="bg-white rounded text-blue-500 w-full h-full" />
      )}
    </div>
  );
};

export default CheckBox;
