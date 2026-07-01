import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
// Use an icon package or custom visual shapes for styling
import { StatusBar } from "expo-status-bar";

export const MessageInput = ({ onSendMessage, isConnected }) => {
  const [text, setText] = useState("");

  const handleSend = () => {
    const trimmed = text.trim();
    if (!trimmed) return;
    
    // Call parent handler
    onSendMessage(trimmed);
    
    // Clear input
    setText("");
  };

  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.textInput}
        placeholder={isConnected ? "Message..." : "Waiting for connection..."}
        placeholderTextColor="#64748B"
        value={text}
        onChangeText={setText}
        editable={isConnected}
        multiline={false}
        returnKeyType="send"
        onSubmitEditing={handleSend}
      />
      <TouchableOpacity
        style={[
          styles.sendButton,
          (!text.trim() || !isConnected) && styles.sendButtonDisabled,
        ]}
        onPress={handleSend}
        disabled={!text.trim() || !isConnected}
      >
        <View style={styles.sendIconArrow} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: "#1E1E28",
    borderTopWidth: 1,
    borderTopColor: "rgba(255, 255, 255, 0.05)",
  },
  textInput: {
    flex: 1,
    height: 44,
    backgroundColor: "#0F0F13",
    borderRadius: 22,
    paddingHorizontal: 18,
    color: "#FFFFFF",
    fontSize: 15,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.05)",
    marginRight: 10,
  },
  sendButton: {
    width: 44,
    height: 44,
    backgroundColor: "#6366F1",
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#6366F1",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 3,
  },
  sendButtonDisabled: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    shadowOpacity: 0,
    elevation: 0,
  },
  sendIconArrow: {
    // Custom simple triangle/arrow representation using CSS borders
    width: 0,
    height: 0,
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderLeftWidth: 6,
    borderRightWidth: 6,
    borderBottomWidth: 12,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: "#FFFFFF",
    transform: [{ rotate: "90deg" }], // Rotate to point right
    marginLeft: 2,
  },
});
