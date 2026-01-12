import { Text, View, StyleSheet, TouchableOpacity, TextInput, FlatList, Animated, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { router, useSegments } from "expo-router";
import { useState, useCallback, useRef } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default function Index() {
  type Note = {
    id: string;
    title: string;
    content: string;
  }

  const { width } = Dimensions.get('window');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const animatedValue = useRef(new Animated.Value(0)).current;
  const segments = useSegments();
  const currentTab = segments[1] || 'index';

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

  const toggleDrawer = () => {
    const toValue = drawerOpen ? 0 : 1;
    setDrawerOpen(!drawerOpen);
    Animated.timing(animatedValue, {
      toValue,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const translateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [width, 0],
  });

  const Drawer = () => {
    const isActive = (tab: string) => currentTab === tab;
    return (
      <Animated.View style={[styles.drawer, { transform: [{ translateX }] }]}>
        <View style={styles.drawerHeader}>
          <TouchableOpacity style={styles.closeButton} onPress={toggleDrawer}>
            <Ionicons name="close" size={28} color="#333" />
          </TouchableOpacity>
          <Text style={styles.drawerTitle}>القائمة</Text>
        </View>
        
        <View style={styles.drawerContent}>
          <TouchableOpacity style={[styles.menuItem, isActive('index') && styles.activeMenuItem]} onPress={() => { toggleDrawer(); router.push('/(tabs)'); }}>
            <Ionicons name="document-text" size={24} color="#333" />
            <Text style={styles.menuText}>ملاحظاتي</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.menuItem, isActive('profile') && styles.activeMenuItem]} onPress={() => { toggleDrawer(); router.push('/(tabs)/profile' as any); }}>
            <Ionicons name="trash" size={24} color="#333" />
            <Text style={styles.menuText}>سلة المحذوفات</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.menuItem, isActive('settings') && styles.activeMenuItem]} onPress={() => { toggleDrawer(); router.push('/(tabs)/settings'); }}>
            <Ionicons name="settings" size={24} color="#333" />
            <Text style={styles.menuText}>الإعدادات</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.menuItem, isActive('favorites') && styles.activeMenuItem]} onPress={() => { toggleDrawer(); router.push('/(tabs)/favorites' as any); }}>
            <Ionicons name="heart" size={24} color="#333" />
            <Text style={styles.menuText}>المفضلة</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.menuItem, isActive('profile') && styles.activeMenuItem]} onPress={() => { toggleDrawer(); router.push('/(tabs)/profile' as any); }}>
            <Ionicons name="person" size={24} color="#333" />
            <Text style={styles.menuText}>الملف الشخصي</Text>
          </TouchableOpacity>

        </View>
      </Animated.View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      {/*====== HEADER =======*/}
      <SafeAreaView edges={["top"]} style={styles.container}>
      <StatusBar style={drawerOpen ? "light" : "auto"} backgroundColor={drawerOpen ? "#000" : "#A7C7FF"} />
      <View style={styles.header}>
        <TouchableOpacity onPress={toggleDrawer} style={styles.menuButton}>
          <Ionicons name="menu" size={24} color="black" />
        </TouchableOpacity>
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
      {drawerOpen && <TouchableOpacity style={styles.overlay} onPress={toggleDrawer} />}
      <Drawer />
    </View>
    
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
    fontSize: 16,
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
    color: "#fff",
    textAlign: "center"
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
    fontSize: 12,
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
  },
  menuButton: {
    marginRight: 20,
  },
  drawerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    borderBottomColor: '#eee',
  },
  closeButton: {
    padding: 10, 
    borderRadius: 5,
    paddingTop: 40,
    },
  drawerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingTop: 50,
    textAlign: 'right',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  drawer: {
    flex: 1,
    position: 'absolute',
    top: 0,
    right: 0,
    width: Dimensions.get('window').width * 0.75,
    height: '100%',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: -2, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 10,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  drawerContent: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  menuItem: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    paddingHorizontal: 10,
    borderBottomColor: '#eee',
  },
  menuText: {
    fontSize: 18,
    marginRight: 15,
    color: '#333',
  },
  activeMenuItem: {
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
    paddingHorizontal: 10,
  }
});
