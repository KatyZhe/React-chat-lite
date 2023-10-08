import React, { useState } from "react";
import axios from "axios";
import reducer from "../reducer";
import socket from "../socket";

export default function JoinBlock({ onLogin }) {
  const [roomId, setRoomId] = useState("");
  const [userName, setUserName] = useState("");
  const [isLoading, setIsLoading] =useState(false);

  const onEnter = async() => {
    if (!roomId || !userName) {
      return alert("Введите верные данные!");
    }
    setIsLoading(true);
    await axios
      .post("/rooms", {
        roomId,
        userName,
      })
      .then(onLogin());
      setIsLoading(false);
  };

  return (
    <div className="join-block">
      <input
        type="text"
        placeholder="Room ID"
        value={roomId}
        onChange={(e) => setRoomId(e.target.value)}
      />
      <input
        type="text"
        placeholder="Введите имя"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
      <button disabled={isLoading} className="btn btn-success" onClick={onEnter}>
        {isLoading ? 'Вход...' : 'Войти'}
      </button>
    </div>
  );
}