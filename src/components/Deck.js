import React, { useRef } from "react";
import { View, StyleSheet, PanResponder, Animated } from "react-native";

export default function Deck({ data, renderCard }) {
  const animationCard = useRef(new Animated.ValueXY()).current;

  const panResponder = useRef(
    PanResponder.create({
      onPanResponderStart: () => true, // verifica se esse pan responder é responsavél pelo gesto
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gestureState) => {
        animationCard.setValue({
          x: gestureState.dx,
          y: gestureState.dy,
        });
      }, // Verifica os gestos do usúario com a aplicação
      onPanResponderRelease: () => {}, // usúario finalizou a interação com a aplicação
    })
  ).current;

  const renderCards = () => {
    return data.map((item) => {
      return renderCard(item);
    });
  };

  return (
    <Animated.View
      {...panResponder.panHandlers}
      style={animationCard.getLayout()}
    >
      {renderCards()}
    </Animated.View>
  );
}
