import React from "react";

interface EMProps {
  errorMsg: string;
}

const ErrorMsg = ({ errorMsg }: EMProps) => {
  return <div className="text-red-600 my-2 text-xl">{errorMsg}</div>;
};

export default ErrorMsg;
