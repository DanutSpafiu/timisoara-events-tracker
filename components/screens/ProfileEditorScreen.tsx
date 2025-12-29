import { BackIcon } from "@/components/icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import React from "react";
import {
  Alert,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { profileEditorStyles } from "./styles/profileEditorStyles";

interface ProfileEditorScreenProps {
  onBack: () => void;
  userName: string;
  profilePicture: string | null;
  userInterests: Set<string>;
  onSave: (
    name: string,
    picture: string | null,
    interests: Set<string>
  ) => void;
}

export function ProfileEditorScreen({
  onBack,
  userName: initialUserName,
  profilePicture: initialProfilePicture,
  userInterests: initialInterests,
  onSave,
}: ProfileEditorScreenProps) {
  const insets = useSafeAreaInsets();
  const [userName, setUserName] = React.useState(initialUserName);
  const [profilePicture, setProfilePicture] = React.useState<string | null>(
    initialProfilePicture
  );
  const [userInterests, setUserInterests] = React.useState<Set<string>>(
    new Set(initialInterests)
  );

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

  const handleSave = () => {
    onSave(userName, profilePicture, userInterests);
    onBack();
  };

  const handlePicturePress = async () => {
    // Request permissions
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permisiune necesară",
        "Avem nevoie de permisiunea de acces la galeria foto pentru a selecta o imagine."
      );
      return;
    }

    // Show action sheet to choose between camera and library
    Alert.alert(
      "Selectează imaginea",
      "Alege o opțiune",
      [
        {
          text: "Anulează",
          style: "cancel",
        },
        {
          text: "Camera",
          onPress: async () => {
            const cameraStatus =
              await ImagePicker.requestCameraPermissionsAsync();
            if (cameraStatus.status !== "granted") {
              Alert.alert(
                "Permisiune necesară",
                "Avem nevoie de permisiunea de acces la cameră."
              );
              return;
            }

            const result = await ImagePicker.launchCameraAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.Images,
              allowsEditing: true,
              aspect: [1, 1],
              quality: 0.8,
            });

            if (!result.canceled && result.assets[0]) {
              setProfilePicture(result.assets[0].uri);
            }
          },
        },
        {
          text: "Galerie",
          onPress: async () => {
            const result = await ImagePicker.launchImageLibraryAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.Images,
              allowsEditing: true,
              aspect: [1, 1],
              quality: 0.8,
            });

            if (!result.canceled && result.assets[0]) {
              setProfilePicture(result.assets[0].uri);
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={profileEditorStyles.container}>
      <StatusBar barStyle="light-content" translucent />

      {/* Header */}
      <View style={[profileEditorStyles.header, { paddingTop: insets.top }]}>
        <View style={profileEditorStyles.headerTop}>
          <TouchableOpacity
            onPress={onBack}
            style={profileEditorStyles.backButtonHeader}
          >
            <BackIcon />
          </TouchableOpacity>
          <View style={profileEditorStyles.headerTitleContainer}>
            <Text style={profileEditorStyles.headerTitle}>
              Editează profilul
            </Text>
          </View>
          <View style={profileEditorStyles.headerSpacer} />
        </View>
      </View>

      <ScrollView style={profileEditorStyles.scrollView}>
        {/* Profile Picture Section */}
        <View style={profileEditorStyles.profileSection}>
          <View style={profileEditorStyles.profilePictureContainer}>
            <TouchableOpacity
              style={profileEditorStyles.profilePicture}
              onPress={handlePicturePress}
              activeOpacity={0.8}
            >
              {profilePicture ? (
                <Image
                  source={{ uri: profilePicture }}
                  style={profileEditorStyles.profilePictureImage}
                  contentFit="cover"
                />
              ) : (
                <Text style={profileEditorStyles.profilePicturePlaceholder}>
                  👤
                </Text>
              )}
            </TouchableOpacity>
            <TouchableOpacity
              style={profileEditorStyles.editPictureButton}
              onPress={handlePicturePress}
            >
              <MaterialIcons name="camera-alt" size={18} color="#FFF" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Name Input Section */}
        <View style={profileEditorStyles.inputSection}>
          <Text style={profileEditorStyles.inputLabel}>Nume</Text>
          <TextInput
            style={profileEditorStyles.textInput}
            value={userName}
            onChangeText={setUserName}
            placeholder="Introdu numele tău"
            placeholderTextColor="#999"
          />
        </View>

        {/* Interests Section */}
        <View style={profileEditorStyles.interestsSection}>
          <Text style={profileEditorStyles.interestsTitle}>
            Interese (selectează tipurile de evenimente care te interesează)
          </Text>
          <View style={profileEditorStyles.interestsContainer}>
            {categories.map((category) => {
              const isSelected = userInterests.has(category);
              return (
                <TouchableOpacity
                  key={category}
                  style={[
                    profileEditorStyles.interestChip,
                    isSelected && profileEditorStyles.interestChipSelected,
                  ]}
                  onPress={() => toggleInterest(category)}
                >
                  <Text style={profileEditorStyles.interestIcon}>
                    {categoryIcons[category] || "•"}
                  </Text>
                  <Text
                    style={[
                      profileEditorStyles.interestText,
                      isSelected && profileEditorStyles.interestTextSelected,
                    ]}
                  >
                    {category}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Save Button */}
        <TouchableOpacity
          style={profileEditorStyles.saveButton}
          onPress={handleSave}
        >
          <Text style={profileEditorStyles.saveButtonText}>Salvează</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
