import React, { useState, useEffect } from "react";
import Loading from "./Loading";
import * as Location from "expo-location";

export default function App() {
  const [location, setLocation] = useState(null);

  useEffect(async () => {
    const newLocation = await Location.getCurrentPositionAsync();
    setLocation(newLocation);
    console.log(location);
  });

  return <Loading />;
}
