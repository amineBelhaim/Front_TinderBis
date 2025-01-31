import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useSelector } from "react-redux";

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const { user } = useSelector((state) => state.auth);
  const socket = io("ws://localhost:5000");

  useEffect(() => {
    socket.on("connect", () => {
      socket.emit("userConnected", user._id);
    });

    socket.on("broadcastMessage", (message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      socket.disconnect();
    };
  }, [user]);

  const sendMessage = () => {
    if (newMessage.trim()) {
      socket.emit("sendMessage", {
        sender: user._id,
        receiver: "TARGET_USER_ID", // À remplacer dynamiquement
        message: newMessage,
      });
      setNewMessage("");
    }
  };

  return (
    <div className="chat-container">
      <div className="messages">
        {messages.map((msg, i) => (
          <div key={i} className="message">
            {msg.message}
          </div>
        ))}
      </div>
      <input
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Envoyer</button>
    </div>
  );
};

export default ChatPage;
