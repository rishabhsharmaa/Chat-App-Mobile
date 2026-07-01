# Chat Application Backend

This is the Node.js + Express + Socket.io server for the real-time chat application. It maintains an in-memory message history log, accepts Socket.io connections from any origin, and acts as a gateway for real-time bidirectional message broadcasts.

## Installation & Setup

1. Make sure you have [Node.js](https://nodejs.org/) installed (version >= 16.0.0 is recommended).
2. Install the backend dependencies:
   ```bash
   npm install
   ```

## Running the Server

- To start the server in development mode (with auto-reload using `nodemon`):
  ```bash
  npm run dev
  ```
- To start the server in production mode:
  ```bash
  npm start
  ```

Once started, the server will bind to port `5000` on all local network interfaces (`0.0.0.0`), meaning it can be reached via your computer's local IP address or `localhost`.

## API Endpoints

- **`GET /api/messages`**: Returns the in-memory array containing the chat history (both user messages and system announcements) for synchronizing screens upon reconnecting.
- **WebSocket Gateway**: Listeners and emitters are broadcast on standard Socket.io events.
