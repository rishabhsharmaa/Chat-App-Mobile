/**
 * Socket.io + Express Chat Backend Server
 */

const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
const registerChatHandlers = require("./socket/chatHandlers");

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for express routes
app.use(cors());
app.use(express.json());

// In-memory message history store
const messages = [];

// REST fallback API endpoint to fetch initial chat history on mount/reconnect
app.get("/api/messages", (req, res) => {
  res.json(messages);
});

// Simple root healthcheck check
app.get("/", (req, res) => {
  res.send("Chat server is running!");
});

// Create HTTP server wrapping express
const server = http.createServer(app);

// Initialize Socket.io on the HTTP server with explicit CORS origin set to '*'
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// Socket connection listener
io.on("connection", (socket) => {
  console.log(`[Socket] New connection established: ${socket.id}`);
  
  // Register chat handlers passing io, socket, and messages array reference
  registerChatHandlers(io, socket, messages);
});

// Bind to 0.0.0.0 so that the server is reachable by emulator/physical devices on local network
server.listen(PORT, "0.0.0.0", () => {
  console.log("=========================================");
  console.log(`Server is running on http://0.0.0.0:${PORT}`);
  console.log(`To connect from emulator or local device, use your local IP.`);
  console.log("=========================================");
});
