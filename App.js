import React, { useState, useEffect } from "react";
import { Alert } from "react-native";
import Loading from "./Loading";
import * as Location from "expo-location";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getLocation() {
      try {
        await Location.requestForegroundPermissionsAsync();
        const {
          coords: { latitude, longitude },
        } = await Location.getCurrentPositionAsync();
        setIsLoading(false);
      } catch (error) {
        Alert.alert("Can't find you.", "So sad");
      }
    }
    getLocation();
  }, []);

  return isLoading ? <Loading /> : null;
}
