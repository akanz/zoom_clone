import { useRouter } from "next/router";
import React from "react";
import { useEffect } from "react";
import JoinRoom from "../components/JoinRoom";
import { checkHost } from "../features/slices/user";
import { useAppDispatch, useAppSelector } from "../hooks/redux";

const JoinroomPage = () => {
  const data = useAppSelector((state) => state.user);
 

  return (
    <div>
      <JoinRoom isHost={data.isHost} />
    </div>
  );
};

export default JoinroomPage;
