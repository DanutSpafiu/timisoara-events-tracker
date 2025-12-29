import { useState } from "react";
import type { Eveniment } from "@/types/events";

export function useAppState() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [evenimentSelectat, setEvenimentSelectat] = useState<Eveniment | null>(null);
  const [savedEvents, setSavedEvents] = useState<Set<number>>(new Set());
  const [showSavedShows, setShowSavedShows] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showProfileEditor, setShowProfileEditor] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<Set<string>>(new Set());
  const [selectedDates, setSelectedDates] = useState<Set<string>>(new Set());
  
  // Profile state
  const [userName, setUserName] = useState("User");
  const [profilePicture, setProfilePicture] = useState<string | null>(null);
  const [userInterests, setUserInterests] = useState<Set<string>>(new Set());

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

  const toggleInterest = (interest: string) => {
    setUserInterests((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(interest)) {
        newSet.delete(interest);
      } else {
        newSet.add(interest);
      }
      return newSet;
    });
  };

  return {
    // State
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
    // Setters
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
    // Actions
    toggleSave,
    toggleCategory,
    toggleDate,
    toggleInterest,
  };
}

