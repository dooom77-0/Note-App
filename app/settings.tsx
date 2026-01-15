import { Text, View, StyleSheet, TouchableOpacity, Animated, Dimensions, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
// import { StatusBar } from "expo-status-bar";
import { router, useSegments } from "expo-router";
import { useRef, useState } from 'react';
import { Ionicons } from "@expo/vector-icons";
import { Switch } from "react-native-paper";
import { useThemeStore } from "./store/useThemeStore";
import { Colors } from "./Constants/Colors";

export default function Settings() {
  // جلب البيانات من الـ store: الوضع الليلي، تبديله، اللون الرئيسي، إلخ
  // isDarkMode: قيمة منطقية تحدد إذا كان الوضع داكن أم لا
  // toggleDarkMode: دالة لتبديل الوضع الليلي (تغير isDarkMode من true إلى false والعكس)
  // mainColor: اللون الرئيسي المختار (مثل الأزرق)
  // colorKey: مفتاح اللون (مثل 'blue')
  const { isDarkMode, toggleDarkMode, setMainColor } = useThemeStore();
    const mainColor = useThemeStore((state) => state.mainColor);

  // الحصول على ألوان الثيم الحالي (فاتح أو داكن)
  // إذا isDarkMode = true، يستخدم Colors.dark، وإلا Colors.light
  const theme = isDarkMode ? Colors.dark : Colors.light;
  
  const { width } = Dimensions.get('window');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const animatedValue = useRef(new Animated.Value(0)).current;
  const segments = useSegments();
  const currentTab = segments[1] || 'settings';

  // دالة لفتح وإغلاق الـ drawer
  const toggleDrawer = () => {
    const toValue = drawerOpen ? 0 : 1;
    setDrawerOpen(!drawerOpen);
    Animated.timing(animatedValue, {
      toValue,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  // حساب التحريك للـ drawer (من اليمين إلى اليسار، ينزلق من خارج الشاشة إلى الداخل)
  const translateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [width * 0.75, 0], // يبدأ من خارج الشاشة على اليمين وينزلق إلى الداخل
  });

  const colorsOptions = [
    { id: 'blue', hex: '#3B82F6', name: 'أزرق' },
    { id: 'purple', hex: '#8B5CF6', name: 'أرجواني' },
    { id: 'green', hex: '#10B981', name: 'أخضر' },
    { id: 'yellow', hex: '#F59E0B', name: 'أصفر' },
  ]

  const Drawer = () => {
    const isActive = (tab: string) => currentTab === tab;
    return (
      <Animated.View style={[styles.drawer, { transform: [{ translateX }], backgroundColor: theme.card }]}>
        <View style={styles.drawerHeader}>
          <TouchableOpacity style={styles.closeButton} onPress={toggleDrawer}>
            <Ionicons name="close" size={28} color={theme.primary} />
          </TouchableOpacity>
          <Text style={[styles.drawerTitle, { color: theme.primary }]}>القائمة</Text>
        </View>

        <View style={styles.drawerContent}>
          <TouchableOpacity style={[styles.menuItem, isActive('index') && styles.activeMenuItem]} onPress={() => { toggleDrawer(); router.push('/'); }}>
            <Ionicons name="document-text" size={24} color={theme.primary} />
            <Text style={[styles.menuText, { color: theme.primary }]}>ملاحظاتي</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.menuItem, isActive('TrashPin') && styles.activeMenuItem]} onPress={() => { toggleDrawer(); router.push('./TrashPin' as any); }}>
            <Ionicons name="trash" size={24} color={theme.primary} />
            <Text style={[styles.menuText, { color: theme.primary }]}>سلة المحذوفات</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.menuItem, isActive('favorites') && styles.activeMenuItem]} onPress={() => { toggleDrawer(); router.push('./favorites' as any); }}>
            <Ionicons name="heart" size={24} color={theme.primary} />
            <Text style={[styles.menuText, { color: theme.primary }]}>المفضلة</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.menuItem, isActive('settings') && styles.activeMenuItem]} onPress={() => { toggleDrawer(); router.push('./settings'); }}>
            <Ionicons name="settings" size={24} color={theme.primary} />
            <Text style={[styles.menuText, { color: theme.primary }]}>الإعدادات</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      <SafeAreaView edges={["top"]} style={styles.container}>
        <View style={styles.header}>
          <Text style={[styles.headerTitle, { color: theme.primary }]}>الإعدادات</Text>
          <TouchableOpacity onPress={toggleDrawer} style={styles.menuButton}>
            <Ionicons name="menu" size={24} color={theme.primary} />
          </TouchableOpacity>
        </View>
        <View style={[styles.content, { backgroundColor: theme.background }]}>
          {/* قسم الصورة الشخصية */}
          <View style={[styles.profileImage, { backgroundColor: theme.background }]}>
            <Image
            source={require('@/assets/images/shadow.png')}
            style={[styles.Image, { borderColor: mainColor }]}
            />
            <View style={styles.profileInfo}>
              <Text style={{ fontSize: 16, fontWeight: 'bold', color: theme.primary }}>اسم المستخدم</Text>
              <Text style={{ color: theme.secondary }}>example@gmail.com</Text>
            </View>
          </View>

          {/* قسم مظهر التطبيق */}
          <View style={styles.appearanceSection}>
            <Text style={[styles.sectionTitle, { color: theme.secondary }]}>مظهر التطبيق</Text>
            {/* إعدادات المظهر مثل اختيار اللون والوضع الداكن */}
            <View style={[ styles.optionsContainer, { borderColor: theme.borders, backgroundColor: theme.card }]}>
               <View style={[styles.options, { backgroundColor: theme.card, borderColor: theme.borders }]}>
                {/* خيار الوضع الداكن */}
                <Text style={[styles.optionText, { color: theme.primary }]}>الوضع الداكن</Text>
              <Switch
                style={styles.switch}
                trackColor={{ false: '#767577', true: theme.primary }}
                thumbColor={isDarkMode ? theme.primary : '#f4f3f4'}
                value={isDarkMode}
                onValueChange={toggleDarkMode} // عند الضغط، يغير الوضع الليلي في الـ store
              />
              </View>
              <View style={[styles.Line, { backgroundColor: theme.borders }]} />
              <View style={[styles.options, { backgroundColor: theme.card, borderColor: theme.borders }]}>
                {/* اختيار اللون الرئيسي - يمكن إضافة أزرار للألوان هنا */}
                <Text style={[styles.optionText, { color: theme.primary }]}>لون التطبيق الرئيسي</Text>
                <View style={styles.colorsRow}>
                  {colorsOptions.map((color) => (
                    <TouchableOpacity
                      key={color.id}
                      style={[styles.colorCircle, { backgroundColor: color.hex }]}
                      onPress={() => setMainColor(color.id as any)}
                    >
                      <Ionicons name="checkmark" size={20} color="#fff" />
                    </TouchableOpacity>
                  ))}
                </View>

              </View>
              <View style={[styles.Line, { backgroundColor: theme.borders }]} />
              <View style={[styles.options, { backgroundColor: theme.card, borderColor: theme.borders }]}>
                {/* اختيار اللغة للتطبيق  */}
                <Text style={[styles.optionText, { color: theme.primary }]}>لغة التطبيق</Text>
                <View style={styles.languageRow}>
                  <TouchableOpacity style={[styles.Lang, { borderColor: theme.borders }]}>
                    <Text style={[styles.optionText, { color: theme.primary, fontWeight: 'bold'}]}>ع</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.Lang, { borderColor: theme.borders }]}>
                    <Text style={[styles.optionText, { color: theme.primary, fontWeight: 'bold' }]}>En</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            
          </View>
          

        </View>
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
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  Line: {
    height: 2,
    marginBottom: 10,
  },
  menuButton: {
    padding: 5,
  },
  profileImage: {
    flexDirection: 'row',
    marginBottom: 30,
  },
  Image: {
    width: 80,
    height: 80,
    marginBottom: 20,
    borderRadius: 50,
    marginTop: 30,
    marginHorizontal: 20,
    borderWidth: 2,
  },
  profileInfo: {
    flexDirection: 'column',
    justifyContent: 'center',
    marginTop: 10,
  },
  appearanceSection: {
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#999',
    textAlign: 'right',
  },
  optionsContainer: {
    paddingHorizontal: 10,
    borderRadius: 8,
    borderWidth: 1,
  },
  options: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    paddingVertical: 10,
  },
  optionText: {
    fontSize: 16,
  },
  colorsRow: {
    flexDirection: 'row',
    gap: 10,
  },
  colorCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  languageRow: {
    flexDirection: 'row',
    gap: 20,
  },
  Lang: {
    padding: 10,
    borderRadius: 5,
    borderWidth: 2,
  },
  switch: {
    transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }]
  },
  content: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
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
  activeMenuItem: {
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  menuText: {
    fontSize: 18,
    marginRight: 15,
    color: '#333',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
});