import { useCallback, useEffect } from "react";
import {
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Animated, {
  useAnimatedProps,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { ReText } from "react-native-redash";
import { Circle, Svg } from "react-native-svg";

const BACKGROUND_COLOR = "#444b6f";
const BACKGROUND_STROKE_COLOR = "#303858";
const STROKE_COLOR = "#a6e1fa";

const { width, height } = Dimensions.get("window");

const CIRCLE_LENGTH = 1000;
const R = CIRCLE_LENGTH / (2 * Math.PI);

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export default function App() {
  const progress = useSharedValue(0);

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: CIRCLE_LENGTH * (1 - progress.value),
  }));

  const progressText = useDerivedValue(() =>
    Math.floor(progress.value * 100).toString()
  );

  const onPressButton = useCallback(() => {
    progress.value = withTiming(progress.value > 0 ? 0 : 1, { duration: 2000 });
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <ReText style={styles.progressText} text={progressText} />
        <Svg style={{ position: "absolute" }}>
          <Circle
            cx={width / 2}
            cy={height / 2}
            r={R}
            stroke={BACKGROUND_STROKE_COLOR}
            strokeWidth={30}
          />
          <AnimatedCircle
            cx={width / 2}
            cy={height / 2}
            r={R}
            stroke={STROKE_COLOR}
            strokeWidth={20}
            strokeDasharray={CIRCLE_LENGTH}
            strokeLinecap="round"
            animatedProps={animatedProps}
          />
        </Svg>
        <TouchableOpacity onPress={onPressButton} style={styles.button}>
          <Text style={styles.buttonText}>Run</Text>
        </TouchableOpacity>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
    alignItems: "center",
    justifyContent: "center",
  },
  progressText: {
    fontSize: 80,
    color: "rgba(256,256,256,0.7)",
    width: 200,
    textAlign: "center",
  },
  button: {
    position: "absolute",
    bottom: 80,
    width: width * 0.7,
    height: 60,
    backgroundColor: BACKGROUND_STROKE_COLOR,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 25,
    color: "white",
    letterSpacing: 2.0,
  },
});
