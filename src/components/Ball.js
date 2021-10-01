import React from "react";
import { View, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    width: 100,
    height: 100,
    borderRadius: 100,
    borderWidth: 30,
    borderColor: "#000000",
    backgroundColor: "#000000",
  },
});

export default function Ball() {
  return <View style={styles.container} />;
}
