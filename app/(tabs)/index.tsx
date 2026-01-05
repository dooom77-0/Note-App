import { Text, View, StyleSheet, TouchableOpacity, TextInput, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
// import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
export default function Index() {
  return (
    <>
      {/*====== HEADER =======*/}
      <SafeAreaView edges={["top"]} style={styles.container}>
      <StatusBar style="auto" backgroundColor="#A7C7FF" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>ملاحظاتي </Text>

        <TouchableOpacity style={styles.Add}>
          <Text style={styles.AddText}> إضافة +</Text>
        </TouchableOpacity>
        </View>
        {/* ======= END HEADER ===== */}


        {/*======= SHOW NOTES =======*/}
      <View style={styles.showNotes}>
          <View style={styles.searchbar}>
            <Ionicons name="search" size={20} color="#999" style={{ marginLeft: 8 }} />
            <TextInput 
            placeholder="البحث عن ملاحظة ..."
            style={styles.search}
            textAlign="right"
            
            />
          </View>
          <FlatList
            data={[
              {
                id: "1",
                title: "ملاحظة 1",
                content: "محتوى الملاحظة 1",
              },
              {
                id: "2",
                title: "ملاحظة 2",
                content: "محتوى الملاحظة 2",
              },
              {
                id: "3",
                title: "ملاحظة 3",
                content: "محتوى الملاحظة 3",
              },
              {
                id: "4",
                title: "ملاحظة 4",
                content: "محتوى الملاحظة 4",
              },
              {
                id: "5",
                title: "ملاحظة 5",
                content: "محتوى الملاحظة 5",
              },
            ]}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View>
                <TouchableOpacity
                  style={styles.note}
                >
                  <Text style={styles.noteTitle}>{item.title}</Text>
                </TouchableOpacity>
                
              </View>
            )}
            ListEmptyComponent={() => {
              return (
                <View>
                  <Text style={styles.noNotes}>لا يوجد ملاحظات 📝</Text>
                </View>
              )
            }}
          />
        </View>
        {/*======= END SHOW NOTES =======*/}
      </SafeAreaView>
    </>
    
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
    elevation: 10,

  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  Add: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#3B82F6",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5
  },
  AddText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#fff",
  },
  searchbar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 15,
    paddingHorizontal: 12,
    paddingVertical: 5,
    marginBottom: 15,
    elevation: 2,
  },
  search:{
      flex: 1,
      fontSize: 16,
      textAlign: 'right',
      paddingHorizontal: 10,
  },
  showNotes: {
    flex: 1,
    padding: 20,
    backgroundColor: "#E6F4FE",
  },
  note: {
    borderWidth: 1,
    borderColor: "#A7C7FF",
    borderRadius: 10,
    padding: 10,
    backgroundColor: "#fff",
    elevation: 2,
    marginBottom: 5
  },
  noteTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    textAlign: "right"
  },
  noNotes: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20
  }
});
