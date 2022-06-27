import { useRouter } from "next/router";
import React from "react";
import { checkHost } from "../features/slices/user";
import { useAppDispatch } from "../hooks/redux";
import Button from "./partials/Button";
import WelcomeLayout from "./partials/WelcomeLayout";

const Welcome = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleJoinRoom = () => {
    dispatch(checkHost(false));
    router.push("/joinroom");
  };

  const handleCreateRoom = () => {
    dispatch(checkHost(true));
    router.push("/joinroom");
  };

  return (
    <WelcomeLayout>
      <div className="grid w-3/5 mx-auto">
        <Button
          onClick={handleJoinRoom}
          text="Join a meeting"
          classname="bg-blue-500 text-white"
        />

        <Button
          onClick={handleCreateRoom}
          text="Host a meeting"
          classname="text-gray-800 bg-white border border-gray-400"
        />
      </div>
    </WelcomeLayout>
  );
};

export default Welcome;
