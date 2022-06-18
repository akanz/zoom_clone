import React from "react";
import { useAppSelector } from "../hooks/redux";

const MeetingInfo = () => {
  const { RoomId } = useAppSelector((state) => state.user);
  return <div>Meeting Id: {RoomId}</div>;
};

export default MeetingInfo;
