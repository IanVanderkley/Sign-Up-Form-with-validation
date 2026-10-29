import { useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function ConfirmationScreen() {
  const { firstName } = useLocalSearchParams<{ firstName?: string }>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Form Submitted!</Text>
      <Text style={styles.message}>
        {firstName
          ? `Thank you, ${firstName}! Your form was submitted successfully.`
          : "Your form was submitted successfully."}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: "#FFFFFF",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#16A34A",
    marginBottom: 12,
  },
  message: {
    fontSize: 18,
    textAlign: "center",
  },
});
