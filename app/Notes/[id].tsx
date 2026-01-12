import { StyleSheet, Text, View, TouchableOpacity, Image, Alert } from 'react-native'
import {useState, useEffect} from 'react'
import { useLocalSearchParams, router } from 'expo-router'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
const Details = () => {
    type Note = {
        id: string;
        title: string;
        content: string;
        createdAt: string;
    }
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
      <SafeAreaView edges={["top"]} style={styles.container}>
          <StatusBar style="auto" backgroundColor="#f7f7f7" />
          <View style={styles.header}>
              <View style={{flexDirection: "row", gap: 10}}>
                <TouchableOpacity style={styles.delete}>
                    <Text onPress={deleteNote} style={styles.deleteText}>حذف 🗑️</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.edit} onPress={() => router.push(`/Notes/Edit/${id}`)}>
                    <Text style={styles.editText}>تعديل ✏️</Text>
                </TouchableOpacity>
              </View>
              <View>
                  <TouchableOpacity style={styles.back} onPress={() => router.back()}>
                      <Text style={{fontSize: 14, fontWeight: "bold"}}>رجوع</Text>
                      <Image
                          source={require("@/assets/images/back.png")}
                          style={{width: 30, height: 30}}
                      />
                  </TouchableOpacity>
              </View>
            
          </View>
          
          <View style={styles.content}>
              <Text style={styles.title}>{note?.title}</Text>
              <View style={styles.line} />
              <Text style={styles.date}>تاريخ الإنشاء: {new Date(note?.createdAt || '').toLocaleDateString('en-US')}</Text>
              <Text style={styles.contentText}>{note?.content}</Text>
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
    backgroundColor: "#f7f7f7",
    elevation: 10,

    },
    delete: {
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