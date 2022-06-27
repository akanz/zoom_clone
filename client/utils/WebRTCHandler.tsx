import { setMeetingRoom, SetMessages } from "../features/slices/user";
import { fetchTURNcredentials, getTurnServer } from "./turn";
import store from "../store";
import Peer from "simple-peer";
import * as wss from "./wss";

export const defaultConstraints = {
  audio: true,
  video: true,
};

const onlyAudioConstraints = {
  audio: true,
  video: false,
};

let localStream: any;

export const getLocalPreviewandInitConnection = async (
  isHost: boolean,
  RoomId: any = null,
  name: string,
  connectWithAudio: boolean
) => {
  await fetchTURNcredentials();
  const constraints = connectWithAudio
    ? onlyAudioConstraints
    : defaultConstraints;

  navigator.mediaDevices
    .getUserMedia(constraints)
    .then((stream) => {
      console.log("successfully got Stream");
      store.dispatch(setMeetingRoom(false));
      localStream = stream;
      ShowLocalVideoPreview(localStream);

      isHost
        ? wss.createNewRoom(name, connectWithAudio)
        : wss.joinRoom(name, RoomId, connectWithAudio);
    })
    .catch((err) => {
      console.log("An error occurred when trying to fetch local stream");
      console.log(err);
    });
};

let peers: Record<string, any> = {};
let streams: any = [];

const getConfiguration = () => {
  const turnIceServers = getTurnServer();
  
  if (turnIceServers) {
    return {
      iceServers: [
        {
          urls: "stun:stun.l.google.com:19302",
        },
        ...turnIceServers,
      ],
    };
  } else {
    console.warn("Using only STUN server");
    return {
      iceServers: [
        {
          urls: "stun:stun.l.google.com:19302",
        },
      ],
    };
  }
};

export const prepareNewPeerConnection = (
  connUserSocketId: any,
  isInitiator: boolean
) => {
  const configuration = getConfiguration();

  peers[connUserSocketId] = new Peer({
    initiator: isInitiator,
    config: configuration,
    stream: localStream,
  });

  peers[connUserSocketId].on("signal", (data: any) => {
    // webRTC offer, webRTC Answer (SDP informations), ice candidates

    const signalData = {
      signal: data,
      connUserSocketId: connUserSocketId,
    };

    wss.signalPeerData(signalData);
  });

  peers[connUserSocketId].on("stream", (stream: any) => {
    console.log("new stream came");

    addStream(stream, connUserSocketId);
    streams = [...streams, stream];
  });

  peers[connUserSocketId].on("data", (data: any) => {
    const messageData = JSON.parse(data);
    appendNewMessage(messageData);
  });
};

export const removePeerConnection = (data: any) => {
  const { socketId } = data;
  console.log(socketId);
  const videoContainer = document.getElementById(socketId);
  const videoEl = document.getElementById(`${socketId}-video`);

  if (videoContainer && videoEl) {
    const tracks = videoEl.srcObject.getTracks();

    tracks.forEach((t: any) => t.stop());

    videoEl.srcObject = null;
    videoContainer.removeChild(videoEl);

    videoContainer?.parentNode?.removeChild(videoContainer);

    if (peers[socketId]) {
      peers[socketId].destroy();
    }
    delete peers[socketId];
  }
};

export const handlingSignalingData = (data: any) => {
  peers[data.connUserSocketId].signal(data.signal);
};

// UI
export const ShowLocalVideoPreview = (stream: any) => {
  const VidsContainer = document.getElementById("vid_portal");
  VidsContainer?.classList.add("vids_styles");
  const vidContainer = document.createElement("div");
  vidContainer.classList.add("video_track_container");
  const videoElement = document.createElement("video");
  videoElement.autoplay = true;
  videoElement.muted = true;
  videoElement.srcObject = stream;
  videoElement.onloadedmetadata = () => {
    videoElement.play();
  };
  vidContainer.appendChild(videoElement);

  if (store.getState().user?.connectWithAudio) {
    vidContainer.appendChild(getAudioOnlyLabel());
  }

  VidsContainer?.appendChild(vidContainer);
};

const addStream = (stream: any, connUserSocketId: any) => {
  const VidsContainer = document.getElementById("vid_portal");

  const vidContainer = document.createElement("div");
  vidContainer.id = connUserSocketId;
  vidContainer.classList.add("video_track_container");
  const videoElement = document.createElement("video");
  videoElement.autoplay = true;
  videoElement.srcObject = stream;
  videoElement.id = `${connUserSocketId}-video`;

  videoElement.onloadedmetadata = () => {
    videoElement.play();
  };

  videoElement.addEventListener("click", () => {
    if (videoElement.classList.contains("full_screen")) {
      videoElement.classList.remove("full_screen");
    } else {
      videoElement.classList.add("full_screen");
    }
  });

  vidContainer.appendChild(videoElement);

  // check if other user connected only with audio
  const { participants } = store.getState().user;

  const participant = participants.find((p) => p.socketId === connUserSocketId);

  if (participant?.onlyAudio) {
    vidContainer.appendChild(getAudioOnlyLabel(participant.name));
  } else {
    vidContainer.style.position = "static";
  }
  VidsContainer?.appendChild(vidContainer);
};

const getAudioOnlyLabel = (identity: string = "") => {
  const labelContainer = document.createElement("div");
  labelContainer.classList.add("label_only_audio_container");

  const label = document.createElement("p");
  label.classList.add("label_only_audio_text");
  label.innerHTML = `${identity.slice(0, 1).toUpperCase()}`;

  labelContainer.appendChild(label);
  return labelContainer;
};

/////////////////////// BUTTON ///////////////////////////////////
export const toggleMic = (isMuted: boolean) => {
  localStream.getAudioTracks()[0].enabled = isMuted ? true : false;
};

export const toggleCamera = (isDisabled: boolean) => {
  localStream.getVideoTracks()[0].enabled = isDisabled ? true : false;
};

// TOGGLE SCREENSHARE FUNCTIONALITY
export const toggleScreenShare = (
  isScreenSharingActive: boolean,
  screenSharingStream: MediaStream | null = null
) => {
  if (isScreenSharingActive) {
    switchVideoTracks(localStream);
  } else {
    switchVideoTracks(screenSharingStream);
  }
};

const switchVideoTracks = (stream: any) => {
  for (let socket_id in peers) {
    for (let index in peers[socket_id].streams[0].getTracks()) {
      for (let index2 in stream.getTracks()) {
        if (
          peers[socket_id].streams[0].getTracks()[index].kind ===
          stream.getTracks()[index2].kind
        ) {
          peers[socket_id].replaceTrack(
            peers[socket_id].streams[0].getTracks()[index],
            stream.getTracks()[index2],
            peers[socket_id].streams[0]
          );
          break;
        }
      }
    }
  }
};

////////////////////////////////// Messages /////////////////////////////////////
const appendNewMessage = (messageData: any) => {
  const { messages } = store.getState().user;
  store.dispatch(SetMessages(messageData));
};

export const sendMessageUsingDataChannel = (messageContent: any) => {
  // append this message locally
  const { name } = store.getState().user;

  const localMessageData = {
    content: messageContent,
    name,
    messageCreatedByMe: true,
  };

  appendNewMessage(localMessageData);

  const messageData = {
    content: messageContent,
    name,
  };

  const stringifiedMessageData = JSON.stringify(messageData);
  for (let socketId in peers) {
    peers[socketId].send(stringifiedMessageData);
  }
};
