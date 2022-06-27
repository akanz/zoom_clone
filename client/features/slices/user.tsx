import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MDProps } from "../../components/JoinRoom";
import type { RootState } from "../../store";

interface UserState {
  isHost: boolean;
  RoomId: string;
  name: string;
  meetingLoading: boolean;
  connectWithAudio: boolean;
  participants: Array<any>;
  messages: Array<any>;
  activeConversation: any;
  directChatHistory: Array<any>;
  socketId: any;
}

const initialState: UserState = {
  isHost: false,
  RoomId: "",
  name: "",
  meetingLoading: true,
  connectWithAudio: false,
  participants: [],
  messages: [],
  activeConversation: null,
  directChatHistory: [],
  socketId: null,
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
    SetMeetingInfo: (state, action: PayloadAction<string>) => {
      state.RoomId = action.payload;
    },
    SetParticipantName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setMeetingRoom: (state, action: PayloadAction<boolean>) => {
      state.meetingLoading = action.payload;
    },
    setParticipants: (state, action: PayloadAction<Array<any>>) => {
      state.participants = action.payload;
    },
    SetMessages: (state, action: PayloadAction<any>) => {
      state.messages = [...state.messages, action.payload];
    },
  },
});

export const {
  checkHost,
  connectWithAudio,
  SetMeetingInfo,
  setMeetingRoom,
  SetParticipantName,
  setParticipants,
  SetMessages,
} = userSlice.actions;

export default userSlice.reducer;
