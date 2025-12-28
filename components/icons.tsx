import { StyleSheet, Text } from "react-native";

const iconStyles = StyleSheet.create({
  icon: {
    fontSize: 20,
  },
});

export const CalendarIcon = () => <Text style={iconStyles.icon}>📅</Text>;
export const ClockIcon = () => <Text style={iconStyles.icon}>🕐</Text>;
export const MapPinIcon = () => <Text style={iconStyles.icon}>📍</Text>;
export const UserIcon = () => <Text style={iconStyles.icon}>👤</Text>;
export const BackIcon = () => <Text style={iconStyles.icon}>←</Text>;
export const ShareIcon = () => <Text style={iconStyles.icon}>📤</Text>;
