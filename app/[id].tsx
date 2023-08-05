import { StatusBar } from "expo-status-bar";
import {
  Platform,
  StyleSheet,
  SafeAreaView,
  TextInput,
  Pressable,
  TouchableOpacity,
} from "react-native";

import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import { Stack, useRouter, useGlobalSearchParams } from "expo-router";
import { useState, useEffect } from "react";
import useStore from "@/utils/store";
import { Todo } from "@/@types/Todo";
export default function UpdateModalScreen() {
  const router = useRouter();
  const { id } = useGlobalSearchParams();
  const { updateTodo, todos } = useStore();
  const [todo, setTodo] = useState<Todo | undefined>(undefined);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  useEffect(() => {
    const todo = todos.find((t) => t.id === id);
    setTodo(todo);
    setTitle(todo?.title ?? "");
    setDescription(todo?.description ?? "");
  }, []);
  const updateTodoFunc = () => {
    if (title.length > 0 && description.length > 0) {
      updateTodo({
        id: todo?.id ?? "",
        title,
        description,
        date: todo?.date ?? "",
      });
      router.back();
    }
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack.Screen
        options={{
          headerTitle: "new todo",
        }}
      />
      <View style={styles.container}>
        <Text style={styles.title}>Update todo</Text>
        <View style={styles.formWrapper}>
          <Text style={styles.label}>title</Text>
          <TextInput
            value={title}
            onChangeText={(text) => setTitle(text)}
            style={styles.input}
          />
          <Text style={styles.label}>description</Text>
          <TextInput
            value={description}
            onChangeText={(text) => setDescription(text)}
            style={styles.input}
            numberOfLines={2}
            multiline
          />
        </View>
        <TouchableOpacity style={styles.btn} onPress={updateTodoFunc}>
          <Text
            style={{
              color: "#fff",
              fontSize: 18,
            }}
          >
            update todo
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    backgroundColor: "transparent",
    padding: 10,
  },
  title: {
    fontSize: 22,
    marginVertical: 20,
  },
  formWrapper: {
    backgroundColor: "transparent",
  },
  btn: {
    backgroundColor: "#326fa8",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 7,
  },
  input: {
    height: 40,
    backgroundColor: "#c9c9c7",
    marginBottom: 10,
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
  },
});
