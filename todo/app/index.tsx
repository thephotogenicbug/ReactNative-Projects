import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { useState } from "react";
import { Stack } from "expo-router";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import NewTaskInput from "../components/NewTaskInput";
import { SafeAreaView } from "react-native-safe-area-context";

export type Task = {
  title: string;
  isFinished: boolean;
};

const dummyTasks: Task[] = [
  {
    title: "Setup Day 1 Structure",
    isFinished: true,
  },
  {
    title: "Render a list of tasks",
    isFinished: false,
  },
  {
    title: "Add a new task",
    isFinished: false,
  },
  {
    title: "Change the status of a task",
    isFinished: false,
  },
  {
    title: "Separate in 2 tabs : todo, and complete",
    isFinished: false,
  },
];

const index = () => {
  const [tasks, setTasks] = useState<Task[]>(dummyTasks);
  const [newTask, setNewTask] = useState("");

  const onItemPressed = (index: number) => {
    setTasks((currentTasks) => {
      const updatedTask = [...currentTasks];
      currentTasks[index].isFinished = !updatedTask[index].isFinished;
      console.log(updatedTask);

      return updatedTask;
    });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={100}
    >
      <Stack.Screen options={{ headerShown: false }} />
      <SafeAreaView>
        <FlatList
          data={tasks}
          contentContainerStyle={{ gap: 5, padding: 10 }}
          renderItem={({ item, index }) => (
            <>
              <Pressable
                onPress={() => onItemPressed(index)}
                style={styles.taskContainer}
              >
                <MaterialCommunityIcons
                  name={
                    item.isFinished
                      ? "checkbox-marked-circle-outline"
                      : "checkbox-blank-circle-outline"
                  }
                  size={24}
                  color="dimgray"
                />
                <Text
                  style={[
                    styles.taskTitle,
                    {
                      textDecorationLine: item.isFinished
                        ? "line-through"
                        : "none",
                    },
                  ]}
                >
                  {item.title}
                </Text>
              </Pressable>
            </>
          )}
          ListFooterComponent={() => (
            <NewTaskInput
              onAdd={(newTodo: Task) =>
                setTasks((currentTasks) => [...currentTasks, newTodo])
              }
            />
          )}
        />
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default index;

const styles = StyleSheet.create({
  page: {
    backgroundColor: "white",
    flex: 1,
  },
  taskContainer: {
    padding: 10,
    // borderWidth: 1,
    // borderColor: "gray",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  taskTitle: {
    fontFamily: "InterSemi",
    fontSize: 16,
    color: "dimgray",
    flex: 1,
  },
});
