import React from "react";

interface IconProps {
  icon: any;
  classname?: string;
  onClick?: () => void;
}

const MeetingIcons = ({ icon, classname, onClick }: IconProps) => {
  return (
    <div onClick={onClick} className={`text-xl ${classname} p-3 rounded-full`}>
      {icon}
    </div>
  );
};

export default MeetingIcons;
