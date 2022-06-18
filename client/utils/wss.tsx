import io from "socket.io-client";

const socket = io("http://localhost:8000");

export const connectWithIOserver = () => {
  socket.on("connect", () => {
    console.log(`connected to server ${socket.id} successfully`);
  });
};

export const createNewRoom = (name: string) => {
  const data = {
    name,
  };
  socket.emit("create-room", data);
};

export const joinRoom = (name: string, RoomId: string) => {
  const data = {
    name,
    RoomId,
  };
  socket.emit("join-room", data);
};
