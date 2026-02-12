import React, { useState, useEffect, useContext } from "react";
import io from "socket.io-client";
import { AuthContext } from "../context/AuthProvider";

const ChatInterface = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [message, setMessage] = useState("");
  const [conversations, setConversations] = useState([]);
  const [filteredConversations, setFilteredConversations] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);
  const [socketConnected, setSocketConnected] = useState(false);
  const [currentUserId, setCurrentUserId] = useState(null);
  const API_BASE = import.meta.env.VITE_BACKEND_API;
  const WEBSOCKET_URL = import.meta.env.VITE_BACKEND_WEBSOCKET_URL;

  const { auth } = useContext(AuthContext);
  const authUser = auth?.user;
  const isAuthenticated = auth?.isAuthenticated;

  useEffect(() => {
    if (authUser && authUser.id) {
      setCurrentUserId(authUser.id);
    } else {
      try {
        const userData = localStorage.getItem("user");
        if (userData) {
          const user = JSON.parse(userData);
          setCurrentUserId(user.id);
        }
      } catch (error) {
        console.error("Error parsing user data from localStorage:", error);
      }
    }

    const newSocket = io(WEBSOCKET_URL, {
      ...(import.meta.env.VITE_ENVIRONMENT === "production" && {
        path: "/rpm-be/socket.io/",
        transports: ["websocket", "polling"],
      }),
      withCredentials: true,
    });

    newSocket.on("connect", () => {
      setSocketConnected(true);
    });

    newSocket.on("disconnect", () => {
      setSocketConnected(false);
    });

    newSocket.on("new_message", (messageData) => {
      setMessages((prev) => [...prev, messageData]);
    });

    setSocket(newSocket);
    loadConversations();

    return () => {
      newSocket.disconnect();
    };
  }, [auth, authUser]);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredConversations(conversations);
    } else {
      const filtered = conversations.filter(
        (conv) =>
          conv.other_user_name
            ?.toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          conv.other_user_username
            ?.toLowerCase()
            .includes(searchQuery.toLowerCase())
      );
      setFilteredConversations(filtered);
    }
  }, [conversations, searchQuery]);

  useEffect(() => {
    if (!socket || !socketConnected) return;

    const selectedPatientData = localStorage.getItem("selectedPatient");
    if (selectedPatientData) {
      const patient = JSON.parse(selectedPatientData);
      const patientConversation = {
        other_user_id: patient.id,
        other_user_name: patient.name,
        last_message: "",
        last_message_time: new Date(),
        unread_count: 0,
      };
      handleUserSelect(patientConversation);
      localStorage.removeItem("selectedPatient");
    }
  }, [socket, socketConnected]);

  const loadConversations = async () => {
    try {
      const response = await fetch(`${API_BASE}/api/messages/conversations`, {
        credentials: "include",
      });
      const data = await response.json();
      if (data.success) {
        setConversations(data.data);
      }
    } catch (error) {
      console.error("Failed to load conversations:", error);
    }
  };

  const loadConversation = async (userId) => {
    try {
      const response = await fetch(
        `${API_BASE}/api/messages/conversation/${userId}?limit=20`,
        { credentials: "include" }
      );
      const data = await response.json();
      if (data.success) {
        setMessages(data.data);
      }
    } catch (error) {
      console.error("Failed to load conversation:", error);
    }
  };

  const handleUserSelect = (user) => {
    setSelectedUser(user);
    loadConversation(user.other_user_id);
    if (socket && socketConnected) {
      socket.emit("join_room", user.other_user_id);
    }
  };

  const handleSendMessage = async () => {
    if (!message.trim() || !selectedUser) return;

    try {
      const response = await fetch(`${API_BASE}/api/messages/send`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          receiverId: selectedUser.other_user_id,
          message: message.trim(),
        }),
      });

      if (response.ok) {
        setMessage("");
        loadConversations();
      }
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const clearSearch = () => {
    setSearchQuery("");
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
        Patient Communication
      </h2>

      <div className="flex h-[90vh] bg-white dark:bg-innerDarkColor rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="w-1/3 border-r border-gray-200 dark:border-gray-700 flex flex-col">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-3">
              Patient Chats
            </h3>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  className="h-4 w-4 text-gray-400 dark:text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search patients..."
                className="w-full pl-10 pr-10 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent dark:focus:ring-blue-400 focus:border-transparent bg-gray-50 dark:bg-gray-700 dark:text-gray-100"
              />
              {searchQuery && (
                <button
                  onClick={clearSearch}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  <svg
                    className="h-4 w-4 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              )}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              Socket: {socketConnected ? "Connected" : "Disconnected"}
              {currentUserId && <span> • User ID: {currentUserId}</span>}
              {!currentUserId && <span> • User ID: Not found</span>}
              {searchQuery && (
                <span className="ml-2">
                  • Found {filteredConversations.length} result(s)
                </span>
              )}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {filteredConversations.length === 0 && searchQuery ? (
              <div className="px-4 py-8 text-center text-gray-500 dark:text-gray-400">
                <svg
                  className="mx-auto h-8 w-8 text-gray-400 dark:text-gray-500 mb-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <p className="text-sm">No patients found for "{searchQuery}"</p>
              </div>
            ) : filteredConversations.length === 0 ? (
              <div className="px-4 py-8 text-center text-gray-500 dark:text-gray-400">
                <p className="text-sm">No conversations yet</p>
              </div>
            ) : (
              filteredConversations.map((conv) => (
                <div
                  key={conv.other_user_id}
                  onClick={() => handleUserSelect(conv)}
                  className={`flex items-center px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer border-b border-gray-100 dark:border-gray-600 ${
                    selectedUser?.other_user_id === conv.other_user_id
                      ? "bg-gray-50 dark:bg-gray-700"
                      : ""
                  }`}
                >
                  <div className="w-8 h-8 bg-primary dark:bg-blue-600 rounded-full flex items-center justify-center text-white dark:text-gray-100 text-sm">
                    {conv.other_user_name?.charAt(0)}
                  </div>
                  <div className="ml-3 flex-1 min-w-0">
                    <div className="flex justify-between items-center">
                      <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                        {conv.other_user_name}
                      </h4>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {new Date(conv.last_message_time).toLocaleTimeString()}
                      </span>
                    </div>
                    {conv.other_user_username && (
                      <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                        @{conv.other_user_username}
                      </p>
                    )}
                    <p className="text-sm text-gray-600 dark:text-gray-400 truncate mt-1">
                      {conv.last_message}
                    </p>
                  </div>
                  {conv.unread_count > 0 && (
                    <div className="ml-2 w-5 h-5 bg-primary dark:bg-blue-600 rounded-full flex items-center justify-center">
                      <span className="text-xs text-white dark:text-gray-100 font-medium">
                        {conv.unread_count}
                      </span>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

        <div className="flex-1 flex flex-col">
          {selectedUser ? (
            <>
              <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                  {selectedUser.other_user_name}
                </h3>
                {selectedUser.other_user_username && (
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    @{selectedUser.other_user_username}
                  </p>
                )}
              </div>

              <div className="p-6 flex-1 overflow-y-auto">
                <div className="space-y-4">
                  {messages.length === 0 ? (
                    <div className="text-center text-gray-500 dark:text-gray-400 mt-8">
                      <p>No messages yet. Start the conversation!</p>
                    </div>
                  ) : (
                    messages.map((msg, index) => {
                      const isFromMe = currentUserId
                        ? msg.sender_id === currentUserId
                        : false;
                      return (
                        <div
                          key={index}
                          className={`flex ${
                            isFromMe ? "justify-end" : "justify-start"
                          }`}
                        >
                          <div
                            className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                              isFromMe
                                ? "bg-primary dark:bg-blue-600 text-white dark:text-gray-100"
                                : "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                            }`}
                          >
                            <div className="text-sm">{msg.message}</div>
                            <div
                              className={`text-xs mt-1 ${
                                isFromMe
                                  ? "text-white/80 dark:text-gray-100/80"
                                  : "text-gray-500 dark:text-gray-400"
                              }`}
                            >
                              {new Date(msg.created_at).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </div>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>

              <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type a message..."
                    className="flex-1 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent dark:focus:ring-blue-400 focus:border-transparent bg-gray-50 dark:bg-gray-700 dark:text-gray-100"
                  />
                  <button
                    onClick={handleSendMessage}
                    className="px-4 py-2 bg-primary dark:bg-blue-600 text-white dark:text-gray-100 rounded-lg hover:bg-accent dark:hover:bg-blue-500 transition-colors"
                  >
                    Send
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                  Select a conversation to start chatting
                </h3>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
