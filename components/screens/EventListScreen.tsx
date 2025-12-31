import {
  CalendarIcon,
  ClockIcon,
  MapPinIcon,
  UserIcon,
} from "@/components/icons";
import type { Eveniment } from "@/types/events";
import { MaterialIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import React, { useState } from "react";
import {
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { eventListStyles } from "./styles/eventListStyles";

interface EventListScreenProps {
  onSelectEvent: (eveniment: Eveniment) => void;
  savedEvents: Set<number>;
  onToggleSave: (eventId: number) => void;
  onNavigateToSaved: () => void;
  onNavigateToFilter: () => void;
  onNavigateToDatePicker: () => void;
  onNavigateToProfileEditor: () => void;
  userName: string;
  profilePicture: string | null;
  filteredEvents: Eveniment[];
}

export function EventListScreen({
  onSelectEvent,
  savedEvents,
  onToggleSave,
  onNavigateToSaved,
  onNavigateToFilter,
  onNavigateToDatePicker,
  onNavigateToProfileEditor,
  userName,
  profilePicture,
  filteredEvents: filteredEventsProp,
}: EventListScreenProps) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const insets = useSafeAreaInsets();

  // Filter events based on search query and applied filters
  const filteredEvents = filteredEventsProp.filter((eveniment) =>
    eveniment.titlu.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={eventListStyles.container}>
      <StatusBar barStyle="light-content" translucent />

      {/* Header */}
      <View style={[eventListStyles.header, { paddingTop: insets.top }]}>
        <View style={eventListStyles.headerTop}>
          <TouchableOpacity
            style={eventListStyles.citySelector}
            onPress={() => setShowDropdown(!showDropdown)}
          >
            <Text style={eventListStyles.headerTitle}>
              Evenimente în{" "}
              <Text style={eventListStyles.underlinedText}>Timișoara</Text>
            </Text>
            <Text style={eventListStyles.chevron}>
              {showDropdown ? "▲" : "▼"}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={eventListStyles.profileButton}
            onPress={() => {
              setShowProfileMenu(!showProfileMenu);
              setShowDropdown(false);
            }}
          >
            {profilePicture ? (
              <Image
                source={{ uri: profilePicture }}
                style={eventListStyles.profilePicture}
                contentFit="cover"
              />
            ) : (
              <UserIcon />
            )}
          </TouchableOpacity>
        </View>

        {/* Profile Menu Dropdown */}
        {showProfileMenu && (
          <>
            <TouchableOpacity
              style={eventListStyles.profileMenuOverlay}
              activeOpacity={1}
              onPress={() => setShowProfileMenu(false)}
            />
            <View style={eventListStyles.profileMenu}>
              <TouchableOpacity
                style={eventListStyles.profileMenuItem}
                onPress={() => {
                  setShowProfileMenu(false);
                  onNavigateToProfileEditor();
                }}
              >
                <View style={eventListStyles.profileMenuItemContent}>
                  <Text style={eventListStyles.profileMenuItemTitle}>
                    Contul meu
                  </Text>
                  <Text style={eventListStyles.profileMenuItemSubtitle}>
                    {userName}
                  </Text>
                </View>
              </TouchableOpacity>

              <View style={eventListStyles.profileMenuDivider} />

              <TouchableOpacity
                style={eventListStyles.profileMenuItem}
                onPress={() => {
                  setShowProfileMenu(false);
                  onNavigateToSaved();
                }}
              >
                <MaterialIcons
                  name="bookmark-border"
                  size={20}
                  color="#333"
                  style={eventListStyles.profileMenuItemIcon}
                />
                <View style={eventListStyles.profileMenuItemContent}>
                  <Text style={eventListStyles.profileMenuItemTitle}>
                    Evenimente salvate
                  </Text>
                  <Text style={eventListStyles.profileMenuItemSubtitle}>
                    {savedEvents.size}{" "}
                    {savedEvents.size === 1 ? "eveniment" : "evenimente"}
                  </Text>
                </View>
              </TouchableOpacity>

              <View style={eventListStyles.profileMenuDivider} />

              <TouchableOpacity
                style={eventListStyles.profileMenuItem}
                onPress={() => {
                  setShowProfileMenu(false);
                  // Handle logout
                }}
              >
                <MaterialIcons
                  name="exit-to-app"
                  size={20}
                  color="#EF4444"
                  style={eventListStyles.profileMenuItemIcon}
                />
                <Text style={eventListStyles.profileMenuItemTitleLogout}>
                  Logout
                </Text>
              </TouchableOpacity>
            </View>
          </>
        )}

        {showDropdown && (
          <View style={eventListStyles.dropdown}>
            <Text style={eventListStyles.dropdownTitle}>SELECTEAZĂ ORAȘUL</Text>
            <TouchableOpacity style={eventListStyles.dropdownItem}>
              <Text style={eventListStyles.dropdownItemText}>Timișoara</Text>
              <Text style={eventListStyles.checkmark}>✓</Text>
            </TouchableOpacity>
            <Text style={eventListStyles.dropdownSubtext}>
              Mai multe orașe în curând...
            </Text>
          </View>
        )}

        {/* Search Bar */}
        <View style={eventListStyles.searchContainer}>
          <Text style={eventListStyles.searchIcon}>🔍</Text>
          <TextInput
            style={eventListStyles.searchInput}
            placeholder="Caută evenimente..."
            placeholderTextColor="rgba(255, 255, 255, 0.6)"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity
              onPress={() => setSearchQuery("")}
              style={eventListStyles.clearButton}
            >
              <Text style={eventListStyles.clearButtonText}>✕</Text>
            </TouchableOpacity>
          )}
        </View>

        <View style={eventListStyles.headerButtons}>
          <TouchableOpacity
            style={eventListStyles.filterButton}
            onPress={onNavigateToFilter}
          >
            <MaterialIcons name="tune" size={20} color="#FFF" />
            <Text style={eventListStyles.filterButtonText}>Filtrează</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={eventListStyles.iconButton}
            onPress={onNavigateToDatePicker}
          >
            <CalendarIcon />
          </TouchableOpacity>
        </View>
      </View>

      {/* Lista evenimente */}
      <ScrollView
        style={eventListStyles.scrollView}
        contentContainerStyle={eventListStyles.scrollContent}
      >
        {filteredEvents.length === 0 ? (
          <View style={eventListStyles.noResultsContainer}>
            <Text style={eventListStyles.noResultsText}>
              Nu s-au găsit evenimente pentru {'"'}
              {searchQuery}
              {'"'}
            </Text>
          </View>
        ) : (
          <>
            <Text style={eventListStyles.eventsCountText}>
              {filteredEvents.length}{" "}
              {filteredEvents.length === 1
                ? "eveniment găsit"
                : "evenimente găsite"}
            </Text>
            {filteredEvents.map((eveniment) => (
              <TouchableOpacity
                key={eveniment.id}
                style={eventListStyles.evenimentCard}
                onPress={() => onSelectEvent(eveniment)}
                activeOpacity={0.7}
              >
                <View
                  style={[
                    eventListStyles.evenimentBanner,
                    { backgroundColor: eveniment.culoare },
                  ]}
                >
                  <Image
                    source={{ uri: eveniment.imageUrl }}
                    style={eventListStyles.evenimentBannerImage}
                    contentFit="cover"
                  />
                  <View style={eventListStyles.bannerOverlay} />
                  <View style={eventListStyles.categoryBadge}>
                    <Text style={eventListStyles.categoryText}>
                      {eveniment.categorie}
                    </Text>
                  </View>
                  <TouchableOpacity
                    style={eventListStyles.bookmarkButton}
                    onPress={(e) => {
                      e.stopPropagation();
                      onToggleSave(eveniment.id);
                    }}
                  >
                    <MaterialIcons
                      name={
                        savedEvents.has(eveniment.id)
                          ? "bookmark"
                          : "bookmark-border"
                      }
                      size={20}
                      color={savedEvents.has(eveniment.id) ? "#FFD700" : "#FFF"}
                    />
                  </TouchableOpacity>
                </View>

                <View style={eventListStyles.evenimentContent}>
                  <Text style={eventListStyles.evenimentTitlu}>
                    {eveniment.titlu}
                  </Text>
                  <Text style={eventListStyles.evenimentDescriere}>
                    {eveniment.descriere}
                  </Text>

                  <View style={eventListStyles.evenimentInfo}>
                    <View style={eventListStyles.infoRow}>
                      <CalendarIcon />
                      <Text style={eventListStyles.infoText}>
                        {eveniment.dataFormatata}
                      </Text>
                    </View>
                    <View style={eventListStyles.infoRow}>
                      <ClockIcon />
                      <Text style={eventListStyles.infoText}>
                        {eveniment.ora}
                      </Text>
                    </View>
                  </View>

                  <View style={eventListStyles.infoRow}>
                    <MapPinIcon />
                    <Text
                      style={[
                        eventListStyles.infoText,
                        eventListStyles.locatieText,
                      ]}
                    >
                      {eveniment.locatie}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </>
        )}
      </ScrollView>
    </View>
  );
}
