import React, { useState, useEffect } from "react";
import "../styles/DashboardChat.css";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as faRegStar } from "@fortawesome/free-regular-svg-icons"; // outline star

export default function DashboardChat() {
  const [selectedChat, setSelectedChat] = useState("Charlotte Knight");
  const [filter, setFilter] = useState("all");
  const navigate = useNavigate();

  const [starredChats, setStarredChats] = useState(() => {
    const saved = localStorage.getItem("starredChats");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("starredChats", JSON.stringify(starredChats));
  }, [starredChats]);

  const toggleStar = (chatId) => {
    setStarredChats((prev) =>
      prev.includes(chatId)
        ? prev.filter((id) => id !== chatId)
        : [...prev, chatId]
    );
  };

  const chats = [
    {
      id: 1,
      name: "Charlotte Knight",
      lastMessage: "Lorem ipsum dolor sit amet...",
      time: "5h",
      avatar: "https://i.pravatar.cc/150?img=1",
      unread: true,
    },
    {
      id: 2,
      name: "Corey Taylor",
      lastMessage: "Lorem ipsum dolor sit amet...",
      time: "28 Jan",
      avatar: "https://i.pravatar.cc/150?img=2",
      unread: false,
    },
    {
      id: 3,
      name: "Isabelle Chapman",
      lastMessage: "Lorem ipsum dolor sit amet...",
      time: "16 Jan",
      avatar: "https://i.pravatar.cc/150?img=3",
      unread: false,
    },
  ];

  const messages = [
    {
      from: "client",
      text: "Hello, I need help with my project.",
      time: "07:30",
    },
    { from: "me", text: "Sure! What do you need exactly?", time: "07:35" },
    {
      from: "client",
      text: "I need a quote for electrical work.",
      time: "10:46",
    },
    { from: "me", text: "Got it. Let me prepare an estimate.", time: "10:50" },
  ];

  const currentChat = chats.find((chat) => chat.name === selectedChat);

  return (
    <div className="chat-page">
      {/* Left Sidebar */}
      <aside className="chat-sidebar">
        {/* Back button */}
        <button
          className="chat-back-btn"
          onClick={() => navigate("/dashboard/dashboard-home")}
        >
          <FontAwesomeIcon icon={faChevronLeft} className="back-icon" />
          Back to Dashboard
        </button>

        <h2>Messages</h2>

        {/* Filter buttons */}
        <div className="chat-filters">
          <button
            className={`filter-btn ${filter === "all" ? "active" : ""}`}
            onClick={() => setFilter("all")}
          >
            All
          </button>
          <button
            className={`filter-btn ${filter === "unread" ? "active" : ""}`}
            onClick={() => setFilter("unread")}
          >
            Unread
          </button>
          <button
            className={`filter-btn ${filter === "archive" ? "active" : ""}`}
            onClick={() => setFilter("archive")}
          >
            Archive
          </button>
        </div>

        <div className="chat-list">
          {chats
            .filter((chat) => {
              if (filter === "unread") return chat.unread;
              if (filter === "archive") return chat.archived;
              return true;
            })
            .map((chat) => (
              <div
                key={chat.id}
                className={`chat-item ${
                  selectedChat === chat.name ? "active" : ""
                }`}
                onClick={() => setSelectedChat(chat.name)}
              >
                <img src={chat.avatar} alt={chat.name} className="avatar" />
                <div className="chat-info">
                  <div className="chat-title">
                    <h4>{chat.name}</h4>
                    <span
                      className={`chatlist-star ${
                        starredChats.includes(chat.id) ? "visible" : ""
                      }`}
                      onClick={(e) => {
                        e.stopPropagation(); // prevent selecting chat when clicking star
                        toggleStar(chat.id);
                      }}
                    >
                      <FontAwesomeIcon
                        icon={
                          starredChats.includes(chat.id) ? faStar : faRegStar
                        }
                      />
                    </span>
                  </div>
                  <p>{chat.lastMessage}</p>
                </div>

                <span className="chat-time">{chat.time}</span>
              </div>
            ))}
        </div>
      </aside>

      {/* Middle Chat Window */}
      <main className="chat-window">
        <div className="chat-header">
          {currentChat && (
            <>
              <img
                src={currentChat.avatar}
                alt={currentChat.name}
                className="chat-header-avatar"
              />
              <h3>{currentChat.name}</h3>

              {starredChats.includes(currentChat.id) && (
                <span
                  className="chat-header-star"
                  onClick={() => toggleStar(currentChat.id)}
                >
                  <FontAwesomeIcon icon={faStar} />
                </span>
              )}
            </>
          )}
        </div>

        <div className="chat-messages">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`chat-bubble ${
                msg.from === "me" ? "sent" : "received"
              }`}
            >
              {msg.text}
              <span className="msg-time">{msg.time}</span>
            </div>
          ))}
        </div>

        <div className="chat-input">
          <input type="text" placeholder="Type a message..." />
          <button>Send</button>
        </div>
      </main>

      {/* Right Sidebar - Client Details */}
      <aside className="chat-details">
        <h3>Client Details</h3>
        <p>
          <strong>{selectedChat}</strong>
        </p>
        <p>01234 567890</p>
        <p>example@email.com</p>
        <div className="client-details-btns">
          <button>Show more about client</button>
          <button>Contact Admin</button>
        </div>
      </aside>
    </div>
  );
}
