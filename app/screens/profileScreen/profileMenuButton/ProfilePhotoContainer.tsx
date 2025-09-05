import { Colors } from "@/constants/Colors";
import { Feather } from "@expo/vector-icons";
import React from "react";
import { Animated, Image, StyleSheet } from "react-native";

interface Props {
  animatedIconScale: Animated.AnimatedInterpolation<string | number>;
  profilePhoto?: string;
}

const ProfilePhotoContainer: React.FC<Props> = ({ animatedIconScale, profilePhoto }) => {
  return (
    <Animated.View style={[styles.profilePhotoContent, { transform: [{ scale: animatedIconScale }] }]}>
      {profilePhoto ? (
        <Image
          source={{ uri: profilePhoto }}
          style={{
            width: "100%",
            height: "100%",
            borderRadius: 999,
            resizeMode: "cover",
          }}
        />
      ) : (
          <Feather style={{padding: 3.8}} name="user" color={Colors.light.highlightBackgroun_1} size={20} />

        //<MaterialIcons name="person" size={28} color={Colors.light.highlightBackgroun_1} />
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  profilePhotoContent: {
    backgroundColor: Colors.light.background,
    borderRadius: 999,
  },
});

export default ProfilePhotoContainer;
