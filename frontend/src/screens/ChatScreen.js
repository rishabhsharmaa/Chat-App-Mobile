import React, { useRef, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useSocket } from "../hooks/useSocket";
import { MessageBubble } from "../components/MessageBubble";
import { MessageInput } from "../components/MessageInput";

export const ChatScreen = ({ username, onLeaveChat }) => {
  const { messages, isConnected, isReconnecting, sendMessage } = useSocket(username);
  const flatListRef = useRef(null);

  // Auto scroll to end of list on new messages
  useEffect(() => {
    if (messages.length > 0) {
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [messages]);

  // Render socket connection banner
  const renderStatusBanner = () => {
    if (isReconnecting) {
      return (
        <View style={[styles.statusBanner, styles.bannerReconnecting]}>
          <Text style={styles.bannerText}>Reconnecting to server...</Text>
        </View>
      );
    }
    if (!isConnected) {
      return (
        <View style={[styles.statusBanner, styles.bannerDisconnected]}>
          <Text style={styles.bannerText}>Connection lost. Trying to connect...</Text>
        </View>
      );
    }
    return null; // Connected fine, hide banner
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" />
      
      {/* Header bar */}
      <View style={styles.header}>
        <View style={styles.headerInfo}>
          <Text style={styles.headerTitle}>General Room</Text>
          <View style={styles.statusIndicatorContainer}>
            <View
              style={[
                styles.statusDot,
                isConnected ? styles.dotConnected : styles.dotDisconnected,
              ]}
            />
            <Text style={styles.statusText}>
              {isConnected ? `Connected as ${username}` : "Offline"}
            </Text>
          </View>
        </View>

        {/* Exit Button */}
        <TouchableOpacity style={styles.leaveButton} onPress={onLeaveChat}>
          <Text style={styles.leaveButtonText}>Leave</Text>
        </TouchableOpacity>
      </View>

      {/* Network Alert Banner */}
      {renderStatusBanner()}

      {/* Message Area & Input Container */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
        style={styles.flexContainer}
      >
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <MessageBubble
              message={item}
              isOwnMessage={item.sender === username}
            />
          )}
          contentContainerStyle={styles.listContent}
          onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
          onLayout={() => flatListRef.current?.scrollToEnd({ animated: true })}
        />

        <MessageInput
          onSendMessage={sendMessage}
          isConnected={isConnected}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#0F0F13",
  },
  flexContainer: {
    flex: 1,
  },
  header: {
    height: 60,
    backgroundColor: "#1E1E28",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.05)",
  },
  headerInfo: {
    flexDirection: "column",
  },
  headerTitle: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  statusIndicatorContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 2,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  dotConnected: {
    backgroundColor: "#10B981", // Emerald Green
  },
  dotDisconnected: {
    backgroundColor: "#EF4444", // Red
  },
  statusText: {
    color: "#94A3B8",
    fontSize: 12,
  },
  leaveButton: {
    backgroundColor: "rgba(239, 68, 68, 0.1)",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "rgba(239, 68, 68, 0.2)",
  },
  leaveButtonText: {
    color: "#EF4444",
    fontSize: 12,
    fontWeight: "600",
  },
  statusBanner: {
    paddingVertical: 6,
    alignItems: "center",
    justifyContent: "center",
  },
  bannerReconnecting: {
    backgroundColor: "#D97706", // Amber
  },
  bannerDisconnected: {
    backgroundColor: "#DC2626", // Red
  },
  bannerText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "600",
  },
  listContent: {
    paddingVertical: 12,
  },
});
