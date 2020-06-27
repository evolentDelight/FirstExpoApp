import React, { useState, useEffect } from "react";
import { Text, View } from "react-native";
import { Accelerometer } from "expo-sensors";

function DAccelerometer(){
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
      Accelerometer.isAvailableAsync().then((boolean) => {
        if (boolean === true) {
          setAvailable(true);
        } else setAvailable(false);
      });
    } else if (isAvailable) {
      subscription = Accelerometer.addListener((json) => {
        if (json) {
          setDisplayable(true);
          setData(json);
        } else {
          setDisplayable(false);
        }
      });
      Accelerometer.setUpdateInterval(1000);
    }

    return () => {
      Accelerometer.removeAllListeners();
    }
  });

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>
      Accelerometer Status:{" "}
        {isAvailable
          ? isDisplayable
            ? "Success"
            : "Updating."
          : "Unavailable on this device"}
        {"\n"}
        x:{" "}
        {isAvailable
          ? isDisplayable
            ? `${parseFloat(data.x).toFixed(2)} Gs`
            : "Updating.."
          : "Unavailable on this device"}
        {"\n"}
        y:{" "}
        {isAvailable
          ? isDisplayable
            ? `${parseFloat(data.y).toFixed(2)} Gs`
            : "Updating.."
          : "Unavailable on this device"}
        {"\n"}
        z:{" "}
        {isAvailable
          ? isDisplayable
            ? `${parseFloat(data.z).toFixed(2)} Gs`
            : "Updating.."
          : "Unavailable on this device"}
        {"\n"}
        Units in Gs where 1 G = 9.81 m s^-2
      </Text>
    </View>
  );
}

export default DAccelerometer;