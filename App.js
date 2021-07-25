import React, { useState, useEffect } from "react";
import { Alert } from "react-native";
import Loading from "./Loading";
import * as Location from "expo-location";
import axios from "axios";
import Weather from "./Weather";

const API_KEY = "7ae860771f4eef0020863071b271395c";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [temp, setTemp] = useState(null);
  const [condition, setCondition] = useState(null);

  useEffect(() => {
    async function getWeather(latitude, longitude) {
      const { data } = await axios.get(
        `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
      );
      console.log(data);
      setIsLoading(false);
      setTemp(data.main.temp);
      setCondition(data.weather[0].main);
    }

    async function getLocation() {
      try {
        await Location.requestForegroundPermissionsAsync();
        const {
          coords: { latitude, longitude },
        } = await Location.getCurrentPositionAsync();
        getWeather(latitude, longitude);
      } catch (error) {
        Alert.alert("Can't find you.", "So sad");
      }
    }
    getLocation();
  }, []);

  return isLoading ? (
    <Loading />
  ) : (
    <Weather temp={Math.round(temp)} condition={condition} />
  );
}
