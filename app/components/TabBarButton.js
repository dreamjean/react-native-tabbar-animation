import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";

const size = 24;

const TabBarButton = ({
  activeIndex,
  activeTintColor,
  backgroundColor,
  focused,
  renderIcon,
  label,
  labelStyle,
  inactiveTintColor,
  index,
  indicatorPosition,
  onPress,
  position,
  tabWidth,
  showLabel = true,
}) => {
  const staticIconStyle = useAnimatedStyle(() => {
    const visibility = interpolate(
      indicatorPosition.value,
      [
        position - tabWidth / 2,
        position - tabWidth / 8,
        position + tabWidth / 8,
        position + tabWidth / 2,
      ],
      [1, 0, 0, 1],
      Extrapolate.CLAMP
    );

    return {
      opacity: visibility,
      transform: [{ scale: visibility }],
    };
  });

  return (
    <Pressable
      onPress={() => {
        onPress();
        activeIndex.value = index;
      }}
      style={{
        alignItems: "center",
        paddingBottom: 4,
        backgroundColor,
      }}
    >
      <View style={[styles.tab, { width: tabWidth }]}>
        <Animated.View style={staticIconStyle}>
          {renderIcon({
            size,
            color: inactiveTintColor,
          })}
        </Animated.View>
      </View>
      {showLabel && (
        <Text
          style={[
            {
              color: focused ? activeTintColor : inactiveTintColor,
              fontSize: 10,
              textAlign: "center",
            },
            labelStyle,
          ]}
        >
          {label}
        </Text>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  tab: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default TabBarButton;
