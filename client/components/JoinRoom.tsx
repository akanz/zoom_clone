import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useState } from "react";
import { CheckRoom } from "../features/actions/user";
import {
  connectWithAudio,
  SetMeetingInfo,
  SetParticipantName,
} from "../features/slices/user";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { socket } from "../utils/wss";
import Button from "./partials/Button";
import CheckBox from "./partials/CheckBox";
import ErrorMsg from "./partials/ErrorMsg";
import Input from "./partials/Input";
import WelcomeLayout from "./partials/WelcomeLayout";

interface JRProps {
  isHost: boolean;
}

export interface MDProps {
  RoomId: string;
  name: string;
}

const JoinRoom = ({ isHost }: JRProps) => {
  const [RoomId, setRoomId] = useState<string>("");
  const [Name, setName] = useState<string>("");
  const [OnlyAudio, setOnlyAudio] = useState<boolean>(false);
  const [BtnText, setBtnText] = useState<string>("");
  const [errorMsg, seterrorMsg] = useState<string>("");
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.user);
  const router = useRouter();

  const HandleRoomChange = (e: any) => {
    setRoomId(e.target.value);
  };

  const HandleNameChange = (e: any) => {
    setName(e.target.value);
  };

  const HandleChkBox = () => {
    setOnlyAudio(!OnlyAudio);
  };

  const HandleJoinRoom = async () => {
    if (data.isHost) {
      createRoom();
    } else {
      await joinRoom();
    }
  };

  const joinRoom = async () => {
    const { roomExists, full } = await CheckRoom(RoomId);
    console.log(roomExists);
    if (roomExists) {
      if (full) {
        seterrorMsg("Meeting room is full");
      } else {
        dispatch(SetMeetingInfo(RoomId));
        dispatch(SetParticipantName(Name));
        await router.push("/meetingRoom");
      }
    } else {
      seterrorMsg("Meeting not found. Please try again");
    }
  };

  const createRoom = async () => {
    dispatch(SetParticipantName(Name));
    await router.push("/meetingRoom");
  };

  useEffect(() => {
    data.isHost ? setBtnText("Host") : setBtnText("Join");
  }, []);

  useEffect(() => {
    dispatch(connectWithAudio(OnlyAudio));
  }, [OnlyAudio]);

  console.log(OnlyAudio);

  return (
    <WelcomeLayout>
      <h1 className="text-2xl font-semibold my-2 text-center">
        {isHost ? "Host a Meeting" : "Join a Meeting"}
      </h1>
      <div>
        {!isHost && (
          <Input
            name={RoomId}
            onClick={HandleRoomChange}
            placeholder="Enter Room Id"
          />
        )}
        <Input
          name={Name}
          onClick={HandleNameChange}
          placeholder="Enter Name"
        />
        <CheckBox
          onClick={HandleChkBox}
          text="Connect with audio only"
          checked={data.connectWithAudio}
        />

        <ErrorMsg errorMsg={errorMsg} />
        <div className="w-full flex justify-around">
          <Button
            text={BtnText}
            classname="bg-blue-500 w-1/5 text-white"
            onClick={HandleJoinRoom}
          />

          <Button
            text={"Cancel"}
            classname="text-gray-700 w-1/5 border border-gray-300"
            onClick={() => {
              router.push("/");
            }}
          />
        </div>
      </div>
    </WelcomeLayout>
  );
};

export default JoinRoom;
