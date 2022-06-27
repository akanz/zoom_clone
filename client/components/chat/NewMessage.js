import React, { useState } from "react";
import { IoIosSend } from 'react-icons/io'
import * as webRTCHandler from "../../utils/WebRTCHandler";

const NewMessage = () => {
  const [message, setMessage] = useState("");

  const handleTextChange = (event) => {
    setMessage(event.target.value);
  };

  const handleKeyPressed = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();

      // send message to other users
      sendMessage();
    }
  };

  const sendMessage = () => {
    if (message.length > 0) {
      webRTCHandler.sendMessageUsingDataChannel(message);
      setMessage("");
    }
  };

  return (
    <div className="new_message_container">
      <input
        className="new_message_input text-black"
        value={message}
        onChange={handleTextChange}
        placeholder="Type your message ..."
        type="text"
        onKeyDown={handleKeyPressed}
      />
      <IoIosSend className="text-blue-800 text-3xl w-8" onClick={sendMessage} />
    </div>
  );
};

export default NewMessage;
