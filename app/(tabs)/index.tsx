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
];

interface EcranPrincipalProps {
  onSelectEvent: (eveniment: Eveniment) => void;
  savedEvents: Set<number>;
  onToggleSave: (eventId: number) => void;
  onNavigateToSaved: () => void;
}

function EcranPrincipal({
  onSelectEvent,
  savedEvents,
  onToggleSave,
  onNavigateToSaved,
}: EcranPrincipalProps) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const insets = useSafeAreaInsets();

  // Filter events based on search query
  const filteredEvents = EVENIMENTE.filter((eveniment) =>
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
          <TouchableOpacity style={styles.profileButton}>
            <UserIcon />
          </TouchableOpacity>
        </View>

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
            style={styles.iconButton}
            onPress={onNavigateToSaved}
          >
            <Text style={styles.savedIcon}>⭐</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
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
              Apasă pe 🔖 pentru a salva evenimente
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

export default function App() {
  const [evenimentSelectat, setEvenimentSelectat] = useState<Eveniment | null>(
    null
  );
  const [savedEvents, setSavedEvents] = useState<Set<number>>(new Set());
  const [showSavedShows, setShowSavedShows] = useState(false);

  // Animation values for crossfade
  const listOpacity = useSharedValue(1);
  const detailsOpacity = useSharedValue(0);
  const savedOpacity = useSharedValue(0);

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
    if (showSavedShows && !evenimentSelectat) {
      listOpacity.value = withTiming(0, { duration: 200 });
      detailsOpacity.value = withTiming(0, { duration: 200 });
      savedOpacity.value = withTiming(1, { duration: 200 });
    } else if (evenimentSelectat) {
      // Show details, hide list and saved
      listOpacity.value = withTiming(0, { duration: 200 });
      savedOpacity.value = withTiming(0, { duration: 200 });
      detailsOpacity.value = withTiming(1, { duration: 200 });
    } else {
      // Show list, hide details and saved
      detailsOpacity.value = withTiming(0, { duration: 200 });
      savedOpacity.value = withTiming(0, { duration: 200 });
      listOpacity.value = withTiming(1, { duration: 200 });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [evenimentSelectat, showSavedShows]);

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

  return (
    <View style={styles.container}>
      {!evenimentSelectat && !showSavedShows && (
        <Animated.View
          style={[StyleSheet.absoluteFill, listAnimatedStyle]}
          pointerEvents="auto"
        >
          <EcranPrincipal
            onSelectEvent={setEvenimentSelectat}
            savedEvents={savedEvents}
            onToggleSave={toggleSave}
            onNavigateToSaved={() => setShowSavedShows(true)}
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
  savedIcon: {
    fontSize: 20,
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
});
