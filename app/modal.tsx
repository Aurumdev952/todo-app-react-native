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
import { Stack, router, useRouter } from "expo-router";
import { useState } from "react";
import useStore from "@/utils/store";
import "fast-text-encoding";
import { createId } from "@paralleldrive/cuid2";
import { db } from "./_layout";
export default function ModalScreen() {
  const router = useRouter();
  const { addTodo } = useStore();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const createTodo = () => {
    if (title.length > 0 && description.length > 0) {
      const date = Date.now().toString();
      const id = createId();
      console.log(id);

      db.transaction(
        (tx) => {
          tx.executeSql(
            "insert into todos (id, title, description, date, done) values (?, ?, ?, ?, 0)",
            [id, title, description, date]
          );
        },
        (e) => {
          console.log("error while", e.message);
        },
        () => {
          addTodo({
            title,
            description,
            date,
            id,
          });
        }
      );

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
        <Text style={styles.title}>Create a new todo</Text>
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
        <TouchableOpacity style={styles.btn} onPress={createTodo}>
          <Text
            style={{
              color: "#fff",
              fontSize: 18,
            }}
          >
            create new todo
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
