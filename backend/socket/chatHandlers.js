/**
 * Socket.io Chat Event Handlers
 * Handles real-time messaging, room joins, and system messages
 */

// Keep track of connected sockets and their associated usernames
const connectedUsers = new Map();

module.exports = (io, socket, messages) => {
  // 1. Listen for join event with the client's username
  socket.on("join", (username) => {
    if (!username) return;

    // Save username linked to the current socket ID
    connectedUsers.set(socket.id, username);

    // Join the shared "general" room
    socket.join("general");

    // Create a system message for the user joining
    const systemMsg = {
      id: `sys-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      sender: "System",
      text: `${username} joined the chat`,
      timestamp: new Date().toISOString(),
      isSystem: true
    };

    // Store system messages in our in-memory history
    messages.push(systemMsg);

    // Broadcast system message to all clients in the general room
    io.to("general").emit("receive_message", systemMsg);

    console.log(`[Socket] User joined: ${username} (Socket ID: ${socket.id})`);
  });

  // 2. Listen for send_message event
  socket.on("send_message", (messageData) => {
    const { sender, text } = messageData;
    if (!sender || !text) return;

    // Create formatted message object
    const newMessage = {
      id: `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      sender,
      text,
      timestamp: messageData.timestamp || new Date().toISOString(),
      isSystem: false
    };

    // Store in-memory history
    messages.push(newMessage);

    // Broadcast message to everyone in the general room
    io.to("general").emit("receive_message", newMessage);

    console.log(`[Socket] Message from ${sender}: "${text}"`);
  });

  // 3. Listen for socket disconnection
  socket.on("disconnect", () => {
    const username = connectedUsers.get(socket.id);
    
    if (username) {
      // Clean up user from session map
      connectedUsers.delete(socket.id);

      // Create a system message for the user leaving
      const systemMsg = {
        id: `sys-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        sender: "System",
        text: `${username} left the chat`,
        timestamp: new Date().toISOString(),
        isSystem: true
      };

      // Store system message
      messages.push(systemMsg);

      // Broadcast system message to all clients in the general room
      io.to("general").emit("receive_message", systemMsg);

      console.log(`[Socket] User left: ${username} (Socket ID: ${socket.id})`);
    }
  });
};
