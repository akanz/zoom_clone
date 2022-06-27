import { useRouter } from "next/router";
import React, { useEffect } from "react";
import MeetingRoom from "../components/meeting/MeetingRoom";
import { useAppSelector } from "../hooks/redux";

const meetingRoom = () => {
  const data = useAppSelector((state) => state.user);
  const router = useRouter();

  // useEffect(() => {
  //   if (!data.meetingLoading && data.RoomId == "") {
  //     const siteUrl = window.location.origin;
  //     window.location.href = siteUrl;
  //   }
  // }, [data]);

  return (
    <div>
      <MeetingRoom />
    </div>
  );
};

export default meetingRoom;
