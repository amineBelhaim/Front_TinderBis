// frontend/src/components/Messages/Messages.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchMessages,
  sendMessage,
  receiveMessage,
} from "../../redux/slices/messageSlice";
import { getMatches } from "../../redux/slices/userSlice";
import { io } from "socket.io-client";
import "./Messages.css"; // Pour le style

let socket;

const Messages = () => {
  const dispatch = useDispatch();
  const { userId } = useSelector((state) => state.auth);
  const { messages, loading, error } = useSelector((state) => state.messages);
  const { matches } = useSelector((state) => state.user);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messageInput, setMessageInput] = useState("");

  useEffect(() => {
    // Récupérer les matchs lorsque le composant monte
    dispatch(getMatches());

    // Initialiser le socket
    socket = io("http://127.0.0.1:5000");

    // Signaler au backend que l'utilisateur est connecté
    socket.emit("userConnected", userId);

    // Écouter les messages entrants
    socket.on("receiveMessage", (message) => {
      dispatch(receiveMessage(message));
    });

    return () => {
      socket.disconnect();
    };
  }, [dispatch, userId]);

  const handleSelectUser = (user) => {
    setSelectedUser(user);
    dispatch(fetchMessages(user._id));
  };

  const handleSendMessage = () => {
    if (messageInput.trim() === "" || !selectedUser) return;

    const messageData = {
      sender: userId,
      receiver: selectedUser._id,
      message: messageInput,
    };

    // Envoyer le message via le socket
    socket.emit("sendMessage", messageData);

    // Envoyer le message via Redux pour mise à jour immédiate
    dispatch(
      sendMessage({ receiver: selectedUser._id, message: messageInput })
    );

    setMessageInput("");
  };

  const messagesWithSelected = selectedUser
    ? messages[selectedUser._id] || []
    : [];

  return (
    <div className="messages-container">
      <div className="matches-list">
        <h3>Matchs</h3>
        {matches.length === 0 ? (
          <p>Aucun match pour le moment.</p>
        ) : (
          matches.map((match) => (
            <div
              key={match._id}
              className={`match-item ${
                selectedUser && selectedUser._id === match._id ? "active" : ""
              }`}
              onClick={() => handleSelectUser(match)}
            >
              <h4>{match.name}</h4>
              <p>{match.bio}</p>
            </div>
          ))
        )}
      </div>
      <div className="chat-window">
        {selectedUser ? (
          <>
            <h3>Conversation avec {selectedUser.name}</h3>
            <div className="messages-display">
              {messagesWithSelected.map((msg) => (
                <div
                  key={msg._id}
                  className={`message ${
                    msg.sender === userId ? "sent" : "received"
                  }`}
                >
                  <p>{msg.message}</p>
                </div>
              ))}
            </div>
            <div className="message-input">
              <input
                type="text"
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                placeholder="Écrire un message..."
              />
              <button onClick={handleSendMessage}>Envoyer</button>
            </div>
          </>
        ) : (
          <p>Sélectionnez un match pour commencer la conversation.</p>
        )}
      </div>
    </div>
  );
};

export default Messages;
