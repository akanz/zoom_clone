import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useState } from "react";
import { connectWithAudio, SetMeetingInfo } from "../features/slices/user";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import Button from "./Button";
import CheckBox from "./CheckBox";
import ErrorMsg from "./ErrorMsg";
import Input from "./Input";
import WelcomeLayout from "./WelcomeLayout";

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
    dispatch(connectWithAudio(!data.connectWithAudio));
  };

  const HandleJoinRoom = () => {
    dispatch(SetMeetingInfo({ name: Name, RoomId }));

    router.push("/meetingRoom");
  };

  useEffect(() => {
    data.isHost ? setBtnText("Host") : setBtnText("Join");
  }, []);

  console.log(data.connectWithAudio);

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
        <CheckBox onClick={HandleChkBox} checked={data.connectWithAudio} />

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
