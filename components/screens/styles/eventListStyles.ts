import { StyleSheet } from "react-native";
import { sharedStyles } from "./sharedStyles";

export const eventListStyles = StyleSheet.create({
  ...sharedStyles,
  citySelector: {
    flexDirection: "row",
    alignItems: "center",
  },
  chevron: {
    color: "#FFF",
    fontSize: 16,
  },
  profileButton: {
    padding: 8,
  },
  profileMenuOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 999,
  },
  profileMenu: {
    position: "absolute",
    top: 60,
    right: 16,
    backgroundColor: "#FFF",
    borderRadius: 12,
    paddingVertical: 8,
    minWidth: 240,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
    zIndex: 1000,
  },
  profileMenuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  profileMenuItemIcon: {
    marginRight: 12,
  },
  profileMenuItemContent: {
    flex: 1,
  },
  profileMenuItemTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  profileMenuItemSubtitle: {
    fontSize: 14,
    color: "#999",
  },
  profileMenuItemTitleLogout: {
    fontSize: 16,
    fontWeight: "600",
    color: "#EF4444",
  },
  profileMenuDivider: {
    height: 1,
    backgroundColor: "#E5E5E5",
    marginVertical: 4,
  },
  dropdown: {
    backgroundColor: "#FFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  dropdownTitle: {
    fontSize: 12,
    fontWeight: "600",
    color: "#666",
    marginBottom: 12,
  },
  dropdownItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
  },
  dropdownItemText: {
    fontSize: 16,
    color: "#5B7FFF",
    fontWeight: "500",
  },
  checkmark: {
    fontSize: 18,
    color: "#5B7FFF",
  },
  dropdownSubtext: {
    fontSize: 14,
    color: "#999",
    marginTop: 8,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 12,
  },
  searchIcon: {
    fontSize: 18,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    color: "#FFF",
    fontSize: 16,
    paddingVertical: 4,
  },
  clearButton: {
    padding: 4,
    marginLeft: 8,
  },
  clearButtonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  headerButtons: {
    flexDirection: "row",
    gap: 12,
  },
  iconButton: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.2)",
    padding: 12,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  filterButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: "rgba(255,255,255,0.2)",
    padding: 12,
    borderRadius: 12,
  },
  filterButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
  },
});

