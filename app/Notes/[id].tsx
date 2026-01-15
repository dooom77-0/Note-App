import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native'
import {useState, useEffect} from 'react'
import { useLocalSearchParams, router } from 'expo-router'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
// import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import dayjs from 'dayjs';
import 'dayjs/locale/ar';
import { useThemeStore } from '../store/useThemeStore';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Colors } from '../Constants/Colors';
import { useTranslation } from 'react-i18next';


dayjs.extend(relativeTime);
dayjs.locale('ar');
const Details = () => {
    const { t } = useTranslation();
    type Note = {
        id: string;
        title: string;
        content: string;
        createdAt: string;
    }

    const { isDarkMode } = useThemeStore();
    const theme = isDarkMode ? Colors.dark : Colors.light;


    
    const { id } = useLocalSearchParams();
    const [note, setNote] = useState< Note | null>(null);

    useEffect(() => {
        const loadNote = async () => {
            const stored = await AsyncStorage.getItem("notes");
            const notes: Note[] = stored ? JSON.parse(stored) : [];
            

            const found = notes.find((n) => n.id === id);
            if (found) {
                setNote(found);
            }
            if (!note) {
                return null;
            }
        }
        loadNote();
    }, [id, note])

    const deleteNote = async () => {
        Alert.alert(
            "حذف",
            "هل أنت متأكد من حذف هذا الملاحظة؟",
            [
                {
                    text: "نعم",
                    style: "destructive",
                    onPress: async () => {
                        const stored = await AsyncStorage.getItem("notes");
                        const notes: Note[] = stored ? JSON.parse(stored) : [];
                        const noteToDelete = notes.find((n) => n.id === id);
                        if (noteToDelete) {
                            // إضافة الملاحظة إلى سلة المهملات
                            // "deletedNotes" ده مخزن منفصل في AsyncStorage
                            // عند الحذف، بننقل الملاحظة من "notes" إلى "deletedNotes"
                            // AsyncStorage ينشئ المخزن تلقائياً عند setItem لو مش موجود
                            const deletedStored = await AsyncStorage.getItem("deletedNotes");
                            const deletedNotes: Note[] = deletedStored ? JSON.parse(deletedStored) : [];
                            deletedNotes.push(noteToDelete);
                            await AsyncStorage.setItem("deletedNotes", JSON.stringify(deletedNotes));
                            
                            // حذف الملاحظة من الملاحظات العادية
                            const updatedNotes = notes.filter((n) => n.id !== id);
                            await AsyncStorage.setItem("notes", JSON.stringify(updatedNotes));
                        }
                        router.back();
                    },
                },
                {
                    text: "لا",
                    style: "cancel",
                },
            ]
        )

        
    }

     
  return (
      <SafeAreaView edges={["top"]} style={[styles.container, {backgroundColor: theme.background}]}>
          <View style={[styles.header, {backgroundColor: theme.background}]}>
              <View style={{flexDirection: "row", gap: 10}}>
                <TouchableOpacity style={styles.delete}>
                    <Ionicons name="trash" size={24} color="#fff" style={{marginRight: 5}} />
                    <Text onPress={deleteNote} style={styles.deleteText}>{t("del")}</Text>
                </TouchableOpacity>
                  <TouchableOpacity style={styles.edit} onPress={() => router.push(`/Notes/Edit/${id}`)}>
                    <Ionicons name="pencil" size={24} color="#fff" style={{marginRight: 5}} />
                    <Text style={styles.editText}>{t("edit")}</Text>
                </TouchableOpacity>
              </View>
              <View>
                  <TouchableOpacity style={styles.back} onPress={() => router.back()}>
                      <Text style={{fontSize: 14, fontWeight: "bold", color: theme.primary}}>{t("back")}</Text>
                      <Ionicons name="arrow-forward" size={20} color={theme.primary}
                        style={{paddingLeft: 5}}
                    />
                  </TouchableOpacity>
              </View>
          </View>
          
          <View style={[styles.content, {backgroundColor: theme.background}]}>
              <Text style={[styles.title, {color: theme.primary}]}>{note?.title}</Text>
              <View style={styles.line} />
              <Text style={[styles.date, {color: theme.primary}]}>
                {dayjs().diff(dayjs(note?.createdAt), 'day') > 7 
                ? dayjs(note?.createdAt).format('DD MMMM YYYY') 
                : dayjs(note?.createdAt).fromNow()}</Text>
              <Text style={[styles.contentText, {color: theme.primary}]}>{note?.content}</Text>
          </View>
        
    </SafeAreaView>
  )
}

export default Details

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 19,
    paddingVertical: 22,

    },
    delete: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#DC2720",
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 5
    },
    deleteText: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#fff"
    },
    edit: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#3B82F6",
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 5
    },
    editText: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#fff"
    }, 
    back: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 5
    },
    content: {
        flex: 1,
        padding: 20,
        backgroundColor: "#eee",
    },
    line: {
        height: 1,
        backgroundColor: "gray",
        marginVertical: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
        textAlign: "right"
    },
    date: {
        fontSize: 14,
        color: 'gray',
        marginBottom: 10,
        textAlign: "right"
    },
    contentText: {
        fontSize: 16,
        textAlign: "right"
    }
})