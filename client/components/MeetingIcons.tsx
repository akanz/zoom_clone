import React from "react";

interface IconProps {
  icon: any;
  classname?: string;
}

const MeetingIcons = ({ icon, classname }: IconProps) => {
  return <div className={`text-xl ${classname} p-3 rounded-full`}>{icon}</div>;
};

export default MeetingIcons;
