import React, { useState, useEffect } from "react";
import { Alert } from "react-native";
import Loading from "./Loading";
import * as Location from "expo-location";
import axios from "axios";

const API_KEY = "7ae860771f4eef0020863071b271395c";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getWeather(latitude, longitude) {
      const { data } = await axios.get(
        `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`
      );
      console.log(data);
    }

    async function getLocation() {
      try {
        await Location.requestForegroundPermissionsAsync();
        const {
          coords: { latitude, longitude },
        } = await Location.getCurrentPositionAsync();
        getWeather(latitude, longitude);
        setIsLoading(false);
      } catch (error) {
        Alert.alert("Can't find you.", "So sad");
      }
    }
    getLocation();
  }, []);

  return isLoading ? <Loading /> : null;
}
