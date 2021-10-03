import React, { useRef } from "react";
import { View, PanResponder, Animated, Dimensions } from "react-native";

const CURRENT_SCREEN_WIDTH = Dimensions.get("window").width;
const SWIPE_SUCCESS = 0.25 * CURRENT_SCREEN_WIDTH;

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

      onPanResponderRelease: (event, gestureFinalState) => {
        if (gestureFinalState.dx > SWIPE_SUCCESS) {
          console.log("SWIPED RIGHT");
        } else if (gestureFinalState.dx < -SWIPE_SUCCESS) {
          console.log("SWIPED LEFT");
        } else {
          resetCardPosition();
        }
      }, // usúario finalizou a interação com a aplicação
    })
  ).current;

  const resetCardPosition = () => {
    Animated.spring(animationCard, {
      toValue: { x: 0, y: 0 },
      useNativeDriver: false,
    }).start();
  };

  const getStyles = () => {
    const rotate = animationCard.x.interpolate({
      inputRange: [-CURRENT_SCREEN_WIDTH * 1.5, 0, CURRENT_SCREEN_WIDTH * 1.5],
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
