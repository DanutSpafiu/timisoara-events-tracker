import { DatePickerScreen } from "@/components/screens/DatePickerScreen";
import { EventDetailScreen } from "@/components/screens/EventDetailScreen";
import { EventListScreen } from "@/components/screens/EventListScreen";
import { FilterScreen } from "@/components/screens/FilterScreen";
import { LoginScreen } from "@/components/screens/LoginScreen";
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
    selectedCategories,
    selectedDates,
    setIsLoggedIn,
    setEvenimentSelectat,
    setShowSavedShows,
    setShowFilter,
    setShowDatePicker,
    setSelectedDates,
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
            <EventListScreen
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
        !showDatePicker && (
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

      {showSavedShows && !evenimentSelectat && (
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

      {evenimentSelectat && (
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
