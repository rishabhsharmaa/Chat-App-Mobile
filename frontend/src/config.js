/**
 * Frontend Configuration
 * Change the IP address below to your machine's local IP address (e.g. 192.168.1.50)
 * so that an emulator or a physical device on the same Wi-Fi network can reach the server.
 */

// Replace '192.168.1.100' with your actual local network IP address
const LOCAL_IP = "192.168.0.7"; 
const PORT = "5000";

export const BACKEND_URL = `http://${LOCAL_IP}:${PORT}`;
export const SOCKET_URL = `http://${LOCAL_IP}:${PORT}`;
