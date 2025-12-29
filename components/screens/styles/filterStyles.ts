import { StyleSheet } from "react-native";
import { sharedStyles } from "./sharedStyles";

export const filterStyles = StyleSheet.create({
  ...sharedStyles,
  headerTitleContainer: {
    flex: 1,
    alignItems: "center",
  },
  filterSection: {
    padding: 16,
    backgroundColor: "#FFF",
    marginBottom: 16,
  },
  filterSectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 16,
    textAlign: "center",
  },
  categoryButtons: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    justifyContent: "center",
  },
  categoryButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#F5F5F5",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 24,
    minWidth: 100,
    justifyContent: "center",
  },
  categoryButtonSelected: {
    backgroundColor: "#5B7FFF",
  },
  categoryIcon: {
    fontSize: 18,
  },
  categoryButtonText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
  },
  categoryButtonTextSelected: {
    color: "#FFF",
  },
});

