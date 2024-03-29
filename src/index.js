import React, { useEffect, useState, useRef } from "react";

import { View, Text, StyleSheet, StatusBar } from "react-native";

import { Card, Button } from "react-native-elements";

import { DATA } from "./services";

import Deck from "./components/Deck";

export default function Main() {
  const [userData, setUserData] = useState({ results: [] });
  const [currentCard, setCurrentCard] = useState(0);

  useEffect(() => {
    DATA().then(setUserData);
  }, []);

  const getMoreCards = async () => {
    const cards = await DATA();
    setUserData(cards);
    setCurrentCard(0);
  };
  const renderCard = ({ name, picture, login }) => {
    return (
      <Card key={login.uuid}>
        <Card.Image source={{ uri: picture.large }} />
        <Card.Title>{name.first}</Card.Title>
        <Text style={{ marginBottom: 10 }}>
          I can customize the Card further
        </Text>

        <Button
          icon={{ name: "code" }}
          backgroundColor="#03A9F4"
          title="Click me"
        />
      </Card>
    );
  };

  const renderNoMoreCard = () => {
    return (
      <Card>
        <Card.Title>There is no more card</Card.Title>
        <Button background="#03A9F4" title="Get More" onPress={getMoreCards} />
      </Card>
    );
  };

  return (
    <View style={styles.container}>
      <Deck
        data={userData.results}
        renderCard={renderCard}
        renderNoMoreCard={renderNoMoreCard}
        currentCard={currentCard}
        setCurrentCard={setCurrentCard}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 0,
    flexShrink: 1,
    flexBasis: "100%",
    marginTop: StatusBar.currentHeight + 100,
  },
});
