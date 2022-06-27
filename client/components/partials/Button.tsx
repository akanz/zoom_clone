import React from "react";

interface ButtonProps {
  text: string;
  classname: string;
  onClick: () => void;
}

const Button = ({ text, classname, onClick }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`my-3 p-3 rounded font-semibold ${classname}`}
    >
      {text}
    </button>
  );
};

export default Button;
