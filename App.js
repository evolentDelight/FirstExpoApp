import React, { useState, useEffect } from "react";
import { StyleSheet, Button, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as Battery from "expo-battery";
import { Barometer } from "expo-sensors";

function displayGyroscope() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text></Text>
    </View>
  );
}

function displayPedometer() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text></Text>
    </View>
  );
}

function displayMagnetometer() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text></Text>
    </View>
  );
}

function displayBarometer() {
  const [data, setData] = useState({});
  const [isAvailable, setAvailable] = useState(false);
  const [isDisplayable, setDisplayable] = useState(false);

  let subscription;

  useEffect(() => {
    if (!isAvailable) {
      async function call() {
        let promise = Barometer.isAvailableAsync();
        promise.then((boolean) => {
          if (boolean === true) {
            setAvailable(true);
          } else setAvailable(false);
        });
      }

      call();
    } else if(isAvailable) {
      subscription = Barometer.addListener((json) => {
        if(json){
          setDisplayable(true);
          setData(json);
        }
        else{
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
          : "Unavailable"}
        {"\n"}
        Pressure:{" "}
        {isAvailable
          ? isDisplayable
            ? `${parseFloat(data.pressure).toFixed(2)} hPa`
            : "Updating.."
          : "Unavailable"}
        {"\n"}
        Relative Altitude:{" "}
        {isAvailable
          ? isDisplayable
            ? `${data.relativeAltitude} meter(s)`
            : "Updating..."
          : "Unavailable"}
      </Text>
    </View>
  );
}

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

function HomeScreen({ navigation }) {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <View style={styles.rowcenter}>
        <View style={styles.centerify}>
          <Text>Battery</Text>
          <Button
            title="Battery"
            onPress={() => navigation.navigate("displayBattery")}
          />
        </View>
        <View style={styles.centerify}>
          <Text>Barometer</Text>
          <Button
            title="Barometer"
            onPress={() => navigation.navigate("displayBarometer")}
          />
        </View>
        <View style={styles.centerify}>
          <Text>Magnetometer</Text>
          <Button
            title="Magnetometer"
            onPress={() => navigation.navigate("displayMagnetometer")}
          />
        </View>
      </View>
      <View style={styles.rowcenter}>
        <View style={styles.centerify}>
          <Text>Pedometer</Text>
          <Button
            title="Pedometer"
            onPress={() => navigation.navigate("displayPedometer")}
          />
        </View>
        <View style={styles.centerify}>
          <Text>Gyroscope</Text>
          <Button
            title="Gyroscope"
            onPress={() => navigation.navigate("displayGyroscope")}
          />
        </View>
      </View>
    </View>
  );
}

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "Overview" }}
        />
        <Stack.Screen
          name="displayBattery"
          component={displayBattery}
          options={{ title: "Battery" }}
        />
        <Stack.Screen
          name="displayBarometer"
          component={displayBarometer}
          options={{ title: "Barometer" }}
        />
        <Stack.Screen
          name="displayMagnetometer"
          component={displayMagnetometer}
          options={{ title: "Magnetometer" }}
        />
        <Stack.Screen
          name="displayPedometer"
          component={displayPedometer}
          options={{ title: "Pedometer" }}
        />
        <Stack.Screen
          name="displayGyroscope"
          component={displayGyroscope}
          options={{ title: "Gyroscope" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  centerify: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  rowcenter: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
});
