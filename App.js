import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, ScrollView, SafeAreaView } from "react-native";
import Animated, {
  useSharedValue,
  withSpring,
  withTiming,
  useAnimatedStyle,
} from "react-native-reanimated";
import {
  GestureHandlerRootView,
  Gesture,
  GestureDetector,
} from "react-native-gesture-handler";
import ListItem from "./components/ListItem";

const BACKGROUND_COLOR = "#FAFBFF";

export default function App() {
  const todos = [
    "Learn basics of reanimated",
    "Learn about react native gesture handlers",
    "Add them both to create desired animations",
    "Integrate in food application",
  ];

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>TODOS</Text>
        <ScrollView style={{ flex: 1 }}>
          {todos.map((todo, index) => (
            <ListItem todo={todo} index={index} key={todo} />
          ))}
        </ScrollView>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
  },
  title: {
    fontSize: 60,
    marginVertical: 20,
    paddingLeft: "5%",
  },
});
