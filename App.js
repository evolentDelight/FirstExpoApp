import React, { useState, useEffect } from "react";
import { StyleSheet, Button, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import DAccelerometer from "./components/DAccelerometer";
import DGyroscope from "./components/DGyroscope";
import DPedometer from "./components/DPedometer";
import DMagnetometer from "./components/DMagnetometer";
import DBarometer from "./components/DBarometer";
import DBattery from "./components/DBattery";

function displayAccelerometer(){//Stack.Screen component attribute calls for function and not Components
  return < DAccelerometer />
}

function displayGyroscope(){
  return < DGyroscope />
}

function displayPedometer() {
  return < DPedometer />
}

function displayMagnetometer() {
  return < DMagnetometer />
}

function displayBarometer() {
  return < DBarometer />
}

function displayBattery() {
  return < DBattery />
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
          component= {displayGyroscope}
          options={{ title: "Gyroscope" }}
        />
          <Stack.Screen
          name="displayAccelerometer"
          component= {displayAccelerometer} //Component tag did not work 
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
