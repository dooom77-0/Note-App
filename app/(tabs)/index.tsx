import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
export default function Index() {
  return (
    <SafeAreaView edges={["top"]} style={styles.container}>
      <StatusBar style="auto" backgroundColor="#A7C7FF" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>ملاحظاتي </Text>

        <TouchableOpacity style={styles.Add}>
          <Text style={styles.AddText}> إضافة +</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 22,
    backgroundColor: "#A7C7FF",
    elevation: 10
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  Add: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#3B82F6",
    borderRadius: 10,
    paddingHorizontal: 5,
    paddingVertical: 5
  },
  AddText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#fff",
  }
});
