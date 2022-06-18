import React from "react";
import {AiOutlineLoading3Quarters} from 'react-icons/ai'

const Overlay = () => {
  return (
    <div className="w-screen absolute flex items-center justify-center inset-0 h-screen bg-black bg-opacity-50">
      <AiOutlineLoading3Quarters className="text-7xl animate-spin text-white" />
    </div>
  );
};

export default Overlay;
