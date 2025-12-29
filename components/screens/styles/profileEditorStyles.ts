import { StyleSheet } from "react-native";
import { sharedStyles } from "./sharedStyles";

export const profileEditorStyles = StyleSheet.create({
  ...sharedStyles,
  headerTitleContainer: {
    flex: 1,
    alignItems: "center",
  },
  profileSection: {
    backgroundColor: "#FFF",
    padding: 24,
    marginBottom: 16,
    alignItems: "center",
  },
  profilePictureContainer: {
    position: "relative",
    marginBottom: 24,
  },
  profilePicture: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#E5E5E5",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  profilePictureImage: {
    width: "100%",
    height: "100%",
  },
  profilePicturePlaceholder: {
    fontSize: 48,
  },
  editPictureButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#5B7FFF",
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "#FFF",
  },
  inputSection: {
    backgroundColor: "#FFF",
    padding: 16,
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#666",
    marginBottom: 8,
  },
  textInput: {
    backgroundColor: "#F5F5F5",
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    color: "#333",
    borderWidth: 1,
    borderColor: "#E5E5E5",
  },
  interestsSection: {
    backgroundColor: "#FFF",
    padding: 16,
    marginBottom: 16,
  },
  interestsTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 16,
  },
  interestsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  interestChip: {
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
  interestChipSelected: {
    backgroundColor: "#5B7FFF",
  },
  interestIcon: {
    fontSize: 18,
  },
  interestText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
  },
  interestTextSelected: {
    color: "#FFF",
  },
  saveButton: {
    backgroundColor: "#5B7FFF",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginHorizontal: 16,
    marginBottom: 16,
  },
  saveButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
  },
});

