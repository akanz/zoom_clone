import React from "react";
import { useAppSelector } from "../../hooks/redux";

const MeetingInfo = () => {
  const { RoomId } = useAppSelector((state) => state.user);
  return <div className="w-1/4">Meeting Id: {RoomId}</div>;
};

export default MeetingInfo;
