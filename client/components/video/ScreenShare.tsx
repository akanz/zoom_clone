import React, { useEffect, useRef } from "react";

interface streamProps {
  stream: any;
}
const ScreenShare = ({ stream }: streamProps) => {
  const localPrevRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = localPrevRef.current;
    if (video) {
      video.srcObject = stream;

      video.onloadedmetadata = () => {
        video?.play();
      };
    }
  }, [stream]);

  return (
    <div className="local_screen_share_preview">
      <video muted autoPlay ref={localPrevRef}></video>
    </div>
  );
};

export default ScreenShare;
