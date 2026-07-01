# Real-time Chat Application Assignment

A full-stack real-time chat application featuring a **Node.js + Socket.io** backend and a **React Native + Expo** mobile frontend.

---

## Project Structure

```text
/backend
  server.js                 # Express server with Socket.io configuration
  /socket
    chatHandlers.js        # Socket connection, message, and join/leave handlers
  package.json
  README.md
/frontend
  App.js                   # Root React Native element (conditional routing state)
  app.json                 # Expo app configuration
  package.json
  /src
    /components
      MessageBubble.js     # Chat bubble rendering (sender, text, timestamp styling)
      MessageInput.js      # Message text field & send validation
    /screens
      LoginScreen.js       # Join chat page with username inputs
      ChatScreen.js        # Interactive conversation list & scroll support
    /hooks
      useSocket.js         # Custom Socket.io connection hook
    config.js              # Network endpoints & Local IP settings
README.md                  # Root execution & build manual
```

---

## Getting Started

Follow these steps to set up and run the application.

### 1. Start the Backend Server

1. Navigate to the `/backend` folder:
   ```bash
   cd backend
   ```
2. Install the backend dependencies:
   ```bash
   npm install
   ```
3. Start the server in development mode:
   ```bash
   npm run dev
   ```
   The backend server starts on port `5000` binding to interface `0.0.0.0` (accessible from any local network IP).

---

### 2. Configure the Frontend (Local IP Setup)

Since mobile emulators (like Android Emulator) or physical devices cannot communicate with the server using `localhost`, you must configure the socket client to use your machine's **local network IP address**.

#### Find your Local Network IP:
* **Windows**: Open Command Prompt/PowerShell and run `ipconfig`. Look for the `IPv4 Address` under your active Wi-Fi or Ethernet adapter (e.g., `192.168.1.100`).
* **macOS / Linux**: Open Terminal and run `ifconfig` or `ip a`. Look for the `inet` address matching your local wireless adapter (e.g., `192.168.1.100`).

#### Update configuration:
Open [config.js](file:///e:/internshala/vedaz/frontend/src/config.js) and update the `LOCAL_IP` variable:
```javascript
// Replace this with your actual IPv4 local network IP
const LOCAL_IP = "YOUR_LOCAL_IP_HERE";
```

---

### 3. Start the Frontend (Expo)

1. Navigate to the `/frontend` folder:
   ```bash
   cd ../frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Expo development server:
   ```bash
   npx expo start
   ```
4. Open the app:
   * **Android Emulator / iOS Simulator**: Press `a` or `i` in the terminal output to start the app on your virtual machine.
   * **Physical Device**: Install the **Expo Go** app from the Google Play Store or iOS App Store, then scan the QR code displayed in your terminal. Ensure your computer and device are connected to the **same Wi-Fi network**.

---

## How to Build the Android APK

To submit the application as a standalone Android APK, follow either of these workflows:

### Option A: EAS Build (Recommended for Expo, cloud-based)

Expo Application Services (EAS) builds your APK in the cloud.

1. Install the EAS CLI globally (if you haven't already):
   ```bash
   npm install -g eas-cli
   ```
2. Log in to your Expo account:
   ```bash
   eas login
   ```
3. Configure the project for EAS builds:
   ```bash
   eas build:configure
   ```
4. Define a build profile for local testing (APK generation) in your newly generated `eas.json` under `build.preview`:
   ```json
   {
     "build": {
       "development": {
         "developmentClient": true,
         "distribution": "internal"
       },
       "preview": {
         "android": {
           "buildType": "apk"
         }
       },
       "production": {}
     }
   }
   ```
5. Trigger the preview build to generate the APK file:
   ```bash
   eas build -p android --profile preview
   ```
6. Once the build completes, the CLI will output a download link. Open the link to download the `.apk` file directly.

### Option B: Local Build (via Android Studio)

If you prefer building locally using Android Studio:

1. Prebuild the React Native project to generate the android folder:
   ```bash
   npx expo prebuild --platform android
   ```
2. Build the APK using the gradle wrapper:
   ```bash
   cd android
   ./gradlew assembleRelease
   ```
   The generated APK will be stored at:
   `/frontend/android/app/build/outputs/apk/release/app-release.apk`

---

## Submission & Verification Fallback

* **Main Submission**: Send the `/backend` and `/frontend` directories, along with the generated `.apk` file.
* **Recording Fallback**: If you face any issues building the APK due to system configurations or Expo account restrictions, **a screen recording** showing the login screen, real-time message flow between two windows, and reconnection handling/disconnect alerts works perfectly as a replacement!
