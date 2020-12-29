import Color from "color";
import React from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import { calender, colors } from "../config";
import ActiveIcon from "./ActiveIcon";
import BarCurve from "./BarCurve";
import TabBarButton from "./TabBarButton";

const { width, DEFAULT_TABBAR_HEIGHT, TABBAR_COVER_HEIGHT } = calender;

const TabBar = ({
  state,
  descriptors,
  navigation,
  activeScreenColors = [],
  activeTintColor: customActiveTintColor,
  inactiveTintColor: customInactiveTintColor,
  activeBackgroundColor,
  inactiveBackgroundColor = "transparent",
  showLabel,
  style,
}) => {
  const activeIndex = useSharedValue(0);

  const { routes } = state;

  const tabWidth = width / routes.length;

  const indicatorPosition = useDerivedValue(() => {
    return withTiming(activeIndex.value * tabWidth + tabWidth / 2, {
      duration: 500,
    });
  });

  const coverX = useDerivedValue(() => {
    return withTiming(activeIndex.value * tabWidth * 2);
  });

  const coverColor = useDerivedValue(() =>
    interpolateColor(
      coverX.value,
      activeScreenColors.map((_, i) => i * tabWidth * 2),
      activeScreenColors.map((item) => item)
    )
  );

  const indicatorStyle = useAnimatedStyle(() => {
    return {
      position: "absolute",
      left: -tabWidth,
      top: -0.5,
      transform: [{ translateX: indicatorPosition.value }],
      backgroundColor: coverColor.value,
    };
  });

  const activeTintColor =
    customActiveTintColor === undefined
      ? colors.primary
      : customActiveTintColor;

  const inactiveTintColor =
    customInactiveTintColor === undefined
      ? Color(colors.text).mix(Color(colors.card), 0.5).hex()
      : customInactiveTintColor;

  const focusedOptions = descriptors[state.routes[state.index].key].options;

  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  return (
    <View style={[styles.container, style]}>
      <Animated.View style={indicatorStyle}>
        {routes.map((route, index) => {
          const { options } = descriptors[route.key];
          return (
            <ActiveIcon
              key={`fg-${index}`}
              width={tabWidth}
              {...{ activeIndex, index, activeTintColor }}
              renderActiveIcon={options.activeIcon}
            />
          );
        })}
        <BarCurve
          height={TABBAR_COVER_HEIGHT}
          {...{ tabWidth, activeBackgroundColor }}
        />
      </Animated.View>
      {routes.map((route, index) => {
        const position = tabWidth * index + tabWidth / 2;
        const { options } = descriptors[route.key];

        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const focused = state.index === index;

        const backgroundColor = focused
          ? activeBackgroundColor
          : inactiveBackgroundColor;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!focused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TabBarButton
            key={`fg-${index}`}
            renderIcon={options.tabBarIcon}
            {...{
              activeIndex,
              activeTintColor,
              backgroundColor,
              focused,
              label,
              inactiveTintColor,
              index,
              indicatorPosition,
              onPress,
              position,
              showLabel,
              tabWidth,
            }}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: DEFAULT_TABBAR_HEIGHT,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
    backgroundColor: colors.background,
  },
});

export default TabBar;
