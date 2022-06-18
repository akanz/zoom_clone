import React, { useEffect } from "react";
import ChatSection from "./ChatSection";
import ControlSection from "./ControlSection";
import VideoSection from "./VideoSection";
import * as WebRTCHandler from "../utils/WebRTCHandler";
import { useAppSelector } from "../hooks/redux";
import Overlay from "./Overlay";

const MeetingRoom = () => {
  const { isHost, RoomId, name, meetingLoading } = useAppSelector(
    (state) => state.user
  );
  useEffect(() => {
    WebRTCHandler.getLocalPreviewandInitConnection(isHost, RoomId, name);
  }, []);

  return (
    <div className="w-screen h-screen relative py-4 px-8 bg-brownish text-white">
      <div className="flex h-9/10">
        <VideoSection />

        <ChatSection />
      </div>

      <ControlSection />
      {meetingLoading && <Overlay />}
    </div>
  );
};

export default MeetingRoom;
