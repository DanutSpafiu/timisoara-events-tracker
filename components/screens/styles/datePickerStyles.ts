import { StyleSheet } from "react-native";
import { sharedStyles } from "./sharedStyles";

export const datePickerStyles = StyleSheet.create({
  ...sharedStyles,
  headerTitleContainer: {
    flex: 1,
    alignItems: "center",
  },
  headerSubtitle: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.8)",
    marginTop: 4,
  },
  filterSection: {
    padding: 16,
    backgroundColor: "#FFF",
    marginBottom: 16,
  },
  calendarContainer: {
    borderRadius: 12,
    overflow: "hidden",
  },
  calendar: {
    borderRadius: 12,
  },
  calendarDayContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 36,
    borderRadius: 18,
  },
  calendarDaySelected: {
    backgroundColor: "#5B7FFF",
  },
  calendarDayDisabled: {
    opacity: 0.3,
  },
  calendarDayText: {
    fontSize: 16,
    color: "#999", // Gray for dates without events
    fontWeight: "400",
  },
  calendarDayTextWithEvent: {
    color: "#333", // Black for dates with events
    fontWeight: "bold",
  },
  calendarDayTextSelected: {
    color: "#FFF",
    fontWeight: "bold",
  },
  calendarDayTextToday: {
    color: "#5B7FFF",
  },
  calendarDayTextDisabled: {
    color: "#CCC",
  },
  selectedDatesSection: {
    padding: 16,
    backgroundColor: "#FFF",
  },
  selectedDatesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginBottom: 16,
  },
  selectedDateChip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    gap: 8,
  },
  selectedDateText: {
    fontSize: 14,
    color: "#333",
    fontWeight: "500",
  },
  chipRemoveButton: {
    padding: 4,
  },
  chipRemoveIcon: {
    fontSize: 16,
    color: "#666",
    fontWeight: "bold",
  },
  clearAllButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  clearAllIcon: {
    fontSize: 16,
    color: "#EF4444",
    fontWeight: "bold",
  },
  clearAllText: {
    fontSize: 14,
    color: "#EF4444",
    fontWeight: "500",
  },
});

