import { useEffect, useState, useRef, useCallback } from "react";
import { io } from "socket.io-client";
import { BACKEND_URL, SOCKET_URL } from "../config";

export const useSocket = (username) => {
  const [messages, setMessages] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const [isReconnecting, setIsReconnecting] = useState(false);
  const socketRef = useRef(null);

  // 1. Fetch initial message history from REST fallback endpoint
  const fetchHistory = useCallback(async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/messages`);
      if (response.ok) {
        const data = await response.json();
        // Set message history directly
        setMessages(data);
      }
    } catch (error) {
      console.log("[useSocket] Error fetching message history:", error);
    }
  }, []);

  // 2. Send message emitter
  const sendMessage = useCallback((text) => {
    if (socketRef.current && isConnected) {
      const messageData = {
        sender: username,
        text: text,
        timestamp: new Date().toISOString(),
      };
      socketRef.current.emit("send_message", messageData);
    } else {
      console.warn("[useSocket] Cannot send message: Socket is not connected");
    }
  }, [username, isConnected]);

  // 3. Setup socket connection
  useEffect(() => {
    if (!username) return;

    // Fetch initial chat history
    fetchHistory();

    console.log(`[useSocket] Connecting to socket server: ${SOCKET_URL}`);
    
    // Connect to socket server
    const socket = io(SOCKET_URL, {
      transports: ["websocket"],
      reconnectionAttempts: 10,
      reconnectionDelay: 2000,
    });

    socketRef.current = socket;

    // Socket listeners
    socket.on("connect", () => {
      console.log("[useSocket] Connected!");
      setIsConnected(true);
      setIsReconnecting(false);
      // Immediately emit join room event with our username
      socket.emit("join", username);
    });

    socket.on("disconnect", (reason) => {
      console.log("[useSocket] Disconnected:", reason);
      setIsConnected(false);
      if (reason === "io server disconnect" || reason === "transport close") {
        setIsReconnecting(true);
      }
    });

    socket.on("connect_error", (error) => {
      console.log("[useSocket] Connection error:", error.message);
      setIsConnected(false);
      setIsReconnecting(true);
    });

    socket.on("receive_message", (newMessage) => {
      setMessages((prevMessages) => {
        // Prevent duplicate messages if already present (e.g. from history load or double events)
        if (prevMessages.some((msg) => msg.id === newMessage.id)) {
          return prevMessages;
        }
        return [...prevMessages, newMessage];
      });
    });

    // Cleanup on unmount
    return () => {
      if (socket) {
        console.log("[useSocket] Disconnecting and cleaning up socket");
        socket.disconnect();
      }
    };
  }, [username, fetchHistory]);

  return {
    messages,
    isConnected,
    isReconnecting,
    sendMessage,
    refetchHistory: fetchHistory,
  };
};
