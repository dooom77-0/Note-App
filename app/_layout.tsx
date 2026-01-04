import { Slot, router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
export default function RootLayout() {

  useEffect(() => {
    const check = async () => {
      const done = await AsyncStorage.getItem("onboarding");
      if (done) {
        router.replace("./onboarding/step1");
      } else {
        router.replace("./(tabs)");
      };
    };
    check();
  }, []);

  return <Slot />;
}
