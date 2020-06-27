import React, { useState, useEffect } from "react";
import { Text, View } from "react-native";
import { Gyroscope } from "expo-sensors";

function displayGyroscope() {
  const [data, setData] = useState({
    x: 0,
    y: 0,
    z: 0
  });
  const [isAvailable, setAvailable] = useState(false);
  const [isDisplayable, setDisplayable] = useState(false);

  let subscription;

  useEffect(() => {
    if (!isAvailable) {
      Gyroscope.isAvailableAsync().then((boolean) => {
        if (boolean === true) {
          setAvailable(true);
        } else setAvailable(false);
      });
    } else if (isAvailable) {
      subscription = Gyroscope.addListener((json) => {
        if (json) {
          setDisplayable(true);
          setData(json);
        } else {
          setDisplayable(false);
        }
      });
      Gyroscope.setUpdateInterval(1000);
    }

    return () => {
      Gyroscope.removeAllListeners();
    }
  });

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>
      Gyroscope Status:{" "}
        {isAvailable
          ? isDisplayable
            ? "Success"
            : "Updating."
          : "Unavailable on this device"}
        {"\n"}
        x:{" "}
        {isAvailable
          ? isDisplayable
            ? `${parseFloat(data.x).toFixed(2)} RPS`
            : "Updating.."
          : "Unavailable on this device"}
        {"\n"}
        y:{" "}
        {isAvailable
          ? isDisplayable
            ? `${parseFloat(data.y).toFixed(2)} RPS`
            : "Updating.."
          : "Unavailable on this device"}
        {"\n"}
        z:{" "}
        {isAvailable
          ? isDisplayable
            ? `${parseFloat(data.z).toFixed(2)} RPS`
            : "Updating.."
          : "Unavailable on this device"}
      </Text>
    </View>
  );
}

export default displayGyroscope;