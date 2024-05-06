import { View, Text, StyleSheet, Dimensions } from "react-native";
import { GestureDetector, Gesture } from "react-native-gesture-handler";
import { FontAwesome5 } from "@expo/vector-icons";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

const LIST_ITEM_HEIGHT = 70;
const { width } = Dimensions.get("window");
const THRESHOLDX = -width * 0.3;
const ListItem = ({ index, todo }) => {
  const offsetX = useSharedValue(0);
  const deleteContOpacity = useSharedValue(1);
  const itemHeight = useSharedValue(LIST_ITEM_HEIGHT);
  const marginVertical = useSharedValue(10);
  const pan = Gesture.Pan()
    .onChange((event) => {
      offsetX.value = event.translationX;
    })
    .onFinalize((event) => {
      const shouldBeRemoved = THRESHOLDX > offsetX.value;
      if (shouldBeRemoved) {
        offsetX.value = withTiming(-width);
        itemHeight.value = withTiming(0);
        marginVertical.value = withTiming(0);
        deleteContOpacity.value = withTiming(0);
      } else {
        offsetX.value = withTiming(0);
      }
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: offsetX.value }],
  }));
  const deleteContStyle = useAnimatedStyle(() => {
    const opacity = withTiming(offsetX.value < THRESHOLDX ? 1 : 0);
    return { opacity };
  });
  const containerStyle = useAnimatedStyle(() => {
    return {
      height: itemHeight.value,
      marginVertical: marginVertical.value,
    };
  });
  return (
    <GestureDetector gesture={pan}>
      <Animated.View style={[styles.todoContainer, containerStyle]}>
        <Animated.View style={[styles.deleteContainer, deleteContStyle]}>
          <Text style={styles.deleteText}>Delete</Text>
        </Animated.View>
        <Animated.View style={[styles.todo, animatedStyle]}>
          <Text style={styles.todoTitle}>{todo}</Text>
        </Animated.View>
      </Animated.View>
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  todoContainer: {
    width: "100%",
    alignItems: "center",
    marginVertical: 10,
  },
  todo: {
    width: "90%",
    height: LIST_ITEM_HEIGHT,
    justifyContent: "center",
    paddingLeft: 20,
    backgroundColor: "white",
    borderRadius: 10,
    // Shadow for iOS
    shadowOpacity: 0.08,
    shadowOffset: {
      width: 0,
      height: 20,
    },
    shadowRadius: 10,
    // Shadow for Android
    elevation: 5,
  },
  todoTitle: {
    fontSize: 16,
  },
  iconContainer: {
    height: LIST_ITEM_HEIGHT,
    width: LIST_ITEM_HEIGHT,
    position: "absolute",
    right: "10%",
    justifyContent: "center",
    alignItems: "center",
  },
  deleteContainer: {
    height: LIST_ITEM_HEIGHT,
    width: "100%",
    position: "absolute",
    backgroundColor: "red",
    alignItems: "flex-end",
    justifyContent: "center",
    width: "90%",
    borderRadius: 10,
  },
  deleteText: {
    fontSize: 20,
    color: "white",
    marginRight: "10%",
  },
});

export default ListItem;
