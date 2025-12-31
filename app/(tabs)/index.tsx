import { DatePickerScreen } from "@/components/screens/DatePickerScreen";
import { EventDetailScreen } from "@/components/screens/EventDetailScreen";
import { EventListScreen } from "@/components/screens/EventListScreen";
import { FilterScreen } from "@/components/screens/FilterScreen";
import { LoginScreen } from "@/components/screens/LoginScreen";
import { ProfileEditorScreen } from "@/components/screens/ProfileEditorScreen";
import { SavedShowsScreen } from "@/components/screens/SavedShowsScreen";
import { EVENIMENTE } from "@/constants/events";
import { useAppState } from "@/hooks/useAppState";
import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

export default function App() {
  const {
    isLoggedIn,
    evenimentSelectat,
    savedEvents,
    showSavedShows,
    showFilter,
    showDatePicker,
    showProfileEditor,
    selectedCategories,
    selectedDates,
    userName,
    profilePicture,
    userInterests,
    setIsLoggedIn,
    setEvenimentSelectat,
    setShowSavedShows,
    setShowFilter,
    setShowDatePicker,
    setShowProfileEditor,
    setSelectedDates,
    setUserName,
    setProfilePicture,
    setUserInterests,
    toggleSave,
    toggleCategory,
    toggleDate,
  } = useAppState();

  // Animation values for crossfade
  const listOpacity = useSharedValue(1);
  const detailsOpacity = useSharedValue(0);
  const savedOpacity = useSharedValue(0);
  const filterOpacity = useSharedValue(0);
  const datePickerOpacity = useSharedValue(0);
  const profileEditorOpacity = useSharedValue(0);

  useEffect(() => {
    if (
      showProfileEditor &&
      !evenimentSelectat &&
      !showSavedShows &&
      !showFilter &&
      !showDatePicker
    ) {
      listOpacity.value = withTiming(0, { duration: 200 });
      detailsOpacity.value = withTiming(0, { duration: 200 });
      savedOpacity.value = withTiming(0, { duration: 200 });
      filterOpacity.value = withTiming(0, { duration: 200 });
      datePickerOpacity.value = withTiming(0, { duration: 200 });
      profileEditorOpacity.value = withTiming(1, { duration: 200 });
    } else if (
      showDatePicker &&
      !evenimentSelectat &&
      !showSavedShows &&
      !showFilter &&
      !showProfileEditor
    ) {
      listOpacity.value = withTiming(0, { duration: 200 });
      detailsOpacity.value = withTiming(0, { duration: 200 });
      savedOpacity.value = withTiming(0, { duration: 200 });
      filterOpacity.value = withTiming(0, { duration: 200 });
      profileEditorOpacity.value = withTiming(0, { duration: 200 });
      datePickerOpacity.value = withTiming(1, { duration: 200 });
    } else if (
      showFilter &&
      !evenimentSelectat &&
      !showSavedShows &&
      !showProfileEditor
    ) {
      listOpacity.value = withTiming(0, { duration: 200 });
      detailsOpacity.value = withTiming(0, { duration: 200 });
      savedOpacity.value = withTiming(0, { duration: 200 });
      datePickerOpacity.value = withTiming(0, { duration: 200 });
      profileEditorOpacity.value = withTiming(0, { duration: 200 });
      filterOpacity.value = withTiming(1, { duration: 200 });
    } else if (showSavedShows && !evenimentSelectat && !showProfileEditor) {
      listOpacity.value = withTiming(0, { duration: 200 });
      detailsOpacity.value = withTiming(0, { duration: 200 });
      filterOpacity.value = withTiming(0, { duration: 200 });
      datePickerOpacity.value = withTiming(0, { duration: 200 });
      profileEditorOpacity.value = withTiming(0, { duration: 200 });
      savedOpacity.value = withTiming(1, { duration: 200 });
    } else if (evenimentSelectat && !showProfileEditor) {
      // Show details, hide list and saved
      listOpacity.value = withTiming(0, { duration: 200 });
      savedOpacity.value = withTiming(0, { duration: 200 });
      filterOpacity.value = withTiming(0, { duration: 200 });
      datePickerOpacity.value = withTiming(0, { duration: 200 });
      profileEditorOpacity.value = withTiming(0, { duration: 200 });
      detailsOpacity.value = withTiming(1, { duration: 200 });
    } else if (!showProfileEditor) {
      // Show list, hide details and saved
      detailsOpacity.value = withTiming(0, { duration: 200 });
      savedOpacity.value = withTiming(0, { duration: 200 });
      filterOpacity.value = withTiming(0, { duration: 200 });
      datePickerOpacity.value = withTiming(0, { duration: 200 });
      profileEditorOpacity.value = withTiming(0, { duration: 200 });
      listOpacity.value = withTiming(1, { duration: 200 });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    evenimentSelectat,
    showSavedShows,
    showFilter,
    showDatePicker,
    showProfileEditor,
  ]);

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

  const profileEditorAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: profileEditorOpacity.value,
    };
  });

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

  // Show login screen if not logged in
  if (!isLoggedIn) {
    return <LoginScreen onLogin={() => setIsLoggedIn(true)} />;
  }

  const handleProfileSave = (
    name: string,
    picture: string | null,
    interests: Set<string>
  ) => {
    setUserName(name);
    setProfilePicture(picture);
    setUserInterests(interests);
  };

  return (
    <View style={styles.container}>
      {!evenimentSelectat &&
        !showSavedShows &&
        !showFilter &&
        !showDatePicker &&
        !showProfileEditor && (
          <Animated.View
            style={[StyleSheet.absoluteFill, listAnimatedStyle]}
            pointerEvents="auto"
          >
            <EventListScreen
              onSelectEvent={setEvenimentSelectat}
              savedEvents={savedEvents}
              onToggleSave={toggleSave}
              onNavigateToSaved={() => setShowSavedShows(true)}
              onNavigateToFilter={() => setShowFilter(true)}
              onNavigateToDatePicker={() => setShowDatePicker(true)}
              onNavigateToProfileEditor={() => setShowProfileEditor(true)}
              userName={userName}
              profilePicture={profilePicture}
              filteredEvents={filteredEvents}
            />
          </Animated.View>
        )}

      {showProfileEditor &&
        !evenimentSelectat &&
        !showSavedShows &&
        !showFilter &&
        !showDatePicker && (
          <Animated.View
            style={[StyleSheet.absoluteFill, profileEditorAnimatedStyle]}
            pointerEvents="auto"
          >
            <ProfileEditorScreen
              onBack={() => setShowProfileEditor(false)}
              userName={userName}
              profilePicture={profilePicture}
              userInterests={userInterests}
              onSave={handleProfileSave}
            />
          </Animated.View>
        )}

      {showDatePicker &&
        !evenimentSelectat &&
        !showSavedShows &&
        !showFilter &&
        !showProfileEditor && (
          <Animated.View
            style={[StyleSheet.absoluteFill, datePickerAnimatedStyle]}
            pointerEvents="auto"
          >
            <DatePickerScreen
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
        !showDatePicker &&
        !showProfileEditor && (
          <Animated.View
            style={[StyleSheet.absoluteFill, filterAnimatedStyle]}
            pointerEvents="auto"
          >
            <FilterScreen
              onBack={() => setShowFilter(false)}
              selectedCategories={selectedCategories}
              onToggleCategory={toggleCategory}
            />
          </Animated.View>
        )}

      {showSavedShows && !evenimentSelectat && !showProfileEditor && (
        <Animated.View
          style={[StyleSheet.absoluteFill, savedAnimatedStyle]}
          pointerEvents="auto"
        >
          <SavedShowsScreen
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

      {evenimentSelectat && !showProfileEditor && (
        <Animated.View
          style={[StyleSheet.absoluteFill, detailsAnimatedStyle]}
          pointerEvents="auto"
        >
          <EventDetailScreen
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
});
