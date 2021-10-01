import React, { useRef } from "react";
import { View, StyleSheet, Animated } from "react-native";

export default function Deck({ data, renderCard }) {
  const renderCards = () => {
    return data.map((item) => {
      return renderCard(item);
    });
  };

  return <View>{renderCards()}</View>;
}
