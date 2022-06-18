import React from "react";
import { BsFillMicFill } from "react-icons/bs";
import { FaVideo } from "react-icons/fa";
import { MdOutlineScreenShare } from "react-icons/md";
import { MdOutlineCallEnd } from "react-icons/md";
import MeetingIcons from "./MeetingIcons";

const MeetingControls = () => {
  return (
    <div className="flex w-1/5 justify-between">
      <MeetingIcons classname="bg-red-500" icon={<BsFillMicFill />} />
      <MeetingIcons classname="bg-red-500" icon={<FaVideo />} />
      <MeetingIcons classname="bg-grayish" icon={<MdOutlineScreenShare />} />
      <MeetingIcons classname="bg-red-500" icon={<MdOutlineCallEnd />} />
    </div>
  );
};

export default MeetingControls;
