import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MDProps } from "../../components/JoinRoom";
import type { RootState } from "../../store";

interface UserState {
  isHost: boolean;
  RoomId: string;
  name: string;
  meetingLoading: boolean;
  connectWithAudio: boolean;
}

const initialState: UserState = {
  isHost: false,
  RoomId: "",
  name: "",
  meetingLoading: true,
  connectWithAudio: false,
};

export const userSlice = createSlice({
  name: "user",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    checkHost: (state, action: PayloadAction<boolean>) => {
      state.isHost = action.payload;
    },
    connectWithAudio: (state, action: PayloadAction<boolean>) => {
      state.connectWithAudio = action.payload;
    },
    SetMeetingInfo: (state, action: PayloadAction<MDProps>) => {
      state.name = action.payload.name;
      state.RoomId = action.payload.RoomId;
    },
    setMeetingRoom: (state, action: PayloadAction<boolean>) => {
      state.meetingLoading = action.payload;
    },
  },
});

export const { checkHost, connectWithAudio, SetMeetingInfo, setMeetingRoom } =
  userSlice.actions;

export default userSlice.reducer;
