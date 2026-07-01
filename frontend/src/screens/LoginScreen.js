import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { StatusBar } from "expo-status-bar";

export const LoginScreen = ({ onJoinChat }) => {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");

  const handleJoin = () => {
    const trimmed = username.trim();
    if (!trimmed) {
      setError("Username cannot be empty");
      return;
    }
    if (trimmed.length < 2) {
      setError("Username must be at least 2 characters");
      return;
    }
    setError("");
    onJoinChat(trimmed);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <StatusBar style="light" />
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.keyboardContainer}
        >
          <View style={styles.card}>
            {/* Logo/Branding */}
            <View style={styles.logoContainer}>
              <View style={styles.logoCircle}>
                <Text style={styles.logoIcon}>💬</Text>
              </View>
              <Text style={styles.title}>Real-Time Chat</Text>
              <Text style={styles.subtitle}>Join the general channel</Text>
            </View>

            {/* Input fields */}
            <View style={styles.inputWrapper}>
              <Text style={styles.label}>Username</Text>
              <TextInput
                style={[styles.input, error ? styles.inputError : null]}
                placeholder="Enter your username"
                placeholderTextColor="#64748B"
                value={username}
                onChangeText={(val) => {
                  setUsername(val);
                  if (error) setError("");
                }}
                autoCapitalize="none"
                autoCorrect={false}
                maxLength={20}
              />
              {error ? <Text style={styles.errorText}>{error}</Text> : null}
            </View>

            {/* Join button */}
            <TouchableOpacity style={styles.button} onPress={handleJoin}>
              <Text style={styles.buttonText}>Join Chat</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F0F13",
    justifyContent: "center",
    alignItems: "center",
  },
  keyboardContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    width: "85%",
    backgroundColor: "#1E1E28",
    borderRadius: 24,
    padding: 30,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.05)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 16,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 28,
  },
  logoCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "rgba(99, 102, 241, 0.15)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "rgba(99, 102, 241, 0.3)",
  },
  logoIcon: {
    fontSize: 28,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
    textAlign: "center",
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 14,
    color: "#64748B",
    marginTop: 6,
    textAlign: "center",
  },
  inputWrapper: {
    marginBottom: 24,
  },
  label: {
    fontSize: 12,
    fontWeight: "600",
    color: "#94A3B8",
    marginBottom: 8,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  input: {
    height: 50,
    backgroundColor: "#0F0F13",
    borderRadius: 12,
    paddingHorizontal: 16,
    color: "#FFFFFF",
    fontSize: 16,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
  },
  inputError: {
    borderColor: "#EF4444",
  },
  errorText: {
    color: "#EF4444",
    fontSize: 12,
    marginTop: 6,
  },
  button: {
    height: 52,
    backgroundColor: "#6366F1",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#6366F1",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    letterSpacing: 0.5,
  },
});
