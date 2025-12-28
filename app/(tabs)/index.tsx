// App.js - Înlocuiește conținutul fișierului App.js din root

import { Image } from "expo-image";
import React, { useEffect, useState } from "react";

import { MaterialIcons } from "@expo/vector-icons";
import {
  Linking,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Calendar } from "react-native-calendars";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// Type definitions
interface TicketLink {
  nume: string;
  url: string;
}

interface Eveniment {
  id: number;
  titlu: string;
  descriere: string;
  data: string;
  dataFormatata: string;
  ora: string;
  locatie: string;
  categorie: string;
  culoare: string;
  imageUrl: string;
  detalii: string;
  linkuriTickets: TicketLink[];
}

// Mock icons (în React Native ai nevoie de react-native-vector-icons sau @expo/vector-icons)
// Pentru simplitate, folosim emoji-uri
const CalendarIcon = () => <Text style={styles.icon}>📅</Text>;
const ClockIcon = () => <Text style={styles.icon}>🕐</Text>;
const MapPinIcon = () => <Text style={styles.icon}>📍</Text>;
const UserIcon = () => <Text style={styles.icon}>👤</Text>;
const BackIcon = () => <Text style={styles.icon}>←</Text>;
const ShareIcon = () => <Text style={styles.icon}>📤</Text>;

// Date evenimente hardcodate
const EVENIMENTE: Eveniment[] = [
  {
    id: 0,
    titlu: "Concert Calinacho",
    descriere:
      "Ultima noapte de dragoste. Ai Grija. Dezamagit. Doar cateva titluri! Hai la concert Calinacho si bucurate-te de muzica care face si cei mai tari oameni sa lacrimeze.",
    data: "2026-01-15",
    dataFormatata: "joi, 15 ian. 2026",
    ora: "21:00",
    locatie: "Sala Polivalentă, Bulevardul Liviu Rebreanu 6, Timișoara",
    categorie: "Muzică",
    culoare: "#1a1a2e",
    imageUrl:
      "https://yt3.googleusercontent.com/hD95zJPOdMs5IG4XZW4pQDgKaZun4qpzBYS3A5xqborU4UEQytdhDihig25sithll7CVSyAUp3M=s900-c-k-c0x00ffffff-no-rj",
    detalii:
      "Calinacho vine la Timișoara cu un concert spectaculos! Așteaptă-te la un show live cu toate hiturile care l-au făcut cunoscut în întreaga țară. Atmosferă de neuitat, sound profesional și o experiență muzicală de excepție.",
    linkuriTickets: [
      { nume: "iaBilet", url: "https://www.iabilet.ro" },
      { nume: "Eventim", url: "https://www.eventim.ro" },
      { nume: "MyTicket", url: "https://www.myticket.ro" },
      { nume: "Bilete.ro", url: "https://www.bilete.ro" },
    ],
  },
  {
    id: 1,
    titlu: "Expoziție de Artă Contemporană",
    descriere: "Lucrări de artiști români și internaționali",
    data: "2026-01-18",
    dataFormatata: "dum., 18 ian. 2026",
    ora: "18:00",
    locatie: "Muzeul de Artă, Piața Unirii 1, Timișoara",
    categorie: "Artă",
    culoare: "#667eea",
    imageUrl:
      "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&h=600&fit=crop",
    detalii:
      "O expoziție cuprinzătoare ce prezintă lucrări de artă contemporană de la artiști români și internaționali recunoscuți. Evenimentul oferă o perspectivă unică asupra tendințelor actuale în arta vizuală.",
    linkuriTickets: [
      { nume: "iaBilet", url: "https://www.iabilet.ro" },
      { nume: "Eventim", url: "https://www.eventim.ro" },
    ],
  },
  {
    id: 2,
    titlu: "Piesa de Teatru: Cui i-e frică de Virginia Woolf?",
    descriere: "Regie: Andrei Șerban",
    data: "2026-01-20",
    dataFormatata: "mar., 20 ian. 2026",
    ora: "19:30",
    locatie: "Teatrul Național, Str. Mărășești 2, Timișoara",
    categorie: "Teatru",
    culoare: "#f5576c",
    imageUrl:
      "https://images.unsplash.com/photo-1503095396549-807759245b35?w=800&h=600&fit=crop",
    detalii:
      "Una dintre cele mai puternice piese de teatru ale secolului XX, pusă în scenă de regizorul de renume internațional Andrei Șerban. O experiență teatrală intensă și memorabilă.",
    linkuriTickets: [
      { nume: "iaBilet", url: "https://www.iabilet.ro" },
      { nume: "Eventim", url: "https://www.eventim.ro" },
      { nume: "MyTicket", url: "https://www.myticket.ro" },
    ],
  },
  {
    id: 3,
    titlu: "Concert Rock: The Urban Legends",
    descriere: "Concertul anului! The Urban Legends prezintă noul album",
    data: "2026-01-28",
    dataFormatata: "mie., 28 ian. 2026",
    ora: "21:00",
    locatie: "Sala Polivalentă, Bulevardul Liviu Rebreanu 6, Timișoara",
    categorie: "Muzică",
    culoare: "#a8edea",
    imageUrl:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=600&fit=crop",
    detalii:
      "Concertul anului! The Urban Legends prezintă noul album într-un show spectaculos cu efecte vizuale impresionante. Opening act: Neon Lights. Bar deschis și merchandising oficial.",
    linkuriTickets: [
      { nume: "iaBilet", url: "https://www.iabilet.ro" },
      { nume: "Eventim", url: "https://www.eventim.ro" },
      { nume: "MyTicket", url: "https://www.myticket.ro" },
      { nume: "Bilete.ro", url: "https://www.bilete.ro" },
    ],
  },
  {
    id: 4,
    titlu: "Festival de Jazz: Jazz în Orașul Vechi",
    descriere: "Artiști locali și internaționali",
    data: "2026-02-05",
    dataFormatata: "joi, 5 feb. 2026",
    ora: "20:00",
    locatie: "Club Doors, Str. Emanoil Ungureanu 7, Timișoara",
    categorie: "Muzică",
    culoare: "#ffecd2",
    imageUrl:
      "https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=800&h=600&fit=crop",
    detalii:
      "O seară dedicată jazz-ului cu artiști locali și internaționali. Atmosferă intimă și sofisticată într-una dintre cele mai iconice locații din Timișoara.",
    linkuriTickets: [
      { nume: "iaBilet", url: "https://www.iabilet.ro" },
      { nume: "Bilete.ro", url: "https://www.bilete.ro" },
    ],
  },
  {
    id: 5,
    titlu: "Stand-up Comedy: Seară de Umor",
    descriere: "Cu Costel, Micutzu și invitați speciali",
    data: "2026-02-12",
    dataFormatata: "joi, 12 feb. 2026",
    ora: "20:30",
    locatie: "Casa de Cultură, Bulevardul Regele Ferdinand 2, Timișoara",
    categorie: "Comedy",
    culoare: "#ff9a9e",
    imageUrl:
      "https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=800&h=600&fit=crop",
    detalii:
      "O seară plină de râs alături de cei mai apreciați comedianți români. Show de stand-up comedy cu durată de aproximativ 2 ore.",
    linkuriTickets: [
      { nume: "iaBilet", url: "https://www.iabilet.ro" },
      { nume: "Eventim", url: "https://www.eventim.ro" },
      { nume: "MyTicket", url: "https://www.myticket.ro" },
    ],
  },
  {
    id: 6,
    titlu: "Festival de Film: TIFF - Timișoara International Film Festival",
    descriere: "Proiecții de filme independente și documentare",
    data: "2026-02-20",
    dataFormatata: "vin., 20 feb. 2026",
    ora: "19:00",
    locatie: "Cinema Victoria, Bulevardul Revoluției din 1989, Timișoara",
    categorie: "Film",
    culoare: "#4a5568",
    imageUrl:
      "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&h=600&fit=crop",
    detalii:
      "Festivalul Internațional de Film de la Timișoara aduce la ecran cele mai bune filme independente și documentare din întreaga lume. Proiecții speciale, întâlniri cu regizori și discuții despre cinematografie.",
    linkuriTickets: [
      { nume: "iaBilet", url: "https://www.iabilet.ro" },
      { nume: "Eventim", url: "https://www.eventim.ro" },
    ],
  },
  {
    id: 7,
    titlu: "Concert Clasic: Orchestra Filarmonicii de Stat Timișoara",
    descriere: "Simfonia nr. 9 de Beethoven",
    data: "2026-02-25",
    dataFormatata: "mie., 25 feb. 2026",
    ora: "19:30",
    locatie: "Filarmonica de Stat, Piața Victoriei 1, Timișoara",
    categorie: "Muzică",
    culoare: "#2d3748",
    imageUrl:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=600&fit=crop",
    detalii:
      "O seară memorabilă cu Orchestra Filarmonicii de Stat Timișoara, prezentând Simfonia nr. 9 de Ludwig van Beethoven. Dirijor: maestro Cristian Mandeal. Un eveniment de neuitat pentru iubitorii de muzică clasică.",
    linkuriTickets: [
      { nume: "iaBilet", url: "https://www.iabilet.ro" },
      { nume: "Eventim", url: "https://www.eventim.ro" },
      { nume: "MyTicket", url: "https://www.myticket.ro" },
    ],
  },
  {
    id: 8,
    titlu: "Concert Clasic: Orchestra Filarmonicii de Stat Timișoara",
    descriere: "Simfonia nr. 9 de Beethoven",
    data: "2026-02-25",
    dataFormatata: "mie., 25 feb. 2026",
    ora: "19:30",
    locatie: "Filarmonica de Stat, Piața Victoriei 1, Timișoara",
    categorie: "Muzică",
    culoare: "#2d3748",
    imageUrl:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=600&fit=crop",
    detalii:
      "O seară memorabilă cu Orchestra Filarmonicii de Stat Timișoara, prezentând Simfonia nr. 9 de Ludwig van Beethoven. Dirijor: maestro Cristian Mandeal. Un eveniment de neuitat pentru iubitorii de muzică clasică.",
    linkuriTickets: [
      { nume: "iaBilet", url: "https://www.iabilet.ro" },
      { nume: "Eventim", url: "https://www.eventim.ro" },
      { nume: "MyTicket", url: "https://www.myticket.ro" },
    ],
  },
];

interface EcranPrincipalProps {
  onSelectEvent: (eveniment: Eveniment) => void;
  savedEvents: Set<number>;
  onToggleSave: (eventId: number) => void;
  onNavigateToSaved: () => void;
  onNavigateToFilter: () => void;
  onNavigateToDatePicker: () => void;
  filteredEvents: Eveniment[];
}

function EcranPrincipal({
  onSelectEvent,
  savedEvents,
  onToggleSave,
  onNavigateToSaved,
  onNavigateToFilter,
  onNavigateToDatePicker,
  filteredEvents: filteredEventsProp,
}: EcranPrincipalProps) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const insets = useSafeAreaInsets();

  // Filter events based on search query and applied filters
  const filteredEvents = filteredEventsProp.filter((eveniment) =>
    eveniment.titlu.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" translucent />

      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top }]}>
        <View style={styles.headerTop}>
          <TouchableOpacity
            style={styles.citySelector}
            onPress={() => setShowDropdown(!showDropdown)}
          >
            <Text style={styles.headerTitle}>Evenimente în Timișoara</Text>
            <Text style={styles.chevron}>{showDropdown ? "▲" : "▼"}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.profileButton}
            onPress={() => {
              setShowProfileMenu(!showProfileMenu);
              setShowDropdown(false);
            }}
          >
            <UserIcon />
          </TouchableOpacity>
        </View>

        {/* Profile Menu Dropdown */}
        {showProfileMenu && (
          <>
            <TouchableOpacity
              style={styles.profileMenuOverlay}
              activeOpacity={1}
              onPress={() => setShowProfileMenu(false)}
            />
            <View style={styles.profileMenu}>
              <TouchableOpacity
                style={styles.profileMenuItem}
                onPress={() => {
                  setShowProfileMenu(false);
                }}
              >
                <View style={styles.profileMenuItemContent}>
                  <Text style={styles.profileMenuItemTitle}>Contul meu</Text>
                  <Text style={styles.profileMenuItemSubtitle}>User</Text>
                </View>
              </TouchableOpacity>

              <View style={styles.profileMenuDivider} />

              <TouchableOpacity
                style={styles.profileMenuItem}
                onPress={() => {
                  setShowProfileMenu(false);
                  onNavigateToSaved();
                }}
              >
                <MaterialIcons
                  name="bookmark-border"
                  size={20}
                  color="#333"
                  style={styles.profileMenuItemIcon}
                />
                <View style={styles.profileMenuItemContent}>
                  <Text style={styles.profileMenuItemTitle}>
                    Evenimente salvate
                  </Text>
                  <Text style={styles.profileMenuItemSubtitle}>
                    {savedEvents.size}{" "}
                    {savedEvents.size === 1 ? "eveniment" : "evenimente"}
                  </Text>
                </View>
              </TouchableOpacity>

              <View style={styles.profileMenuDivider} />

              <TouchableOpacity
                style={styles.profileMenuItem}
                onPress={() => {
                  setShowProfileMenu(false);
                  // Handle logout
                }}
              >
                <MaterialIcons
                  name="exit-to-app"
                  size={20}
                  color="#EF4444"
                  style={styles.profileMenuItemIcon}
                />
                <Text style={styles.profileMenuItemTitleLogout}>Logout</Text>
              </TouchableOpacity>
            </View>
          </>
        )}

        {showDropdown && (
          <View style={styles.dropdown}>
            <Text style={styles.dropdownTitle}>SELECTEAZĂ ORAȘUL</Text>
            <TouchableOpacity style={styles.dropdownItem}>
              <Text style={styles.dropdownItemText}>Timișoara</Text>
              <Text style={styles.checkmark}>✓</Text>
            </TouchableOpacity>
            <Text style={styles.dropdownSubtext}>
              Mai multe orașe în curând...
            </Text>
          </View>
        )}

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Caută evenimente..."
            placeholderTextColor="rgba(255, 255, 255, 0.6)"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity
              onPress={() => setSearchQuery("")}
              style={styles.clearButton}
            >
              <Text style={styles.clearButtonText}>✕</Text>
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.headerButtons}>
          <TouchableOpacity
            style={styles.filterButton}
            onPress={onNavigateToFilter}
          >
            <MaterialIcons name="tune" size={20} color="#FFF" />
            <Text style={styles.filterButtonText}>Filtrează</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={onNavigateToDatePicker}
          >
            <CalendarIcon />
          </TouchableOpacity>
        </View>
      </View>

      {/* Lista evenimente */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        {filteredEvents.length === 0 ? (
          <View style={styles.noResultsContainer}>
            <Text style={styles.noResultsText}>
              Nu s-au găsit evenimente pentru {'"'}
              {searchQuery}
              {'"'}
            </Text>
          </View>
        ) : (
          filteredEvents.map((eveniment) => (
            <TouchableOpacity
              key={eveniment.id}
              style={styles.evenimentCard}
              onPress={() => onSelectEvent(eveniment)}
              activeOpacity={0.7}
            >
              <View
                style={[
                  styles.evenimentBanner,
                  { backgroundColor: eveniment.culoare },
                ]}
              >
                <Image
                  source={{ uri: eveniment.imageUrl }}
                  style={styles.evenimentBannerImage}
                  contentFit="cover"
                />
                <View style={styles.bannerOverlay} />
                <View style={styles.categoryBadge}>
                  <Text style={styles.categoryText}>{eveniment.categorie}</Text>
                </View>
                <TouchableOpacity
                  style={styles.bookmarkButton}
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

              <View style={styles.evenimentContent}>
                <Text style={styles.evenimentTitlu}>{eveniment.titlu}</Text>
                <Text style={styles.evenimentDescriere}>
                  {eveniment.descriere}
                </Text>

                <View style={styles.evenimentInfo}>
                  <View style={styles.infoRow}>
                    <CalendarIcon />
                    <Text style={styles.infoText}>
                      {eveniment.dataFormatata}
                    </Text>
                  </View>
                  <View style={styles.infoRow}>
                    <ClockIcon />
                    <Text style={styles.infoText}>{eveniment.ora}</Text>
                  </View>
                </View>

                <View style={styles.infoRow}>
                  <MapPinIcon />
                  <Text style={[styles.infoText, styles.locatieText]}>
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

interface EcranDetaliiProps {
  eveniment: Eveniment;
  onBack: () => void;
  savedEvents: Set<number>;
  onToggleSave: (eventId: number) => void;
}

function EcranDetalii({
  eveniment,
  onBack,
  savedEvents,
  onToggleSave,
}: EcranDetaliiProps) {
  const insets = useSafeAreaInsets();
  const isSaved = savedEvents.has(eveniment.id);

  const handleTicketPress = (url: string) => {
    Linking.openURL(url).catch((err) =>
      console.error("Couldn't load page", err)
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" translucent />

      {/* Header detalii */}
      <View style={[styles.detailsHeader, { paddingTop: insets.top }]}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <BackIcon />
        </TouchableOpacity>
        <Text style={styles.detailsHeaderTitle}>Detalii eveniment</Text>
      </View>

      <ScrollView style={styles.scrollView}>
        {/* Banner */}
        <View
          style={[styles.detailsBanner, { backgroundColor: eveniment.culoare }]}
        >
          <Image
            source={{ uri: eveniment.imageUrl }}
            style={styles.detailsBannerImage}
            contentFit="cover"
          />
          <View style={styles.bannerOverlay} />
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryText}>{eveniment.categorie}</Text>
          </View>
        </View>

        {/* Titlu și acțiuni */}
        <View style={styles.detailsContent}>
          <Text style={styles.detailsTitlu}>{eveniment.titlu}</Text>

          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.actionButton}>
              <ShareIcon />
              <Text style={styles.actionButtonText}>Share</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => onToggleSave(eveniment.id)}
            >
              <MaterialIcons
                name={isSaved ? "bookmark" : "bookmark-border"}
                size={18}
                color={isSaved ? "#FFD700" : "#666"}
              />
              <Text
                style={[
                  styles.actionButtonText,
                  isSaved && styles.actionButtonTextSaved,
                ]}
              >
                {isSaved ? "Salvat" : "Salvează"}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Informații eveniment */}
          <View style={styles.infoBox}>
            <View style={styles.infoBoxRow}>
              <View
                style={[styles.infoIconBox, { backgroundColor: "#dbeafe" }]}
              >
                <CalendarIcon />
              </View>
              <View style={styles.infoBoxContent}>
                <Text style={styles.infoBoxLabel}>DATA</Text>
                <Text style={styles.infoBoxValue}>
                  {eveniment.dataFormatata}
                </Text>
              </View>
            </View>

            <View style={styles.infoBoxRow}>
              <View
                style={[styles.infoIconBox, { backgroundColor: "#d1fae5" }]}
              >
                <ClockIcon />
              </View>
              <View style={styles.infoBoxContent}>
                <Text style={styles.infoBoxLabel}>ORA</Text>
                <Text style={styles.infoBoxValue}>{eveniment.ora}</Text>
              </View>
            </View>

            <View style={styles.infoBoxRow}>
              <View
                style={[styles.infoIconBox, { backgroundColor: "#fee2e2" }]}
              >
                <MapPinIcon />
              </View>
              <View style={styles.infoBoxContent}>
                <Text style={styles.infoBoxLabel}>LOCAȚIE</Text>
                <Text style={styles.infoBoxValue}>{eveniment.locatie}</Text>
              </View>
            </View>
          </View>

          {/* Despre eveniment */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Despre eveniment</Text>
            <Text style={styles.sectionText}>{eveniment.detalii}</Text>
          </View>

          {/* Linkuri tickets */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Cumpără bilete</Text>
            {eveniment.linkuriTickets.map((link: TicketLink, index: number) => (
              <TouchableOpacity
                key={index}
                style={styles.ticketButton}
                onPress={() => handleTicketPress(link.url)}
                activeOpacity={0.8}
              >
                <Text style={styles.ticketButtonText}>
                  📱 Bilete pe {link.nume}
                </Text>
                <Text style={styles.ticketButtonArrow}>→</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

function EcranSavedShows({
  savedEvents,
  onSelectEvent,
  onBack,
  onToggleSave,
}: {
  savedEvents: Set<number>;
  onSelectEvent: (eveniment: Eveniment) => void;
  onBack: () => void;
  onToggleSave: (eventId: number) => void;
}) {
  const insets = useSafeAreaInsets();
  const savedEventsList = EVENIMENTE.filter((e) => savedEvents.has(e.id));

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" translucent />

      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top }]}>
        <View style={styles.headerTop}>
          <TouchableOpacity onPress={onBack} style={styles.backButtonHeader}>
            <BackIcon />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Evenimente Salvate</Text>
          <View style={styles.headerSpacer} />
        </View>
      </View>

      {/* Lista evenimente salvate */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        {savedEventsList.length === 0 ? (
          <View style={styles.noResultsContainer}>
            <Text style={styles.noResultsText}>
              Nu ai evenimente salvate încă
            </Text>
            <Text style={styles.noResultsSubtext}>
              Apasă pe{" "}
              <MaterialIcons name="bookmark" size={20} color="#FFD700" /> pentru
              a salva evenimente
            </Text>
          </View>
        ) : (
          savedEventsList.map((eveniment) => (
            <TouchableOpacity
              key={eveniment.id}
              style={styles.evenimentCard}
              onPress={() => onSelectEvent(eveniment)}
              activeOpacity={0.7}
            >
              <View
                style={[
                  styles.evenimentBanner,
                  { backgroundColor: eveniment.culoare },
                ]}
              >
                <Image
                  source={{ uri: eveniment.imageUrl }}
                  style={styles.evenimentBannerImage}
                  contentFit="cover"
                />
                <View style={styles.bannerOverlay} />
                <View style={styles.categoryBadge}>
                  <Text style={styles.categoryText}>{eveniment.categorie}</Text>
                </View>
                <TouchableOpacity
                  style={styles.bookmarkButton}
                  onPress={(e) => {
                    e.stopPropagation();
                    onToggleSave(eveniment.id);
                  }}
                >
                  <MaterialIcons name="bookmark" size={20} color="#FFD700" />
                </TouchableOpacity>
              </View>

              <View style={styles.evenimentContent}>
                <Text style={styles.evenimentTitlu}>{eveniment.titlu}</Text>
                <Text style={styles.evenimentDescriere}>
                  {eveniment.descriere}
                </Text>

                <View style={styles.evenimentInfo}>
                  <View style={styles.infoRow}>
                    <CalendarIcon />
                    <Text style={styles.infoText}>
                      {eveniment.dataFormatata}
                    </Text>
                  </View>
                  <View style={styles.infoRow}>
                    <ClockIcon />
                    <Text style={styles.infoText}>{eveniment.ora}</Text>
                  </View>
                </View>

                <View style={styles.infoRow}>
                  <MapPinIcon />
                  <Text style={[styles.infoText, styles.locatieText]}>
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

function EcranFilter({
  onBack,
  selectedCategories,
  onToggleCategory,
}: {
  onBack: () => void;
  selectedCategories: Set<string>;
  onToggleCategory: (category: string) => void;
}) {
  const insets = useSafeAreaInsets();

  // Category icons mapping
  const categoryIcons: Record<string, string> = {
    Muzică: "🎵",
    Teatru: "🎭",
    Artă: "🎨",
    Film: "🎬",
    Gastronomie: "🍴",
    Conferință: "👥",
    Sport: "🏆",
  };

  const categories = [
    "Muzică",
    "Teatru",
    "Artă",
    "Film",
    "Gastronomie",
    "Conferință",
    "Sport",
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" translucent />

      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top }]}>
        <View style={styles.headerTop}>
          <View style={styles.headerSpacer} />
          <Text style={styles.headerTitle}>Filtrează</Text>
          <TouchableOpacity onPress={onBack} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>✕</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.scrollView}>
        {/* Category Filter Section */}
        <View style={styles.filterSection}>
          <Text style={styles.filterSectionTitle}>
            Filtrează după categorie
          </Text>
          <View style={styles.categoryButtons}>
            {categories.map((category) => {
              const isSelected = selectedCategories.has(category);
              return (
                <TouchableOpacity
                  key={category}
                  style={[
                    styles.categoryButton,
                    isSelected && styles.categoryButtonSelected,
                  ]}
                  onPress={() => onToggleCategory(category)}
                >
                  <Text style={styles.categoryIcon}>
                    {categoryIcons[category] || "•"}
                  </Text>
                  <Text
                    style={[
                      styles.categoryButtonText,
                      isSelected && styles.categoryButtonTextSelected,
                    ]}
                  >
                    {category}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

function EcranDatePicker({
  onBack,
  selectedDates,
  onToggleDate,
  onClearAll,
}: {
  onBack: () => void;
  selectedDates: Set<string>;
  onToggleDate: (date: string) => void;
  onClearAll: () => void;
}) {
  const insets = useSafeAreaInsets();

  // Get all unique dates that have events
  const eventDates = new Set(EVENIMENTE.map((e) => e.data));

  // Format date to Romanian format (e.g., "mie., 14 ian. 2026")
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString + "T00:00:00"); // Add time to avoid timezone issues
    const dayNames = ["dum.", "lun.", "mar.", "mie.", "joi", "vin.", "sâm."];
    const monthNames = [
      "ian.",
      "feb.",
      "mar.",
      "apr.",
      "mai",
      "iun.",
      "iul.",
      "aug.",
      "sept.",
      "oct.",
      "nov.",
      "dec.",
    ];
    const dayName = dayNames[date.getDay()];
    const day = date.getDate();
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
    // Format: "mie., 14 ian. 2026" (matches the image format)
    return `${dayName} ${day} ${month} ${year}`;
  };

  // Count events for a specific date
  const getEventCount = (dateString: string): number => {
    return EVENIMENTE.filter((e) => e.data === dateString).length;
  };

  // Convert selectedDates Set to sorted array
  const selectedDatesArray = Array.from(selectedDates).sort();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" translucent />

      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top }]}>
        <View style={styles.headerTop}>
          <TouchableOpacity onPress={onBack} style={styles.backButtonHeader}>
            <BackIcon />
          </TouchableOpacity>
          <View style={styles.headerTitleContainer}>
            <Text style={styles.headerTitle}>Filtrează după dată</Text>
            {selectedDates.size > 0 && (
              <Text style={styles.headerSubtitle}>
                ({selectedDates.size}{" "}
                {selectedDates.size === 1 ? "zi selectată" : "zile selectate"})
              </Text>
            )}
          </View>
          <TouchableOpacity onPress={onBack} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>✕</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.scrollView}>
        <View style={styles.filterSection}>
          <View style={styles.calendarContainer}>
            <Calendar
              minDate={new Date().toISOString().split("T")[0]}
              theme={{
                backgroundColor: "#FFF",
                calendarBackground: "#FFF",
                textSectionTitleColor: "#999",
                selectedDayBackgroundColor: "#5B7FFF",
                selectedDayTextColor: "#FFF",
                todayTextColor: "#5B7FFF",
                dayTextColor: "#999", // Gray for dates without events (default)
                textDisabledColor: "#CCC",
                dotColor: "#5B7FFF",
                selectedDotColor: "#FFF",
                arrowColor: "#5B7FFF",
                monthTextColor: "#333",
                textDayFontWeight: "400",
                textMonthFontWeight: "bold",
                textDayHeaderFontWeight: "600",
                textDayFontSize: 16,
                textMonthFontSize: 18,
                textDayHeaderFontSize: 13,
              }}
              style={styles.calendar}
              dayComponent={({ date, state }: any) => {
                const dateStr = date?.dateString;
                const hasEvent = eventDates.has(dateStr);
                const isSelected = selectedDates.has(dateStr);
                const isToday =
                  dateStr === new Date().toISOString().split("T")[0];

                return (
                  <TouchableOpacity
                    style={[
                      styles.calendarDayContainer,
                      isSelected && styles.calendarDaySelected,
                      state === "disabled" && styles.calendarDayDisabled,
                    ]}
                    onPress={() => {
                      if (hasEvent && state !== "disabled") {
                        onToggleDate(dateStr);
                      }
                    }}
                    disabled={!hasEvent || state === "disabled"}
                  >
                    <Text
                      style={[
                        styles.calendarDayText,
                        hasEvent && styles.calendarDayTextWithEvent,
                        isSelected && styles.calendarDayTextSelected,
                        isToday &&
                          !hasEvent &&
                          !isSelected &&
                          styles.calendarDayTextToday,
                        state === "disabled" && styles.calendarDayTextDisabled,
                      ]}
                    >
                      {date?.day}
                    </Text>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        </View>

        {/* Selected Dates Section */}
        {selectedDates.size > 0 && (
          <View style={styles.selectedDatesSection}>
            <View style={styles.selectedDatesContainer}>
              {selectedDatesArray.map((dateString) => {
                const eventCount = getEventCount(dateString);
                return (
                  <View key={dateString} style={styles.selectedDateChip}>
                    <Text style={styles.selectedDateText}>
                      {formatDate(dateString)} ({eventCount}{" "}
                      {eventCount === 1 ? "ev." : "ev."})
                    </Text>
                    <TouchableOpacity
                      onPress={() => onToggleDate(dateString)}
                      style={styles.chipRemoveButton}
                    >
                      <Text style={styles.chipRemoveIcon}>✕</Text>
                    </TouchableOpacity>
                  </View>
                );
              })}
            </View>
            <TouchableOpacity
              onPress={onClearAll}
              style={styles.clearAllButton}
            >
              <Text style={styles.clearAllIcon}>✕</Text>
              <Text style={styles.clearAllText}>Șterge toate datele</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

export default function App() {
  const [evenimentSelectat, setEvenimentSelectat] = useState<Eveniment | null>(
    null
  );
  const [savedEvents, setSavedEvents] = useState<Set<number>>(new Set());
  const [showSavedShows, setShowSavedShows] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<Set<string>>(
    new Set()
  );
  const [selectedDates, setSelectedDates] = useState<Set<string>>(new Set());

  // Animation values for crossfade
  const listOpacity = useSharedValue(1);
  const detailsOpacity = useSharedValue(0);
  const savedOpacity = useSharedValue(0);
  const filterOpacity = useSharedValue(0);
  const datePickerOpacity = useSharedValue(0);

  const toggleSave = (eventId: number) => {
    setSavedEvents((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(eventId)) {
        newSet.delete(eventId);
      } else {
        newSet.add(eventId);
      }
      return newSet;
    });
  };

  useEffect(() => {
    if (
      showDatePicker &&
      !evenimentSelectat &&
      !showSavedShows &&
      !showFilter
    ) {
      listOpacity.value = withTiming(0, { duration: 200 });
      detailsOpacity.value = withTiming(0, { duration: 200 });
      savedOpacity.value = withTiming(0, { duration: 200 });
      filterOpacity.value = withTiming(0, { duration: 200 });
      datePickerOpacity.value = withTiming(1, { duration: 200 });
    } else if (showFilter && !evenimentSelectat && !showSavedShows) {
      listOpacity.value = withTiming(0, { duration: 200 });
      detailsOpacity.value = withTiming(0, { duration: 200 });
      savedOpacity.value = withTiming(0, { duration: 200 });
      datePickerOpacity.value = withTiming(0, { duration: 200 });
      filterOpacity.value = withTiming(1, { duration: 200 });
    } else if (showSavedShows && !evenimentSelectat) {
      listOpacity.value = withTiming(0, { duration: 200 });
      detailsOpacity.value = withTiming(0, { duration: 200 });
      filterOpacity.value = withTiming(0, { duration: 200 });
      datePickerOpacity.value = withTiming(0, { duration: 200 });
      savedOpacity.value = withTiming(1, { duration: 200 });
    } else if (evenimentSelectat) {
      // Show details, hide list and saved
      listOpacity.value = withTiming(0, { duration: 200 });
      savedOpacity.value = withTiming(0, { duration: 200 });
      filterOpacity.value = withTiming(0, { duration: 200 });
      datePickerOpacity.value = withTiming(0, { duration: 200 });
      detailsOpacity.value = withTiming(1, { duration: 200 });
    } else {
      // Show list, hide details and saved
      detailsOpacity.value = withTiming(0, { duration: 200 });
      savedOpacity.value = withTiming(0, { duration: 200 });
      filterOpacity.value = withTiming(0, { duration: 200 });
      datePickerOpacity.value = withTiming(0, { duration: 200 });
      listOpacity.value = withTiming(1, { duration: 200 });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [evenimentSelectat, showSavedShows, showFilter, showDatePicker]);

  const listAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: listOpacity.value,
    };
  });

  const detailsAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: detailsOpacity.value,
    };
  });

  const savedAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: savedOpacity.value,
    };
  });

  const filterAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: filterOpacity.value,
    };
  });

  const datePickerAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: datePickerOpacity.value,
    };
  });

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(category)) {
        newSet.delete(category);
      } else {
        newSet.add(category);
      }
      return newSet;
    });
  };

  const toggleDate = (date: string) => {
    setSelectedDates((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(date)) {
        newSet.delete(date);
      } else {
        newSet.add(date);
      }
      return newSet;
    });
  };

  // Apply filters to events
  const filteredEvents = EVENIMENTE.filter((event) => {
    // Category filter
    if (
      selectedCategories.size > 0 &&
      !selectedCategories.has(event.categorie)
    ) {
      return false;
    }
    // Date filter - show events from all selected dates
    if (selectedDates.size > 0 && !selectedDates.has(event.data)) {
      return false;
    }
    return true;
  });

  return (
    <View style={styles.container}>
      {!evenimentSelectat &&
        !showSavedShows &&
        !showFilter &&
        !showDatePicker && (
          <Animated.View
            style={[StyleSheet.absoluteFill, listAnimatedStyle]}
            pointerEvents="auto"
          >
            <EcranPrincipal
              onSelectEvent={setEvenimentSelectat}
              savedEvents={savedEvents}
              onToggleSave={toggleSave}
              onNavigateToSaved={() => setShowSavedShows(true)}
              onNavigateToFilter={() => setShowFilter(true)}
              onNavigateToDatePicker={() => setShowDatePicker(true)}
              filteredEvents={filteredEvents}
            />
          </Animated.View>
        )}

      {showDatePicker &&
        !evenimentSelectat &&
        !showSavedShows &&
        !showFilter && (
          <Animated.View
            style={[StyleSheet.absoluteFill, datePickerAnimatedStyle]}
            pointerEvents="auto"
          >
            <EcranDatePicker
              onBack={() => setShowDatePicker(false)}
              selectedDates={selectedDates}
              onToggleDate={toggleDate}
              onClearAll={() => setSelectedDates(new Set())}
            />
          </Animated.View>
        )}

      {showFilter &&
        !evenimentSelectat &&
        !showSavedShows &&
        !showDatePicker && (
          <Animated.View
            style={[StyleSheet.absoluteFill, filterAnimatedStyle]}
            pointerEvents="auto"
          >
            <EcranFilter
              onBack={() => setShowFilter(false)}
              selectedCategories={selectedCategories}
              onToggleCategory={toggleCategory}
            />
          </Animated.View>
        )}

      {showSavedShows && !evenimentSelectat && (
        <Animated.View
          style={[StyleSheet.absoluteFill, savedAnimatedStyle]}
          pointerEvents="auto"
        >
          <EcranSavedShows
            savedEvents={savedEvents}
            onSelectEvent={(event) => {
              setShowSavedShows(false);
              setEvenimentSelectat(event);
            }}
            onBack={() => {
              setShowSavedShows(false);
              setEvenimentSelectat(null);
            }}
            onToggleSave={toggleSave}
          />
        </Animated.View>
      )}

      {evenimentSelectat && (
        <Animated.View
          style={[StyleSheet.absoluteFill, detailsAnimatedStyle]}
          pointerEvents="auto"
        >
          <EcranDetalii
            eveniment={evenimentSelectat}
            onBack={() => {
              setEvenimentSelectat(null);
              // If we were in saved shows, go back to it
              if (savedEvents.has(evenimentSelectat.id)) {
                setShowSavedShows(true);
              }
            }}
            savedEvents={savedEvents}
            onToggleSave={toggleSave}
          />
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    overflow: "hidden",
  },
  icon: {
    fontSize: 20,
  },
  header: {
    backgroundColor: "#5B7FFF",
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 16,
    position: "relative",
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  citySelector: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFF",
    marginRight: 8,
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
  noResultsContainer: {
    padding: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  noResultsText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },
  noResultsSubtext: {
    fontSize: 14,
    color: "#999",
    textAlign: "center",
    marginTop: 8,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
  },
  evenimentCard: {
    backgroundColor: "#FFF",
    marginBottom: 16,
    borderRadius: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  evenimentBanner: {
    height: 150,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    overflow: "hidden",
  },
  evenimentBannerImage: {
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
  bookmarkButton: {
    position: "absolute",
    bottom: 12,
    right: 12,
    backgroundColor: "rgba(0,0,0,0.3)",
    padding: 8,
    borderRadius: 8,
  },
  headerSpacer: {
    width: 40,
  },
  backButtonHeader: {
    padding: 8,
    marginRight: 8,
  },
  evenimentContent: {
    padding: 16,
  },
  evenimentTitlu: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 4,
  },
  evenimentDescriere: {
    fontSize: 14,
    color: "#666",
    marginBottom: 12,
  },
  evenimentInfo: {
    flexDirection: "row",
    gap: 16,
    marginBottom: 8,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  infoText: {
    fontSize: 13,
    color: "#666",
  },
  locatieText: {
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
  closeButton: {
    padding: 8,
  },
  closeButtonText: {
    color: "#FFF",
    fontSize: 24,
    fontWeight: "300",
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
  headerTitleContainer: {
    flex: 1,
    alignItems: "center",
  },
  headerSubtitle: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.8)",
    marginTop: 4,
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
