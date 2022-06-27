import { DefaultEventsMap } from "@socket.io/component-emitter";
import io, { Socket } from "socket.io-client";
import { SetMeetingInfo, setParticipants } from "../features/slices/user";
import store from "../store";
import * as WebRTCHandler from "./WebRTCHandler";

const SERVER = "http://localhost:8000";

export let socket: Socket<DefaultEventsMap, DefaultEventsMap> | null = null;

export const connectWithIOserver = () => {
  socket = io(SERVER);

  socket.on("connect", () => {
    console.log(`connected to server ${socket?.id} successfully`);
  });
  socket.on("room-id", (data) => {
    console.log(`${data.roomId} room created`);

    store.dispatch(SetMeetingInfo(data.roomId));
  });

  socket.on("room-update", (data) => {
    store.dispatch(setParticipants(data.connectedUsers));
  });

  socket.on("conn-prepare", ({ connUserSocketId }) => {
    WebRTCHandler.prepareNewPeerConnection(connUserSocketId, false);

    // Inform the user that recently joined that we are prepared for incoming connection
    socket?.emit("conn-init", {
      connUserSocketId,
    });
  });
  socket.on("conn-signal", (data) => {
    WebRTCHandler.handlingSignalingData(data);
  });
  socket.on("conn-init", (data) => {
    const { connUserSocketId } = data;
    WebRTCHandler.prepareNewPeerConnection(connUserSocketId, true);
  });

  socket.on("user-disconnected", (data) => {
    WebRTCHandler.removePeerConnection(data);
  });
};

export const createNewRoom = (name: string, onlyAudio: boolean) => {
  const data = {
    name,
    onlyAudio,
  };
  console.log(data);
  socket?.emit("create-room", data);
};

export const joinRoom = (name: string, RoomId: any, onlyAudio: boolean) => {
  const data = {
    name,
    roomId: RoomId,
    onlyAudio,
  };
  socket?.emit("join-room", data);
};

export const signalPeerData = (data: any) => {
  socket?.emit("conn-signal", data);
};
