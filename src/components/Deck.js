import React, { useRef } from "react";
import { View, PanResponder, Animated } from "react-native";

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

      onPanResponderRelease: (event, gestureFinalState) => {}, // usúario finalizou a interação com a aplicação
    })
  ).current;

  const getStyles = () => {
    const rotate = animationCard.x.interpolate({
      inputRange: [-500, 0, 500],
      outputRange: ["-120deg", "0deg", "120deg"],
    });
    return {
      ...animationCard.getLayout(),
      transform: [{ rotate }],
    };
  };

  const renderCards = () => {
    return data.map((item, index) => {
      if (index === 0) {
        return (
          <Animated.View
            key={item.login.uuid}
            {...panResponder.panHandlers}
            style={getStyles()}
          >
            {renderCard(item)}
          </Animated.View>
        );
      }
      return renderCard(item);
    });
  };

  return <View>{renderCards()}</View>;
}
