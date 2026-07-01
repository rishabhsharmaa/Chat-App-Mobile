import React from "react";
import { View, Text, StyleSheet } from "react-native";

export const MessageBubble = ({ message, isOwnMessage }) => {
  const { sender, text, timestamp, isSystem } = message;

  // Formatter for timestamps (e.g. "10:30 AM")
  const formatTime = (isoString) => {
    try {
      const date = new Date(isoString);
      return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    } catch (e) {
      return "";
    }
  };

  // 1. Render System messages (joined, left, etc.)
  if (isSystem || sender === "System") {
    return (
      <View style={styles.systemContainer}>
        <View style={styles.systemBadge}>
          <Text style={styles.systemText}>{text}</Text>
        </View>
      </View>
    );
  }

  // 2. Render normal user messages (Own vs Others)
  return (
    <View
      style={[
        styles.bubbleContainer,
        isOwnMessage ? styles.ownContainer : styles.otherContainer,
      ]}
    >
      <View
        style={[
          styles.bubble,
          isOwnMessage ? styles.ownBubble : styles.otherBubble,
        ]}
      >
        {!isOwnMessage && <Text style={styles.senderText}>{sender}</Text>}
        <Text style={isOwnMessage ? styles.ownMessageText : styles.otherMessageText}>
          {text}
        </Text>
        <Text style={[styles.timeText, isOwnMessage ? styles.ownTime : styles.otherTime]}>
          {formatTime(timestamp)}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  systemContainer: {
    alignItems: "center",
    marginVertical: 10,
    paddingHorizontal: 20,
  },
  systemBadge: {
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    paddingVertical: 5,
    paddingHorizontal: 14,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.05)",
  },
  systemText: {
    color: "#94A3B8",
    fontSize: 12,
    fontStyle: "italic",
    textAlign: "center",
  },
  bubbleContainer: {
    flexDirection: "row",
    marginVertical: 6,
    paddingHorizontal: 16,
    width: "100%",
  },
  ownContainer: {
    justifyContent: "flex-end",
  },
  otherContainer: {
    justifyContent: "flex-start",
  },
  bubble: {
    maxWidth: "80%",
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 18,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 2,
  },
  ownBubble: {
    backgroundColor: "#6366F1", // Indigo accent color for own messages
    borderBottomRightRadius: 4, // Style own bubble to pinch on right
  },
  otherBubble: {
    backgroundColor: "#1E1E28", // Deep slate background for others
    borderBottomLeftRadius: 4,  // Style other bubble to pinch on left
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.05)",
  },
  senderText: {
    color: "#A5B4FC", // Light indigo text for sender name
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 4,
  },
  ownMessageText: {
    color: "#FFFFFF",
    fontSize: 15,
    lineHeight: 20,
  },
  otherMessageText: {
    color: "#E2E8F0",
    fontSize: 15,
    lineHeight: 20,
  },
  timeText: {
    fontSize: 9,
    marginTop: 4,
    alignSelf: "flex-end",
  },
  ownTime: {
    color: "rgba(255, 255, 255, 0.65)",
  },
  otherTime: {
    color: "#64748B",
  },
});
