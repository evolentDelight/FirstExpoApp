import React, { useState, useEffect } from "react";
import { Text, View } from "react-native";
import * as Battery from "expo-battery";

function displayBattery() {
  const [batteryLevel, setBatteryLevel] = useState(0);
  useEffect(() => {
    async function getLevel() {
      const level = await Battery.getBatteryLevelAsync();
      setBatteryLevel(level);
    }
    getLevel();
  }, []);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>
        Battery Level: {batteryLevel ? batteryLevel * 100 : "Updating..."}
      </Text>
    </View>
  );
}

export default displayBattery;