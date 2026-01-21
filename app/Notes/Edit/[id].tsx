// Edit screen


import { StyleSheet, Text, View, TouchableOpacity, TextInput, Image } from 'react-native'
import { useEffect, useState} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router, useLocalSearchParams } from 'expo-router'
import { Ionicons } from '@expo/vector-icons';
import { useThemeStore } from '../../store/useThemeStore';
import { Colors } from '../../Constants/Colors';
import { useTranslation } from 'react-i18next';
import { useNotesStore } from '@/app/store/useNotesStore';
const EditPage = () => {
  const { t } = useTranslation();
    const { id } = useLocalSearchParams();
    const noteId = Array.isArray(id) ? id[0] : id
    
    const { isDarkMode } = useThemeStore();
    const theme = isDarkMode ? Colors.dark : Colors.light;
    
    const allNotes = useNotesStore((s) => s.notes);
    const note = allNotes.find((n) => n.id === id);
    const [title, setTitle] = useState<string>(note?.title || '');
    const [content, setContent] = useState<string>(note?.content || '');

    const updateNote = useNotesStore((s) => s.updateNote);
    useEffect(() => {
      if (note) {
        setTitle(note.title);
        setContent(note.content);
      }
    }, [note]);


    const handleSave = () => {
      updateNote(noteId, { title, content });
      router.back();
    }
  return (
      <SafeAreaView style={[styles.container, {backgroundColor: theme.background}]}>
          <View style={[styles.header, {backgroundColor: theme.background}]}>
            <TouchableOpacity style={styles.save} onPress={handleSave}>
                <Ionicons name="save" size={20} color="#fff" style={{marginRight: 5}} />
                <Text style={styles.saveText}>{t('save')}</Text>
            </TouchableOpacity>   
              <TouchableOpacity onPress={() => router.back()} style={styles.back}>
                  <Text style={[styles.backText, {color: theme.primary}]}>{t('back')}</Text>
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
            placeholder={t('title1')}
            placeholderTextColor={theme.secondary}
            value={title}
            onChangeText={setTitle}
          />
          <View style={{ height: 1, backgroundColor: '#ccc' }} />
          <TextInput
            style={{ padding: 20, fontSize: 16, color: theme.primary, textAlignVertical: 'top' }}
            placeholder={t('content')}
            placeholderTextColor={theme.secondary}
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