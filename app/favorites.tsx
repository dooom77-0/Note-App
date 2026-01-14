import { Text, View, StyleSheet, TouchableOpacity, FlatList, Animated, Dimensions, TextInput   } from 'react-native'
// import { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import Ionicons from '@expo/vector-icons/build/Ionicons'
import { router, useSegments } from 'expo-router'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useState, useRef, useCallback } from 'react'
import { useFocusEffect } from "@react-navigation/native";

// تعريف نوع الملاحظة
type Note = {
  id: string;
  title: string;
  content: string;
  createdAt: string;
}

// مكون صفحة المفضلة، مبني بنفس طريقة سلة المحذوفات
const Favorites = () => {
  // الحصول على عرض الشاشة للـ Drawer
  const { width } = Dimensions.get('window');
  // حالة فتح/إغلاق الـ Drawer
  const [drawerOpen, setDrawerOpen] = useState(false);
  // مرجع للرسوم المتحركة
  const animatedValue = useRef(new Animated.Value(0)).current;
  // الحصول على المسار الحالي
  const segments = useSegments();
  const currentTab = segments[1] || 'favorites';

  // حالة الملاحظات المفضلة
  const [notes, setNotes] = useState<Note[]>([]);
  // حالة البحث
  const [search, setSearch] = useState<string>('');

  // فلترة الملاحظات بناءً على البحث
  const filteredNotes = notes.filter((note) => note.title.toLowerCase().includes(search.toLowerCase()) || note.content.toLowerCase().includes(search.toLowerCase()));

  // تحميل الملاحظات المفضلة عند فتح الصفحة
  useFocusEffect(
    useCallback(() => {
      const loadNotes = async () => {
        // قراءة الملاحظات المفضلة من AsyncStorage
        // نستخدم "favoriteNotes" بدلاً من "notes" عشان المفضلة مجموعة منفصلة
        // "notes" تحتوي على جميع الملاحظات، "favoriteNotes" تحتوي على المفضلة فقط
        // ده يسمح بإدارة منفصلة: إزالة من المفضلة دون حذف من الأصل
        // AsyncStorage ينشئ المخزن تلقائياً عند setItem، ولو مش موجود يرجع null
        const stored = await AsyncStorage.getItem("favoriteNotes");
        if (stored) {
          const parsed = JSON.parse(stored);
          setNotes(parsed);
        }
      };
      loadNotes()
    }, [])
  )

  // دالة لإزالة الملاحظة من المفضلة
  const removeFromFavorites = async (id: string) => {
    // قراءة الملاحظات المفضلة الحالية
    const storedFavorites = await AsyncStorage.getItem("favoriteNotes");
    const favoriteNotes: Note[] = storedFavorites ? JSON.parse(storedFavorites) : [];
    // فلترة الملاحظة المراد إزالتها
    const updatedFavorites = favoriteNotes.filter((n) => n.id !== id);
    // حفظ التحديث في AsyncStorage
    await AsyncStorage.setItem("favoriteNotes", JSON.stringify(updatedFavorites));
    // تحديث الحالة المحلية
    setNotes(updatedFavorites);
  };

  // دالة لفتح/إغلاق الـ Drawer
  const toggleDrawer = () => {
    const toValue = drawerOpen ? 0 : 1;
    setDrawerOpen(!drawerOpen);
    Animated.timing(animatedValue, {
      toValue,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  // تحويل القيمة المتحركة إلى إزاحة أفقية
  const translateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [width, 0],
  });

  // مكون الـ Drawer
  const Drawer = () => {
    // دالة للتحقق من التبويب النشط
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
          {/* عنصر القائمة للملاحظات */}
          <TouchableOpacity style={[styles.menuItem, isActive('index') && styles.activeMenuItem]} onPress={() => { toggleDrawer(); router.push('/'); }}>
            <Ionicons name="document-text" size={24} color="#333" />
            <Text style={styles.menuText}>ملاحظاتي</Text>
          </TouchableOpacity>

          {/* عنصر القائمة لسلة المحذوفات */}
          <TouchableOpacity style={[styles.menuItem, isActive('TrashPin') && styles.activeMenuItem]} onPress={() => { toggleDrawer(); router.push('./TrashPin' as any); }}>
            <Ionicons name="trash" size={24} color="#333" />
            <Text style={styles.menuText}>سلة المحذوفات</Text>
          </TouchableOpacity>
          
          {/* عنصر القائمة للمفضلة */}
          <TouchableOpacity style={[styles.menuItem, isActive('favorites') && styles.activeMenuItem]} onPress={() => { toggleDrawer(); router.push('./favorites' as any); }}>
            <Ionicons name="heart" size={24} color="#333" />
            <Text style={styles.menuText}>المفضلة</Text>
          </TouchableOpacity>

          {/* عنصر القائمة للإعدادات */}
          <TouchableOpacity style={[styles.menuItem, isActive('settings') && styles.activeMenuItem]} onPress={() => { toggleDrawer(); router.push('./settings'); }}>
            <Ionicons name="settings" size={24} color="#333" />
            <Text style={styles.menuText}>الإعدادات</Text>
          </TouchableOpacity>


        </View>
      </Animated.View>
    );
  };

  // الواجهة الرئيسية للصفحة
  return (
    <View style={{ flex: 1 }}>
      {/* المنطقة الآمنة للشاشة */}
      <SafeAreaView edges={['top']} style={styles.container}>
        {/* شريط الحالة */}
        <StatusBar style={drawerOpen ? "light" : "auto"} backgroundColor={drawerOpen ? "#000" : "#A7C7FF"} />
        {/* رأس الصفحة */}
        <View style={styles.header}>
          {/* زر فتح الـ Drawer */}
          <TouchableOpacity onPress={toggleDrawer} style={styles.menuButton}>
            <Ionicons name="menu" size={24} color="black" />
          </TouchableOpacity>
        
          <Text style={styles.headerTitle}>المفضلة</Text>

        </View>

        {/* محتوى الصفحة */}
        <View style={styles.showNotes}>
          {/* شريط البحث */}
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
          {/* قائمة الملاحظات */}
          <FlatList
            data={filteredNotes}
            keyExtractor={(item) => item.id}
            numColumns={2}
            renderItem={({ item }) => (
              <View style={styles.noteContainer}>
                  <View style={styles.note}>
                    {/* عنوان الملاحظة */}
                    <Text style={styles.noteTitle}>{item.title}</Text>
                    {/* محتوى الملاحظة */}
                    <Text style={styles.noteContent} numberOfLines={1}>{item.content}</Text>
                    {/* أزرار الإجراءات */}
                  <View style={styles.noteActions}>
                    {/* زر إزالة من المفضلة */}
                    <TouchableOpacity style={styles.removeButton} onPress={() => removeFromFavorites(item.id)}>
                      <Ionicons name="heart-dislike" size={20} color="#fff" />
                    </TouchableOpacity>
                  </View>
                </View>
                
                
              </View>
            )}
            // رسالة عندما لا توجد ملاحظات
            ListEmptyComponent={() => {
              return (
                <View>
                  {search.length > 0 ? (
                    <Text style={styles.noNotes}>لا توجد ملاحظات مطابقة 📝</Text>

                  ) :
                    (<Text style={styles.noNotes}>لا توجد ملاحظات مفضلة ❤️</Text>)
                  }
                </View>
              )
            }}
            
          />
        </View>
        
        
      </SafeAreaView>
      {/* طبقة الخلفية عند فتح الـ Drawer */}
      {drawerOpen && <TouchableOpacity style={styles.overlay} onPress={toggleDrawer} />}
      {/* عرض الـ Drawer */}
      <Drawer />
    </View>
  )
}

export default Favorites

const styles = StyleSheet.create({
    container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    height: 70,
    justifyContent: 'center',  
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
  noteActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
  removeButton: {
    backgroundColor: '#DC2626',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginLeft: 10,
  },
  noNotes: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20,
    color: "#333"
  },
});