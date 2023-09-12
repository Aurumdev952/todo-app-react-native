import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  FlatList,
  StyleSheet,
  Alert,
  Modal,
  Pressable,
} from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Stack } from "expo-router";
import { useEffect, useState } from "react";
import { Todo } from "@/@types/Todo";
import TodoComponent from "@/components/Todo";
import "fast-text-encoding";
import { createId } from "@paralleldrive/cuid2";
import useStore from "@/utils/store";
import { TouchableOpacity } from "react-native-gesture-handler";
import { db } from "../_layout";

const App = () => {
  const { todos, setTodos } = useStore();
  useEffect(() => {
    db.transaction(
      (tx) => {
        tx.executeSql("select * from todos", [], (_, { rows }) => {
          const data = rows._array as unknown as Todo[];
          console.log(rows);
          setTodos(data);
        });
      },
      (e) => {
        console.log("error while", e);
      }
    );
  }, []);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack.Screen
        options={{
          headerShown: true,
        }}
      />
      <View style={styles.container}>
        {todos.length > 0 ? (
          <FlatList
            data={todos}
            renderItem={({ item }) => <TodoComponent {...item} />}
            keyExtractor={(item) => item.id}
          />
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>list empty, add new Todo</Text>
          </View>
        )}
      </View>
      <Link href={"/modal"} style={styles.newTodoButtonWrapper}>
        <TouchableOpacity style={styles.newTodoButton}>
          <FontAwesome
            name="plus"
            size={18}
            style={{ fontWeight: "200" }}
            color={"#fff"}
          />
        </TouchableOpacity>
      </Link>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    paddingHorizontal: 10,
    paddingTop: 20,
  },
  emptyContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "90%",
  },
  emptyText: {
    fontSize: 20,
  },
  newTodoButtonWrapper: {
    position: "fixed",
    bottom: 20,
    right: 30,
  },
  newTodoButton: {
    height: 50,
    width: 50,
    backgroundColor: "#326fa8",
    borderRadius: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default App;
