import { Text, View, StyleSheet, TouchableOpacity, Animated, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { router, useSegments } from "expo-router";
import { useState, useRef } from "react";
import { Ionicons } from "@expo/vector-icons";

export default function Settings() {
  const { width } = Dimensions.get('window');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const animatedValue = useRef(new Animated.Value(0)).current;
  const segments = useSegments();
  const currentTab = segments[1] || 'settings';

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
      <SafeAreaView edges={["top"]} style={styles.container}>
        <StatusBar style={drawerOpen ? "light" : "auto"} backgroundColor={drawerOpen ? "#000" : "#A7C7FF"} />
        <View style={styles.header}>
          <Text style={styles.headerTitle}>الإعدادات</Text>
          <TouchableOpacity onPress={toggleDrawer} style={styles.menuButton}>
            <Ionicons name="menu" size={24} color="black" />
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <Text style={styles.title}>الإعدادات</Text>
          {/* Add your settings content here */}
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
    backgroundColor: "#A7C7FF",
    elevation: 10,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  menuButton: {
    padding: 5,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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