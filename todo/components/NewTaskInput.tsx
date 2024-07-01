import { StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";

import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Task } from "@/app";

type NewTaskInput = {
  onAdd: (newTask: Task) => void;
};

const NewTaskInput = ({ onAdd }: NewTaskInput) => {
  const [newTask, setNewTask] = useState("");
  return (
    <View style={styles.taskContainer}>
      <MaterialCommunityIcons
        name="checkbox-blank-circle-outline"
        size={24}
        color="dimgray"
      />
      <TextInput
        autoFocus
        value={newTask}
        onChangeText={setNewTask}
        style={styles.input}
        placeholder="Todo...."
        onEndEditing={() => {
          if (!newTask) {
            return;
          }
          onAdd({ title: newTask, isFinished: false });

          setNewTask("");
        }}
      />
    </View>
  );
};

export default NewTaskInput;

const styles = StyleSheet.create({
  taskContainer: {
    padding: 10,
    // borderWidth: 1,
    // borderColor: "gray",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  input: {
    fontFamily: "InterSemi",
    fontSize: 16,
    color: "dimgray",
    flex: 1,
  },
});
