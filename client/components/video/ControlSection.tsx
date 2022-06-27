import React from "react";
import MeetingControls from "../meeting/MeetingControls";
import MeetingInfo from "../meeting/MeetingInfo";
import ParticipantsControls from "../ParticipantsControls";

const ControlSection = () => {
 

  return (
    <div className="w-full h-1/10 p-4 flex justify-between">
      <MeetingInfo />
      <MeetingControls />
      <ParticipantsControls />
    </div>
  );
};

export default ControlSection;
