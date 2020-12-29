import React from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  withDelay,
  withTiming,
} from "react-native-reanimated";

const size = 28;

const ActiveIcon = ({
  activeTintColor,
  activeIndex,
  index,
  renderActiveIcon,
  width,
}) => {
  const circleIconStyle = useAnimatedStyle(() => {
    const isActive = index === activeIndex.value;
    const yOffset = isActive ? 0 : 80;

    return {
      transform: [
        {
          translateY: withDelay(isActive ? 150 : 0, withTiming(yOffset)),
        },
        {
          scale: isActive
            ? withDelay(150, withTiming(1, { duration: 500 }))
            : withTiming(0),
        },
      ],
    };
  });

  return (
    <Animated.View
      style={[
        {
          position: "absolute",
          width,
          top: -8,
          left: width / 2,
          height: 48,
          justifyContent: "center",
          alignItems: "center",
        },
        circleIconStyle,
      ]}
    >
      <View style={[styles.icon, { borderColor: activeTintColor }]}>
        {renderActiveIcon({
          size,
          color: activeTintColor,
        })}
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  icon: {
    backgroundColor: "white",
    height: 42,
    width: 42,
    borderRadius: 21,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    borderWidth: 2,
  },
});

export default ActiveIcon;
