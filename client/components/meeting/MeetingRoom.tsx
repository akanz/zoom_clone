import React, { useEffect } from "react";
import ChatSection from "../chat/ChatSection";
import ControlSection from "../video/ControlSection";
import VideoSection from "../video/VideoSection";
import * as WebRTCHandler from "../../utils/WebRTCHandler";
import { useAppSelector } from "../../hooks/redux";
import Overlay from "../partials/Overlay";

const MeetingRoom = () => {
  const { isHost, RoomId, name, meetingLoading, connectWithAudio } =
    useAppSelector((state) => state.user);

  useEffect(() => {
    WebRTCHandler.getLocalPreviewandInitConnection(
      isHost,
      RoomId,
      name,
      connectWithAudio
    );
    console.log("This is the meeting room");
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
