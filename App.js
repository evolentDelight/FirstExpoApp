import React from "react";
import { StyleSheet, TouchableOpacity, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import DAccelerometer from "./components/DAccelerometer";
import DGyroscope from "./components/DGyroscope";
import DPedometer from "./components/DPedometer";
import DMagnetometer from "./components/DMagnetometer";
import DBarometer from "./components/DBarometer";
import DBattery from "./components/DBattery";

function HomeScreen({ navigation }) {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
      }}
    >
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          paddingLeft: "10%",
        }}
      >
        <TouchableOpacity
          style={styles.item}
          onPress={() => navigation.navigate("displayBattery")}
        >
          <View>
            <Text numberOfLines={1} extBreakStrategy="balanced">Battery</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.item}
          onPress={() => navigation.navigate("displayBarometer")}
        >
          <View>
            <Text numberOfLines={1} extBreakStrategy="balanced">Barometer</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.item}
          onPress={() => navigation.navigate("displayMagnetometer")}
        >
          <View>
            <Text numberOfLines={1} extBreakStrategy="balanced">Magnetometer</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          paddingRight: "10%",
        }}
      >
        <TouchableOpacity
          style={styles.item}
          onPress={() => navigation.navigate("displayPedometer")}
        >
          <View>
            <Text numberOfLines={1} textBreakStrategy="balanced">Pedometer</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.item}
          onPress={() => navigation.navigate("displayGyroscope")}
        >
          <View>
            <Text numberOfLines={1} extBreakStrategy="balanced">Gyroscope</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.item}
          onPress={() => navigation.navigate("displayAccelerometer")}
        >
          <View>
            <Text numberOfLines={1} extBreakStrategy="balanced">Accelerometer</Text>
          </View>
        </TouchableOpacity>
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
          component={DBattery}
          options={{ title: "Battery" }}
        />
        <Stack.Screen
          name="displayBarometer"
          component={DBarometer}
          options={{ title: "Barometer" }}
        />
        <Stack.Screen
          name="displayMagnetometer"
          component={DMagnetometer}
          options={{ title: "Magnetometer" }}
        />
        <Stack.Screen
          name="displayPedometer"
          component={DPedometer}
          options={{ title: "Pedometer" }}
        />
        <Stack.Screen
          name="displayGyroscope"
          component={DGyroscope}
          options={{ title: "Gyroscope" }}
        />
        <Stack.Screen
          name="displayAccelerometer"
          component={DAccelerometer} //Component tag did not work
          options={{ title: "Accelerometer" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  item: {
    paddingBottom: "10%",
    paddingTop: "10%",
    paddingRight: "25%",
    paddingLeft: "25%",
    marginTop: "5%",
    marginBottom: "5%",
    borderRadius: 5,
    backgroundColor: "lightblue",
  },
});
