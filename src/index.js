import React, { useEffect, useState, useRef } from "react";

import { View, Text, StyleSheet, StatusBar } from "react-native";

import { Card, Button } from "react-native-elements";

import { DATA } from "./mocks";

import Deck from "./components/Deck";

export default function Main() {
  const [userData, setUserData] = useState({ results: [] });

  useEffect(() => {
    DATA().then(setUserData);
  }, []);

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

  return (
    <View style={styles.container}>
      <Deck data={userData.results} renderCard={renderCard} />
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
