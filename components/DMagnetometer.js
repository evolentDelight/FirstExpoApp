import React, { useState, useEffect } from "react";
import { Text, View } from "react-native";
import { Magnetometer } from "expo-sensors";

function displayMagnetometer() {
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
      Magnetometer.isAvailableAsync().then((boolean) => {
        if (boolean === true) {
          setAvailable(true);
        } else setAvailable(false);
      });
    } else if (isAvailable) {
      subscription = Magnetometer.addListener((json) => {
        if (json) {
          setDisplayable(true);
          setData(json);
        } else {
          setDisplayable(false);
        }
      });
      Magnetometer.setUpdateInterval(1000);
    }

    return () => {
      Magnetometer.removeAllListeners();
    }
  });

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>
      Magnetometer Status:{" "}
        {isAvailable
          ? isDisplayable
            ? "Success"
            : "Updating."
          : "Unavailable on this device"}
        {"\n"}
        x:{" "}
        {isAvailable
          ? isDisplayable
            ? `${parseFloat(data.x).toFixed(2)} µT`
            : "Updating.."
          : "Unavailable on this device"}
        {"\n"}
        y:{" "}
        {isAvailable
          ? isDisplayable
            ? `${parseFloat(data.y).toFixed(2)} µT`
            : "Updating.."
          : "Unavailable on this device"}
        {"\n"}
        z:{" "}
        {isAvailable
          ? isDisplayable
            ? `${parseFloat(data.z).toFixed(2)} µT`
            : "Updating.."
          : "Unavailable on this device"}
      </Text>
    </View>
  );
}

export default displayMagnetometer;