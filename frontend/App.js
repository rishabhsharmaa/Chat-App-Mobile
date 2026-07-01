import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { LoginScreen } from "./src/screens/LoginScreen";
import { ChatScreen } from "./src/screens/ChatScreen";

export default function App() {
  // Session username state
  const [username, setUsername] = useState(null);

  return (
    <View style={styles.container}>
      {username === null ? (
        <LoginScreen onJoinChat={(name) => setUsername(name)} />
      ) : (
        <ChatScreen username={username} onLeaveChat={() => setUsername(null)} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F0F13",
  },
});
