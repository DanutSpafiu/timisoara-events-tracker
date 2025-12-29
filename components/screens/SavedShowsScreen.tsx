import { MaterialIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import React from "react";
import { ScrollView, StatusBar, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  BackIcon,
  CalendarIcon,
  ClockIcon,
  MapPinIcon,
} from "@/components/icons";
import type { Eveniment } from "@/types/events";
import { EVENIMENTE } from "@/constants/events";
import { savedShowsStyles } from "./styles/savedShowsStyles";

interface SavedShowsScreenProps {
  savedEvents: Set<number>;
  onSelectEvent: (eveniment: Eveniment) => void;
  onBack: () => void;
  onToggleSave: (eventId: number) => void;
}

export function SavedShowsScreen({
  savedEvents,
  onSelectEvent,
  onBack,
  onToggleSave,
}: SavedShowsScreenProps) {
  const insets = useSafeAreaInsets();
  const savedEventsList = EVENIMENTE.filter((e) => savedEvents.has(e.id));

  return (
    <View style={savedShowsStyles.container}>
      <StatusBar barStyle="light-content" translucent />

      {/* Header */}
      <View style={[savedShowsStyles.header, { paddingTop: insets.top }]}>
        <View style={savedShowsStyles.headerTop}>
          <TouchableOpacity onPress={onBack} style={savedShowsStyles.backButtonHeader}>
            <BackIcon />
          </TouchableOpacity>
          <Text style={savedShowsStyles.headerTitle}>Evenimente Salvate</Text>
          <View style={savedShowsStyles.headerSpacer} />
        </View>
      </View>

      {/* Lista evenimente salvate */}
      <ScrollView
        style={savedShowsStyles.scrollView}
        contentContainerStyle={savedShowsStyles.scrollContent}
      >
        {savedEventsList.length === 0 ? (
          <View style={savedShowsStyles.noResultsContainer}>
            <Text style={savedShowsStyles.noResultsText}>
              Nu ai evenimente salvate încă
            </Text>
            <Text style={savedShowsStyles.noResultsSubtext}>
              Apasă pe{" "}
              <MaterialIcons name="bookmark" size={20} color="#FFD700" /> pentru
              a salva evenimente
            </Text>
          </View>
        ) : (
          savedEventsList.map((eveniment) => (
            <TouchableOpacity
              key={eveniment.id}
              style={savedShowsStyles.evenimentCard}
              onPress={() => onSelectEvent(eveniment)}
              activeOpacity={0.7}
            >
              <View
                style={[
                  savedShowsStyles.evenimentBanner,
                  { backgroundColor: eveniment.culoare },
                ]}
              >
                <Image
                  source={{ uri: eveniment.imageUrl }}
                  style={savedShowsStyles.evenimentBannerImage}
                  contentFit="cover"
                />
                <View style={savedShowsStyles.bannerOverlay} />
                <View style={savedShowsStyles.categoryBadge}>
                  <Text style={savedShowsStyles.categoryText}>
                    {eveniment.categorie}
                  </Text>
                </View>
                <TouchableOpacity
                  style={savedShowsStyles.bookmarkButton}
                  onPress={(e) => {
                    e.stopPropagation();
                    onToggleSave(eveniment.id);
                  }}
                >
                  <MaterialIcons name="bookmark" size={20} color="#FFD700" />
                </TouchableOpacity>
              </View>

              <View style={savedShowsStyles.evenimentContent}>
                <Text style={savedShowsStyles.evenimentTitlu}>
                  {eveniment.titlu}
                </Text>
                <Text style={savedShowsStyles.evenimentDescriere}>
                  {eveniment.descriere}
                </Text>

                <View style={savedShowsStyles.evenimentInfo}>
                  <View style={savedShowsStyles.infoRow}>
                    <CalendarIcon />
                    <Text style={savedShowsStyles.infoText}>
                      {eveniment.dataFormatata}
                    </Text>
                  </View>
                  <View style={savedShowsStyles.infoRow}>
                    <ClockIcon />
                    <Text style={savedShowsStyles.infoText}>
                      {eveniment.ora}
                    </Text>
                  </View>
                </View>

                <View style={savedShowsStyles.infoRow}>
                  <MapPinIcon />
                  <Text style={[savedShowsStyles.infoText, savedShowsStyles.locatieText]}>
                    {eveniment.locatie}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
    </View>
  );
}

