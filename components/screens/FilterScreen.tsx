import React from "react";
import { ScrollView, StatusBar, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { filterStyles } from "./styles/filterStyles";

interface FilterScreenProps {
  onBack: () => void;
  selectedCategories: Set<string>;
  onToggleCategory: (category: string) => void;
}

export function FilterScreen({
  onBack,
  selectedCategories,
  onToggleCategory,
}: FilterScreenProps) {
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
    <View style={filterStyles.container}>
      <StatusBar barStyle="light-content" translucent />

      {/* Header */}
      <View style={[filterStyles.header, { paddingTop: insets.top }]}>
        <View style={filterStyles.headerTop}>
          <View style={filterStyles.headerSpacer} />
          <Text style={filterStyles.headerTitle}>Filtrează</Text>
          <TouchableOpacity onPress={onBack} style={filterStyles.closeButton}>
            <Text style={filterStyles.closeButtonText}>✕</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={filterStyles.scrollView}>
        {/* Category Filter Section */}
        <View style={filterStyles.filterSection}>
          <Text style={filterStyles.filterSectionTitle}>
            Filtrează după categorie
          </Text>
          <View style={filterStyles.categoryButtons}>
            {categories.map((category) => {
              const isSelected = selectedCategories.has(category);
              return (
                <TouchableOpacity
                  key={category}
                  style={[
                    filterStyles.categoryButton,
                    isSelected && filterStyles.categoryButtonSelected,
                  ]}
                  onPress={() => onToggleCategory(category)}
                >
                  <Text style={filterStyles.categoryIcon}>
                    {categoryIcons[category] || "•"}
                  </Text>
                  <Text
                    style={[
                      filterStyles.categoryButtonText,
                      isSelected && filterStyles.categoryButtonTextSelected,
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

