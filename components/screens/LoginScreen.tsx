import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { StatusBar, Text, TouchableOpacity, View } from "react-native";
import { loginStyles } from "./styles/loginStyles";

interface LoginScreenProps {
  onLogin: () => void;
}

export function LoginScreen({ onLogin }: LoginScreenProps) {
  return (
    <View style={loginStyles.loginContainer}>
      <StatusBar barStyle="dark-content" />
      <View style={loginStyles.loginContent}>
        {/* Logo */}
        <View style={loginStyles.logoContainer}>
          <Text style={loginStyles.logoText}>👤</Text>
        </View>

        {/* Subtitle */}
        <Text style={loginStyles.loginSubtitle}>
          Descoperă evenimente culturale în orașul tău
        </Text>

        {/* Social Login Buttons */}
        <View style={loginStyles.loginButtonsContainer}>
          {/* Google Button */}
          <TouchableOpacity style={loginStyles.googleButton} onPress={onLogin}>
            <Text style={loginStyles.googleIcon}>G</Text>
            <Text style={loginStyles.googleButtonText}>Continuă cu Google</Text>
          </TouchableOpacity>

          {/* Apple Button */}
          <TouchableOpacity style={loginStyles.appleButton} onPress={onLogin}>
            <MaterialIcons name="apple" size={24} color="#FFF" />
            <Text style={loginStyles.appleButtonText}>Continuă cu Apple</Text>
          </TouchableOpacity>

          {/* Facebook Button */}
          <TouchableOpacity
            style={loginStyles.facebookButton}
            onPress={onLogin}
          >
            <Text style={loginStyles.facebookIcon}>f</Text>
            <Text style={loginStyles.facebookButtonText}>
              Continuă cu Facebook
            </Text>
          </TouchableOpacity>
        </View>

        {/* Terms and Conditions */}
        <Text style={loginStyles.termsText}>
          Continuând, accepți{" "}
          <Text style={loginStyles.termsLink}>Termenii și Condițiile</Text> și{" "}
          <Text style={loginStyles.termsLink}>Politica de Confidențialitate</Text>
        </Text>
      </View>
    </View>
  );
}

