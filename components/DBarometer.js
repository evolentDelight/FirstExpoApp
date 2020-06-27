import React, { useState, useEffect } from "react";
import { Text, View } from "react-native";
import { Barometer } from "expo-sensors";

function displayBarometer() {
  const [data, setData] = useState({});
  const [isAvailable, setAvailable] = useState(false);
  const [isDisplayable, setDisplayable] = useState(false);

  let subscription;

  useEffect(() => {
    if (!isAvailable) {
      Barometer.isAvailableAsync().then((boolean) => {
        if (boolean === true) {
          setAvailable(true);
        } else setAvailable(false);
      });
    } else if (isAvailable) {
      subscription = Barometer.addListener((json) => {
        if (json) {
          setDisplayable(true);
          setData(json);
        } else {
          setDisplayable(false);
        }
      });
    }

    return () => {
      Barometer.removeAllListeners();
    };
  });

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>
        Barometer Status:{" "}
        {isAvailable
          ? isDisplayable
            ? "Success"
            : "Updating."
          : "Unavailable on this device"}
        {"\n"}
        Pressure:{" "}
        {isAvailable
          ? isDisplayable
            ? `${parseFloat(data.pressure).toFixed(2)} hPa`
            : "Updating.."
          : "Unavailable on this device"}
        {"\n"}
        {"relativeAltitude" in data//Needs iOS to check
          ? `Relative Altitude: 
          ${
            isAvailable
              ? isDisplayable
                ? `${data.relativeAltitude} meter(s)`
                : "Updating..."
              : "Unavailable on this device"
          }
          `
          : ""}
      </Text>
    </View>
  );
}

export default displayBarometer;