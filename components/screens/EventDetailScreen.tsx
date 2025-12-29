import { MaterialIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import React from "react";
import { Linking, ScrollView, StatusBar, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  BackIcon,
  CalendarIcon,
  ClockIcon,
  MapPinIcon,
  ShareIcon,
} from "@/components/icons";
import type { Eveniment, TicketLink } from "@/types/events";
import { eventDetailStyles } from "./styles/eventDetailStyles";

interface EventDetailScreenProps {
  eveniment: Eveniment;
  onBack: () => void;
  savedEvents: Set<number>;
  onToggleSave: (eventId: number) => void;
}

export function EventDetailScreen({
  eveniment,
  onBack,
  savedEvents,
  onToggleSave,
}: EventDetailScreenProps) {
  const insets = useSafeAreaInsets();
  const isSaved = savedEvents.has(eveniment.id);

  const handleTicketPress = (url: string) => {
    Linking.openURL(url).catch((err) =>
      console.error("Couldn't load page", err)
    );
  };

  return (
    <View style={eventDetailStyles.container}>
      <StatusBar barStyle="dark-content" translucent />

      {/* Header detalii */}
      <View style={[eventDetailStyles.detailsHeader, { paddingTop: insets.top }]}>
        <TouchableOpacity onPress={onBack} style={eventDetailStyles.backButton}>
          <BackIcon />
        </TouchableOpacity>
        <Text style={eventDetailStyles.detailsHeaderTitle}>
          Detalii eveniment
        </Text>
      </View>

      <ScrollView style={eventDetailStyles.scrollView}>
        {/* Banner */}
        <View
          style={[
            eventDetailStyles.detailsBanner,
            { backgroundColor: eveniment.culoare },
          ]}
        >
          <Image
            source={{ uri: eveniment.imageUrl }}
            style={eventDetailStyles.detailsBannerImage}
            contentFit="cover"
          />
          <View style={eventDetailStyles.bannerOverlay} />
          <View style={eventDetailStyles.categoryBadge}>
            <Text style={eventDetailStyles.categoryText}>
              {eveniment.categorie}
            </Text>
          </View>
        </View>

        {/* Titlu și acțiuni */}
        <View style={eventDetailStyles.detailsContent}>
          <Text style={eventDetailStyles.detailsTitlu}>{eveniment.titlu}</Text>

          <View style={eventDetailStyles.actionButtons}>
            <TouchableOpacity style={eventDetailStyles.actionButton}>
              <ShareIcon />
              <Text style={eventDetailStyles.actionButtonText}>Share</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={eventDetailStyles.actionButton}
              onPress={() => onToggleSave(eveniment.id)}
            >
              <MaterialIcons
                name={isSaved ? "bookmark" : "bookmark-border"}
                size={18}
                color={isSaved ? "#FFD700" : "#666"}
              />
              <Text
                style={[
                  eventDetailStyles.actionButtonText,
                  isSaved && eventDetailStyles.actionButtonTextSaved,
                ]}
              >
                {isSaved ? "Salvat" : "Salvează"}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Informații eveniment */}
          <View style={eventDetailStyles.infoBox}>
            <View style={eventDetailStyles.infoBoxRow}>
              <View
                style={[
                  eventDetailStyles.infoIconBox,
                  { backgroundColor: "#dbeafe" },
                ]}
              >
                <CalendarIcon />
              </View>
              <View style={eventDetailStyles.infoBoxContent}>
                <Text style={eventDetailStyles.infoBoxLabel}>DATA</Text>
                <Text style={eventDetailStyles.infoBoxValue}>
                  {eveniment.dataFormatata}
                </Text>
              </View>
            </View>

            <View style={eventDetailStyles.infoBoxRow}>
              <View
                style={[
                  eventDetailStyles.infoIconBox,
                  { backgroundColor: "#d1fae5" },
                ]}
              >
                <ClockIcon />
              </View>
              <View style={eventDetailStyles.infoBoxContent}>
                <Text style={eventDetailStyles.infoBoxLabel}>ORA</Text>
                <Text style={eventDetailStyles.infoBoxValue}>
                  {eveniment.ora}
                </Text>
              </View>
            </View>

            <View style={eventDetailStyles.infoBoxRow}>
              <View
                style={[
                  eventDetailStyles.infoIconBox,
                  { backgroundColor: "#fee2e2" },
                ]}
              >
                <MapPinIcon />
              </View>
              <View style={eventDetailStyles.infoBoxContent}>
                <Text style={eventDetailStyles.infoBoxLabel}>LOCAȚIE</Text>
                <Text style={eventDetailStyles.infoBoxValue}>
                  {eveniment.locatie}
                </Text>
              </View>
            </View>
          </View>

          {/* Despre eveniment */}
          <View style={eventDetailStyles.section}>
            <Text style={eventDetailStyles.sectionTitle}>Despre eveniment</Text>
            <Text style={eventDetailStyles.sectionText}>
              {eveniment.detalii}
            </Text>
          </View>

          {/* Linkuri tickets */}
          <View style={eventDetailStyles.section}>
            <Text style={eventDetailStyles.sectionTitle}>Cumpără bilete</Text>
            {eveniment.linkuriTickets.map((link: TicketLink, index: number) => (
              <TouchableOpacity
                key={index}
                style={eventDetailStyles.ticketButton}
                onPress={() => handleTicketPress(link.url)}
                activeOpacity={0.8}
              >
                <Text style={eventDetailStyles.ticketButtonText}>
                  📱 Bilete pe {link.nume}
                </Text>
                <Text style={eventDetailStyles.ticketButtonArrow}>→</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

