import React from "react";
import { ScrollView, StatusBar, Text, TouchableOpacity, View } from "react-native";
import { Calendar } from "react-native-calendars";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BackIcon } from "@/components/icons";
import { EVENIMENTE } from "@/constants/events";
import { datePickerStyles } from "./styles/datePickerStyles";

interface DatePickerScreenProps {
  onBack: () => void;
  selectedDates: Set<string>;
  onToggleDate: (date: string) => void;
  onClearAll: () => void;
}

export function DatePickerScreen({
  onBack,
  selectedDates,
  onToggleDate,
  onClearAll,
}: DatePickerScreenProps) {
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
    <View style={datePickerStyles.container}>
      <StatusBar barStyle="light-content" translucent />

      {/* Header */}
      <View style={[datePickerStyles.header, { paddingTop: insets.top }]}>
        <View style={datePickerStyles.headerTop}>
          <TouchableOpacity
            onPress={onBack}
            style={datePickerStyles.backButtonHeader}
          >
            <BackIcon />
          </TouchableOpacity>
          <View style={datePickerStyles.headerTitleContainer}>
            <Text style={datePickerStyles.headerTitle}>
              Filtrează după dată
            </Text>
            {selectedDates.size > 0 && (
              <Text style={datePickerStyles.headerSubtitle}>
                ({selectedDates.size}{" "}
                {selectedDates.size === 1 ? "zi selectată" : "zile selectate"})
              </Text>
            )}
          </View>
          <TouchableOpacity onPress={onBack} style={datePickerStyles.closeButton}>
            <Text style={datePickerStyles.closeButtonText}>✕</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={datePickerStyles.scrollView}>
        <View style={datePickerStyles.filterSection}>
          <View style={datePickerStyles.calendarContainer}>
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
              style={datePickerStyles.calendar}
              dayComponent={({ date, state }: any) => {
                const dateStr = date?.dateString;
                const hasEvent = eventDates.has(dateStr);
                const isSelected = selectedDates.has(dateStr);
                const isToday =
                  dateStr === new Date().toISOString().split("T")[0];

                return (
                  <TouchableOpacity
                    style={[
                      datePickerStyles.calendarDayContainer,
                      isSelected && datePickerStyles.calendarDaySelected,
                      state === "disabled" && datePickerStyles.calendarDayDisabled,
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
                        datePickerStyles.calendarDayText,
                        hasEvent && datePickerStyles.calendarDayTextWithEvent,
                        isSelected && datePickerStyles.calendarDayTextSelected,
                        isToday &&
                          !hasEvent &&
                          !isSelected &&
                          datePickerStyles.calendarDayTextToday,
                        state === "disabled" &&
                          datePickerStyles.calendarDayTextDisabled,
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
          <View style={datePickerStyles.selectedDatesSection}>
            <View style={datePickerStyles.selectedDatesContainer}>
              {selectedDatesArray.map((dateString) => {
                const eventCount = getEventCount(dateString);
                return (
                  <View key={dateString} style={datePickerStyles.selectedDateChip}>
                    <Text style={datePickerStyles.selectedDateText}>
                      {formatDate(dateString)} ({eventCount}{" "}
                      {eventCount === 1 ? "ev." : "ev."})
                    </Text>
                    <TouchableOpacity
                      onPress={() => onToggleDate(dateString)}
                      style={datePickerStyles.chipRemoveButton}
                    >
                      <Text style={datePickerStyles.chipRemoveIcon}>✕</Text>
                    </TouchableOpacity>
                  </View>
                );
              })}
            </View>
            <TouchableOpacity
              onPress={onClearAll}
              style={datePickerStyles.clearAllButton}
            >
              <Text style={datePickerStyles.clearAllIcon}>✕</Text>
              <Text style={datePickerStyles.clearAllText}>
                Șterge toate datele
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

