// Edit screen


import { StyleSheet, Text, View, TouchableOpacity, TextInput, Image } from 'react-native'
import { useState , useEffect} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router, useLocalSearchParams } from 'expo-router'
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useThemeStore } from '../../store/useThemeStore';
import { Colors } from '../../Constants/Colors';
const EditPage = () => {
    const { id } = useLocalSearchParams();
    const [title, setTitle] = useState<string>('');
    const [content, setContent] = useState<string>('');
    
    const { isDarkMode } = useThemeStore();
    const theme = isDarkMode ? Colors.dark : Colors.light;
  

    useEffect(() => {
      const loadNote = async () => {
        try {
          const stored = await AsyncStorage.getItem('notes');
          const notes = stored ? JSON.parse(stored) : [];
          const note = notes.find((n: any) => n.id === id);
          if (note) {
            setTitle(note.title);
            setContent(note.content);
          }
        } catch (error) {
          console.log(error);
        }
      };
      loadNote();
    }, [id]);

    const handleSave = async () => {
        const storedNotes = await AsyncStorage.getItem('notes');
        const notes = storedNotes ? JSON.parse(storedNotes) : [];
        const updatedNotes = notes.map((n: any) => {
          if (n.id === id) {
            return { ...n, title, content };
          }
          return n;
        });
        await AsyncStorage.setItem('notes', JSON.stringify(updatedNotes));
        router.back();
    }
  return (
      <SafeAreaView style={[styles.container, {backgroundColor: theme.background}]}>
          <View style={[styles.header, {backgroundColor: theme.background}]}>
            <TouchableOpacity style={styles.save} onPress={handleSave}>
                <Ionicons name="save" size={20} color="#fff" style={{marginRight: 5}} />
                <Text style={styles.saveText}>حفظ</Text>
            </TouchableOpacity>   
              <TouchableOpacity onPress={() => router.back()} style={styles.back}>
                  <Text style={[styles.backText, {color: theme.primary}]}>رجوع</Text>
                  <Image
                      source={require('@/assets/images/back.png')}
                      style={{ width: 30, height: 30, marginRight: 10 }}
                      resizeMode="contain"
                      tintColor={theme.primary}
                  />
              </TouchableOpacity>          
          </View>
          <View style={{paddingHorizontal: 20}}>
             <TextInput
            style={{ padding: 20, fontSize: 20, fontWeight: 'bold', color: theme.primary }}
            placeholder="عنوان الملاحظة"
            value={title}
            onChangeText={setTitle}
          />
          <View style={{ height: 1, backgroundColor: '#ccc' }} />
          <TextInput
            style={{ padding: 20, fontSize: 16, color: theme.primary, textAlignVertical: 'top' }}
            placeholder="محتوى الملاحظة"
            value={content}
            onChangeText={setContent}
            multiline
          /> 
          </View>
          
    </SafeAreaView>
  )
}

export default EditPage

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 20,
        paddingHorizontal: 15,
        backgroundColor: '#f7f7f7',
        elevation: 5
    },
      save: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#28A745',
        borderRadius: 10,
        paddingHorizontal: 12,
        paddingVertical: 10
    },
    saveText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#fff'
    },
    back: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        paddingVertical: 10
    },
    backText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#000'
    }
})