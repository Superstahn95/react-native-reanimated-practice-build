import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button } from "react-native";
import Animated, {
  useSharedValue,
  withSpring,
  useAnimatedStyle,
} from "react-native-reanimated";

export default function App() {
  const translateX = useSharedValue(0);
  const handlePress = () => {
    translateX.value = withSpring(translateX.value + 50);
  };
  const animatedStyle = useAnimatedStyle(
    () => ({
      transform: [{ translateX: withSpring(translateX.value * 2) }],
    }),
    []
  );

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.box, animatedStyle]} />
      <Button onPress={handlePress} title="Click me" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  box: {
    height: 120,
    width: 120,
    backgroundColor: "#b58df1",
    borderRadius: 20,
    marginVertical: 50,
  },
  button: {
    color: "white",
    backgroundColor: "blue",
    padding: 10,
  },
});
