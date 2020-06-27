import React, { useState, useEffect } from "react";
import { StyleSheet, Button, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as Battery from "expo-battery";
import { Barometer, Magnetometer, Pedometer, Gyroscope, Accelerometer } from "expo-sensors";

function displayAccelerometer(){
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
        <View style={styles.centerify}>
          <Text>Accelerometer</Text>
          <Button
            title="Accelerometer"
            onPress={() => navigation.navigate("displayAccelerometer")}
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
                <Stack.Screen
          name="displayAccelerometer"
          component={displayAccelerometer}
          options={{ title: "Accelerometer" }}
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
