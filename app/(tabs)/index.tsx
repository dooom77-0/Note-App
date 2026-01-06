import { Text, View, StyleSheet, TouchableOpacity, TextInput, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { router } from "expo-router";
import { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default function Index() {
  type Note = {
    id: string;
    title: string;
    content: string;
  }

  const [notes, setNotes] = useState<Note[]>([]);
  const [search, setSearch] = useState<string>('');

  const filteredNotes = notes.filter((note) => note.title.toLowerCase().includes(search.toLowerCase()) || note.content.toLowerCase().includes(search.toLowerCase()));

  useFocusEffect(
    useCallback(() => {
      const loadNotes = async () => {
        const stored = await AsyncStorage.getItem("notes");
        if (stored) {
          const parsed = JSON.parse(stored);
          setNotes(parsed);
        }
      };
      loadNotes()
    }, [])
  )


  const Add = () => {
    router.push("/Notes/Add");
  }
  return (
    <>
      {/*====== HEADER =======*/}
      <SafeAreaView edges={["top"]} style={styles.container}>
      <StatusBar style="auto" backgroundColor="#A7C7FF" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>ملاحظاتي </Text>
            <TouchableOpacity style={styles.Add} onPress={Add}>
          <Text style={styles.AddText}> إضافة +</Text>
        </TouchableOpacity>
        
        </View>
        {/* ======= END HEADER ===== */}


        {/*======= SHOW NOTES =======*/}
      <View style={styles.showNotes}>
          <View style={styles.searchbar}>
            <Ionicons name="search" size={20} color="#999" style={{ marginLeft: 8 }} />
            <TextInput 
            value={search}
            onChangeText={(text) => setSearch(text)}
            placeholder="البحث عن ملاحظة ..."
            style={styles.search}
            textAlign="right"
            
            />
          </View>
          <FlatList
            data={filteredNotes}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View>
                  <TouchableOpacity
                  style={styles.note}
                  onPress={() => {
                    router.push(`/Notes/${item.id}`);
                  }}
                >
                  <Text style={styles.noteTitle}>{item.title}</Text>
                </TouchableOpacity>
                
                
              </View>
            )}
            ListEmptyComponent={() => {
              return (
                <View>
                  {search.length > 0 ? (
                    <Text style={styles.noNotes}>لا توجد ملاحظات مطابقة 📝</Text>

                  ) :
                    (<Text style={styles.noNotes}>لا توجد ملاحظات 📝</Text>)
                  }
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
  delete: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#DC2626",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5
  },
  deleteText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#fff"
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
    backgroundColor: "#EEF2FF",
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
  noteContent: {
    fontSize: 14,
    textAlign: "right"
  },
  noNotes: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20,
    color: "#333"
  }
});
