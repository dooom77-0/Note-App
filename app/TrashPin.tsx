import { Text, View, StyleSheet, TouchableOpacity, FlatList, Animated, Dimensions, TextInput   } from 'react-native'
// import { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import Ionicons from '@expo/vector-icons/build/Ionicons'
import { router, useSegments } from 'expo-router'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useState, useRef, useCallback } from 'react'
import { useFocusEffect } from "@react-navigation/native";


type Note = {
  id: string;
  title: string;
  content: string;
  createdAt: string;
}

const TrashPin = () => {
  const { width } = Dimensions.get('window');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const animatedValue = useRef(new Animated.Value(0)).current;
  const segments = useSegments();
  const currentTab = segments[1] || 'TrashPin';

  const [notes, setNotes] = useState<Note[]>([]);
  const [search, setSearch] = useState<string>('');

  const filteredNotes = notes.filter((note) => note.title.toLowerCase().includes(search.toLowerCase()) || note.content.toLowerCase().includes(search.toLowerCase()));

  useFocusEffect(
    useCallback(() => {
      const loadNotes = async () => {
        // قراءة الملاحظات المحذوفة من AsyncStorage
        // "deletedNotes" ده مخزن منفصل في AsyncStorage
        // AsyncStorage يخزن البيانات كـ key-value pairs
        // عندما نحذف ملاحظة، بننقلها من "notes" إلى "deletedNotes"
        // لو المخزن مش موجود، getItem يرجع null، ونبدأ بمصفوفة فارغة
        const stored = await AsyncStorage.getItem("deletedNotes");
        if (stored) {
          const parsed = JSON.parse(stored);
          setNotes(parsed);
        }
      };
      loadNotes()
    }, [])
  )

  const restoreNote = async (id: string) => {
    const storedDeleted = await AsyncStorage.getItem("deletedNotes");
    const deletedNotes: Note[] = storedDeleted ? JSON.parse(storedDeleted) : [];
    const noteToRestore = deletedNotes.find((n) => n.id === id);
    if (noteToRestore) {
      // إضافة إلى الملاحظات العادية
      const storedNotes = await AsyncStorage.getItem("notes");
      const notes: Note[] = storedNotes ? JSON.parse(storedNotes) : [];
      notes.push(noteToRestore);
      await AsyncStorage.setItem("notes", JSON.stringify(notes));
      
      // حذف من المحذوفة
      const updatedDeleted = deletedNotes.filter((n) => n.id !== id);
      await AsyncStorage.setItem("deletedNotes", JSON.stringify(updatedDeleted));
      
      // تحديث الـ state
      setNotes(updatedDeleted);
    }
  };

  const deletePermanently = async (id: string) => {
    const storedDeleted = await AsyncStorage.getItem("deletedNotes");
    const deletedNotes: Note[] = storedDeleted ? JSON.parse(storedDeleted) : [];
    const updatedDeleted = deletedNotes.filter((n) => n.id !== id);
    await AsyncStorage.setItem("deletedNotes", JSON.stringify(updatedDeleted));
    setNotes(updatedDeleted);
  };

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
          <TouchableOpacity style={[styles.menuItem, isActive('index') && styles.activeMenuItem]} onPress={() => { toggleDrawer(); router.push('/'); }}>
            <Ionicons name="document-text" size={24} color="#333" />
            <Text style={styles.menuText}>ملاحظاتي</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.menuItem, isActive('TrashPin') && styles.activeMenuItem]} onPress={() => { toggleDrawer(); router.push('./TrashPin' as any); }}>
            <Ionicons name="trash" size={24} color="#333" />
            <Text style={styles.menuText}>سلة المحذوفات</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={[styles.menuItem, isActive('favorites') && styles.activeMenuItem]} onPress={() => { toggleDrawer(); router.push('./favorites' as any); }}>
            <Ionicons name="heart" size={24} color="#333" />
            <Text style={styles.menuText}>المفضلة</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.menuItem, isActive('settings') && styles.activeMenuItem]} onPress={() => { toggleDrawer(); router.push('./settings'); }}>
            <Ionicons name="settings" size={24} color="#333" />
            <Text style={styles.menuText}>الإعدادات</Text>
          </TouchableOpacity>


        </View>
      </Animated.View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView edges={['top']} style={styles.container}>
        <StatusBar style={drawerOpen ? "light" : "auto"} backgroundColor={drawerOpen ? "#000" : "#A7C7FF"} />
        <View style={styles.header}>
          <TouchableOpacity onPress={toggleDrawer} style={styles.menuButton}>
            <Ionicons name="menu" size={24} color="black" />
          </TouchableOpacity>
        
          <Text style={styles.headerTitle}>سلة المحذوفات</Text>


        </View>

        {/* HEADER END */}

        {/* CONTENT START */}

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
            numColumns={2}
            renderItem={({ item }) => (
              <View style={styles.noteContainer}>
                  <View style={styles.note}>
                    <Text style={styles.noteTitle}>{item.title}</Text>
                    <Text style={styles.noteContent} numberOfLines={1}>{item.content}</Text>
                  <View style={styles.noteActions}>
                    <TouchableOpacity style={styles.deleteButton} onPress={() => deletePermanently(item.id)}>
                      <Ionicons name="trash" size={20} color="#fff" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.restoreButton} onPress={() => restoreNote(item.id)}>
                      <Ionicons name="refresh" size={20} color="#fff" />
                    </TouchableOpacity>
                  </View>
                </View>
                
                
              </View>
            )}
            ListEmptyComponent={() => {
              return (
                <View>
                  {search.length > 0 ? (
                    <Text style={styles.noNotes}>لا توجد ملاحظات مطابقة 📝</Text>

                  ) :
                    (<Text style={styles.noNotes}>لا توجد ملاحظات محذوفة 📝</Text>)
                  }
                </View>
              )
            }}
            
          />
        </View>
        
        
      </SafeAreaView>
      {drawerOpen && <TouchableOpacity style={styles.overlay} onPress={toggleDrawer} />}
      <Drawer />
    </View>
  )
}

export default TrashPin

const styles = StyleSheet.create({
    container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    height: 70,
    justifyContent: 'space-between',  
    alignItems: 'center',
    backgroundColor: '#A7C7FF',
    position: 'relative',
  },
  menuButton: {
    position: 'absolute',
    right: 20,
    top: 22,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    position: 'absolute',
    left: 0,
    right: 0,
  },
  DELALL: {
    position: 'absolute',
    left: 20,
    top: 22,
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
  },
  showNotes: {
    flex: 1,
    padding: 20,
    backgroundColor: "#EEF2FF",
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
  noteContainer: {
    flex: 1,
    margin: 5,
  },
  note: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#A7C7FF",
    borderRadius: 15,
    padding: 15,
    backgroundColor: "#fff",
    elevation: 2,
    height: 150,
    justifyContent: 'space-between',
  },
  noteTouchable: {
    flex: 1,
  },
  noteActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  restoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3B82F6',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  restoreText: {
    fontSize: 12,
    color: '#fff',
    marginLeft: 5,
  },
  deleteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#DC2626',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  deleteText: {
    fontSize: 12,
    color: '#fff',
    marginLeft: 5,
  },
  noteTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "right"
  },
  noteContent: {
    fontSize: 14,
    textAlign: "right",
    color: 'gray',
  },
  noNotes: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20,
    color: "#333"
  }
});