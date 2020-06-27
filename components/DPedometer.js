import React, { useState, useEffect } from "react";
import { Text, View } from "react-native";
import { Pedometer } from "expo-sensors";

function displayPedometer() {
  const [data, setData] = useState(0);
  const [isAvailable, setAvailable] = useState(false);

  let subscription = {};

  useEffect(() => {
    if (!isAvailable) {
      Pedometer.isAvailableAsync().then((boolean) => {
        if (boolean === true) {
          setAvailable(true);
        } else setAvailable(false);
      });
    } else if (isAvailable) {
      subscription = Pedometer.watchStepCount((result) => {
        if (result) {
          setData(result.steps);
        }
      });
    }
    return () => {
      Pedometer.watchStepCount().remove();
    }
  });

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{textAlign : "center"}}>
        Note:{"\n"}
        The device's formula for counting steps are not always scientific{"\n"}
        Therefore, the results may not be accurate.{"\n"}
      </Text>
      <Text>
        Pedometer Status:{" "}
          {isAvailable
            ? "Success"
            : "Unavailable on this device"}
          {"\n"}
          Current Session - Steps Taken:{" "}
          {isAvailable
            ? `${data} steps`
            : "Unavailable on this device"}
          {"\n"}
      </Text>
    </View>
  );
}

export default displayPedometer;