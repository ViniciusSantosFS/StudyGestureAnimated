import React, { useRef, useMemo, useState } from "react";
import { View, PanResponder, Animated, Dimensions } from "react-native";

const CURRENT_SCREEN_WIDTH = Dimensions.get("window").width;
const SWIPE_SUCCESS = 0.25 * CURRENT_SCREEN_WIDTH;
const SWIPE_OUT_DURATION = 250;

const defaultVoid = () => {};

export default function Deck({
  data,
  renderCard,
  onSwipedRight = defaultVoid,
  onSwipedLeft = defaultVoid,
}) {
  const [currentCard, setCurrentCard] = useState(0);
  const animationCard = useRef(new Animated.ValueXY()).current;

  const panResponder = useMemo(
    () =>
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
            forceSwipe("RIGHT");
          } else if (gestureFinalState.dx < -SWIPE_SUCCESS) {
            forceSwipe("left");
          } else {
            resetCardPosition();
          }
        }, // usúario finalizou a interação com a aplicação
      }),
    [currentCard]
  );

  const resetCardPosition = () => {
    Animated.spring(animationCard, {
      toValue: { x: 0, y: 0 },
      useNativeDriver: false,
    }).start();
  };

  const forceSwipe = (direction = null) => {
    if (direction === null) return;
    const x =
      direction.toLowerCase() === "right"
        ? CURRENT_SCREEN_WIDTH
        : -CURRENT_SCREEN_WIDTH;

    Animated.timing(animationCard, {
      toValue: { x, y: 0 },
      duration: SWIPE_OUT_DURATION,
      useNativeDriver: false,
    }).start(() => onSwiped(direction));
  };

  const onSwiped = (direction) => {
    const item = data[currentCard];

    direction.toLowerCase() === "right"
      ? onSwipedRight(item)
      : onSwipedLeft(item);
    // Futuras funções
    animationCard.setValue({ x: 0, y: 0 });

    setCurrentCard(currentCard + 1);
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
      if (index < currentCard) return null;
      if (index === currentCard) {
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
