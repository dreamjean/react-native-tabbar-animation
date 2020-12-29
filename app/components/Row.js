import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Animated from "react-native-reanimated";

const Row = ({ title, contain }) => {
  return (
    <Animated.View>
      <TouchableOpacity onPress={() => true}>
        <View style={styles.box}>
          <Text style={styles.title}>{title}</Text>
        </View>
      </TouchableOpacity>
      <Animated.ScrollView>
        <Text style={styles.body}>{contain}</Text>
      </Animated.ScrollView>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  box: {
    backgroundColor: "#8f8f8f",
    height: 50,
    borderColor: "white",
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    marginLeft: 14,
    fontSize: 16,
    color: "white",
  },
  body: {
    marginVertical: 8,
    fontSize: 14,
  },
});

export default Row;
