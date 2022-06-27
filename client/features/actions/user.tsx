import axios from "axios";

const API = "http://localhost:8000/api";

interface RoomProp {
  name: string;
  RoomId: string;
}

export const CheckRoom = async (roomId: string) => {
  const res = await (await axios.get(`${API}/room/${roomId}`)).data;
  return res;
};

export const getTurnCredentials= async()=> {
  const res = await (await axios.get(`${API}/get-turn-credentials`)).data
  return res;
}
