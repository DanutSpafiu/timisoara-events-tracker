import { StyleSheet } from "react-native";

export const eventDetailStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    overflow: "hidden",
  },
  scrollView: {
    flex: 1,
  },
  detailsHeader: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#FFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E5",
  },
  backButton: {
    marginRight: 12,
    padding: 4,
  },
  detailsHeaderTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
  },
  detailsBanner: {
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    overflow: "hidden",
  },
  detailsBannerImage: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  bannerOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  categoryBadge: {
    position: "absolute",
    top: 12,
    right: 12,
    backgroundColor: "rgba(255,255,255,0.9)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#333",
  },
  detailsContent: {
    padding: 16,
  },
  detailsTitlu: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 16,
  },
  actionButtons: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 24,
  },
  actionButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: "#F5F5F5",
    padding: 14,
    borderRadius: 12,
  },
  actionButtonText: {
    fontSize: 15,
    fontWeight: "500",
    color: "#666",
  },
  actionButtonTextSaved: {
    color: "#FFD700",
  },
  infoBox: {
    backgroundColor: "#F8F9FA",
    borderRadius: 12,
    padding: 16,
    gap: 16,
    marginBottom: 24,
  },
  infoBoxRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
  },
  infoIconBox: {
    padding: 8,
    borderRadius: 8,
  },
  infoBoxContent: {
    flex: 1,
  },
  infoBoxLabel: {
    fontSize: 11,
    fontWeight: "600",
    color: "#999",
    marginBottom: 4,
  },
  infoBoxValue: {
    fontSize: 15,
    fontWeight: "500",
    color: "#000",
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 12,
  },
  sectionText: {
    fontSize: 15,
    color: "#666",
    lineHeight: 22,
  },
  ticketButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#5B7FFF",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  ticketButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFF",
  },
  ticketButtonArrow: {
    fontSize: 20,
    color: "#FFF",
  },
});

