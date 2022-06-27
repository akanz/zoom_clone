import React, { useState } from "react";
import { BsFillMicFill, BsFillMicMuteFill } from "react-icons/bs";
import { FaVideo, FaVideoSlash } from "react-icons/fa";
import { MdOutlineScreenShare } from "react-icons/md";
import { MdOutlineCallEnd } from "react-icons/md";
import MeetingIcons from "./MeetingIcons";
import * as WebRTC from "../../utils/WebRTCHandler";
import ScreenShare from "../video/ScreenShare";
import { useAppSelector } from "../../hooks/redux";

const constraints = {
  audio: false,
  video: true,
};

const MeetingControls = () => {
  const [isMuted, setisMuted] = useState<boolean>(false);
  const [isVidMuted, setisVidMuted] = useState<boolean>(false);
  const [isScreenShareActive, setisScreenShareActive] =
    useState<boolean>(false);

  const [screenShareStream, setscreenShareStream] =
    useState<MediaStream | null>(null);

  const { connectWithAudio } = useAppSelector((state) => state.user);

  const handleMicBtn = () => {
    WebRTC.toggleMic(isMuted);
    setisMuted(!isMuted);
  };

  const handleToggleVideo = () => {
    WebRTC.toggleCamera(isVidMuted);
    setisVidMuted(!isVidMuted);
  };
  const handleRoomDisconnection = () => {
    const siteUrl = window.location.origin;
    window.location.href = siteUrl;
  };

  const handleScreenShareToggle = async () => {
    if (!isScreenShareActive) {
      let stream = null;
      try {
        stream = await navigator.mediaDevices.getDisplayMedia(constraints);
      } catch (error) {
        console.log(`An error ${error} occurred`);
      }
      if (stream) {
        setscreenShareStream(stream);
        WebRTC.toggleScreenShare(isScreenShareActive, stream);
        setisScreenShareActive(true);
      }
    } else {
      WebRTC.toggleScreenShare(isScreenShareActive);
      setisScreenShareActive(false);
      screenShareStream?.getTracks().forEach((t: any) => t.stop());
      setscreenShareStream(null);
    }
  };

  return (
    <div className="flex justify-center w-1/2">
      <div className="flex w-1/2 justify-around">
        <MeetingIcons
          classname="bg-red-500"
          onClick={handleMicBtn}
          icon={!isMuted ? <BsFillMicFill /> : <BsFillMicMuteFill />}
        />
        {!connectWithAudio && (
          <MeetingIcons
            classname="bg-red-500"
            onClick={handleToggleVideo}
            icon={!isVidMuted ? <FaVideo /> : <FaVideoSlash />}
          />
        )}
        {!connectWithAudio && (
          <MeetingIcons
            onClick={handleScreenShareToggle}
            classname="bg-grayish"
            icon={<MdOutlineScreenShare />}
          />
        )}
        <MeetingIcons
          onClick={handleRoomDisconnection}
          classname="bg-red-500"
          icon={<MdOutlineCallEnd />}
        />
      </div>
      {isScreenShareActive && <ScreenShare stream={screenShareStream} />}
    </div>
  );
};

export default MeetingControls;
