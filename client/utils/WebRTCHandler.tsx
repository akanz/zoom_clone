import { setMeetingRoom } from "../features/slices/user";
import store from "../store";
import * as wss from "./wss";

export const defaultConstraints = {
  audio: true,
  video: true,
};

let localStream;

export const getLocalPreviewandInitConnection = (
  isHost: boolean,
  name: string,
  RoomId: string
) => {
  navigator.mediaDevices
    .getUserMedia(defaultConstraints)
    .then((stream) => {
      console.log("successfully got Stream");
      store.dispatch(setMeetingRoom(false));
      localStream = stream;
      ShowLocalVideoPreview(localStream);

      isHost ? wss.createNewRoom(name) : wss.joinRoom(name, RoomId);
    })
    .catch((err) => {
      console.log("An error occurred when trying to fetch local stream");
      console.log(err);
    });
};

export const ShowLocalVideoPreview = (data: any) => {};
