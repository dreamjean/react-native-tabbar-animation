import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { Image, StyleSheet } from "react-native";

import { TabBar } from "../components";
import { colors, images } from "../config";
import {
  ActivityScreen,
  ListingEditScreen,
  ListingScreen,
  MessageScreen,
  ProfileScreen,
} from "../screens";

const Tab = createBottomTabNavigator();

const FeedNavigator = () => (
  <Tab.Navigator
    screenOptions={{
      headerShown: false,
    }}
    tabBar={(props) => <TabBar {...props} />}
    tabBarOptions={{
      activeTintColor: colors.primary,
      inactiveTintColor: colors.gray,
      activeScreenColors: [
        colors.green,
        colors.yellow,
        colors.blue,
        colors.red,
        colors.pink,
      ],
    }}
  >
    <Tab.Screen
      name="Activity"
      component={ActivityScreen}
      options={{
        title: "星球",
        activeIcon: () => <Image style={styles.img1} source={images[1]} />,
        tabBarIcon: () => <Image style={styles.img2} source={images[0]} />,
      }}
    />
    <Tab.Screen
      name="Listing"
      component={ListingScreen}
      options={{
        title: "廣場",
        activeIcon: () => <Image style={styles.img1} source={images[3]} />,
        tabBarIcon: () => <Image style={styles.img2} source={images[2]} />,
      }}
    />
    <Tab.Screen
      name="ListingEdit"
      component={ListingEditScreen}
      options={{
        title: "發布",
        activeIcon: () => <Image style={styles.img1} source={images[5]} />,
        tabBarIcon: () => <Image style={styles.img2} source={images[4]} />,
      }}
    />
    <Tab.Screen
      name="Message"
      component={MessageScreen}
      options={{
        title: "消息",
        activeIcon: () => <Image style={styles.img1} source={images[7]} />,
        tabBarIcon: () => <Image style={styles.img2} source={images[6]} />,
      }}
    />
    <Tab.Screen
      name="Profile"
      component={ProfileScreen}
      options={{
        title: "自己",
        activeIcon: () => <Image style={styles.img1} source={images[9]} />,
        tabBarIcon: () => <Image style={styles.img2} source={images[8]} />,
      }}
    />
  </Tab.Navigator>
);

const styles = StyleSheet.create({
  img1: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  img2: {
    width: 30,
    height: 30,
    borderRadius: 15,
    resizeMode: "contain",
  },
});

export default FeedNavigator;
