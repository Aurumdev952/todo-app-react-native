import { Todo } from "@/@types/Todo";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import moment from "moment";
import useStore from "@/utils/store";
import { useRouter } from "expo-router";
import { db } from "@/app/_layout";
const TodoComp: React.FC<Todo> = ({ id, title, description, date }) => {
  const { deleteTodo } = useStore();
  const router = useRouter();
  return (
    <View style={styles.container}>
      <View>
        <Text numberOfLines={1} style={styles.title}>
          {title}
        </Text>
        <Text numberOfLines={2} style={styles.description}>
          {description}
        </Text>
        <Text numberOfLines={1} style={styles.date}>
          {moment(parseInt(date, 10)).format("hh:mm DD/MM/YYYY")}
        </Text>
      </View>
      <View>
        <TouchableOpacity
          onPress={() => {
            router.push(`/${id}`);
          }}
        >
          <FontAwesome color={"#000"} name="edit" size={28} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            db.transaction(
              (tx) => {
                tx.executeSql(`delete from todos where id = ?;`, [id]);
              },
              (e) => {
                console.log("error while", e.message);
              },
              () => {
                deleteTodo(id);
              }
            );
          }}
        >
          <FontAwesome color={"#000"} name="trash" size={28} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    marginBottom: 10,
    borderRadius: 10,
    padding: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 18,
  },
  description: {
    fontSize: 14,
    color: "#4d4c4c",
  },
  date: {
    fontSize: 12,
    color: "#6b6a6a",
  },
});

export default TodoComp;
